// 매수추천에서 제외할 종목 블랙리스트.
// '공매도 과열' 또는 '투자 주의'로 지정된 종목은 주문 대상에서 빼고,
// 다음 순위 후보가 매수추천 목록에 올라오도록 합니다.
//
// 블랙리스트는 두 계층의 합집합입니다.
//   1) 수집 단계(파이썬 파이프라인)에서 KIND 공시·토스 뱃지로 검증해 payload.blacklist 로 내려오는 동적 목록.
//   2) 아래 JONGGA_BLACKLIST 정적 수동 목록 — 공시/토스로 못 잡는 종목을 직접 고정할 때 사용.
// 수동 항목을 추가하려면 JONGGA_BLACKLIST 배열에 항목을 추가하세요.
//   { code: '058470', name: '리노공업', reasons: ['공매도 과열'] }
// reasons 값은 JONGGA_BLACKLIST_REASONS 중에서 고릅니다.
const JONGGA_BLACKLIST_REASONS = ['공매도 과열', '투자 주의'];

const JONGGA_BLACKLIST = [
  { code: '058470', name: '리노공업', reasons: ['공매도 과열'] }
];

function normalizeJonggaBlacklistCode(code) {
  const digits = String(code ?? '').replace(/\D/g, '');
  return digits.length === 6 ? digits : '';
}

function getJonggaBlacklistMap() {
  if (globalThis.__jonggaBlacklistMap) return globalThis.__jonggaBlacklistMap;
  const map = new Map();
  JONGGA_BLACKLIST.forEach(item => {
    const code = normalizeJonggaBlacklistCode(item?.code);
    if (!code) return;
    const reasons = (Array.isArray(item?.reasons) ? item.reasons : [])
      .map(reason => String(reason).trim())
      .filter(reason => JONGGA_BLACKLIST_REASONS.includes(reason));
    map.set(code, { code, name: String(item?.name || '').trim(), reasons });
  });
  globalThis.__jonggaBlacklistMap = map;
  return map;
}

// 수집 단계에서 검증돼 payload.blacklist 로 내려온 동적 블랙리스트(확정분만 제외 대상).
function setJonggaPayloadBlacklist(records) {
  const map = new Map();
  (Array.isArray(records) ? records : []).forEach(record => {
    if (!record || typeof record !== 'object') return;
    if (String(record.status || 'confirmed') !== 'confirmed') return;
    const code = normalizeJonggaBlacklistCode(record.code);
    if (!code) return;
    const reasons = (Array.isArray(record.reasons) ? record.reasons : [])
      .map(reason => String(reason).trim())
      .filter(reason => JONGGA_BLACKLIST_REASONS.includes(reason));
    map.set(code, { code, name: String(record.name || '').trim(), reasons });
  });
  globalThis.__jonggaPayloadBlacklistMap = map;
  return map;
}

function getJonggaPayloadBlacklistMap() {
  return globalThis.__jonggaPayloadBlacklistMap instanceof Map
    ? globalThis.__jonggaPayloadBlacklistMap
    : new Map();
}

function getJonggaBlacklistEntry(code) {
  const normalized = normalizeJonggaBlacklistCode(code);
  if (!normalized) return null;
  return getJonggaBlacklistMap().get(normalized) || getJonggaPayloadBlacklistMap().get(normalized) || null;
}

function isJonggaBlacklisted(code) {
  const normalized = normalizeJonggaBlacklistCode(code);
  if (!normalized) return false;
  return getJonggaBlacklistMap().has(normalized) || getJonggaPayloadBlacklistMap().has(normalized);
}

function getJonggaBlacklistReasons(code) {
  const normalized = normalizeJonggaBlacklistCode(code);
  if (!normalized) return [];
  const manual = getJonggaBlacklistMap().get(normalized);
  const dynamic = getJonggaPayloadBlacklistMap().get(normalized);
  const reasons = [];
  [...(manual ? manual.reasons : []), ...(dynamic ? dynamic.reasons : [])].forEach(reason => {
    if (!reasons.includes(reason)) reasons.push(reason);
  });
  return reasons;
}

function getJonggaBlacklistEntryCode(entry) {
  if (typeof getJonggaCode === 'function') return getJonggaCode(entry);
  return String(entry?.code || entry?.ticker || entry?.symbol || '').trim();
}

function filterJonggaBlacklistedEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return entries.filter(entry => !isJonggaBlacklisted(getJonggaBlacklistEntryCode(entry)));
}
