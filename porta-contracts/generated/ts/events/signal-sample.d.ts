export interface SignalSampleEvent {
  contract_name: "SignalSampleEvent";
  schema_version: "1.0.0";
  event_id: string;
  machine_id: string;
  event_type: "signal.sample";
  timestamp: string;
  ingestion_timestamp: string;
  payload: {
    sample_interval_ms: number;
    keyboard_interval_ms: number;
    mouse_acceleration: number;
    scroll_velocity: number;
    focus_switch_count: number;
    idle_fragmentation: number;
    notification_reaction_ms: number;
    config_change_count: number;
  };
}
