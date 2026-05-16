function renderGapScoreSummary() {
  const notionGapScore = notionSnapshot.gapScore;
  const gapScore = getActiveGapScore();
  const isLive = isLiveGapReady();
  if (!gapScore.rows.length && !gapScore.totalScore && !gapScore.grade) return '';

  const comparisonText = getGapComparisonText();
  const dataStatusText = isLive
    ? `실시간 분석 기준은 ${liveGapState.source}에서 ${liveGapState.fetchedAt}에 수집했습니다. 노션 값은 전일 장마감 전 스냅샷으로 비교 기준으로 유지합니다.`
    : liveGapState.status === 'error'
      ? `실시간 수집에 실패해 노션 보고서 기준 갭 스코어를 사용 중입니다. (${escapeHtml(liveGapState.error)})`
      : '현재 화면의 갭 스코어는 노션 보고서에 적힌 값을 파싱한 결과입니다. 분석 버튼 실행 시 실시간 수집을 시도합니다.';
  const caption = isLive
    ? '실시간으로 수집한 5개 지표를 우선 적용하고, 노션 스냅샷과의 차이로 overnight drift를 확인합니다.'
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
        ${comparisonText ? `<div class="gap-score-meta-item"><strong>노션 비교</strong><span>${escapeHtml(comparisonText)}</span></div>` : ''}
        ${isLive && notionGapScore.note ? `<div class="gap-score-meta-item"><strong>노션 기준</strong><span>${escapeHtml(notionGapScore.grade || '미확인')} / ${escapeHtml(notionGapScore.note)}</span></div>` : ''}
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
function buildLiveBuyStatusLabel(liveRefresh) {
  if (Number.isFinite(liveRefresh.upsideRate)) {
    return `목표가 ${formatSignedPercent(liveRefresh.upsideRate)}`;
  }
  return `컨센서스 ${liveRefresh.recommMean.toFixed(2)} / 5.00`;
}

function getBuyPresentation(entry) {
  const liveRefresh = entry.liveRefresh;
  const score = liveRefresh?.score ?? entry.score;
  const grade = liveRefresh?.grade ?? entry.grade;
  const statusLabel = liveRefresh?.statusLabel ?? entry.statusLabel;

  return {
    score,
    grade,
    statusLabel,
    verdictClass: getBuyVerdictClassFromGrade(grade),
    liveRefresh,
    changed: {
      score: Boolean(liveRefresh && Math.abs(score - entry.score) >= 0.05),
      grade: Boolean(liveRefresh && grade !== entry.grade),
      statusLabel: Boolean(liveRefresh && statusLabel !== entry.statusLabel)
    }
  };
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
    container.innerHTML = '<div class="empty-state">노션에서 시장 레짐 요약을 불러오면 여기에 표시됩니다.</div>';
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
      <thead><tr><th>상태</th><th>조건</th><th>눌림목</th><th>수급매집형</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.regimes.map(row => `<tr><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.pullback)}</td><td>${escapeHtml(row.momentum)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-grade-table').innerHTML = `
    <div class="guide-subtitle">추세 추종 전략 (눌림목·수급매집형)</div>
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
      description: '노션 매매 단계 또는 분석 결과를 기반으로 다시 판단합니다.',
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
              <div class="scard-name">${escapeHtml(stock.name)}</div>
              <div class="scard-code">${escapeHtml(stock.code)}</div>
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
  renderGroup(stocks.momentum, 'list-momentum');
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
            <div class="scard-name">${escapeHtml(stock.name)}</div>
            <div class="scard-code">${escapeHtml(stock.code)}</div>
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

function renderBuyStockCards() {
  const renderGroup = (entries, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">노션에서 불러온 매수 후보가 없습니다.</div>';
      return;
    }

    entries.forEach(entry => {
      const gateSummary = summarizeGateStatus(entry);
      const presentation = getBuyPresentation(entry);
      const verdictClass = presentation.verdictClass;
      const rationale = entry.keyPoint || entry.rationale || entry.notes[0] || '세부 판단은 상세 보기에서 확인하세요.';
      container.innerHTML += `
        <div class="buy-card ${verdictClass}" data-code="${entry.code}">
          <div class="buy-card-head">
            <div>
              <div class="buy-card-rank">${entry.rank}위 · ${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</div>
              <div class="buy-card-name">${escapeHtml(entry.name)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}</div>
            </div>
            <div class="buy-card-scorebox">
              <div class="buy-score ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)}</div>
              <div class="buy-grade ${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</div>
            </div>
          </div>
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</div>
          <div class="buy-card-tags">
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          ${presentation.liveRefresh ? `
            <div class="buy-live-meta">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}
          <div class="buy-card-footer">
            <span>${formatWon(entry.entryPriceValue)}</span>
            <span>R/R ${escapeHtml(entry.rr || '미기재')}</span>
          </div>
        </div>
      `;
    });

    container.querySelectorAll('.buy-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.code, 'buy'));
    });
  };

  renderGroup(notionSnapshot.pullbackEntries, 'buy-list-pullback');
  renderGroup(notionSnapshot.momentumEntries, 'buy-list-momentum');
  renderGroup(notionSnapshot.reversalEntries, 'buy-list-reversal');
}

function renderAll() {
  renderRegimeSummary();
  updateRegimeHeader();
  renderGuideTables();
  renderBuyStockCards();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateTabUI();
}

function updateAnalyzeButtonState() {
  const analyzeBtn = document.getElementById('btn-analyze');
  const hasBuyEntries = notionSnapshot.pullbackEntries.length > 0 || notionSnapshot.momentumEntries.length > 0;
  const hasSellStocks = stocks.pullback.length > 0 || stocks.momentum.length > 0 || stocks.swing.length > 0;
  analyzeBtn.disabled = activeTab === 'buy' ? !hasBuyEntries : !hasSellStocks;
}

function updateCurrentTime() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore = totalMins < (9 * 60 + 8);
  const label = isBefore ? '[1차 분석] 9:08 이전 (수급 매집형 손절 점검)' : '[2차 분석] 9:08 이후 (전체 매도/손절 분석)';
  const el = document.getElementById('current-time-display');
  if (el) {
    el.innerHTML = activeTab === 'sell'
      ? `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; 적용 로직: <strong style="color:${isBefore ? 'var(--text-warning)' : 'var(--text-success)'}">${label}</strong>`
      : '🧭 매수 탭에서는 상단 분석 시작 버튼으로 네이버 컨센서스를 일괄 최신화할 수 있습니다.';
  }

  const analyzeBtn = document.getElementById('btn-analyze');
  if (!analyzeBtn) return;

  const activeArchive = getActiveArchiveForTab(activeTab, now);
  const archiveTimeLabel = formatArchiveButtonTime(activeArchive);
  const archiveSuffix = archiveTimeLabel ? ` · ${archiveTimeLabel} 분석` : '';

  if (activeTab === 'buy') {
    const hasBuyRefresh = getAllBuyEntries().some(entry => entry.liveRefresh);
    analyzeBtn.innerHTML = `<span>⚡</span> ${hasBuyRefresh ? '일괄 다시 분석' : '일괄 분석'}${archiveSuffix}`;
    return;
  }

  const hasSellResult = [...stocks.pullback, ...stocks.momentum, ...stocks.swing].some(stock => stockDetailMap[stock.code]?.mode === 'sell');
  analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${hasSellResult ? '다시 분석' : '분석 시작'}${archiveSuffix}`;
}
function setActiveTab(tab) {
  activeTab = tab;
  updateTabUI();
  updateAnalyzeButtonState();
  updateCurrentTime();
}

function updateTabUI() {
  document.querySelectorAll('.tab-button').forEach(button => {
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
  if (!table.length) return null;
  const getValue = key => (table.find(r => r.item === key) || {}).value || '';
  return {
    regime: getValue('레짐'),
    kospi: getValue('KOSPI'),
    vkospi: getValue('VKOSPI'),
    ma60: getValue('60일선'),
    ma20: getValue('20일선'),
    swing: getValue('스윙 전환'),
    openBet: getValue('시가베팅'),
    note: getValue('특이 사항'),
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
    body.innerHTML = '<div class="empty-state">노션에서 시장 레짐 데이터를 불러온 뒤 다시 시도하세요.</div>';
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
            ${comparisonText ? `<tr><td style="color:var(--text-tertiary)">노션 비교</td><td><strong>${escapeHtml(comparisonText)}</strong></td></tr>` : ''}
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
        <thead><tr><th>레짐</th><th>눌림목</th><th>수급매집형</th></tr></thead>
        <tbody>
          ${regimeChecks.map(r => `<tr style="${r.isMatch ? 'background:rgba(16,185,129,0.08)' : ''}"><td>${escapeHtml(r.state)}</td><td>${escapeHtml(r.pullback)}</td><td>${escapeHtml(r.momentum)}</td></tr>`).join('')}
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
function updateCardError(code) {
  const card = document.getElementById(`card-${code}`);
  const indBox = document.getElementById(`ind-${code}`);
  const badge = document.getElementById(`badge-${code}`);
  const shiftBadge = document.getElementById(`gap-shift-${code}`);
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

function renderRuleMatchList(entry) {
  const scoreMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].scores.map(rule => [rule.code, rule]));
  const renderRule = (ruleInfo, matched) => {
    const guide = scoreMap[ruleInfo.code] || { condition: '', source: '' };
    const note = ruleInfo.note ? ` - ${ruleInfo.note}` : '';
    return `
      <div class="modal-ind-card ${matched ? 'clear' : 'triggered'}">
        <div class="modal-ind-icon">${matched ? '✅' : '⚠️'}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(ruleInfo.code)} ${matched ? '일치' : '불일치'}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(`${matched ? '노션 충족' : '노션 미충족'}${note}`)}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  };

  return [
    ...entry.matchedRules.map(rule => renderRule(rule, true)),
    ...entry.unmatchedRules.map(rule => renderRule(rule, false))
  ].join('');
}

function renderGateList(entry) {
  const guideMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].gates.map(gate => [gate.code, gate]));
  return entry.gates.map(gate => {
    const guide = guideMap[gate.code] || { condition: '', source: '' };
    const statusClass = gate.status === '✅' ? 'clear' : 'triggered';
    const statusLabel = gate.status === '✅' ? '통과' : gate.status === '⚠️' ? '경계' : '제외';
    return `
      <div class="modal-ind-card ${statusClass}">
        <div class="modal-ind-icon">${escapeHtml(gate.status || '➖')}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(gate.code)} ${statusLabel}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(gate.note || '노션 기준 판정')}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderTradePlanTable(entry) {
  if (!entry.tradePlanRows.length) {
    return '<div class="empty-state compact">매매 단계 정보가 없습니다.</div>';
  }

  return `
    <table class="guide-table compact-table">
      <thead><tr><th>단계</th><th>조건</th><th>수량</th><th>목표 수익률</th><th>목표가</th></tr></thead>
      <tbody>
        ${entry.tradePlanRows.map(row => `<tr><td>${escapeHtml(row.stage)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.quantity)}</td><td>${escapeHtml(row.targetYield)}</td><td>${escapeHtml(row.targetPrice)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function openModal(code, mode = 'sell') {
  const detail = mode === 'buy' ? getEntryByCode(code) : stockDetailMap[code];
  if (!detail) return;
  currentModalState = { code, mode };
  const detailModal = document.getElementById('detail-modal');

  if (mode === 'buy') {
    detailModal.classList.add('buy-detail-mode');
    const entry = detail;
    const presentation = getBuyPresentation(entry);
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = presentation.verdictClass;
    const verdictMap = {
      strong: 'S 등급 · 강력매수',
      good: 'A 등급 · 매수추천',
      watch: 'B 등급 · 관심후보',
      exclude: 'C 등급 · 제외'
    };

    document.getElementById('modal-body').innerHTML = `
      <div class="buy-modal-layout">
        <div class="buy-modal-fixed">
          <div class="modal-price-bar buy-price-bar">
            <div>
              <div class="price-big ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)} / 10</div>
              <div class="buy-modal-scoreline"><span class="${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</span> · <span class="${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</span></div>
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

          ${presentation.liveRefresh ? `
            <div class="buy-live-meta buy-live-meta-modal">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 컨센서스 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.currentPrice ? `<span class="buy-live-pill">현재가 ${formatWon(presentation.liveRefresh.currentPrice)}</span>` : ''}
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}

          <div class="modal-verdict ${verdictClass === 'strong' ? 'hold' : verdictClass === 'good' ? 'caution' : verdictClass === 'watch' ? 'caution' : 'sell'}">${escapeHtml(verdictMap[verdictClass])}</div>

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
          <div>
            <div class="modal-stage-badge stage2">🧭 노션 기준 매수 판단</div>
            <div class="modal-section-label">Gate 일치 여부</div>
            <div class="modal-ind-list">${renderGateList(entry)}</div>
          </div>

          <div>
            <div class="modal-section-label">채점 조건 일치 / 불일치</div>
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
    document.getElementById('modal-type').textContent = stock.type === 'swing' ? '🔄 스윙 보유' : stock.type === 'pullback' ? '📊 눌림목 종가베팅' : '🔥 수급 매집형 종가베팅';

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
    const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 노션에 없습니다.</div>';
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
        <div class="modal-section-label">매매 전략 (노션)</div>
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
  currentModalState = { code: null, mode: null };
  document.getElementById('modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}
