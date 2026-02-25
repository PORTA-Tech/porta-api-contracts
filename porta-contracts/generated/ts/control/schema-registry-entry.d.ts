export interface ControlPlaneSchemaRegistryEntry {
  contract_name: "ControlPlaneSchemaRegistryEntry";
  schema_version: "1.0.0";
  schema_name: string;
  registered_schema_version: string;
  compatibility_mode: "exact_major_backward_minor_patch" | "strict_exact" | "full";
  deprecation_state: "active" | "deprecated" | "blocked";
  /**
   * @minItems 1
   */
  allowed_producers: [string, ...string[]];
  required_signature: boolean;
  required_mtls: boolean;
  minimum_supported_minor: number;
  maximum_supported_minor: number;
  allow_patch: boolean;
  max_payload_bytes: number;
  max_clock_skew_seconds: number;
  updated_at: string;
}
