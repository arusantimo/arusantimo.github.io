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
  const entry = getEntryByCode(stock.code);
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
    planBox.innerHTML = buildSellCardPlanSummary(stock.code);
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
    <div class="guide-subtitle">역추세 전략 (전략 ③)</div>
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
    <div class="guide-subtitle">역추세 전략 (전략 ③)</div>
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.reversalVkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function buildSellCardPlanSummary(code) {
  const detail = stockDetailMap[code];
  const entry = getEntryByCode(code);
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) {
    if (detail?.mode === 'sell') {
      return renderSellStrategyPlan(detail, true);
    }
    return '<div class="scard-plan-empty">매매 단계 정보 없음</div>';
  }

  const findRow = prefix => entry.tradePlanRows.find(r => r.stage && r.stage.includes(prefix));
  const premarket = findRow('프리마켓') || findRow('🌅');
  const openPhase = findRow('장초반') || findRow('🔔');
  const intraday = findRow('장중') || findRow('📈');
  const swing = findRow('스윙') || findRow('📊');
  const stopLoss = findRow('손절') || findRow('🛑');

  const tags = [];
  if (premarket) tags.push(`<span class="plan-tag target">🌅 ${escapeHtml(premarket.targetYield || premarket.targetPrice || '')}</span>`);
  if (openPhase) tags.push(`<span class="plan-tag target">🔔 ${escapeHtml(openPhase.targetYield || openPhase.targetPrice || '')}</span>`);
  if (intraday) tags.push(`<span class="plan-tag target">📈 ${escapeHtml(intraday.targetYield || intraday.targetPrice || '')}</span>`);
  if (swing) tags.push(`<span class="plan-tag swing">📊 스윙전환</span>`);
  if (stopLoss) tags.push(`<span class="plan-tag stop">🛑 ${escapeHtml(stopLoss.targetYield || stopLoss.targetPrice || '')}</span>`);

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
    return `손절선 이탈 시 전량 매도${rowSummary ? ` · ${rowSummary}` : ''}`;
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
  const entry = getEntryByCode(detail?.stock?.code || '');
  const targets = detail?.targets || parseTradePlanTargets(entry);
  const items = [];
  const currentItem = buildSyntheticSellStrategyItem(detail);
  const stageOrder = ['premarket', 'openPhase', 'intraday1', 'intraday2', 'swing'];

  if (currentItem) items.push(currentItem);

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
  const limit = compact ? 3 : plan.items.length;
  const visibleItems = plan.items.slice(0, limit);

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
      container.innerHTML += `
        <div class="scard" id="card-${stock.code}">
          <div class="scard-head">
            <div>
              <div class="scard-name">${buildStockNameLinksHtml(stock.name, stock.code)}</div>
              <div class="scard-code">${escapeHtml(stock.code)}${getTradingValueRankBadgeHtml(getEntryByCode(stock.code))}</div>
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
            <div class="scard-name">${buildStockNameLinksHtml(stock.name, stock.code)}</div>
            <div class="scard-code">${escapeHtml(stock.code)}${getTradingValueRankBadgeHtml(getEntryByCode(stock.code))}</div>
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
          ${marketDesc ? `${escapeHtml(marketDesc)} — KOSPI 단기 추세 이탈로 거시 G5 차단.` : '거시 시장 조건 미충족으로 진입 보류.'}
          ${setupWeakCount > 0 ? ` (셋업 미흡 ${setupWeakCount}건 포함)` : ''}
        </div>
        <div class="market-hold-banner-sub">
          셋업 양호·시장 보류 <strong>${marketHoldCount}</strong>건 — 시장이 회복되면 재검토 후보로 우선 활용하세요.
        </div>
      </div>
    </div>
  `;
}

function renderBuyStockCards() {
  const replayViewMode = typeof getJonggaReplayViewMode === 'function'
    ? getJonggaReplayViewMode()
    : 'recommendation';
  const filterEntries = entries => (
    typeof filterJonggaReplayViewEntries === 'function'
      ? filterJonggaReplayViewEntries(entries, replayViewMode)
      : (Array.isArray(entries) ? entries : [])
  );
  const emptyMessage = replayViewMode === 'replay'
    ? '6.0 & B 조건을 만족하는 종목이 없습니다.'
    : replayViewMode === 'all'
      ? '전체 후보가 없습니다.'
    : '매수추천 조건을 만족하는 종목이 없습니다.';

  if (typeof updateJonggaReplayViewControls === 'function') {
    updateJonggaReplayViewControls(getActiveBuySnapshot());
  }

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
      const scoreBox = typeof buildBuyScoreDisplayHtml === 'function'
        ? buildBuyScoreDisplayHtml(entry, presentation)
        : { signalText: getBuyDisplayScore(entry, presentation.primaryScore), strictLine: '', badgeHtml: '' };
      const liveMetaHtml = presentation.liveRefresh
        ? `<div class="buy-live-meta">${buildBuyLivePillsHtml(entry, presentation, { includeStrategyStatus: false, includeTargetPrice: true, includeAsOf: true })}</div>`
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
              <div class="buy-card-name">${buildStockNameLinksHtml(entry.name, entry.code)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}${getTradingValueRankBadgeHtml(entry)}</div>
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
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.primaryStatusLabel)}</div>
          ${setupBadgeHtml}
          <div class="buy-card-tags">
            <span class="buy-tag strategy">전략 판정 ${escapeHtml(presentation.strategyStatusLabel)}</span>
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
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
  renderGroup(notionSnapshot.breakoutEntries || notionSnapshot.momentumEntries, 'buy-list-breakout');
  renderGroup(notionSnapshot.reversalEntries, 'buy-list-reversal');
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

function getVerdictTone(value) {
  const text = sanitizeText(value);
  if (!text) return 'unknown';
  if (/[✅🟢]|확정|우호|허용|활성/.test(text)) return 'clear';
  if (/[❌🔴⛔]|약세|금지|비활성|경고/.test(text)) return 'triggered';
  return 'unknown';
}

function getRegimeBadgeMeta(regimeValue) {
  const regime = sanitizeText(regimeValue);
  if (!regime) return { label: '미확인', tone: 'unknown' };
  if (regime.includes('강세장')) return { label: '강세장', tone: 'bull' };
  if (regime.includes('순환매장')) return { label: '순환매장', tone: 'rotation' };
  if (regime.includes('박스권')) return { label: '박스권', tone: 'range' };
  if (regime.includes('약세장')) return { label: '약세장', tone: 'bear' };
  return { label: regime, tone: 'unknown' };
}

function updateRegimeHeader() {
  const toggleButton = document.getElementById('btn-regime-toggle');
  const summary = document.getElementById('buy-regime-summary');
  const badge = document.getElementById('regime-current-badge');
  const info = detectCurrentRegime();
  const meta = getRegimeBadgeMeta(info?.regime || '');

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
}

function toggleRegimeSummary() {
  isRegimeSummaryCollapsed = !isRegimeSummaryCollapsed;
  updateRegimeHeader();
}

  syncBodyScrollLock();
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
  if (!band && !stage) return '';
  const bandText = band && band.label ? `💰 추천 진입가 ${escapeHtml(band.label)}` : '';
  let stageText = '';
  if (stage && stage.stageKey) {
    const meta = (typeof getSellStrategyStageMeta === 'function')
      ? getSellStrategyStageMeta(stage.stageKey)
      : { icon: '🎯', title: stage.stageKey };
    const reason = stage.reason ? ` · ${escapeHtml(stage.reason)}` : '';
    stageText = `🎯 현재 추천 단계: <strong>${escapeHtml(meta.icon + ' ' + meta.title)}</strong>${reason}`;
  }
  const lines = [bandText, stageText].filter(Boolean).map(line => `<div>${line}</div>`).join('');
  if (!lines) return '';
  return `<div class="modal-ind-card clear" style="margin-bottom:8px;">${lines}</div>`;
}

function renderTradePlanTable(entry) {
  if (!entry.tradePlanRows.length) {
    return '<div class="empty-state compact">매매 단계 정보가 없습니다.</div>';
  }

  const recRowStyle = 'background:rgba(16,185,129,0.16);box-shadow:inset 3px 0 0 var(--text-success)';
  const recCellStyle = 'font-weight:700';
  const recYieldStyle = 'color:var(--text-success);font-weight:700';
  const recBadge = '<span class="plan-tag target" style="margin-left:6px;">👉 지금 추천</span>';
  return `
    ${renderTradePlanRecommendation(entry)}
    <table class="guide-table compact-table">
      <thead><tr><th>단계</th><th>조건</th><th>수량</th><th>목표 수익률</th><th>목표가</th></tr></thead>
      <tbody>
        ${entry.tradePlanRows.map(row => {
          const isRec = Boolean(row.recommended);
          const hitRate = (row.historicalHitRate === null || row.historicalHitRate === undefined)
            ? ''
            : ` <span style="color:var(--text-muted)">· 적중 ${Math.round(row.historicalHitRate * 100)}%</span>`;
          const stageCell = isRec
            ? `<td style="${recCellStyle}">${escapeHtml(row.stage)}${recBadge}</td>`
            : `<td>${escapeHtml(row.stage)}</td>`;
          const yieldCell = isRec
            ? `<td style="${recYieldStyle}">${escapeHtml(row.targetYield)}${hitRate}</td>`
            : `<td>${escapeHtml(row.targetYield)}${hitRate}</td>`;
          const priceCell = isRec
            ? `<td style="${recYieldStyle}">${escapeHtml(row.targetPrice)}</td>`
            : `<td>${escapeHtml(row.targetPrice)}</td>`;
          return `<tr${isRec ? ` style="${recRowStyle}"` : ''}>${stageCell}<td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.quantity)}</td>${yieldCell}${priceCell}</tr>`;
        }).join('')}
      </tbody>
    </table>
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
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = presentation.verdictClass;

    document.getElementById('modal-body').innerHTML = `
      <div class="buy-modal-layout">
        <div class="buy-modal-fixed">
          <div class="modal-price-bar buy-price-bar">
            <div>
              <div class="price-big ${presentation.changed.score ? 'buy-changed' : ''}">${escapeHtml(scoreDisplay)}${scoreSuffix}</div>
              <div class="buy-modal-scoreline"><span class="${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.primarySummary)}</span></div>
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
              ${entry.rationale ? `<div class="buy-detail-note"><strong>근거</strong><span>${escapeHtml(entry.rationale)}</span></div>` : ''}
              ${entry.keyPoint ? `<div class="buy-detail-note"><strong>핵심</strong><span>${escapeHtml(entry.keyPoint)}</span></div>` : ''}
              ${entry.notes.map(note => `<div class="buy-detail-note"><strong>메모</strong><span>${escapeHtml(note)}</span></div>`).join('')}
            </div>

            <div class="buy-trade-plan-block">
              <div class="modal-section-label">매매 단계</div>
              ${renderTradePlanTable(entry)}
            </div>
          </div>
        </div>

        <div class="buy-modal-scroll" id="buy-modal-scroll-area">
          ${buildBuyVerificationHtml(entry)}

          <div>
            <div class="modal-stage-badge stage2">🧭 전략 데이터 기준 매수 판단</div>
            ${entry.filters?.length ? `
              <div class="modal-section-label">필터 (F) 일치 여부</div>
              <div class="modal-ind-list">${renderFilterList(entry)}</div>
            ` : ''}
            <div class="modal-section-label">Gate 일치 여부</div>
            <div class="modal-ind-list">${renderGateList(entry)}</div>
          </div>

          <div>
            <div class="modal-section-label">점수 breakdown (신호 vs 진입)</div>
            ${typeof renderBuyScoreBreakdownTable === 'function' ? renderBuyScoreBreakdownTable(entry) : ''}
          </div>

          <div>
            <div class="modal-section-label">채점 조건 (S·P·C) 일치 / 불일치</div>
            <div class="modal-ind-list">${renderRuleMatchList(entry)}</div>
          </div>
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

    const notionEntry = getEntryByCode(stock.code);
    const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 전략 데이터에 없습니다.</div>';
    const strategyPlanHtml = renderSellStrategyPlan(detail, false);

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

const STRATEGY_INFO_CONTENT = {
  pullback: {
    title: '타입 1: 눌림목 종가베팅 (전략 ①)',
    subtitle: '"잘 나가는 주식이 일시적으로 조정을 받고 반등할 때를 노린다"',
    body: `
      <p><strong>개념:</strong> 중장기적으로 우상향(정배열)하는 우량 주식이 단기적으로 조정을 받아 가격이 싸졌을 때, 반등 직전의 타이밍을 잡아서 종가에 매수하는 추세 추종형 전략입니다.</p>
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
      </ul>
    `
  },
  breakout: {
    title: '주도주 돌파형 종가베팅',
    subtitle: '"주도주의 전고점·신고가 돌파 직후, 수급이 따라붙을 때"',
    body: `
      <p><strong>개념:</strong> 시장 대비 강한 주도주가 52주·20일 고점권을 돌파하고 거래량·강마감·양매수가 확인될 때 종가에 진입하는 전략입니다. 돌파 후 +5% 이내·당일 +12% 이하로 상따 구간을 배제합니다.</p>
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
      <div style="margin-top: 12px; font-weight: bold; color: var(--text-primary);">핵심 Gate:</div>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>52주 고가 &lt; 92%, 거래량 &lt; 20일 평균 120%</li>
        <li>60MA 위, 과거 거래량 급증 이력, VKOSPI(눌림목 G5)</li>
        <li>20MA 98~102% 박스, 5MA&gt;20MA, 당일 등락 -3%~+5%</li>
      </ul>
    `
  },
  reversal: {
    title: '타입 3: 주도주 급락 반등 매매 (전략 ③ - 역추세 트랙)',
    subtitle: '"초대형 우량주가 갑자기 폭락했을 때, 첫 반등의 꼬리를 잡는다"',
    body: `
      <p><strong>개념:</strong> 시장을 주도하던 대형·준대형 리더주(시총 8조 원 이상)가 단기 악재 등으로 패닉 셀링(급락)을 겪은 후, 매도가 멈추고 강한 매수세가 처음 유입되는 순간 진입하는 역추세(낙주) 매매입니다. (안정성을 위해 별도 트랙으로 격리 운용하며, 최대 3일만 보유하고 무조건 청산합니다.)</p>
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
