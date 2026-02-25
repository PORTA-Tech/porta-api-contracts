export interface ControlPlaneIngestionHealthMetric {
  contract_name: "ControlPlaneIngestionHealthMetric";
  schema_version: "1.0.0";
  metric_id: string;
  metric_name:
    | "validation_failures_total"
    | "schema_mismatch_rate"
    | "ingestion_latency_p95_ms"
    | "producer_error_rate"
    | "signature_verification_failures_total";
  producer_id?: string | null;
  schema_name?: string | null;
  window_start: string;
  window_end: string;
  value: number;
  unit: "count" | "ratio" | "ms" | "bytes";
  labels: {
    [k: string]: string;
  };
}
