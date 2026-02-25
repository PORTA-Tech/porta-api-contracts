# Signing Requirements

## Signed objects
- Regulation policies
- Intervention commands

## Canonicalization
- RFC 8785 JSON Canonicalization Scheme (JCS) is required.
- Canonicalization input excludes only `signature.signature`.
- Canonical payload hash is SHA-256 (hex).

## Algorithm
- Ed25519 detached signatures.
- Signature encoding is base64url (no padding).

## Signature envelope
```json
{
  "signature": {
    "algorithm": "Ed25519",
    "signing_key_id": "kid-a13f09bc-v3",
    "signature": "base64url-signature",
    "created_at": "2026-02-23T14:00:00Z"
  }
}
```

## Verification path
1. Schema-validate payload.
2. Resolve signing key from trust store.
3. Reject if key is revoked.
4. Reject if policy id is revoked.
5. Canonicalize payload (JCS).
6. Verify Ed25519 signature.
7. Reject on any mismatch (fail closed).

## Key management
- Trusted keys: `trust/keys/trusted-signing-keys.json`.
- Revoked keys: `trust/keys/revoked-signing-keys.json`.
- Revoked policies: `trust/policies/revoked-policies.json`.
- Unknown key IDs are rejected.

## Audit requirements
Emit audit events on ingestion:
- `policy.ingested`
- `policy.signature_verified`
- `policy.rejected`

Include:
- `signing_key_id`
- verification result
- timestamp
- canonical SHA-256 hash
