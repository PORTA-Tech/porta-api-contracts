export interface AgentPrimitiveEvent {
  contract_name: "AgentPrimitiveEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "agent.primitive";
  timestamp: string;
  ingestion_timestamp: string;
  payload: BehaviorPrimitive;
}
export interface BehaviorPrimitive {
  contract_name: "BehaviorPrimitive";
  schema_version: "1.0.0";
  primitive_id: string;
  machine_id: string;
  name:
    | "motor_volatility_index"
    | "interaction_burst_intensity"
    | "focus_switch_rate"
    | "sustained_attention_duration"
    | "idle_fragmentation_index"
    | "notification_reactivity_index";
  value: number;
  unit: string;
  baseline_mean: number;
  baseline_std: number;
  z_score: number;
  ewma: number;
  window_size: number;
  confidence: number;
  computed_at: string;
}
