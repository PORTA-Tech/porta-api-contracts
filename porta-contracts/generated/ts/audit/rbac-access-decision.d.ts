export interface AuditRbacAccessDecision {
  contract_name: "AuditRbacAccessDecision";
  schema_version: "1.0.0";
  decision_id: string;
  timestamp: string;
  subject_id: string;
  subject_role: "admin" | "operator" | "auditor" | "developer" | "agent";
  required_role: "admin" | "operator" | "auditor" | "developer" | "agent";
  resource: string;
  operation: "create" | "update" | "delete" | "read" | "execute" | "simulate";
  decision: "allow" | "deny";
  error: {
    error_code: "RBAC_DENIED";
    required_role: "admin" | "operator" | "auditor" | "developer" | "agent";
    user_role: "admin" | "operator" | "auditor" | "developer" | "agent";
    message: string;
  } | null;
}
