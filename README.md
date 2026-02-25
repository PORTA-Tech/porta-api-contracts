# PORTA API Contracts

Shared contracts package for PORTA services.

This repository is the single source of truth for DTOs and OpenAPI specs used by the control-plane and operations console.

## What This Repository Owns

- TypeScript DTO definitions under `src/dtos/`
- Contract validation utilities under `src/utils/`
- OpenAPI specs:
  - `src/openapi/control-plane.yaml`
  - `src/openapi/rollout.yaml`
- Package exports consumed as `@porta/api-contracts`

## Why It Exists

- Prevent schema drift between repos
- Keep wire format deterministic and versioned
- Make CI contract checks enforceable (types/build/client generation/compatibility)

## Versioning Rules

- SemVer is mandatory
- `MAJOR`: breaking schema/contract change
- `MINOR`: additive backward-compatible change
- `PATCH`: non-breaking fixes

For rollout/config flows, `config_seq` remains authoritative for ordering and anti-replay.

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

### Type-check

```bash
npm run check
```

### Tests

```bash
npm test
```

## Package Output

- Runtime JS: `dist/index.js`
- Type declarations: `dist/index.d.ts`
- Exported package files: `dist/`, `src/openapi/`

## Consumers

- `porta-control-plane` (runtime and API validation)
- `porta-operations-console` (typed API generation and DTO alignment)

## Contract Change Checklist

1. Update DTO/OpenAPI files in this repo.
2. Apply SemVer bump consistent with change type.
3. Rebuild package (`npm run build`).
4. Regenerate downstream clients/types where applicable.
5. Run CI gates (build/types/tests/contracts/compat/client-generation/schema-drift).

## Boundaries

This repo does not own:

- Runtime policy execution: `porta-control-plane`
- UI rendering and operator workflows: `porta-operations-console`
- Endpoint signal capture/tray/service runtime: `porta-agent-windows-x64`
