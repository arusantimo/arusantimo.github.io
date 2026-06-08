// Keep thresholds aligned with jongga/macro_overlay.py
const MARKET_ANALYZE_SCRIPT_PATH = '../market-analyze/store/results/latest.js';
const SUPPORTIVE_REGIME_KEYS = new Set(['anchor-buffered-overheat', 'secular-expansion']);
const SUPPORTIVE_ANCHOR_STATES = new Set(['validated', 'supportive']);
const REGIME_STRONG_BULL = '강세장 ✅ (펀더·지수 정당)';
const REGIME_ROTATION_BUFFERED = '순환매장 🔄 (거시·지수 완충)';
const REGIME_BOX_MACRO = '박스권 ⚠️ (거시 완충)';
const REGIME_BOX_INDEX = '박스권 ⚠️ (지수 우선)';
// pullback G5 — keep in sync with jongga/macro_overlay.py
const PULLBACK_G5_VKOSPI_STRICT = 30;
const PULLBACK_G5_VKOSPI_WARN_CAP = 75;
const PULLBACK_G5_VKOSPI_MACRO_CAP = 85;

let marketAnalyzeScriptPromise = null;
let marketAnalyzeCachedSnapshot = null;

function compactDateKey(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 8 ? digits.slice(0, 8) : digits;
}

function datesWithinTolerance(left, right, toleranceDays = 1) {
  const leftKey = compactDateKey(left);
  const rightKey = compactDateKey(right);
  if (!leftKey || !rightKey || leftKey.length !== 8 || rightKey.length !== 8) return false;
  const leftDate = new Date(`${leftKey.slice(0, 4)}-${leftKey.slice(4, 6)}-${leftKey.slice(6, 8)}T00:00:00+09:00`);
  const rightDate = new Date(`${rightKey.slice(0, 4)}-${rightKey.slice(4, 6)}-${rightKey.slice(6, 8)}T00:00:00+09:00`);
  const diffMs = Math.abs(leftDate.getTime() - rightDate.getTime());
  return diffMs <= toleranceDays * 24 * 60 * 60 * 1000;
}

function loadMarketAnalyzeScriptOnce() {
  if (marketAnalyzeScriptPromise) return marketAnalyzeScriptPromise;
  marketAnalyzeScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = MARKET_ANALYZE_SCRIPT_PATH;
    script.async = true;
    script.onload = () => {
      marketAnalyzeCachedSnapshot = window.__MARKET_ANALYZE_RESULT__ || null;
      resolve(marketAnalyzeCachedSnapshot);
    };
    script.onerror = () => reject(new Error(`script load failed: ${MARKET_ANALYZE_SCRIPT_PATH}`));
    document.head.appendChild(script);
  });
  return marketAnalyzeScriptPromise;
}

function getMarketAnalyzeSnapshot() {
  return marketAnalyzeCachedSnapshot || window.__MARKET_ANALYZE_RESULT__ || null;
}

function getMarketAnalyzeData(snapshot = getMarketAnalyzeSnapshot()) {
  return snapshot?.data && typeof snapshot.data === 'object' ? snapshot.data : {};
}

function isRiseJustifiedByMacro(snapshot, analysisDate) {
  if (!snapshot) return false;
  const meta = snapshot.meta || {};
  if (analysisDate && !datesWithinTolerance(meta.resultDate, analysisDate)) return false;
  const data = getMarketAnalyzeData(snapshot);
  if (data.bubbleCriticalTrigger === true) return false;
  const anchorState = String(data.fundamentalAnchorState || '').toLowerCase();
  if (!SUPPORTIVE_ANCHOR_STATES.has(anchorState)) return false;
  const anchorScore = Number(data.fundamentalAnchorScore);
  if (!Number.isFinite(anchorScore) || anchorScore < 70) return false;
  const regimeKey = String(data.marketRegimeKey || '').trim();
  if (!SUPPORTIVE_REGIME_KEYS.has(regimeKey) && anchorScore < 80) return false;
  if (data.bubbleIndex != null && Number(data.bubbleIndex) >= 85) return false;
  return true;
}

function classifyKospiBullTier(context = {}) {
  const close = Number(context.kospiClose);
  const ma20 = Number(context.kospiMa20);
  const ma60 = Number(context.kospiMa60);
  const ma20Up = Boolean(context.kospiMa20Up);
  const ma60Up = Boolean(context.kospiMa60Up);
  if (close >= ma60 && ma60Up && ma20Up && close >= ma20) return 'strong';
  if (close >= ma60 && ma60Up) return 'maintain';
  return 'weak';
}

function isTechnicalSoftRegime(regimeLabel) {
  const label = String(regimeLabel || '');
  return label.startsWith('약세장') || label.startsWith('박스권') || label.startsWith('순환매장');
}

function computeEffectiveRegimeLabel(technicalRegime, riseJustified, kospiTier) {
  const technical = String(technicalRegime || '');
  if (technical.startsWith('강세장')) {
    return { effective: technical, note: '기술 강세 유지' };
  }
  if (riseJustified && kospiTier === 'strong' && isTechnicalSoftRegime(technical)) {
    return { effective: REGIME_STRONG_BULL, note: '펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향' };
  }
  if (riseJustified && kospiTier === 'maintain' && isTechnicalSoftRegime(technical)) {
    return { effective: REGIME_ROTATION_BUFFERED, note: '펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향' };
  }
  if (riseJustified && kospiTier === 'weak' && isTechnicalSoftRegime(technical)) {
    return { effective: REGIME_BOX_MACRO, note: '펀더·버블 정당 → 박스권 완화' };
  }
  if (technical.startsWith('약세장') && !riseJustified && kospiTier === 'strong') {
    return { effective: REGIME_BOX_INDEX, note: 'KOSPI 구조 강세 → 지수 우선 박스권' };
  }
  return { effective: technical, note: '기술 레짐 유지' };
}

function isMacroFriendlyForG5(context = {}) {
  if (context.riseJustifiedByMacro) return true;
  const regime = String(context.effectiveRegimeLabel || context.regimeLabel || '');
  return regime.startsWith('강세장') || regime.startsWith('순환매장');
}

function readRegimeMarketMetrics(slot = {}, root = {}) {
  const regime = slot.regime || root.regime || {};
  const macro = regime.macroOverlay || {};
  const table = asJonggaArray(regime.table || slot.regimeTable);
  const kospiRow = table.find(row => String(row.item || '').includes('KOSPI'));
  const vkospiRow = table.find(row => String(row.item || '').includes('VKOSPI'));
  const kospiClose = Number(String(kospiRow?.value || '').split(' ')[0].replace(/,/g, ''));
  const vkospiMatch = String(vkospiRow?.value || '').match(/([\d.]+)\s*$/);
  return {
    kospiClose: Number(macro.kospiClose ?? (Number.isFinite(kospiClose) ? kospiClose : null)),
    kospiMa5: Number(macro.kospiMa5 ?? NaN),
    vkospiValue: Number(macro.vkospiValue ?? (vkospiMatch ? Number(vkospiMatch[1]) : NaN)),
    vkospiLabel: String(macro.vkospiLabel || 'VKOSPI')
  };
}

function buildPullbackG5Gate(context = {}) {
  const kospiClose = Number(context.kospiClose);
  const kospiMa5 = Number(context.kospiMa5);
  const vkospi = Number(context.vkospiValue);
  const vkospiLabel = String(context.vkospiLabel || 'VKOSPI');
  let kospiNote = 'KOSPI 5MA 데이터 없음';
  if (Number.isFinite(kospiMa5) && kospiMa5 > 0 && Number.isFinite(kospiClose) && kospiClose > 0) {
    const pct = ((kospiClose / kospiMa5) - 1) * 100;
    const sign = pct >= 0 ? '+' : '';
    kospiNote = `KOSPI ${kospiClose.toLocaleString('ko-KR', { maximumFractionDigits: 0 })} / 5MA ${kospiMa5.toLocaleString('ko-KR', { maximumFractionDigits: 0 })} (${sign}${pct.toFixed(1)}%)`;
  } else if (Number.isFinite(kospiMa5) && kospiMa5 > 0) {
    kospiNote = `KOSPI 데이터 없음 / 5MA ${kospiMa5.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
  }
  const noteBase = `${kospiNote} · ${vkospiLabel} ${Number.isFinite(vkospi) ? vkospi.toFixed(1) : '0.0'}`;

  if ((!Number.isFinite(kospiMa5) || kospiMa5 <= 0) && (!Number.isFinite(vkospi) || vkospi <= 0)) {
    return { code: 'G5', status: '⚠️', note: `${noteBase} · KOSPI·VKOSPI 시장지표 부족`, evalStatus: 'data_missing' };
  }
  if (!Number.isFinite(kospiMa5) || kospiMa5 <= 0) {
    return { code: 'G5', status: '⚠️', note: `${noteBase} · KOSPI 5일선 데이터 부족`, evalStatus: 'data_missing' };
  }
  if (!Number.isFinite(kospiClose) || kospiClose <= kospiMa5) {
    return { code: 'G5', status: '⚠️', note: `${noteBase} · KOSPI 단기 추세 이탈`, evalStatus: 'not_met' };
  }
  if (vkospi <= PULLBACK_G5_VKOSPI_STRICT) {
    return { code: 'G5', status: '✅', note: noteBase, evalStatus: 'met' };
  }
  if (vkospi <= PULLBACK_G5_VKOSPI_WARN_CAP) {
    return { code: 'G5', status: '⚠️', note: `${noteBase} · 변동성 경계`, evalStatus: 'not_met' };
  }
  if (isMacroFriendlyForG5(context) && vkospi <= PULLBACK_G5_VKOSPI_MACRO_CAP) {
    return { code: 'G5', status: '⚠️', note: `${noteBase} · 거시·레짐 완화`, evalStatus: 'not_met' };
  }
  return { code: 'G5', status: '⛔', note: `${noteBase} · VKOSPI 과열`, evalStatus: 'not_met' };
}

function buildKospiContextFromRegime(slot = {}, root = {}) {
  const evidence = asJonggaArray(slot.regime?.evidence || root.regime?.evidence || slot.regimeEvidence);
  const parseMa = itemName => {
    const row = evidence.find(entry => String(entry.item || '').includes(itemName));
    const value = Number(String(row?.value || '').replace(/,/g, ''));
    return Number.isFinite(value) ? value : null;
  };
  const kospiRow = evidence.find(entry => String(entry.item || '').includes('KOSPI'));
  const kospiClose = Number(String(kospiRow?.value || '').split(' ')[0].replace(/,/g, ''));
  const ma20 = parseMa('20MA');
  const ma60 = parseMa('60MA');
  const vkospiRow = evidence.find(entry => String(entry.item || '').includes('VKOSPI'));
  const vkospiValue = Number(String(vkospiRow?.value || '').replace(/[^\d.]/g, ''));
  const macro = slot.regime?.macroOverlay || root.regime?.macroOverlay || {};
  return {
    kospiClose: Number.isFinite(kospiClose) ? kospiClose : null,
    kospiMa20: ma20,
    kospiMa60: ma60,
    kospiMa20Up: ma20 != null && kospiClose >= ma20,
    kospiMa60Up: ma60 != null && kospiClose >= ma60,
    vkospiValue: Number.isFinite(vkospiValue) ? vkospiValue : null,
    technicalRegimeLabel: macro.technicalRegimeLabel || '',
    effectiveRegimeLabel: macro.effectiveRegimeLabel || '',
    riseJustifiedByMacro: Boolean(macro.riseJustified),
    kospiBullTier: macro.kospiBullTier || ''
  };
}

function resolveMacroOverlayContext(slot = {}, root = {}, analysisDate = '') {
  const regime = slot.regime || root.regime || {};
  const macro = regime.macroOverlay || {};
  const table = asJonggaArray(regime.table || slot.regimeTable);
  const technicalRow = table.find(row => String(row.item || '').includes('기술 레짐'));
  const effectiveRow = table.find(row => String(row.item || '').includes('적용 레짐'));
  const technical = macro.technicalRegimeLabel || technicalRow?.value || table.find(row => String(row.item || '') === '레짐')?.value || '';
  const effective = macro.effectiveRegimeLabel || effectiveRow?.value || technical;
  const kospiContext = buildKospiContextFromRegime(slot, root);
  const snapshot = getMarketAnalyzeSnapshot();
  const riseJustified = snapshot
    ? isRiseJustifiedByMacro(snapshot, analysisDate || root.analysisDate || '')
    : Boolean(macro.riseJustified);
  const kospiTier = macro.kospiBullTier || classifyKospiBullTier(kospiContext);
  const computed = computeEffectiveRegimeLabel(technical, riseJustified, kospiTier);
  return {
    snapshot,
    technicalRegimeLabel: technical,
    effectiveRegimeLabel: effective || computed.effective,
    riseJustifiedByMacro: riseJustified,
    kospiBullTier: kospiTier,
    regimeAdjustmentReason: regime.regimeAdjustmentReason || macro.regimeAdjustmentReason || computed.note,
    macroOverlay: {
      ...macro,
      ...getMarketAnalyzeData(snapshot),
      marketRegimeLabel: getMarketAnalyzeData(snapshot).marketRegimeLabel || macro.marketRegimeLabel || '',
      loaded: Boolean(snapshot),
      riseJustified,
      kospiBullTier: kospiTier
    },
    kospiContext
  };
}

function recalculateTrendStatusLabel(strategy, grade, regimeLabel, gapCode, gates, overlay = {}) {
  const blockedCodes = (gates || []).filter(gate => gate.status === '⛔').map(gate => String(gate.code || '').trim().toUpperCase()).filter(Boolean);
  const hasBlocked = blockedCodes.length > 0;
  const onlyG5Blocked = hasBlocked && blockedCodes.every(code => code === 'G5');
  if (onlyG5Blocked) return '시장 Gate 차단 · 신규 진입 보류';
  if (hasBlocked) return `매매금지(핵심 Gate 미충족${blockedCodes.length ? `: ${blockedCodes.join(', ')}` : ''})`;
  const effective = String(regimeLabel || '');
  const riseJustified = Boolean(overlay.riseJustifiedByMacro);
  const gapIsFresh = Boolean(overlay.gapIsFresh);
  if (gapCode === 'G-E') {
    if (gapIsFresh && (effective.startsWith('강세장') || effective.startsWith('순환매장'))) {
      if (strategy === 'breakout') return '매매금지(갭다운 경고 · 신규 진입 금지)';
      if (grade === 'S') return '강력매수(거시경고·축소)';
      if (grade === 'A') return '진입 가능(거시경고·축소)';
      if (strategy === 'pullback' && grade === 'B') return '관심후보(B·거시경고)';
      if (grade === 'B') return '관심후보';
      return '제외';
    }
    return '매매금지(갭다운 경고 · 신규 진입 금지)';
  }
  if (effective.startsWith('약세장')) {
    if (riseJustified) {
      if (grade === 'S') return '강력매수(소액·거시완충)';
      if (grade === 'A') return '매수추천(거시완충)';
    }
    if (grade === 'S') return '강력매수(소액)';
    if (grade === 'A') return '관심후보(약세·소액)';
    if (strategy === 'pullback' && grade === 'B') return '관심후보(B·조건부)';
    return '매매금지(약세장)';
  }
  if (grade === 'S') return '강력매수';
  if (grade === 'A') return '매수추천';
  if (strategy === 'pullback' && grade === 'B') return '진입 가능(B·조건부)';
  if (grade === 'B') return '관심후보';
  return '제외';
}

function recalculateReversalStatusLabel(grade, regimeLabel, gapCode, filters, gates, overlay = {}) {
  if ((filters || []).concat(gates || []).some(row => row.status === '⛔')) return '매매금지';
  const effective = String(regimeLabel || '');
  const riseJustified = Boolean(overlay.riseJustifiedByMacro);
  const technical = String(overlay.technicalRegimeLabel || effective);
  const gapIsFresh = Boolean(overlay.gapIsFresh);
  if (gapCode === 'G-E') {
    if (gapIsFresh && (effective.startsWith('강세장') || effective.startsWith('순환매장'))) {
      if (grade === 'S') return '최우선 진입(거시경고·축소)';
      if (grade === 'A') return '진입 가능(거시경고·축소)';
      if (grade === 'B') return '매매금지';
      return '제외';
    }
    return '매매금지(갭다운 경고 · 신규 진입 금지)';
  }
  if (gapCode === 'G-D') return '매매금지(갭다운 주의 · 신규 진입 보류)';
  if (effective.startsWith('약세장')) {
    if (riseJustified && ['S', 'A'].includes(grade) && ['G-A', 'G-B', 'G-C'].includes(gapCode)) {
      return '진입 가능(거시완충)';
    }
    if (technical.startsWith('약세장') && ['S', 'A'].includes(grade) && ['G-A', 'G-B', 'G-C'].includes(gapCode)) {
      return '관심후보(약세·소액)';
    }
    return '매매금지';
  }
  if (grade === 'S') return '최우선 진입';
  if (grade === 'A') return '진입 가능';
  if (grade === 'B') return '매매금지';
  return '제외';
}

function applyMacroOverlayToEntry(entry, strategy, context) {
  const overlay = context.macroOverlay || {};
  const regimeLabel = overlay.effectiveRegimeLabel || context.effectiveRegimeLabel || '';
  if (!regimeLabel) return entry;
  const gapCode = String(context.gapScore?.code || context.gapScore?.grade || '').trim().slice(0, 3);
  const grade = String(entry.grade || '').charAt(0);
  const gapIsFresh = context.gapScore?.isFresh === true
    || String(context.gapScore?.freshnessStatus || '').trim() === 'fresh';
  const gateContext = {
    ...context,
    ...overlay,
    effectiveRegimeLabel: regimeLabel,
    riseJustifiedByMacro: Boolean(overlay.riseJustified ?? overlay.riseJustifiedByMacro ?? context.riseJustifiedByMacro),
    gapIsFresh
  };
  const next = { ...entry };
  if (strategy === 'pullback') {
    const g5 = buildPullbackG5Gate(gateContext);
    next.gates = (next.gates || []).map(gate => (gate.code === 'G5' ? g5 : gate));
  }
  if (strategy === 'reversal') {
    next.statusLabel = recalculateReversalStatusLabel(grade, regimeLabel, gapCode, next.filters, next.gates, gateContext);
  } else {
    next.statusLabel = recalculateTrendStatusLabel(strategy, grade, regimeLabel, gapCode, next.gates, gateContext);
  }
  if (typeof attachEntryEligibility === 'function') {
    return attachEntryEligibility(next, context);
  }
  return next;
}
