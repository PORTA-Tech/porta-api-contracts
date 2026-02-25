import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function full(relPath) {
  return path.join(contractsRoot, relPath);
}

async function readJson(relPath) {
  const raw = await fs.readFile(full(relPath), "utf8");
  return JSON.parse(raw);
}

function compareCompatibility(registry, envelope) {
  const mode = registry.compatibility_mode;
  const declared = semver.parse(envelope.declared_schema_version);
  const registered = semver.parse(registry.registered_schema_version);

  if (!declared || !registered) {
    return { compatible: false, result: "unknown_schema_version", errorCode: "SCHEMA_VERSION_INVALID" };
  }

  if (mode === "strict_exact") {
    if (semver.eq(declared, registered)) {
      return { compatible: true, result: "compatible" };
    }
    return { compatible: false, result: "strict_mismatch", errorCode: "SCHEMA_VERSION_INCOMPATIBLE" };
  }

  if (mode === "full") {
    if (semver.major(declared) !== semver.major(registered)) {
      return { compatible: false, result: "incompatible_major", errorCode: "SCHEMA_VERSION_INCOMPATIBLE" };
    }
    return { compatible: true, result: "compatible" };
  }

  if (semver.major(declared) !== semver.major(registered)) {
    return { compatible: false, result: "incompatible_major", errorCode: "SCHEMA_VERSION_INCOMPATIBLE" };
  }

  if (semver.minor(declared) < registry.minimum_supported_minor || semver.minor(declared) > registry.maximum_supported_minor) {
    return { compatible: false, result: "incompatible_minor", errorCode: "SCHEMA_VERSION_INCOMPATIBLE" };
  }

  if (!registry.allow_patch && semver.patch(declared) !== semver.patch(registered)) {
    return { compatible: false, result: "incompatible_minor", errorCode: "SCHEMA_VERSION_INCOMPATIBLE" };
  }

  return { compatible: true, result: "compatible" };
}

function evaluateVector(vector) {
  const registry = vector.registry;
  const envelope = vector.envelope;
  const verificationResult = vector.signature_verification_result ?? "not_required";
  const compatibility = compareCompatibility(registry, envelope);

  if (registry.deprecation_state === "blocked") {
    return { decision: "reject", error_code: "SCHEMA_EXPIRED", compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  if (envelope.schema_name !== registry.schema_name) {
    return { decision: "reject", error_code: "UNKNOWN_SCHEMA", compatibility_result: "unknown_schema_version", verification_result: verificationResult };
  }

  if (!registry.allowed_producers.includes(envelope.producer_id)) {
    return { decision: "reject", error_code: "PRODUCER_REVOKED", compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  if (registry.required_signature && !envelope.signature) {
    return { decision: "reject", error_code: "SIGNATURE_REQUIRED", compatibility_result: compatibility.result, verification_result: "not_required" };
  }

  if (verificationResult !== "verified" && verificationResult !== "not_required") {
    const codeByResult = {
      invalid_signature: "SIGNATURE_INVALID",
      unknown_key: "SIGNING_KEY_UNKNOWN",
      revoked_key: "SIGNING_KEY_REVOKED"
    };
    return {
      decision: "reject",
      error_code: codeByResult[verificationResult] ?? "SIGNATURE_INVALID",
      compatibility_result: compatibility.result,
      verification_result: verificationResult
    };
  }

  if (!compatibility.compatible) {
    return { decision: "reject", error_code: compatibility.errorCode, compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  const payloadBytes = Buffer.byteLength(JSON.stringify(envelope.payload), "utf8");
  if (payloadBytes > registry.max_payload_bytes) {
    return { decision: "reject", error_code: "PAYLOAD_TOO_LARGE", compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  const sentTime = Date.parse(envelope.timestamp);
  const ingestionTime = Date.parse(vector.ingestion_time);
  if (!Number.isFinite(sentTime) || !Number.isFinite(ingestionTime)) {
    return { decision: "reject", error_code: "TIMESTAMP_INVALID", compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  const skewSeconds = Math.abs(ingestionTime - sentTime) / 1000;
  if (skewSeconds > registry.max_clock_skew_seconds) {
    return { decision: "reject", error_code: "CLOCK_SKEW_EXCEEDED", compatibility_result: compatibility.result, verification_result: verificationResult };
  }

  return { decision: "accept", error_code: null, compatibility_result: compatibility.result, verification_result: verificationResult };
}

const vectorsRoot = full("examples/control/ingestion-vectors");
const vectorFiles = (await fs.readdir(vectorsRoot))
  .filter((entry) => entry.endsWith(".json"))
  .sort();

if (vectorFiles.length === 0) {
  throw new Error("no control-plane ingestion vectors found");
}

const failures = [];
for (const fileName of vectorFiles) {
  const rel = `examples/control/ingestion-vectors/${fileName}`;
  const vector = await readJson(rel);
  const actual = evaluateVector(vector);
  const expected = vector.expected ?? {};

  if (actual.decision !== expected.decision) {
    failures.push(`${rel}: decision expected=${expected.decision} got=${actual.decision}`);
  }
  if (actual.error_code !== expected.error_code) {
    failures.push(`${rel}: error_code expected=${expected.error_code} got=${actual.error_code}`);
  }
  if (actual.compatibility_result !== expected.compatibility_result) {
    failures.push(`${rel}: compatibility_result expected=${expected.compatibility_result} got=${actual.compatibility_result}`);
  }
  if (actual.verification_result !== expected.verification_result) {
    failures.push(`${rel}: verification_result expected=${expected.verification_result} got=${actual.verification_result}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log(`Control-plane ingestion vectors validated: ${vectorFiles.length}`);
