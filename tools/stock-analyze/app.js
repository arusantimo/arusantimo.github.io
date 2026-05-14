// CORS Proxy to bypass Naver's block (여러 개의 프록시 서버를 두어 안정성을 높임)
const PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?'
];

const RULE_GUIDE = {
  regimes: [
    {
      state: '강세장 ✅',
      condition: 'KOSPI 60일선 우상향 + VKOSPI < 20',
      pullback: '풀가동',
      momentum: '풀가동'
    },
    {
      state: '박스권 ⚠️',
      condition: '60일선 횡보 OR VKOSPI 20~30',
      pullback: '보수적',
      momentum: '우선'
    },
    {
      state: '약세장 ⛔',
      condition: '60일선 하락 OR VKOSPI > 30',
      pullback: '매우보수적',
      momentum: '매우보수적'
    }
  ],
  grades: [
    { grade: 'S', score: '9.0 ~ 10점', meaning: '레짐 무관 진입 가능' },
    { grade: 'A', score: '7.5 ~ 8.9점', meaning: '강세장·박스권 진입 가능' },
    { grade: 'B', score: '6.0 ~ 7.4점', meaning: '매매 금지, 익일 재평가' },
    { grade: 'C', score: '6.0점 미만', meaning: '출력 목록에서 제외' }
  ],
  permissions: [
    { regime: '강세장', s: '✅ 100% 진입', a: '✅ 100% 진입', b: '👀 모니터링' },
    { regime: '박스권', s: '✅ 70% 진입', a: '✅ 70% 진입', b: '👀 모니터링' },
    { regime: '약세장', s: '✅ 50% 진입', a: '❌ 매매금지', b: '👀 모니터링' }
  ],
  vkospiAdjustments: [
    { range: '< 20', rule: '보정 없음' },
    { range: '20 ~ 30', rule: '원점수 × 0.9' },
    { range: '> 30', rule: '원점수 × 0.8' }
  ],
  strategies: {
    pullback: {
      gates: [
        { code: 'G1', condition: '동적 정배열: 5MA > 20MA > 60MA이면서 세 MA 모두 5일 변화율 > 0', source: '네이버 증권 일봉 차트' },
        { code: 'G2', condition: '종가 > 60일선', source: '네이버 증권 일봉 차트' },
        { code: 'G3', condition: '주봉 RSI(14) ≥ 50', source: '네이버 증권 주봉 차트' },
        { code: 'G4', condition: '일봉 MACD 히스토그램이 음전환 후 3일 이내 OR 0선 위 회복 시도 중', source: '네이버 증권 일봉 차트' },
        { code: 'G5', condition: 'KOSPI 5일선 위 + VKOSPI 수준 확인 → 점수 보정 적용', source: '네이버 증권 시장지표' }
      ],
      scores: [
        { code: 'S1', condition: '최근 2주 내 거래대금 30위권 진입 이력 3회 이상', source: '네이버 증권' },
        { code: 'S2', condition: '당일 외국인 OR 기관 순매수 전환 확인', source: '네이버 증권' },
        { code: 'P1', condition: '단기 고점 대비 -7% ~ -15% 조정', source: '네이버 증권' },
        { code: 'P2', condition: '당일 종가가 5일/10일/20일선 중 최소 1개 위', source: '네이버 증권' },
        { code: 'C1', condition: '양봉 OR 아래꼬리:몸통 비율 ≥ 1:1', source: '네이버 증권' },
        { code: 'C2', condition: '당일 거래량이 5일 평균의 100 ~ 180%', source: '네이버 증권' },
        { code: 'C3', condition: '해당 섹터 지수가 코스피 대비 당일 outperform', source: '네이버 증권' }
      ]
    },
    momentum: {
      gates: [
        { code: 'G1', condition: 'RS 상위 10% 이내', source: '네이버 증권' },
        { code: 'G2', condition: '5일 초과수익률 > 0 AND 20일 초과수익률 > 0', source: '네이버 증권' },
        { code: 'G3', condition: '52주 고점의 92% 이상 위치 OR 52주 신고가 갱신', source: '네이버 증권' },
        { code: 'G4', condition: '당일 거래대금 30위 이내', source: '네이버 증권' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 + 기관 동시 순매수', source: '네이버 증권' },
        { code: 'S2', condition: '분당 체결강도 평균 ≥ 100%가 장중 70% 이상 유지 + 당일 체결강도 평균 ≥ 110%', source: '토스 증권' },
        { code: 'P1', condition: '박스권 상단 OR 전고점 돌파 후 +5% 이내 자리', source: '네이버 증권' },
        { code: 'P2', condition: '돌파 당일 거래량이 20일 평균의 150% 이상', source: '네이버 증권' },
        { code: 'C1', condition: '종가 ≥ 당일 고가의 95%', source: '네이버 증권' },
        { code: 'C2', condition: '몸통이 전체 캔들의 70% 이상 + 윗꼬리 ≤ 몸통의 30%', source: '네이버 증권' },
        { code: 'C3', condition: '매수호가 잔량 : 매도호가 잔량 ≥ 1.2 : 1', source: '토스 증권' }
      ]
    }
  }
};

const STRATEGY_META = {
  pullback: {
    label: '📊 눌림목 종가베팅',
    shortLabel: '눌림목',
    noun: '눌림목 베팅'
  },
  momentum: {
    label: '🔥 수급 매집형 종가베팅 TOP',
    shortLabel: '수급 매집형',
    noun: '수급 매집형'
  }
};

let activeTab = 'buy';
let stocks = {
  pullback: [],
  momentum: []
};
let notionSnapshot = createEmptySnapshot();
const stockDetailMap = {};

function createEmptySnapshot() {
  return {
    regimeTable: [],
    regimeAlert: '',
    pullbackEntries: [],
    momentumEntries: [],
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

function extractFirstNumber(text) {
  const match = String(text ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function parseStockHeader(line, strategy) {
  const match = line.match(/^(\d+)위\.\s*([^()]+?)\s*\((\d{6})\)\s*[—-]\s*([\d.]+)\/10\s*\[([^\]]+)\]\s*[—-]\s*(.+)$/);
  if (!match) return null;
  return {
    rank: Number(match[1]),
    name: match[2].trim(),
    code: match[3],
    score: Number(match[4]),
    grade: match[5].trim(),
    statusLabel: match[6].trim(),
    strategy,
    type: strategy,
    gates: [],
    matchedRules: [],
    unmatchedRules: [],
    entryPriceText: '',
    entryPriceValue: null,
    entryMeta: '',
    rationale: '',
    keyPoint: '',
    rr: '',
    notes: [],
    tradePlanRows: []
  };
}

function parseGateTokens(text) {
  const matches = [...text.matchAll(/(G\d)\s*(✅|⚠️|⛔)?(?:\(([^)]*)\))?/g)];
  return matches.map(match => ({
    code: match[1],
    status: match[2] || '미상',
    note: match[3]?.trim() || ''
  }));
}

function parseRuleCodes(segment) {
  return String(segment ?? '')
    .split(/[·,]/)
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => {
      const codeMatch = item.match(/([SPCG]\d)/);
      return {
        code: codeMatch ? codeMatch[1] : item,
        note: item.replace(/^([SPCG]\d)/, '').replace(/^[:(\s]+|[)\s]+$/g, '').trim()
      };
    });
}

function parseEntryMetaLine(entry, line) {
  if (line.startsWith('Gate:')) {
    entry.gates = parseGateTokens(line);
    return;
  }

  if (/^충족\s*:/.test(line)) {
    const normalized = line.replace(/미\s*충족/g, '미충족');
    const [matchedPart, unmatchedPart = ''] = normalized.split('/ 미충족:');
    entry.matchedRules = parseRuleCodes(matchedPart.replace(/^충족\s*:/, '').trim());
    entry.unmatchedRules = parseRuleCodes(unmatchedPart.trim());
    return;
  }

  if (/^진입\s*가\s*:/.test(line)) {
    entry.entryPriceText = line.replace(/^진입\s*가\s*:/, '').trim();
    entry.entryPriceValue = extractFirstNumber(entry.entryPriceText);
    const metaMatch = entry.entryPriceText.match(/\(([^)]*)\)/);
    entry.entryMeta = metaMatch ? metaMatch[1].trim() : '';
    return;
  }

  if (line.startsWith('근거:')) {
    entry.rationale = line.replace('근거:', '').trim();
    return;
  }

  if (line.startsWith('핵심:')) {
    entry.keyPoint = line.replace('핵심:', '').trim();
    return;
  }

  if (line.startsWith('R/R:')) {
    entry.rr = line.replace('R/R:', '').trim();
    return;
  }

  entry.notes.push(line);
}

function parseMarkdownTable(lines, startIndex) {
  const tableLines = [];
  let index = startIndex;

  while (index < lines.length && /^\|/.test(lines[index])) {
    tableLines.push(lines[index]);
    index += 1;
  }

  if (tableLines.length < 2) {
    return { rows: [], nextIndex: startIndex };
  }

  const hasSeparatorRow = /^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(tableLines[1]);
  const rows = tableLines
    .filter((line, idx) => !(hasSeparatorRow && idx === 1))
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

  return { rows, nextIndex: index };
}

function flattenNotionBlocks(data) {
  const blockMap = new Map(
    Object.entries(data)
      .map(([id, wrapper]) => [id, wrapper?.value?.value])
      .filter(([, block]) => Boolean(block))
  );
  const pageEntry = [...blockMap.entries()].find(([, block]) => block.type === 'page');
  const ordered = [];
  const visited = new Set();

  function visitBlock(id) {
    if (!id || visited.has(id) || !blockMap.has(id)) return;
    visited.add(id);
    const block = blockMap.get(id);
    ordered.push(block);
    (block.content ?? []).forEach(visitBlock);
  }

  if (pageEntry) {
    const [pageId, pageBlock] = pageEntry;
    visited.add(pageId);
    ordered.push(pageBlock);
    (pageBlock.content ?? []).forEach(visitBlock);
  }

  blockMap.forEach((block, id) => {
    if (!visited.has(id)) ordered.push(block);
  });

  return ordered;
}

function buildSourceTextFromNotion(data) {
  const blocks = flattenNotionBlocks(data)
    .map(block => ({
      block,
      text: sanitizeText((block.properties?.title ?? []).map(t => t[0]).join('')),
      cells: Object.values(block.properties ?? {}).map(value => sanitizeText((value ?? []).map(item => item[0]).join(''))).filter(Boolean)
    }))
    .filter(item => item.text || item.block.type === 'table_row');

  const lines = [];
  let currentTableColumns = null;

  blocks.forEach(({ block, text, cells }) => {
    const heading = normalizeHeading(text);
    if (heading.includes('시장 레짐 요약')) {
      lines.push('## 시장 레짐 요약');
      return;
    }
    if (heading.includes('눌림목 종가베팅 TOP')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('수급 매집형 종가베팅 TOP')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.startsWith('내일(') || heading.includes('체크리스트')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('뉴스 인사이트')) {
      lines.push('## 뉴스 인사이트');
      return;
    }
    if (/^\d+위\./.test(text)) {
      lines.push(`### ${text}`);
      return;
    }
    if (block.type === 'table') {
      currentTableColumns = block.format?.table_block_column_order ?? null;
      return;
    }
    if (block.type === 'table_row') {
      const orderedCells = (currentTableColumns ?? Object.keys(block.properties ?? {}))
        .map(key => sanitizeText((block.properties?.[key] ?? []).map(item => item[0]).join('')))
        .filter(Boolean);
      lines.push(`| ${orderedCells.join(' | ')} |`);
      return;
    }
    if (block.type === 'divider') {
      currentTableColumns = null;
      return;
    }
    if (block.type === 'quote') {
      lines.push(`> ${text}`);
      return;
    }
    if (block.type === 'bulleted_list') {
      lines.push(`- ${text}`);
      return;
    }
    lines.push(text);
  });

  return lines.join('\n');
}

function parseNotionSnapshotFromText(sourceText) {
  const snapshot = createEmptySnapshot();
  snapshot.sourceText = sourceText;
  const lines = sanitizeText(sourceText).split('\n').map(line => line.trim()).filter(Boolean);

  let currentSection = '';
  let currentEntry = null;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith('## ')) {
      currentEntry = null;
      const heading = normalizeHeading(line.replace(/^##\s*/, ''));
      if (heading.includes('시장 레짐 요약')) {
        currentSection = 'regime';
      } else if (heading.includes('눌림목 종가베팅 TOP')) {
        currentSection = 'pullback';
      } else if (heading.includes('수급 매집형 종가베팅 TOP')) {
        currentSection = 'momentum';
      } else {
        currentSection = 'other';
      }
      index += 1;
      continue;
    }

    if (currentSection === 'regime' && /^\|/.test(line)) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) {
        snapshot.regimeTable = rows.slice(1).map(row => ({ item: row[0] || '', value: row[1] || '' }));
      }
      index = nextIndex;
      continue;
    }

    if (currentSection === 'regime' && line.startsWith('>')) {
      snapshot.regimeAlert = line.replace(/^>\s*/, '').trim();
      index += 1;
      continue;
    }

    if ((currentSection === 'pullback' || currentSection === 'momentum') && line.startsWith('### ')) {
      currentEntry = parseStockHeader(line.replace(/^###\s*/, '').trim(), currentSection);
      if (currentEntry) snapshot[`${currentSection}Entries`].push(currentEntry);
      index += 1;
      continue;
    }

    if (currentEntry && line.startsWith('|')) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) {
        const headerIndex = Object.fromEntries(rows[0].map((header, headerPosition) => [header.replace(/\s+/g, ''), headerPosition]));
        currentEntry.tradePlanRows = rows.slice(1).map(row => ({
          stage: row[headerIndex['단계']] || '',
          condition: row[headerIndex['조건']] || '',
          quantity: row[headerIndex['수량']] || '',
          targetYield: row[headerIndex['목표수익률']] || '',
          targetPrice: row[headerIndex['목표가']] || ''
        }));
      }
      index = nextIndex;
      continue;
    }

    if (currentEntry && (/^[-*>]/.test(line) || line.startsWith('R/R:'))) {
      parseEntryMetaLine(currentEntry, line.replace(/^[-*>]\s*/, '').trim());
    }

    index += 1;
  }

  return snapshot;
}

function rebuildSellStocksFromSnapshot() {
  const manualPullback = stocks.pullback.filter(stock => stock.manual);
  const manualMomentum = stocks.momentum.filter(stock => stock.manual);

  stocks.pullback = [
    ...notionSnapshot.pullbackEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'pullback', strategy: 'pullback', source: 'notion' })),
    ...manualPullback.filter(stock => !notionSnapshot.pullbackEntries.some(entry => entry.code === stock.code))
  ];

  stocks.momentum = [
    ...notionSnapshot.momentumEntries.map(entry => ({ name: entry.name, code: entry.code, type: 'momentum', strategy: 'momentum', source: 'notion' })),
    ...manualMomentum.filter(stock => !notionSnapshot.momentumEntries.some(entry => entry.code === stock.code))
  ];
}

function getEntryByCode(code) {
  return [...notionSnapshot.pullbackEntries, ...notionSnapshot.momentumEntries].find(entry => entry.code === code);
}

function summarizeGateStatus(entry) {
  const passed = entry.gates.filter(gate => gate.status === '✅').length;
  const warned = entry.gates.filter(gate => gate.status === '⚠️').length;
  const blocked = entry.gates.filter(gate => gate.status === '⛔').length;
  return { passed, warned, blocked, total: entry.gates.length };
}

function getBuyVerdictClass(entry) {
  if (entry.grade.startsWith('S')) return 'strong';
  if (entry.grade.startsWith('A')) return 'good';
  if (entry.grade.startsWith('B')) return 'watch';
  return 'exclude';
}

function renderRegimeSummary() {
  const container = document.getElementById('buy-regime-summary');
  if (!container) return;

  if (!notionSnapshot.regimeTable.length) {
    container.innerHTML = '<div class="empty-state">노션에서 시장 레짐 요약을 불러오면 여기에 표시됩니다.</div>';
    return;
  }

  container.innerHTML = `
    <div class="regime-summary-grid">
      ${notionSnapshot.regimeTable.map(row => `
        <div class="regime-stat-card">
          <div class="regime-stat-label">${escapeHtml(row.item)}</div>
          <div class="regime-stat-value">${escapeHtml(row.value)}</div>
        </div>
      `).join('')}
    </div>
    ${notionSnapshot.regimeAlert ? `<div class="regime-alert">${escapeHtml(notionSnapshot.regimeAlert)}</div>` : ''}
  `;
}

function renderGuideTables() {
  document.getElementById('guide-regime-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>상태</th><th>조건</th><th>눌림목</th><th>수급매집형</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.regimes.map(row => `<tr><td>${escapeHtml(row.state)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.pullback)}</td><td>${escapeHtml(row.momentum)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-grade-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>등급</th><th>점수</th><th>의미</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.grades.map(row => `<tr><td>${escapeHtml(row.grade)}</td><td>${escapeHtml(row.score)}</td><td>${escapeHtml(row.meaning)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-permission-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>레짐</th><th>S (9.0+)</th><th>A (7.5~8.9)</th><th>B (6.0~7.4)</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.permissions.map(row => `<tr><td>${escapeHtml(row.regime)}</td><td>${escapeHtml(row.s)}</td><td>${escapeHtml(row.a)}</td><td>${escapeHtml(row.b)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('guide-adjust-table').innerHTML = `
    <table class="guide-table">
      <thead><tr><th>VKOSPI</th><th>최종 점수 보정</th></tr></thead>
      <tbody>
        ${RULE_GUIDE.vkospiAdjustments.map(row => `<tr><td>${escapeHtml(row.range)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function renderSellStockCards() {
  const renderGroup = (arr, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!arr.length) {
      container.innerHTML = '<div class="empty-state">추출된 종목이 없습니다.</div>';
      return;
    }

    arr.forEach(stock => {
      container.innerHTML += `
        <div class="scard" id="card-${stock.code}">
          <div class="scard-head">
            <div>
              <div class="scard-name">${escapeHtml(stock.name)}</div>
              <div class="scard-code">${escapeHtml(stock.code)}</div>
            </div>
            <span class="badge badge-pending" id="badge-${stock.code}">대기 중</span>
          </div>
          <div class="price-row" id="price-row-${stock.code}">
            <span class="price placeholder-price">대기 중</span>
          </div>
          <div class="meta" id="meta-${stock.code}">매수가(전일종가): 대기 중</div>
          <div class="indicators" id="ind-${stock.code}">
            <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
      `;
    });
  };

  renderGroup(stocks.pullback, 'list-pullback');
  renderGroup(stocks.momentum, 'list-momentum');
}

function renderBuyStockCards() {
  const renderGroup = (entries, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">노션에서 불러온 매수 후보가 없습니다.</div>';
      return;
    }

    entries.forEach(entry => {
      const gateSummary = summarizeGateStatus(entry);
      const verdictClass = getBuyVerdictClass(entry);
      const rationale = entry.keyPoint || entry.rationale || entry.notes[0] || '세부 판단은 상세 보기에서 확인하세요.';
      container.innerHTML += `
        <div class="buy-card ${verdictClass}" data-code="${entry.code}">
          <div class="buy-card-head">
            <div>
              <div class="buy-card-rank">${entry.rank}위 · ${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</div>
              <div class="buy-card-name">${escapeHtml(entry.name)}</div>
              <div class="buy-card-code">${escapeHtml(entry.code)}</div>
            </div>
            <div class="buy-card-scorebox">
              <div class="buy-score">${entry.score.toFixed(1)}</div>
              <div class="buy-grade">${escapeHtml(entry.grade)}</div>
            </div>
          </div>
          <div class="buy-card-status">${escapeHtml(entry.statusLabel)}</div>
          <div class="buy-card-tags">
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          <div class="buy-card-footer">
            <span>${formatWon(entry.entryPriceValue)}</span>
            <span>R/R ${escapeHtml(entry.rr || '미기재')}</span>
          </div>
        </div>
      `;
    });

    container.querySelectorAll('.buy-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.code, 'buy'));
    });
  };

  renderGroup(notionSnapshot.pullbackEntries, 'buy-list-pullback');
  renderGroup(notionSnapshot.momentumEntries, 'buy-list-momentum');
}

function renderAll() {
  renderRegimeSummary();
  renderGuideTables();
  renderBuyStockCards();
  renderSellStockCards();
  updateAnalyzeButtonState();
  updateTabUI();
}

function updateAnalyzeButtonState() {
  const analyzeBtn = document.getElementById('btn-analyze');
  const hasSellStocks = stocks.pullback.length > 0 || stocks.momentum.length > 0;
  analyzeBtn.disabled = activeTab !== 'sell' || !hasSellStocks;
}

function updateCurrentTime() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore = totalMins < (9 * 60 + 8);
  const label = isBefore ? '[1차 분석] 9:08 이전 (수급 매집형 손절 점검)' : '[2차 분석] 9:08 이후 (전체 매도/손절 분석)';
  const el = document.getElementById('current-time-display');
  if (el) {
    el.innerHTML = activeTab === 'sell'
      ? `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; 적용 로직: <strong style="color:${isBefore ? 'var(--text-warning)' : 'var(--text-success)'}">${label}</strong>`
      : '🧭 매수 탭은 노션에 정리된 점수, 등급, Gate 충족 여부를 그대로 해석합니다.';
  }

  const analyzeBtn = document.getElementById('btn-analyze');
  if (analyzeBtn && !analyzeBtn.disabled && activeTab === 'sell') {
    const btnText = analyzeBtn.innerHTML.includes('다시') ? '다시 분석' : '분석 시작';
    analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${btnText}`;
  }
}

function setActiveTab(tab) {
  activeTab = tab;
  updateTabUI();
  updateAnalyzeButtonState();
  updateCurrentTime();
}

function updateTabUI() {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.tabPanel === activeTab);
  });

  const buyGuideButton = document.getElementById('btn-buy-guide');
  if (buyGuideButton) {
    buyGuideButton.classList.toggle('is-hidden', activeTab !== 'buy');
  }
}

function openGuideModal() {
  document.getElementById('guide-modal-overlay').classList.add('open');
}

function closeGuideModal() {
  document.getElementById('guide-modal-overlay').classList.remove('open');
}

async function fetchNotionData() {
  const urlInput = document.getElementById('notion-url').value;
  const matchId = urlInput.replace(/-/g, '').match(/[a-f0-9]{32}/i);
  if (!matchId) {
    alert('유효한 노션 주소 또는 페이지 ID를 입력해주세요.');
    return;
  }

  const notionId = matchId[0];
  const apiUrl = `https://notion-api.splitbee.io/v1/page/${notionId}`;
  localStorage.setItem('savedNotionUrl', urlInput);

  log(`노션(Notion) 공용 페이지(${notionId.substring(0, 6)}...) 파싱 중입니다...`);
  const btn = document.getElementById('btn-fetch-notion');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> 파싱 중...';

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Notion API fetch failed');
    const data = await res.json();
    const sourceText = buildSourceTextFromNotion(data);
    notionSnapshot = parseNotionSnapshotFromText(sourceText);
    rebuildSellStocksFromSnapshot();
    renderAll();

    const totalBuy = notionSnapshot.pullbackEntries.length + notionSnapshot.momentumEntries.length;
    log(`성공적으로 불러왔습니다. (시장 레짐 ${notionSnapshot.regimeTable.length}개 항목, 매수 후보 ${totalBuy}개)`);
    if (!totalBuy) {
      log('<span style="color:var(--text-warning)">경고: 전략별 종목 상세를 찾지 못했습니다. 노션 섹션 제목 형식이 바뀌었는지 확인해주세요.</span>');
    }
  } catch (error) {
    log('<span style="color:var(--text-danger)">오류: 노션 데이터를 파싱하는 데 실패했습니다. 올바른 공개 페이지인지 확인해주세요.</span>');
    console.error(error);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '불러오기';
    updateCurrentTime();
  }
}

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
document.getElementById('btn-buy-guide').addEventListener('click', openGuideModal);

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

document.getElementById('btn-analyze').addEventListener('click', async () => {
  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore0908 = totalMins < (9 * 60 + 8);
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const btn = document.getElementById('btn-analyze');
  btn.disabled = true;
  btn.innerHTML = '<span>⚡</span> 분석 진행 중...';

  log(`▶ [현재 시각: ${timeStr}] 분석을 시작합니다. (9시 8분 <b>${isBefore0908 ? '이전' : '이후'}</b> 로직 적용)`);

  const allStocks = [...stocks.pullback, ...stocks.momentum];
  for (const stock of allStocks) {
    await analyzeStock(stock, isBefore0908);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  log('✅ 모든 종목의 시그널 분석이 완료되었습니다.');
  btn.disabled = false;
  btn.innerHTML = '<span>⚡</span> 다시 분석';
  updateAnalyzeButtonState();
  updateCurrentTime();
});

async function analyzeStock(stock, isBefore0908) {
  log(`- [${stock.name}] 네이버 증권 데이터 파싱 중...`);
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      const proxy = PROXIES[(attempt - 1) % PROXIES.length];
      const basicUrl = `https://m.stock.naver.com/api/stock/${stock.code}/basic`;
      const basicRes = await fetch(proxy + encodeURIComponent(basicUrl));
      if (!basicRes.ok) throw new Error(`basic API error (${basicRes.status})`);
      const basicJson = await basicRes.json();

      const parseNum = value => parseInt(String(value).replace(/,/g, ''), 10) || 0;
      const parseFloat2 = value => parseFloat(String(value).replace(/,/g, '').replace('%', '')) || 0;

      const currentPrice = parseNum(basicJson.closePrice ?? basicJson.stockPrice ?? 0);
      const chgRateRaw = parseFloat2(basicJson.fluctuationsRatio ?? basicJson.changeRate ?? 0);

      const intUrl = `https://m.stock.naver.com/api/stock/${stock.code}/integration`;
      const intRes = await fetch(proxy + encodeURIComponent(intUrl));
      if (!intRes.ok) throw new Error(`integration API error (${intRes.status})`);
      const intJson = await intRes.json();

      const findInfo = code => (intJson.totalInfos ?? []).find(info => info.code === code);
      const prevClose = parseNum(findInfo('lastClosePrice')?.value ?? 0) || currentPrice;
      const openPrice = parseNum(findInfo('openPrice')?.value ?? 0);
      const chgRate = chgRateRaw !== 0 ? chgRateRaw : (prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0);
      const strength = null;
      const deals = intJson.dealTrendInfos ?? [];
      const pastPrices = deals.map(deal => parseNum(deal.closePrice ?? 0)).filter(price => price > 0);
      const ma5 = pastPrices.length >= 5
        ? Math.round(pastPrices.slice(0, 5).reduce((acc, price) => acc + price, 0) / 5)
        : 0;

      const data = { currentPrice, prevClose, openPrice, chgRate, strength, ma5 };
      log(`- [${stock.name}] 완료. (현재가: ${data.currentPrice.toLocaleString()}, 등락률: ${data.chgRate.toFixed(2)}%, 시가: ${data.openPrice.toLocaleString()}, 전일종가: ${data.prevClose.toLocaleString()}, 5일MA: ${ma5.toLocaleString()}원)`);
      applyRules(stock, data, isBefore0908);
      return;
    } catch (error) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${stock.name}] 통신 지연 (${attempt}회 실패). 다른 우회 서버로 재시도합니다...</span>`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        log(`<span style="color:var(--text-danger)">- [${stock.name}] 데이터 수집 최종 실패</span>`);
        console.error(error);
        updateCardError(stock.code);
      }
    }
  }
}

function buildIndicators(stock, data, isBefore0908) {
  const indicators = [];
  let decision = 'hold';

  if (stock.type === 'momentum') {
    if (isBefore0908) {
      indicators.push({ title: '분석 단계', criterion: '9시 8분 이전: 수급 매집형 손절 점검 로직이 활성화됩니다.', status: 'unknown', result: '1차 분석 진행 중' });

      const openRecovered = data.currentPrice >= data.openPrice;
      indicators.push({
        title: '시초가 회복 여부',
        criterion: '장 시작 후 시초가를 강하게 회복하지 못하고 밀릴 때 손절/경계 신호입니다.\n기준: 현재가 < 시가',
        status: openRecovered ? 'clear' : 'triggered',
        result: openRecovered
          ? `시초가 대비 양호 (현재가 ${data.currentPrice.toLocaleString()} ≥ 시가 ${data.openPrice.toLocaleString()})`
          : `시초가 미회복 · 손절/경계 (현재가 ${data.currentPrice.toLocaleString()} < 시가 ${data.openPrice.toLocaleString()})`,
        value: `현재가 ${data.currentPrice.toLocaleString()} ${openRecovered ? '≥' : '<'} 시가 ${data.openPrice.toLocaleString()}`
      });
      if (!openRecovered) decision = 'caution';

      const belowPrevClose = data.currentPrice < data.prevClose;
      indicators.push({
        title: '전일종가(매수가) 이탈',
        criterion: '전일 종가(매수가)를 하향 이탈하면 즉각 손절을 권장합니다.\n기준: 현재가 < 전일종가',
        status: belowPrevClose ? 'triggered' : 'clear',
        result: belowPrevClose
          ? `전일종가 이탈! 즉각 손절 (현재가 ${data.currentPrice.toLocaleString()} < 전일종가 ${data.prevClose.toLocaleString()})`
          : `전일종가 위에서 유지 중 (현재가 ${data.currentPrice.toLocaleString()} ≥ 전일종가 ${data.prevClose.toLocaleString()})`,
        value: `현재가 ${data.currentPrice.toLocaleString()} / 전일종가 ${data.prevClose.toLocaleString()} / 차이 ${(data.currentPrice - data.prevClose).toLocaleString()}원`
      });
      if (belowPrevClose) decision = 'sell';
    } else {
      indicators.push({ title: '분석 단계', criterion: '9시 8분 이후: 수급 매집형 매도·손절 전체 로직이 활성화됩니다.', status: 'unknown', result: '2차 분석 진행 중' });

      if (data.strength) {
        const weakStrength = data.strength < 100;
        indicators.push({
          title: '체결강도',
          criterion: '체결강도가 100% 미만이면 메이저 설거지(매도) 가능성이 있으며 전량 익절/매도를 고려합니다.\n기준: 체결강도 < 100%',
          status: weakStrength ? 'triggered' : 'clear',
          result: weakStrength
            ? `체결강도 ${data.strength.toFixed(2)}% — 메이저 설거지 가능성 (전량 익절/매도)`
            : `체결강도 ${data.strength.toFixed(2)}% — 매수세 양호 (홀딩 대기)`,
          value: `체결강도 ${data.strength.toFixed(2)}% (기준: 100%)`
        });
        if (weakStrength) decision = 'sell';
      } else {
        indicators.push({ title: '체결강도', criterion: '체결강도가 100% 미만이면 메이저 설거지 가능성이 있습니다.', status: 'unknown', result: '체결강도 데이터 없음' });
      }

      const belowPrevClose2 = data.currentPrice < data.prevClose;
      indicators.push({
        title: '전일종가(매수가) 이탈',
        criterion: '전일 종가(매수가)를 하향 이탈하면 즉각 손절을 권장합니다.\n기준: 현재가 < 전일종가',
        status: belowPrevClose2 ? 'triggered' : 'clear',
        result: belowPrevClose2
          ? `전일종가 이탈! 즉각 손절 (현재가 ${data.currentPrice.toLocaleString()} < 전일종가 ${data.prevClose.toLocaleString()})`
          : `전일종가 위에서 유지 중 (현재가 ${data.currentPrice.toLocaleString()} ≥ 전일종가 ${data.prevClose.toLocaleString()})`
      });
      if (belowPrevClose2) decision = 'sell';
    }
  } else if (stock.type === 'pullback') {
    if (isBefore0908) {
      indicators.push({ title: '분석 단계', criterion: '눌림목 베팅은 9시 8분 이후에 매도/손절 분석이 시작됩니다.\n현재는 대기 상태입니다.', status: 'unknown', result: '1차: 눌림목 베팅 분석 대기 중 (9:08 이후 시작)' });
      decision = 'hold';
    } else {
      indicators.push({ title: '분석 단계', criterion: '9시 8분 이후: 눌림목 베팅 매도·손절 전체 로직이 활성화됩니다.', status: 'unknown', result: '2차 분석 진행 중' });

      if (data.openPrice > 0 && data.prevClose > 0) {
        const gapRate = ((data.openPrice - data.prevClose) / data.prevClose) * 100;
        const isGapDown = gapRate <= -3;
        indicators.push({
          title: '[손절] 개파락 여부',
          criterion: '다음 날 시가가 전일 종가 대비 -3% 이상 낮게 시작(개파락)하는 경우 즉각 손절을 권장합니다.\n기준: (시가 - 전일종가) / 전일종가 ≤ -3%',
          status: isGapDown ? 'triggered' : 'clear',
          result: isGapDown ? `개파락 발생 (갭 ${gapRate.toFixed(2)}%) — 즉각 손절` : `갭 정상 (${gapRate.toFixed(2)}%) — 개파락 없음`,
          value: `(${data.openPrice.toLocaleString()} - ${data.prevClose.toLocaleString()}) / ${data.prevClose.toLocaleString()} = ${gapRate.toFixed(2)}% (기준: ≤ -3%)`
        });
        if (isGapDown) decision = 'sell';
      } else {
        indicators.push({ title: '[손절] 개파락 여부', criterion: '다음 날 시가가 전일 종가 대비 -3% 이상 낮게 시작(개파락)하는 경우 즉각 손절을 권장합니다.', status: 'unknown', result: '시가 또는 전일종가 데이터 없음 — 확인 불가' });
      }

      if (data.ma5 > 0 && data.currentPrice > 0) {
        const dropFromMA5 = ((data.currentPrice - data.ma5) / data.ma5) * 100;
        const isBelowMA5 = dropFromMA5 <= -2;
        indicators.push({
          title: '[손절] 5일 이동평균선 하탈',
          criterion: '5일 이동평균선 기준 -2% 이상 하탈 시 손절을 권장합니다.\n(최근 5영업일 종가 평균 사용)\n기준: (현재가 - 5일MA) / 5일MA <= -2%',
          status: isBelowMA5 ? 'triggered' : 'clear',
          result: isBelowMA5 ? `5일선(${data.ma5.toLocaleString()}원) 하탈 ${dropFromMA5.toFixed(2)}% — 손절 고려` : `5일선(${data.ma5.toLocaleString()}원) 위에서 유지 (${dropFromMA5.toFixed(2)}%)`,
          value: `(${data.currentPrice.toLocaleString()} - ${data.ma5.toLocaleString()}) / ${data.ma5.toLocaleString()} = ${dropFromMA5.toFixed(2)}% (기준: <= -2%)`
        });
        if (isBelowMA5) decision = 'sell';
      } else if (data.openPrice > 0 && data.currentPrice > 0) {
        const dropFromOpen = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
        const isBelowMA = dropFromOpen <= -2;
        indicators.push({
          title: '[손절] 이동평균선 하탈 (근사)',
          criterion: '5일선 데이터 미계산 — 시가 대비 -2% 이하 하락으로 MA 이탈을 근사합니다.\n기준: (현재가 - 시가) / 시가 <= -2%',
          status: isBelowMA ? 'triggered' : 'clear',
          result: isBelowMA ? `시가 대비 ${dropFromOpen.toFixed(2)}% 하탈 — MA 이탈 의심 (손절 고려)` : `시가 대비 ${dropFromOpen.toFixed(2)}% — MA 위에서 유지`,
          value: `(${data.currentPrice.toLocaleString()} - ${data.openPrice.toLocaleString()}) / ${data.openPrice.toLocaleString()} = ${dropFromOpen.toFixed(2)}% (기준: <= -2%)`
        });
        if (isBelowMA) decision = 'sell';
      } else {
        indicators.push({ title: '[손절] 이동평균선 하탈', criterion: '이동평균선(5일선)을 -2% 이상 하탈 시 손절을 권장합니다.', status: 'unknown', result: '가격 데이터 없음 — 확인 불가' });
      }

      if (data.strength) {
        const weakStr = data.strength < 80;
        indicators.push({
          title: '[손절] 외국인/기관 대량 매도 전환',
          criterion: '외국인/기관의 수급이 대량 매도로 전환될 때 손절을 고려합니다.\n체결강도 80% 미만이면 매도 전환을 의심합니다.\n기준: 체결강도 < 80%',
          status: weakStr ? 'triggered' : 'clear',
          result: weakStr ? `체결강도 ${data.strength.toFixed(2)}% — 대규모 매도 전환 의심 (손절 고려)` : `체결강도 ${data.strength.toFixed(2)}% — 정상 범위`,
          value: `체결강도 ${data.strength.toFixed(2)}% (기준: < 80%)`
        });
        if (weakStr) decision = 'sell';
      } else {
        indicators.push({ title: '[손절] 외국인/기관 대량 매도 전환', criterion: '외국인/기관의 수급이 대량 매도로 전환될 때 손절을 고려합니다.\n체결강도 80% 미만이면 매도 전환을 의심합니다.', status: 'unknown', result: '체결강도 데이터 없음 — 확인 불가' });
      }

      if (data.currentPrice > 0 && data.prevClose > 0) {
        const isStagnant = data.chgRate > -1.5 && data.chgRate < 1.5;
        const isStrong = data.chgRate >= 1.5;
        const mStatus = isStagnant ? 'triggered' : (isStrong ? 'clear' : 'unknown');
        const mResult = isStagnant
          ? `등락률 ${data.chgRate.toFixed(2)}% — 상승세 둔화/보합 (음봉 중간값·5일선 저항, 매도·익절 고려)`
          : isStrong
            ? `등락률 ${data.chgRate.toFixed(2)}% — 강한 상승세 유지 (+1.5% 이상, 홀딩)`
            : `등락률 ${data.chgRate.toFixed(2)}% — 하락 구간 (손절 조건 중복 확인)`;
        indicators.push({
          title: '[매도] 상승세 둔화 / 저항 구간',
          criterion: '전일 음봉의 중간값이나 5일 이동평균선에 닿으면서 상승세가 둔화될 때 매도/익절을 고려합니다.\n기준: -1.5% < 등락률 < +1.5%',
          status: mStatus,
          result: mResult,
          value: `등락률 = (${data.currentPrice.toLocaleString()} - ${data.prevClose.toLocaleString()}) / ${data.prevClose.toLocaleString()} = ${data.chgRate.toFixed(2)}% (기준: -1.5% ~ +1.5%)`
        });
        if (isStagnant && decision !== 'sell') decision = 'caution';
      } else {
        indicators.push({ title: '[매도] 상승세 둔화 / 저항 구간', criterion: '전일 음봉의 중간값이나 5일 이동평균선에 닿으면서 상승세가 둔화될 때 매도/익절을 고려합니다.', status: 'unknown', result: '현재가 또는 전일종가 데이터 없음 — 확인 불가' });
      }
    }
  }

  return { indicators, decision };
}

function applyRules(stock, data, isBefore0908) {
  const card = document.getElementById(`card-${stock.code}`);
  if (!card) return;
  const priceRow = document.getElementById(`price-row-${stock.code}`);
  const meta = document.getElementById(`meta-${stock.code}`);
  const indBox = document.getElementById(`ind-${stock.code}`);
  const badge = document.getElementById(`badge-${stock.code}`);

  const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg = Math.abs(data.chgRate).toFixed(2);

  priceRow.innerHTML = `
    <span class="price">${data.currentPrice.toLocaleString()}원</span>
    <span class="chg ${chgClass}" style="font-size:14px;font-weight:700">${chgPrefix}${absChg}%</span>
  `;
  meta.innerHTML = `
    <span style="opacity:0.7">매수가(전일가):</span> <strong>${data.prevClose.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">시가:</span> <strong>${data.openPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">체결강도:</span> <strong>${data.strength ? `${data.strength.toFixed(2)}%` : '-'}</strong>
  `;

  const { indicators, decision } = buildIndicators(stock, data, isBefore0908);
  indBox.innerHTML = indicators
    .filter(indicator => indicator.status !== 'unknown')
    .map(indicator => `<div class="ind-item ${indicator.status}">${indicator.title}: ${indicator.result}</div>`)
    .join('') || indicators.map(indicator => `<div class="ind-item ${indicator.status}">${indicator.result}</div>`).join('');

  card.className = `scard ${decision}`;
  if (decision === 'sell') {
    badge.className = 'badge badge-sell';
    badge.innerText = '매도/손절';
  } else if (decision === 'caution') {
    badge.className = 'badge badge-caution';
    badge.innerText = '주의/익절 검토';
  } else {
    badge.className = 'badge badge-hold';
    badge.innerText = '홀딩/양호';
  }

  stockDetailMap[stock.code] = { mode: 'sell', stock, data, indicators, decision, isBefore0908 };
  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
  newCard.addEventListener('click', () => openModal(stock.code, 'sell'));
}

function updateCardError(code) {
  const card = document.getElementById(`card-${code}`);
  const indBox = document.getElementById(`ind-${code}`);
  const badge = document.getElementById(`badge-${code}`);
  if (!card || !indBox || !badge) return;

  card.className = 'scard';
  badge.className = 'badge badge-pending';
  badge.innerText = '통신 오류';
  indBox.innerHTML = '<div class="ind-item unknown">네이버 증권 데이터를 가져오는 데 실패했습니다.<br>잠시 후 다시 시도해주세요.</div>';
}

function renderRuleMatchList(entry) {
  const scoreMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].scores.map(rule => [rule.code, rule]));
  const renderRule = (ruleInfo, matched) => {
    const guide = scoreMap[ruleInfo.code] || { condition: '', source: '' };
    const note = ruleInfo.note ? ` - ${ruleInfo.note}` : '';
    return `
      <div class="modal-ind-card ${matched ? 'clear' : 'triggered'}">
        <div class="modal-ind-icon">${matched ? '✅' : '⚠️'}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(ruleInfo.code)} ${matched ? '일치' : '불일치'}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(`${matched ? '노션 충족' : '노션 미충족'}${note}`)}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  };

  return [
    ...entry.matchedRules.map(rule => renderRule(rule, true)),
    ...entry.unmatchedRules.map(rule => renderRule(rule, false))
  ].join('');
}

function renderGateList(entry) {
  const guideMap = Object.fromEntries(RULE_GUIDE.strategies[entry.strategy].gates.map(gate => [gate.code, gate]));
  return entry.gates.map(gate => {
    const guide = guideMap[gate.code] || { condition: '', source: '' };
    const statusClass = gate.status === '✅' ? 'clear' : 'triggered';
    const statusLabel = gate.status === '✅' ? '통과' : gate.status === '⚠️' ? '경계' : '제외';
    return `
      <div class="modal-ind-card ${statusClass}">
        <div class="modal-ind-icon">${escapeHtml(gate.status || '➖')}</div>
        <div class="modal-ind-content">
          <div class="modal-ind-title">${escapeHtml(gate.code)} ${statusLabel}</div>
          <div class="modal-ind-criterion">${escapeHtml(guide.condition)}</div>
          <div class="modal-ind-result">→ ${escapeHtml(gate.note || '노션 기준 판정')}</div>
          ${guide.source ? `<div class="modal-ind-value">출처: ${escapeHtml(guide.source)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderTradePlanTable(entry) {
  if (!entry.tradePlanRows.length) {
    return '<div class="empty-state compact">매매 단계 정보가 없습니다.</div>';
  }

  return `
    <table class="guide-table compact-table">
      <thead><tr><th>단계</th><th>조건</th><th>수량</th><th>목표 수익률</th><th>목표가</th></tr></thead>
      <tbody>
        ${entry.tradePlanRows.map(row => `<tr><td>${escapeHtml(row.stage)}</td><td>${escapeHtml(row.condition)}</td><td>${escapeHtml(row.quantity)}</td><td>${escapeHtml(row.targetYield)}</td><td>${escapeHtml(row.targetPrice)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function openModal(code, mode = 'sell') {
  const detail = mode === 'buy' ? getEntryByCode(code) : stockDetailMap[code];
  if (!detail) return;
  const detailModal = document.getElementById('detail-modal');

  if (mode === 'buy') {
    detailModal.classList.add('buy-detail-mode');
    const entry = detail;
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = getBuyVerdictClass(entry);
    const verdictMap = {
      strong: 'S 등급 · 강력매수',
      good: 'A 등급 · 매수추천',
      watch: 'B 등급 · 관심후보',
      exclude: 'C 등급 · 제외'
    };

    document.getElementById('modal-body').innerHTML = `
      <div class="buy-modal-layout">
        <div class="buy-modal-fixed">
          <div class="modal-price-bar buy-price-bar">
            <div>
              <div class="price-big">${entry.score.toFixed(1)} / 10</div>
              <div class="buy-modal-scoreline">${escapeHtml(entry.grade)} · ${escapeHtml(entry.statusLabel)}</div>
            </div>
            <div class="modal-stats">
              <div class="modal-stat">
                <span class="modal-stat-label">진입가</span>
                <span class="modal-stat-value">${escapeHtml(entry.entryPriceText || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">R/R</span>
                <span class="modal-stat-value">${escapeHtml(entry.rr || '—')}</span>
              </div>
              <div class="modal-stat">
                <span class="modal-stat-label">전략</span>
                <span class="modal-stat-value">${escapeHtml(STRATEGY_META[entry.strategy].shortLabel)}</span>
              </div>
            </div>
          </div>

          <div class="modal-verdict ${verdictClass === 'strong' ? 'hold' : verdictClass === 'good' ? 'caution' : verdictClass === 'watch' ? 'caution' : 'sell'}">${escapeHtml(verdictMap[verdictClass])}</div>

          <div class="buy-modal-fixed-grid">
            <div class="buy-detail-block buy-detail-block-fixed">
              <div class="modal-section-label">요약</div>
              ${entry.rationale ? `<div class="buy-detail-note"><strong>근거</strong><span>${escapeHtml(entry.rationale)}</span></div>` : ''}
              ${entry.keyPoint ? `<div class="buy-detail-note"><strong>핵심</strong><span>${escapeHtml(entry.keyPoint)}</span></div>` : ''}
              ${entry.notes.map(note => `<div class="buy-detail-note"><strong>메모</strong><span>${escapeHtml(note)}</span></div>`).join('')}
            </div>

            <div class="buy-trade-plan-block">
              <div class="modal-section-label">매매 단계</div>
              ${renderTradePlanTable(entry)}
            </div>
          </div>
        </div>

        <div class="buy-modal-scroll" id="buy-modal-scroll-area">
          <div>
            <div class="modal-stage-badge stage2">🧭 노션 기준 매수 판단</div>
            <div class="modal-section-label">Gate 일치 여부</div>
            <div class="modal-ind-list">${renderGateList(entry)}</div>
          </div>

          <div>
            <div class="modal-section-label">채점 조건 일치 / 불일치</div>
            <div class="modal-ind-list">${renderRuleMatchList(entry)}</div>
          </div>
        </div>
      </div>
    `;
  } else {
    detailModal.classList.remove('buy-detail-mode');
    const { stock, data, indicators, decision, isBefore0908 } = detail;
    document.getElementById('modal-name').textContent = stock.name;
    document.getElementById('modal-code').textContent = stock.code;
    document.getElementById('modal-type').textContent = stock.type === 'pullback' ? '📊 눌림목 종가베팅' : '🔥 수급 매집형 종가베팅';

    const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
    const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
    const absChg = Math.abs(data.chgRate).toFixed(2);
    const verdictMap = {
      sell: { label: '🚨 매도 / 손절 권장', cls: 'sell' },
      caution: { label: '⚠️ 주의 / 익절 검토', cls: 'caution' },
      hold: { label: '✅ 홀딩 / 양호', cls: 'hold' }
    };
    const verdict = verdictMap[decision] || verdictMap.hold;
    const stageCls = isBefore0908 ? 'stage1' : 'stage2';
    const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';

    document.getElementById('modal-body').innerHTML = `
      <div class="modal-price-bar">
        <span class="price-big">${data.currentPrice.toLocaleString()}원</span>
        <span class="chg-big ${chgClass}">${chgPrefix}${absChg}%</span>
        <div class="modal-stats">
          <div class="modal-stat">
            <span class="modal-stat-label">전일종가(매수가)</span>
            <span class="modal-stat-value">${data.prevClose.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">시가</span>
            <span class="modal-stat-value">${data.openPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">체결강도</span>
            <span class="modal-stat-value">${data.strength ? `${data.strength.toFixed(2)}%` : '—'}</span>
          </div>
        </div>
      </div>

      <div>
        <div class="modal-stage-badge ${stageCls}">⚡ ${stageText}</div>
        <div class="modal-section-label">지표별 분석 결과</div>
        <div class="modal-ind-list">
          ${indicators.map(indicator => {
            const icon = indicator.status === 'triggered' ? '🚨' : indicator.status === 'clear' ? '✅' : '➖';
            const criterionLines = indicator.criterion.split('\n').map(line => `<span>${escapeHtml(line)}</span>`).join('<br>');
            return `
              <div class="modal-ind-card ${indicator.status}">
                <div class="modal-ind-icon">${icon}</div>
                <div class="modal-ind-content">
                  <div class="modal-ind-title">${escapeHtml(indicator.title)}</div>
                  <div class="modal-ind-criterion">${criterionLines}</div>
                  <div class="modal-ind-result">→ ${escapeHtml(indicator.result)}</div>
                  ${indicator.value ? `<div class="modal-ind-value">📐 ${escapeHtml(indicator.value)}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="modal-verdict ${verdict.cls}">${verdict.label}</div>
    `;
  }

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

window.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('savedNotionUrl');
  if (savedUrl) {
    document.getElementById('notion-url').value = savedUrl;
    fetchNotionData();
  } else {
    renderAll();
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
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      closeGuideModal();
    }
  });
});
