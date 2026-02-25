export interface AuditDecisionTrace {
  contract_name: "AuditDecisionTrace";
  schema_version: "1.0.0";
  trace_schema_version: "audit.decision.v1.0.0";
  trace_id: string;
  timestamp: string;
  policy_id: string;
  state_version: number;
  target_service: string;
  metrics_snapshot: {
    [k: string]: number | string | boolean;
  };
  condition_result: boolean;
  action_decision: "intervene" | "skip" | "cooldown" | "blocked";
  action_parameters: {
    [k: string]: number | string | boolean;
  };
  confidence_score?: number | null;
  triggered_by: string;
  signature: {
    algorithm: "Ed25519";
    key_id: "cp-root-key-01";
    signature: string;
  };
}
