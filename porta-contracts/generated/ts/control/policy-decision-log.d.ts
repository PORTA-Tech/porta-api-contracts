export interface ControlPlanePolicyDecisionLog {
  contract_name: "ControlPlanePolicyDecisionLog";
  schema_version: "1.0.0";
  decision_id: string;
  evaluated_at: string;
  policy_id: string;
  policy_hash: string;
  /**
   * @maxItems 32
   */
  input_metrics: {
    schema_name: string;
    metric_name: string;
    aggregation: "avg" | "p95" | "p99" | "max" | "min";
    window_seconds: number;
    value: number;
  }[];
  condition_evaluation: {
    operator: ">" | ">=" | "<" | "<=" | "==" | "!=";
    threshold: number;
    actual_value: number;
    matched: boolean;
  };
  decision_result:
    | "triggered"
    | "condition_not_met"
    | "cooldown_active"
    | "hourly_cap_reached"
    | "global_cap_reached"
    | "kill_switch_active"
    | "safety_cap_reached";
  policy_order_index: number;
}
