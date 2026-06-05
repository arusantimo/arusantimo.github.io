document.getElementById('btn-fetch-notion')?.addEventListener('click', fetchNotionData);

function syncSlotSwitchers() {
  document.querySelectorAll('[data-buy-slot]').forEach(button => {
    button.classList.toggle('active', button.dataset.buySlot === activeBuySlot);
  });
  document.querySelectorAll('[data-sell-slot]').forEach(button => {
    button.classList.toggle('active', button.dataset.sellSlot === activeSellSlot);
  });
}

function handleBuySlotChange(slotId) {
  setActiveBuySlot(slotId);
  syncSlotSwitchers();
  renderRegimeSummary();
  updateRegimeHeader();
  renderBuyStockCards();
  updateAnalyzeButtonState();
  updateCurrentTime();

  if (currentModalState.mode === 'buy' && currentModalState.slotId && currentModalState.slotId !== activeBuySlot) {
    closeModal();
  }
}

function handleSellSlotChange(slotId) {
  setActiveSellSlot(slotId);
  syncSlotSwitchers();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateCurrentTime();

  const currentSellDetail = stockDetailMap[currentModalState.key];
  if (currentModalState.mode === 'sell' && currentSellDetail?.stock && currentSellDetail.stock.slotId !== activeSellSlot) {
    closeModal();
  }
}

function handleManualAdd(type, nameInputId, codeInputId) {
  const name = document.getElementById(nameInputId).value.trim();
  const code = document.getElementById(codeInputId).value.trim();
  const entryKey = buildEntryKey(activeSellSlot, code, type);

  if (!name || !code) {
    alert('종목명과 종목코드(6자리)를 모두 입력해주세요.');
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    alert('종목코드는 6자리 숫자여야 합니다.');
    return;
  }

  if (!stocks[type].find(stock => stock.entryKey === entryKey)) {
    stocks[type].push(ensureStockIdentity({ name, code, type, strategy: type, manual: true, source: 'manual' }, activeSellSlot));
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ ${getSlotLabel(activeSellSlot)} 수동 추가: ${name} (${code}) -> ${STRATEGY_META[type].noun}`);

    document.getElementById(nameInputId).value = '';
    document.getElementById(codeInputId).value = '';
    document.getElementById(nameInputId).focus();
  } else {
    alert('이미 추가된 종목입니다.');
  }
}

document.getElementById('btn-add-pullback').addEventListener('click', () => handleManualAdd('pullback', 'pullback-name', 'pullback-code'));
document.getElementById('btn-add-breakout')?.addEventListener('click', () => handleManualAdd('breakout', 'breakout-name', 'breakout-code'));
document.getElementById('btn-add-accumulation')?.addEventListener('click', () => handleManualAdd('accumulation', 'accumulation-name', 'accumulation-code'));
document.getElementById('btn-add-reversal').addEventListener('click', () => handleManualAdd('reversal', 'reversal-name', 'reversal-code'));
document.getElementById('btn-add-swing').addEventListener('click', () => {
  const name = document.getElementById('swing-name').value.trim();
  const code = document.getElementById('swing-code').value.trim();
  const entryPriceRaw = document.getElementById('swing-entry-price').value.trim();
  const entryKey = buildEntryKey(activeSellSlot, code, 'swing');
  if (!name || !code) { alert('종목명과 종목코드(6자리)를 모두 입력해주세요.'); return; }
  if (!/^\d{6}$/.test(code)) { alert('종목코드는 6자리 숫자여야 합니다.'); return; }
  const entryPrice = parseInt(entryPriceRaw.replace(/,/g, ''), 10) || 0;
  if (!stocks.swing.find(stock => stock.entryKey === entryKey)) {
    stocks.swing.push(ensureStockIdentity({
      name,
      code,
      type: 'swing',
      strategy: 'swing',
      buyDate: '',
      entryPrice,
      status: '보유중',
      manual: true,
      source: 'manual'
    }, activeSellSlot));
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ ${getSlotLabel(activeSellSlot)} 수동 추가: ${name} (${code}) -> 스윙 보유 (매수가 ${entryPrice.toLocaleString()}원)`);
    document.getElementById('swing-name').value = '';
    document.getElementById('swing-code').value = '';
    document.getElementById('swing-entry-price').value = '';
  } else {
    alert('이미 추가된 종목입니다.');
  }
});

document.getElementById('btn-buy-guide').addEventListener('click', openGuideModal);

document.querySelectorAll('.tab-button[data-tab]').forEach(button => {
  button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

document.querySelectorAll('[data-buy-slot]').forEach(button => {
  button.addEventListener('click', () => handleBuySlotChange(button.dataset.buySlot));
});

document.querySelectorAll('[data-sell-slot]').forEach(button => {
  button.addEventListener('click', () => handleSellSlotChange(button.dataset.sellSlot));
});

document.getElementById('sell-universe-switch')?.addEventListener('click', event => {
  const button = event.target.closest('[data-sell-universe]');
  if (!button) return;
  setSellUniverseMode(button.dataset.sellUniverse, activeSellSlot);
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateCurrentTime();

  const currentSellDetail = stockDetailMap[currentModalState.key];
  if (currentModalState.mode === 'sell' && currentSellDetail?.stock && !isSellStockVisible(currentSellDetail.stock)) {
    closeModal();
  }
});

document.getElementById('jongga-replay-view-switch')?.addEventListener('click', event => {
  const button = event.target.closest('[data-jongga-replay-view]');
  if (!button) return;
  if (typeof setJonggaReplayViewMode === 'function') {
    setJonggaReplayViewMode(button.dataset.jonggaReplayView);
  }
});

document.getElementById('btn-analyze').addEventListener('click', async () => {
  const btn = document.getElementById('btn-analyze');
  if (isAnalysisRunning) return;

  if (activeTab === 'buy') {
    saveAnalysisArchiveBeforeRecheck('buy');
    setAnalysisRunning(true);
    btn.innerHTML = '<span>⚡</span> 일괄 분석 중...';

    try {
      await refreshLiveGapScore('매수 분석');
      await runBuyBatchRefresh();
      saveAnalysisArchiveAfterAnalysis('buy');
    } finally {
      setAnalysisRunning(false);
      renderBuyStockCards();
      updateAnalyzeButtonState();
      updateCurrentTime();
    }
    return;
  }

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  saveAnalysisArchiveBeforeRecheck('sell', {
    timeLabel: timeStr
  });

  setAnalysisRunning(true);
  btn.innerHTML = '<span>⚡</span> 통합 분석 진행 중...';

  try {
    log(`▶ [현재 시각: ${timeStr}] 매도 통합 분석을 시작합니다.`);
    await refreshLiveGapScore('매도 분석');

    const universeMode = getSellUniverseMode(activeSellSlot);
    const universeLabel = universeMode === 'all' ? '전체 후보' : '실매수 종목';

    // 실매수 종목 모드일 때는 매도 추적이 켜진 종목만 필터링
    const allCandidates = getSellStocksForCurrentSellView(false, activeSellSlot);
    const stocksToAnalyze = universeMode === 'actual'
      ? allCandidates.filter(stock => isBuyEntryTrackedForSell(stock.entryKey || stock.code, stock.slotId))
      : allCandidates;

    const collections = getVisibleSellStockCollections(activeSellSlot, universeMode);

    if (!stocksToAnalyze.length) {
      log(`<span style="color:var(--text-warning)">ℹ️ [${universeLabel}] 분석할 매도 대상이 없습니다. ${universeMode === 'actual' ? '매수 카드에서 매도 추적(🎯)을 켜주세요.' : '전체 후보 보기를 확인해주세요.'}</span>`);
      return;
    }

    const sellCount = collections.swing.length + collections.pullback.length
      + collections.accumulation.length + collections.breakout.length + collections.reversal.length;
    log(`ℹ️ [${getSlotLabel(activeSellSlot)} · ${universeLabel}] 분석 대상 ${stocksToAnalyze.length}개 (스윙 ${collections.swing.length}, 눌림목 ${collections.pullback.length}, 매집 ${collections.accumulation.length}, 돌파 ${collections.breakout.length}, 급락반등 ${collections.reversal.length})`);

    for (const stock of stocksToAnalyze) {
      // 실매수 종목 모드에서는 추적 종목인지 한번 더 확인
      if (universeMode === 'actual' && !isBuyEntryTrackedForSell(stock.entryKey || stock.code, stock.slotId)) {
        log(`<span style="color:var(--text-tertiary)">⏭️ [${stock.name}] 매도 추적 미등록 — 건너뜀</span>`);
        continue;
      }
      await analyzeStock(stock, false);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    saveAnalysisArchiveAfterAnalysis('sell', {
      timeLabel: timeStr
    });
    renderSellStockCards();
    log('✅ 매도 분석이 완료되었습니다.');
  } finally {
    setAnalysisRunning(false);
    updateAnalyzeButtonState();
    updateCurrentTime();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  syncScheduledAnalyzerTab(new Date(), { force: true });
  syncSlotSwitchers();

  if (document.getElementById('jongga-quality-panel')) {
    if (typeof bindJonggaLoaderControls === 'function') bindJonggaLoaderControls();
    if (typeof bindJonggaReplayControls === 'function') bindJonggaReplayControls();
    renderAll();
    restoreAnalysisArchiveState();
    if (typeof loadInitialJonggaData === 'function') loadInitialJonggaData();
  } else {
    const savedUrls = readSavedNotionUrls();
    setNotionUrlInputValue('slotA', savedUrls.slotA);
    setNotionUrlInputValue('slotB', savedUrls.slotB);
    if (savedUrls.slotA || savedUrls.slotB) {
      fetchNotionData();
    } else {
      renderAll();
      restoreAnalysisArchiveState();
    }
  }

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('guide-modal-close-btn').addEventListener('click', closeGuideModal);
  document.getElementById('guide-modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('guide-modal-overlay')) closeGuideModal();
  });
  document.getElementById('gap-guide-modal-close-btn').addEventListener('click', closeGapGuideModal);
  document.getElementById('gap-guide-modal-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('gap-guide-modal-overlay')) closeGapGuideModal();
  });
  document.getElementById('btn-regime-toggle').addEventListener('click', toggleRegimeSummary);
  document.getElementById('btn-regime-report').addEventListener('click', openRegimeReport);
  document.getElementById('regime-report-close-btn').addEventListener('click', closeRegimeReport);
  document.getElementById('regime-report-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('regime-report-overlay')) closeRegimeReport();
  });

  document.querySelectorAll('.strategy-info-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      openStrategyInfoModal(event.currentTarget.dataset.strategy);
    });
  });

  document.getElementById('strategy-info-close-btn').addEventListener('click', closeStrategyInfoModal);
  document.getElementById('strategy-info-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('strategy-info-overlay')) closeStrategyInfoModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      closeGuideModal();
      closeGapGuideModal();
      closeRegimeReport();
      closeStrategyInfoModal();
      if (typeof closeJonggaJsonInputModal === 'function') closeJonggaJsonInputModal();
      if (typeof closeJonggaHistoryModal === 'function') closeJonggaHistoryModal();
    }
  });
});
