export interface AuditObservabilityMetric {
  contract_name: "AuditObservabilityMetric";
  schema_version: "1.0.0";
  metric_id: string;
  metric_name:
    | "audit_traces_written_total"
    | "audit_traces_failed_total"
    | "audit_access_denied_total"
    | "audit_replay_mismatch_total"
    | "audit_signature_verification_total";
  window_start: string;
  window_end: string;
  value: number;
  labels: {
    [k: string]: string;
  };
}
