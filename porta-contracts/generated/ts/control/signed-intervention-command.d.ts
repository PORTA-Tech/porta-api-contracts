export interface ControlPlaneSignedInterventionCommand {
  contract_name: "ControlPlaneSignedInterventionCommand";
  schema_version: "1.0.0";
  command_schema_version: "intervention.command.v1.0.0";
  command_id: string;
  policy_id: string;
  target_service: string;
  action: "scale_horizontal" | "restart_pods" | "traffic_shift";
  parameters: {
    [k: string]: string | number | boolean;
  };
  issued_at: string;
  expires_at: string;
  state_version: number;
  signature_input_hash: string;
  signature: {
    algorithm: "Ed25519";
    key_id: "cp-root-key-01";
    signature: string;
  };
}
