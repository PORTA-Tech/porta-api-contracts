import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(contractsRoot, "generated", "canonical");

function full(p) {
  return path.join(contractsRoot, p);
}

function normalize(value) {
  if (Array.isArray(value)) {
    return value.map(normalize);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = normalize(value[key]);
    }
    return out;
  }
  return value;
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

await fs.rm(outRoot, { recursive: true, force: true });
await fs.mkdir(outRoot, { recursive: true });

const schemaRelPaths = await collectSchemaFiles();
for (const rel of schemaRelPaths) {
  const raw = await fs.readFile(full(rel), "utf8");
  const parsed = JSON.parse(raw);
  const normalized = normalize(parsed);
  const outPath = path.join(outRoot, rel);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
}

console.log(`Generated normalized snapshots for ${schemaRelPaths.length} schemas.`);
