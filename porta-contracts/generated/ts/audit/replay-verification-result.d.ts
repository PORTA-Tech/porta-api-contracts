export interface AuditReplayVerificationResult {
  contract_name: "AuditReplayVerificationResult";
  schema_version: "1.0.0";
  verification_id: string;
  trace_id: string;
  verified_at: string;
  result: "match" | "mismatch";
  /**
   * @maxItems 128
   */
  differences: {
    field_name: string;
    expected_value: string | number | boolean | null;
    actual_value: string | number | boolean | null;
  }[];
  signature_verification: "verified" | "invalid";
}
