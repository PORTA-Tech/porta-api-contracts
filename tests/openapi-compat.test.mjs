import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const controlPlanePath = path.resolve('src', 'openapi', 'control-plane.yaml');
const dtoPath = path.resolve('src', 'dtos', 'MachineSummaryReport.ts');

const requiredFields = [
  'focus_episode_seconds',
  'focus_episode_state',
  'task_continuity_seconds',
  'pressure_level',
  'pressure_confidence',
  'overload_likelihood',
  'break_pending_kind',
  'break_pending_action',
  'attention_segment_kind',
  'attention_segment_reason_text',
  'distraction_episode_seconds'
];

const requiredDtoFields = [
  'focusEpisodeSeconds',
  'focusEpisodeState',
  'taskContinuitySeconds',
  'pressureLevel',
  'pressureConfidence',
  'overloadLikelihood',
  'breakPendingKind',
  'breakPendingAction',
  'attentionSegmentKind',
  'attentionSegmentReasonText',
  'distractionEpisodeSeconds'
];

test('control-plane OpenAPI keeps canonical and compatibility fields', () => {
  const content = fs.readFileSync(controlPlanePath, 'utf8');
  for (const token of requiredFields) {
    assert.ok(content.includes(token), `missing ${token} in control-plane.yaml`);
  }
});

test('MachineSummaryReport DTO keeps canonical and compatibility fields', () => {
  const content = fs.readFileSync(dtoPath, 'utf8');
  for (const token of requiredDtoFields) {
    assert.ok(content.includes(token), `missing ${token} in MachineSummaryReport.ts`);
  }
});
