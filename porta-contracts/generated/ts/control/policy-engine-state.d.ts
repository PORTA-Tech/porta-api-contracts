export interface ControlPlanePolicyEngineState {
  contract_name: "ControlPlanePolicyEngineState";
  schema_version: "1.0.0";
  state_key: string;
  environment: string;
  service: string;
  replicas: number;
  last_scale_time: string | null;
  last_policy_trigger: string | null;
  trigger_count_last_hour: number;
  version: number;
  updated_at: string;
}
