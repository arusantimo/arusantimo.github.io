function getProxyHostLabel(proxy) {
  try {
    return new URL(proxy).host;
  } catch (error) {
    return proxy;
  }
}

async function fetchJsonWithProxyFallback(targetUrl, options = {}) {
  const {
    timeoutMs = 8000,
    proxies = PROXIES,
    parseMode = 'json'
  } = options;
  let lastError = null;

  for (const proxy of proxies) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new Error(`timeout ${timeoutMs}ms`)), timeoutMs);

    try {
      const res = await fetch(proxy + encodeURIComponent(targetUrl), {
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`${getProxyHostLabel(proxy)} HTTP ${res.status}`);

      if (parseMode === 'text') {
        return await res.text();
      }

      const text = await res.text();
      if (!text) throw new Error(`${getProxyHostLabel(proxy)} empty response`);

      try {
        return JSON.parse(text);
      } catch (error) {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start >= 0 && end > start) {
          return JSON.parse(text.slice(start, end + 1));
        }
        const arrStart = text.indexOf('[');
        const arrEnd = text.lastIndexOf(']');
        if (arrStart >= 0 && arrEnd > arrStart) {
          return JSON.parse(text.slice(arrStart, arrEnd + 1));
        }
        throw new Error(`${getProxyHostLabel(proxy)} invalid JSON payload`);
      }
    } catch (error) {
      clearTimeout(timer);
      lastError = error?.name === 'AbortError'
        ? new Error(`${getProxyHostLabel(proxy)} timeout ${timeoutMs}ms`)
        : error;
    }
  }

  throw lastError || new Error('all proxies failed');
}

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
function readSavedNotionUrls() {
  const normalize = payload => ({
    slotA: String(payload?.slotA || '').trim(),
    slotB: String(payload?.slotB || '').trim()
  });

  try {
    const raw = localStorage.getItem(SAVED_NOTION_URLS_KEY);
    if (raw) {
      return normalize(JSON.parse(raw));
    }
  } catch (error) {
    console.error(error);
  }

  const legacy = String(localStorage.getItem(LEGACY_SAVED_NOTION_URL_KEY) || '').trim();
  return normalize({ slotA: legacy, slotB: '' });
}

function writeSavedNotionUrls(urls) {
  const payload = {
    slotA: String(urls?.slotA || '').trim(),
    slotB: String(urls?.slotB || '').trim()
  };
  localStorage.setItem(SAVED_NOTION_URLS_KEY, JSON.stringify(payload));
  return payload;
}

function getNotionUrlInputValue(slotId) {
  const input = document.getElementById(`notion-url-${normalizeSlotId(slotId)}`);
  return input ? input.value.trim() : '';
}

function setNotionUrlInputValue(slotId, value) {
  const input = document.getElementById(`notion-url-${normalizeSlotId(slotId)}`);
  if (input) input.value = value || '';
}

async function refreshBuyEntry(codeOrEntryKey, options = {}) {
  const entry = typeof codeOrEntryKey === 'object'
    ? ensureEntryIdentity(codeOrEntryKey, codeOrEntryKey.slotId)
    : getEntryByCode(codeOrEntryKey, options.slotId);
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

  log(`- [${entry.slotLabel} · ${entry.name}] 네이버 컨센서스 기반 ${logLabel}을 시작합니다...`);
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      const basicUrl = `https://m.stock.naver.com/api/stock/${entry.code}/basic`;
      const integrationUrl = `https://m.stock.naver.com/api/stock/${entry.code}/integration`;
      const priceUrl = `https://m.stock.naver.com/api/stock/${entry.code}/price?pageSize=120&page=1`;

      const [basicResult, integrationResult, priceResult] = await Promise.allSettled([
        fetchJsonWithProxyFallback(basicUrl, { timeoutMs: 8000 }),
        fetchJsonWithProxyFallback(integrationUrl, { timeoutMs: 8000 }),
        fetchJsonWithProxyFallback(priceUrl, { timeoutMs: 8000 })
      ]);

      if (basicResult.status !== 'fulfilled') throw basicResult.reason;
      if (integrationResult.status !== 'fulfilled') throw integrationResult.reason;

      const basicJson = basicResult.value;
      const integrationJson = integrationResult.value;
      let priceHistory = [];
      let wyckoffFailureReason = '';

      if (priceResult.status === 'fulfilled') {
        const priceJson = priceResult.value;
        priceHistory = Array.isArray(priceJson) ? priceJson : [];
      } else {
        wyckoffFailureReason = priceResult.reason?.message || 'price fetch failed';
      }

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
      entry.liveRefresh = buildBuyLiveRefreshPayload(entry, {
        recommMean,
        currentPrice,
        targetPrice,
        upsideRate,
        asOf: consensusInfo.createDate || basicJson.localTradedAt || '',
        refreshedAt: new Date().toISOString(),
        priceHistory,
        dealTrendInfos: integrationJson.dealTrendInfos || [],
        wyckoffFailureReason
      });

      renderBuyStockCards();
      if (currentModalState.mode === 'buy' && currentModalState.key === entry.entryKey && document.getElementById('modal-overlay').classList.contains('open')) {
        openModal(entry.entryKey, 'buy');
      }

      log(`- [${entry.slotLabel} · ${entry.name}] 최신화 완료: 컨센서스 ${entry.liveRefresh.recommMean.toFixed(2)}/5.00 → 환산 ${entry.liveRefresh.consensusScore.toFixed(1)}점, 컨센서스 ${formatBuySignedPoints(entry.liveRefresh.adjustment)}, 와이코프 ${formatBuySignedPoints(entry.liveRefresh.wyckoffAdjustment)} (${entry.liveRefresh.wyckoff?.label || '관망'} ${entry.liveRefresh.wyckoff?.confidencePct || 0}%), 최종 ${entry.liveRefresh.finalScore.toFixed(1)}점 (${entry.liveRefresh.finalGrade}등급)`);
      return true;
    } catch (error) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${entry.slotLabel} · ${entry.name}] ${logLabel} 재시도 중입니다... (${attempt}회 실패 / ${escapeHtml(error?.message || 'unknown error')})</span>`);
      } else {
        log(`<span style="color:var(--text-danger)">- [${entry.slotLabel} · ${entry.name}] 네이버 컨센서스 최신화에 실패했습니다. (${escapeHtml(error?.message || 'unknown error')})</span>`);
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

  log(`▶ 네이버 컨센서스 기반 매수 후보 두 페이지 일괄 분석을 시작합니다. (총 ${allEntries.length}개)`);
  let successCount = 0;

  for (const entry of allEntries) {
    const success = await refreshBuyEntry(entry, {
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

async function loadNotionSlot(slotId, urlInput) {
  const normalizedSlotId = normalizeSlotId(slotId);
  const slotLabel = getSlotLabel(normalizedSlotId);
  const cleanedInput = String(urlInput || '').trim();

  if (!cleanedInput) {
    setNotionPageState(normalizedSlotId, {
      notionPageId: '',
      notionUrl: '',
      snapshot: createEmptySnapshot(),
      loadedAt: '',
      status: 'idle',
      error: ''
    });
    return { slotId: normalizedSlotId, loaded: false, totalBuy: 0, totalSell: 0 };
  }

  const cleanUrl = cleanedInput.split('?')[0].split('#')[0].replace(/\/+$/, '');
  const matchId = cleanUrl.replace(/-/g, '').match(/[a-f0-9]{32}$/i);
  if (!matchId) {
    throw new Error(`${slotLabel}: 유효한 노션 주소 또는 페이지 ID를 입력해주세요.`);
  }

  const notionId = matchId[0];
  const notionApiBase = `https://notion-api.splitbee.io/v1/page/${notionId}`;
  log(`노션 ${slotLabel} (${notionId.substring(0, 6)}...) 파싱 중입니다...`);

  let data = null;
  const cacheBuster = `_t=${Date.now()}`;
  const notionUrlFresh = notionApiBase + (notionApiBase.includes('?') ? '&' : '?') + cacheBuster;
  for (let i = 0; i < PROXIES.length + 1; i += 1) {
    try {
      const url = i === 0 ? notionUrlFresh : PROXIES[i - 1] + encodeURIComponent(notionUrlFresh);
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
      break;
    } catch (error) {
      if (i < PROXIES.length) continue;
      throw new Error(`${slotLabel}: Notion API fetch failed (all proxies exhausted)`);
    }
  }

  const sourceText = buildSourceTextFromNotion(data);
  const snapshot = parseNotionSnapshotFromText(sourceText);
  const decoratedSnapshot = decorateSnapshotEntries(normalizedSlotId, snapshot);
  const totalBuy = decoratedSnapshot.pullbackEntries.length + decoratedSnapshot.momentumEntries.length + decoratedSnapshot.reversalEntries.length;
  const totalSell = totalBuy + decoratedSnapshot.swingEntries.length;

  setNotionPageState(normalizedSlotId, {
    notionPageId: notionId,
    notionUrl: cleanedInput,
    snapshot: decoratedSnapshot,
    loadedAt: new Date().toISOString(),
    status: 'ready',
    error: ''
  });

  log(`✅ ${slotLabel} 불러오기 완료. (시장 레짐 ${decoratedSnapshot.regimeTable.length}개 항목, 매수 후보 ${totalBuy}개, 스윙 ${decoratedSnapshot.swingEntries.length}개)`);
  if (!totalBuy) {
    log(`<span style="color:var(--text-warning)">⚠️ ${slotLabel}: 전략별 종목 상세를 찾지 못했습니다. 노션 섹션 제목 형식이 바뀌었는지 확인해주세요.</span>`);
  }

  return { slotId: normalizedSlotId, loaded: true, totalBuy, totalSell };
}

async function fetchNotionData() {
  const btn = document.getElementById('btn-fetch-notion');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> 두 페이지 파싱 중...';

  const savedUrls = writeSavedNotionUrls({
    slotA: getNotionUrlInputValue('slotA'),
    slotB: getNotionUrlInputValue('slotB')
  });

  if (!savedUrls.slotA && !savedUrls.slotB) {
    btn.disabled = false;
    btn.innerHTML = '두 페이지 불러오기';
    alert('Page A 또는 Page B 중 최소 하나의 노션 주소를 입력해주세요.');
    return;
  }

  try {
    const results = [];
    for (const slotId of NOTION_SLOT_IDS) {
      results.push(await loadNotionSlot(slotId, savedUrls[slotId]));
    }

    liveGapState = createEmptyLiveGapState();
    if (typeof rebuildSellStocksFromSnapshots === 'function') {
      rebuildSellStocksFromSnapshots();
    } else {
      rebuildSellStocksFromSnapshot();
    }
    renderAll();
    restoreAnalysisArchiveState();

    const loadedCount = results.filter(result => result.loaded).length;
    const totalBuy = results.reduce((sum, result) => sum + result.totalBuy, 0);
    log(`성공적으로 불러왔습니다. (로드된 페이지 ${loadedCount}/2, 전체 매수 후보 ${totalBuy}개)`);
  } catch (error) {
    log(`<span style="color:var(--text-danger)">오류: 노션 데이터를 파싱하는 데 실패했습니다. 올바른 공개 페이지인지 확인해주세요. (상세: ${error.message})</span>`);
    console.error(error);
    alert(error.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '두 페이지 불러오기';
    updateCurrentTime();
  }
}
