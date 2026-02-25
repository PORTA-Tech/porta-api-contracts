import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import canonicalize from "canonicalize";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const policySetPath = path.join(contractsRoot, "examples/control/policies/policy-set.v1.json");
const vectorsRoot = path.join(contractsRoot, "examples/control/policy-execution-vectors");

const MAX_SCALE_PER_10M = 6;
const MAX_TRAFFIC_SHIFT_PER_HOUR = 50;
const GLOBAL_INTERVENTION_RATE_CAP = 30;

function compareNumbers(a, operator, b) {
  switch (operator) {
    case ">":
      return a > b;
    case ">=":
      return a >= b;
    case "<":
      return a < b;
    case "<=":
      return a <= b;
    case "==":
      return a === b;
    case "!=":
      return a !== b;
    default:
      return false;
  }
}

function metricKey(metric) {
  return [
    metric.environment,
    metric.service,
    metric.region ?? "",
    metric.schema_name,
    metric.metric_name,
    metric.aggregation,
    String(metric.window_seconds)
  ].join("|");
}

function policyMetricKeys(policy) {
  const scope = policy.resource_scope;
  const trigger = policy.trigger;
  const region = scope.region ?? "";
  return [
    [scope.environment, scope.service, region, trigger.schema_name, trigger.metric_name, trigger.aggregation, String(trigger.window_seconds)].join("|"),
    [scope.environment, scope.service, "", trigger.schema_name, trigger.metric_name, trigger.aggregation, String(trigger.window_seconds)].join("|")
  ];
}

function sha256Hex(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function deterministicUuidFromSeed(seed) {
  const hex = sha256Hex(seed).slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function buildCommandHash(command) {
  const unsigned = structuredClone(command);
  delete unsigned.signature;
  const canonical = canonicalize(unsigned);
  if (typeof canonical !== "string") {
    throw new Error("failed to canonicalize command payload");
  }
  return sha256Hex(canonical);
}

function evaluateVector(vector, policies) {
  const nowMs = Date.parse(vector.now);
  if (!Number.isFinite(nowMs)) {
    throw new Error(`${vector.vector_id}: invalid now timestamp`);
  }

  const metricsByKey = new Map();
  for (const metric of vector.metrics ?? []) {
    metricsByKey.set(metricKey(metric), metric);
  }

  const runtime = vector.runtime ?? {};
  const policyRuntime = runtime.policy_runtime ?? {};
  const serviceState = structuredClone(runtime.service_state ?? {});
  const scaleAdded = { ...(runtime.scale_added_last_10m_by_service ?? {}) };
  const trafficShiftAdded = { ...(runtime.traffic_shift_last_hour_by_service ?? {}) };
  let clusterInterventions = Number(runtime.cluster_interventions_last_hour ?? 0);

  const sorted = policies
    .filter((p) => p.enabled)
    .slice()
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.policy_id.localeCompare(b.policy_id);
    });

  const triggered = [];
  const blocked = [];
  const signedCommands = [];

  for (const policy of sorted) {
    const policyId = policy.policy_id;

    if (!vector.kill_switch_enabled) {
      blocked.push(policyId);
      continue;
    }

    const stateKey = `${policy.resource_scope.environment}/${policy.resource_scope.service}`;
    const state = serviceState[stateKey];
    if (!state) {
      blocked.push(policyId);
      continue;
    }

    const metric = policyMetricKeys(policy)
      .map((key) => metricsByKey.get(key))
      .find((value) => value !== undefined);

    if (!metric) {
      blocked.push(policyId);
      continue;
    }

    if (!compareNumbers(Number(metric.value), policy.condition.operator, Number(policy.condition.threshold))) {
      blocked.push(policyId);
      continue;
    }

    const runtimeInfo = policyRuntime[policyId] ?? { last_trigger_at: null, triggers_last_hour: 0 };

    if (runtimeInfo.last_trigger_at) {
      const lastMs = Date.parse(runtimeInfo.last_trigger_at);
      if (Number.isFinite(lastMs) && (nowMs - lastMs) / 1000 < policy.cool_down_seconds) {
        blocked.push(policyId);
        continue;
      }
    }

    if (Number(runtimeInfo.triggers_last_hour ?? 0) >= policy.max_triggers_per_hour) {
      blocked.push(policyId);
      continue;
    }

    if (clusterInterventions >= GLOBAL_INTERVENTION_RATE_CAP) {
      blocked.push(policyId);
      continue;
    }

    let commandParameters = {};
    if (policy.action.type === "scale_horizontal") {
      const usedScale = Number(scaleAdded[stateKey] ?? 0);
      const remainingScale = MAX_SCALE_PER_10M - usedScale;
      if (remainingScale <= 0) {
        blocked.push(policyId);
        continue;
      }

      const currentReplicas = Number(state.replicas);
      const target = Math.min(
        Number(policy.action.max_replicas),
        Math.max(Number(policy.action.min_replicas), currentReplicas + Number(policy.action.scale_step))
      );
      const allowedTarget = Math.min(target, currentReplicas + remainingScale);
      if (allowedTarget <= currentReplicas) {
        blocked.push(policyId);
        continue;
      }

      commandParameters = {
        desired_replicas: allowedTarget,
        reason: `cpu_p95_above_${Number(policy.condition.threshold)}_percent`
      };

      scaleAdded[stateKey] = usedScale + (allowedTarget - currentReplicas);
      state.replicas = allowedTarget;
      state.last_scale_time = vector.now;
    } else if (policy.action.type === "traffic_shift") {
      const usedShift = Number(trafficShiftAdded[stateKey] ?? 0);
      const remainingShift = MAX_TRAFFIC_SHIFT_PER_HOUR - usedShift;
      if (remainingShift <= 0) {
        blocked.push(policyId);
        continue;
      }

      const effectiveShift = Math.min(Number(policy.action.shift_percentage), remainingShift);
      if (effectiveShift <= 0) {
        blocked.push(policyId);
        continue;
      }

      commandParameters = {
        shift_percentage: effectiveShift,
        target_cluster: policy.action.target_cluster
      };
      trafficShiftAdded[stateKey] = usedShift + effectiveShift;
    } else if (policy.action.type === "restart_pods") {
      commandParameters = {
        max_parallel: Number(policy.action.max_parallel)
      };
    } else {
      blocked.push(policyId);
      continue;
    }

    state.version = Number(state.version) + 1;
    state.last_policy_trigger = policyId;
    state.trigger_count_last_hour = Number(state.trigger_count_last_hour) + 1;
    clusterInterventions += 1;

    const command = {
      contract_name: "ControlPlaneSignedInterventionCommand",
      schema_version: "1.0.0",
      command_schema_version: "intervention.command.v1.0.0",
      command_id: deterministicUuidFromSeed(`${vector.vector_id}:${policyId}:${state.version}`),
      policy_id: policyId,
      target_service: policy.resource_scope.service,
      action: policy.action.type,
      parameters: commandParameters,
      issued_at: vector.now,
      expires_at: new Date(nowMs + 5 * 60 * 1000).toISOString().replace(".000Z", "Z"),
      state_version: state.version
    };

    command.signature_input_hash = buildCommandHash(command);
    command.signature = {
      algorithm: "Ed25519",
      key_id: "cp-root-key-01",
      signature: policy.signature.signature
    };

    triggered.push(policyId);
    signedCommands.push(command);
  }

  return {
    triggered_policy_ids_in_order: triggered,
    blocked_policy_ids: blocked,
    signed_intervention_count: signedCommands.length,
    final_versions: Object.fromEntries(Object.entries(serviceState).map(([k, v]) => [k, Number(v.version)])),
    final_replicas: Object.fromEntries(Object.entries(serviceState).map(([k, v]) => [k, Number(v.replicas)]))
  };
}

const policySetRaw = await fs.readFile(policySetPath, "utf8");
const policySet = JSON.parse(policySetRaw);
const policies = policySet.policies ?? [];

const vectorFiles = (await fs.readdir(vectorsRoot))
  .filter((name) => name.endsWith(".json"))
  .sort();

if (vectorFiles.length === 0) {
  throw new Error("no control-plane policy execution vectors found");
}

const failures = [];
for (const fileName of vectorFiles) {
  const rel = `examples/control/policy-execution-vectors/${fileName}`;
  const vector = JSON.parse(await fs.readFile(path.join(vectorsRoot, fileName), "utf8"));
  const actual = evaluateVector(vector, policies);
  const expected = vector.expected ?? {};

  if (JSON.stringify(actual.triggered_policy_ids_in_order) !== JSON.stringify(expected.triggered_policy_ids_in_order)) {
    failures.push(`${rel}: triggered order mismatch expected=${JSON.stringify(expected.triggered_policy_ids_in_order)} got=${JSON.stringify(actual.triggered_policy_ids_in_order)}`);
  }
  if (JSON.stringify(actual.blocked_policy_ids) !== JSON.stringify(expected.blocked_policy_ids)) {
    failures.push(`${rel}: blocked policy list mismatch expected=${JSON.stringify(expected.blocked_policy_ids)} got=${JSON.stringify(actual.blocked_policy_ids)}`);
  }
  if (actual.signed_intervention_count !== expected.signed_intervention_count) {
    failures.push(`${rel}: signed_intervention_count expected=${expected.signed_intervention_count} got=${actual.signed_intervention_count}`);
  }
  if (JSON.stringify(actual.final_versions) !== JSON.stringify(expected.final_versions)) {
    failures.push(`${rel}: final_versions mismatch expected=${JSON.stringify(expected.final_versions)} got=${JSON.stringify(actual.final_versions)}`);
  }
  if (JSON.stringify(actual.final_replicas) !== JSON.stringify(expected.final_replicas)) {
    failures.push(`${rel}: final_replicas mismatch expected=${JSON.stringify(expected.final_replicas)} got=${JSON.stringify(actual.final_replicas)}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log(`Control-plane policy execution vectors validated: ${vectorFiles.length}`);
