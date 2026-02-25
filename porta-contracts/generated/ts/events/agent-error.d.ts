export interface AgentErrorEvent {
  contract_name: "AgentErrorEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "agent.error";
  timestamp: string;
  ingestion_timestamp: string;
  payload: {
    error_code: string;
    severity: "low" | "medium" | "high" | "critical";
    retryable: boolean;
  };
}
