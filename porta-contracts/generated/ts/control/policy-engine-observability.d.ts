export interface ControlPlanePolicyEngineObservabilityMetric {
  contract_name: "ControlPlanePolicyEngineObservabilityMetric";
  schema_version: "1.0.0";
  metric_id: string;
  metric_name:
    | "policy_evaluations_total"
    | "policy_trigger_total"
    | "intervention_signed_total"
    | "intervention_rejected_total"
    | "policy_cooldown_active_total"
    | "state_conflict_retries_total";
  policy_id: string | null;
  window_start: string;
  window_end: string;
  value: number;
  labels: {
    [k: string]: string;
  };
}
