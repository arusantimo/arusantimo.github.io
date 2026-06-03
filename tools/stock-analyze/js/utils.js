function normalizeRegimeGuideKey(value) {
  const normalized = sanitizeText(value)
    .replace(/\*/g, '')
    .replace(/[📡📊🔥📰🚨⚠️✅⛔🧊🔄💱↕️]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (normalized === '시장 레짐' || normalized === '레짐' || normalized === '적용 레짐' || normalized === '기술 레짐') return '레짐';
  if (normalized.includes('진입 전략')) return '진입 전략';
  if (normalized.includes('스윙 전환 활성도')) return '스윙 전환 활성도';
  if (normalized === '스윙 전환') return '스윙 전환';
  if (normalized.includes('시가베팅')) return '시가베팅';
  if (normalized.includes('역추세 트랙')) return '역추세 트랙';
  if (normalized.includes('갭 스코어')) return '갭 스코어';
  if (normalized.includes('갭 조정')) return '갭 조정';
  if (normalized.includes('KOSPI 60MA') || normalized.includes('60일선')) return '60일선';
  if (normalized.includes('KOSPI 20MA') || normalized.includes('20일선')) return '20일선';
  if (normalized.includes('등락주')) return '등락주';
  if (normalized.includes('시장 맥락')) return '시장 맥락';
  return normalized;
}

function getRegimeGuideText(item) {
  return REGIME_LABEL_GUIDE[normalizeRegimeGuideKey(item)] || '';
}

function getRegimeInlineHelp(row) {
  const key = normalizeRegimeGuideKey(row.item);
  if (key === '갭 스코어') {
    return '기본 점수에 중요도를 곱한 뒤 모두 더한 최종 점수입니다. 낮을수록 다음 날 갭다운 위험을 더 크게 봅니다.';
  }
  if (key === '갭 조정') {
    return '갭 스코어 결과를 바탕으로 진입 비중과 익일 매도 기준을 어떻게 바꿀지 정리한 항목입니다.';
  }
  return '';
}

function stripMarkdownText(value) {
  return sanitizeText(value).replace(/\*\*/g, '').trim();
}
function formatSignedNumber(value, digits = 1) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '-';
  return `${num >= 0 ? '+' : ''}${num.toFixed(digits)}`;
}

function parseGapNumeric(value) {
  const match = String(value ?? '').replace(/,/g, '').match(/[+-]?\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : NaN;
}
function adjustPriceByRatePoint(basePrice, targetPrice, ratePointDelta) {
  if (!basePrice || !targetPrice || !ratePointDelta) return targetPrice;
  return Math.max(0, Math.round(targetPrice - (basePrice * ratePointDelta / 100)));
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function syncBodyScrollLock() {
  const hasOpenModal = document.querySelector('.modal-overlay.open');
  document.body.classList.toggle('modal-scroll-locked', Boolean(hasOpenModal));
}

function createEmptySnapshot() {
  return {
    regimeTable: [],
    regimeEvidence: [],
    regimeAlert: '',
    macroOverlay: {},
    technicalRegimeLabel: '',
    effectiveRegimeLabel: '',
    regimeAdjustmentReason: '',
    gapScore: createEmptyGapScore(),
    pullbackEntries: [],
    momentumEntries: [],
    reversalEntries: [],
    swingEntries: [],
    sourceText: ''
  };
}
function log(msg) {
  const out = document.getElementById('log-output');
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
  out.innerHTML += `<div><span class="time">[${timeStr}]</span> ${msg}</div>`;
  out.scrollTop = out.scrollHeight;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeText(text) {
  return String(text ?? '')
    .replace(/\u200b|\u00a0/g, ' ')
    .replace(/data:image\/gif;base64,[^\s)]+/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeHeading(text) {
  return sanitizeText(text)
    .replace(/[📊🔥📰🚨⚠️✅⛔]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatWon(value) {
  if (!value) return '—';
  return `${Number(value).toLocaleString()}원`;
}

function getDailyChangeTone(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num === 0) return 'nt';
  return num > 0 ? 'up' : 'dn';
}

function formatSignedWon(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num === 0) return '';
  return `${num > 0 ? '+' : ''}${Math.round(num).toLocaleString()}원`;
}

function renderBuyPriceWithDailyChange(entry) {
  const pct = Number(entry?.dailyChangePct);
  const tone = getDailyChangeTone(pct);
  const priceClass = Number.isFinite(pct) ? `buy-entry-price chg ${tone}` : 'buy-entry-price';
  const priceHtml = `<span class="${priceClass}">${escapeHtml(formatWon(entry?.entryPriceValue))}</span>`;
  if (!Number.isFinite(pct)) return priceHtml;
  const pctText = `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
  const changeText = formatSignedWon(entry?.dailyChange);
  return `
    <span class="buy-price-stack">
      ${priceHtml}
      <span class="buy-price-change chg ${tone}">${escapeHtml(pctText)}${changeText ? ` · ${escapeHtml(changeText)}` : ''}</span>
    </span>
  `;
}

function extractFirstNumber(text) {
  const match = String(text ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatSignedPercent(value) {
  if (!Number.isFinite(value)) return '—';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

function formatCompactDate(value) {
  const text = String(value ?? '').trim();
  if (!/^\d{8}$/.test(text)) return text;
  return `${text.slice(0, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
}
function getActionBadge(decision, actionStage) {
  const badges = {
    reject: { cls: 'badge-sell', text: '🛑 즉시 손절' },
    loss_cut: { cls: 'badge-sell', text: '🔴 손절 권고' },
    partial_exit: { cls: 'badge-caution', text: '🟡 비중 축소' },
    premarket: { cls: 'badge-caution', text: '🌅 프리마켓 익절' },
    openPhase: { cls: 'badge-caution', text: '🔔 장초반 익절' },
    intraday1: { cls: 'badge-caution', text: '📈 1차 익절' },
    intraday2: { cls: 'badge-caution', text: '📈 2차 익절' },
    swing: { cls: 'badge-hold', text: '🔄 스윙 유지' },
    hold: { cls: 'badge-hold', text: '✅ 홀딩 유지' },
    underwater: { cls: 'badge-caution', text: '⚠️ 평가손' },
    wait: { cls: 'badge-pending', text: '⏳ 대기 중' },
    unknown: { cls: 'badge-pending', text: '❓ 판단 불가' }
  };

  if (decision === 'sell' && !badges[actionStage]) return { cls: 'badge-sell', text: '🛑 매도/손절' };
  return badges[actionStage] || badges.unknown;
}

function getGapComparisonBadge(comparison) {
  if (!comparison?.available || comparison.bias === 0) return null;
  if (comparison.bias > 0) {
    return {
      cls: 'badge-shift-good',
      text: '개선',
      detail: comparison.summary
    };
  }

  return {
    cls: 'badge-shift-bad',
    text: '악화',
    detail: comparison.summary
  };
}

/** 자정~13:59 매도, 14:00~23:59 매수 (로컬 시각) */
const ANALYZER_SELL_TAB_END_HOUR = 14;

function getDefaultAnalyzerTab(now = new Date()) {
  return now.getHours() < ANALYZER_SELL_TAB_END_HOUR ? 'sell' : 'buy';
}

function getAnalyzerTabScheduleHint(now = new Date()) {
  return getDefaultAnalyzerTab(now) === 'sell'
    ? '00:00~13:59 기본: 매도 분석기'
    : '14:00~23:59 기본: 매수 분석기';
}

function extractTradingValueRank(rules) {
  if (!Array.isArray(rules)) return null;
  for (const rule of rules) {
    const code = String(rule.code || '').toUpperCase();
    if (code === 'S1' || code === 'F1') {
      const note = String(rule.note || '');
      const m = note.match(/순위\s*(\d+)위/);
      if (m) return Number(m[1]);
    }
  }
  return null;
}

function getTradingValueRankBadgeHtml(entry) {
  const allRules = [
    ...(entry.matchedRules || []),
    ...(entry.unmatchedRules || []),
    ...(entry.gates || []),
    ...(entry.filters || [])
  ];
  const rank = extractTradingValueRank(allRules);
  if (!rank) return '';
  const cls = rank <= 10 ? 'tv-rank-top10' : rank <= 30 ? 'tv-rank-top30' : 'tv-rank-other';
  return `<span class="tv-rank-badge ${cls}">거래대금 ${rank}위</span>`;
}

function buildStockNameLinksHtml(name, code) {
  const safeCode = escapeHtml(code);
  const safeName = escapeHtml(name);
  return `
    <span class="scard-name-links">
      <a class="scard-name-link" href="https://stock.naver.com/domestic/stock/${safeCode}/price" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${safeName}</a>
      <a class="scard-name-link-toss" href="https://www.tossinvest.com/stocks/${safeCode}/order" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="토스 주문">T</a>
    </span>
  `.trim();
}
