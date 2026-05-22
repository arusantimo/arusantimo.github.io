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
  const entryKey = buildEntryKey(activeSellSlot, code);

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
document.getElementById('btn-add-momentum').addEventListener('click', () => handleManualAdd('momentum', 'momentum-name', 'momentum-code'));
document.getElementById('btn-add-reversal').addEventListener('click', () => handleManualAdd('reversal', 'reversal-name', 'reversal-code'));
document.getElementById('btn-add-swing').addEventListener('click', () => {
  const name = document.getElementById('swing-name').value.trim();
  const code = document.getElementById('swing-code').value.trim();
  const entryPriceRaw = document.getElementById('swing-entry-price').value.trim();
  const entryKey = buildEntryKey(activeSellSlot, code);
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

document.querySelectorAll('.tab-button').forEach(button => {
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

    const allStocks = getAllSellStocksForAnalysis();
    const visibleCollections = getUiSlotIds().map(slotId => ({
      slotId,
      label: getSlotLabel(slotId),
      collections: getVisibleSellStockCollections(slotId, getSellUniverseMode(slotId))
    }));

    if (!allStocks.length) {
      log('<span style="color:var(--text-warning)">ℹ️ 현재 분석할 매도 대상이 없습니다. 매수 카드에서 매도 추적을 켜거나 전체 후보 보기를 선택해주세요.</span>');
      return;
    }

    visibleCollections.forEach(({ label, collections }) => {
      const sellCount = collections.swing.length + collections.pullback.length + collections.momentum.length + collections.reversal.length;
      log(`ℹ️ ${label}: 분석 대상 ${sellCount}개 (스윙 ${collections.swing.length}, 눌림목 ${collections.pullback.length}, 수급 ${collections.momentum.length}, 급락반등 ${collections.reversal.length})`);
    });

    for (const stock of allStocks) {
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
  syncSlotSwitchers();

  if (document.getElementById('jongga-quality-panel')) {
    if (typeof bindJonggaLoaderControls === 'function') bindJonggaLoaderControls();
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
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      closeGuideModal();
      closeGapGuideModal();
      closeRegimeReport();
      if (typeof closeJonggaJsonInputModal === 'function') closeJonggaJsonInputModal();
      if (typeof closeJonggaHistoryModal === 'function') closeJonggaHistoryModal();
    }
  });
});
