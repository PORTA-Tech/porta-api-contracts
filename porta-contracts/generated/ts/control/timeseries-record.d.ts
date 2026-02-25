export interface ControlPlaneTimeSeriesRecord {
  contract_name: "ControlPlaneTimeSeriesRecord";
  schema_version: "1.0.0";
  record_id: string;
  schema_name: string;
  validated_schema_version: string;
  producer_id: string;
  timestamp: string;
  ingestion_time: string;
  payload: {
    [k: string]: unknown;
  };
  payload_canonical: string;
  validation_hash: string;
  signature_hash?: string | null;
  signature_verification_result: "verified" | "not_required" | "invalid_signature" | "unknown_key" | "revoked_key";
  immutability_mode: "mutable" | "append_only" | "worm";
}
