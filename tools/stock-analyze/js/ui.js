function renderGapScoreSummary() {
  const notionGapScore = notionSnapshot.gapScore;
  const gapScore = getActiveGapScore();
  const isLive = isLiveGapReady();
  if (!gapScore.rows.length && !gapScore.totalScore && !gapScore.grade) return '';

  const comparisonText = getGapComparisonText();
  const dataStatusText = isLive
    ? `실시간 분석 기준은 ${liveGapState.source}에서 ${liveGapState.fetchedAt}에 수집했습니다. 기준 데이터는 전일 장마감 전 스냅샷으로 비교 기준으로 유지합니다.`
    : liveGapState.status === 'error'
      ? `실시간 수집에 실패해 전략 데이터 기준 갭 스코어를 사용 중입니다. (${escapeHtml(liveGapState.error)})`
      : '현재 화면의 갭 스코어는 전략 JSON에 포함된 값을 파싱한 결과입니다. 분석 버튼 실행 시 실시간 수집을 시도합니다.';
  const caption = isLive
    ? '실시간으로 수집한 5개 지표를 우선 적용하고, 기준 스냅샷과의 차이로 overnight drift를 확인합니다.'
    : '기본 점수에 중요도를 곱해 반영 점수를 만들고, 그 합계로 다음 날 갭 위험을 판단합니다.';

  return `
    <div class="gap-score-panel">
      <div class="gap-score-head">
        <div>
          <div class="gap-score-title">📡 익일 갭 예측 스코어</div>
          <div class="gap-score-caption">${escapeHtml(caption)}</div>
        </div>
        ${gapScore.grade ? `<button type="button" class="gap-score-grade gap-score-grade-trigger" aria-label="갭 등급 기준 보기">갭 등급: ${escapeHtml(gapScore.grade)}${isLive ? ' · 실시간' : ''}</button>` : ''}
      </div>
      <table class="guide-table compact-table gap-score-table">
        <thead>
          <tr>
            <th>지표</th>
            <th>실측값</th>
            <th>기본 점수</th>
            <th>중요도</th>
            <th>계산식</th>
            <th>반영 점수</th>
          </tr>
        </thead>
        <tbody>
          ${gapScore.rows.map(row => `
            <tr>
              <td>${escapeHtml(row.indicator)}</td>
              <td>${escapeHtml(row.actualValue)}</td>
              <td>${escapeHtml(row.baseScore)}</td>
              <td>${escapeHtml(row.weight)}</td>
              <td>${escapeHtml(row.formula || `${row.baseScore} ${row.weight}`.trim())}</td>
              <td><strong>${escapeHtml(row.weightedScore)}</strong></td>
            </tr>
          `).join('')}
          ${gapScore.totalScore ? `
            <tr class="gap-score-total-row">
              <td colspan="5">반영 점수 합계</td>
              <td><strong>${escapeHtml(gapScore.totalScore)}</strong></td>
            </tr>
          ` : ''}
        </tbody>
      </table>
      <div class="gap-score-meta">
        ${gapScore.entryAdjustment ? `<div class="gap-score-meta-item"><strong>진입 조정</strong><span>${escapeHtml(gapScore.entryAdjustment)}</span></div>` : ''}
        ${gapScore.sellAdjustment ? `<div class="gap-score-meta-item"><strong>매도 조정</strong><span>${escapeHtml(gapScore.sellAdjustment)}</span></div>` : ''}
        ${gapScore.swingAdjustment ? `<div class="gap-score-meta-item"><strong>스윙 전환</strong><span>${escapeHtml(gapScore.swingAdjustment)}</span></div>` : ''}
        ${gapScore.note ? `<div class="gap-score-meta-item"><strong>특이사항</strong><span>${escapeHtml(gapScore.note)}</span></div>` : ''}
        ${comparisonText ? `<div class="gap-score-meta-item"><strong>스냅샷 비교</strong><span>${escapeHtml(comparisonText)}</span></div>` : ''}
        ${isLive && notionGapScore.note ? `<div class="gap-score-meta-item"><strong>기준 데이터</strong><span>${escapeHtml(notionGapScore.grade || '미확인')} / ${escapeHtml(notionGapScore.note)}</span></div>` : ''}
        <div class="gap-score-meta-item"><strong>데이터 상태</strong><span>${escapeHtml(dataStatusText)}</span></div>
      </div>
    </div>
  `;
}
function renderSellDetailToCard(detail) {
  const { stock, data, indicators, decision, actionStage, gainRate, lossManagement, gapProfile, targets } = detail;
  const card = document.getElementById(`card-${stock.code}`);
  if (!card) return;
  const priceRow = document.getElementById(`price-row-${stock.code}`);
  const meta = document.getElementById(`meta-${stock.code}`);
  const planBox = document.getElementById(`plan-${stock.code}`);
  const indBox = document.getElementById(`ind-${stock.code}`);
  const badge = document.getElementById(`badge-${stock.code}`);
  const entry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const entryPrice = stock.entryPrice || targets?.entryPrice || entry?.entryPriceValue || data.prevClose;
  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);
  const gainFromEntry = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;

  priceRow.innerHTML = `
    <span class="price">${data.currentPrice.toLocaleString()}원</span>
    <span class="chg ${chgClass}" style="font-size:14px;font-weight:700">${chgPrefix}${absChg}%</span>
    ${stock.type === 'swing' ? `<span class="chg ${gainFromEntry >= 0 ? 'up' : 'dn'}" style="font-size:12px;margin-left:8px">매수 대비 ${gainFromEntry >= 0 ? '+' : ''}${gainFromEntry.toFixed(2)}%</span>` : ''}
  `;
  meta.innerHTML = `
    <span style="opacity:0.7">진입가:</span> <strong>${entryPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">시가:</span> <strong>${data.openPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">체결강도:</span> <strong>${data.strength !== null && data.strength !== undefined ? `${data.strength.toFixed(2)}%` : '미연동'}</strong>
  `;

  const visibleIndicators = indicators.filter(ind => ind.status !== 'unknown' || ind.title === '갭 등급 조정');
  const displayIndicators = visibleIndicators.length > 0 ? visibleIndicators : indicators;
  let cardIndicatorHtml = displayIndicators
    .map(indicator => `<div class="ind-item ${indicator.status}">${indicator.title}: ${indicator.result}</div>`)
    .join('');

  if (stock.type === 'swing' && lossManagement && gainRate < 0) {
    cardIndicatorHtml += `<div class="ind-item ${lossManagement.totalScore >= lossManagement.holdThreshold ? 'clear' : lossManagement.totalScore >= lossManagement.cautionThreshold ? 'unknown' : 'triggered'}" style="margin-top:4px;font-weight:700">
      손실 관리: ${lossManagement.verdict} | 최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원
    </div>`;
  }

  indBox.innerHTML = cardIndicatorHtml;
  if (planBox) {
    planBox.innerHTML = buildSellCardPlanSummary(stock.entryKey || stock.code);
  }

  card.className = `scard ${decision}`;
  const badgeInfo = getActionBadge(decision, actionStage);
  badge.className = `badge ${badgeInfo.cls}`;
  badge.innerText = badgeInfo.text;

  const shiftBadge = document.getElementById(`gap-shift-${stock.code}`);
  const shiftBadgeInfo = getGapComparisonBadge(gapProfile?.comparison);
  if (shiftBadge) {
    if (shiftBadgeInfo) {
      shiftBadge.className = `badge badge-shift ${shiftBadgeInfo.cls}`;
      shiftBadge.innerText = shiftBadgeInfo.text;
      shiftBadge.title = shiftBadgeInfo.detail;
      shiftBadge.style.display = 'inline-flex';
    } else {
      shiftBadge.className = 'badge badge-shift';
      shiftBadge.innerText = '';
      shiftBadge.title = '';
      shiftBadge.style.display = 'none';
    }
  }

  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
  newCard.addEventListener('click', () => openModal(stock.code, 'sell'));
}

function renderMacroRegimeSummary() {
  const macro = notionSnapshot.macroOverlay || {};
  const technical = notionSnapshot.technicalRegimeLabel || macro.technicalRegimeLabel || '';
  const effective = notionSnapshot.effectiveRegimeLabel || macro.effectiveRegimeLabel || '';
  const hasMacro = Boolean(
    macro.marketRegimeLabel
    || macro.fundamentalAnchorScore != null
    || macro.bubbleCriticalTrigger != null
    || technical
    || effective
  );
  if (!hasMacro) return '';

  const adjustmentNote = notionSnapshot.regimeAdjustmentReason || macro.regimeAdjustmentReason || '';
  const cards = [
    { label: '적용 레짐', value: effective || '-' },
    { label: '기술 레짐', value: technical || '-' },
    { label: '거시 레짐', value: macro.marketRegimeLabel || '-' },
    { label: '펀더 앵커', value: macro.fundamentalAnchorScore != null ? `${Math.round(Number(macro.fundamentalAnchorScore))} (${macro.fundamentalAnchorState || '-'})` : '-' },
    { label: '버블 엔진', value: `BI ${macro.bubbleIndex != null ? Math.round(Number(macro.bubbleIndex)) : '-'} · critical ${macro.bubbleCriticalTrigger ? 'ON' : 'OFF'}` },
    { label: '리스크 지수', value: macro.riskIndex != null ? String(macro.riskIndex) : '-' }
  ];

  return `
    <div class="macro-regime-panel">
      <div class="gap-score-title">거시·지수 맥락 (market-analyze 보조)</div>
      <div class="regime-summary-grid">
        ${cards.map(card => `
          <div class="regime-stat-card">
            <div class="regime-stat-label"><span>${escapeHtml(card.label)}</span></div>
            <div class="regime-stat-value">${escapeHtml(card.value)}</div>
          </div>
        `).join('')}
      </div>
      ${adjustmentNote ? `<div class="regime-stat-note">${escapeHtml(adjustmentNote)}</div>` : ''}
      ${technical && effective && technical !== effective ? `<div class="regime-stat-note">기술 레짐과 적용 레짐이 다릅니다. 종목 라벨은 적용 레짐 기준으로 재계산됩니다.</div>` : ''}
    </div>
  `;
}

function renderRegimeSummary() {
  const container = document.getElementById('buy-regime-summary');
  if (!container) return;

  const hasDetailedGapScore = notionSnapshot.gapScore.rows.length > 0;
  const summaryRows = notionSnapshot.regimeTable.filter(row => {
    if (!hasDetailedGapScore) return true;
    const key = normalizeRegimeGuideKey(row.item);
    return key !== '갭 스코어' && key !== '갭 조정';
  });

  if (!summaryRows.length && !hasDetailedGapScore) {
    container.innerHTML = '<div class="empty-state">전략 JSON에서 시장 레짐 요약을 불러오면 여기에 표시됩니다.</div>';
    return;
  }

  container.innerHTML = `
    ${summaryRows.length ? `
    <div class="regime-summary-grid">
      ${summaryRows.map(row => `
        ${(() => {
          const guideText = getRegimeGuideText(row.item);
          const inlineHelp = getRegimeInlineHelp(row);
          return `
        <div class="regime-stat-card">
          <div class="regime-stat-label">
            <span>${escapeHtml(row.item)}</span>
            ${guideText ? `
              <span class="regime-help">
                <button type="button" class="regime-help-trigger" aria-label="${escapeHtml(`${row.item} 설명 보기`)}">?</button>
                <span class="regime-help-tooltip" role="tooltip">${escapeHtml(guideText)}</span>
              </span>
            ` : ''}
          </div>
          <div class="regime-stat-value">${escapeHtml(row.value)}</div>
          ${inlineHelp ? `<div class="regime-stat-note">${escapeHtml(inlineHelp)}</div>` : ''}
        </div>
      `;
        })()}
      `).join('')}
    </div>
    ` : ''}
    ${renderGapScoreSummary()}
    ${renderMacroRegimeSummary()}
    ${notionSnapshot.regimeAlert ? `<div class="regime-alert">${escapeHtml(notionSnapshot.regimeAlert)}</div>` : ''}
  `;

  const gapGradeTrigger = container.querySelector('.gap-score-grade-trigger');
  if (gapGradeTrigger) {
    gapGradeTrigger.addEventListener('click', openGapGuideModal);
  }

  container.querySelectorAll('.regime-help').forEach(help => {
    const tooltip = help.querySelector('.regime-help-tooltip');
    const openTooltip = () => {
      help.classList.add('is-open');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateY(0)';
      }
    };
    const closeTooltip = () => {
      help.classList.remove('is-open');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateY(4px)';
      }
    };

    help.addEventListener('mouseenter', openTooltip);
    help.addEventListener('mouseleave', closeTooltip);

    const trigger = help.querySelector('.regime-help-trigger');
    if (trigger) {
      trigger.addEventListener('focus', openTooltip);
      trigger.addEventListener('blur', closeTooltip);
    }
  });
}

function renderGuideTables() {
  document.getElementById('guide-regime-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>상태</th><th>조건</th><th>눌림목</th><th>매집형</th><th>돌파형</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.regimes.map(row => `<tr><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.pullback)}</td><td>${escapeHtml(row.accumulation)}</td><td>${escapeHtml(row.breakout)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-grade-table').innerHTML = `
    <div class="guide-subtitle">추세 추종 전략 (눌림목·매집형·돌파형)</div>
    <table class="guide-table">
      <thead><tr><th>등급</th><th>점수</th><th>의미</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.trendGrades.map(row => `<tr><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.meaning)}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="guide-subtitle">역추세 전략</div>
    <table class="guide-table">
      <thead><tr><th>등급</th><th>점수</th><th>의미</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.reversalGrades.map(row => `<tr><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.meaning)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-permission-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>레짐</th><th>S (9.0+)</th><th>A (7.5~8.9)</th><th>B (6.0~7.4)</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.permissions.map(row => `<tr><td>${escapeHtml(row.regime)}</td><td>${escapeHtml(row.s)}</td><td>${escapeHtml(row.a)}</td><td>${escapeHtml(row.b)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-adjust-table').innerHTML = `
    <div class="guide-subtitle">추세 추종 전략</div>
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.trendVkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="guide-subtitle">역추세 전략</div>
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.reversalVkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function buildSellCardPlanSummary(code) {
  const parsed = parseEntryKey(code, activeSellSlot);
  const detail = stockDetailMap[parsed.entryKey] || stockDetailMap[code];
  const entry = getEntryByCode(parsed.entryKey, parsed.slotId);
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) {
    if (detail?.mode === 'sell') {
      return renderSellStrategyPlan(detail, true);
    }
    return '<div class="scard-plan-empty">매매 단계 정보 없음</div>';
  }

  if (hasEntryTakeProfitProfiles(entry)) {
    const recommendedProfile = getRecommendedTakeProfitProfileEntry(entry);
    const tags = buildTradePlanStageTagHtml(recommendedProfile || entry, { recommendedProfile });
    const entryPrice = entry.entryPriceValue ? `진입가: ${entry.entryPriceValue.toLocaleString()}원` : '';
    if (detail?.mode === 'sell') {
      return `
        ${renderSellStrategyPlan(detail, true)}
        <div class="scard-plan scard-plan-tags">
          <div class="plan-prices">${tags.join('')}</div>
          ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
        </div>
      `;
    }
    return `
      <div class="scard-plan">
        <div class="plan-prices">${tags.join('')}</div>
        ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
      </div>
    `;
  }

  const tags = buildTradePlanStageTagHtml(entry);

  const entryPrice = entry.entryPriceValue ? `진입가: ${entry.entryPriceValue.toLocaleString()}원` : '';

  if (detail?.mode === 'sell') {
    return `
      ${renderSellStrategyPlan(detail, true)}
      <div class="scard-plan scard-plan-tags">
        <div class="plan-prices">${tags.join('')}</div>
        ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
      </div>
    `;
  }

  return `
    <div class="scard-plan">
      <div class="plan-prices">${tags.join('')}</div>
      ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
    </div>
  `;
}

const PULLBACK_SUPPORT_FAMILY_META = {
  horizontal: { shortLabel: '수평', icon: '📏' },
  swingCluster: { shortLabel: '스윙', icon: '📉' },
  volumeShelf: { shortLabel: '매물대', icon: '📦' },
  eventAnchors: { shortLabel: '급증봉', icon: '⚓' }
};

function formatPullbackSupportPrice(price) {
  const numeric = Number(price);
  return Number.isFinite(numeric) && numeric > 0 ? `${numeric.toLocaleString()}원` : '가격 미산출';
}

function formatPullbackSupportDaysAgo(daysAgo) {
  const numeric = Number(daysAgo);
  if (!Number.isFinite(numeric) || numeric < 0) return '최근성 미상';
  if (numeric === 0) return '당일';
  if (numeric === 1) return '1일 전';
  return `${numeric}일 전`;
}

function getPullbackSupportStrengthBadgeMeta(support = {}) {
  const label = String(support.strengthLabel || '');
  if (label === 'strong') return { cls: 'strong', text: `강도 ${Number(support.strengthScore || 0)} · strong` };
  if (label === 'watch') return { cls: 'watch', text: `강도 ${Number(support.strengthScore || 0)} · watch` };
  return { cls: 'weak', text: `강도 ${Number(support.strengthScore || 0)} · weak` };
}

function getPullbackSupportWarningBadgeMeta(support = {}) {
  const level = String(support.warningLevel || '');
  if (level === 'clear') return { cls: 'clear', text: '경고 낮음' };
  if (level === 'warning') return { cls: 'warning', text: '주의 필요' };
  return { cls: 'danger', text: '하단 방어 약함' };
}

function getPullbackRepresentativeFamilyLines(context = {}) {
  const families = context.families && typeof context.families === 'object' ? context.families : {};
  return ['horizontal', 'swingCluster', 'volumeShelf', 'eventAnchors']
    .map(family => {
      const lines = Array.isArray(families[family]) ? families[family] : [];
      return lines.find(line => line?.valid) || lines[0] || null;
    })
    .filter(Boolean);
}

function buildPullbackSupportCardTags(context = {}) {
  const support = context.support || {};
  const primaryLine = support.primaryLine || null;
  const chips = [];
  if (primaryLine?.price) {
    chips.push(`<span class="buy-card-support-tag primary">주지지 ${formatPullbackSupportPrice(primaryLine.price)}</span>`);
  }
  if (Number.isFinite(Number(support.strengthScore))) {
    const strengthBadge = getPullbackSupportStrengthBadgeMeta(support);
    chips.push(`<span class="buy-card-support-tag strength ${strengthBadge.cls}">${escapeHtml(strengthBadge.text)}</span>`);
  }
  getPullbackRepresentativeFamilyLines(context).slice(0, 3).forEach(line => {
    const familyMeta = PULLBACK_SUPPORT_FAMILY_META[line.family] || { shortLabel: line.familyLabel || line.label || '지지', icon: '•' };
    chips.push(`<span class="buy-card-support-tag family">${escapeHtml(familyMeta.shortLabel)} ${formatPullbackSupportPrice(line.price)}</span>`);
  });
  return chips.slice(0, 5).join('');
}

function buildPullbackVolumeHistoryText(context = {}) {
  const volumeBurst = context.volumeBurst || {};
  const eventAnchors = Array.isArray(context.families?.eventAnchors) ? context.families.eventAnchors : [];
  const primaryAnchor = eventAnchors.find(line => line?.valid) || eventAnchors[0] || null;
  const parts = [];
  if (Number(volumeBurst.burstCount || 0) > 0) {
    parts.push(`200%+ 급증 ${Number(volumeBurst.burstCount)}회`);
  } else if (volumeBurst.summary) {
    parts.push(String(volumeBurst.summary));
  }
  if (primaryAnchor?.price) {
    parts.push(`유효 앵커 ${formatPullbackSupportPrice(primaryAnchor.price)} (${formatPullbackSupportDaysAgo(primaryAnchor.lastSeenDaysAgo)})`);
  }
  return parts.join(' · ');
}

function buildPullbackSupportEvidenceCards(context = {}) {
  const support = context.support || {};
  const families = getPullbackRepresentativeFamilyLines(context);
  const mergedLines = Array.isArray(support.lines) ? support.lines.slice(0, 2) : [];
  const cards = [];
  mergedLines.forEach(line => {
    const toneClass = line.role === 'primary' ? 'clear' : 'unknown';
    const distanceText = typeof line.distancePct === 'number' ? `${line.distancePct.toFixed(2)}% 아래` : '거리 미산출';
    const familiesText = Array.isArray(line.familyLabels) ? line.familyLabels.join(' · ') : '';
    cards.push(`
      <div class="modal-ind-card ${toneClass}">
        <div class="modal-ind-icon">${line.role === 'primary' ? '🧱' : '➖'}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(line.label || '지지선')}</div>
          <div class="modal-ind-result">→ ${escapeHtml(formatPullbackSupportPrice(line.price))} · ${escapeHtml(distanceText)}</div>
          <div class="modal-ind-value">📐 family ${Number(line.familyCount || 0)}개 / 반복 ${Number(line.count || 0)}회 / 최근 ${escapeHtml(formatPullbackSupportDaysAgo(line.lastSeenDaysAgo))}${familiesText ? ` / ${escapeHtml(familiesText)}` : ''}</div>
        </div>
      </div>
    `);
  });
  families.forEach(line => {
    const familyMeta = PULLBACK_SUPPORT_FAMILY_META[line.family] || { shortLabel: line.familyLabel || line.label || '지지', icon: '•' };
    const distanceText = typeof line.distancePct === 'number' ? `${line.distancePct.toFixed(2)}% 아래` : '거리 미산출';
    cards.push(`
      <div class="modal-ind-card ${line.valid ? 'clear' : 'unknown'}">
        <div class="modal-ind-icon">${escapeHtml(familyMeta.icon)}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(familyMeta.shortLabel)} 근거</div>
          <div class="modal-ind-result">→ ${escapeHtml(formatPullbackSupportPrice(line.price))} · ${escapeHtml(distanceText)}</div>
          <div class="modal-ind-value">📐 반복 ${Number(line.count || 0)}회 / 최근 ${escapeHtml(formatPullbackSupportDaysAgo(line.lastSeenDaysAgo))}</div>
        </div>
      </div>
    `);
  });
  return cards.join('');
}

function renderPullbackSupportModalSection(context = {}) {
  if (!context?.support) return '';
  const support = context.support;
  const primaryLine = support.primaryLine || null;
  const strengthBadge = getPullbackSupportStrengthBadgeMeta(support);
  const warningBadge = getPullbackSupportWarningBadgeMeta(support);
  const badgeRow = [
    `<span class="pullback-support-badge ${strengthBadge.cls}">${escapeHtml(strengthBadge.text)}</span>`,
    `<span class="pullback-support-badge ${warningBadge.cls}">${escapeHtml(warningBadge.text)}</span>`,
    primaryLine?.price ? `<span class="pullback-support-badge primary">주지지 ${escapeHtml(formatPullbackSupportPrice(primaryLine.price))}</span>` : ''
  ].filter(Boolean).join('');

  const contentHtml = `
    <div class="pullback-support-badges">${badgeRow}</div>
    ${support.summary ? `<div class="buy-detail-note"><strong>요약</strong><span>${escapeHtml(support.summary)}</span></div>` : ''}
    ${support.warningReason ? `<div class="buy-detail-note"><strong>경고</strong><span>${escapeHtml(support.warningReason)}</span></div>` : ''}
    <div class="modal-ind-list">
      ${buildPullbackSupportEvidenceCards(context)}
    </div>
  `;

  return renderModalCollapsibleSection('buy-section-pullback-support', '지지선 구조', contentHtml);
}

window.renderPullbackSupportModalSection = renderPullbackSupportModalSection;

function renderPullbackCardInsights(entry) {
  if (entry?.strategy !== 'pullback' || !entry?.pullbackContext) return '';
  const context = entry.pullbackContext;
  const support = context.support || {};
  const supportTags = buildPullbackSupportCardTags(context);
  const volumeHistoryText = buildPullbackVolumeHistoryText(context);

  if (!supportTags && !support.summary && !volumeHistoryText) return '';

  return `
    <div class="buy-card-insight">
      ${supportTags ? `<div class="buy-card-support-lines">${supportTags}</div>` : ''}
      ${support.summary ? `<div class="buy-card-insight-line"><strong>지지선</strong><span>${escapeHtml(support.summary)}</span></div>` : ''}
      ${volumeHistoryText ? `<div class="buy-card-insight-line"><strong>거래량 이력</strong><span>${escapeHtml(volumeHistoryText)}</span></div>` : ''}
    </div>
  `;
}

function getVolatilityStateLabel(state) {
  if (state === 'calm') return '저변동성';
  if (state === 'volatile') return '고변동성';
  return '중립 변동성';
}

function getVolatilityFitLabel(fit) {
  if (fit === 'favorable') return '유리';
  if (fit === 'slight_favorable') return '다소 유리';
  if (fit === 'unfavorable') return '불리';
  return '중립';
}

function getVolatilityToneClass(fit) {
  if (fit === 'favorable' || fit === 'slight_favorable') return 'clear';
  if (fit === 'unfavorable') return 'triggered';
  return 'unknown';
}

function getVolatilityDeltaToneClass(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || Math.abs(numeric) < 1e-9) return 'unknown';
  return numeric > 0 ? 'clear' : 'triggered';
}

function getVolatilityFitBadgeText(fit) {
  if (fit === 'favorable' || fit === 'slight_favorable') return '✅ 변동성 유리';
  if (fit === 'unfavorable') return '⛔ 변동성 불리';
  return '➖ 변동성 중립';
}

function getVolatilityDeltaBadgeText(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || Math.abs(numeric) < 1e-9) return '➖ 점수 보정 0.00점';
  if (numeric > 0) return `📈 가점 ${formatSignedVolatilityDelta(numeric)}`;
  return `📉 감점 ${formatSignedVolatilityDelta(numeric)}`;
}

function formatSignedVolatilityDelta(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0.00점';
  return `${numeric >= 0 ? '+' : ''}${numeric.toFixed(2)}점`;
}

function trimVolatilitySummaryText(summary) {
  const raw = String(summary || '').trim();
  const match = raw.match(/^[^(]+\((.*)\)$/);
  return (match ? match[1] : raw).trim();
}

function trimVolatilityReasonText(context = {}) {
  const reason = String(context.reason || '').trim();
  if (!reason) return '';
  const metricsMarker = reason.indexOf(' VKOSPI ');
  return (metricsMarker >= 0 ? reason.slice(0, metricsMarker) : reason).trim().replace(/\s+/g, ' ');
}

function buildVolatilityStateTriplet(context = {}) {
  return [
    `시장 ${getVolatilityStateLabel(context.marketState)}`,
    `종목 ${getVolatilityStateLabel(context.stockState)}`,
    `혼합 ${getVolatilityStateLabel(context.blendedState)}`
  ].join(' / ');
}

function buildVolatilityBadgeRow(context = {}) {
  const toneClass = getVolatilityToneClass(context.strategyFit);
  const deltaToneClass = getVolatilityDeltaToneClass(context.scoreDelta);
  return [
    `<span class="buy-card-support-tag volatility-fit ${toneClass}">${escapeHtml(getVolatilityFitBadgeText(context.strategyFit))}</span>`,
    `<span class="buy-card-support-tag volatility-state ${toneClass}">${escapeHtml(getVolatilityStateLabel(context.blendedState))}</span>`,
    `<span class="buy-card-support-tag volatility-delta ${deltaToneClass}">${escapeHtml(getVolatilityDeltaBadgeText(context.scoreDelta))}</span>`
  ].join('');
}

function renderVolatilityTopBadges(entry) {
  const context = entry?.volatilityContext;
  if (!context?.summary) return '';
  return `<div class="buy-card-top-badges">${buildVolatilityBadgeRow(context)}</div>`;
}

function renderVolatilityCardInsights(entry) {
  const context = entry?.volatilityContext;
  if (!context?.summary) return '';
  const toneClass = getVolatilityToneClass(context.strategyFit);
  const stateTriplet = buildVolatilityStateTriplet(context);
  const summaryText = trimVolatilitySummaryText(context.summary);
  return `
    <div class="buy-card-insight volatility ${toneClass}">
      <div class="buy-card-insight-line"><strong>변동성 적합</strong><span>${escapeHtml(summaryText)}</span></div>
      <div class="buy-card-insight-line"><strong>장세 판정</strong><span>${escapeHtml(stateTriplet)}</span></div>
    </div>
  `;
}

function renderModalCollapsibleSection(sectionId, title, contentHtml, { expanded = false } = {}) {
  if (!contentHtml) return '';
  const collapsedClass = expanded ? '' : ' is-collapsed';
  const toggleLabel = expanded ? '-' : '+';
  const toggleTitle = expanded ? `${title} 접기` : `${title} 펼치기`;
  return `
    <div class="modal-collapsible-section">
      <div class="modal-collapsible-header">
        <button type="button" class="modal-section-toggle section-toggle" aria-expanded="${expanded}" aria-controls="${sectionId}" title="${escapeHtml(toggleTitle)}">${toggleLabel}</button>
        <div class="modal-section-label modal-collapsible-title">${escapeHtml(title)}</div>
      </div>
      <div id="${sectionId}" class="modal-collapsible-body${collapsedClass}">
        ${contentHtml}
      </div>
    </div>
  `;
}

function toggleModalCollapsibleSection(toggleButton) {
  const section = toggleButton.closest('.modal-collapsible-section');
  if (!section) return;
  const body = section.querySelector('.modal-collapsible-body');
  if (!body) return;
  const titleEl = section.querySelector('.modal-collapsible-title');
  const title = titleEl?.textContent?.trim() || '섹션';
  const collapsed = body.classList.toggle('is-collapsed');
  toggleButton.textContent = collapsed ? '+' : '-';
  toggleButton.setAttribute('aria-expanded', String(!collapsed));
  toggleButton.setAttribute('title', collapsed ? `${title} 펼치기` : `${title} 접기`);
}

function renderVolatilityModalSection(context = {}) {
  if (!context?.summary) return '';
  const toneClass = getVolatilityToneClass(context.strategyFit);
  const metrics = context.metrics || {};
  const reasonSummary = trimVolatilityReasonText(context) || context.summary;
  const stateTriplet = buildVolatilityStateTriplet(context);
  const summaryText = trimVolatilitySummaryText(context.summary);
  const metricRows = [
    Number.isFinite(Number(metrics.vkospi)) ? `VKOSPI ${Number(metrics.vkospi).toFixed(2)}` : '',
    Number.isFinite(Number(metrics.atrPct10)) ? `ATR10 ${Number(metrics.atrPct10).toFixed(2)}%` : '',
    Number.isFinite(Number(metrics.returnStd20)) ? `20일 표준편차 ${Number(metrics.returnStd20).toFixed(2)}%` : '',
    Number.isFinite(Number(metrics.todayRangePct)) ? `당일 레인지 ${Number(metrics.todayRangePct).toFixed(2)}%` : ''
  ].filter(Boolean).join(' / ');

  const contentHtml = `
    <div class="pullback-support-badges">${buildVolatilityBadgeRow(context)}</div>
    <div class="modal-ind-list">
      <div class="modal-ind-card ${toneClass}">
        <div class="modal-ind-icon">${toneClass === 'clear' ? '🌊' : toneClass === 'triggered' ? '⚠️' : '➖'}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(context.strategyLabel || '현재 전략')} 유불리</div>
          <div class="modal-ind-result">→ ${escapeHtml(summaryText)}</div>
          <div class="modal-ind-value">📐 ${escapeHtml(stateTriplet)} / 보정 ${escapeHtml(formatSignedVolatilityDelta(context.scoreDelta))}</div>
        </div>
      </div>
      <div class="modal-ind-card unknown">
        <div class="modal-ind-icon">🧭</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">판정 해석</div>
          <div class="modal-ind-result">→ ${escapeHtml(reasonSummary)}</div>
          <div class="modal-ind-value">📐 ${escapeHtml(stateTriplet)}</div>
        </div>
      </div>
      <div class="modal-ind-card unknown">
        <div class="modal-ind-icon">📊</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">사용 지표</div>
          <div class="modal-ind-result">→ 최근 일봉 변동성과 VKOSPI를 함께 반영합니다.</div>
          ${metricRows ? `<div class="modal-ind-value">📐 ${escapeHtml(metricRows)}</div>` : ''}
        </div>
      </div>
    </div>
  `;

  return renderModalCollapsibleSection('buy-section-volatility', '변동성 적합도', contentHtml);
}

function getSellStrategyStageMeta(stage) {
  const stageMap = {
    premarket: { icon: '🌅', title: '프리마켓 익절', shortTitle: '프리마켓' },
    openPhase: { icon: '🔔', title: '장초반 익절', shortTitle: '장초반' },
    intraday1: { icon: '📈', title: '장중 1차 익절', shortTitle: '1차 익절' },
    intraday2: { icon: '📈', title: '장중 2차 익절', shortTitle: '2차 익절' },
    swing: { icon: '📊', title: '스윙 전환', shortTitle: '스윙' },
    stopLoss: { icon: '🛑', title: '손절 라인', shortTitle: '손절' }
  };
  return stageMap[stage] || { icon: '•', title: stage || '전략', shortTitle: stage || '전략' };
}

function summarizeTradePlanRow(row) {
  if (!row) return '';
  const summaryParts = [];
  if (row.quantity) summaryParts.push(`수량 ${row.quantity}`);
  if (row.targetYield) summaryParts.push(`목표 ${row.targetYield}`);
  if (row.targetPrice) summaryParts.push(`목표가 ${row.targetPrice}`);
  return summaryParts.join(' · ');
}

function describeSellStrategyStage(stage, row, detail) {
  const rowSummary = summarizeTradePlanRow(row);
  const rowCondition = row?.condition ? stripMarkdownText(row.condition) : '';

  if (stage === 'premarket') {
    return `프리마켓에서 ${row?.quantity || '일부'} 익절 우선${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'openPhase') {
    return `장초반에 ${row?.quantity || '일부'} 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'intraday1') {
    return `1차 목표 도달 시 ${row?.quantity || '일부'} 차익실현${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'intraday2') {
    return `2차 목표 도달 시 ${row?.quantity || '잔여 물량'} 추가 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'swing') {
    if (detail?.gapProfile?.swingMode === 'ban') {
      return '현재 갭 조건에서는 스윙 전환 금지, 당일 정리 우선';
    }
    if (detail?.gapProfile?.swingMode === 'conditional') {
      return `잔여 물량만 조건부 스윙 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
    }
    return `잔여 물량만 스윙 전환 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'stopLoss') {
    const stopTiming = getMixedExitStopTimingText(detail);
    return `${stopTiming ? `손절 시점 ${stopTiming} · ` : ''}손절선 이탈 시 전량 매도${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  return rowSummary || rowCondition || '세부 전략 확인';
}

function buildSyntheticSellStrategyItem(detail) {
  if (!detail) return null;

  if (detail.actionStage === 'reject' || detail.actionStage === 'loss_cut') {
    return {
      status: 'blocked',
      icon: '🛑',
      title: '즉시 손절 또는 전량 매도',
      description: detail.triggeredRule?.result || '핵심 손절 조건이 충족되어 전량 매도 우선입니다.',
      note: detail.triggeredRule?.value || ''
    };
  }

  if (detail.actionStage === 'partial_exit') {
    const reason = detail.triggeredRule?.result
      || detail.lossManagement?.verdict
      || (detail.gapProfile?.swingMode === 'ban'
        ? '스윙 전환 금지 구간이므로 일부 익절 후 현금화 우선입니다.'
        : '현재 구간에서는 보유 물량 30~50%를 먼저 줄이고 나머지 물량만 장중 확인합니다.');
    return {
      status: 'active',
      icon: '🟡',
      title: '지금은 비중 축소 우선',
      description: reason,
      note: detail.gapProfile?.summary || ''
    };
  }

  if (detail.actionStage === 'hold') {
    return {
      status: 'active',
      icon: '✅',
      title: '지금은 홀딩 유지',
      description: '아직 익절 목표 또는 손절 조건이 확정적으로 충족되지 않아 보유 유지가 우선입니다.',
      note: detail.gapProfile?.summary || ''
    };
  }

  if (detail.actionStage === 'wait') {
    return {
      status: 'available',
      icon: '⏳',
      title: '장 시작 전 대기',
      description: '프리마켓 또는 시초가 확인 전까지는 대기하고 첫 실행 가격부터 다시 판단합니다.',
      note: ''
    };
  }

  if (detail.actionStage === 'underwater') {
    return {
      status: 'active',
      icon: '⚠️',
      title: '평가손 관리 우선',
      description: detail.lossManagement?.verdict || '평가손 구간이므로 손절선과 손실 관리 점수를 우선 확인합니다.',
      note: detail.lossManagement ? `권장 손절가 ${detail.lossManagement.recommendedStopPrice.toLocaleString()}원` : ''
    };
  }

  return null;
}

function buildSellStrategyPlan(detail) {
  const entry = getEntryByCode(detail?.stock?.entryKey || detail?.stock?.code || '', detail?.stock?.slotId);
  const targets = detail?.targets || parseTradePlanTargets(entry);
  const items = [];
  const currentItem = buildSyntheticSellStrategyItem(detail);
  const stageOrder = ['premarket', 'openPhase', 'intraday1', 'intraday2', 'swing'];

  if (currentItem) items.push(currentItem);

  if (hasEntryTakeProfitProfiles(entry)) {
    const indicatorItems = (Array.isArray(detail?.indicators) ? detail.indicators : [])
      .filter(indicator => {
        const title = String(indicator?.title || '');
        return indicator
          && title !== '분석 단계'
          && title !== '매도 단계 판정'
          && (indicator.status === 'triggered' || indicator.status === 'warning' || indicator.status === 'clear');
      })
      .slice(0, 4)
      .map(indicator => ({
        status: indicator.status === 'triggered' ? 'blocked' : indicator.status === 'warning' ? 'guard' : 'available',
        icon: indicator.status === 'triggered' ? '🚨' : indicator.status === 'warning' ? '⚠️' : '👀',
        title: String(indicator.title || '라이브 규칙'),
        description: String(indicator.result || indicator.criterion || ''),
        note: String(indicator.value || '')
      }));
    const liveItems = items.concat(indicatorItems);
    const normalizedItems = liveItems.length ? liveItems : [{
      status: 'available',
      icon: '🛰️',
      title: '현재 유효 라이브 규칙',
      description: '프로필 표와 별도로 실시간 손절/익절 규칙만 표시합니다.',
      note: ''
    }];
    const headlineItem = normalizedItems[0];
    return {
      headline: headlineItem.title,
      headlineDetail: headlineItem.description,
      items: normalizedItems
    };
  }

  stageOrder.forEach(stage => {
    const target = targets?.[stage];
    if (!target?.row) return;
    const meta = getSellStrategyStageMeta(stage);
    let status = detail?.actionStage === stage ? 'active' : 'available';

    if (stage === 'swing' && detail?.gapProfile?.swingMode === 'ban') {
      status = 'blocked';
    } else if (stage === 'swing' && detail?.gapProfile?.swingMode === 'conditional' && detail?.actionStage !== stage) {
      status = 'guard';
    }

    items.push({
      status,
      icon: meta.icon,
      title: meta.title,
      description: describeSellStrategyStage(stage, target.row, detail),
      note: target.row.condition ? stripMarkdownText(target.row.condition) : ''
    });
  });

  const stopLossRow = targets?.stopLoss?.row;
  if (stopLossRow || detail?.targets?.entryPrice || detail?.data?.prevClose) {
    items.push({
      status: detail?.decision === 'sell' ? 'blocked' : 'guard',
      icon: '🛑',
      title: '손절 라인 점검',
      description: describeSellStrategyStage('stopLoss', stopLossRow, detail),
      note: stopLossRow?.condition ? stripMarkdownText(stopLossRow.condition) : ''
    });
  }

  if (!items.length) {
    items.push({
      status: 'available',
      icon: '•',
      title: '기본 전략 확인',
      description: '전략 데이터의 매매 단계 또는 분석 결과를 기반으로 다시 판단합니다.',
      note: ''
    });
  }

  const headlineItem = items[0];
  return {
    headline: headlineItem.title,
    headlineDetail: headlineItem.description,
    items
  };
}

function renderSellStrategyPlan(detail, compact = false) {
  const plan = buildSellStrategyPlan(detail);
  const visibleItems = compact ? getCompactSellPlanItems(plan.items) : plan.items;

  return `
    <div class="${compact ? 'scard-plan scard-plan-current' : 'sell-strategy-panel'}">
      <div class="${compact ? 'plan-current-title' : 'modal-section-label'}">${compact ? '현재 유효 전략' : '🎯 현재 유효한 매매 전략'}</div>
      <div class="${compact ? 'plan-current-summary' : 'sell-strategy-summary'}">${escapeHtml(plan.headline)}: ${escapeHtml(plan.headlineDetail)}</div>
      <div class="${compact ? 'plan-checklist' : 'sell-strategy-list'}">
        ${visibleItems.map(item => `
          <div class="${compact ? `plan-check ${item.status}` : `modal-ind-card ${item.status === 'blocked' ? 'triggered' : item.status === 'active' ? 'clear' : 'unknown'} sell-strategy-item`}">
            ${compact ? `
              <span class="plan-check-icon">${escapeHtml(item.icon)}</span>
              <div class="plan-check-content">
                <div class="plan-check-title">${escapeHtml(item.title)}</div>
                <div class="plan-check-text">${escapeHtml(item.description)}</div>
              </div>
            ` : `
              <div class="modal-ind-icon">${escapeHtml(item.icon)}</div>
              <div class="modal-ind-content">
                <div class="modal-ind-title">${escapeHtml(item.title)}</div>
                <div class="modal-ind-result">→ ${escapeHtml(item.description)}</div>
                ${item.note ? `<div class="modal-ind-value">📐 ${escapeHtml(item.note)}</div>` : ''}
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSellStockCards() {
  const allVisibleStocks = [
    ...(stocks.pullback || []),
    ...(stocks.accumulation || []),
    ...(stocks.breakout || []),
    ...(stocks.reversal || []),
    ...(stocks.swing || [])
  ];
  const marketCapRankMap = buildMarketCapRankMap(allVisibleStocks);
  const renderGroup = (arr, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!arr.length) {
      container.innerHTML = '<div class="empty-state">추출된 종목이 없습니다.</div>';
      return;
    }

    arr.forEach(stock => {
      const planHtml = buildSellCardPlanSummary(stock.code);
      const entry = getEntryByCode(stock.code);
      container.innerHTML += `
        <div class="scard" id="card-${stock.code}">
          <div class="scard-head">
            <div>
              <div class="scard-name">${buildStockNameLinksHtml(stock.name, stock.code, stock.stockExchangeName || entry?.stockExchangeName)}</div>
              <div class="scard-code-wrap">
                <div class="scard-code">${escapeHtml(stock.code)}${getTradingValueRankBadgeHtml(entry)}${renderMarketCapInlineHtml(entry || stock, marketCapRankMap)}</div>
              </div>
            </div>
            <div class="scard-badges">
              <span class="badge badge-shift" id="gap-shift-${stock.code}" style="display:none"></span>
              <span class="badge badge-pending" id="badge-${stock.code}">대기 중</span>
            </div>
          </div>
          <div class="price-row" id="price-row-${stock.code}">
            <span class="price placeholder-price">대기 중</span>
          </div>
          <div class="meta" id="meta-${stock.code}">매수가(전일종가): 대기 중</div>
          <div id="plan-${stock.code}">${planHtml}</div>
          <div class="indicators" id="ind-${stock.code}">
            <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
      `;
    });
  };

  renderGroup(stocks.pullback, 'list-pullback');
  renderGroup(stocks.accumulation, 'list-accumulation');
  renderGroup(stocks.breakout, 'list-breakout');
  renderGroup(stocks.reversal, 'list-reversal');
  renderSwingCards();
}

function renderSwingCards() {
  const container = document.getElementById('list-swing');
  if (!container) return;
  container.innerHTML = '';
  if (!stocks.swing.length) {
    container.innerHTML = '<div class="empty-state">스윙 보유 종목이 없습니다.</div>';
    return;
  }

  stocks.swing.forEach(stock => {
    const planHtml = buildSellCardPlanSummary(stock.code);
    container.innerHTML += `
      <div class="scard swing-card" id="card-${stock.code}">
        <div class="scard-head">
            <div>
              <div class="scard-name">${buildStockNameLinksHtml(stock.name, stock.code, stock.stockExchangeName || getEntryByCode(stock.code)?.stockExchangeName)}</div>
              <div class="scard-code-wrap">
                <div class="scard-code">${escapeHtml(stock.code)}${getTradingValueRankBadgeHtml(getEntryByCode(stock.code))}${renderMarketCapInlineHtml(getEntryByCode(stock.code), marketCapRankMap)}</div>
              </div>
            </div>
          <div class="scard-badges">
            <span class="badge badge-shift" id="gap-shift-${stock.code}" style="display:none"></span>
            <span class="badge badge-swing" id="badge-${stock.code}">스윙 보유</span>
          </div>
        </div>
        <div class="swing-meta">
          <span class="swing-meta-item">매수일 ${escapeHtml(stock.buyDate)}</span>
          <span class="swing-meta-item">매수가 ${stock.entryPrice.toLocaleString()}원</span>
          <span class="swing-meta-item">${escapeHtml(stock.status)}</span>
        </div>
        <div class="price-row" id="price-row-${stock.code}">
          <span class="price placeholder-price">대기 중</span>
        </div>
        <div class="meta" id="meta-${stock.code}">수익률: 분석 시작 후 표시</div>
        <div id="plan-${stock.code}">${planHtml}</div>
        <div class="indicators" id="ind-${stock.code}">
          <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
        </div>
      </div>
    `;
  });
}

/** 시장 거시 보류 배너 렌더링.
 *  전 전략 후보가 오직 시장(G5) 때문에 막힌 경우 상단에 이유 요약 배너를 표시.
 *  셋업이 약한 경우(setup_weak)나 일부만 막힌 경우에는 표시 안 함. */
function renderBuyMarketHoldBanner() {
  const banner = document.getElementById('buy-market-hold-banner');
  if (!banner) return;

  const allEntries = [
    ...(notionSnapshot.pullbackEntries || []),
    ...(notionSnapshot.accumulationEntries || []),
    ...(notionSnapshot.breakoutEntries || notionSnapshot.momentumEntries || []),
    ...(notionSnapshot.reversalEntries || []),
  ];

  const totalWithQuality = allEntries.filter(e => e.setupQuality);
  if (!totalWithQuality.length) { banner.innerHTML = ''; return; }

  const eligibleCount = allEntries.filter(e => e.entryEligible).length;
  const marketHoldCount = allEntries.filter(e => e.setupQuality === 'market_hold').length;
  const setupWeakCount = allEntries.filter(e => e.setupQuality === 'setup_weak').length;

  // 배너 표시 조건: 매수 가능 종목이 없고 market_hold가 1개 이상
  if (eligibleCount > 0 || marketHoldCount === 0) { banner.innerHTML = ''; return; }

  // 거시 컨텍스트 추출
  const kospiClose = notionSnapshot.kospiClose || notionSnapshot.marketContext?.find?.(r => r.item === 'KOSPI')?.value || '';
  const kospiMa5 = notionSnapshot.kospiMa5;
  const vkospi = notionSnapshot.vkospiValue || notionSnapshot.marketContext?.find?.(r => r.item?.includes('VKOSPI'))?.value || '';
  const regimeLabel = notionSnapshot.regimeLabel || '';

  let kospiDesc = '';
  if (kospiClose && kospiMa5 && Number(kospiClose) && Number(kospiMa5)) {
    const pct = ((Number(kospiClose) / Number(kospiMa5)) - 1) * 100;
    const sign = pct >= 0 ? '+' : '';
    kospiDesc = `KOSPI ${Number(kospiClose).toLocaleString('ko-KR', {maximumFractionDigits:0})} / 5일선 ${Number(kospiMa5).toLocaleString('ko-KR', {maximumFractionDigits:0})} (${sign}${pct.toFixed(1)}%)`;
  }
  const vkospiDesc = vkospi ? `VKOSPI ${Number(vkospi).toFixed(1)}` : '';

  const marketDesc = [kospiDesc, vkospiDesc].filter(Boolean).join(' · ');

  banner.innerHTML = `
    <div class="market-hold-banner">
      <div class="market-hold-banner-icon">⚠️</div>
      <div class="market-hold-banner-body">
        <div class="market-hold-banner-title">오늘은 전 종목 종가 베팅 보류 권고</div>
        <div class="market-hold-banner-desc">
          ${marketDesc ? `${escapeHtml(marketDesc)} — 시장 Gate 차단으로 신규 진입 보류.` : '시장 Gate 차단으로 신규 진입 보류.'}
          ${setupWeakCount > 0 ? ` (셋업 미흡 ${setupWeakCount}건 포함)` : ''}
        </div>
        <div class="market-hold-banner-sub">
          셋업 양호·시장 보류 <strong>${marketHoldCount}</strong>건 — 시장이 회복되면 재검토 후보로 우선 활용하세요.
        </div>
      </div>
    </div>
  `;
}

function formatMixedExitPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '';
  return `${number > 0 ? '+' : ''}${Number.isInteger(number) ? number.toFixed(0) : number.toFixed(1)}%`;
}

function buildMixedExitPolicySummary(policy) {
  if (!policy || typeof policy !== 'object') return '';
  const label = String(policy.label || (policy.active ? '혼합 전략' : '관찰 전용'));
  if (!policy.active) {
    return `${label} · ${String(policy.reason || '자동 진입 제외')}`;
  }
  const weight = Number(policy.positionWeightMultiplier);
  const weightText = policy?.volatilityOverlay?.active && Number.isFinite(weight)
    ? ` · 비중 ${Math.round(weight * 100)}%`
    : '';
  return `${label}${weightText}`;
}

function formatMixedExitQuantityLabel(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '매도';
  if (number >= 100) return '전량 정리';
  return `${number.toFixed(0)}% 매도`;
}

function normalizeMixedExitTimeLabel(value) {
  return String(value || '')
    .trim()
    .replace(/\s*또는\s*/gu, ' / ')
    .replace(/\s*확인\s*$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function simplifyMixedExitClause(value) {
  return String(value || '')
    .trim()
    .split(/[;,]/u)[0]
    .replace(/\s+/g, ' ')
    .trim();
}

const TRADE_PLAN_REC_BADGE_HTML = '<span class="plan-tag target" style="margin-left:6px;">👉 지금 추천</span>';

function getTradePlanActionGuideBasePrice(entry) {
  const value = Number(entry?.entryPriceValue);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function formatTradePlanActionGuidePrice(basePrice, pct) {
  const price = Number(basePrice);
  const rate = Number(pct);
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(rate)) return '-';
  return formatWon(Math.round(price * (1 + (rate / 100))));
}

function buildTradePlanActionGuideItems(policy, entry) {
  if (!policy || typeof policy !== 'object' || !policy.active) return [];
  const steps = [];
  const basePrice = getTradePlanActionGuideBasePrice(entry);
  const takeProfitStages = Array.isArray(policy.takeProfitStages) ? policy.takeProfitStages : [];
  const intradayRiskParts = [];
  const intradayAction = String(policy?.intradayRiskRule?.action || '').trim();
  if (policy?.intradayRiskRule?.active) {
    intradayRiskParts.push(`${normalizeMixedExitTimeLabel(policy?.intradayRiskRule?.timing) || '장중'} 체크 후 ${intradayAction || '부분 축소'}`);
  }
  if (policy?.volatilityOverlay?.active) {
    intradayRiskParts.push(String(policy.volatilityOverlay.label || '고변동성 방어 적용'));
  }
  if (intradayRiskParts.length) {
    steps.push({
      label: '장중',
      condition: intradayRiskParts.join(' · '),
      quantity: intradayAction || '-',
      targetYield: formatMixedExitPercent(policy?.intradayRiskRule?.triggerPct) || '-',
      targetPrice: formatTradePlanActionGuidePrice(basePrice, policy?.intradayRiskRule?.triggerPct)
    });
  }

  takeProfitStages.forEach((stage, index) => {
    const target = formatMixedExitPercent(stage?.targetPct);
    if (!target) return;
    const quantity = formatMixedExitQuantityLabel(stage?.quantityPct);
    steps.push({
      label: `${index + 1}차 익절`,
      condition: `${target} 도달 시`,
      quantity,
      targetYield: target,
      targetPrice: formatTradePlanActionGuidePrice(basePrice, stage?.targetPct),
      recommended: index === 0
    });
  });

  const stopText = Number.isFinite(Number(policy.stopPct))
    ? `종가 ${formatMixedExitPercent(policy.stopPct)} 이탈 시 전량 정리`
    : simplifyMixedExitClause(policy.stopCondition);
  if (stopText) {
    steps.push({
      label: '마감',
      condition: stopText,
      quantity: '전량 정리',
      targetYield: formatMixedExitPercent(policy.stopPct) || '-',
      targetPrice: formatTradePlanActionGuidePrice(basePrice, policy.stopPct)
    });
  }
  return steps.filter(step => step && step.label);
}

function renderTradePlanActionGuideRowsHtml(entry) {
  const summary = buildMixedExitPolicySummary(entry?.mixedExitPolicy);
  if (!summary) return '';
  const active = entry?.mixedExitPolicy?.active;
  if (!active) return '';
  const steps = buildTradePlanActionGuideItems(entry?.mixedExitPolicy, entry);
  return `
    <tr class="trade-plan-section-row">
      <td colspan="5">대응 순서</td>
    </tr>
    ${steps.map(step => `
      <tr class="trade-plan-merged-row">
        <td>${escapeHtml(step.label)}${step.recommended ? TRADE_PLAN_REC_BADGE_HTML : ''}</td>
        <td>${escapeHtml(step.condition || '-')}</td>
        <td>${escapeHtml(step.quantity || '-')}</td>
        <td>${escapeHtml(step.targetYield || '-')}</td>
        <td>${escapeHtml(step.targetPrice || '-')}</td>
      </tr>
    `).join('')}
  `;
}

function renderTradePlanSectionRowHtml(label) {
  const text = String(label || '').trim();
  if (!text) return '';
  return `
    <tr class="trade-plan-section-row trade-plan-section-row-muted">
      <td colspan="5">${escapeHtml(text)}</td>
    </tr>
  `;
}

function renderTradePlanObserveFooterRowHtml(entry) {
  const policy = entry?.mixedExitPolicy;
  if (!policy || typeof policy !== 'object' || policy.active) return '';
  const label = String(policy.label || '관찰 전용').trim() || '관찰 전용';
  const reason = String(policy.reason || '자동 진입 제외').trim() || '자동 진입 제외';
  return `
    <tr class="trade-plan-observe-row">
      <td colspan="5">${escapeHtml(`${label} · ${reason}`)}</td>
    </tr>
  `;
}

function getMixedExitStopTimingText(source) {
  const policy = source?.mixedExitPolicy || source?.stock?.mixedExitPolicy || null;
  return String(policy?.stopTiming || '').trim();
}

function getCompactSellPlanItems(items) {
  if (!Array.isArray(items) || !items.length) return [];
  const stopLossIndex = items.findIndex(item => String(item?.title || '').includes('손절'));
  if (stopLossIndex < 0 || items.length <= 3) {
    return items.slice(0, 3);
  }

  const stopLossItem = items[stopLossIndex];
  const nonStopItems = items.filter(item => item !== stopLossItem);
  if (stopLossIndex === 0) {
    return [stopLossItem, ...nonStopItems.slice(0, 2)];
  }
  return [...nonStopItems.slice(0, 2), stopLossItem];
}

function getBuyAccumulationSponsorLabel(mode) {
  if (mode === 'foreign') return '외국인';
  if (mode === 'institution') return '기관';
  if (mode === 'both') return '기관+외국인';
  return '';
}

function getBuyAnalysisSessionLabel(entry) {
  const explicitLabel = String(entry?.analysisSessionLabel || '').trim();
  if (explicitLabel) return explicitLabel;
  const session = String(entry?.analysisSession || '').trim();
  if (session === '1500') return '3시 분석';
  if (session === '1730') return '5시반 분석';
  return '';
}

function renderBuyAnalysisSessionTag(entry) {
  const label = getBuyAnalysisSessionLabel(entry);
  if (!label) return '';
  return `<span class="buy-tag analysis-session">${escapeHtml(label)}</span>`;
}

function renderBuyAccumulationSponsorTag(entry) {
  if (entry?.strategy !== 'accumulation') return '';
  const trendMode = String(entry?.accumulationTrend?.sponsor || '').trim();
  const stopMode = String(entry?.accumulationStopPolicy?.sponsorMode || '').trim();
  const label = getBuyAccumulationSponsorLabel(trendMode && trendMode !== 'none' ? trendMode : stopMode);
  if (!label) return '';
  return `<span class="buy-tag accumulation-sponsor">매집 주체 ${escapeHtml(label)}</span>`;
}

function updateBuyBreakoutVisibilityUI() {
  const breakoutVisible = typeof isJonggaBuyBreakoutVisible === 'function'
    ? isJonggaBuyBreakoutVisible()
    : false;
  const hiddenPanel = document.getElementById('buy-breakout-hidden-panel');
  const breakoutPanel = document.getElementById('buy-breakout-panel');
  const showButton = document.getElementById('btn-show-buy-breakout');
  const hideButton = document.getElementById('btn-hide-buy-breakout');

  if (hiddenPanel) hiddenPanel.hidden = breakoutVisible;
  if (breakoutPanel) breakoutPanel.hidden = !breakoutVisible;
  if (showButton) {
    showButton.setAttribute('aria-expanded', breakoutVisible ? 'true' : 'false');
    if (!showButton.dataset.bound) {
      showButton.dataset.bound = 'true';
      showButton.addEventListener('click', () => {
        if (typeof setJonggaBuyBreakoutVisible === 'function') {
          setJonggaBuyBreakoutVisible(true);
        }
        renderAll();
      });
    }
  }
  if (hideButton) {
    hideButton.setAttribute('aria-expanded', breakoutVisible ? 'true' : 'false');
    if (!hideButton.dataset.bound) {
      hideButton.dataset.bound = 'true';
      hideButton.addEventListener('click', () => {
        if (typeof setJonggaBuyBreakoutVisible === 'function') {
          setJonggaBuyBreakoutVisible(false);
        }
        renderAll();
      });
    }
  }
}

function renderBuyStockCards() {
  const replayViewMode = typeof getJonggaReplayViewMode === 'function'
    ? getJonggaReplayViewMode()
    : 'recommendation';
  const breakoutVisible = typeof isJonggaBuyBreakoutVisible === 'function'
    ? isJonggaBuyBreakoutVisible()
    : false;
  const breakoutEntries = breakoutVisible
    ? (notionSnapshot.breakoutEntries || notionSnapshot.momentumEntries || [])
    : [];
  const filterEntries = entries => (
    typeof filterJonggaReplayViewEntries === 'function'
      ? filterJonggaReplayViewEntries(entries, replayViewMode)
      : (Array.isArray(entries) ? entries : [])
  );
  const emptyMessage = replayViewMode === 'all'
    ? '전체 후보가 없습니다.'
    : `${typeof getJonggaReplayViewMeta === 'function' ? getJonggaReplayViewMeta(replayViewMode).label : '매수추천'} 조건을 만족하는 종목이 없습니다.`;

  if (typeof updateJonggaReplayViewControls === 'function') {
    updateJonggaReplayViewControls(getActiveBuySnapshot());
  }
  const marketCapRankMap = buildMarketCapRankMap([
    ...(filterEntries(notionSnapshot.pullbackEntries || [])),
    ...(filterEntries(notionSnapshot.accumulationEntries || [])),
    ...(filterEntries(breakoutEntries)),
    ...(filterEntries(notionSnapshot.reversalEntries || []))
  ]);

  const renderGroup = (entries, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const visibleEntries = filterEntries(entries);
    if (!visibleEntries.length) {
      container.innerHTML = `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
      return;
    }

    visibleEntries.forEach(entry => {
      const gateSummary = summarizeGateStatus(entry);
      const presentation = getBuyPresentation(entry);
      const verdictClass = presentation.verdictClass;
      const rationale = entry.keyPoint || entry.rationale || entry.notes[0] || '세부 판단은 상세 보기에서 확인하세요.';
      const planHtml = buildSellCardPlanSummary(entry.entryKey || entry.code);
      const scoreBox = typeof buildBuyScoreDisplayHtml === 'function'
        ? buildBuyScoreDisplayHtml(entry, presentation)
        : { signalText: getBuyDisplayScore(entry, presentation.primaryScore), strictLine: '', badgeHtml: '' };
      const liveMetaHtml = presentation.liveRefresh
        ? `<div class="buy-live-meta">${buildBuyLivePillsHtml(entry, presentation, { includeStrategyStatus: false, includeTargetPrice: true, includeAsOf: true })}</div>`
        : '';
      const volatilityTopBadgesHtml = renderVolatilityTopBadges(entry);
      const pullbackInsightHtml = renderPullbackCardInsights(entry);
      const volatilityInsightHtml = renderVolatilityCardInsights(entry);
      const statusReasonHtml = presentation.primaryStatusReasonShort
        ? `<div class="buy-card-status-reason">${escapeHtml(presentation.primaryStatusReasonShort)}</div>`
        : '';

      // setupQuality 배지: market_hold는 노란색 "시장 보류", setup_weak는 회색 "셋업 미흡"
      const sq = entry.setupQuality;
      const setupBadgeHtml = !entry.entryEligible && sq === 'market_hold'
        ? '<span class="buy-setup-badge market-hold">📌 셋업 양호 · 시장 보류</span>'
        : !entry.entryEligible && sq === 'setup_weak'
          ? '<span class="buy-setup-badge setup-weak">셋업 미흡</span>'
          : '';

      container.innerHTML += `
        <div class="buy-card ${verdictClass}" data-entry-key="${escapeHtml(entry.entryKey)}">
          <div class="buy-card-head">
            <div>
              <div class="buy-card-rank">${entry.rank}위 · ${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</div>
              <div class="buy-card-name">${buildStockNameLinksHtml(entry.name, entry.code, entry.stockExchangeName)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}${getTradingValueRankBadgeHtml(entry)}${renderMarketCapInlineHtml(entry, marketCapRankMap)}</div>
            </div>
            <div class="buy-card-scorebox">
              <div class="buy-score ${presentation.changed.score ? 'buy-changed' : ''}">
                ${escapeHtml(scoreBox.signalText)}${scoreBox.badgeHtml || ''}
                ${scoreBox.strictLine || ''}
              </div>
              <div class="buy-grade ${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.primaryGrade)}</div>
              <div class="buy-score-caption ${presentation.changed.adjustment ? 'buy-changed' : ''}">${escapeHtml(presentation.primarySummary)}</div>
            </div>
          </div>
          ${volatilityTopBadgesHtml}
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.primaryStatusLabel)}</div>
          ${statusReasonHtml}
          ${setupBadgeHtml}
          ${pullbackInsightHtml}
          ${volatilityInsightHtml}
          <div class="buy-card-tags">
            ${renderBuyAnalysisSessionTag(entry)}
            ${renderBuyAccumulationSponsorTag(entry)}
            <span class="buy-tag strategy">전략 판정 ${escapeHtml(presentation.strategyStatusLabel)}</span>
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          ${planHtml}
          ${liveMetaHtml}
          <div class="buy-card-footer">
            ${renderBuyPriceWithDailyChange(entry)}
            <span>R/R ${escapeHtml(entry.rr || '미기재')}</span>
          </div>
        </div>
      `;
    });

    container.querySelectorAll('.buy-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.entryKey, 'buy'));
    });
  };

  renderGroup(notionSnapshot.pullbackEntries, 'buy-list-pullback');
  renderGroup(notionSnapshot.accumulationEntries || [], 'buy-list-accumulation');
  if (breakoutVisible) {
    renderGroup(breakoutEntries, 'buy-list-breakout');
  } else {
    const breakoutContainer = document.getElementById('buy-list-breakout');
    if (breakoutContainer) breakoutContainer.innerHTML = '';
  }
  renderGroup(notionSnapshot.reversalEntries, 'buy-list-reversal');
  updateBuyBreakoutVisibilityUI();
}

function renderAll() {
  if (typeof syncSlotSwitchers === 'function') {
    syncSlotSwitchers();
  }
  renderRegimeSummary();
  updateRegimeHeader();
  renderGuideTables();
  renderBuyStockCards();
  renderBuyMarketHoldBanner();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateTabUI();
}

function updateAnalyzeButtonState() {
  const analyzeBtn = document.getElementById('btn-analyze');
  const hasBuyEntries = notionSnapshot.pullbackEntries.length > 0
    || (notionSnapshot.breakoutEntries || notionSnapshot.momentumEntries).length > 0
    || (notionSnapshot.accumulationEntries || []).length > 0
    || notionSnapshot.reversalEntries.length > 0;
  const hasSellStocks = stocks.pullback.length > 0 || stocks.breakout.length > 0
    || stocks.accumulation.length > 0 || stocks.reversal.length > 0 || stocks.swing.length > 0;
  analyzeBtn.disabled = isAnalysisRunning || (activeTab === 'buy' ? !hasBuyEntries : !hasSellStocks);
}

function syncScheduledAnalyzerTab(now = new Date(), { force = false } = {}) {
  // 로컬스토리지에 저장된 활성 탭이 있다면 자동 시각 동기화를 우회합니다.
  if (typeof readStoredActiveTab === 'function' && readStoredActiveTab()) {
    return;
  }
  const period = getDefaultAnalyzerTab(now);
  if (!force && lastScheduledAnalyzerPeriod === period) return;
  lastScheduledAnalyzerPeriod = period;
  if (activeTab !== period) {
    setActiveTab(period);
  }
}

function updateCurrentTime() {
  const now = new Date();
  syncScheduledAnalyzerTab(now);
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore = totalMins < (9 * 60 + 8);
  const label = isBefore ? '[1차 분석] 9:08 이전 (돌파형 시초가 점검)' : '[2차 분석] 9:08 이후 (전체 매도/손절 분석)';
  const scheduleHint = getAnalyzerTabScheduleHint(now);
  const el = document.getElementById('current-time-display');
  if (el) {
    el.innerHTML = activeTab === 'sell'
      ? `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; ${scheduleHint} &nbsp;|&nbsp; 적용 로직: <strong style="color:${isBefore ? 'var(--text-warning)' : 'var(--text-success)'}">${label}</strong>`
      : `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; ${scheduleHint} &nbsp;|&nbsp; 매수 탭에서는 상단 분석 시작 버튼으로 네이버 컨센서스를 일괄 최신화할 수 있습니다.`;
  }

  const analyzeBtn = document.getElementById('btn-analyze');
  if (!analyzeBtn) return;
  if (isAnalysisRunning) return;

  const activeArchive = getActiveArchiveForTab(activeTab, now);
  const archiveTimeLabel = formatArchiveButtonTime(activeArchive);
  const archiveSuffix = archiveTimeLabel ? ` · ${archiveTimeLabel} 분석` : '';

  if (activeTab === 'buy') {
    const hasBuyRefresh = getAllBuyEntries().some(entry => entry.liveRefresh);
    analyzeBtn.innerHTML = `<span>⚡</span> ${hasBuyRefresh ? '일괄 다시 분석' : '일괄 분석'}${archiveSuffix}`;
    return;
  }

  const hasSellResult = [...stocks.pullback, ...stocks.accumulation, ...stocks.breakout, ...stocks.swing]
    .some(stock => stockDetailMap[stock.code]?.mode === 'sell');
  analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${hasSellResult ? '다시 분석' : '분석 시작'}${archiveSuffix}`;
}
function setActiveTab(tab) {
  activeTab = tab;
  if (typeof persistActiveTab === 'function') {
    persistActiveTab(tab);
  }
  updateTabUI();
  updateAnalyzeButtonState();
  updateCurrentTime();
}

function updateTabUI() {
  document.querySelectorAll('.tab-button[data-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.tabPanel === activeTab);
  });

  const buyGuideButton = document.getElementById('btn-buy-guide');
  if (buyGuideButton) {
    buyGuideButton.classList.toggle('is-hidden', activeTab !== 'buy');
  }
}

function openGuideModal() {
  document.getElementById('guide-modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeGuideModal() {
  document.getElementById('guide-modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function openGapGuideModal() {
  const body = document.getElementById('gap-guide-body');
  const activeGapScore = getActiveGapScore();
  const currentGrade = getGapGradeCode(activeGapScore.grade);
  body.innerHTML = `
    <div class="guide-grid guide-grid-modal">
      <div class="guide-panel">
        <div class="guide-title">갭 등급 기준</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>합산 점수</th><th>갭 방향 예측</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapGrades.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(`${row.color} ${row.grade} (${row.label})`)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.outlook)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="guide-panel">
        <div class="guide-title">진입 조정</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>추세 추종</th><th>역추세</th><th>비고</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapEntryAdjustments.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.trend)}</td><td>${escapeHtml(row.reversal)}</td><td>${escapeHtml(row.note)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="guide-panel">
        <div class="guide-title">익일 매도 조정</div>
        <table class="guide-table">
          <thead><tr><th>등급</th><th>프리마켓 익절</th><th>손절 조정</th><th>스윙 전환</th></tr></thead>
          <tbody>
            ${RULE_GUIDE.gapSellAdjustments.map(row => `<tr class="${row.grade === currentGrade ? 'guide-active-row' : ''}"><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.premarket)}</td><td>${escapeHtml(row.stopLoss)}</td><td>${escapeHtml(row.swing)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="gap-guide-note">현재 분석 기준의 갭 등급은 <strong>${escapeHtml(activeGapScore.grade || '미확인')}</strong> 입니다. 갭 등급은 종목 선정 기준을 완화하지 않고, 포지션 크기와 익일 매도 기준만 조정합니다.</div>
  `;

  document.getElementById('gap-guide-modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeGapGuideModal() {
  document.getElementById('gap-guide-modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function detectCurrentRegime() {
  const table = notionSnapshot.regimeTable;
  if (!table.length && !notionSnapshot.effectiveRegimeLabel) return null;
  const getValue = key => (table.find(row => row.item === key) || {}).value || '';
  const regime = String(
    notionSnapshot.effectiveRegimeLabel
    || getValue('적용 레짐')
    || getValue('레짐')
    || getValue('기술 레짐')
    || ''
  ).trim();
  if (!regime && !table.length) return null;
  return {
    regime,
    technicalRegime: String(notionSnapshot.technicalRegimeLabel || getValue('기술 레짐') || getValue('레짐') || '').trim(),
    kospi: getValue('KOSPI'),
    vkospi: getValue('VKOSPI'),
    ma60: getValue('60일선') || getValue('KOSPI 60MA'),
    ma20: getValue('20일선') || getValue('KOSPI 20MA'),
    swing: getValue('스윙 전환') || getValue('스윙 전환 활성도'),
    openBet: getValue('시가베팅'),
    note: getValue('특이 사항') || notionSnapshot.regimeAdjustmentReason || '',
    correction: getValue('최종 보정')
  };
}

function getRegimeReportSummaryRows() {
  return notionSnapshot.regimeTable.filter(row => row.item && row.value && !('verdict' in row));
}

function sanitizeUiText(value) {
  if (typeof sanitizeText === 'function') return sanitizeText(value);
  return String(value || '').trim();
}

function getVerdictTone(value) {
  const text = sanitizeUiText(value);
  if (!text) return 'unknown';
  if (/[✅🟢]|확정|우호|허용|활성/.test(text)) return 'clear';
  if (/[❌🔴⛔]|약세|금지|비활성|경고/.test(text)) return 'triggered';
  return 'unknown';
}

function getRegimeBadgeMeta(regimeValue) {
  const regime = sanitizeUiText(regimeValue);
  if (!regime) return { label: '미확인', tone: 'unknown' };
  if (regime.includes('강세장')) return { label: '강세장', tone: 'bull' };
  if (regime.includes('순환매장')) return { label: '순환매장', tone: 'rotation' };
  if (regime.includes('박스권')) return { label: '박스권', tone: 'range' };
  if (regime.includes('약세장')) return { label: '약세장', tone: 'bear' };
  return { label: regime, tone: 'unknown' };
}

function parseRegimeVkospiValue(value) {
  if (value === null || value === undefined || value === '') return null;
  const text = String(value);
  const match = text.match(/([\d.]+)(?!.*[\d.])/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function getMarketVolatilityBadgeMeta(info = null) {
  const regime = sanitizeUiText(info?.regime || '');
  const vkospi = parseRegimeVkospiValue(info?.vkospi);
  if (!regime && !Number.isFinite(vkospi)) {
    return { label: '변동성 미확인', tone: 'unknown' };
  }
  if (regime.includes('강세장') && Number.isFinite(vkospi) && vkospi < 18.5) {
    return { label: '저변동성 장세', tone: 'calm' };
  }
  if ((Number.isFinite(vkospi) && vkospi >= 25) || regime.includes('박스권') || regime.includes('약세장')) {
    return { label: '고변동성 장세', tone: 'volatile' };
  }
  return { label: '중립 변동성', tone: 'neutral' };
}

function updateRegimeHeader() {
  const toggleButton = document.getElementById('btn-regime-toggle');
  const summary = document.getElementById('buy-regime-summary');
  const badge = document.getElementById('regime-current-badge');
  const volatilityBadge = document.getElementById('regime-volatility-badge');
  const info = detectCurrentRegime();
  const meta = getRegimeBadgeMeta(info?.regime || '');
  const volatilityMeta = getMarketVolatilityBadgeMeta(info);

  if (toggleButton) {
    toggleButton.textContent = isRegimeSummaryCollapsed ? '+' : '-';
    toggleButton.setAttribute('aria-expanded', String(!isRegimeSummaryCollapsed));
    toggleButton.setAttribute('title', isRegimeSummaryCollapsed ? '시장 레짐 펼치기' : '시장 레짐 접기');
  }

  if (summary) {
    summary.classList.toggle('is-collapsed', isRegimeSummaryCollapsed);
  }

  if (badge) {
    badge.textContent = meta.label;
    badge.className = `regime-current-badge ${meta.tone}`;
  }

  if (volatilityBadge) {
    volatilityBadge.textContent = volatilityMeta.label;
    volatilityBadge.className = `regime-volatility-badge ${volatilityMeta.tone}`;
  }
}

function toggleRegimeSummary() {
  isRegimeSummaryCollapsed = !isRegimeSummaryCollapsed;
  updateRegimeHeader();
}
function openRegimeReport() {
  const info = detectCurrentRegime();
  const body = document.getElementById('regime-report-body');
  const summaryRows = getRegimeReportSummaryRows();
  const evidenceRows = notionSnapshot.regimeEvidence;
  const gapScore = getActiveGapScore();
  const comparisonText = getGapComparisonText();

  syncBodyScrollLock();
  if (!info) {
    body.innerHTML = '<div class="empty-state">전략 JSON에서 시장 레짐 데이터를 불러온 뒤 다시 시도하세요.</div>';
    document.getElementById('regime-report-overlay').classList.add('open');
    return;
  }

  const regimeChecks = RULE_GUIDE.regimes.map(r => {
    const isMatch = info.regime && info.regime.includes(r.state.replace(/\s*[✅🔄⚠️⛔]/g, '').trim());
    return { ...r, isMatch };
  });

  body.innerHTML = `
    <div class="regime-report-section">
      <div class="modal-section-label">현재 레짐 판정</div>
      <div class="modal-verdict hold" style="font-size:16px;margin-bottom:16px">${escapeHtml(info.regime || '미확인')}</div>

      ${summaryRows.length ? `
        <div class="modal-section-label">레짐 요약 항목</div>
        <table class="guide-table" style="margin-bottom:16px">
          <tbody>
            ${summaryRows.map(row => `<tr><td style="width:140px;color:var(--text-tertiary)">${escapeHtml(row.item)}</td><td><strong>${escapeHtml(row.value)}</strong></td></tr>`).join('')}
          </tbody>
        </table>
      ` : ''}

      ${evidenceRows.length ? `
        <div class="modal-section-label">실제 판정 근거</div>
        <table class="guide-table" style="margin-bottom:16px">
          <thead><tr><th>지표</th><th>확인값</th><th>판정</th></tr></thead>
          <tbody>
            ${evidenceRows.map(row => `<tr><td>${escapeHtml(row.item)}</td><td>${escapeHtml(row.value)}</td><td><span class="report-verdict ${getVerdictTone(row.verdict)}">${escapeHtml(row.verdict || '—')}</span></td></tr>`).join('')}
          </tbody>
        </table>
      ` : ''}

      ${gapScore.rows.length ? `
        <div class="modal-section-label">갭 예측 스코어 근거</div>
        <table class="guide-table compact-table" style="margin-bottom:12px">
          <thead><tr><th>지표</th><th>실측값</th><th>기본 점수</th><th>중요도</th><th>계산식</th><th>반영 점수</th></tr></thead>
          <tbody>
            ${gapScore.rows.map(row => `<tr><td>${escapeHtml(row.indicator)}</td><td>${escapeHtml(row.actualValue)}</td><td>${escapeHtml(row.baseScore)}</td><td>${escapeHtml(row.weight)}</td><td>${escapeHtml(row.formula || `${row.baseScore} ${row.weight}`.trim())}</td><td><strong>${escapeHtml(row.weightedScore)}</strong></td></tr>`).join('')}
            ${gapScore.totalScore ? `<tr><td colspan="5">반영 점수 합계</td><td><strong>${escapeHtml(gapScore.totalScore)}</strong></td></tr>` : ''}
          </tbody>
        </table>
        <table class="guide-table" style="margin-bottom:16px">
          <tbody>
            ${gapScore.grade ? `<tr><td style="width:140px;color:var(--text-tertiary)">갭 등급</td><td><strong>${escapeHtml(gapScore.grade)}</strong></td></tr>` : ''}
            ${gapScore.entryAdjustment ? `<tr><td style="color:var(--text-tertiary)">진입 조정</td><td><strong>${escapeHtml(gapScore.entryAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.sellAdjustment ? `<tr><td style="color:var(--text-tertiary)">매도 조정</td><td><strong>${escapeHtml(gapScore.sellAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.swingAdjustment ? `<tr><td style="color:var(--text-tertiary)">스윙 전환</td><td><strong>${escapeHtml(gapScore.swingAdjustment)}</strong></td></tr>` : ''}
            ${gapScore.note ? `<tr><td style="color:var(--text-tertiary)">특이사항</td><td><strong>${escapeHtml(gapScore.note)}</strong></td></tr>` : ''}
            ${isLiveGapReady() ? `<tr><td style="color:var(--text-tertiary)">실시간 소스</td><td><strong>${escapeHtml(liveGapState.source)} / ${escapeHtml(liveGapState.fetchedAt)}</strong></td></tr>` : ''}
            ${comparisonText ? `<tr><td style="color:var(--text-tertiary)">스냅샷 비교</td><td><strong>${escapeHtml(comparisonText)}</strong></td></tr>` : ''}
          </tbody>
        </table>
      ` : ''}

      <div class="modal-section-label">레짐 판정 순서 (위→아래 순차, 첫 일치 확정)</div>
      <div class="modal-ind-list">
        ${regimeChecks.map(r => `
          <div class="modal-ind-card ${r.isMatch ? 'clear' : 'unknown'}">
            <div class="modal-ind-icon">${r.isMatch ? '✅' : '➖'}</div>
            <div class="modal-ind-content">
              <div class="modal-ind-title">${escapeHtml(r.state)}</div>
              <div class="modal-ind-criterion">${escapeHtml(r.condition)}</div>
              <div class="modal-ind-result">→ ${r.isMatch ? '현재 레짐 확정' : '조건 미충족'}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="modal-section-label" style="margin-top:18px">전략 우선순위</div>
      <table class="guide-table">
        <thead><tr><th>레짐</th><th>눌림목</th><th>매집형</th><th>돌파형</th></tr></thead>
        <tbody>
          ${regimeChecks.map(r => `<tr style="${r.isMatch ? 'background:rgba(16,185,129,0.08)' : ''}"><td>${escapeHtml(r.state)}</td><td>${escapeHtml(r.pullback)}</td><td>${escapeHtml(r.accumulation)}</td><td>${escapeHtml(r.breakout)}</td></tr>`).join('')}
        </tbody>
      </table>

      ${info.swing || info.openBet ? `
        <div class="modal-section-label" style="margin-top:18px">운용 상태</div>
        <table class="guide-table">
          <tbody>
            ${info.swing ? `<tr><td style="width:100px;color:var(--text-tertiary)">스윙 전환</td><td><strong>${escapeHtml(info.swing)}</strong></td></tr>` : ''}
            ${info.openBet ? `<tr><td style="color:var(--text-tertiary)">시가베팅</td><td><strong>${escapeHtml(info.openBet)}</strong></td></tr>` : ''}
          </tbody>
        </table>
      ` : ''}

      ${info.note ? `<div class="regime-alert" style="margin-top:16px">${escapeHtml(info.note)}</div>` : ''}
    </div>
  `;

  document.getElementById('regime-report-overlay').classList.add('open');
}

function closeRegimeReport() {
  document.getElementById('regime-report-overlay').classList.remove('open');
}
function updateCardError(codeOrEntryKey) {
  const parsed = parseEntryKey(codeOrEntryKey, activeSellSlot);
  const card = document.getElementById(getCardDomId(parsed.entryKey));
  const indBox = document.getElementById(getIndicatorDomId(parsed.entryKey));
  const badge = document.getElementById(getBadgeDomId(parsed.entryKey));
  const shiftBadge = document.getElementById(getGapShiftDomId(parsed.entryKey));
  if (!card || !indBox || !badge) return;

  card.className = 'scard';
  badge.className = 'badge badge-pending';
  badge.innerText = '통신 오류';
  if (shiftBadge) {
    shiftBadge.className = 'badge badge-shift';
    shiftBadge.innerText = '';
    shiftBadge.title = '';
    shiftBadge.style.display = 'none';
  }
  indBox.innerHTML = '<div class="ind-item unknown">네이버 증권 데이터를 가져오는 데 실패했습니다.<br>잠시 후 다시 시도해주세요.</div>';
}

function renderStrategyRuleCard(rule, entry, kind, matched) {
  const guide = getStrategyRuleGuide(entry.strategy, kind, rule.code);
  const presentation = getRuleEvalPresentation(rule, { matched, kind });
  const statusClass = matched || rule.status === '✅' ? 'clear' : 'triggered';
  const evalClass = ruleEvalStatusClass(presentation.evalStatus);
  const icon = matched || rule.status === '✅' ? '✅' : presentation.evalStatus === 'data_missing' || presentation.evalStatus === 'manual_required' ? '📭' : rule.status === '⚠️' ? '⚠️' : '⚠️';
  const titleSuffix = kind === 'score'
    ? (matched ? '일치' : '불일치')
    : (rule.status === '✅' ? '통과' : rule.status === '⚠️' ? '경계' : '제외');
  return `
    <div class="modal-ind-card ${statusClass} ${evalClass}">
      <div class="modal-ind-icon">${icon}</div>
      <div class="modal-ind-content">
        <div class="modal-ind-title">${escapeHtml(rule.code)} ${titleSuffix}</div>
        <div class="modal-ind-eval-badge eval-${presentation.evalStatus}">${escapeHtml(presentation.typeLabel)}</div>
        <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
        <div class="modal-ind-result">→ ${escapeHtml(presentation.resultText)}</div>
        ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
      </div>
    </div>
  `;
}

function renderRuleMatchList(entry) {
  return [
    ...entry.matchedRules.map(rule => renderStrategyRuleCard(rule, entry, 'score', true)),
    ...entry.unmatchedRules.map(rule => renderStrategyRuleCard(rule, entry, 'score', false))
  ].join('');
}

function renderGateList(entry) {
  return (entry.gates || []).map(gate => renderStrategyRuleCard(gate, entry, 'gate', gate.status === '✅')).join('');
}

function renderFilterList(entry) {
  return (entry.filters || []).map(filter => renderStrategyRuleCard(filter, entry, 'filter', filter.status === '✅')).join('');
}

function renderTradePlanRecommendation(entry) {
  const band = entry.recommendedEntryBand;
  const stage = entry.recommendedStage;
  const profile = entry.recommendedTakeProfitProfile;
  if (!band && !stage && !profile) return '';
  const bandText = band && band.label ? `💰 추천 진입가 ${escapeHtml(band.label)}` : '';
  const profileReason = profile && profile.reasonSummary ? ` · ${escapeHtml(profile.reasonSummary)}` : '';
  const profileText = profile && profile.profileKey
    ? `🧭 추천 프로필: <strong>${escapeHtml(profile.label || profile.profileKey)}</strong>${profileReason}`
    : '';
  let stageText = '';
  if (hasEntryTakeProfitProfiles(entry)) {
    const recommendedProfile = getRecommendedTakeProfitProfileEntry(entry);
    const recommendedTargetRow = getTradePlanRepresentativeTargetRow(recommendedProfile || entry);
    const recommendedTargetIndex = getTradePlanRecommendedTargetIndex(recommendedProfile || entry);
    if (recommendedTargetRow && recommendedTargetRow.targetPrice) {
      const targetLabel = recommendedTargetIndex === 0
        ? '1차 익절'
        : recommendedTargetIndex === 1
          ? '2차 익절'
          : '추천 익절';
      const reason = recommendedTargetRow.condition ? ` · ${escapeHtml(recommendedTargetRow.condition)}` : '';
      stageText = `🎯 ${targetLabel}: <strong>${escapeHtml(recommendedTargetRow.targetPrice)}</strong>${reason}`;
    }
  } else if (stage && stage.stageKey) {
    const meta = (typeof getSellStrategyStageMeta === 'function')
      ? getSellStrategyStageMeta(stage.stageKey)
      : { icon: '🎯', title: stage.stageKey };
    const reason = stage.reason ? ` · ${escapeHtml(stage.reason)}` : '';
    stageText = `🎯 현재 추천 단계: <strong>${escapeHtml(meta.icon + ' ' + meta.title)}</strong>${reason}`;
  }
  const lines = [bandText, profileText, stageText].filter(Boolean).map(line => `<div>${line}</div>`).join('');
  if (!lines) return '';
  return `<div class="modal-ind-card clear" style="margin-bottom:8px;">${lines}</div>`;
}

function getEntryTakeProfitProfiles(entry) {
  if (!entry || typeof entry !== 'object') return [];
  if (entry.strategy === 'pullback' && Array.isArray(entry.pullbackTakeProfitProfiles)) {
    return entry.pullbackTakeProfitProfiles;
  }
  if ((entry.strategy === 'breakout' || entry.strategy === 'momentum') && Array.isArray(entry.breakoutTakeProfitProfiles)) {
    return entry.breakoutTakeProfitProfiles;
  }
  if (entry.strategy === 'accumulation' && Array.isArray(entry.accumulationTakeProfitProfiles)) {
    return entry.accumulationTakeProfitProfiles;
  }
  if (entry.strategy === 'reversal' && Array.isArray(entry.reversalTakeProfitProfiles)) {
    return entry.reversalTakeProfitProfiles;
  }
  return [];
}

function hasEntryTakeProfitProfiles(entry) {
  return getEntryTakeProfitProfiles(entry).length > 0;
}

function getTradePlanDisplayValue(value) {
  return value === null || value === undefined || value === '' ? '-' : String(value);
}

function getTradePlanStopRow(rows) {
  return (Array.isArray(rows) ? rows : []).find(row => {
    const stage = String(row?.stage || '');
    const stageKey = String(row?.stageKey || '');
    return stage.includes('손절') || stageKey === 'stop';
  }) || null;
}

function getTradePlanTargetRows(rows) {
  return (Array.isArray(rows) ? rows : []).filter(row => {
    const stage = String(row?.stage || '');
    const stageKey = String(row?.stageKey || '');
    return row && !stage.includes('손절') && stageKey !== 'stop';
  });
}

function getTradePlanRepresentativeTargetRow(source) {
  const rows = getTradePlanTargetRows(source?.tradePlanRows);
  if (!rows.length) return null;
  const recommendedKey = String(source?.recommendedStage?.stageKey || '');
  if (recommendedKey) {
    const recommendedRow = rows.find(row => String(row?.stageKey || '') === recommendedKey);
    if (recommendedRow) return recommendedRow;
  }
  return rows[0];
}

function getTradePlanRecommendedTargetIndex(source) {
  const rows = getTradePlanTargetRows(source?.tradePlanRows);
  if (!rows.length) return -1;
  const recommendedKey = String(source?.recommendedStage?.stageKey || '');
  if (!recommendedKey) return 0;
  return rows.findIndex(row => String(row?.stageKey || '') === recommendedKey);
}

function getTradePlanTargetRowByIndex(source, index) {
  const rows = getTradePlanTargetRows(source?.tradePlanRows);
  return rows[index] || null;
}

function getTradePlanStageTagTone(row) {
  const stage = String(row?.stage || '');
  const stageKey = String(row?.stageKey || '');
  if (stage.includes('손절') || stageKey === 'stop') return 'stop';
  if (stage.includes('스윙') || stageKey === 'swing') return 'swing';
  return 'target';
}

function getTradePlanStageTagLabel(row, index = 0) {
  const stage = String(row?.stage || '');
  const stageKey = String(row?.stageKey || '').trim();
  if (stageKey === 'premarket' || stage.includes('프리마켓') || stage.includes('🌅')) return '🌅';
  if (stageKey === 'openPhase' || stage.includes('장초반') || stage.includes('🔔')) return '🔔';
  if (stageKey === 'intraday1' || stage.includes('장중 1차')) return '📈1';
  if (stageKey === 'intraday2' || stage.includes('장중 2차')) return '📈2';
  if (stageKey === 'swing' || stage.includes('스윙') || stage.includes('📊')) return '📊';
  if (stageKey === 'stop' || stage.includes('손절') || stage.includes('🛑')) return '🛑';
  if (stage.includes('1차')) return '1차';
  if (stage.includes('2차')) return '2차';
  if (stage.includes('3차')) return '3차';
  return `${index + 1}차`;
}

function formatTradePlanStageTagText(row, index = 0) {
  if (!row) return '';
  const label = getTradePlanStageTagLabel(row, index);
  const quantity = String(row?.quantity || '').trim();
  const target = String(row?.targetPrice || row?.targetYield || row?.condition || '').trim();
  return [label, quantity, target].filter(Boolean).join(' ');
}

function buildTradePlanStageTagHtml(source, { recommendedProfile = null } = {}) {
  const rows = Array.isArray(source?.tradePlanRows) ? source.tradePlanRows : [];
  if (!rows.length) return [];
  const targetRows = getTradePlanTargetRows(rows);
  const stopRow = getTradePlanStopRow(rows);
  const tags = [];
  if (recommendedProfile) {
    tags.push(`<span class="plan-tag target">추천 ${escapeHtml(recommendedProfile.label || recommendedProfile.profileKey || '')}</span>`);
  }
  targetRows.forEach((row, index) => {
    const text = formatTradePlanStageTagText(row, index);
    if (!text) return;
    tags.push(`<span class="plan-tag ${getTradePlanStageTagTone(row)}">${escapeHtml(text)}</span>`);
  });
  if (stopRow) {
    const stopText = formatTradePlanStageTagText(stopRow, targetRows.length);
    if (stopText) tags.push(`<span class="plan-tag stop">${escapeHtml(stopText)}</span>`);
  }
  return tags;
}

function getOrderedTakeProfitProfiles(entry) {
  const profiles = getEntryTakeProfitProfiles(entry);
  const profileMap = new Map(profiles.map(profile => [String(profile?.profileKey || ''), profile]));
  const preferredOrder = ['aggressive', 'balanced', 'conservative'];
  const ordered = preferredOrder.map(key => profileMap.get(key)).filter(Boolean);
  return ordered.length ? ordered : profiles;
}

function getRecommendedTakeProfitProfileEntry(entry) {
  const profileKey = String(entry?.recommendedTakeProfitProfile?.profileKey || '');
  if (!profileKey) {
    return getOrderedTakeProfitProfiles(entry).find(profile => profile?.recommended) || null;
  }
  return getOrderedTakeProfitProfiles(entry).find(profile => String(profile?.profileKey || '') === profileKey) || null;
}

function getTakeProfitProfileGroupSignature(profile) {
  const firstTargetRow = getTradePlanTargetRowByIndex(profile, 0);
  const secondTargetRow = getTradePlanTargetRowByIndex(profile, 1);
  const stopRow = getTradePlanStopRow(profile?.tradePlanRows);
  return JSON.stringify({
    firstTargetPrice: getTradePlanDisplayValue(firstTargetRow?.targetPrice),
    secondTargetPrice: getTradePlanDisplayValue(secondTargetRow?.targetPrice),
    stopPrice: getTradePlanDisplayValue(stopRow?.targetPrice),
  });
}

function getTakeProfitProfileGroupLabel(group) {
  const labelOrder = ['aggressive', 'balanced', 'conservative'];
  const orderedProfiles = labelOrder
    .map(key => group.profiles.find(profile => String(profile?.profileKey || '') === key))
    .filter(Boolean);
  const fallbackProfiles = group.profiles.filter(profile => !orderedProfiles.includes(profile));
  const labels = [...orderedProfiles, ...fallbackProfiles]
    .map(profile => String(profile?.label || profile?.profileKey || '-'))
    .filter(Boolean);
  if (labels.length <= 1) return labels[0] || '-';
  return `${labels.join(' ')} 통합`;
}

function getTakeProfitProfileGroupReason(group) {
  const reasons = [...new Set(group.profiles
    .map(profile => String(profile?.reasonSummary || '').trim())
    .filter(Boolean))];
  if (group.profiles.length <= 1) return reasons[0] || '-';
  if (reasons.length === 1) return reasons[0];
  return '익절/손절 가격이 같아 통합 표시합니다.';
}

function getGroupedTakeProfitProfiles(entry) {
  const groups = [];
  for (const profile of getOrderedTakeProfitProfiles(entry)) {
    const signature = getTakeProfitProfileGroupSignature(profile);
    const existing = groups.find(group => group.signature === signature);
    if (existing) {
      existing.profiles.push(profile);
      if (profile?.recommended) existing.recommended = true;
      if (profile?.recommended) existing.recommendedTargetIndex = getTradePlanRecommendedTargetIndex(profile);
      continue;
    }
    groups.push({
      signature,
      profiles: [profile],
      recommended: Boolean(profile?.recommended),
      recommendedTargetIndex: Boolean(profile?.recommended) ? getTradePlanRecommendedTargetIndex(profile) : -1,
    });
  }
  return groups;
}

function renderTradePlanProfileComparison(entry) {
  if (!hasEntryTakeProfitProfiles(entry)) return '';
  const groups = getGroupedTakeProfitProfiles(entry);
  if (!groups.length) return '';
  return `
    <table class="guide-table compact-table" style="margin-bottom:10px">
      <thead>
        <tr>
          <th>구분</th>
          ${groups.map(group => {
            const label = escapeHtml(getTakeProfitProfileGroupLabel(group));
            const badge = group.recommended ? '<span class="plan-tag target" style="margin-left:6px;">추천</span>' : '';
            const headerStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10)"' : '';
            return `<th${headerStyle}>${label}${badge}</th>`;
          }).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1차 익절가</th>
          ${groups.map(group => {
            const row = getTradePlanTargetRowByIndex(group.profiles[0], 0);
            const isRecommendedTarget = group.recommended && group.recommendedTargetIndex === 0;
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10);font-weight:700;color:var(--text-success)"' : '';
            const badge = isRecommendedTarget ? '<span class="plan-tag target" style="margin-left:6px;">추천 익절</span>' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.targetPrice))}${badge}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>1차 익절 조건</th>
          ${groups.map(group => {
            const row = getTradePlanTargetRowByIndex(group.profiles[0], 0);
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10)"' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.condition))}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>2차 익절가</th>
          ${groups.map(group => {
            const row = getTradePlanTargetRowByIndex(group.profiles[0], 1);
            const isRecommendedTarget = group.recommended && group.recommendedTargetIndex === 1;
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10);font-weight:700;color:var(--text-success)"' : '';
            const badge = isRecommendedTarget ? '<span class="plan-tag target" style="margin-left:6px;">추천 익절</span>' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.targetPrice))}${badge}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>2차 익절 조건</th>
          ${groups.map(group => {
            const row = getTradePlanTargetRowByIndex(group.profiles[0], 1);
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10)"' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.condition))}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>손절가</th>
          ${groups.map(group => {
            const row = getTradePlanStopRow(group.profiles[0]?.tradePlanRows);
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10);font-weight:700"' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.targetPrice))}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>손절 조건</th>
          ${groups.map(group => {
            const row = getTradePlanStopRow(group.profiles[0]?.tradePlanRows);
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10)"' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(row?.condition))}</td>`;
          }).join('')}
        </tr>
        <tr>
          <th>이유</th>
          ${groups.map(group => {
            const cellStyle = group.recommended ? ' style="background:rgba(16,185,129,0.10)"' : '';
            return `<td${cellStyle}>${escapeHtml(getTradePlanDisplayValue(getTakeProfitProfileGroupReason(group)))}</td>`;
          }).join('')}
        </tr>
      </tbody>
    </table>
  `;
}

function renderTradePlanStageRowsTable(source, {
  title = '',
  recommendedTargetIndex = -1,
  prependBodyHtml = '',
  stageSectionLabel = '',
  appendBodyHtml = ''
} = {}) {
  const rows = Array.isArray(source?.tradePlanRows) ? source.tradePlanRows : [];
  if (!rows.length) return '';

  const recRowStyle = 'background:rgba(16,185,129,0.16);box-shadow:inset 3px 0 0 var(--text-success)';
  const recCellStyle = 'font-weight:700';
  const recYieldStyle = 'color:var(--text-success);font-weight:700';
  const recBadge = TRADE_PLAN_REC_BADGE_HTML;
  let targetIndex = -1;

  return `
    <table class="guide-table compact-table">
      <thead><tr><th>단계</th><th>조건</th><th>수량</th><th>목표 수익률</th><th>목표가</th></tr></thead>
      <tbody>
        ${prependBodyHtml}
        ${prependBodyHtml && rows.length ? renderTradePlanSectionRowHtml(stageSectionLabel || '추천 프로필 세부 단계') : ''}
        ${rows.map(row => {
          const isTargetRow = getTradePlanStageTagTone(row) !== 'stop';
          if (isTargetRow) targetIndex += 1;
          const isRec = Boolean(row.recommended) || (isTargetRow && targetIndex === recommendedTargetIndex);
          const hitRate = (row.historicalHitRate === null || row.historicalHitRate === undefined)
            ? ''
            : ` <span style="color:var(--text-muted)">· 적중 ${Math.round(row.historicalHitRate * 100)}%</span>`;
          const isStopRow = String(row?.stageKey || '').trim() === 'stop' || getTradePlanStageTagTone(row) === 'stop';
          const stopTiming = isStopRow ? getMixedExitStopTimingText(source) : '';
          const stageCell = isRec
            ? `<td style="${recCellStyle}">${escapeHtml(row.stage)}${recBadge}</td>`
            : `<td>${escapeHtml(row.stage)}</td>`;
          const yieldCell = isRec
            ? `<td style="${recYieldStyle}">${escapeHtml(row.targetYield)}${hitRate}</td>`
            : `<td>${escapeHtml(row.targetYield)}${hitRate}</td>`;
          const priceCell = isRec
            ? `<td style="${recYieldStyle}">${escapeHtml(row.targetPrice)}</td>`
            : `<td>${escapeHtml(row.targetPrice)}</td>`;
          const conditionCell = isStopRow && stopTiming
            ? `${escapeHtml(row.condition)}<div class="plan-stop-timing">손절 시점: ${escapeHtml(stopTiming)}</div>`
            : escapeHtml(row.condition);
          return `<tr${isRec ? ` style="${recRowStyle}"` : ''}>${stageCell}<td>${conditionCell}</td><td>${escapeHtml(row.quantity)}</td>${yieldCell}${priceCell}</tr>`;
        }).join('')}
        ${appendBodyHtml}
      </tbody>
    </table>
    ${title ? `<div class="trade-plan-stage-caption">${escapeHtml(title)}</div>` : ''}
  `;
}

function renderTradePlanTable(entry, { includeActionGuide = false } = {}) {
  const actionGuideRowsHtml = includeActionGuide ? renderTradePlanActionGuideRowsHtml(entry) : '';
  const observeFooterRowHtml = includeActionGuide ? renderTradePlanObserveFooterRowHtml(entry) : '';
  if (!(Array.isArray(entry.tradePlanRows) && entry.tradePlanRows.length) && !hasEntryTakeProfitProfiles(entry)) {
    return `
      <div class="empty-state compact">매매 단계 정보가 없습니다.</div>
    `;
  }

  let tradePlanBodyHtml = '';
  if (hasEntryTakeProfitProfiles(entry)) {
    const recommendedProfile = getRecommendedTakeProfitProfileEntry(entry) || getOrderedTakeProfitProfiles(entry)[0] || null;
    const recommendedProfileLabel = String(recommendedProfile?.label || recommendedProfile?.profileKey || '').trim();
    const recommendedTitle = recommendedProfileLabel
      ? `추천 프로필 단계 · ${recommendedProfileLabel}`
      : '추천 프로필 단계';
    tradePlanBodyHtml = `
      ${renderTradePlanRecommendation(entry)}
      ${renderTradePlanProfileComparison(entry)}
      ${recommendedProfile ? renderTradePlanStageRowsTable(recommendedProfile, {
        title: recommendedTitle,
        recommendedTargetIndex: getTradePlanRecommendedTargetIndex(recommendedProfile),
        prependBodyHtml: actionGuideRowsHtml,
        stageSectionLabel: '추천 프로필 세부 단계',
        appendBodyHtml: observeFooterRowHtml
      }) : ''}
    `;
  } else {
    tradePlanBodyHtml = `
      ${renderTradePlanRecommendation(entry)}
      ${renderTradePlanProfileComparison(entry)}
      ${renderTradePlanStageRowsTable(entry, {
        prependBodyHtml: actionGuideRowsHtml,
        stageSectionLabel: '기존 매매 단계',
        appendBodyHtml: observeFooterRowHtml
      })}
    `;
  }

  return tradePlanBodyHtml;
}

function renderBuyDetailSummaryPanel(entry) {
  const rows = [];
  if (entry?.rationale) rows.push({ label: '근거', content: entry.rationale });
  if (entry?.keyPoint) rows.push({ label: '핵심', content: entry.keyPoint });
  if (entry?.strategy === 'accumulation' && entry.accumulationStopPolicy?.reasonSummary) {
    rows.push({ label: '손절', content: entry.accumulationStopPolicy.reasonSummary });
  }
  (Array.isArray(entry?.notes) ? entry.notes : []).forEach(note => {
    if (note) rows.push({ label: '메모', content: note });
  });
  if (!rows.length) return '';

  return `
    <div class="buy-detail-summary-panel">
      ${rows.map(row => `
        <div class="buy-detail-summary-row">
          <span class="buy-detail-summary-label">${escapeHtml(row.label)}</span>
          <span class="buy-detail-summary-value">${escapeHtml(row.content)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

window.handleModalRefreshBuy = async function(entryKey) {
  const btn = document.getElementById('btn-modal-refresh-buy');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '데이터 수집 중...';
  }
  await refreshBuyEntry(entryKey, { logLabel: '상세 검증' });
};

function openModal(codeOrEntryKey, mode = 'sell') {
  const parsed = parseEntryKey(codeOrEntryKey, mode === 'buy' ? activeBuySlot : activeSellSlot);
  const detail = mode === 'buy'
    ? getEntryByCode(parsed.entryKey, parsed.slotId)
    : stockDetailMap[parsed.entryKey];
  if (!detail) return;
  currentModalState = {
    key: parsed.entryKey,
    code: parsed.code,
    slotId: parsed.slotId,
    mode
  };
  const detailModal = document.getElementById('detail-modal');

  if (mode === 'buy') {
    detailModal.classList.add('buy-detail-mode');
    const entry = detail;
    const presentation = getBuyPresentation(entry);
    const verdictText = buildBuyModalVerdictText(presentation);
    const scoreBox = typeof buildBuyScoreDisplayHtml === 'function'
      ? buildBuyScoreDisplayHtml(entry, presentation)
      : { signalText: getBuyDisplayScore(entry, presentation.primaryScore), strictLine: '', badgeHtml: '' };
    const scoreDisplay = scoreBox.signalText;
    const scoreSuffix = '';
    const modalLiveMetaHtml = buildBuyLivePillsHtml(entry, presentation, {
      includeCurrentPrice: Boolean(presentation.liveRefresh),
      includeTargetPrice: Boolean(presentation.liveRefresh),
      includeAsOf: Boolean(presentation.liveRefresh)
    });
    const modalStatusReasonHtml = presentation.primaryStatusReason
      ? `<div class="buy-modal-status-reason">${escapeHtml(presentation.primaryStatusReason)}</div>`
      : '';
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = presentation.verdictClass;
    const strategyCautionHtml = renderStrategyCautionPanel(entry.strategy, {
      sectionLabel: '⚠️ 이 종목 전략 주의사항',
      title: `${STRATEGY_META[normalizeStrategyKey(entry.strategy)].shortLabel} 종목을 볼 때 먼저 확인할 점`,
      cardClass: 'triggered'
    });
    const buyDetailSummaryHtml = renderBuyDetailSummaryPanel(entry);
    document.getElementById('modal-body').innerHTML = `
      <div class="buy-modal-layout">
        <div class="buy-modal-fixed">
          <div class="modal-price-bar buy-price-bar">
            <div>
              <div class="price-big ${presentation.changed.score ? 'buy-changed' : ''}">${escapeHtml(scoreDisplay)}${scoreSuffix}</div>
              <div class="buy-modal-scoreline"><span class="${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.primarySummary)}</span></div>
              ${modalStatusReasonHtml}
            </div>
            <div class="modal-stats">
              <div class="modal-stat">
                <span class="modal-stat-label">진입가</span>
                <span class="modal-stat-value">${escapeHtml(entry.entryPriceText || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">R/R</span>
                <span class="modal-stat-value">${escapeHtml(entry.rr || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">전략</span>
                <span class="modal-stat-value">${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</span>
              </div>
            </div>
          </div>

          <div class="buy-live-meta buy-live-meta-modal">${modalLiveMetaHtml}</div>

          <div class="modal-verdict ${verdictClass === 'strong' ? 'hold' : verdictClass === 'good' ? 'caution' : verdictClass === 'watch' ? 'caution' : 'sell'}">${escapeHtml(verdictText)}</div>

          <div class="buy-modal-fixed-grid">
            <div class="buy-detail-block buy-detail-block-fixed">
              <div class="modal-section-label">요약</div>
              ${buyDetailSummaryHtml}
            </div>

            <div class="buy-trade-plan-block">
              <div class="modal-section-label">매매 단계</div>
              ${renderTradePlanTable(entry, { includeActionGuide: true })}
            </div>
          </div>

          ${strategyCautionHtml}
        </div>

        <div class="buy-modal-scroll" id="buy-modal-scroll-area">
          ${typeof renderStrategyStockIndicatorsSection === 'function' ? renderStrategyStockIndicatorsSection(entry) : ''}
          ${buildBuyVerificationHtml(entry)}

          <div>
            <div class="modal-stage-badge stage2">🧭 전략 데이터 기준 매수 판단</div>
            ${entry.filters?.length ? renderModalCollapsibleSection(
              'buy-section-filter',
              '필터 (F) 일치 여부',
              `<div class="modal-ind-list">${renderFilterList(entry)}</div>`
            ) : ''}
            ${renderModalCollapsibleSection(
              'buy-section-gate',
              'Gate 일치 여부',
              `<div class="modal-ind-list">${renderGateList(entry)}</div>`
            )}
          </div>

          ${entry.strategy === 'pullback' ? renderPullbackSupportModalSection(entry.pullbackContext || {}) : ''}
          ${renderVolatilityModalSection(entry.volatilityContext || {})}

          ${renderModalCollapsibleSection(
            'buy-section-score-breakdown',
            '점수 breakdown (신호 vs 진입)',
            typeof renderBuyScoreBreakdownTable === 'function' ? renderBuyScoreBreakdownTable(entry) : ''
          )}

          ${renderModalCollapsibleSection(
            'buy-section-scoring-rules',
            '채점 조건 (S·P·C) 일치 / 불일치',
            `<div class="modal-ind-list">${renderRuleMatchList(entry)}</div>`
          )}
        </div>
      </div>
    `;
  } else {
    detailModal.classList.remove('buy-detail-mode');
    const { stock, data, indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, isBefore0908, gapProfile } = detail;
    document.getElementById('modal-name').textContent = stock.name;
    document.getElementById('modal-code').textContent = stock.code;
    const typeLabel = stock.type === 'swing'
      ? '🔄 스윙 보유'
      : stock.type === 'pullback'
        ? '📊 눌림목 종가베팅'
        : stock.type === 'accumulation'
          ? '🔥 수급 매집형 종가베팅'
          : stock.type === 'reversal'
            ? '🔻 주도주 급락 반등 종가베팅'
            : '🚀 주도주 돌파형 종가베팅';
    document.getElementById('modal-type').textContent = typeLabel;

    const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
    const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
    const absChg = Math.abs(data.chgRate).toFixed(2);
    const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;

    const badgeInfo = getActionBadge(decision, actionStage);
    const shiftBadgeInfo = getGapComparisonBadge(gapProfile?.comparison);
    const verdictCls = decision === 'sell' ? 'sell' : decision === 'caution' ? 'caution' : 'hold';
    const stageCls = isBefore0908 ? 'stage1' : 'stage2';
    const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';

    const notionEntry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
    const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 전략 데이터에 없습니다.</div>';
    const strategyPlanHtml = renderSellStrategyPlan(detail, false);
    const strategyCautionHtml = renderStrategyCautionPanel(stock.type, {
      sectionLabel: '⚠️ 이 종목 전략 주의사항',
      title: stock.type === 'swing' ? '스윙 보유 종목에서 특히 조심할 점' : `${typeLabel.replace(/^[^\s]+\s*/, '')} 종목을 볼 때 먼저 확인할 점`,
      cardClass: 'triggered'
    });

    const triggeredRuleHtml = triggeredRule ? `
      <div class="modal-triggered-rule">
        <div class="modal-section-label">🚨 트리거된 규칙</div>
        <div class="modal-ind-card triggered">
          <div class="modal-ind-icon">🛑</div>
          <div class="modal-ind-content">
            <div class="modal-ind-title">[${escapeHtml(triggeredRule.code)}] ${escapeHtml(triggeredRule.title)}</div>
            <div class="modal-ind-criterion">${triggeredRule.criterion ? triggeredRule.criterion.split('\n').map(l => `<span>${escapeHtml(l)}</span>`).join('<br>') : ''}</div>
            <div class="modal-ind-result">→ ${escapeHtml(triggeredRule.result || '')}</div>
            ${triggeredRule.value ? `<div class="modal-ind-value">📐 ${escapeHtml(triggeredRule.value)}</div>` : ''}
          </div>
        </div>
      </div>
    ` : '';

    const gapAdjustmentHtml = gapProfile?.code ? `
      <div class="modal-triggered-rule">
        <div class="modal-section-label">🌙 갭 조정 적용</div>
        <div class="modal-ind-card ${gapProfile.severity}">
          <div class="modal-ind-icon">${gapProfile.severity === 'triggered' ? '🟠' : gapProfile.severity === 'clear' ? '🟢' : '🟡'}</div>
          <div class="modal-ind-content">
            <div class="modal-ind-title">갭 등급 ${escapeHtml(gapProfile.label)}</div>
            <div class="modal-ind-criterion"><span>익일 매도 판단에 프리마켓 익절, 손절폭, 스윙 전환 규칙을 함께 적용합니다.</span></div>
            <div class="modal-ind-result">→ 프리마켓: ${escapeHtml(gapProfile.premarketText)} / 손절: ${escapeHtml(gapProfile.stopLossText)} / 스윙: ${escapeHtml(gapProfile.swingText)}</div>
            <div class="modal-ind-value">📐 ${escapeHtml(gapProfile.summary)}</div>
          </div>
        </div>
      </div>
    ` : '';

    const lossManagementHtml = (stock.type === 'swing' && lossManagement) ? `
      <div class="loss-management-panel">
        <div class="modal-section-label">📉 손실 관리 판정</div>
        <div class="loss-verdict ${lossManagement.lossLevel}">
          <div class="loss-verdict-score">${lossManagement.totalScore} / ${lossManagement.maxScore}</div>
          <div class="loss-verdict-text">${lossManagement.verdict}</div>
        </div>
        <div class="loss-prices">
          <div class="loss-price-item danger">
            <span class="loss-price-label">최대 손절가</span>
            <span class="loss-price-value">${lossManagement.maxStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(${lossManagement.maxStopRate >= 0 ? '+' : ''}${lossManagement.maxStopRate.toFixed(1)}%)</span>
          </div>
          <div class="loss-price-item warning">
            <span class="loss-price-label">권장 손절가</span>
            <span class="loss-price-value">${lossManagement.recommendedStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(현재가 -2% 또는 5MA)</span>
          </div>
          <div class="loss-price-item recovery">
            <span class="loss-price-label">회복 목표가</span>
            <span class="loss-price-value">${lossManagement.recoveryTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(진입가 +1%)</span>
          </div>
          <div class="loss-price-item target">
            <span class="loss-price-label">반등 익절가</span>
            <span class="loss-price-value">${lossManagement.reboundTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(20일 고점 80%)</span>
          </div>
        </div>
        <div class="loss-score-grid">
          ${lossManagement.scores.map(s => `
            <div class="loss-score-item ${s.pass ? 'pass' : 'fail'}">
              <span class="loss-score-icon">${s.pass ? '✅' : '❌'}</span>
              <span class="loss-score-code">${s.code}</span>
              <span class="loss-score-title">${escapeHtml(s.title)}</span>
              <span class="loss-score-result">${escapeHtml(s.result)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const comparisonShiftHtml = shiftBadgeInfo ? `
      <div class="modal-verdict modal-verdict-shift ${shiftBadgeInfo.cls}">${escapeHtml(shiftBadgeInfo.text)} · ${escapeHtml(shiftBadgeInfo.detail)}</div>
    ` : '';

    document.getElementById('modal-body').innerHTML = `
      <div class="modal-price-bar">
        <span class="price-big">${data.currentPrice.toLocaleString()}원</span>
        <span class="chg-big ${chgClass}">${chgPrefix}${absChg}%</span>
        <div class="modal-stats">
          <div class="modal-stat">
            <span class="modal-stat-label">진입가</span>
            <span class="modal-stat-value">${entryPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">수익률</span>
            <span class="modal-stat-value" style="color:${gainRate >= 0 ? 'var(--text-success)' : 'var(--text-danger)'}">${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}%</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">시가</span>
            <span class="modal-stat-value">${data.openPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">체결강도</span>
            <span class="modal-stat-value">${data.strength !== null && data.strength !== undefined ? `${data.strength.toFixed(2)}%` : '미연동'}</span>
          </div>
        </div>
      </div>

      <div class="modal-verdict ${verdictCls}">${badgeInfo.text}</div>
      ${comparisonShiftHtml}

      ${strategyPlanHtml}
      ${strategyCautionHtml}
      ${gapAdjustmentHtml}
      ${triggeredRuleHtml}
      ${lossManagementHtml}

      <div>
        <div class="modal-section-label">매매 전략 (전략 데이터)</div>
        ${tradePlanHtml}
      </div>

      <div>
        <div class="modal-stage-badge ${stageCls}">⚡ ${stageText}</div>
        <div class="modal-section-label">지표별 분석 결과</div>
        <div class="modal-ind-list">
          ${indicators.map(indicator => {
            const icon = indicator.status === 'triggered' ? '🚨' : indicator.status === 'clear' ? '✅' : '➖';
            const criterionLines = indicator.criterion.split('\n').map(line => `<span>${escapeHtml(line)}</span>`).join('<br>');
            return `
              <div class="modal-ind-card ${indicator.status}">
                <div class="modal-ind-icon">${icon}</div>
                <div class="modal-ind-content">
                  <div class="modal-ind-title">${escapeHtml(indicator.title)}</div>
                  <div class="modal-ind-criterion">${criterionLines}</div>
                  <div class="modal-ind-result">→ ${escapeHtml(indicator.result)}</div>
                  ${indicator.value ? `<div class="modal-ind-value">📐 ${escapeHtml(indicator.value)}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  document.getElementById('modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeModal() {
  currentModalState = { key: null, code: null, slotId: null, mode: null };
  document.getElementById('modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function normalizeStrategyKey(strategy) {
  if (strategy === 'momentum') return 'breakout';
  return strategy;
}

const STRATEGY_CAUTION_NOTES = {
  pullback: {
    headline: '추세가 살아 있을 때만 눌림목입니다. 추세가 꺾이면 눌림목이 아니라 하락 전환입니다.',
    items: [
      '20일선·60일선 지지가 약해진 상태에서 반등만 보고 들어가면, 기술적 반등 후 재차 밀릴 가능성이 큽니다.',
      '조정 폭이 과도하거나 거래량이 다시 늘며 음봉이 커지면 세력이 받는 구간이 아니라 매도가 쏟아지는 구간일 수 있습니다.',
      '시장 전체가 약한 날에는 좋은 종목도 눌림 뒤 바로 회복하지 못하므로 분할 대응보다 손절 기준을 먼저 지켜야 합니다.'
    ]
  },
  accumulation: {
    headline: '매집형은 조용해서 좋아 보이지만, 조용하다는 것은 아직 시장이 확신하지 않았다는 뜻이기도 합니다.',
    items: [
      '거래량이 너무 마른 박스권은 수급이 들어와도 돌파까지 시간이 오래 걸려 자금이 묶일 수 있습니다.',
      '외인·기관 순매수가 찍혀도 실제 주도 수급으로 이어지지 않으면 박스 하단 재시험이 반복될 수 있습니다.',
      '재료 확인 없이 횡보만 보고 매집으로 해석하면, 상승 준비가 아니라 관심 소멸 구간을 잘못 잡을 위험이 큽니다.'
    ]
  },
  breakout: {
    headline: '돌파매매는 가장 강해 보일 때 사지만, 실패하면 가장 빠르게 손익비가 무너지는 전략입니다.',
    items: [
      '변동성 장세에서는 장중 돌파가 윗꼬리·되밀림으로 끝나기 쉬워 종가 기준 실패 돌파가 자주 나옵니다.',
      '고점 근처 추격 진입이 되면 손절 폭은 커지고 기대수익은 줄어, 다음 날 갭하락이나 시초가 이탈 때 회복이 어렵습니다.',
      '거래량만 터지고 종가 힘이 약하면 세력 매집이 아니라 분배일 수 있으므로, 강마감이 무너지면 더 보수적으로 봐야 합니다.'
    ]
  },
  reversal: {
    headline: '급락 반등은 수익이 빨리 날 수 있지만, 바닥 확인 전에 잡으면 낙하하는 칼을 받는 매매가 됩니다.',
    items: [
      '악재가 끝나지 않은 종목은 첫 반등 뒤 재차 저점을 깨는 경우가 많아, 평균단가를 낮추는 대응이 특히 위험합니다.',
      '역추세 매매는 본전 심리가 붙기 쉬워 손절이 늦어지므로, 보유 기간과 최대 손실을 더 짧고 명확하게 관리해야 합니다.',
      '대형주라도 패닉 구간에서는 체결강도와 수급이 하루 만에 뒤집힐 수 있어, 반등 확인 전 선진입은 피하는 편이 낫습니다.'
    ]
  },
  swing: {
    headline: '스윙 전환 종목은 하루 버텼다고 안전한 것이 아니라, 갭과 추세 훼손 리스크를 밤새 떠안는 상태입니다.',
    items: [
      '종가 기준으로 괜찮아 보여도 다음 날 시가가 크게 이탈하면 장중 대응보다 불리한 가격에서 시작할 수 있습니다.',
      '스윙은 손실 만회를 기다리는 구간이 아니라, 반등 조건과 철수 조건이 모두 살아 있을 때만 유지해야 합니다.',
      '기존 종가베팅 논리가 훼손된 상태에서 시간만 늘리면 전략 전환이 아니라 손실 이연이 될 수 있습니다.'
    ]
  }
};

function renderStrategyCautionPanel(strategy, options = {}) {
  const normalizedStrategy = normalizeStrategyKey(strategy);
  const caution = STRATEGY_CAUTION_NOTES[normalizedStrategy];
  if (!caution) return '';
  const sectionLabel = options.sectionLabel || '⚠️ 전략 주의사항';
  const title = options.title || '주의를 강하게 봐야 하는 이유';
  const cardClass = options.cardClass || 'triggered';
  return `
    <div class="modal-triggered-rule">
      <div class="modal-section-label">${sectionLabel}</div>
      <div class="modal-ind-card ${cardClass}">
        <div class="modal-ind-icon">⚠️</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(title)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(caution.headline)}</div>
          <div class="modal-ind-criterion">${caution.items.map(item => `<span>• ${escapeHtml(item)}</span>`).join('<br>')}</div>
        </div>
      </div>
    </div>
  `;
}

const STRATEGY_INFO_CONTENT = {
  pullback: {
    title: '타입 1: 눌림목 종가베팅 (전략 ①)',
    subtitle: '정배열 우량주의 조정 구간을 공략하는 추세 추종 전략',
    body: `
      <p><strong>개념:</strong> 중장기적으로 우상향(정배열)하는 우량 주식이 단기적으로 조정을 받아 가격이 싸졌을 때, 반등 직전의 타이밍을 잡아서 종가에 매수하는 추세 추종형 전략입니다.</p>
      ${renderStrategyCautionPanel('pullback', { sectionLabel: '⚠️ 꼭 주의할 점', title: '추세가 꺾인 눌림은 매수 기회가 아니라 손절 구간일 수 있습니다.' })}
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">선정 조건 (Gate):</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li><strong>정배열:</strong> 5일 이동평균선(MA)이 20일 이동평균선보다 위에 있고, 둘 다 우상향 중이어야 합니다.</li>
        <li><strong>안전망:</strong> 주가가 60일 이동평균선 위에 있어 장기 추세가 무너지지 않은 상태여야 합니다.</li>
        <li><strong>지표:</strong> 주봉 RSI(상대강도지수)가 50 이상이고, 일봉 MACD 히스토그램이 음전환 후 3일 이내이거나 0선 위로 회복 중이어야 합니다.</li>
      </ul>
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">채점 및 최종 선정:</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>단기 고점 대비 -7% ~ -15% 수준으로 적당히 조정받았는지 평가합니다.</li>
        <li>당일 외국인이나 기관이 다시 사기 시작했는지(수급 전환) 확인합니다.</li>
        <li>당일 캔들이 양봉이거나 아래꼬리가 길게 달렸는지, 거래량은 적당히 진정되었는지(5일 평균의 100~180%)를 점수화하여 등급(S~A)을 매긴 후 상위 종목을 선정합니다.</li>
        <li>거래량이 안 줄거나, 장막판 매수세가 꺾이거나, 앵커/지지선을 종가로 이탈하면 가짜 눌림으로 봅니다.</li>
      </ul>
    `
  },
  breakout: {
    title: '주도주 돌파형 종가베팅',
    subtitle: '"주도주의 전고점·신고가 돌파 직후, 수급이 따라붙을 때"',
    body: `
      <p><strong>개념:</strong> 시장 대비 강한 주도주가 52주·20일 고점권을 돌파하고 거래량·강마감·양매수가 확인될 때 종가에 진입하는 전략입니다. 돌파 후 +5% 이내·당일 +12% 이하로 상따 구간을 배제합니다.</p>
      ${renderStrategyCautionPanel('breakout', { sectionLabel: '⚠️ 꼭 주의할 점', title: '변동성 장세에서는 가장 먼저 의심해야 할 전략입니다.' })}
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">핵심 Gate:</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>RS·초과수익·52주 92% 이상·거래대금 TOP100</li>
        <li>거래량 150% 이상, 윗꼬리 억제, 5MA 위·우상향</li>
        <li>외인·기관 양매수 (S1)</li>
      </ul>
      <p style="margin-top:12px">TOP3는 strictScore 우선으로 정렬됩니다.</p>
    `
  },
  momentum: {
    title: '주도주 돌파형 종가베팅 (레거시 키)',
    subtitle: '"breakout과 동일"',
    body: `<p>이 전략은 <strong>주도주 돌파형(breakout)</strong>으로 이전되었습니다. 설명은 돌파형 안내를 참고하세요.</p>`
  },
  accumulation: {
    title: '수급 매집형 종가베팅',
    subtitle: '"조용히 쌓이는 구간에서 수급이 먼저 들어올 때"',
    body: `
      <p><strong>개념:</strong> 장기 추세는 유지되지만 52주 고점권(92% 이상)에 있지 않고, 거래량이 줄어든 횡보·눌림 구간에서 외인·기관이 연속 매수하는 종목을 종가에 매수합니다. 돌파형과 Gate G2로 상호 배타됩니다.</p>
      ${renderStrategyCautionPanel('accumulation', { sectionLabel: '⚠️ 꼭 주의할 점', title: '조용하다는 이유만으로 안전한 구간이라고 보면 안 됩니다.' })}
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">핵심 Gate:</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>52주 고가 &lt; 92%, 거래량 &lt; 20일 평균 120%</li>
        <li>60MA 위, 과거 거래량 급증 이력, VKOSPI(눌림목 G5)</li>
        <li>20MA 98~102% 박스, 5MA&gt;20MA, 당일 등락 -3%~+5%</li>
        <li>최근 5거래일 외국인/기관 중 실제로 누가 순매수를 쌓는지 함께 확인합니다.</li>
      </ul>
    `
  },
  reversal: {
    title: '타입 3: 주도주 급락 반등 매매 (전략 ③ - 역추세 트랙)',
    subtitle: '"초대형 우량주가 갑자기 폭락했을 때, 첫 반등의 꼬리를 잡는다"',
    body: `
      <p><strong>개념:</strong> 시장을 주도하던 대형·준대형 리더주(시총 8조 원 이상)가 단기 악재 등으로 패닉 셀링(급락)을 겪은 후, 매도가 멈추고 강한 매수세가 처음 유입되는 순간 진입하는 역추세(낙주) 매매입니다. (안정성을 위해 별도 트랙으로 격리 운용하며, 최대 3일만 보유하고 무조건 청산합니다.)</p>
      ${renderStrategyCautionPanel('reversal', { sectionLabel: '⚠️ 꼭 주의할 점', title: '반등이 보여도 바닥이 확인된 것은 아닙니다.' })}
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">선정 조건 (Gate):</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li><strong>시총 8조 원 이상:</strong> 소형주는 배제하되, 대형·준대형 리더주까지 포함해 반등 후보 풀을 넓힙니다.</li>
        <li><strong>주도주 자격:</strong> 급락 전, 1개월 누적 상승률이 최소 +20% 이상이었던 강한 종목이어야 합니다.</li>
        <li><strong>급락 확인:</strong> 최근 5거래일 이내에 하루 만에 -4% 이상 급락한 이력이 있어야 합니다.</li>
        <li><strong>지지선 사수:</strong> 급락했더라도 장기 지지선인 60일 이동평균선은 깨지 않고 버텨주어야 합니다.</li>
        <li><strong>안정화 캔들:</strong> 당일 종가가 양봉으로 끝나거나, 아래꼬리가 몸통보다 1.5배 이상 길거나, 도지(Doji) 캔들로 하락세가 진정되었음을 증명해야 합니다.</li>
      </ul>
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">채점 및 최종 선정:</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>외국인이나 기관 중 한쪽이라도 당일 순매수로 돌아섰는지 확인합니다.</li>
        <li>토스 증권 기준 장 마감 직전 1시간 동안 체결강도가 100% 이상인지(막판에 저가 매수세가 적극 유입되었는지)를 확인하여 채점합니다.</li>
      </ul>
    `
  }
};

function openStrategyInfoModal(strategy) {
  const content = STRATEGY_INFO_CONTENT[strategy];
  if (!content) return;
  document.getElementById('strategy-info-title').innerText = content.title;
  document.getElementById('strategy-info-subtitle').innerText = content.subtitle;
  document.getElementById('strategy-info-body').innerHTML = content.body;
  document.getElementById('strategy-info-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeStrategyInfoModal() {
  document.getElementById('strategy-info-overlay').classList.remove('open');
  syncBodyScrollLock();
}
