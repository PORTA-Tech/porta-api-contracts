import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptsRoot = path.join(contractsRoot, "scripts");

const entries = await fs.readdir(scriptsRoot, { withFileTypes: true });
const scriptFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".mjs"))
  .map((entry) => path.join("scripts", entry.name).replace(/\\/g, "/"))
  .sort();

for (const rel of scriptFiles) {
  execFileSync("node", ["--check", rel], {
    cwd: contractsRoot,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

console.log(`Build check passed for ${scriptFiles.length} contract scripts.`);
