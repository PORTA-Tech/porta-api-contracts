export type MachineActionCategory =
  | 'suggestion'
  | 'automatic_change'
  | 'policy_intent'
  | 'unsupported'
  | 'decision_record';

export type MachineActionDecisionState = 'decided';

export type MachineActionExecutionState =
  | 'decision_only'
  | 'decided'
  | 'applied'
  | 'verified'
  | 'failed';

export type MachineActionVerifiedState =
  | 'not_applicable'
  | 'pending'
  | 'unverified'
  | 'verified';

export interface MachineActionEvent {
  deviceId: string;
  machineId: string;
  accountId?: string | null;
  orgId?: string | null;
  userName: string;
  interventionId: string;
  // Action is compatibility transport. In particular, break_suggestion and
  // stretch_break_suggestion remain legacy action IDs until short-break and
  // long-break overlay naming replaces them end to end.
  action: string;
  actionCategory: MachineActionCategory;
  decisionState: MachineActionDecisionState;
  executionState: MachineActionExecutionState;
  verifiedState: MachineActionVerifiedState;
  timestampUtc: string;
  appliedAtUtc?: string | null;
  errorCode?: string | null;
  policyId: string;
  whatChanged?: string | null;
  howToUndo?: string | null;
}
