export interface ControlPlaneExecutionPolicy {
  contract_name: "ControlPlaneExecutionPolicy";
  schema_version: "1.0.0";
  policy_id: string;
  enabled: boolean;
  priority: number;
  resource_scope: {
    service: string;
    environment: string;
    region?: string;
  };
  trigger: {
    schema_name: string;
    metric_name: string;
    aggregation: "avg" | "p95" | "p99" | "max" | "min";
    window_seconds: number;
  };
  condition: {
    operator: ">" | ">=" | "<" | "<=" | "==" | "!=";
    threshold: number;
  };
  action:
    | {
        type: "scale_horizontal";
        min_replicas: number;
        max_replicas: number;
        scale_step: number;
      }
    | {
        type: "restart_pods";
        max_parallel: number;
      }
    | {
        type: "traffic_shift";
        shift_percentage: number;
        target_cluster: string;
      };
  cool_down_seconds: number;
  max_triggers_per_hour: number;
  created_at: string;
  signature: {
    algorithm: "Ed25519";
    key_id: "cp-root-key-01";
    signature: string;
  };
}
