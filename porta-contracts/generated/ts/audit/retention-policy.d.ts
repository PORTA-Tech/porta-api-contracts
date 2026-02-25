export interface AuditRetentionPolicy {
  contract_name: "AuditRetentionPolicy";
  schema_version: "1.0.0";
  policy_id: string;
  created_at: string;
  decision_trace_retention_days: 1095;
  intervention_command_retention_days: 365;
  metric_snapshot_hot_retention_days: 90;
  metric_snapshot_cold_retention_days: 730;
  policy_versions_retention: "indefinite";
  storage: {
    database: "TimescaleDB";
    table: "audit_decision_traces";
    partition_granularity: "monthly";
    append_only: true;
    immutable_backups: true;
    backup_snapshot_cron: "0 1 * * *";
    backup_verify_cron: "0 3 * * 0";
  };
}
