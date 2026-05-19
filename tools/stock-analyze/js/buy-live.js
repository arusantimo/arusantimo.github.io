const BUY_FINAL_STATUS_LABELS = { S: '강력매수', A: '매수추천', B: '관심후보', C: '제외' };

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
function getDefaultBuyWyckoffInfo(entry, wyckoff) {
  if (typeof getBuyWyckoffAdjustmentInfo === 'function') {
    return getBuyWyckoffAdjustmentInfo(entry, wyckoff);
  }
  return { phase: 'NEUTRAL', label: '관망 (Neutral)', confidence: 0, confidencePct: 0, reason: '데이터 부족/수집 실패', adjustment: 0, gradeCap: '', applied: false };
}
function normalizeBuyLiveRefresh(entry, liveRefresh) {
  if (!entry || !liveRefresh || typeof liveRefresh !== 'object') return null;
  const strategyScore = roundBuyScoreValue(entry.score);
  const strategyGrade = entry.grade || getBuyGradeFromScore(strategyScore, entry.strategy);
  const wyckoffInfo = getDefaultBuyWyckoffInfo(entry, liveRefresh.wyckoff);
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
  let wyckoffAdjustment = Number.isFinite(liveRefresh.wyckoffAdjustment)
    ? Number(liveRefresh.wyckoffAdjustment)
    : wyckoffInfo.adjustment;
  wyckoffAdjustment = roundBuyScoreValue(clamp(wyckoffAdjustment, -1, 1));

  let finalScore = Number.isFinite(liveRefresh.finalScore)
    ? Number(liveRefresh.finalScore)
    : clamp(strategyScore + adjustment + wyckoffAdjustment, 0, 10);
  finalScore = roundBuyScoreValue(clamp(finalScore, 0, 10));

  const gradeCap = String(liveRefresh.gradeCap || wyckoffInfo.gradeCap || '').trim();
  const uncappedFinalGrade = String(
    liveRefresh.uncappedFinalGrade
    || getBuyGradeFromScore(finalScore, entry.strategy)
  ).trim();
  const finalGrade = String(
    liveRefresh.finalGrade
    || (typeof applyBuyWyckoffGradeCap === 'function'
      ? applyBuyWyckoffGradeCap(uncappedFinalGrade, gradeCap)
      : uncappedFinalGrade)
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
    wyckoff: wyckoffInfo,
    wyckoffAdjustment,
    gradeCap,
    uncappedFinalGrade,
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
  const wyckoff = liveData.wyckoff || (typeof buildWyckoffSignalFromNaverData === 'function'
    ? buildWyckoffSignalFromNaverData({
      priceHistory: liveData.priceHistory,
      dealTrendInfos: liveData.dealTrendInfos,
      fallbackReason: liveData.wyckoffFailureReason || '데이터 부족/수집 실패'
    })
    : null);
  const wyckoffInfo = getDefaultBuyWyckoffInfo(entry, wyckoff);
  const wyckoffAdjustment = roundBuyScoreValue(clamp(wyckoffInfo.adjustment, -1, 1));
  const finalScore = roundBuyScoreValue(clamp(strategyScore + adjustment + wyckoffAdjustment, 0, 10));
  const uncappedFinalGrade = getBuyGradeFromScore(finalScore, entry.strategy);
  const finalGrade = typeof applyBuyWyckoffGradeCap === 'function'
    ? applyBuyWyckoffGradeCap(uncappedFinalGrade, wyckoffInfo.gradeCap)
    : uncappedFinalGrade;
  const finalStatusLabel = getBuyFinalStatusLabel(finalGrade);

  return {
    recommMean,
    consensusScore,
    consensusGrade,
    scoreGap,
    adjustment,
    wyckoff: wyckoffInfo,
    wyckoffAdjustment,
    gradeCap: wyckoffInfo.gradeCap,
    uncappedFinalGrade,
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
    wyckoff: normalizedLiveRefresh?.wyckoff ?? null,
    wyckoffAdjustment: normalizedLiveRefresh?.wyckoffAdjustment ?? 0,
    gradeCap: normalizedLiveRefresh?.gradeCap ?? '',
    finalScore: primaryScore,
    finalGrade: primaryGrade,
    finalStatusLabel: primaryStatusLabel,
    primaryScore,
    primaryGrade,
    primaryStatusLabel,
    primarySummary: normalizedLiveRefresh
      ? `최종 ${primaryGrade} · 컨센서스 ${formatBuySignedPoints(normalizedLiveRefresh.adjustment)} · 와이코프 ${formatBuySignedPoints(normalizedLiveRefresh.wyckoffAdjustment)}`
      : `전략 기준 ${strategyGrade}`,
    verdictClass: getBuyVerdictClassFromGrade(primaryGrade),
    liveRefresh: normalizedLiveRefresh,
    hasLiveRefresh,
    changed: {
      score: hasLiveRefresh && Math.abs(primaryScore - strategyScore) >= 0.05,
      grade: hasLiveRefresh && primaryGrade !== strategyGrade,
      statusLabel: hasLiveRefresh && primaryStatusLabel !== strategyStatusLabel,
      adjustment: hasLiveRefresh && (Math.abs(normalizedLiveRefresh.adjustment) >= 0.05 || Math.abs(normalizedLiveRefresh.wyckoffAdjustment) >= 0.05),
      wyckoff: hasLiveRefresh && Math.abs(normalizedLiveRefresh.wyckoffAdjustment) >= 0.05
    }
  };
}
function buildBuyLivePillsHtml(entry, presentation, options = {}) {
  const liveRefresh = presentation.liveRefresh;
  const includeStrategyStatus = options.includeStrategyStatus !== false;
  const pills = [`<span class="buy-live-pill strategy">전략 ${presentation.strategyScore.toFixed(1)} / ${escapeHtml(presentation.strategyGrade)}</span>`];

  if (includeStrategyStatus && entry.statusLabel) {
    pills.push(`<span class="buy-live-pill strategy">전략 판정 ${escapeHtml(entry.statusLabel)}</span>`);
  }

  if (!liveRefresh) return pills.join('');

  const adjustmentTone = liveRefresh.adjustment >= 0 ? 'up' : 'down';
  const wyckoffTone = liveRefresh.wyckoffAdjustment > 0 ? 'up' : liveRefresh.wyckoffAdjustment < 0 ? 'down' : 'flat';
  pills.push(`<span class="buy-live-pill consensus">컨센서스 ${liveRefresh.consensusScore.toFixed(1)} / ${escapeHtml(liveRefresh.consensusGrade)}</span>`);
  pills.push(`<span class="buy-live-pill adjustment ${adjustmentTone}">보정 ${formatBuySignedPoints(liveRefresh.adjustment)}</span>`);
  pills.push(`<span class="buy-live-pill wyckoff">와이코프 ${escapeHtml(liveRefresh.wyckoff?.label || '관망 (Neutral)')} · ${liveRefresh.wyckoff?.confidencePct || 0}%</span>`);
  pills.push(`<span class="buy-live-pill adjustment ${wyckoffTone}">와이코프 ${formatBuySignedPoints(liveRefresh.wyckoffAdjustment)}</span>`);
  if (liveRefresh.gradeCap) {
    pills.push(`<span class="buy-live-pill adjustment down">등급 상한 ${escapeHtml(liveRefresh.gradeCap)}</span>`);
  }

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
        <div class="modal-section-label">🔍 실시간 컨센서스/와이코프 보정 검증</div>
        <div class="verification-header unknown">
          <span class="verification-icon">🧭</span>
          <div class="verification-summary">
            <div class="verification-title">컨센서스/와이코프 보정 대기 중</div>
            <div class="verification-desc">아직 네이버 컨센서스와 와이코프 실시간 데이터를 수집하지 않았습니다. 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
        <div class="verification-actions">
          <button class="btn btn-primary btn-sm" id="btn-modal-refresh-buy" onclick="handleModalRefreshBuy('${entry.entryKey || entry.code}')" style="background:var(--accent-secondary);border:1px solid rgba(255,255,255,0.1);padding:6px 12px;border-radius:6px;cursor:pointer;color:white;font-weight:bold;font-size:12px;">
            <span>⚡</span> 이 종목만 실시간 데이터 수집 및 검증하기
          </button>
        </div>
      </div>
    `;
  }

  const totalAdjustment = roundBuyScoreValue((liveRefresh.adjustment || 0) + (liveRefresh.wyckoffAdjustment || 0));
  const gradeShift = presentation.finalGrade !== presentation.strategyGrade;
  const adjustmentTone = totalAdjustment > 0 ? 'clear' : totalAdjustment < 0 ? 'triggered' : 'unknown';
  const adjustmentIcon = totalAdjustment > 0 ? '📈' : totalAdjustment < 0 ? '🚨' : '✅';
  const adjustmentTitle = totalAdjustment > 0
    ? '컨센서스/와이코프 우호 보정'
    : totalAdjustment < 0
      ? '컨센서스/와이코프 보수 보정'
      : '보정 영향 제한적';
  const gradeText = gradeShift
    ? `최종 등급이 ${presentation.strategyGrade} → ${presentation.finalGrade}로 조정되었습니다.`
    : `최종 등급은 ${presentation.finalGrade}로 유지됩니다.`;
  const desc = `컨센서스 ${liveRefresh.recommMean.toFixed(2)}/5.00를 ${liveRefresh.consensusScore.toFixed(1)}점으로 환산해 ${formatBuySignedPoints(liveRefresh.adjustment)} 반영했고, ${liveRefresh.wyckoff?.label || '관망 (Neutral)'} ${liveRefresh.wyckoff?.confidencePct || 0}%로 ${formatBuySignedPoints(liveRefresh.wyckoffAdjustment)} 보정해 최종 ${liveRefresh.finalScore.toFixed(1)}점으로 계산했습니다.${liveRefresh.gradeCap ? ` 분배 고신뢰도라 최종 등급 상한은 ${liveRefresh.gradeCap}입니다.` : ''} ${gradeText}`;
  return `
    <div class="buy-verification-panel">
      <div class="modal-section-label">🔍 실시간 컨센서스/와이코프 보정 검증</div>
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
            <th>실시간 근거</th>
            <th>최종 결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>점수 / 등급</strong></td>
            <td>${presentation.strategyScore.toFixed(1)}점 / ${escapeHtml(presentation.strategyGrade)}</td>
            <td>컨센서스 ${liveRefresh.consensusScore.toFixed(1)}점 / ${escapeHtml(liveRefresh.consensusGrade)}<br>${escapeHtml(liveRefresh.wyckoff?.label || '관망 (Neutral)')} / ${liveRefresh.wyckoff?.confidencePct || 0}%</td>
            <td>컨센서스 ${formatBuySignedPoints(liveRefresh.adjustment)} + 와이코프 ${formatBuySignedPoints(liveRefresh.wyckoffAdjustment)} → ${presentation.finalScore.toFixed(1)}점 / ${escapeHtml(presentation.finalGrade)}</td>
          </tr>
          <tr>
            <td><strong>운영 판정</strong></td>
            <td>${escapeHtml(entry.statusLabel || presentation.strategyStatusLabel)}</td>
            <td>네이버 ${liveRefresh.recommMean.toFixed(2)} / 5.00<br>${escapeHtml(liveRefresh.wyckoff?.reason || '와이코프 중립')}</td>
            <td>${escapeHtml(presentation.finalStatusLabel)}${liveRefresh.gradeCap ? `<br>등급 상한 ${escapeHtml(liveRefresh.gradeCap)}` : ''}</td>
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
        <button class="btn btn-primary btn-sm" id="btn-modal-refresh-buy" onclick="handleModalRefreshBuy('${entry.entryKey || entry.code}')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:6px 12px;border-radius:6px;cursor:pointer;color:white;font-weight:bold;font-size:12px;">
          <span>🔄</span> 다시 데이터 검증하기
        </button>
      </div>
    </div>
  `;
}
