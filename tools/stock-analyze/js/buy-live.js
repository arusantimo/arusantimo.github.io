const BUY_FINAL_STATUS_LABELS = {
  S: '강력매수',
  A: '매수추천',
  B: '관심후보',
  C: '제외'
};

function roundBuyScoreValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 10) / 10;
}

function formatBuySignedPoints(value) {
  const num = roundBuyScoreValue(value);
  return `${num >= 0 ? '+' : ''}${num.toFixed(1)}점`;
}

function getBuyFinalStatusLabel(grade) {
  const code = String(grade || '').trim().charAt(0).toUpperCase();
  return BUY_FINAL_STATUS_LABELS[code] || BUY_FINAL_STATUS_LABELS.C;
}

function normalizeBuyLiveRefresh(entry, liveRefresh) {
  if (!entry || !liveRefresh || typeof liveRefresh !== 'object') return null;

  const strategyScore = roundBuyScoreValue(entry.score);
  const strategyGrade = entry.grade || getBuyGradeFromScore(strategyScore, entry.strategy);
  const rawRecommMean = Number.parseFloat(String(liveRefresh.recommMean ?? '').replace(/,/g, ''));
  const recommMean = Number.isFinite(rawRecommMean)
    ? roundBuyScoreValue(clamp(rawRecommMean, 0, 5))
    : Number.isFinite(liveRefresh.consensusScore)
      ? roundBuyScoreValue(clamp(Number(liveRefresh.consensusScore) / 2, 0, 5))
      : Number.isFinite(liveRefresh.score)
        ? roundBuyScoreValue(clamp(Number(liveRefresh.score) / 2, 0, 5))
        : null;

  let consensusScore = Number.isFinite(liveRefresh.consensusScore)
    ? Number(liveRefresh.consensusScore)
    : Number.isFinite(liveRefresh.score)
      ? Number(liveRefresh.score)
      : Number.isFinite(recommMean)
        ? recommMean * 2
        : NaN;
  consensusScore = Number.isFinite(consensusScore)
    ? roundBuyScoreValue(clamp(consensusScore, 0, 10))
    : strategyScore;

  const consensusGrade = String(
    liveRefresh.consensusGrade
    || liveRefresh.grade
    || getBuyGradeFromScore(consensusScore, entry.strategy)
  ).trim();

  let scoreGap = Number.isFinite(liveRefresh.scoreGap)
    ? Number(liveRefresh.scoreGap)
    : consensusScore - strategyScore;
  scoreGap = roundBuyScoreValue(scoreGap);

  let adjustment = Number.isFinite(liveRefresh.adjustment)
    ? Number(liveRefresh.adjustment)
    : clamp(scoreGap * 0.35, -1, 1);
  adjustment = roundBuyScoreValue(clamp(adjustment, -1, 1));

  let finalScore = Number.isFinite(liveRefresh.finalScore)
    ? Number(liveRefresh.finalScore)
    : clamp(strategyScore + adjustment, 0, 10);
  finalScore = roundBuyScoreValue(clamp(finalScore, 0, 10));

  const finalGrade = String(
    liveRefresh.finalGrade
    || getBuyGradeFromScore(finalScore, entry.strategy)
  ).trim();
  const finalStatusLabel = String(
    liveRefresh.finalStatusLabel
    || getBuyFinalStatusLabel(finalGrade)
  ).trim();

  return {
    ...liveRefresh,
    recommMean,
    consensusScore,
    consensusGrade,
    scoreGap,
    adjustment,
    finalScore,
    finalGrade,
    finalStatusLabel,
    score: consensusScore,
    grade: consensusGrade,
    statusLabel: finalStatusLabel
  };
}

function buildBuyLiveRefreshPayload(entry, liveData) {
  const rawRecommMean = Number.parseFloat(String(liveData.recommMean ?? '').replace(/,/g, ''));
  const recommMean = roundBuyScoreValue(clamp(rawRecommMean, 0, 5));
  const strategyScore = roundBuyScoreValue(entry.score);
  const consensusScore = roundBuyScoreValue(clamp(recommMean * 2, 0, 10));
  const consensusGrade = getBuyGradeFromScore(consensusScore, entry.strategy);
  const scoreGap = roundBuyScoreValue(consensusScore - strategyScore);
  const adjustment = roundBuyScoreValue(clamp(scoreGap * 0.35, -1, 1));
  const finalScore = roundBuyScoreValue(clamp(strategyScore + adjustment, 0, 10));
  const finalGrade = getBuyGradeFromScore(finalScore, entry.strategy);
  const finalStatusLabel = getBuyFinalStatusLabel(finalGrade);

  return {
    recommMean,
    consensusScore,
    consensusGrade,
    scoreGap,
    adjustment,
    finalScore,
    finalGrade,
    finalStatusLabel,
    currentPrice: liveData.currentPrice || 0,
    targetPrice: liveData.targetPrice || null,
    upsideRate: Number.isFinite(liveData.upsideRate) ? liveData.upsideRate : null,
    asOf: liveData.asOf || '',
    refreshedAt: liveData.refreshedAt || new Date().toISOString(),
    score: consensusScore,
    grade: consensusGrade,
    statusLabel: finalStatusLabel
  };
}

function getBuyPresentation(entry) {
  const strategyScore = roundBuyScoreValue(entry.score);
  const strategyGrade = entry.grade || getBuyGradeFromScore(strategyScore, entry.strategy);
  const strategyStatusLabel = entry.statusLabel || getBuyFinalStatusLabel(strategyGrade);
  const normalizedLiveRefresh = normalizeBuyLiveRefresh(entry, entry.liveRefresh);
  const hasLiveRefresh = Boolean(normalizedLiveRefresh);
  const primaryScore = normalizedLiveRefresh?.finalScore ?? strategyScore;
  const primaryGrade = normalizedLiveRefresh?.finalGrade ?? strategyGrade;
  const primaryStatusLabel = normalizedLiveRefresh?.finalStatusLabel ?? getBuyFinalStatusLabel(primaryGrade);

  return {
    strategyScore,
    strategyGrade,
    strategyStatusLabel,
    consensusScore: normalizedLiveRefresh?.consensusScore ?? null,
    consensusGrade: normalizedLiveRefresh?.consensusGrade ?? '',
    adjustment: normalizedLiveRefresh?.adjustment ?? 0,
    finalScore: primaryScore,
    finalGrade: primaryGrade,
    finalStatusLabel: primaryStatusLabel,
    primaryScore,
    primaryGrade,
    primaryStatusLabel,
    primarySummary: normalizedLiveRefresh
      ? `최종 ${primaryGrade} · 컨센서스 ${formatBuySignedPoints(normalizedLiveRefresh.adjustment)}`
      : `전략 기준 ${strategyGrade}`,
    verdictClass: getBuyVerdictClassFromGrade(primaryGrade),
    liveRefresh: normalizedLiveRefresh,
    hasLiveRefresh,
    changed: {
      score: hasLiveRefresh && Math.abs(primaryScore - strategyScore) >= 0.05,
      grade: hasLiveRefresh && primaryGrade !== strategyGrade,
      statusLabel: hasLiveRefresh && primaryStatusLabel !== strategyStatusLabel,
      adjustment: hasLiveRefresh && Math.abs(normalizedLiveRefresh.adjustment) >= 0.05
    }
  };
}

function buildBuyLivePillsHtml(entry, presentation, options = {}) {
  const liveRefresh = presentation.liveRefresh;
  const includeStrategyStatus = options.includeStrategyStatus !== false;
  const pills = [
    `<span class="buy-live-pill strategy">전략 ${presentation.strategyScore.toFixed(1)} / ${escapeHtml(presentation.strategyGrade)}</span>`
  ];

  if (includeStrategyStatus && entry.statusLabel) {
    pills.push(`<span class="buy-live-pill strategy">전략 판정 ${escapeHtml(entry.statusLabel)}</span>`);
  }

  if (!liveRefresh) return pills.join('');

  const adjustmentTone = liveRefresh.adjustment >= 0 ? 'up' : 'down';
  pills.push(`<span class="buy-live-pill consensus">컨센서스 ${liveRefresh.consensusScore.toFixed(1)} / ${escapeHtml(liveRefresh.consensusGrade)}</span>`);
  pills.push(`<span class="buy-live-pill adjustment ${adjustmentTone}">보정 ${formatBuySignedPoints(liveRefresh.adjustment)}</span>`);

  if (options.includeCurrentPrice && liveRefresh.currentPrice) {
    pills.push(`<span class="buy-live-pill">현재가 ${formatWon(liveRefresh.currentPrice)}</span>`);
  }
  if (options.includeTargetPrice && liveRefresh.targetPrice) {
    pills.push(`<span class="buy-live-pill">목표가 ${formatWon(liveRefresh.targetPrice)} (${formatSignedPercent(liveRefresh.upsideRate)})</span>`);
  }
  if (options.includeAsOf && liveRefresh.asOf) {
    pills.push(`<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(liveRefresh.asOf))}</span>`);
  }

  return pills.join('');
}

function buildBuyModalVerdictText(presentation) {
  return `${presentation.primaryGrade} 등급 · ${presentation.primaryStatusLabel}`;
}

function buildBuyVerificationHtml(entry) {
  const presentation = getBuyPresentation(entry);
  const liveRefresh = presentation.liveRefresh;
  if (!liveRefresh) {
    return `
      <div class="buy-verification-panel">
        <div class="modal-section-label">🔍 실시간 컨센서스 보정 검증</div>
        <div class="verification-header unknown">
          <span class="verification-icon">🧭</span>
          <div class="verification-summary">
            <div class="verification-title">컨센서스 보정 대기 중</div>
            <div class="verification-desc">아직 네이버 컨센서스 실시간 데이터를 수집하지 않았습니다. 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
        <div class="verification-actions">
          <button class="btn btn-primary btn-sm" id="btn-modal-refresh-buy" onclick="handleModalRefreshBuy('${entry.code}')" style="background:var(--accent-secondary);border:1px solid rgba(255,255,255,0.1);padding:6px 12px;border-radius:6px;cursor:pointer;color:white;font-weight:bold;font-size:12px;">
            <span>⚡</span> 이 종목만 실시간 데이터 수집 및 검증하기
          </button>
        </div>
      </div>
    `;
  }

  const gradeShift = presentation.finalGrade !== presentation.strategyGrade;
  const adjustmentTone = liveRefresh.adjustment > 0 ? 'clear' : liveRefresh.adjustment < 0 ? 'triggered' : 'unknown';
  const adjustmentIcon = liveRefresh.adjustment > 0 ? '📈' : liveRefresh.adjustment < 0 ? '🚨' : '✅';
  const adjustmentTitle = liveRefresh.adjustment > 0
    ? '컨센서스 우호 보정'
    : liveRefresh.adjustment < 0
      ? '컨센서스 보수 보정'
      : '보정 영향 제한적';
  const gradeText = gradeShift
    ? `최종 등급이 ${presentation.strategyGrade} → ${presentation.finalGrade}로 조정되었습니다.`
    : `최종 등급은 ${presentation.finalGrade}로 유지됩니다.`;
  const desc = `컨센서스 ${liveRefresh.recommMean.toFixed(2)}/5.00를 ${liveRefresh.consensusScore.toFixed(1)}점으로 환산하고 ${formatBuySignedPoints(liveRefresh.adjustment)} 보정해 최종 ${liveRefresh.finalScore.toFixed(1)}점으로 계산했습니다. ${gradeText}`;

  return `
    <div class="buy-verification-panel">
      <div class="modal-section-label">🔍 실시간 컨센서스 보정 검증</div>
      <div class="verification-header ${adjustmentTone}">
        <span class="verification-icon">${adjustmentIcon}</span>
        <div class="verification-summary">
          <div class="verification-title">${adjustmentTitle}</div>
          <div class="verification-desc">${escapeHtml(desc)}</div>
        </div>
      </div>
      <table class="guide-table verification-table" style="margin-bottom:0px;">
        <thead>
          <tr>
            <th>구분</th>
            <th>전략 기준</th>
            <th>컨센서스 환산</th>
            <th>최종 결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>점수 / 등급</strong></td>
            <td>${presentation.strategyScore.toFixed(1)}점 / ${escapeHtml(presentation.strategyGrade)}</td>
            <td>${liveRefresh.consensusScore.toFixed(1)}점 / ${escapeHtml(liveRefresh.consensusGrade)}</td>
            <td>${formatBuySignedPoints(liveRefresh.adjustment)} → ${presentation.finalScore.toFixed(1)}점 / ${escapeHtml(presentation.finalGrade)}</td>
          </tr>
          <tr>
            <td><strong>운영 판정</strong></td>
            <td>${escapeHtml(entry.statusLabel || presentation.strategyStatusLabel)}</td>
            <td>네이버 ${liveRefresh.recommMean.toFixed(2)} / 5.00</td>
            <td>${escapeHtml(presentation.finalStatusLabel)}</td>
          </tr>
          <tr>
            <td><strong>참고 데이터</strong></td>
            <td>진입가 ${formatWon(entry.entryPriceValue)}</td>
            <td>${liveRefresh.targetPrice ? `목표가 ${formatWon(liveRefresh.targetPrice)} (${formatSignedPercent(liveRefresh.upsideRate)})` : '목표가 미제공'}</td>
            <td>${liveRefresh.currentPrice ? `현재가 ${formatWon(liveRefresh.currentPrice)}` : '현재가 미수집'}${liveRefresh.asOf ? `<br>기준 ${escapeHtml(formatCompactDate(liveRefresh.asOf))}` : ''}</td>
          </tr>
        </tbody>
      </table>
      <div class="verification-actions" style="margin-top: 4px;">
        <button class="btn btn-primary btn-sm" id="btn-modal-refresh-buy" onclick="handleModalRefreshBuy('${entry.code}')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:6px 12px;border-radius:6px;cursor:pointer;color:white;font-weight:bold;font-size:12px;">
          <span>🔄</span> 다시 데이터 검증하기
        </button>
      </div>
    </div>
  `;
}
