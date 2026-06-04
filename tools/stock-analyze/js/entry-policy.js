function computeEntryEligibility(strategy, grade, statusLabel, gates = [], filters = []) {
  const blockers = [];
  const allRows = [...(filters || []), ...(gates || [])];
  allRows.forEach(row => {
    if (row?.status === '⛔') {
      blockers.push(`핵심 Gate 미충족: ${row.code || '?'}`);
    }
  });

  const label = String(statusLabel || '').trim();
  const gradeCode = String(grade || '').trim().charAt(0).toUpperCase();

  if (label.includes('매매금지')) {
    if (!blockers.some(item => item.includes('매매금지'))) blockers.push(label);
  } else if (label === '제외') {
    blockers.push('제외');
  }

  const minGrades = new Set(['S', 'A']);
  const gradeOk = minGrades.has(gradeCode);
  if (!gradeOk && gradeCode) {
    blockers.push(`등급 ${gradeCode} — 진입 최소 A, S`);
  }

  const buyStatus = label && !label.includes('매매금지') && label !== '제외'
    && ['강력매수', '매수추천', '최우선 진입', '진입 가능'].some(marker => label.includes(marker));
  const watchStatus = label.includes('관심후보') && !label.includes('매매금지');

  const entryEligible = !blockers.length && gradeOk && buyStatus;
  const entryWatch = !entryEligible && !blockers.length && gradeCode === 'B' && watchStatus;

  return { entryEligible, entryWatch, entryBlockers: blockers };
}

function attachEntryEligibility(entry = {}) {
  if (typeof entry.entryEligible === 'boolean') {
    return {
      ...entry,
      entryWatch: Boolean(entry.entryWatch),
      entryBlockers: Array.isArray(entry.entryBlockers) ? entry.entryBlockers : []
    };
  }
  const eligibility = computeEntryEligibility(
    entry.strategy,
    entry.grade,
    entry.statusLabel,
    entry.gates || [],
    entry.filters || []
  );
  return { ...entry, ...eligibility };
}

function inferEntryEligibilityFromEntry(entry = {}) {
  if (typeof entry.entryEligible === 'boolean') {
    return {
      entryEligible: entry.entryEligible,
      entryWatch: Boolean(entry.entryWatch),
      entryBlockers: Array.isArray(entry.entryBlockers) ? entry.entryBlockers : []
    };
  }
  return computeEntryEligibility(
    entry.strategy,
    entry.grade,
    entry.statusLabel,
    entry.gates || [],
    entry.filters || []
  );
}

function formatEntryEligibilityBadge(entry = {}) {
  const { entryEligible, entryWatch } = inferEntryEligibilityFromEntry(entry);
  if (entryEligible) return { text: '진입 가능', cls: 'entry-ok' };
  if (entryWatch) return { text: '관망(익일)', cls: 'entry-watch' };
  return { text: '진입 불가', cls: 'entry-blocked' };
}


function buildBuyScoreDisplayHtml(entry = {}, presentation = {}) {
  const signal = Number.isFinite(Number(entry.signalScore))
    ? Number(entry.signalScore)
    : (Number.isFinite(Number(presentation.strategyScore)) ? Number(presentation.strategyScore) : null);
  const strict = Number.isFinite(Number(entry.strictScore)) ? Number(entry.strictScore) : null;
  const max = Number(entry.scoreMax) || 10;
  const signalText = typeof getBuyDisplayScore === 'function'
    ? getBuyDisplayScore(entry, signal)
    : (signal === null ? '미산출' : String(signal));
  const suffix = signal === null ? '' : ` / ${max}`;
  const strictLine = strict !== null && signal !== null && Math.abs(strict - signal) >= 0.05
    ? `<div class="buy-score-sub">진입 기준 ${typeof getBuyDisplayScore === 'function' ? getBuyDisplayScore(entry, strict) : strict} · 등급 ${escapeHtml(presentation.strategyGrade || entry.grade || '-')}</div>`
    : (strict !== null
      ? `<div class="buy-score-sub">진입 기준 ${typeof getBuyDisplayScore === 'function' ? getBuyDisplayScore(entry, strict) : strict} · 등급 ${escapeHtml(presentation.strategyGrade || entry.grade || '-')}</div>`
      : '');
  const badge = formatEntryEligibilityBadge(entry);
  const badgeHtml = `<span class="buy-entry-badge ${badge.cls}">${escapeHtml(badge.text)}</span>`;
  return { signalText: `${signalText}${suffix}`, strictLine, badgeHtml, max };
}

function renderBuyScoreBreakdownTable(entry = {}) {
  const rows = Array.isArray(entry.scoreBreakdown) ? entry.scoreBreakdown : [];
  if (!rows.length) return '';
  return `
    <table class="guide-table compact-table">
      <thead><tr><th>코드</th><th>신호</th><th>진입(엄격)</th><th>만점</th><th>비고</th></tr></thead>
      <tbody>
        ${rows.map(row => `<tr>
          <td>${escapeHtml(row.code || '')}</td>
          <td>${escapeHtml(String(row.signalPoints ?? ''))}</td>
          <td>${escapeHtml(String(row.strictPoints ?? ''))}</td>
          <td>${escapeHtml(String(row.maxPoints ?? ''))}</td>
          <td>${escapeHtml(String(row.note || ''))}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  `;
}
