import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import semver from "semver";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function full(p) {
  return path.join(contractsRoot, p);
}

async function readJson(relPath) {
  const raw = await fs.readFile(full(relPath), "utf8");
  return JSON.parse(raw);
}

const SCHEMA_DIRS = ["audit", "control", "events", "interventions", "policies", "primitives", "shared", "states"];

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

function validateEnumIntegrity(node, at, relPath, errors) {
  if (!node || typeof node !== "object") {
    return;
  }

  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i += 1) {
      validateEnumIntegrity(node[i], `${at}[${i}]`, relPath, errors);
    }
    return;
  }

  if (Object.prototype.hasOwnProperty.call(node, "enum")) {
    if (!Array.isArray(node.enum) || node.enum.length === 0) {
      errors.push(`${relPath}: ${at}.enum must be a non-empty array`);
    } else {
      const seen = new Set();
      for (const value of node.enum) {
        if (value && typeof value === "object") {
          errors.push(`${relPath}: ${at}.enum contains non-scalar value`);
          break;
        }
        const key = JSON.stringify(value);
        if (seen.has(key)) {
          errors.push(`${relPath}: ${at}.enum contains duplicate value ${key}`);
          break;
        }
        seen.add(key);
      }
    }
  }

  for (const [k, v] of Object.entries(node)) {
    validateEnumIntegrity(v, `${at}.${k}`, relPath, errors);
  }
}

const index = await readJson("schema-index.json");
const schemaRelPaths = await collectSchemaFiles();

const schemas = [];
for (const rel of schemaRelPaths) {
  const schema = await readJson(rel);
  schemas.push({ rel, schema });
}

const validationErrors = [];

for (const { rel, schema } of schemas) {
  if (rel === "shared/common-defs.schema.json") {
    continue;
  }

  const props = schema.properties ?? {};
  const required = schema.required ?? [];

  if (props.contract_name?.const === undefined) {
    throw new Error(`${rel}: properties.contract_name.const is required`);
  }

  if (props.schema_version?.const === undefined) {
    validationErrors.push(`${rel}: properties.schema_version.const is required`);
  } else if (!semver.valid(props.schema_version.const)) {
    validationErrors.push(`${rel}: properties.schema_version.const must be valid semver`);
  }

  if (!required.includes("contract_name") || !required.includes("schema_version")) {
    validationErrors.push(`${rel}: required[] must include contract_name and schema_version`);
  }

  validateEnumIntegrity(schema, "$", rel, validationErrors);
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

for (const { schema } of schemas) {
  ajv.addSchema(schema);
}

for (const entry of index.entries) {
  const schema = await readJson(entry.schema);
  const example = await readJson(entry.example);

  const validate = ajv.getSchema(schema.$id);
  if (!validate) {
    validationErrors.push(`Missing compiled schema for ${entry.schema}`);
    continue;
  }
  const ok = validate(example);
  if (!ok) {
    const errors = (validate.errors ?? [])
      .map((e) => `${e.instancePath || "/"} ${e.message}`)
      .join("; ");
    validationErrors.push(`Example validation failed for ${entry.example}: ${errors}`);
  }
}

if (validationErrors.length > 0) {
  for (const err of validationErrors) {
    console.error(err);
  }
  process.exit(1);
}

console.log(`Validated ${schemaRelPaths.length} schemas and ${index.entries.length} examples.`);
