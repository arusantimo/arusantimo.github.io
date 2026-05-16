async function fetchYahooChartMetric(symbol) {
  const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d`;
  let lastError = null;

  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy + encodeURIComponent(targetUrl), { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta) throw new Error(json?.chart?.error?.description || 'meta missing');
      return meta;
    } catch (error) {
      lastError = error;
    }
  }

  try {
    const res = await fetch(`https://r.jina.ai/http://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Jina HTTP ${res.status}`);
    const text = await res.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('Jina JSON payload missing');
    const json = JSON.parse(text.slice(start, end + 1));
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) throw new Error(json?.chart?.error?.description || 'Jina meta missing');
    return meta;
  } catch (error) {
    lastError = error;
  }

  throw lastError || new Error(`failed to fetch ${symbol}`);
}

async function refreshLiveGapScore(reasonLabel = '분석 시점') {
  liveGapState = { ...createEmptyLiveGapState(), status: 'loading' };
  renderAll();
  log(`📡 ${reasonLabel} 실시간 갭 지표 5종 수집 중...`);

  try {
    const [nqMeta, vixMeta, tnxMeta, krwMeta, soxMeta] = await Promise.all([
      fetchYahooChartMetric('NQ=F'),
      fetchYahooChartMetric('^VIX'),
      fetchYahooChartMetric('^TNX'),
      fetchYahooChartMetric('KRW=X'),
      fetchYahooChartMetric('^SOX')
    ]);

    const liveMetrics = {
      nq: {
        current: Number(nqMeta.regularMarketPrice),
        previousClose: Number(nqMeta.chartPreviousClose),
        changePct: ((Number(nqMeta.regularMarketPrice) - Number(nqMeta.chartPreviousClose)) / Number(nqMeta.chartPreviousClose)) * 100
      },
      vix: {
        current: Number(vixMeta.regularMarketPrice),
        previousClose: Number(vixMeta.chartPreviousClose)
      },
      tnx: {
        current: Number(tnxMeta.regularMarketPrice),
        previousClose: Number(tnxMeta.chartPreviousClose),
        bpChange: (Number(tnxMeta.regularMarketPrice) - Number(tnxMeta.chartPreviousClose)) * 100
      },
      krw: {
        current: Number(krwMeta.regularMarketPrice),
        previousClose: Number(krwMeta.chartPreviousClose),
        changeWon: Number(krwMeta.regularMarketPrice) - Number(krwMeta.chartPreviousClose)
      },
      sox: {
        current: Number(soxMeta.regularMarketPrice),
        previousClose: Number(soxMeta.chartPreviousClose),
        changePct: ((Number(soxMeta.regularMarketPrice) - Number(soxMeta.chartPreviousClose)) / Number(soxMeta.chartPreviousClose)) * 100
      }
    };

    liveGapState = {
      status: 'ready',
      score: buildLiveGapScore(liveMetrics),
      fetchedAt: new Date().toLocaleString('ko-KR', { hour12: false }),
      source: 'Yahoo Finance chart API',
      error: ''
    };

    const compareText = getGapComparisonText();
    log(`✅ 실시간 갭 스코어 갱신 완료. (${liveGapState.score.grade}${compareText ? ` / ${compareText}` : ''})`);
  } catch (error) {
    liveGapState = { ...createEmptyLiveGapState(), status: 'error', error: error?.message || 'unknown error' };
    log('<span style="color:var(--text-warning)">⚠️ 실시간 갭 지표 수집에 실패해 노션 기준 갭 스코어로 계속 분석합니다.</span>');
    console.error(error);
  } finally {
    renderAll();
  }
}
async function refreshBuyEntry(code, options = {}) {
  const entry = getEntryByCode(code);
  if (!entry) return;

  const {
    triggerButton = null,
    suppressAlert = false,
    logLabel = '개별 분석'
  } = options;

  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = '분석 중...';
  }

  log(`- [${entry.name}] 네이버 컨센서스 기반 ${logLabel}을 시작합니다...`);
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      const proxy = PROXIES[(attempt - 1) % PROXIES.length];
      const basicUrl = `https://m.stock.naver.com/api/stock/${entry.code}/basic`;
      const integrationUrl = `https://m.stock.naver.com/api/stock/${entry.code}/integration`;

      const [basicRes, integrationRes] = await Promise.all([
        fetch(proxy + encodeURIComponent(basicUrl)),
        fetch(proxy + encodeURIComponent(integrationUrl))
      ]);

      if (!basicRes.ok) throw new Error(`basic API error (${basicRes.status})`);
      if (!integrationRes.ok) throw new Error(`integration API error (${integrationRes.status})`);

      const basicJson = await basicRes.json();
      const integrationJson = await integrationRes.json();
      const consensusInfo = integrationJson.consensusInfo || {};
      const recommMean = Number.parseFloat(String(consensusInfo.recommMean ?? '').replace(/,/g, ''));

      if (!Number.isFinite(recommMean) || recommMean <= 0) {
        throw new Error('consensus grade unavailable');
      }

      const currentPrice = extractFirstNumber(basicJson.closePrice ?? basicJson.stockPrice ?? 0) ?? 0;
      const targetPrice = extractFirstNumber(consensusInfo.priceTargetMean);
      const upsideRate = currentPrice > 0 && Number.isFinite(targetPrice)
        ? ((targetPrice - currentPrice) / currentPrice) * 100
        : null;
      const score = clamp(recommMean * 2, 0, 10);
      const grade = getBuyGradeFromScore(score, entry.strategy);

      entry.liveRefresh = {
        recommMean,
        score,
        grade,
        currentPrice,
        targetPrice,
        upsideRate,
        statusLabel: buildLiveBuyStatusLabel({ recommMean, upsideRate }),
        asOf: consensusInfo.createDate || basicJson.localTradedAt || '',
        refreshedAt: new Date().toISOString()
      };

      renderBuyStockCards();
      if (currentModalState.mode === 'buy' && currentModalState.code === code && document.getElementById('modal-overlay').classList.contains('open')) {
        openModal(code, 'buy');
      }

      log(`- [${entry.name}] 최신화 완료: 네이버 컨센서스 ${recommMean.toFixed(2)}/5.00 → ${score.toFixed(1)}점 (${grade}등급)`);
      return true;
    } catch (error) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${entry.name}] ${logLabel} 재시도 중입니다... (${attempt}회 실패)</span>`);
      } else {
        log(`<span style="color:var(--text-danger)">- [${entry.name}] 네이버 컨센서스 최신화에 실패했습니다.</span>`);
        console.error(error);
        if (!suppressAlert) {
          alert(`${entry.name} (${entry.code})의 네이버 컨센서스 정보를 가져오지 못했습니다.`);
        }
      }
    }
  }

  if (triggerButton) {
    triggerButton.disabled = false;
    triggerButton.textContent = entry.liveRefresh ? '다시 분석' : '개별 분석';
  }

  return false;
}
async function runBuyBatchRefresh() {
  const allEntries = getAllBuyEntries();
  if (!allEntries.length) return;

  log(`▶ 네이버 컨센서스 기반 매수 후보 일괄 분석을 시작합니다. (총 ${allEntries.length}개)`);
  let successCount = 0;

  for (const entry of allEntries) {
    const success = await refreshBuyEntry(entry.code, {
      suppressAlert: true,
      logLabel: '일괄 분석'
    });
    if (success) successCount += 1;
    await new Promise(resolve => setTimeout(resolve, 1200));
  }

  const failedCount = allEntries.length - successCount;
  if (failedCount > 0) {
    log(`<span style="color:var(--text-warning)">✅ 매수 후보 ${successCount}개 최신화 완료, ${failedCount}개는 실패했습니다.</span>`);
  } else {
    log(`✅ 매수 후보 ${successCount}개 네이버 컨센서스 최신화가 완료되었습니다.`);
  }
}
async function fetchNotionData() {
  const urlInput = document.getElementById('notion-url').value;
  const matchId = urlInput.replace(/-/g, '').match(/[a-f0-9]{32}/i);
  if (!matchId) {
    alert('유효한 노션 주소 또는 페이지 ID를 입력해주세요.');
    return;
  }

  const notionId = matchId[0];
  const notionApiBase = `https://notion-api.splitbee.io/v1/page/${notionId}`;
  localStorage.setItem('savedNotionUrl', urlInput);

  log(`노션(Notion) 공용 페이지(${notionId.substring(0, 6)}...) 파싱 중입니다...`);
  const btn = document.getElementById('btn-fetch-notion');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> 파싱 중...';

  try {
    let data = null;
    const cacheBuster = `_t=${Date.now()}`;
    const notionUrlFresh = notionApiBase + (notionApiBase.includes('?') ? '&' : '?') + cacheBuster;
    for (let i = 0; i < PROXIES.length + 1; i++) {
      try {
        const url = i === 0 ? notionUrlFresh : PROXIES[i - 1] + encodeURIComponent(notionUrlFresh);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
        break;
      } catch (e) {
        if (i < PROXIES.length) continue;
        throw new Error('Notion API fetch failed (all proxies exhausted)');
      }
    }
    const sourceText = buildSourceTextFromNotion(data);
    notionSnapshot = parseNotionSnapshotFromText(sourceText);
    liveGapState = createEmptyLiveGapState();
    rebuildSellStocksFromSnapshot();
    renderAll();
    restoreAnalysisArchiveState();

    const totalBuy = notionSnapshot.pullbackEntries.length + notionSnapshot.momentumEntries.length;
    log(`성공적으로 불러왔습니다. (시장 레짐 ${notionSnapshot.regimeTable.length}개 항목, 매수 후보 ${totalBuy}개)`);
    if (!totalBuy) {
      log('<span style="color:var(--text-warning)">경고: 전략별 종목 상세를 찾지 못했습니다. 노션 섹션 제목 형식이 바뀌었는지 확인해주세요.</span>');
    }
  } catch (error) {
    log(`<span style="color:var(--text-danger)">오류: 노션 데이터를 파싱하는 데 실패했습니다. 올바른 공개 페이지인지 확인해주세요. (상세: ${error.message} - ${error.stack})</span>`);
    console.error(error);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '불러오기';
    updateCurrentTime();
  }
}
