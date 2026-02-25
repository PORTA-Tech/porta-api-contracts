import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function full(p) {
  return path.join(contractsRoot, p);
}

async function readJson(relPath) {
  const raw = await fs.readFile(full(relPath), "utf8");
  return JSON.parse(raw);
}

const SCHEMA_DIRS = ["audit", "control", "events", "interventions", "policies", "primitives", "shared", "states"];
const EXAMPLE_DIRS = ["audit", "control", "events", "interventions", "policies", "primitives", "states"];

async function collectSchemaFiles() {
  const out = [];
  const stack = SCHEMA_DIRS.map((dir) => full(dir));

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".schema.json")) {
        out.push(path.relative(contractsRoot, entryPath).replace(/\\/g, "/"));
      }
    }
  }

  return out.sort();
}

async function collectJsonFilesRecursive(dirRel) {
  const root = full(dirRel);
  try {
    await fs.access(root);
  } catch {
    return [];
  }

  const out = [];
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".json")) {
        out.push(path.relative(contractsRoot, entryPath).replace(/\\/g, "/"));
      }
    }
  }

  return out.sort();
}

async function collectJsonFiles(dirRel) {
  const out = [];
  for (const section of EXAMPLE_DIRS) {
    const sectionFiles = await collectJsonFilesRecursive(path.join(dirRel, section));
    out.push(...sectionFiles);
  }

  return out.sort();
}

function formatAjvErrors(errors) {
  return (errors ?? []).map((e) => `${e.instancePath || "/"} ${e.message}`).join("; ");
}

function validateSigningVector(vector, relPath) {
  if (!vector || typeof vector !== "object") {
    throw new Error(`${relPath}: signing vector must be an object`);
  }
  if (vector.algorithm !== "ed25519") {
    throw new Error(`${relPath}: algorithm must be ed25519`);
  }
  if (typeof vector.key_id !== "string" || vector.key_id.length === 0) {
    throw new Error(`${relPath}: key_id is required`);
  }
  if (!vector.payload || typeof vector.payload !== "object" || Array.isArray(vector.payload)) {
    throw new Error(`${relPath}: payload object is required`);
  }
  if (!("version" in vector.payload) && !("schema_version" in vector.payload)) {
    throw new Error(`${relPath}: payload must include version or schema_version`);
  }
  if (!("created_at" in vector.payload) && !("issued_at" in vector.payload)) {
    throw new Error(`${relPath}: payload must include created_at or issued_at`);
  }
  if (typeof vector.signature_base64 !== "string" || !/^[A-Za-z0-9+/=]+$/.test(vector.signature_base64)) {
    throw new Error(`${relPath}: signature_base64 must be base64 text`);
  }
}

function validatePolicySemantics(payload, relPath) {
  if (payload?.contract_name !== "RegulationPolicy") {
    if (payload?.contract_name === "ControlPlaneSchemaRegistryEntry") {
      if (
        typeof payload.minimum_supported_minor === "number"
        && typeof payload.maximum_supported_minor === "number"
        && payload.maximum_supported_minor < payload.minimum_supported_minor
      ) {
        throw new Error(`${relPath}: maximum_supported_minor must be >= minimum_supported_minor`);
      }
    }
    if (payload?.contract_name === "ControlPlaneExecutionPolicy" && payload?.action?.type === "scale_horizontal") {
      if (payload.action.max_replicas < payload.action.min_replicas) {
        throw new Error(`${relPath}: scale_horizontal.max_replicas must be >= min_replicas`);
      }
    }
    if (payload?.contract_name === "ControlPlaneSignedInterventionCommand") {
      const issued = Date.parse(payload.issued_at);
      const expires = Date.parse(payload.expires_at);
      if (Number.isFinite(issued) && Number.isFinite(expires) && expires <= issued) {
        throw new Error(`${relPath}: expires_at must be greater than issued_at`);
      }
    }
    if (payload?.contract_name === "AuditRbacAccessDecision") {
      if (payload.decision === "allow" && payload.error !== null) {
        throw new Error(`${relPath}: allow decision must not include error object`);
      }
      if (payload.decision === "deny" && payload.error === null) {
        throw new Error(`${relPath}: deny decision must include error object`);
      }
    }
    if (payload?.contract_name === "AuditReplayVerificationResult") {
      if (payload.result === "mismatch" && Array.isArray(payload.differences) && payload.differences.length === 0) {
        throw new Error(`${relPath}: mismatch replay result must include at least one difference`);
      }
    }
    return;
  }

  if (
    typeof payload.severity_min === "number"
    && typeof payload.severity_max === "number"
    && payload.severity_max < payload.severity_min
  ) {
    throw new Error(`${relPath}: severity_max must be >= severity_min`);
  }
}

const schemaRelPaths = await collectSchemaFiles();
const index = await readJson("schema-index.json");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const contractSchemaIdByName = new Map();
for (const rel of schemaRelPaths) {
  const schema = await readJson(rel);
  ajv.addSchema(schema);
  const contractName = schema?.properties?.contract_name?.const;
  if (contractName && schema.$id) {
    contractSchemaIdByName.set(contractName, schema.$id);
  }
}

for (const entry of index.entries) {
  const schema = await readJson(entry.schema);
  const example = await readJson(entry.example);
  const validate = ajv.getSchema(schema.$id);
  if (!validate) {
    throw new Error(`Missing compiled schema for ${entry.schema}`);
  }
  if (!validate(example)) {
    throw new Error(`Index example failed ${entry.example}: ${formatAjvErrors(validate.errors)}`);
  }
}

const validExampleFiles = await collectJsonFiles("examples/valid");
const invalidExampleFiles = await collectJsonFiles("examples/invalid");
if (validExampleFiles.length === 0) {
  throw new Error("examples/valid must contain at least one JSON fixture");
}
if (invalidExampleFiles.length === 0) {
  throw new Error("examples/invalid must contain at least one JSON fixture");
}

for (const rel of validExampleFiles) {
  const payload = await readJson(rel);
  validatePolicySemantics(payload, rel);
  const contractName = payload?.contract_name;
  const schemaId = contractSchemaIdByName.get(contractName);
  if (!schemaId) {
    throw new Error(`${rel}: unknown contract_name '${contractName}'`);
  }
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`${rel}: missing compiled schema for ${schemaId}`);
  }
  if (!validate(payload)) {
    throw new Error(`${rel}: expected valid but failed: ${formatAjvErrors(validate.errors)}`);
  }
}

for (const rel of invalidExampleFiles) {
  const payload = await readJson(rel);
  const contractName = payload?.contract_name;
  const schemaId = contractSchemaIdByName.get(contractName);
  if (!schemaId) {
    throw new Error(`${rel}: invalid fixtures must include known contract_name`);
  }
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`${rel}: missing compiled schema for ${schemaId}`);
  }
  if (validate(payload)) {
    throw new Error(`${rel}: expected invalid but passed schema validation`);
  }
}

const signingMdPath = full("signing.md");
try {
  await fs.access(signingMdPath);
  const signingVectors = await collectJsonFilesRecursive("examples/signing");
  if (signingVectors.length === 0) {
    throw new Error("signing.md exists but examples/signing has no vectors");
  }
  for (const rel of signingVectors) {
    const vector = await readJson(rel);
    validateSigningVector(vector, rel);
  }
} catch (err) {
  if (err.code !== "ENOENT") {
    throw err;
  }
}

console.log(`Contract tests passed: ${validExampleFiles.length} valid fixtures, ${invalidExampleFiles.length} invalid fixtures.`);
