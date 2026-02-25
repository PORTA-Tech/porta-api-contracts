# Control-Plane Ingestion and Validation (Step 9)

This document fixes the ingestion contract and validation behavior for control-plane payload processing.

## 1) Typed envelope contract

Use `ControlPlaneTypedIngestionEnvelope` (`control/typed-ingestion-envelope.schema.json`) for every inbound payload.

Required envelope fields:
- `schema_name`
- `declared_schema_version`
- `producer_id`
- `timestamp`
- `payload`
- `canonicalization = JCS-RFC8785`
- `signature` when the registry marks signature as required

## 2) Schema registry and compatibility

Use `ControlPlaneSchemaRegistryEntry` (`control/schema-registry-entry.schema.json`) per accepted schema/version stream.

Default compatibility mode:
- `exact_major_backward_minor_patch`

Deterministic compatibility rules:
- major must match exactly
- minor must be in `[minimum_supported_minor, maximum_supported_minor]`
- patch allowed when `allow_patch=true`

Hard rejection error code:
- `SCHEMA_VERSION_INCOMPATIBLE`

## 3) Validation pipeline

Validation order is deterministic and fail-closed:
1. schema deprecation state (`blocked` rejects)
2. schema name match
3. producer allow-list
4. signature requirement + signature verification result
5. semantic version compatibility
6. payload byte-size limit
7. clock-skew limit

Structured outputs:
- `ControlPlaneIngestionValidationResult`
- reject codes include: `UNKNOWN_SCHEMA`, `PRODUCER_REVOKED`, `SIGNATURE_REQUIRED`, `SIGNATURE_INVALID`, `SIGNING_KEY_UNKNOWN`, `SIGNING_KEY_REVOKED`, `SCHEMA_VERSION_INCOMPATIBLE`, `PAYLOAD_TOO_LARGE`, `CLOCK_SKEW_EXCEEDED`

## 4) Time-series storage record

Persist accepted records using `ControlPlaneTimeSeriesRecord`:
- event `timestamp` and `ingestion_time`
- `validated_schema_version`
- canonical payload string (`payload_canonical`)
- `validation_hash` (SHA-256)
- `signature_hash` (SHA-256 when present)
- `signature_verification_result`

This supports deterministic replay and post-incident audit.

## 5) Ingestion observability

Use `ControlPlaneIngestionHealthMetric` for ingestion health telemetry.

Tracked metrics:
- `validation_failures_total`
- `schema_mismatch_rate`
- `ingestion_latency_p95_ms`
- `producer_error_rate`
- `signature_verification_failures_total`

## 6) CI enforcement

`npm run contracts:tests` now runs:
- schema fixture tests (`run-contract-tests.mjs`)
- policy signature vectors (`validate-policy-signatures.mjs`)
- control-plane ingestion vectors (`validate-control-plane-ingestion.mjs`)

The ingestion vector suite is at:
- `examples/control/ingestion-vectors/*.json`
