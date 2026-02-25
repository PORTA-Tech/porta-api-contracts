import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import semver from "semver";

const contractsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(contractsRoot, "..");
const baseRef = process.env.CONTRACTS_BASE_REF || "origin/main";

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

function stripMetadata(value) {
  if (Array.isArray(value)) {
    return value.map(stripMetadata);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (["description", "$comment", "examples"].includes(k)) {
        continue;
      }
      out[k] = stripMetadata(v);
    }
    return out;
  }
  return value;
}

function getVersion(schema, rel) {
  const version = schema?.properties?.schema_version?.const;
  if (!version || !semver.valid(version)) {
    throw new Error(`${rel}: schema_version.const must be valid semver`);
  }
  return version;
}

function arrayDiff(oldArr = [], newArr = []) {
  const oldSet = new Set(oldArr);
  const newSet = new Set(newArr);
  return {
    removed: [...oldSet].filter((v) => !newSet.has(v)),
    added: [...newSet].filter((v) => !oldSet.has(v))
  };
}

function detectBreaking(oldSchema, newSchema) {
  let major = false;

  function walk(oldNode, newNode, at) {
    if (major) {
      return;
    }

    if (oldNode === undefined || newNode === undefined) {
      return;
    }

    if (typeof oldNode !== typeof newNode) {
      major = true;
      return;
    }

    if (oldNode && typeof oldNode === "object") {
      if (Array.isArray(oldNode) || Array.isArray(newNode)) {
        return;
      }

      const oldType = oldNode.type;
      const newType = newNode.type;
      if (oldType && newType && JSON.stringify(oldType) !== JSON.stringify(newType)) {
        major = true;
        return;
      }

      const oldEnum = oldNode.enum;
      const newEnum = newNode.enum;
      if (Array.isArray(oldEnum) && Array.isArray(newEnum)) {
        const { removed } = arrayDiff(oldEnum, newEnum);
        if (removed.length > 0) {
          major = true;
          return;
        }
      }

      const oldReq = oldNode.required;
      const newReq = newNode.required;
      if (Array.isArray(oldReq) && Array.isArray(newReq)) {
        const { added } = arrayDiff(oldReq, newReq);
        if (added.length > 0) {
          major = true;
          return;
        }
      }

      const oldProps = oldNode.properties;
      const newProps = newNode.properties;
      if (oldProps && newProps && typeof oldProps === "object" && typeof newProps === "object") {
        for (const key of Object.keys(oldProps)) {
          if (!(key in newProps)) {
            major = true;
            return;
          }
        }
        for (const key of Object.keys(oldProps)) {
          walk(oldProps[key], newProps[key], `${at}.properties.${key}`);
        }
      }

      if (oldNode.items && newNode.items) {
        walk(oldNode.items, newNode.items, `${at}.items`);
      }
    }
  }

  walk(oldSchema, newSchema, "$root");
  return major;
}

async function readJson(relPath) {
  const raw = await fs.readFile(full(relPath), "utf8");
  return JSON.parse(raw);
}

function readBaseFile(relPath) {
  const gitPath = `porta-contracts/${relPath}`.replace(/\\/g, "/");
  try {
    const raw = execFileSync("git", ["show", `${baseRef}:${gitPath}`], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const index = await readJson("schema-index.json");
const schemaRelPaths = Array.from(new Set(index.entries.map((e) => e.schema)));

const errors = [];

for (const rel of schemaRelPaths) {
  const current = await readJson(rel);
  const previous = readBaseFile(rel);

  const currentVersion = getVersion(current, rel);

  if (!previous) {
    continue;
  }

  const previousVersion = getVersion(previous, rel);

  const currentNormalized = JSON.stringify(normalize(current));
  const previousNormalized = JSON.stringify(normalize(previous));

  if (currentNormalized === previousNormalized) {
    continue;
  }

  if (!semver.gt(currentVersion, previousVersion)) {
    errors.push(`${rel}: schema changed but schema_version did not increase (${previousVersion} -> ${currentVersion})`);
    continue;
  }

  const structuralCurrent = JSON.stringify(normalize(stripMetadata(current)));
  const structuralPrevious = JSON.stringify(normalize(stripMetadata(previous)));
  const structuralChanged = structuralCurrent !== structuralPrevious;

  const majorRequired = detectBreaking(previous, current);
  const diffType = semver.diff(previousVersion, currentVersion);

  if (majorRequired && diffType !== "major") {
    errors.push(`${rel}: breaking change detected but version bump is not major (${previousVersion} -> ${currentVersion})`);
    continue;
  }

  if (structuralChanged && !majorRequired && diffType === "patch") {
    errors.push(`${rel}: structural change requires at least minor bump (${previousVersion} -> ${currentVersion})`);
    continue;
  }
}

if (errors.length > 0) {
  for (const err of errors) {
    console.error(err);
  }
  process.exit(1);
}

console.log(`Compatibility checks passed against ${baseRef}.`);
