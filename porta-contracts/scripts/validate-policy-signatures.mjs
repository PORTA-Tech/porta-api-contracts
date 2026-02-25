import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import canonicalize from "canonicalize";
import semver from "semver";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function full(relPath) {
  return path.join(contractsRoot, relPath);
}

async function readJson(relPath) {
  const raw = await fs.readFile(full(relPath), "utf8");
  return JSON.parse(raw);
}

function toCanonicalPayload(policy) {
  const payload = structuredClone(policy);
  if (!payload.signature || typeof payload.signature !== "object") {
    throw new Error("invalid_signature_envelope");
  }
  delete payload.signature.signature;
  return payload;
}

function sha256Hex(raw) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

function base64UrlToBuffer(input) {
  if (!/^[A-Za-z0-9_-]+$/.test(input)) {
    throw new Error("invalid_signature_format");
  }
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function verifyPolicy(policy, trustStore, revokedKeys, revokedPolicies) {
  const signing = policy.signature;
  if (!signing || signing.algorithm !== "Ed25519" || typeof signing.signing_key_id !== "string" || typeof signing.signature !== "string") {
    return { valid: false, reason: "invalid_signature_envelope" };
  }

  if (!semver.valid(policy.version)) {
    return { valid: false, reason: "invalid_policy_version" };
  }
  if (!semver.valid(policy.schema_version) || semver.major(policy.schema_version) !== 2) {
    return { valid: false, reason: "version_incompatible" };
  }

  const keyId = signing.signing_key_id;
  if (revokedKeys.has(keyId)) {
    return { valid: false, reason: "revoked_key", key_id: keyId };
  }

  if (revokedPolicies.has(policy.policy_id)) {
    return { valid: false, reason: "revoked_policy", key_id: keyId };
  }

  const key = trustStore.get(keyId);
  if (!key) {
    return { valid: false, reason: "unknown_key", key_id: keyId };
  }

  let canonical;
  try {
    canonical = canonicalize(toCanonicalPayload(policy));
  } catch {
    return { valid: false, reason: "canonicalization_mismatch", key_id: keyId };
  }
  if (typeof canonical !== "string") {
    return { valid: false, reason: "canonicalization_mismatch", key_id: keyId };
  }

  const canonicalSha256 = sha256Hex(canonical);
  try {
    const sig = base64UrlToBuffer(signing.signature);
    const publicKey = crypto.createPublicKey(key.public_key_pem);
    const ok = crypto.verify(null, Buffer.from(canonical, "utf8"), publicKey, sig);
    if (!ok) {
      return { valid: false, reason: "invalid_signature", key_id: keyId, canonical_sha256: canonicalSha256 };
    }
  } catch (err) {
    return { valid: false, reason: err?.message ?? "invalid_signature", key_id: keyId, canonical_sha256: canonicalSha256 };
  }

  return { valid: true, reason: "verified", key_id: keyId, canonical_sha256: canonicalSha256 };
}

const trustStoreDoc = await readJson("trust/keys/trusted-signing-keys.json");
const revokedKeysDoc = await readJson("trust/keys/revoked-signing-keys.json");
const revokedPoliciesDoc = await readJson("trust/policies/revoked-policies.json");

const trustStore = new Map();
for (const key of trustStoreDoc.keys ?? []) {
  trustStore.set(key.key_id, key);
}
const revokedKeys = new Set(revokedKeysDoc.revoked_key_ids ?? []);
const revokedPolicies = new Set(revokedPoliciesDoc.revoked_policy_ids ?? []);

const vectorsDir = full("examples/policies/signing-vectors");
const vectorFiles = (await fs.readdir(vectorsDir))
  .filter((name) => name.endsWith(".json"))
  .sort();

if (vectorFiles.length === 0) {
  throw new Error("no policy signature vectors found");
}

const failures = [];

for (const fileName of vectorFiles) {
  const rel = `examples/policies/signing-vectors/${fileName}`;
  const vector = await readJson(rel);
  const verification = verifyPolicy(vector.policy, trustStore, revokedKeys, revokedPolicies);
  const expectedValid = Boolean(vector.expected?.valid);
  const expectedReason = vector.expected?.reason;

  if (verification.valid !== expectedValid) {
    failures.push(`${rel}: expected valid=${expectedValid} got valid=${verification.valid} reason=${verification.reason}`);
    continue;
  }

  if (!verification.valid && expectedReason && verification.reason !== expectedReason) {
    failures.push(`${rel}: expected reason=${expectedReason} got ${verification.reason}`);
    continue;
  }

  if (verification.valid && vector.expected?.canonical_sha256 && verification.canonical_sha256 !== vector.expected.canonical_sha256) {
    failures.push(`${rel}: canonical_sha256 mismatch expected=${vector.expected.canonical_sha256} got=${verification.canonical_sha256}`);
  }
}

if (failures.length > 0) {
  for (const err of failures) {
    console.error(err);
  }
  process.exit(1);
}

console.log(`Policy signature vectors validated: ${vectorFiles.length}`);
