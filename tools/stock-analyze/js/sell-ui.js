const legacyOpenModal = window.openModal;
const legacyUpdateCardError = window.updateCardError;

function getSellSignalChipMeta(detail) {
  if (detail?.signalSeverity === 'hard') {
    return { label: '현재 신호 · 하드 룰', cls: 'hard' };
  }
  if (detail?.actionPlan?.bucket === 'hold' && ['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(detail?.actionStage)) {
    return { label: '현재 신호 · 익절 단계 진입', cls: 'info' };
  }
  if (detail?.signalBucket === 'partial') {
    return {
      label: detail.signalSeverity === 'soft' ? '현재 신호 · 보조 비중 축소' : '현재 신호 · 전략상 부분 정리',
      cls: detail.signalSeverity === 'soft' ? 'soft' : 'info'
    };
  }
  if (detail?.signalSeverity === 'soft') {
    return { label: '현재 신호 · 보조 경고', cls: 'soft' };
  }
  return { label: '현재 신호 · 전략 정보', cls: 'info' };
}

function getSellRuleDisplayMeta(rule) {
  if (rule?.severity === 'hard') return { cls: 'triggered', icon: '🛑' };
  if (rule?.bucket === 'partial') return { cls: 'warning', icon: '🟡' };
  if (rule?.bucket === 'warning') return { cls: 'warning', icon: '⚠️' };
  return { cls: 'unknown', icon: '➖' };
}

function buildSellContextChips(stock, detail = null) {
  const entry = stock?.type === 'swing' ? null : getEntryByCode(stock?.entryKey || stock?.code || '', stock?.slotId);
  const entryGrade = detail?.entryGrade || entry?.grade || '';
  const entryStatusLabel = detail?.entryStatusLabel || entry?.statusLabel || '';
  const signalChip = detail ? getSellSignalChipMeta(detail) : null;
  const chips = [];

  if (stock?.manual) {
    chips.push('<span class="sell-chip source">수동 추가</span>');
  } else if (stock?.type === 'swing') {
    chips.push('<span class="sell-chip source">스윙 보유</span>');
  } else if (['notion', 'jongga-json', 'strategy-data'].includes(stock?.source)) {
    chips.push('<span class="sell-chip source">전략 후보</span>');
  }

  if (entryGrade) {
    chips.push(`<span class="sell-chip entry">진입 당시 ${escapeHtml(entryGrade)}등급</span>`);
  }
  if (entryStatusLabel) {
    chips.push(`<span class="sell-chip entry">전략 판정 ${escapeHtml(entryStatusLabel)}</span>`);
  }
  if (Number.isFinite(detail?.sellScore)) {
    chips.push(`<span class="sell-chip score">매도 ${detail.sellScore}점</span>`);
  }
  if (signalChip) {
    chips.push(`<span class="sell-chip signal ${signalChip.cls}">${escapeHtml(signalChip.label)}</span>`);
  }

  return chips.join('');
}

function buildBuyTrackingButtonHtml(entryOrKey, compact = false) {
  const normalizedSlotId = typeof entryOrKey === 'object' ? entryOrKey.slotId : activeBuySlot;
  const entryKey = getEntryKey(entryOrKey, normalizedSlotId);
  const tracked = isBuyEntryTrackedForSell(entryKey, normalizedSlotId);
  return `
    <button type="button"
      class="buy-track-toggle ${tracked ? 'tracked' : 'untracked'} ${compact ? 'compact' : ''}"
      data-entry-key="${escapeHtml(entryKey)}"
      aria-pressed="${tracked ? 'true' : 'false'}">
      ${tracked ? '매도 추적 중' : '매도 추적'}
    </button>
  `;
}

function handleBuyTrackingToggle(entryKey) {
  toggleBuyEntryTrackedForSell(entryKey);
  renderBuyStockCards();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateCurrentTime();

  if (currentModalState.mode === 'buy' && currentModalState.key === entryKey && document.getElementById('modal-overlay').classList.contains('open')) {
    openModal(entryKey, 'buy');
  }
  const currentSellDetail = stockDetailMap[currentModalState.key];
  if (currentModalState.mode === 'sell' && currentSellDetail?.stock && !isSellStockVisible(currentSellDetail.stock)) {
    closeModal();
  }
}

function bindBuyTrackingButtons(container) {
  container.querySelectorAll('.buy-card').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('.buy-track-toggle')) return;
      openModal(card.dataset.entryKey, 'buy');
    });
  });

  container.querySelectorAll('.buy-track-toggle').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      handleBuyTrackingToggle(button.dataset.entryKey);
    });
  });
}

function enhanceBuyModalTracking(entryKey) {
  const fixedSection = document.querySelector('.buy-modal-fixed');
  if (!fixedSection) return;
  const existing = document.getElementById('buy-modal-tracking');
  if (existing) existing.remove();

  const verdict = fixedSection.querySelector('.modal-verdict');
  const html = `
    <div class="buy-modal-tracking" id="buy-modal-tracking">
      <div class="buy-modal-tracking-copy">
        실제 진입한 종목만 매도 분석기 기본 목록에 표시합니다.
      </div>
      ${buildBuyTrackingButtonHtml(entryKey, true)}
    </div>
  `;

  if (verdict) verdict.insertAdjacentHTML('afterend', html);
  else fixedSection.insertAdjacentHTML('beforeend', html);

  const button = document.querySelector('#buy-modal-tracking .buy-track-toggle');
  if (button) {
    button.addEventListener('click', event => {
      event.stopPropagation();
      handleBuyTrackingToggle(entryKey);
    });
  }
}

function renderSellUniverseControls() {
  const switcher = document.getElementById('sell-universe-switch');
  const summary = document.getElementById('sell-universe-summary');
  if (!switcher || !summary) return;

  const info = getSellUniverseSummary(activeSellSlot);
  switcher.querySelectorAll('[data-sell-universe]').forEach(button => {
    button.classList.toggle('active', button.dataset.sellUniverse === info.mode);
  });
  summary.innerHTML = `
    <span>기본 표시 ${info.actualCount}개</span>
    <span>추적 종목 ${info.trackedEntryCount}개</span>
    <span>전체 후보 ${info.allCount}개</span>
  `;
}

function getSellEmptyMessage(mode, type) {
  if (mode === 'actual') {
    if (type === 'swing') return '스윙 보유 종목이 없습니다.';
    return '실매수 추적 종목이 없습니다. 매수 후보 카드에서 매도 추적을 켜주세요.';
  }
  return '종목 데이터가 없습니다.';
}

function renderVisibleSellDetails() {
  getVisibleSellStocksList(activeSellSlot).forEach(stock => {
    const detail = stockDetailMap[stock.entryKey];
    if (detail?.mode === 'sell') {
      renderSellDetailToCard(detail);
    }
  });
}

renderSellStockCards = function renderSellStockCardsOverride() {
  renderSellUniverseControls();
  const mode = getSellUniverseMode(activeSellSlot);
  const groups = getVisibleSellStockCollections(activeSellSlot);

  const renderGroup = (arr, containerId, type) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!arr.length) {
      container.innerHTML = `<div class="empty-state">${escapeHtml(getSellEmptyMessage(mode, type))}</div>`;
      return;
    }

    container.innerHTML = arr.map(stock => {
      const detail = stockDetailMap[stock.entryKey];
      const planHtml = buildSellCardPlanSummary(stock.entryKey);
      const entryPrice = stock.entryPrice ? `매수가 ${stock.entryPrice.toLocaleString()}원` : '매수가(전일종가): 대기 중';
      const slotLabel = shouldShowSlotLabel() ? escapeHtml(stock.slotLabel || getSlotLabel(stock.slotId)) : '';
      return `
        <div class="scard" id="${getCardDomId(stock.entryKey)}" data-entry-key="${escapeHtml(stock.entryKey)}">
          <div class="scard-head">
            <div>
              <div class="scard-name">${escapeHtml(stock.name)}</div>
              <div class="scard-code">${escapeHtml(stock.code)}${slotLabel ? ` · ${slotLabel}` : ''}</div>
            </div>
            <div class="scard-badges">
              ${slotLabel ? `<span class="badge badge-page">${slotLabel}</span>` : ''}
              <span class="badge badge-shift" id="${getGapShiftDomId(stock.entryKey)}" style="display:none"></span>
              <span class="badge ${stock.type === 'swing' ? 'badge-swing' : 'badge-pending'}" id="${getBadgeDomId(stock.entryKey)}">${stock.type === 'swing' ? '스윙 보유' : '대기 중'}</span>
            </div>
          </div>
          ${stock.type === 'swing' ? `
            <div class="swing-meta">
              <span class="swing-meta-item">매수일 ${escapeHtml(stock.buyDate || '—')}</span>
              <span class="swing-meta-item">매수가 ${stock.entryPrice ? stock.entryPrice.toLocaleString() : '—'}원</span>
              <span class="swing-meta-item">${escapeHtml(stock.status || '보유중')}</span>
            </div>
          ` : ''}
          <div class="price-row" id="${getPriceRowDomId(stock.entryKey)}">
            <span class="price placeholder-price">대기 중</span>
          </div>
          <div class="meta" id="${getMetaDomId(stock.entryKey)}">${entryPrice}</div>
          <div class="sell-context" id="${getSellContextDomId(stock.entryKey)}">${buildSellContextChips(stock, detail)}</div>
          <div id="${getPlanDomId(stock.entryKey)}">${planHtml}</div>
          <div class="indicators" id="${getIndicatorDomId(stock.entryKey)}">
            <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.scard').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.entryKey, 'sell'));
    });
  };

  renderGroup(groups.swing, 'list-swing', 'swing');
  renderGroup(groups.pullback, 'list-pullback', 'pullback');
  renderGroup(groups.momentum, 'list-momentum', 'momentum');
  renderGroup(groups.reversal, 'list-reversal', 'reversal');
  renderVisibleSellDetails();
};

renderBuyStockCards = function renderBuyStockCardsOverride() {
  const renderGroup = (entries, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">전략 JSON에서 불러온 매수 후보가 없습니다.</div>';
      return;
    }

    container.innerHTML = entries.map(entry => {
      const gateSummary = summarizeGateStatus(entry);
      const presentation = getBuyPresentation(entry);
      const rationale = entry.keyPoint || entry.rationale || entry.notes[0] || '세부 판단은 상세 보기에서 확인하세요.';
      const scoreDisplay = getBuyDisplayScore(entry, presentation.primaryScore);
      const slotLabel = shouldShowSlotLabel() ? escapeHtml(entry.slotLabel || getSlotLabel(entry.slotId)) : '';
      const liveMetaHtml = presentation.liveRefresh
        ? `<div class="buy-live-meta">${buildBuyLivePillsHtml(entry, presentation, { includeStrategyStatus: false, includeTargetPrice: true, includeAsOf: true })}</div>`
        : '';
      return `
        <div class="buy-card ${presentation.verdictClass}" data-entry-key="${escapeHtml(entry.entryKey)}">
          <div class="buy-card-head">
            <div>
              <div class="buy-card-rank">${entry.rank}위 · ${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}${slotLabel ? ` · ${slotLabel}` : ''}</div>
              <div class="buy-card-name">${escapeHtml(entry.name)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}</div>
            </div>
            <div class="buy-card-scorebox">
              <div class="buy-score ${presentation.changed.score ? 'buy-changed' : ''}">${escapeHtml(scoreDisplay)}</div>
              <div class="buy-grade ${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.primaryGrade)}</div>
              <div class="buy-score-caption ${presentation.changed.adjustment ? 'buy-changed' : ''}">${escapeHtml(presentation.primarySummary)}</div>
              ${buildBuyTrackingButtonHtml(entry)}
            </div>
          </div>
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.primaryStatusLabel)}</div>
          <div class="buy-card-tags">
            <span class="buy-tag strategy">전략 판정 ${escapeHtml(entry.statusLabel || presentation.strategyStatusLabel)}</span>
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          ${liveMetaHtml}
          <div class="buy-card-footer">
            <span>${formatWon(entry.entryPriceValue)}</span>
            <span>R/R ${escapeHtml(entry.rr || '미기재')}</span>
          </div>
        </div>
      `;
    }).join('');

    bindBuyTrackingButtons(container);
  };

  const snapshot = getActiveBuySnapshot();
  renderGroup(snapshot.pullbackEntries, 'buy-list-pullback');
  renderGroup(snapshot.momentumEntries, 'buy-list-momentum');
  renderGroup(snapshot.reversalEntries, 'buy-list-reversal');
};

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

  if (stage === 'premarket') return `프리마켓에서 ${row?.quantity || '일부'} 익절 우선${rowSummary ? ` · ${rowSummary}` : ''}`;
  if (stage === 'openPhase') return `장초반에 ${row?.quantity || '일부'} 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  if (stage === 'intraday1') return `1차 목표 도달 시 ${row?.quantity || '일부'} 차익실현${rowSummary ? ` · ${rowSummary}` : ''}`;
  if (stage === 'intraday2') return `2차 목표 도달 시 ${row?.quantity || '잔여 물량'} 추가 정리${rowSummary ? ` · ${rowSummary}` : ''}`;
  if (stage === 'swing') {
    if (detail?.gapProfile?.swingMode === 'ban') return '현재 갭 조건에서는 스윙 전환 금지, 당일 정리 우선';
    if (detail?.gapProfile?.swingMode === 'conditional') return `잔여 물량만 조건부 스윙 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
    return `잔여 물량만 스윙 전환 검토${rowSummary ? ` · ${rowSummary}` : ''}`;
  }
  if (stage === 'stopLoss') return `손절선 이탈 시 전량 매도${rowSummary ? ` · ${rowSummary}` : ''}`;
  return rowSummary || rowCondition || '세부 전략 확인';
}

function buildSyntheticSellStrategyItem(detail) {
  if (!detail) return null;
  const actionPlanItem = buildSellPrimaryActionItem(detail);
  if (actionPlanItem) return actionPlanItem;

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

  if (detail.actionStage === 'warning') {
    return {
      status: 'guard',
      icon: '⚠️',
      title: '보조 경고 신호',
      description: detail.triggeredRule?.result || '하드 손절은 아니지만 장초반 재판단이 필요한 경고 신호가 있습니다.',
      note: detail.triggeredRule?.value || ''
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

  stageOrder.forEach(stage => {
    const target = targets?.[stage];
    if (!target?.row) return;
    const meta = getSellStrategyStageMeta(stage);
    let status = detail?.actionStage === stage ? 'active' : 'available';

    if (stage === 'swing' && detail?.gapProfile?.swingMode === 'ban') status = 'blocked';
    else if (stage === 'swing' && detail?.gapProfile?.swingMode === 'conditional' && detail?.actionStage !== stage) status = 'guard';

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
  const scoreHeadline = buildSellActionHeadline(detail);
  const scoreMeta = buildSellActionMeta(detail);
  return {
    headline: scoreHeadline || headlineItem.title,
    headlineDetail: scoreMeta || headlineItem.description,
    items
  };
}

function renderSellStrategyPlan(detail, compact = false) {
  const plan = buildSellStrategyPlan(detail);
  const limit = compact ? 3 : plan.items.length;
  const visibleItems = plan.items.slice(0, limit);
  const summaryLine = plan.headlineDetail
    ? `${escapeHtml(plan.headline)}: ${escapeHtml(plan.headlineDetail)}`
    : escapeHtml(plan.headline);

  return `
    <div class="${compact ? 'scard-plan scard-plan-current' : 'sell-strategy-panel'}">
      <div class="${compact ? 'plan-current-title' : 'modal-section-label'}">${compact ? '현재 유효 전략' : '🎯 현재 유효한 매매 전략'}</div>
      <div class="${compact ? 'plan-current-summary' : 'sell-strategy-summary'}">${summaryLine}</div>
      <div class="${compact ? 'plan-checklist' : 'sell-strategy-list'}">
        ${visibleItems.map(item => `
          <div class="${compact ? `plan-check ${item.status}` : `modal-ind-card ${item.status === 'blocked' ? 'triggered' : item.status === 'active' ? 'clear' : item.status === 'guard' ? 'warning' : 'unknown'} sell-strategy-item`}">
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

buildSellCardPlanSummary = function buildSellCardPlanSummaryOverride(codeOrEntryKey) {
  const parsed = parseEntryKey(codeOrEntryKey, activeSellSlot);
  const detail = stockDetailMap[parsed.entryKey];
  const entry = getEntryByCode(parsed.entryKey, parsed.slotId);
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) {
    if (detail?.mode === 'sell') return renderSellStrategyPlan(detail, true);
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
  if (swing) tags.push('<span class="plan-tag swing">📊 스윙전환</span>');
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
};

renderSellDetailToCard = function renderSellDetailToCardOverride(detail) {
  const { stock, data, indicators, decision, gainRate, lossManagement, gapProfile, targets } = detail;
  const key = stock.entryKey || buildEntryKey(stock.slotId, stock.code);
  const card = document.getElementById(getCardDomId(key));
  if (!card) return;
  const priceRow = document.getElementById(getPriceRowDomId(key));
  const meta = document.getElementById(getMetaDomId(key));
  const context = document.getElementById(getSellContextDomId(key));
  const planBox = document.getElementById(getPlanDomId(key));
  const indBox = document.getElementById(getIndicatorDomId(key));
  const badge = document.getElementById(getBadgeDomId(key));
  const entryPrice = stock.entryPrice || targets?.entryPrice || getEntryByCode(key, stock.slotId)?.entryPriceValue || data.prevClose;
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
  if (context) context.innerHTML = buildSellContextChips(stock, detail);

  const visibleIndicators = indicators.filter(ind => ind.status !== 'unknown' || ind.title === '갭 등급 조정' || ind.title === '분석 단계');
  const displayIndicators = visibleIndicators.length > 0 ? visibleIndicators : indicators;
  let cardIndicatorHtml = displayIndicators
    .map(indicator => `<div class="ind-item ${indicator.status}">${escapeHtml(indicator.title)}: ${escapeHtml(indicator.result)}</div>`)
    .join('');

  if (stock.type === 'swing' && lossManagement && gainRate < 0) {
    cardIndicatorHtml += `<div class="ind-item ${lossManagement.totalScore >= lossManagement.holdThreshold ? 'clear' : lossManagement.totalScore >= lossManagement.cautionThreshold ? 'warning' : 'triggered'}" style="margin-top:4px;font-weight:700">
      손실 관리: ${escapeHtml(lossManagement.verdict)} | 최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원
    </div>`;
  }

  indBox.innerHTML = cardIndicatorHtml;
  if (planBox) planBox.innerHTML = buildSellCardPlanSummary(key);

  card.className = `scard ${decision}`;
  const badgeInfo = getSellActionPlanBadge(detail);
  badge.className = `badge ${badgeInfo.cls}`;
  badge.innerText = badgeInfo.text;

  const shiftBadge = document.getElementById(getGapShiftDomId(key));
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
  newCard.addEventListener('click', () => openModal(key, 'sell'));
};

function buildSellTriggeredRuleHtml(triggeredRule) {
  if (!triggeredRule) return '';
  const tone = getSellRuleDisplayMeta(triggeredRule);
  return `
    <div class="modal-triggered-rule">
      <div class="modal-section-label">🚨 현재 우선 신호</div>
      <div class="modal-ind-card ${tone.cls}">
        <div class="modal-ind-icon">${tone.icon}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">[${escapeHtml(triggeredRule.code)}] ${escapeHtml(triggeredRule.title)}</div>
          <div class="modal-ind-criterion">${triggeredRule.criterion ? triggeredRule.criterion.split('\n').map(line => `<span>${escapeHtml(line)}</span>`).join('<br>') : ''}</div>
          <div class="modal-ind-result">→ ${escapeHtml(triggeredRule.result || '')}</div>
          ${triggeredRule.value ? `<div class="modal-ind-value">📐 ${escapeHtml(triggeredRule.value)}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function buildSellModalBody(detail) {
  const { stock, data, indicators, targets, gainRate, lossManagement, isBefore0908, gapProfile } = detail;
  const badgeInfo = getSellActionPlanBadge(detail);
  const shiftBadgeInfo = getGapComparisonBadge(gapProfile?.comparison);
  const verdictCls = badgeInfo.tone;
  const stageCls = isBefore0908 ? 'stage1' : 'stage2';
  const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';
  const notionEntry = getEntryByCode(stock.entryKey || stock.code, stock.slotId);
  const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 전략 데이터에 없습니다.</div>';
  const strategyPlanHtml = renderSellStrategyPlan(detail, false);
  const scoreBreakdownHtml = renderSellScoreBreakdown(detail);
  const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;
  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);
  const gapTone = gapProfile?.severity === 'clear' ? 'clear' : 'warning';

  const comparisonShiftHtml = shiftBadgeInfo
    ? `<div class="modal-verdict modal-verdict-shift ${shiftBadgeInfo.cls}">${escapeHtml(shiftBadgeInfo.text)} · ${escapeHtml(shiftBadgeInfo.detail)}</div>`
    : '';

  const gapAdjustmentHtml = gapProfile?.code ? `
    <div class="modal-triggered-rule">
      <div class="modal-section-label">🌙 갭 조정 적용</div>
      <div class="modal-ind-card ${gapTone}">
        <div class="modal-ind-icon">${gapTone === 'clear' ? '🟢' : '🟠'}</div>
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
        ${lossManagement.scores.map(score => `
          <div class="loss-score-item ${score.pass ? 'pass' : 'fail'}">
            <span class="loss-score-icon">${score.pass ? '✅' : '❌'}</span>
            <span class="loss-score-code">${score.code}</span>
            <span class="loss-score-title">${escapeHtml(score.title)}</span>
            <span class="loss-score-result">${escapeHtml(score.result)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
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
    <div class="sell-modal-context">${buildSellContextChips(stock, detail)}</div>
    ${comparisonShiftHtml}

    ${scoreBreakdownHtml}
    ${strategyPlanHtml}
    ${gapAdjustmentHtml}
    ${buildSellTriggeredRuleHtml(detail.triggeredRule)}
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
          const icon = indicator.status === 'triggered' ? '🚨' : indicator.status === 'clear' ? '✅' : indicator.status === 'warning' ? '⚠️' : '➖';
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

openModal = function openModalOverride(codeOrEntryKey, mode = 'sell') {
  const parsed = parseEntryKey(codeOrEntryKey, mode === 'buy' ? activeBuySlot : activeSellSlot);
  if (mode === 'buy') {
    legacyOpenModal(parsed.entryKey, mode);
    enhanceBuyModalTracking(parsed.entryKey);
    return;
  }

  const detail = stockDetailMap[parsed.entryKey];
  if (!detail) return;
  currentModalState = {
    key: parsed.entryKey,
    code: parsed.code,
    slotId: parsed.slotId,
    mode
  };
  const detailModal = document.getElementById('detail-modal');
  detailModal.classList.remove('buy-detail-mode');
  document.getElementById('modal-name').textContent = detail.stock.name;
  document.getElementById('modal-code').textContent = detail.stock.code;
  document.getElementById('modal-type').textContent = detail.stock.type === 'swing'
    ? '🔄 스윙 보유'
    : detail.stock.type === 'pullback'
      ? '📊 눌림목 종가베팅'
      : detail.stock.type === 'momentum'
        ? '🔥 수급 매집형 종가베팅'
        : '🔻 주도주 급락 반등';
  document.getElementById('modal-body').innerHTML = buildSellModalBody(detail);
  document.getElementById('modal-overlay').classList.add('open');
  syncBodyScrollLock();
};

updateAnalyzeButtonState = function updateAnalyzeButtonStateOverride() {
  const analyzeBtn = document.getElementById('btn-analyze');
  const uiSlotIds = getUiSlotIds();
  const hasBuyEntries = uiSlotIds.some(slotId => getVisibleBuyEntries(slotId).length > 0);
  const hasSellStocks = uiSlotIds.some(slotId => getVisibleSellStocksList(slotId, getSellUniverseMode(slotId)).length > 0);
  analyzeBtn.disabled = isAnalysisRunning || (activeTab === 'buy' ? !hasBuyEntries : !hasSellStocks);
};

updateCurrentTime = function updateCurrentTimeOverride() {
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
  if (isAnalysisRunning) return;

  const activeArchive = getActiveArchiveForTab(activeTab, now);
  const archiveTimeLabel = formatArchiveButtonTime(activeArchive);
  const archiveSuffix = archiveTimeLabel ? ` · ${archiveTimeLabel} 분석` : '';

  if (activeTab === 'buy') {
    const hasBuyRefresh = getUiSlotIds().some(slotId => getVisibleBuyEntries(slotId).some(entry => entry.liveRefresh));
    analyzeBtn.innerHTML = `<span>⚡</span> ${hasBuyRefresh ? '다시 분석' : '일괄 분석'}${archiveSuffix}`;
    return;
  }

  analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차 분석' : '2차 분석'}${archiveSuffix}`;
};

updateCardError = function updateCardErrorOverride(codeOrEntryKey) {
  legacyUpdateCardError(codeOrEntryKey);
  const parsed = parseEntryKey(codeOrEntryKey, activeSellSlot);
  const stock = getSellStockByCode(parsed.entryKey, parsed.slotId);
  const context = document.getElementById(getSellContextDomId(parsed.entryKey));
  const planBox = document.getElementById(getPlanDomId(parsed.entryKey));
  if (context && stock) context.innerHTML = buildSellContextChips(stock, stockDetailMap[parsed.entryKey] || null);
  if (planBox) planBox.innerHTML = buildSellCardPlanSummary(parsed.entryKey);
};
