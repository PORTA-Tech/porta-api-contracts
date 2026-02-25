export interface ControlPlaneTypedIngestionEnvelope {
  contract_name: "ControlPlaneTypedIngestionEnvelope";
  schema_version: "1.0.0";
  ingestion_id: string;
  schema_name: string;
  declared_schema_version: string;
  producer_id: string;
  timestamp: string;
  payload: {
    [k: string]: unknown;
  };
  canonicalization: "JCS-RFC8785";
  signature?: {
    algorithm: "Ed25519";
    signing_key_id: string;
    signature: string;
  } | null;
}
