# porta-api-contracts

Shared DTOs and OpenAPI contracts for PORTA Fleet Control Plane.

## Scope
- Single source of truth for API shapes used by:
  - `porta-control-plane` (8A)
  - `porta-operations-console` (8B)

## Versioning Policy
- `config_seq` is authoritative for rollout ordering and anti-replay.
- Breaking DTO/OpenAPI changes require a major version bump.
- Additive, backward-compatible fields require a minor version bump.
- Patch version is for non-schema fixes and docs.
- Deprecated fields must be documented for at least one minor cycle before removal.
