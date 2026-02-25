# porta-contracts

Canonical contract repository for PORTA. This folder is the single source of truth for shared schemas used by agent, control-plane, console, and tray.

## Scope
- `events/`
- `primitives/`
- `states/`
- `policies/`
- `interventions/`
- `audit/`
- `shared/`

## Rules
- Every schema includes `contract_name` and `schema_version`.
- Contracts follow strict semantic versioning.
- Breaking changes require major bump.
- CI enforces schema validity, compatibility policy, and generated type compile checks.

## Commands
- `npm run contracts:validate`
- `npm run contracts:compat`
- `npm run contracts:generate`
- `npm run contracts:typecheck`
- `npm run contracts:check`

## Notes
- Runtime transport can remain JSON now; schema format is JSON Schema draft 2020-12.
- Policy and intervention signing requirements are documented in `signing.md`.