export type CaptureContext = 'Unknown' | 'UserSession' | 'ServiceSession';

export type ContinuityState = 'keep' | 'pause' | 'decay' | 'reset';

export type CalibrationStage = 'cold' | 'provisional' | 'calibrated';

export type TrustTier = 'low' | 'medium' | 'high';

export type AttentionSegmentKind =
  | 'focus'
  | 'context_excursion'
  | 'off_task_distraction'
  | 'fragmentation_distraction'
  | 'away';

export type BreakKind = 'short_break' | 'long_break';

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
  focusEpisodeReasonCode?: string | null;
  focusEpisodeReasonText?: string | null;
  // Canonical current attention-segment fields. These expose whether the machine
  // is in steady focus, a short context excursion, off-task distraction,
  // fragmentation distraction, or away time.
  attentionSegmentKind: AttentionSegmentKind;
  attentionSegmentSeconds: number;
  attentionSegmentReasonCode?: string | null;
  attentionSegmentReasonText?: string | null;
  distractionEpisodeActive: boolean;
  distractionEpisodeSeconds: number;
  // Legacy compatibility fields:
  // taskContinuityScore/taskContinuitySeconds currently carry the durable focus timer
  // signal used by downstream repos. The canonical product target is focus-episode
  // quality and focus-episode duration.
  taskContinuityScore: number;
  taskContinuitySeconds: number;
  continuityState: ContinuityState;
  deepWorkActive: boolean;
  // Canonical user-facing pressure signal. This is the expressive pressure
  // value surfaces should render for humans instead of treating the legacy
  // overload-likelihood transport field as final truth.
  pressureLevel: number;
  // Confidence label should be shown separately from pressure. This field is
  // the canonical confidence to pair with the displayed pressure value.
  pressureConfidence: number;
  // Legacy visible overload field. The canonical product target is Pressure.
  overloadLikelihood: number;
  // Canonical meaning is already close to the final product term: overload active.
  overloadActive: boolean;
  breakNeeded: boolean;
  // Canonical pending-break kind. Product-facing surfaces should prefer this over
  // parsing the legacy break transport action ID.
  breakPendingKind?: BreakKind | null;
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
