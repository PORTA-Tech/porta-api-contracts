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
  // focusEpisodeReasonCode / focusEpisodeReasonText are always filled after
  // canonical normalization. The text explains why the episode is in its current
  // state (e.g. "Focus episode is on hold during a break.",
  // "Major context shift ended the focus episode after 5m outside the focus context.").
  focusEpisodeQuality: number;
  focusEpisodeSeconds: number;
  focusEpisodeState: ContinuityState;
  focusEpisodeReasonCode?: string | null;
  focusEpisodeReasonText?: string | null;
  // Canonical current attention-segment fields. These expose whether the machine
  // is in steady focus, a short context excursion, off-task distraction,
  // fragmentation distraction, or away time.
  // attentionSegmentReasonCode / attentionSegmentReasonText are always filled
  // after canonical normalization. The text explains why the segment was classified
  // as it was (e.g. "Away for 6m.", "Stayed outside focus context for 4m.",
  // "Rapid switching / fragmentation for 3m.").
  attentionSegmentKind: AttentionSegmentKind;
  attentionSegmentSeconds: number;
  attentionSegmentReasonCode?: string | null;
  attentionSegmentReasonText?: string | null;
  distractionEpisodeActive: boolean;
  distractionEpisodeSeconds: number;
  // Legacy compatibility fields mirrored from the canonical focus-episode values
  // in fleet/admin summaries. Downstream product surfaces should treat these as
  // transport aliases only, not as an independent source of truth.
  // taskContinuitySeconds always equals focusEpisodeSeconds — it is the durable
  // episode timer, NOT a live current-app-session timer that resets on foreground-app switch.
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
  // Legacy compatibility mirror of pressureLevel in fleet/admin summaries.
  // Product-facing surfaces should not render this as a separate metric.
  overloadLikelihood: number;
  // Canonical meaning is already close to the final product term: overload active.
  overloadActive: boolean;
  breakNeeded: boolean;
  // Canonical pending-break kind. Product-facing surfaces should prefer this over
  // parsing the legacy break transport action ID.
  breakPendingKind?: BreakKind | null;
  // Legacy compatibility field mirrored from breakPendingKind in fleet/admin
  // summaries. During migration it may still carry action IDs such as
  // stretch_break_suggestion and break_suggestion, but product-facing surfaces
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
