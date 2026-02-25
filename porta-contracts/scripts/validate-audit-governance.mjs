import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vectorsRoot = path.join(contractsRoot, "examples/audit/governance-vectors");

const RBAC_RULES = new Map([
  ["policy_update", "admin"],
  ["policy_create", "admin"],
  ["manual_intervention_trigger", "operator"],
  ["audit_read", "auditor"],
  ["policy_simulate", "developer"],
  ["agent_data_read", "agent"]
]);

function evaluateRbac(role, action) {
  const required = RBAC_RULES.get(action);
  if (!required) {
    return { decision: "deny", required_role: "admin", error_code: "RBAC_DENIED" };
  }
  if (role === "admin") {
    return { decision: "allow", required_role: required, error_code: null };
  }
  if (role === required) {
    return { decision: "allow", required_role: required, error_code: null };
  }
  return { decision: "deny", required_role: required, error_code: "RBAC_DENIED" };
}

function evaluateRetention(input) {
  const ok = input.decision_trace_retention_days === 1095
    && input.intervention_command_retention_days === 365
    && input.metric_snapshot_hot_retention_days === 90
    && input.metric_snapshot_cold_retention_days === 730
    && input.policy_versions_retention === "indefinite";
  return { valid: ok };
}

function evaluateSession(input) {
  if (!input.tls_enabled || !input.jwt_present) {
    return { valid: false, error_code: "AUTH_REQUIRED" };
  }
  if (Number(input.session_expiry_seconds) > 300) {
    return { valid: false, error_code: "SESSION_EXPIRED_POLICY_VIOLATION" };
  }
  return { valid: true, error_code: null };
}

function evaluateReplay(input) {
  const stored = JSON.stringify(input.stored_action_parameters ?? {});
  const recomputed = JSON.stringify(input.recomputed_action_parameters ?? {});
  if (stored === recomputed) {
    return { result: "match", difference_field: null };
  }
  const storedObj = input.stored_action_parameters ?? {};
  const recomputedObj = input.recomputed_action_parameters ?? {};
  const keys = new Set([...Object.keys(storedObj), ...Object.keys(recomputedObj)]);
  const differenceField = [...keys].find((key) => JSON.stringify(storedObj[key]) !== JSON.stringify(recomputedObj[key])) ?? null;
  return { result: "mismatch", difference_field: differenceField };
}

function evaluateVector(vector) {
  const id = vector.vector_id;
  if (id.startsWith("rbac-")) {
    return evaluateRbac(vector.input.subject_role, vector.input.action);
  }
  if (id.startsWith("retention-")) {
    return evaluateRetention(vector.input);
  }
  if (id.startsWith("session-")) {
    return evaluateSession(vector.input);
  }
  if (id.startsWith("replay-")) {
    return evaluateReplay(vector.input);
  }
  return { valid: false, error_code: "UNKNOWN_VECTOR" };
}

const files = (await fs.readdir(vectorsRoot))
  .filter((name) => name.endsWith(".json"))
  .sort();

if (files.length === 0) {
  throw new Error("no audit governance vectors found");
}

const failures = [];
for (const fileName of files) {
  const rel = `examples/audit/governance-vectors/${fileName}`;
  const vector = JSON.parse(await fs.readFile(path.join(vectorsRoot, fileName), "utf8"));
  const actual = evaluateVector(vector);
  const expected = vector.expected ?? {};

  for (const key of Object.keys(expected)) {
    if (JSON.stringify(actual[key]) !== JSON.stringify(expected[key])) {
      failures.push(`${rel}: ${key} expected=${JSON.stringify(expected[key])} got=${JSON.stringify(actual[key])}`);
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log(`Audit governance vectors validated: ${files.length}`);
