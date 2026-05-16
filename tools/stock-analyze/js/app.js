document.getElementById('btn-fetch-notion').addEventListener('click', fetchNotionData);

function handleManualAdd(type, nameInputId, codeInputId) {
  const name = document.getElementById(nameInputId).value.trim();
  const code = document.getElementById(codeInputId).value.trim();

  if (!name || !code) {
    alert('종목명과 종목코드(6자리)를 모두 입력해주세요.');
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    alert('종목코드는 6자리 숫자여야 합니다.');
    return;
  }

  if (!stocks[type].find(stock => stock.code === code)) {
    stocks[type].push({ name, code, type, strategy: type, manual: true, source: 'manual' });
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ 수동 추가: ${name} (${code}) -> ${STRATEGY_META[type].noun}`);

    document.getElementById(nameInputId).value = '';
    document.getElementById(codeInputId).value = '';
    document.getElementById(nameInputId).focus();
  } else {
    alert('이미 추가된 종목입니다.');
  }
}

document.getElementById('btn-add-pullback').addEventListener('click', () => handleManualAdd('pullback', 'pullback-name', 'pullback-code'));
document.getElementById('btn-add-momentum').addEventListener('click', () => handleManualAdd('momentum', 'momentum-name', 'momentum-code'));
document.getElementById('btn-add-swing').addEventListener('click', () => {
  const name = document.getElementById('swing-name').value.trim();
  const code = document.getElementById('swing-code').value.trim();
  const entryPriceRaw = document.getElementById('swing-entry-price').value.trim();
  if (!name || !code) { alert('종목명과 종목코드(6자리)를 모두 입력해주세요.'); return; }
  if (!/^\d{6}$/.test(code)) { alert('종목코드는 6자리 숫자여야 합니다.'); return; }
  const entryPrice = parseInt(entryPriceRaw.replace(/,/g, ''), 10) || 0;
  if (!stocks.swing.find(s => s.code === code)) {
    stocks.swing.push({ name, code, type: 'swing', strategy: 'swing', buyDate: '', entryPrice, status: '보유중', manual: true, source: 'manual' });
    renderSellStockCards();
    updateAnalyzeButtonState();
    log(`▶ 수동 추가: ${name} (${code}) -> 스윙 보유 (매수가 ${entryPrice.toLocaleString()}원)`);
    document.getElementById('swing-name').value = '';
    document.getElementById('swing-code').value = '';
    document.getElementById('swing-entry-price').value = '';
  } else { alert('이미 추가된 종목입니다.'); }
});
document.getElementById('btn-buy-guide').addEventListener('click', openGuideModal);

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

document.getElementById('btn-analyze').addEventListener('click', async () => {
  const btn = document.getElementById('btn-analyze');

  if (activeTab === 'buy') {
    saveAnalysisArchiveBeforeRecheck('buy');
    btn.disabled = true;
    btn.innerHTML = '<span>⚡</span> 일괄 분석 중...';

    try {
      await refreshLiveGapScore('매수 분석');
      await runBuyBatchRefresh();
      saveAnalysisArchiveAfterAnalysis('buy');
    } finally {
      btn.disabled = false;
      updateAnalyzeButtonState();
      updateCurrentTime();
    }
    return;
  }

  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore0908 = totalMins < (9 * 60 + 8);
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  saveAnalysisArchiveBeforeRecheck('sell', {
    isBefore0908,
    timeLabel: timeStr
  });

  btn.disabled = true;
  btn.innerHTML = '<span>⚡</span> 분석 진행 중...';

  log(`▶ [현재 시각: ${timeStr}] 분석을 시작합니다. (9시 8분 <b>${isBefore0908 ? '이전' : '이후'}</b> 로직 적용)`);
  await refreshLiveGapScore('매도 분석');

  const allStocks = isBefore0908
    ? [...stocks.swing, ...stocks.momentum]
    : [...stocks.swing, ...stocks.pullback, ...stocks.momentum];

  if (isBefore0908 && stocks.pullback.length > 0) {
    log(`ℹ️ 1차 분석: 눌림목 ${stocks.pullback.length}개 종목은 9:08 이후에 분석됩니다.`);
  }
  if (stocks.swing.length > 0) {
    log(`🔄 스윙 보유 ${stocks.swing.length}개 종목 포함하여 분석합니다.`);
  }

  for (const stock of allStocks) {
    await analyzeStock(stock, isBefore0908);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  saveAnalysisArchiveAfterAnalysis('sell', {
    isBefore0908,
    timeLabel: timeStr
  });
  log('✅ 모든 종목의 시그널 분석이 완료되었습니다.');
  btn.disabled = false;
  btn.innerHTML = '<span>⚡</span> 다시 분석';
  updateAnalyzeButtonState();
  updateCurrentTime();
});
window.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('savedNotionUrl');
  if (savedUrl) {
    document.getElementById('notion-url').value = savedUrl;
    fetchNotionData();
  } else {
    renderAll();
    restoreAnalysisArchiveState();
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
    }
  });
});
