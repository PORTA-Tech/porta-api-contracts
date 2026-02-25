import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(contractsRoot, "..");
const baseRef = process.env.CONTRACTS_BASE_REF || "origin/main";

function run(command, args, cwd = repoRoot) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function listChangedFiles(pathSpec) {
  const output = run("git", ["diff", "--name-only", `${baseRef}...HEAD`, "--", pathSpec]);
  if (!output) {
    return [];
  }
  return output.split(/\r?\n/).filter(Boolean);
}

try {
  run("node", ["scripts/check-compatibility.mjs"], contractsRoot);
  run("node", ["scripts/generate-normalized-schemas.mjs"], contractsRoot);
} catch (err) {
  if (err.stderr) {
    process.stderr.write(err.stderr);
  }
  if (err.stdout) {
    process.stdout.write(err.stdout);
  }
  process.exit(1);
}

try {
  run("git", ["diff", "--exit-code", "--", "porta-contracts/generated/canonical"], repoRoot);
} catch {
  console.error("Schema drift detected: committed canonical snapshots differ from generated output.");
  process.exit(1);
}

const changedSchemas = listChangedFiles("porta-contracts").filter((f) => f.endsWith(".schema.json"));
if (changedSchemas.length > 0) {
  const matrixChanged = listChangedFiles("porta-contracts/compatibility-matrix.md").length > 0;
  if (!matrixChanged) {
    console.error("Schema change detected without compatibility-matrix.md update.");
    process.exit(1);
  }
}

console.log(`Schema drift checks passed against ${baseRef}.`);
