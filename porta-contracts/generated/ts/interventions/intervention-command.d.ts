export interface InterventionCommand {
  contract_name: "InterventionCommand";
  schema_version: "1.0.0";
  intervention_id: string;
  machine_id: string;
  intervention_type:
    | "notify"
    | "reduce_load"
    | "restart_service"
    | "isolate_component"
    | "escalate_to_human"
    | "pause_agent";
  policy_id: string;
  state_id: string;
  issued_at: string;
  expires_at: string;
  parameters: {
    [k: string]: string | number | boolean;
  };
  signature: string;
  correlation_id: string;
}
