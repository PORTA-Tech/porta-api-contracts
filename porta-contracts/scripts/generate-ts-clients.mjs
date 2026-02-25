import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compileFromFile } from "json-schema-to-typescript";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function full(p) {
  return path.join(contractsRoot, p);
}

const indexRaw = await fs.readFile(full("schema-index.json"), "utf8");
const index = JSON.parse(indexRaw);
const schemaRelPaths = Array.from(new Set(index.entries.map((e) => e.schema)));

const outRoot = full("generated/ts");
await fs.rm(outRoot, { recursive: true, force: true });
await fs.mkdir(outRoot, { recursive: true });

const exports = [];

for (const rel of schemaRelPaths) {
  const inPath = full(rel);
  const outRel = rel
    .replace(/\.schema\.json$/, "")
    .replace(/\\/g, "/");
  const outPath = full(`generated/ts/${outRel}.d.ts`);
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  const ts = await compileFromFile(inPath, {
    bannerComment: "",
    unreachableDefinitions: true,
    style: {
      singleQuote: false
    }
  });

  await fs.writeFile(outPath, ts, "utf8");
  exports.push(`export * from "./${outRel}";`);
}

await fs.writeFile(full("generated/ts/index.d.ts"), `${exports.join("\n")}\n`, "utf8");

console.log(`Generated ${schemaRelPaths.length} TypeScript declaration files.`);
