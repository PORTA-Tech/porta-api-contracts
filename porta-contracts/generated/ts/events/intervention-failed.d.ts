export interface InterventionFailedEvent {
  contract_name: "InterventionFailedEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "intervention.failed";
  timestamp: string;
  ingestion_timestamp: string;
  payload: {
    intervention_id: string;
    policy_id: string;
    error_code: string;
    error_class: "validation" | "execution" | "authorization" | "dependency";
    failed_at: string;
  };
}
