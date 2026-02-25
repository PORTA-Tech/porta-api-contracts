import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(contractsRoot, "..");
const tscJsPath = path.join(contractsRoot, "node_modules", "typescript", "lib", "tsc.js");

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

try {
  run("node", ["scripts/generate-ts-clients.mjs"], contractsRoot);
  run("git", ["diff", "--exit-code", "--", "porta-contracts/generated/ts"], repoRoot);

  const untracked = run("git", ["ls-files", "--others", "--exclude-standard", "--", "porta-contracts/generated/ts"], repoRoot);
  if (untracked) {
    console.error("Generated client output has untracked files.");
    console.error(untracked);
    process.exit(1);
  }

  run("node", [tscJsPath, "-p", "./clients/ts/tsconfig.json", "--noEmit"], contractsRoot);
} catch (err) {
  console.error("Client generation check failed.");
  if (err.stderr) {
    process.stderr.write(err.stderr);
  }
  if (err.stdout) {
    process.stdout.write(err.stdout);
  }
  if (err.message) {
    console.error(err.message);
  }
  process.exit(1);
}

console.log("Generated client output is up-to-date and compiles.");
