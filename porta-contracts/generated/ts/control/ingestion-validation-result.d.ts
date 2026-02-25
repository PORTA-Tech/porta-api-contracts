export interface ControlPlaneIngestionValidationResult {
  contract_name: "ControlPlaneIngestionValidationResult";
  schema_version: "1.0.0";
  result_id: string;
  schema_name: string;
  declared_schema_version: string;
  producer_id: string;
  validated_at: string;
  decision: "accept" | "reject";
  error_code?: string | null;
  verification_result: "verified" | "not_required" | "invalid_signature" | "unknown_key" | "revoked_key";
  compatibility_result:
    | "compatible"
    | "incompatible_major"
    | "incompatible_minor"
    | "strict_mismatch"
    | "unknown_schema_version";
}
