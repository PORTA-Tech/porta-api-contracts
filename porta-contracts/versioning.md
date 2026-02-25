# Contract Versioning Rules

## Semantic versioning
- MAJOR: remove field, change field type, remove enum value, new required field, or behaviorally incompatible constraints.
- MINOR: add optional field, add enum value, add backward-compatible schema branch.
- PATCH: docs/metadata only.

## Compatibility enforcement
- Services must reject unknown major versions.
- Services may accept supported major with greater or equal minor.
- Version mismatches must be logged and counted in `contract_version_mismatch_total`.

## Repository policy
- Any schema content change requires a version bump in that same schema file.
- Patch bump with structural schema changes is blocked.
- Breaking changes without major bump are blocked.

## Migration policy
- Breaking change requires new major and dual-read window.
- Deprecation window must be announced before old major removal.