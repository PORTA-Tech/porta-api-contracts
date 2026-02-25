# Control-Plane Inference and Policy Execution (Step 10)

This document fixes the deterministic execution model for `cp-policy-engine`.

## Runtime constants

- service: `cp-policy-engine`
- consensus: `etcd v3.5.x`
- state store: `TimescaleDB 2.x` + etcd state keys
- signature algorithm: `Ed25519`
- hash: `SHA-256`
- clock tolerance: `+/-2s`

## Policy contract

Primary schema:
- `control/policy-execution-policy.schema.json`

Hard fields:
- `policy_id` (UUID)
- `schema_version=1.0.0`
- `enabled`
- `priority` (`1..1000`)
- `resource_scope`
- `trigger`
- `condition`
- `action`
- `cool_down_seconds`
- `max_triggers_per_hour`
- `created_at`
- `signature` (`algorithm=Ed25519`, `key_id=cp-root-key-01`)

## State model

Primary schema:
- `control/policy-engine-state.schema.json`

State key format:
- `/state/{environment}/{service}`

Version rule:
- increment version by `+1` on each mutation
- optimistic concurrency check is required at persistence boundary

## Signed intervention command

Primary schema:
- `control/signed-intervention-command.schema.json`

Required command properties:
- `command_schema_version=intervention.command.v1.0.0`
- `state_version`
- `signature_input_hash` (`SHA256(canonical_json(command_without_signature))`)
- `signature` (`Ed25519`, `cp-root-key-01`)

## Deterministic execution order

The vector test enforces:
1. enabled policy fetch
2. sort by `priority asc`, then `policy_id` lexicographic
3. metric condition evaluation
4. cooldown check
5. hourly trigger cap check
6. safety cap checks
7. state mutation + signed command emission

## Safety caps

- max scale increase per 10 minutes per service: `+6`
- max traffic shift per hour per service: `50%`
- global intervention cap per cluster/hour: `30`
- kill switch: `kill_switch_enabled=false` blocks all interventions

## Audit and observability contracts

- decision log: `control/policy-decision-log.schema.json`
- observability metrics: `control/policy-engine-observability.schema.json`

Metric names:
- `policy_evaluations_total`
- `policy_trigger_total`
- `intervention_signed_total`
- `intervention_rejected_total`
- `policy_cooldown_active_total`
- `state_conflict_retries_total`

## CI enforcement

`npm run contracts:tests` includes:
- `scripts/validate-control-plane-policy-execution.mjs`

Vectors:
- `examples/control/policy-execution-vectors/*.json`
