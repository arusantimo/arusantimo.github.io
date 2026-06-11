function computeEntryEligibility(strategy, grade, statusLabel, gates = [], filters = []) {
  const blockers = [];
  const allRows = [...(filters || []), ...(gates || [])];
  allRows.forEach(row => {
    if (row?.status === '⛔') {
      const code = row.code || '?';
      if (String(code).toUpperCase() === 'G5') blockers.push(`시장 Gate 차단: ${code} — 신규 진입 보류`);
      else blockers.push(`핵심 Gate 미충족: ${code}`);
    }
  });

  const label = String(statusLabel || '').trim();
  const gradeCode = String(grade || '').trim().charAt(0).toUpperCase();
  const normalizedStrategy = String(strategy || '').trim().toLowerCase();

  if (label.includes('매매금지')) {
    if (!blockers.some(item => item.includes('매매금지'))) blockers.push(label);
  } else if (label === '제외') {
    blockers.push('제외');
  }

  const minGrades = new Set(['S', 'A', 'B']);
  const gradeOk = minGrades.has(gradeCode);
  if (!gradeOk && gradeCode) {
    blockers.push(`등급 ${gradeCode} — 진입 최소 ${Array.from(minGrades).sort().join(', ')}`);
  }

  const buyStatus = label && !label.includes('매매금지') && label !== '제외'
    && ['강력매수', '매수추천', '최우선 진입', '진입 가능'].some(marker => label.includes(marker));
  const watchStatus = label.includes('관심후보') && !label.includes('매매금지');

  const conditionalPullbackB = normalizedStrategy === 'pullback' && gradeCode === 'B' && watchStatus;
  const entryEligible = !blockers.length && gradeOk && (buyStatus || conditionalPullbackB);
  const entryWatch = !entryEligible && !blockers.length && gradeCode === 'B' && watchStatus;

  return { entryEligible, entryWatch, entryBlockers: blockers };
}

function getBlockedEntryRows(entry = {}) {
  return [...(entry.filters || []), ...(entry.gates || [])].filter(row => row?.status === '⛔');
}

function parseSignedScore(text) {
  const value = Number.parseFloat(String(text || '').replace(/점/g, '').replace(/\+/g, '').trim());
  return Number.isFinite(value) ? value : 0;
}

function compactGapIndicatorName(name) {
  const map = {
    'NQ 선물 변화율': 'NQ',
    'VIX 수준': 'VIX',
    '미국 10년 금리 전일비': '미 10년물',
    '원달러 환율 변화': '원달러',
    'SOX 전일 변화율': 'SOX'
  };
  const text = String(name || '').trim();
  return map[text] || text;
}

function buildGapStatusReason(gapScore = {}, short = false) {
  const code = String(gapScore.code || gapScore.grade || 'G-E').trim();
  const totalScore = String(gapScore.totalScore || '').trim();
  const negativeRows = (gapScore.rows || [])
    .filter(row => parseSignedScore(row?.weightedScore) < 0)
    .sort((left, right) => parseSignedScore(left?.weightedScore) - parseSignedScore(right?.weightedScore));
  const topRows = negativeRows.slice(0, short ? 2 : 4);
  const factors = topRows
    .map(row => `${compactGapIndicatorName(row?.indicator)} ${String(row?.actualValue || '').trim()}`)
    .filter(Boolean)
    .join(', ');
  if (short) {
    return factors
      ? `갭 스코어 ${code} ${totalScore}: ${factors}`
      : `갭 스코어 ${code} ${totalScore}: 실시간 리스크 확대`;
  }
  return factors
    ? `갭 스코어 ${code} (${totalScore})로 신규 진입 금지입니다. ${factors} 악화가 동시에 확인됐습니다.`
    : `갭 스코어 ${code} (${totalScore})로 신규 진입 금지입니다.`;
}

function buildBlockedGateStatusReason(entry = {}, short = false) {
  const blockedRows = getBlockedEntryRows(entry);
  if (!blockedRows.length) return '';
  if (short) {
    const primary = blockedRows[0];
    const code = String(primary?.code || '?').trim();
    const note = String(primary?.note || '세부 조건 미충족').trim();
    const extra = blockedRows.length > 1 ? ` · 외 ${blockedRows.length - 1}건` : '';
    return `${code} 미충족: ${note}${extra}`;
  }
  const parts = blockedRows.slice(0, 3).map(row => {
    const code = String(row?.code || '?').trim();
    const note = String(row?.note || '세부 조건 미충족').trim();
    return `${code} 미충족: ${note}`;
  });
  if (blockedRows.length > 3) parts.push(`외 ${blockedRows.length - 3}건`);
  return parts.join(' / ');
}

function buildEntryStatusReason(entry = {}, context = {}, short = false) {
  const label = String(entry?.statusLabel || '').trim();
  if (!label) return '';
  if (label.includes('갭다운 경고')) return buildGapStatusReason(context?.gapScore || {}, short);
  if (label.includes('갭다운 주의')) {
    const reason = buildGapStatusReason(context?.gapScore || {}, short);
    return reason ? reason.replace('금지', '보류') : '갭다운 리스크로 신규 진입을 보류합니다.';
  }
  if (label.includes('핵심 Gate 미충족') || getBlockedEntryRows(entry).length) return buildBlockedGateStatusReason(entry, short);
  if (label.includes('시장 Gate 차단')) {
    const marketGate = getBlockedEntryRows(entry).find(row => String(row?.code || '').trim().toUpperCase() === 'G5');
    return marketGate
      ? `G5 경고: ${String(marketGate.note || '시장 변동성 경고').trim()}`
      : '시장 환경 경고로 신규 진입을 보류합니다.';
  }
  if (label.includes('약세장')) return '적용 레짐이 약세장으로 판정돼 신규 진입을 보류합니다.';
  if (label === '제외') return '점수 또는 핵심 조건 우선순위가 낮아 제외됐습니다.';
  return '';
}

function attachEntryStatusReason(entry = {}, context = {}) {
  const computedShort = buildEntryStatusReason(entry, context, true);
  const computedFull = buildEntryStatusReason(entry, context, false);
  const explicitShort = String(entry.statusReasonShort || '').trim();
  const explicitFull = String(entry.statusReason || '').trim();
  return {
    ...entry,
    statusReasonShort: computedShort || explicitShort,
    statusReason: computedFull || explicitFull
  };
}

function attachEntryEligibility(entry = {}, context = {}) {
  if (typeof entry.entryEligible === 'boolean') {
    return attachEntryStatusReason({
      ...entry,
      entryWatch: Boolean(entry.entryWatch),
      entryBlockers: Array.isArray(entry.entryBlockers) ? entry.entryBlockers : []
    }, context);
  }
  const eligibility = computeEntryEligibility(
    entry.strategy,
    entry.grade,
    entry.statusLabel,
    entry.gates || [],
    entry.filters || []
  );
  return attachEntryStatusReason({ ...entry, ...eligibility }, context);
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
