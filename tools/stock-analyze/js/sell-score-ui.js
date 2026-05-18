const SELL_ACTION_BADGE_META = {
  full_exit: { cls: 'badge-sell', text: '🛑 전량 매도', tone: 'sell' },
  trim70: { cls: 'badge-sell', text: '🔻 70% 축소', tone: 'sell' },
  trim50: { cls: 'badge-caution', text: '🟡 50% 축소', tone: 'caution' },
  trim30: { cls: 'badge-caution', text: '🟠 30% 축소', tone: 'caution' },
  hold: { cls: 'badge-hold', text: '✅ 홀딩', tone: 'hold' }
};

function getSellActionPlanBadge(detail) {
  if (detail?.actionPlan?.bucket && SELL_ACTION_BADGE_META[detail.actionPlan.bucket]) {
    return SELL_ACTION_BADGE_META[detail.actionPlan.bucket];
  }
  const fallback = getActionBadge(detail?.decision, detail?.actionStage);
  return {
    cls: fallback.cls,
    text: fallback.text,
    tone: fallback.cls === 'badge-sell' ? 'sell' : fallback.cls === 'badge-caution' ? 'caution' : 'hold'
  };
}

function buildSellActionHeadline(detail) {
  if (!Number.isFinite(detail?.sellScore) || !detail?.actionPlan?.summary) return '';
  return `매도 점수 ${detail.sellScore}점 · ${detail.actionPlan.summary}`;
}

function buildSellActionMeta(detail) {
  if (!detail?.actionPlan) return '';
  const parts = [];
  if (detail.actionPlan.followUpTriggerLabel && detail.actionPlan.holdPct > 0) {
    parts.push(detail.actionPlan.followUpTriggerLabel);
  }
  if (
    detail.actionPlan.recheckLabel
    && detail.actionPlan.recheckLabel !== '즉시 실행'
    && detail.actionPlan.recheckLabel !== detail.actionPlan.followUpTriggerLabel
  ) {
    parts.push(`재평가: ${detail.actionPlan.recheckLabel}`);
  }
  return parts.join(' · ');
}

function buildSellPrimaryActionItem(detail) {
  if (!detail?.actionPlan) return null;

  const bucket = detail.actionPlan.bucket;
  const titleMap = {
    full_exit: '지금 전량 매도',
    trim70: '지금 70% 매도',
    trim50: '지금 50% 매도',
    trim30: '지금 30% 매도',
    hold: '지금 홀딩 유지'
  };
  return {
    status: bucket === 'full_exit' ? 'blocked' : bucket === 'hold' ? 'active' : 'active',
    icon: bucket === 'full_exit' ? '🛑' : bucket === 'hold' ? '✅' : '🟡',
    title: titleMap[bucket] || '지금 액션 확인',
    description: detail.actionPlan.summary,
    note: buildSellActionMeta(detail)
  };
}

function renderSellScoreBreakdown(detail) {
  if (!Number.isFinite(detail?.sellScore) || !Array.isArray(detail?.scoreBreakdown) || !detail.scoreBreakdown.length) {
    return '';
  }

  const badge = getSellActionPlanBadge(detail);
  return `
    <div class="sell-score-panel">
      <div class="modal-section-label">📏 매도 점수 분해</div>
      <div class="sell-score-head">
        <div class="sell-score-value ${badge.tone}">${detail.sellScore}점</div>
        <div class="sell-score-copy">
          <div class="sell-score-summary">${escapeHtml(buildSellActionHeadline(detail) || detail.actionPlan.summary || '')}</div>
          ${buildSellActionMeta(detail) ? `<div class="sell-score-meta">${escapeHtml(buildSellActionMeta(detail))}</div>` : ''}
        </div>
      </div>
      <div class="sell-score-grid">
        ${detail.scoreBreakdown.map(item => `
          <div class="sell-score-item ${item.triggered ? 'active' : 'idle'}">
            <div class="sell-score-item-head">
              <div class="sell-score-item-title">${escapeHtml(item.code)} · ${escapeHtml(item.label)}</div>
              <div class="sell-score-item-points">${item.points}/${item.maxPoints}</div>
            </div>
            <div class="sell-score-item-detail">${escapeHtml(item.detail || '세부 설명 없음')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
