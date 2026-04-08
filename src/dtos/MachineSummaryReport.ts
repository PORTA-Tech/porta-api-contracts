export type CaptureContext = 'Unknown' | 'UserSession' | 'ServiceSession';

export type ContinuityState = 'keep' | 'pause' | 'decay' | 'reset';

export type CalibrationStage = 'cold' | 'provisional' | 'calibrated';

export type TrustTier = 'low' | 'medium' | 'high';

export interface MachineSummaryReport {
  deviceId: string;
  machineId: string;
  accountId?: string | null;
  orgId?: string | null;
  machineName: string;
  userName: string;
  agentVersion: string;
  schemaVersion: string;
  policyVersion: string;
  reportedAtUtc: string;
  agentRunning: boolean;
  userSessionConnected: boolean;
  activityDetected: boolean;
  lastActivityUtc?: string | null;
  userAgentHeartbeatUtc?: string | null;
  userAgentHeartbeatAgeSeconds?: number | null;
  lastAcceptedInputAgeSeconds?: number | null;
  userAgentStartupSource?: string | null;
  userAgentStartupState?: string | null;
  userAgentLastLaunchReason?: string | null;
  userAgentHeartbeatWriteFailureCount?: number | null;
  captureContext: CaptureContext;
  keyboardSignalActive: boolean;
  mouseSignalActive: boolean;
  ownershipWarning?: string | null;
  captureFailureReason?: string | null;
  lastError?: string | null;
  backendConnected: boolean;
  localApiAuthReady: boolean;
  dbMigrationFailed: boolean;
  // Canonical durable focus-episode fields. These are the product-facing fields
  // that operator and fleet surfaces should prefer over the legacy continuity
  // transport aliases below.
  focusEpisodeQuality: number;
  focusEpisodeSeconds: number;
  focusEpisodeState: ContinuityState;
  // Legacy compatibility fields:
  // taskContinuityScore/taskContinuitySeconds currently carry the durable focus timer
  // signal used by downstream repos. The canonical product target is focus-episode
  // quality and focus-episode duration.
  taskContinuityScore: number;
  taskContinuitySeconds: number;
  continuityState: ContinuityState;
  deepWorkActive: boolean;
  // Legacy visible overload field. The canonical product target is Pressure.
  overloadLikelihood: number;
  // Canonical meaning is already close to the final product term: overload active.
  overloadActive: boolean;
  breakNeeded: boolean;
  // Legacy compatibility field. During migration it may still carry action IDs such
  // as stretch_break_suggestion and break_suggestion, but product-facing surfaces
  // should map those to short break and long break.
  breakPendingAction?: string | null;
  breakPendingReasonCode?: string | null;
  calibrationStage: CalibrationStage;
  trustTier: TrustTier;
  modelConfidence: number;
  signalQualityScore?: number | null;
  partialData: boolean;
  missingMajorChannels: string[];
}
