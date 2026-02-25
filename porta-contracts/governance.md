# Control-Plane Audit and Governance (Step 11)

Step 11 adds deterministic governance and audit guarantees with concrete, enforceable values.

## Decision traces

Schema:
- `audit/decision-trace.schema.json`

Required:
- `trace_schema_version=audit.decision.v1.0.0`
- trace identity, policy reference, state version, target, metrics snapshot
- decision result and action parameters
- control-plane signature (`Ed25519`, `cp-root-key-01`)

## RBAC enforcement model

Schema:
- `audit/rbac-access-decision.schema.json`

Roles:
- `admin`, `operator`, `auditor`, `developer`, `agent`

Denials use:
- `error_code=RBAC_DENIED`

## Retention and access

Schema:
- `audit/retention-policy.schema.json`

Hard values:
- decision traces: `1095` days (3 years)
- intervention commands: `365` days
- metric snapshots: hot `90` days, cold `730` days
- policy versions: `indefinite`

Storage model:
- `TimescaleDB`
- table: `audit_decision_traces`
- monthly partitions
- append-only
- immutable backups

## Replay verification

Schema:
- `audit/replay-verification-result.schema.json`

Replay output:
- `match` or `mismatch`
- field-level differences
- signature verification status

## Audit observability metrics

Schema:
- `audit/audit-observability-metric.schema.json`

Metric names:
- `audit_traces_written_total`
- `audit_traces_failed_total`
- `audit_access_denied_total`
- `audit_replay_mismatch_total`
- `audit_signature_verification_total`

## CI governance gate

Required test:
- `scripts/validate-audit-governance.mjs`

Vector source:
- `examples/audit/governance-vectors/*.json`
