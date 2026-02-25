export interface InterventionAppliedEvent {
  contract_name: "InterventionAppliedEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "intervention.applied";
  timestamp: string;
  ingestion_timestamp: string;
  payload: {
    intervention_id: string;
    policy_id: string;
    state_id: string;
    applied_at: string;
    duration_ms: number;
    outcome: "success" | "noop" | "deferred";
  };
}
