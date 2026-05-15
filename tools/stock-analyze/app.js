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
      condition: '60MA 우상향 AND 20MA 우상향 AND VKOSPI < 20',
      pullback: '서브 (3종목)',
      momentum: '메인 (3종목)'
    },
    {
      state: '순환매장 🔄',
      condition: '60MA 횡보 AND 신고가 ≥ 30 AND 업종 리더십 변경 AND 거래대금 유지',
      pullback: '서브 (2종목)',
      momentum: '메인 (2종목)'
    },
    {
      state: '박스권 ⚠️',
      condition: '그 외 (지수 정체 + 내부 침체)',
      pullback: '메인 (3종목)',
      momentum: '서브 (1종목)'
    },
    {
      state: '약세장 ⛔',
      condition: 'KOSPI 60MA 하락 OR VKOSPI > 30',
      pullback: '관망',
      momentum: '관망'
    }
  ],
  grades: [
    { grade: 'S', score: '9.0 ~ 10점', meaning: '레짐 무관 진입 가능' },
    { grade: 'A', score: '7.5 ~ 8.9점', meaning: '강세장·순환매장·박스권 진입 가능' },
    { grade: 'B', score: '6.0 ~ 7.4점', meaning: '매매 단계 노출, 진입 보류, 익일 재평가' },
    { grade: 'C', score: '6.0점 미만', meaning: '출력 목록에서 제외' }
  ],
  permissions: [
    { regime: '강세장', s: '✅ 100% 진입', a: '✅ 100% 진입', b: '👀 모니터링' },
    { regime: '순환매장', s: '✅ 80% 진입', a: '✅ 70% 진입', b: '👀 모니터링' },
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
    },
    reversal: {
      filters: [
        { code: 'F1', condition: '거래대금 당일 30위 이내' },
        { code: 'F2', condition: '시가총액 30조원 이상 (대형주 한정)' },
        { code: 'F3', condition: '실적발표 D-2, 분할/합병/배당락 D-5 이내 제외' },
        { code: 'F4', condition: '동일 종목 본 전략 진입 후 5거래일 이내 재진입 금지' }
      ],
      gates: [
        { code: 'G1', condition: '직전 1개월 누적 상승률 ≥ +30% (주도주 자격)', source: '네이버 일봉' },
        { code: 'G2', condition: '직전 단기 고점(20거래일 최고종가) 대비 -7% ~ -20% 하락 구간', source: '네이버 일봉' },
        { code: 'G3', condition: '종가 > 60MA (장기 추세 베이스 유지)', source: '네이버 일봉' },
        { code: 'G4', condition: '직전 5거래일 내 일봉 -5% 이상 급락 1회 이상 발생', source: '네이버 일봉' },
        { code: 'G5', condition: '안정화 캔들 패턴 (G5-a 양봉 / G5-b 긴아래꼬리 / G5-c 도지)', source: '네이버 일봉' }
      ],
      scores: [
        { code: 'S1', condition: '외국인 OR 기관 당일 순매수 전환 (전일 대비 부호 반전)', source: '네이버 증권' },
        { code: 'S2', condition: '토스 분당 체결강도 장중 마지막 1시간 평균 ≥ 100% + 당일 평균 ≥ 90%', source: '토스 증권' },
        { code: 'P1', condition: '종가 > 20MA (중기 지지선 사수)', source: '네이버 증권' },
        { code: 'P2', condition: '종가 위치가 당일 고가-저가 레인지 상단 50% 이상', source: '네이버 증권' },
        { code: 'C1', condition: '당일 거래량 5일 평균의 200% 이상 (셀링 클라이맥스 확인)', source: '네이버 증권' },
        { code: 'C2', condition: '토스 호가창 매수잔량 : 매도잔량 ≥ 1:1 (매수세 균형 회복)', source: '토스 증권' },
        { code: 'C3', condition: '장 마감 직전 30분봉이 양봉 또는 종가 ≥ 30분봉 시가', source: '네이버·토스' }
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
  },
  reversal: {
    label: '🔻 주도주 급락 반등',
    shortLabel: '급락 반등',
    noun: '급락 반등 매매'
  },
  swing: {
    label: '🔄 스윙 보유',
    shortLabel: '스윙',
    noun: '스윙 보유'
  }
};

const REGIME_LABEL_GUIDE = {
  '레짐': '현재 시장 환경 4분류입니다. 강세장·순환매장·박스권·약세장 여부에 따라 매수 가능 등급과 전략 우선순위가 달라집니다.',
  'KOSPI': '코스피 지수의 현재 수준과 등락률입니다. 시장 전체 방향성과 강도를 확인할 때 사용합니다.',
  'VKOSPI': '코스피 변동성 지수입니다. 수치가 높을수록 시장 불안이 크며 매수 점수 보정이 더 보수적으로 적용됩니다.',
  '60일선': '코스피 60일 이동평균선의 방향입니다. 중기 추세가 우상향인지 횡보인지 하락인지 판단합니다.',
  '20일선': '코스피 20일 이동평균선의 방향입니다. 단기 추세 방향과 강세장 조건 판정에 사용됩니다.',
  '최종 보정': 'VKOSPI 수준에 따라 원점수에 곱해지는 최종 보정값입니다. 시장이 불안할수록 점수가 낮아집니다.',
  '스윙 전환': '현 레짐에서 종베→스윙 전환 허용 정도입니다. 적극/조건부/제한/금지 4단계로 구분됩니다.',
  '시가베팅': '현 레짐에서 시가베팅 활성 여부입니다. 강세장·순환매장에서만 활성화됩니다.',
  '특이 사항': '당일 시장에서 매매 판단에 영향을 줄 수 있는 이벤트, 수급 변화, 옵션만기 같은 참고 메모입니다.'
};

let activeTab = 'buy';
let stocks = {
  pullback: [],
  momentum: [],
  swing: []
};
let notionSnapshot = createEmptySnapshot();
const stockDetailMap = {};
let currentModalState = { code: null, mode: null };

function syncBodyScrollLock() {
  const hasOpenModal = document.querySelector('.modal-overlay.open');
  document.body.classList.toggle('modal-scroll-locked', Boolean(hasOpenModal));
}

function createEmptySnapshot() {
  return {
    regimeTable: [],
    regimeAlert: '',
    pullbackEntries: [],
    momentumEntries: [],
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

function parseStockHeader(line, strategy) {
  const match = line.match(/^(\d+)위\.\s*([^()]+?)\s*\((\d{6})\)\s*[—\-–]\s*([\d.]+)\/10\s*\[([^\]]+)\]\s*[—\-–←]\s*(.+)$/);
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
    tradePlanRows: [],
    liveRefresh: null
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

  const stripped = line.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}⚖💰🔔⚠️]+\s*/u, '');

  if (/^진입\s*가\s*:/.test(stripped)) {
    entry.entryPriceText = stripped.replace(/^진입\s*가\s*:/, '').trim();
    entry.entryPriceValue = extractFirstNumber(entry.entryPriceText);
    const metaMatch = entry.entryPriceText.match(/\(([^)]*)\)/);
    entry.entryMeta = metaMatch ? metaMatch[1].trim() : '';
    return;
  }

  if (/^근거\s*:/.test(stripped)) {
    entry.rationale = stripped.replace(/^근거\s*:/, '').trim();
    return;
  }

  if (/^핵심(?:\s*포인트)?\s*:/.test(stripped)) {
    entry.keyPoint = stripped.replace(/^핵심(?:\s*포인트)?\s*:/, '').trim();
    return;
  }

  if (/^리스크\s*:/.test(stripped)) {
    entry.notes.push(line);
    return;
  }

  if (/^R\/R\s*:/.test(stripped)) {
    entry.rr = stripped.replace(/^R\/R\s*:/, '').trim();
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

    const heading = normalizeHeading(text);
    if (heading.includes('시장 레짐') || heading.includes('레짐 판정')) {
      lines.push('## 시장 레짐 요약');
      return;
    }
    if (heading.includes('눌림목') && heading.includes('종가베팅')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('수급') && heading.includes('종가베팅')) {
      lines.push(`## ${heading}`);
      return;
    }
    if (heading.includes('스윙') && heading.includes('전환') && heading.includes('평가')) {
      lines.push('## 스윙 전환 평가');
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
      if (heading.includes('시장 레짐') || heading.includes('레짐 판정') || heading.includes('레짐 요약')) {
        currentSection = 'regime';
      } else if (heading.includes('스윙') && heading.includes('전환') && heading.includes('평가')) {
        currentSection = 'swing';
      } else if (heading.includes('눌림목') && heading.includes('종가베팅')) {
        currentSection = 'pullback';
      } else if (heading.includes('수급') && heading.includes('종가베팅')) {
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
        const colCount = rows[0].length;
        let parsed = [];
        if (colCount === 2) {
          parsed = rows.slice(1).map(row => ({ item: row[0] || '', value: row[1] || '' }));
        } else if (colCount >= 3) {
          parsed = rows.slice(1).map(row => ({ item: row[1] || row[0] || '', value: row[2] || row[1] || '' }));
        }
        parsed.forEach(entry => {
          const existing = snapshot.regimeTable.find(r => r.item === entry.item);
          if (!existing) snapshot.regimeTable.push(entry);
        });
      }
      index = nextIndex;
      continue;
    }

    if (currentSection === 'regime' && line.startsWith('>')) {
      snapshot.regimeAlert = line.replace(/^>\s*/, '').trim();
      index += 1;
      continue;
    }

    if (currentSection === '' && line.startsWith('>') && line.includes('레짐')) {
      const regimeQuote = line.replace(/^>\s*/, '').trim();
      const segments = regimeQuote.split(/\s*\|\s*/);
      segments.forEach(segment => {
        const subParts = segment.split(/\s+(?=(?:진입 전략|스윙 전환 활성도|스윙 전환|시가베팅)[：:])/);
        subParts.forEach(part => {
          const colonMatch = part.match(/^([^:：]+)[：:]\s*(.+)$/);
          if (colonMatch) {
            const key = colonMatch[1].replace(/시장\s*/, '').trim();
            const val = colonMatch[2].trim();
            if (key && val) snapshot.regimeTable.push({ item: key, value: val });
          }
        });
      });
      index += 1;
      continue;
    }

    if (currentSection === 'swing' && /^[>\s]*[-*]/.test(line)) {
      const swingLine = line.replace(/^[>\s]*[-*]\s*/, '').replace(/\*\*/g, '').trim();
      const codeMatch = swingLine.match(/^(.+?)\((\d{6})\)\s+(.+)$/);
      if (codeMatch) {
        const name = codeMatch[1].trim();
        const code = codeMatch[2];
        const rest = codeMatch[3];
        const dateMatch = rest.match(/(\d+\.\d+)/);
        const priceMatch = rest.match(/([\d,]+)\s*원/);
        const buyDate = dateMatch ? dateMatch[1] : '';
        const entryPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;
        const statusMatch = rest.match(/원\s*(.+)$/);
        const status = statusMatch ? statusMatch[1].trim() : '';
        snapshot.swingEntries.push({ name, code, buyDate, entryPrice, status });
      }
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

  stocks.swing = notionSnapshot.swingEntries.map(entry => ({
    name: entry.name, code: entry.code, type: 'swing', strategy: 'swing', source: 'notion',
    entryPrice: entry.entryPrice, buyDate: entry.buyDate, status: entry.status
  }));
}

function getEntryByCode(code) {
  return [...notionSnapshot.pullbackEntries, ...notionSnapshot.momentumEntries].find(entry => entry.code === code);
}

function getAllBuyEntries() {
  return [...notionSnapshot.pullbackEntries, ...notionSnapshot.momentumEntries];
}

function summarizeGateStatus(entry) {
  const passed = entry.gates.filter(gate => gate.status === '✅').length;
  const warned = entry.gates.filter(gate => gate.status === '⚠️').length;
  const blocked = entry.gates.filter(gate => gate.status === '⛔').length;
  return { passed, warned, blocked, total: entry.gates.length };
}

function getBuyGradeFromScore(score) {
  if (score >= 9) return 'S';
  if (score >= 7.5) return 'A';
  if (score >= 6) return 'B';
  return 'C';
}

function getBuyVerdictClassFromGrade(grade) {
  if (String(grade ?? '').startsWith('S')) return 'strong';
  if (String(grade ?? '').startsWith('A')) return 'good';
  if (String(grade ?? '').startsWith('B')) return 'watch';
  return 'exclude';
}

function getBuyVerdictClass(entry) {
  return getBuyVerdictClassFromGrade(entry.grade);
}

function buildLiveBuyStatusLabel(liveRefresh) {
  if (Number.isFinite(liveRefresh.upsideRate)) {
    return `목표가 ${formatSignedPercent(liveRefresh.upsideRate)}`;
  }
  return `컨센서스 ${liveRefresh.recommMean.toFixed(2)} / 5.00`;
}

function getBuyPresentation(entry) {
  const liveRefresh = entry.liveRefresh;
  const score = liveRefresh?.score ?? entry.score;
  const grade = liveRefresh?.grade ?? entry.grade;
  const statusLabel = liveRefresh?.statusLabel ?? entry.statusLabel;

  return {
    score,
    grade,
    statusLabel,
    verdictClass: getBuyVerdictClassFromGrade(grade),
    liveRefresh,
    changed: {
      score: Boolean(liveRefresh && Math.abs(score - entry.score) >= 0.05),
      grade: Boolean(liveRefresh && grade !== entry.grade),
      statusLabel: Boolean(liveRefresh && statusLabel !== entry.statusLabel)
    }
  };
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
      const grade = getBuyGradeFromScore(score);

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
          <div class="regime-stat-label">
            <span>${escapeHtml(row.item)}</span>
            ${REGIME_LABEL_GUIDE[row.item] ? `
              <span class="regime-help">
                <button type="button" class="regime-help-trigger" aria-label="${escapeHtml(`${row.item} 설명 보기`)}">?</button>
                <span class="regime-help-tooltip" role="tooltip">${escapeHtml(REGIME_LABEL_GUIDE[row.item])}</span>
              </span>
            ` : ''}
          </div>
          <div class="regime-stat-value">${escapeHtml(row.value)}</div>
        </div>
      `).join('')}
    </div>
    ${notionSnapshot.regimeAlert ? `<div class="regime-alert">${escapeHtml(notionSnapshot.regimeAlert)}</div>` : ''}
  `;

  container.querySelectorAll('.regime-help').forEach(help => {
    const tooltip = help.querySelector('.regime-help-tooltip');
    const openTooltip = () => {
      help.classList.add('is-open');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateY(0)';
      }
    };
    const closeTooltip = () => {
      help.classList.remove('is-open');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateY(4px)';
      }
    };

    help.addEventListener('mouseenter', openTooltip);
    help.addEventListener('mouseleave', closeTooltip);

    const trigger = help.querySelector('.regime-help-trigger');
    if (trigger) {
      trigger.addEventListener('focus', openTooltip);
      trigger.addEventListener('blur', closeTooltip);
    }
  });
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

function buildSellCardPlanSummary(code) {
  const entry = getEntryByCode(code);
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) {
    return '<div class="scard-plan-empty">매매 단계 정보 없음</div>';
  }

  const findRow = prefix => entry.tradePlanRows.find(r => r.stage && r.stage.includes(prefix));
  const premarket = findRow('프리마켓') || findRow('🌅');
  const openPhase = findRow('장초반') || findRow('🔔');
  const intraday = findRow('장중') || findRow('📈');
  const swing = findRow('스윙') || findRow('📊');
  const stopLoss = findRow('손절') || findRow('🛑');

  const tags = [];
  if (premarket) tags.push(`<span class="plan-tag target">🌅 ${escapeHtml(premarket.targetYield || premarket.targetPrice || '')}</span>`);
  if (openPhase) tags.push(`<span class="plan-tag target">🔔 ${escapeHtml(openPhase.targetYield || openPhase.targetPrice || '')}</span>`);
  if (intraday) tags.push(`<span class="plan-tag target">📈 ${escapeHtml(intraday.targetYield || intraday.targetPrice || '')}</span>`);
  if (swing) tags.push(`<span class="plan-tag swing">📊 스윙전환</span>`);
  if (stopLoss) tags.push(`<span class="plan-tag stop">🛑 ${escapeHtml(stopLoss.targetYield || stopLoss.targetPrice || '')}</span>`);

  const entryPrice = entry.entryPriceValue ? `진입가: ${entry.entryPriceValue.toLocaleString()}원` : '';

  return `
    <div class="scard-plan">
      <div class="plan-prices">${tags.join('')}</div>
      ${entryPrice ? `<div class="plan-entry">${entryPrice}</div>` : ''}
    </div>
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
      const planHtml = buildSellCardPlanSummary(stock.code);
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
          ${planHtml}
          <div class="indicators" id="ind-${stock.code}">
            <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
          </div>
        </div>
      `;
    });
  };

  renderGroup(stocks.pullback, 'list-pullback');
  renderGroup(stocks.momentum, 'list-momentum');
  renderSwingCards();
}

function renderSwingCards() {
  const container = document.getElementById('list-swing');
  if (!container) return;
  container.innerHTML = '';
  if (!stocks.swing.length) {
    container.innerHTML = '<div class="empty-state">스윙 보유 종목이 없습니다.</div>';
    return;
  }

  stocks.swing.forEach(stock => {
    container.innerHTML += `
      <div class="scard swing-card" id="card-${stock.code}">
        <div class="scard-head">
          <div>
            <div class="scard-name">${escapeHtml(stock.name)}</div>
            <div class="scard-code">${escapeHtml(stock.code)}</div>
          </div>
          <span class="badge badge-swing" id="badge-${stock.code}">스윙 보유</span>
        </div>
        <div class="swing-meta">
          <span class="swing-meta-item">매수일 ${escapeHtml(stock.buyDate)}</span>
          <span class="swing-meta-item">매수가 ${stock.entryPrice.toLocaleString()}원</span>
          <span class="swing-meta-item">${escapeHtml(stock.status)}</span>
        </div>
        <div class="price-row" id="price-row-${stock.code}">
          <span class="price placeholder-price">대기 중</span>
        </div>
        <div class="meta" id="meta-${stock.code}">수익률: 분석 시작 후 표시</div>
        <div class="indicators" id="ind-${stock.code}">
          <div class="ind-item unknown">상단에서 분석 시작 버튼을 눌러주세요.</div>
        </div>
      </div>
    `;
  });
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
      const presentation = getBuyPresentation(entry);
      const verdictClass = presentation.verdictClass;
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
              <div class="buy-score ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)}</div>
              <div class="buy-grade ${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</div>
            </div>
          </div>
          <div class="buy-card-status ${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</div>
          <div class="buy-card-tags">
            <span class="buy-tag">Gate ${gateSummary.passed}/${gateSummary.total}</span>
            <span class="buy-tag">충족 ${entry.matchedRules.length}</span>
            <span class="buy-tag muted">미충족 ${entry.unmatchedRules.length}</span>
          </div>
          <div class="buy-card-summary">${escapeHtml(rationale)}</div>
          ${presentation.liveRefresh ? `
            <div class="buy-live-meta">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}
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
  const hasBuyEntries = notionSnapshot.pullbackEntries.length > 0 || notionSnapshot.momentumEntries.length > 0;
  const hasSellStocks = stocks.pullback.length > 0 || stocks.momentum.length > 0 || stocks.swing.length > 0;
  analyzeBtn.disabled = activeTab === 'buy' ? !hasBuyEntries : !hasSellStocks;
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
      : '🧭 매수 탭에서는 상단 분석 시작 버튼으로 네이버 컨센서스를 일괄 최신화할 수 있습니다.';
  }

  const analyzeBtn = document.getElementById('btn-analyze');
  if (!analyzeBtn) return;

  if (activeTab === 'buy') {
    const hasBuyRefresh = getAllBuyEntries().some(entry => entry.liveRefresh);
    analyzeBtn.innerHTML = `<span>⚡</span> ${hasBuyRefresh ? '일괄 다시 분석' : '일괄 분석'}`;
    return;
  }

  const hasSellResult = [...stocks.pullback, ...stocks.momentum, ...stocks.swing].some(stock => stockDetailMap[stock.code]?.mode === 'sell');
  analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${hasSellResult ? '다시 분석' : '분석 시작'}`;
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
  syncBodyScrollLock();
}

function closeGuideModal() {
  document.getElementById('guide-modal-overlay').classList.remove('open');
  syncBodyScrollLock();
}

function detectCurrentRegime() {
  const table = notionSnapshot.regimeTable;
  if (!table.length) return null;
  const getValue = key => (table.find(r => r.item === key) || {}).value || '';
  return {
    regime: getValue('레짐'),
    kospi: getValue('KOSPI'),
    vkospi: getValue('VKOSPI'),
    ma60: getValue('60일선'),
    ma20: getValue('20일선'),
    swing: getValue('스윙 전환'),
    openBet: getValue('시가베팅'),
    note: getValue('특이 사항'),
    correction: getValue('최종 보정')
  };
}

  syncBodyScrollLock();
function openRegimeReport() {
  const info = detectCurrentRegime();
  const body = document.getElementById('regime-report-body');

  syncBodyScrollLock();
  if (!info) {
    body.innerHTML = '<div class="empty-state">노션에서 시장 레짐 데이터를 불러온 뒤 다시 시도하세요.</div>';
    document.getElementById('regime-report-overlay').classList.add('open');
    return;
  }

  const regimeChecks = RULE_GUIDE.regimes.map(r => {
    const isMatch = info.regime && info.regime.includes(r.state.replace(/\s*[✅🔄⚠️⛔]/g, '').trim());
    return { ...r, isMatch };
  });

  body.innerHTML = `
    <div class="regime-report-section">
      <div class="modal-section-label">현재 레짐 판정</div>
      <div class="modal-verdict hold" style="font-size:16px;margin-bottom:16px">${escapeHtml(info.regime || '미확인')}</div>

      <div class="modal-section-label">판정 데이터</div>
      <table class="guide-table" style="margin-bottom:16px">
        <tbody>
          <tr><td style="width:100px;color:var(--text-tertiary)">KOSPI</td><td><strong>${escapeHtml(info.kospi)}</strong></td></tr>
          <tr><td style="color:var(--text-tertiary)">VKOSPI</td><td><strong>${escapeHtml(info.vkospi)}</strong></td></tr>
          <tr><td style="color:var(--text-tertiary)">60일선</td><td><strong>${escapeHtml(info.ma60)}</strong></td></tr>
          <tr><td style="color:var(--text-tertiary)">20일선</td><td><strong>${escapeHtml(info.ma20)}</strong></td></tr>
          <tr><td style="color:var(--text-tertiary)">최종 보정</td><td><strong>${escapeHtml(info.correction)}</strong></td></tr>
        </tbody>
      </table>

      <div class="modal-section-label">레짐 판정 순서 (위→아래 순차, 첫 일치 확정)</div>
      <div class="modal-ind-list">
        ${regimeChecks.map(r => `
          <div class="modal-ind-card ${r.isMatch ? 'clear' : 'unknown'}">
            <div class="modal-ind-icon">${r.isMatch ? '✅' : '➖'}</div>
            <div class="modal-ind-content">
              <div class="modal-ind-title">${escapeHtml(r.state)}</div>
              <div class="modal-ind-criterion">${escapeHtml(r.condition)}</div>
              <div class="modal-ind-result">→ ${r.isMatch ? '현재 레짐 확정' : '조건 미충족'}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="modal-section-label" style="margin-top:18px">전략 우선순위</div>
      <table class="guide-table">
        <thead><tr><th>레짐</th><th>눌림목</th><th>수급매집형</th></tr></thead>
        <tbody>
          ${regimeChecks.map(r => `<tr style="${r.isMatch ? 'background:rgba(16,185,129,0.08)' : ''}"><td>${escapeHtml(r.state)}</td><td>${escapeHtml(r.pullback)}</td><td>${escapeHtml(r.momentum)}</td></tr>`).join('')}
        </tbody>
      </table>

      ${info.swing || info.openBet ? `
        <div class="modal-section-label" style="margin-top:18px">운용 상태</div>
        <table class="guide-table">
          <tbody>
            ${info.swing ? `<tr><td style="width:100px;color:var(--text-tertiary)">스윙 전환</td><td><strong>${escapeHtml(info.swing)}</strong></td></tr>` : ''}
            ${info.openBet ? `<tr><td style="color:var(--text-tertiary)">시가베팅</td><td><strong>${escapeHtml(info.openBet)}</strong></td></tr>` : ''}
          </tbody>
        </table>
      ` : ''}

      ${info.note ? `<div class="regime-alert" style="margin-top:16px">${escapeHtml(info.note)}</div>` : ''}
    </div>
  `;

  document.getElementById('regime-report-overlay').classList.add('open');
}

function closeRegimeReport() {
  document.getElementById('regime-report-overlay').classList.remove('open');
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
    btn.disabled = true;
    btn.innerHTML = '<span>⚡</span> 일괄 분석 중...';

    try {
      await runBuyBatchRefresh();
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

  btn.disabled = true;
  btn.innerHTML = '<span>⚡</span> 분석 진행 중...';

  log(`▶ [현재 시각: ${timeStr}] 분석을 시작합니다. (9시 8분 <b>${isBefore0908 ? '이전' : '이후'}</b> 로직 적용)`);

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

      const [intRes, priceRes] = await Promise.all([
        fetch(proxy + encodeURIComponent(`https://m.stock.naver.com/api/stock/${stock.code}/integration`)),
        fetch(proxy + encodeURIComponent(`https://m.stock.naver.com/api/stock/${stock.code}/price?pageSize=60&page=1`))
      ]);
      if (!intRes.ok) throw new Error(`integration API error (${intRes.status})`);
      if (!priceRes.ok) throw new Error(`price API error (${priceRes.status})`);
      const intJson = await intRes.json();
      const priceJson = await priceRes.json();

      const findInfo = code => (intJson.totalInfos ?? []).find(info => info.code === code);
      const prevClose = parseNum(findInfo('lastClosePrice')?.value ?? 0) || currentPrice;
      const openPrice = parseNum(findInfo('openPrice')?.value ?? 0);
      const chgRate = chgRateRaw !== 0 ? chgRateRaw : (prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0);
      const strength = null;
      const todayVolume = parseNum(findInfo('accumulatedTradingVolume')?.value ?? 0);

      const priceHistory = Array.isArray(priceJson) ? priceJson : [];
      const pastPrices = priceHistory.map(d => parseNum(d.closePrice)).filter(p => p > 0);
      const pastVolumes = priceHistory.map(d => parseNum(d.accumulatedTradingVolume)).filter(v => v > 0);
      const pastLows = priceHistory.map(d => parseNum(d.lowPrice)).filter(p => p > 0);
      const pastHighs = priceHistory.map(d => parseNum(d.highPrice)).filter(p => p > 0);

      const ma5 = pastPrices.length >= 5
        ? Math.round(pastPrices.slice(0, 5).reduce((acc, price) => acc + price, 0) / 5)
        : 0;
      const ma20 = pastPrices.length >= 20
        ? Math.round(pastPrices.slice(0, 20).reduce((acc, price) => acc + price, 0) / 20)
        : 0;
      const ma60 = pastPrices.length >= 60
        ? Math.round(pastPrices.slice(0, 60).reduce((acc, price) => acc + price, 0) / 60)
        : 0;
      const volMa5 = pastVolumes.length >= 5
        ? Math.round(pastVolumes.slice(0, 5).reduce((acc, v) => acc + v, 0) / 5)
        : 0;
      const low5d = pastLows.length >= 5 ? Math.min(...pastLows.slice(0, 5)) : 0;
      const high20d = pastHighs.length >= 20 ? Math.max(...pastHighs.slice(0, 20)) : 0;
      const ma5Prev = pastPrices.length >= 6
        ? Math.round(pastPrices.slice(1, 6).reduce((acc, price) => acc + price, 0) / 5)
        : 0;
      const ma5Direction = ma5 > 0 && ma5Prev > 0 ? (ma5 > ma5Prev ? 'up' : ma5 < ma5Prev ? 'down' : 'flat') : 'unknown';

      const deals = intJson.dealTrendInfos ?? [];
      const todayDeal = deals.length > 0 ? deals[0] : {};
      const foreignNet = parseNum(todayDeal.foreignerPureBuyQuant ?? 0);
      const institutionNet = parseNum(todayDeal.organPureBuyQuant ?? 0);

      const data = { currentPrice, prevClose, openPrice, chgRate, strength, ma5, ma20, ma60, todayVolume, volMa5, foreignNet, institutionNet, low5d, high20d, ma5Direction };
      log(`- [${stock.name}] 완료. (현재가: ${data.currentPrice.toLocaleString()}, 등락률: ${data.chgRate.toFixed(2)}%, 시가: ${data.openPrice.toLocaleString()}, 전일종가: ${data.prevClose.toLocaleString()}, 5일MA: ${ma5.toLocaleString()}원, 20MA: ${ma20.toLocaleString()}원, 외인: ${foreignNet.toLocaleString()}주)`);
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

function parseTradePlanTargets(entry) {
  if (!entry || !entry.tradePlanRows || !entry.tradePlanRows.length) return null;

  const findRow = prefix => entry.tradePlanRows.find(r => r.stage && r.stage.includes(prefix));
  const extractPrice = row => {
    if (!row) return null;
    const priceStr = row.targetPrice || row.condition || '';
    const num = extractFirstNumber(priceStr);
    return num;
  };
  const extractRate = row => {
    if (!row) return null;
    const text = row.targetYield || row.condition || '';
    const match = text.match(/[+-]?\d+(?:\.\d+)?%/);
    return match ? parseFloat(match[0]) : null;
  };

  const premarket = findRow('프리마켓') || findRow('🌅');
  const openPhase = findRow('장초반') || findRow('🔔');
  const intraday1 = findRow('장중 1차') || findRow('📈');
  const intraday2 = findRow('장중 2차');
  const swing = findRow('스윙') || findRow('📊');
  const stopLoss = findRow('손절') || findRow('🛑');

  return {
    entryPrice: entry.entryPriceValue,
    premarket: { row: premarket, price: extractPrice(premarket), rate: extractRate(premarket) },
    openPhase: { row: openPhase, price: extractPrice(openPhase), rate: extractRate(openPhase) },
    intraday1: { row: intraday1, price: extractPrice(intraday1), rate: extractRate(intraday1) },
    intraday2: { row: intraday2, price: extractPrice(intraday2), rate: extractRate(intraday2) },
    swing: { row: swing, price: extractPrice(swing), rate: extractRate(swing) },
    stopLoss: { row: stopLoss, price: extractPrice(stopLoss), rate: extractRate(stopLoss) }
  };
}

function checkRejectionConditions(stock, data, isBefore0908, targets) {
  const rejections = [];
  const entryPrice = targets?.entryPrice || data.prevClose;

  if (data.openPrice > 0 && entryPrice > 0) {
    const gapRate = ((data.openPrice - entryPrice) / entryPrice) * 100;
    const isGapDown = gapRate <= -3;
    rejections.push({
      code: 'R1',
      title: '개파락 (-3% 이상 갭다운)',
      criterion: '익일 시가가 진입가 대비 -3% 이상 낮게 시작하면 즉각 손절합니다.\n기준: (시가 - 진입가) / 진입가 ≤ -3%',
      triggered: isGapDown,
      result: isGapDown
        ? `갭다운 ${gapRate.toFixed(2)}% 발생 → 즉시 전량 매도`
        : `갭 ${gapRate.toFixed(2)}% — 정상 범위`,
      value: `(${data.openPrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${gapRate.toFixed(2)}%`
    });
  }

  if (targets?.stopLoss?.price && data.currentPrice > 0) {
    const belowStopLoss = data.currentPrice <= targets.stopLoss.price;
    rejections.push({
      code: 'R2',
      title: '손절가 이탈',
      criterion: `노션 매매전략의 손절가(${targets.stopLoss.price.toLocaleString()}원)를 하향 이탈하면 전량 매도합니다.`,
      triggered: belowStopLoss,
      result: belowStopLoss
        ? `현재가 ${data.currentPrice.toLocaleString()} ≤ 손절가 ${targets.stopLoss.price.toLocaleString()} → 즉시 전량 매도`
        : `현재가 ${data.currentPrice.toLocaleString()} > 손절가 ${targets.stopLoss.price.toLocaleString()} — 안전`,
      value: `현재가 ${data.currentPrice.toLocaleString()} / 손절가 ${targets.stopLoss.price.toLocaleString()}`
    });
  } else if (entryPrice > 0 && data.currentPrice > 0) {
    const lossRate = ((data.currentPrice - entryPrice) / entryPrice) * 100;
    const belowDefault = lossRate <= -4;
    rejections.push({
      code: 'R2',
      title: '기본 손절선 (-4%) 이탈',
      criterion: '노션 손절가 미설정 시, 진입가 대비 -4% 이탈하면 전량 매도합니다.\n기준: (현재가 - 진입가) / 진입가 ≤ -4%',
      triggered: belowDefault,
      result: belowDefault
        ? `진입가 대비 ${lossRate.toFixed(2)}% → 즉시 전량 매도`
        : `진입가 대비 ${lossRate.toFixed(2)}% — 손절선 이내`,
      value: `(${data.currentPrice.toLocaleString()} - ${entryPrice.toLocaleString()}) / ${entryPrice.toLocaleString()} = ${lossRate.toFixed(2)}%`
    });
  }

  if (stock.type === 'momentum' && isBefore0908 && data.currentPrice > 0 && data.openPrice > 0) {
    const openRecovery = data.currentPrice >= data.openPrice;
    rejections.push({
      code: 'R3',
      title: '수급매집형 시초가 미회복 (9:08 이전)',
      criterion: '수급 매집형은 9:08 이전 시초가 하락 전환 시 50% 정리를 권장합니다.\n기준: 현재가 < 시가',
      triggered: !openRecovery,
      result: !openRecovery
        ? `시초가 미회복 (현재가 ${data.currentPrice.toLocaleString()} < 시가 ${data.openPrice.toLocaleString()}) → 50% 추가 정리`
        : `시초가 위 유지 (현재가 ${data.currentPrice.toLocaleString()} ≥ 시가 ${data.openPrice.toLocaleString()})`,
      value: `현재가 ${data.currentPrice.toLocaleString()} / 시가 ${data.openPrice.toLocaleString()}`
    });
  }

  if (data.ma5 > 0 && data.currentPrice > 0) {
    const dropFromMA5 = ((data.currentPrice - data.ma5) / data.ma5) * 100;
    const isBelowMA5 = dropFromMA5 <= -2;
    rejections.push({
      code: 'R4',
      title: '5일선 -2% 하탈',
      criterion: '5일 이동평균선 대비 -2% 이상 하탈 시 손절을 권장합니다.\n기준: (현재가 - 5일MA) / 5일MA ≤ -2%',
      triggered: isBelowMA5,
      result: isBelowMA5
        ? `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% 하탈 → 손절`
        : `5일선(${data.ma5.toLocaleString()}) 대비 ${dropFromMA5.toFixed(2)}% — 유지`,
      value: `(${data.currentPrice.toLocaleString()} - ${data.ma5.toLocaleString()}) / ${data.ma5.toLocaleString()} = ${dropFromMA5.toFixed(2)}%`
    });
  }

  return rejections;
}

function evaluateTradeStage(data, targets, prevClose) {
  const basePrice = targets?.entryPrice || prevClose;
  if (!basePrice || !data.currentPrice) return { stage: 'unknown', label: '판단 불가', detail: '가격 데이터 부족' };

  const gainRate = ((data.currentPrice - basePrice) / basePrice) * 100;
  const hasTargets = targets && (targets.swing?.price || targets.intraday1?.price || targets.premarket?.price || targets.openPhase?.price);

  if (hasTargets) {
    if (targets.swing?.price && data.currentPrice >= targets.swing.price) {
      return { stage: 'swing', label: '📊 스윙 전환 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 스윙 기준 ${targets.swing.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.intraday2?.price && data.currentPrice >= targets.intraday2.price) {
      return { stage: 'intraday2', label: '📈 장중 2차 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 2차 목표 ${targets.intraday2.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.intraday1?.price && data.currentPrice >= targets.intraday1.price) {
      return { stage: 'intraday1', label: '📈 장중 1차 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 1차 목표 ${targets.intraday1.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.openPhase?.price && data.currentPrice >= targets.openPhase.price) {
      return { stage: 'openPhase', label: '🔔 장초반 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 장초반 목표 ${targets.openPhase.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }

    if (targets.premarket?.price && data.currentPrice >= targets.premarket.price) {
      return { stage: 'premarket', label: '🌅 프리마켓 익절 구간', detail: `현재가 ${data.currentPrice.toLocaleString()} ≥ 프리마켓 목표 ${targets.premarket.price.toLocaleString()} (진입가 대비 +${gainRate.toFixed(1)}%)`, gainRate };
    }
  }

  if (gainRate >= 4) {
    return { stage: 'hold', label: '✅ 강한 수익 구간', detail: `진입가 대비 +${gainRate.toFixed(1)}% — 홀딩 유지 (익절 목표 미설정)`, gainRate };
  }

  if (gainRate >= 0) {
    return { stage: 'hold', label: '✅ 홀딩 유지', detail: `진입가 대비 +${gainRate.toFixed(1)}% — 보유 유지`, gainRate };
  }

  return { stage: 'underwater', label: '⚠️ 평가손 구간', detail: `진입가 대비 ${gainRate.toFixed(1)}% — 손절선 확인 필요`, gainRate };
}

function buildSwingLossManagement(data, entryPrice, gainRate, volRatio) {
  const scores = [];

  // S1: 종가 vs 20MA
  const s1Pass = data.ma20 > 0 && data.currentPrice >= data.ma20;
  scores.push({
    code: 'S1', title: '종가 vs 20MA',
    criterion: '현재가가 20MA 위에 있으면 중기 추세 유지',
    pass: s1Pass,
    result: data.ma20 > 0
      ? (s1Pass ? `현재가 ${data.currentPrice.toLocaleString()} ≥ 20MA ${data.ma20.toLocaleString()} — 추세 유지` : `현재가 ${data.currentPrice.toLocaleString()} < 20MA ${data.ma20.toLocaleString()} — 추세 이탈`)
      : '20MA 미산출'
  });

  // S2: 5MA 방향
  const s2Pass = data.ma5Direction === 'up' || data.ma5Direction === 'flat';
  scores.push({
    code: 'S2', title: '5MA 방향',
    criterion: '5MA 우상향 또는 횡보 시 단기 모멘텀 유지',
    pass: s2Pass,
    result: data.ma5Direction === 'up' ? '5MA 우상향 — 모멘텀 유지'
      : data.ma5Direction === 'flat' ? '5MA 횡보 — 중립'
      : data.ma5Direction === 'down' ? '5MA 하락 — 모멘텀 약화'
      : '5MA 방향 미산출'
  });

  // S3: 거래량 vs 5일 평균
  const s3Pass = volRatio !== null && volRatio >= 70;
  scores.push({
    code: 'S3', title: '거래량 유지',
    criterion: '당일 거래량 ≥ 5일 평균의 70% — 시장 관심 유지',
    pass: s3Pass,
    result: volRatio !== null
      ? (s3Pass ? `거래량 ${volRatio.toFixed(0)}% (≥70%) — 관심 유지` : `거래량 ${volRatio.toFixed(0)}% (<70%) — 관심 이탈 위험`)
      : '거래량 데이터 미산출'
  });

  // S4: 외인+기관 수급
  const bothSelling = data.foreignNet < 0 && data.institutionNet < 0;
  const s4Pass = !bothSelling;
  scores.push({
    code: 'S4', title: '수급 (외인+기관)',
    criterion: '외인+기관 동시 순매도가 아니면 수급 지지',
    pass: s4Pass,
    result: s4Pass
      ? `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 수급 유지`
      : `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 동시 순매도`
  });

  // S5: 체결강도 (네이버에서 가져올 수 없으면 중립 처리)
  const s5Pass = data.strength === null ? true : data.strength >= 90;
  scores.push({
    code: 'S5', title: '체결강도',
    criterion: '체결강도 ≥ 90% — 매수세 건재',
    pass: s5Pass,
    result: data.strength !== null
      ? (s5Pass ? `체결강도 ${data.strength.toFixed(1)}% (≥90%) — 매수세 건재` : `체결강도 ${data.strength.toFixed(1)}% (<90%) — 매수세 약화`)
      : '체결강도 미수집 (토스 확인 필요) — 중립 처리'
  });

  // S6: 지지선 잔존 (5일 저점 대비 버퍼)
  const hasLowSupport = data.low5d > 0 && data.currentPrice >= data.low5d;
  const s6Pass = hasLowSupport;
  scores.push({
    code: 'S6', title: '지지선 잔존',
    criterion: '현재가 ≥ 최근 5일 저점 — 하방 지지 확인',
    pass: s6Pass,
    result: data.low5d > 0
      ? (s6Pass ? `현재가 ${data.currentPrice.toLocaleString()} ≥ 5일 저점 ${data.low5d.toLocaleString()} — 지지 건재` : `현재가 ${data.currentPrice.toLocaleString()} < 5일 저점 ${data.low5d.toLocaleString()} — 신저점 이탈`)
      : '일별 저가 데이터 미산출'
  });

  const totalScore = scores.filter(s => s.pass).length;

  // 손실 구간 분류
  let lossLevel, verdict;
  if (gainRate <= -5) {
    lossLevel = 'danger';
    verdict = '⛔ 즉시 청산 (위험 손실 -5% 초과)';
  } else if (gainRate <= -3) {
    lossLevel = 'warning';
    if (totalScore >= 6) verdict = '🟡 관찰 보유 (익일 종가 미회복 시 청산)';
    else verdict = '🔴 전량 손절 권고';
  } else if (gainRate < 0) {
    lossLevel = 'mild';
    if (totalScore >= 5) verdict = '🟢 홀드 — 지지 건재';
    else if (totalScore >= 3) verdict = '🟡 비중 축소 50% 권고';
    else verdict = '🔴 전량 손절 권고';
  } else {
    lossLevel = 'profit';
    verdict = '🟢 수익 구간 — 트레일링 운용';
  }

  // 동적 가격 산출
  const stopFromMa20 = data.ma20 > 0 ? data.ma20 : 0;
  const stopFrom5pct = Math.round(entryPrice * 0.95);
  const stopFromLow5d = data.low5d > 0 ? data.low5d : 0;
  const maxStopPrice = Math.max(stopFromMa20, stopFrom5pct, stopFromLow5d);
  const maxStopRate = entryPrice > 0 ? ((maxStopPrice - entryPrice) / entryPrice) * 100 : 0;

  const stopFrom2pct = Math.round(data.currentPrice * 0.98);
  const stopFromMa5 = data.ma5 > 0 ? data.ma5 : 0;
  const recommendedStopPrice = Math.max(stopFrom2pct, stopFromMa5);

  const recoveryTarget = Math.round(entryPrice * 1.01);
  const reboundTarget = data.high20d > 0 ? Math.round(data.high20d * 0.8) : Math.round(entryPrice * 1.03);

  return {
    scores,
    totalScore,
    lossLevel,
    verdict,
    maxStopPrice,
    maxStopRate,
    recommendedStopPrice,
    recoveryTarget,
    reboundTarget
  };
}

function buildIndicators(stock, data, isBefore0908) {
  const indicators = [];
  let decision = 'hold';
  let actionStage = null;
  let triggeredRule = null;

  const entry = getEntryByCode(stock.code);
  const targets = parseTradePlanTargets(entry);
  const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;
  const gainRate = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;

  if (stock.type === 'swing') {
    indicators.push({
      title: '분석 유형',
      criterion: 'v3.4 스윙 운용 규칙: 거부조건(R1~R4) → 강제 청산 트리거 → 손실 관리 판정 → 일반 매도 단계',
      status: 'unknown',
      result: `스윙 보유 (매수일 ${stock.buyDate || '—'}, 매수가 ${entryPrice.toLocaleString()}원, 수익률 ${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}%)`
    });

    const rejections = [];

    const r1Triggered = data.ma20 > 0 && data.currentPrice < data.ma20;
    rejections.push({
      code: 'R1', title: '20MA 이탈 종가',
      criterion: '종가가 20일 이동평균선 아래 → 즉시 손절',
      triggered: r1Triggered,
      result: data.ma20 > 0
        ? (r1Triggered ? `현재가 ${data.currentPrice.toLocaleString()} < 20MA ${data.ma20.toLocaleString()} → 이탈` : `현재가 ${data.currentPrice.toLocaleString()} > 20MA ${data.ma20.toLocaleString()} — 유지`)
        : '20MA 미산출 (데이터 부족)'
    });

    const volRatio = data.volMa5 > 0 && data.todayVolume > 0 ? (data.todayVolume / data.volMa5) * 100 : null;
    const r2Triggered = volRatio !== null && volRatio < 50;
    rejections.push({
      code: 'R2', title: '거래량 급감 (관심 이탈)',
      criterion: '당일 거래량 < 5일 평균의 50% → 즉시 손절',
      triggered: r2Triggered,
      result: volRatio !== null
        ? (r2Triggered ? `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) → 관심 이탈` : `거래량 ${volRatio.toFixed(0)}% (5일 평균 대비) — 정상`)
        : '거래량 데이터 미산출'
    });

    const r3Triggered = data.foreignNet < 0 && data.institutionNet < 0;
    const r3Checkable = data.foreignNet !== 0 || data.institutionNet !== 0;
    rejections.push({
      code: 'R3', title: '외국인+기관 동시 순매도',
      criterion: '외국인과 기관이 동시 순매도 시 → 즉시 손절',
      triggered: r3Triggered,
      result: r3Checkable
        ? (r3Triggered ? `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 → 동시 순매도` : `외국인 ${data.foreignNet.toLocaleString()}주 / 기관 ${data.institutionNet.toLocaleString()}주 — 정상`)
        : '수급 데이터 미확인'
    });

    const stopRate = -5;
    const r4Triggered = gainRate < stopRate;
    rejections.push({
      code: 'R4', title: `진입가 대비 ${stopRate}% 이탈`,
      criterion: `종가 < 진입가 ${stopRate}% → 즉시 손절 (위험 손실 구간)`,
      triggered: r4Triggered,
      result: r4Triggered
        ? `진입가 대비 ${gainRate.toFixed(2)}% → 위험 손실, 즉시 청산`
        : `진입가 대비 ${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}% — 유지`
    });

    const triggeredRejections = rejections.filter(r => r.triggered);
    rejections.forEach(r => {
      indicators.push({
        title: `[${r.code}] ${r.title}`,
        criterion: r.criterion,
        status: r.triggered ? 'triggered' : 'clear',
        result: r.result
      });
    });

    if (triggeredRejections.length > 0) {
      decision = 'sell';
      actionStage = 'reject';
      triggeredRule = triggeredRejections[0];
      const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio);
      return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement };
    }

    const below60ma = data.ma60 > 0 && data.currentPrice < data.ma60;
    if (below60ma) {
      indicators.push({
        title: '[강제청산] 60MA 이탈',
        criterion: '60MA 아래로 이탈 시 무조건 청산 (예외 없음)',
        status: 'triggered',
        result: `현재가 ${data.currentPrice.toLocaleString()} < 60MA ${data.ma60.toLocaleString()} → 즉시 청산`
      });
      decision = 'sell';
      actionStage = 'reject';
      triggeredRule = { code: '60MA', title: '60MA 이탈 강제 청산', triggered: true };
      const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio);
      return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement };
    }
    if (data.ma60 > 0) {
      indicators.push({
        title: '60MA 추세',
        criterion: '60MA 이탈 시 무조건 청산',
        status: 'clear',
        result: `현재가 ${data.currentPrice.toLocaleString()} > 60MA ${data.ma60.toLocaleString()} — 장기 추세 유지`
      });
    }

    // 손실 관리 판정 (손실 구간일 때 적용)
    const lossManagement = buildSwingLossManagement(data, entryPrice, gainRate, volRatio);

    if (gainRate < 0) {
      lossManagement.scores.forEach(s => {
        indicators.push({
          title: `[${s.code}] ${s.title}`,
          criterion: s.criterion,
          status: s.pass ? 'clear' : 'triggered',
          result: s.result
        });
      });

      indicators.push({
        title: '손실 관리 종합 판정',
        criterion: `6점 만점 기준: 5~6 홀드 / 3~4 비중 축소 / 1~2 전량 손절 / 0 즉시 청산`,
        status: lossManagement.totalScore >= 5 ? 'clear' : lossManagement.totalScore >= 3 ? 'unknown' : 'triggered',
        result: `${lossManagement.totalScore}/6점 → ${lossManagement.verdict}`
      });

      if (lossManagement.totalScore <= 2) {
        decision = 'sell';
        actionStage = 'loss_cut';
      } else if (lossManagement.totalScore <= 4) {
        decision = 'caution';
        actionStage = 'partial_exit';
      } else {
        decision = 'hold';
        actionStage = 'swing';
      }
    } else {
      // 수익 구간: 기존 트레일링 로직
      const below5ma = data.ma5 > 0 && data.currentPrice < data.ma5;
      if (below5ma) {
        indicators.push({
          title: '5MA 이탈 (2차 트레일링)',
          criterion: '5MA 이탈 시 40% 추가 정리 구간',
          status: 'triggered',
          result: `현재가 ${data.currentPrice.toLocaleString()} < 5MA ${data.ma5.toLocaleString()} → 40% 추가 정리 권고`
        });
        decision = 'caution';
        actionStage = 'partial_exit';
      } else if (gainRate >= 3) {
        indicators.push({
          title: '스윙 수익 구간',
          criterion: '진입가 대비 +3% 이상 도달 시 1차 트레일링 익절 검토 (30% 정리)',
          status: 'clear',
          result: `진입가 대비 +${gainRate.toFixed(2)}% — 1차 트레일링 익절 구간 (첫 음봉 OR +3% 추가 시 30% 정리)`
        });
        decision = 'hold';
        actionStage = 'swing';
      } else {
        indicators.push({
          title: '스윙 보유 상태',
          criterion: '거부조건·강제청산 미해당, 추세 유지 중',
          status: 'clear',
          result: `진입가 대비 +${gainRate.toFixed(2)}% — 홀딩 유지`
        });
        decision = 'hold';
        actionStage = 'swing';
      }
    }

    // 추세 요약
    const below5maFinal = data.ma5 > 0 && data.currentPrice < data.ma5;
    if (data.ma5 > 0 && data.ma20 > 0 && !below5maFinal) {
      const trendOk = data.currentPrice > data.ma5 && data.currentPrice > data.ma20;
      indicators.push({
        title: '이평선 배치',
        criterion: '현재가 > 5MA > 20MA 정배열 유지 시 스윙 지속 근거',
        status: trendOk ? 'clear' : 'unknown',
        result: trendOk
          ? `정배열 유지 (현재가 ${data.currentPrice.toLocaleString()} > 5MA ${data.ma5.toLocaleString()} > 20MA ${data.ma20.toLocaleString()})`
          : `현재가 ${data.currentPrice.toLocaleString()} | 5MA ${data.ma5.toLocaleString()} | 20MA ${data.ma20.toLocaleString()}`
      });
    }

    // 동적 가격 라인 (손절가/목표가)
    indicators.push({
      title: '동적 가격 라인',
      criterion: '최대 손절가: MAX(20MA 이탈가, 진입가×0.95, 5일 저점) | 권장 손절가: 현재가 -2% 또는 5MA 이탈가',
      status: 'unknown',
      result: `최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 (${lossManagement.maxStopRate >= 0 ? '+' : ''}${lossManagement.maxStopRate.toFixed(1)}%) | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원 | 반등목표 ${lossManagement.recoveryTarget.toLocaleString()}원`
    });

    return { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement };
  }

  if (stock.type === 'pullback' && isBefore0908) {
    indicators.push({
      title: '분석 단계',
      criterion: '눌림목 베팅은 9시 8분 이후에 매도/손절 분석이 시작됩니다.\n현재는 대기 상태입니다.',
      status: 'unknown',
      result: '1차: 눌림목 베팅 분석 대기 중 (9:08 이후 시작)'
    });
    return { indicators, decision: 'hold', actionStage: 'wait', triggeredRule: null, targets, gainRate };
  }

  const stageLabel = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';
  const stageDesc = stock.type === 'momentum' && isBefore0908
    ? '수급 매집형: 시초가 하락 전환 시 50% 추가 정리 + 손절 점검'
    : '매도 단계 판정 + 손절 조건(R1~R4) 검증';
  indicators.push({
    title: '분석 단계',
    criterion: stageDesc,
    status: 'unknown',
    result: `${stageLabel} 진행 중`
  });

  const rejections = checkRejectionConditions(stock, data, isBefore0908, targets);
  const triggeredRejections = rejections.filter(r => r.triggered);

  rejections.forEach(r => {
    indicators.push({
      title: `[${r.code}] ${r.title}`,
      criterion: r.criterion,
      status: r.triggered ? 'triggered' : 'clear',
      result: r.result,
      value: r.value
    });
  });

  if (triggeredRejections.length > 0) {
    decision = 'sell';
    actionStage = 'reject';
    triggeredRule = triggeredRejections[0];

    if (triggeredRejections[0].code === 'R3') {
      decision = 'caution';
      actionStage = 'partial_exit';
    }

    return { indicators, decision, actionStage, triggeredRule: triggeredRejections[0], targets, gainRate };
  }

  const stageResult = evaluateTradeStage(data, targets, data.prevClose);
  indicators.push({
    title: '매도 단계 판정',
    criterion: `진입가(${entryPrice ? entryPrice.toLocaleString() + '원' : '미설정'}) 대비 현재 위치를 매매전략 구간에 매칭합니다.`,
    status: stageResult.stage === 'underwater' ? 'triggered' : (stageResult.stage === 'hold' ? 'unknown' : 'clear'),
    result: `${stageResult.label} — ${stageResult.detail}`,
    value: `진입가 대비 수익률: ${gainRate.toFixed(2)}%`
  });

  actionStage = stageResult.stage;

  if (['premarket', 'openPhase', 'intraday1', 'intraday2'].includes(stageResult.stage)) {
    decision = 'caution';
  } else if (stageResult.stage === 'swing') {
    decision = 'hold';
  } else if (stageResult.stage === 'underwater') {
    decision = 'caution';
  }

  if (data.strength) {
    const threshold = stock.type === 'momentum' ? 100 : 80;
    const weakStr = data.strength < threshold;
    indicators.push({
      title: '체결강도 점검',
      criterion: `체결강도가 ${threshold}% 미만이면 매도세 우위로 전환 의심.\n기준: 체결강도 < ${threshold}%`,
      status: weakStr ? 'triggered' : 'clear',
      result: weakStr
        ? `체결강도 ${data.strength.toFixed(1)}% — 매도세 전환 의심`
        : `체결강도 ${data.strength.toFixed(1)}% — 매수세 유지`,
      value: `체결강도 ${data.strength.toFixed(1)}% (기준: ${threshold}%)`
    });
    if (weakStr && decision !== 'sell') decision = 'caution';
  }

  return { indicators, decision, actionStage, triggeredRule, targets, gainRate };
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

  const entry = getEntryByCode(stock.code);
  const entryPrice = stock.entryPrice || entry?.entryPriceValue || data.prevClose;
  const gainFromEntry = entryPrice > 0 ? ((data.currentPrice - entryPrice) / entryPrice) * 100 : 0;

  priceRow.innerHTML = `
    <span class="price">${data.currentPrice.toLocaleString()}원</span>
    <span class="chg ${chgClass}" style="font-size:14px;font-weight:700">${chgPrefix}${absChg}%</span>
    ${stock.type === 'swing' ? `<span class="chg ${gainFromEntry >= 0 ? 'up' : 'dn'}" style="font-size:12px;margin-left:8px">매수 대비 ${gainFromEntry >= 0 ? '+' : ''}${gainFromEntry.toFixed(2)}%</span>` : ''}
  `;
  meta.innerHTML = `
    <span style="opacity:0.7">진입가:</span> <strong>${entryPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">시가:</span> <strong>${data.openPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">체결강도:</span> <strong>${data.strength ? `${data.strength.toFixed(2)}%` : '-'}</strong>
  `;

  const { indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement } = buildIndicators(stock, data, isBefore0908);

  const visibleIndicators = indicators.filter(ind => ind.status !== 'unknown');
  const displayIndicators = visibleIndicators.length > 0 ? visibleIndicators : indicators;

  let cardIndicatorHtml = displayIndicators
    .map(indicator => `<div class="ind-item ${indicator.status}">${indicator.title}: ${indicator.result}</div>`)
    .join('');

  if (stock.type === 'swing' && lossManagement && gainRate < 0) {
    cardIndicatorHtml += `<div class="ind-item ${lossManagement.totalScore >= 5 ? 'clear' : lossManagement.totalScore >= 3 ? 'unknown' : 'triggered'}" style="margin-top:4px;font-weight:700">
      손실 관리: ${lossManagement.verdict} | 최대손절 ${lossManagement.maxStopPrice.toLocaleString()}원 | 권장손절 ${lossManagement.recommendedStopPrice.toLocaleString()}원
    </div>`;
  }

  indBox.innerHTML = cardIndicatorHtml;

  card.className = `scard ${decision}`;
  const badgeInfo = getActionBadge(decision, actionStage);
  badge.className = `badge ${badgeInfo.cls}`;
  badge.innerText = badgeInfo.text;

  stockDetailMap[stock.code] = { mode: 'sell', stock, data, indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, isBefore0908 };
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
  currentModalState = { code, mode };
  const detailModal = document.getElementById('detail-modal');

  if (mode === 'buy') {
    detailModal.classList.add('buy-detail-mode');
    const entry = detail;
    const presentation = getBuyPresentation(entry);
    document.getElementById('modal-name').textContent = entry.name;
    document.getElementById('modal-code').textContent = entry.code;
    document.getElementById('modal-type').textContent = `${STRATEGY_META[entry.strategy].label} · ${entry.rank}위`;

    const verdictClass = presentation.verdictClass;
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
              <div class="price-big ${presentation.changed.score ? 'buy-changed' : ''}">${presentation.score.toFixed(1)} / 10</div>
              <div class="buy-modal-scoreline"><span class="${presentation.changed.grade ? 'buy-changed' : ''}">${escapeHtml(presentation.grade)}</span> · <span class="${presentation.changed.statusLabel ? 'buy-changed' : ''}">${escapeHtml(presentation.statusLabel)}</span></div>
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

          ${presentation.liveRefresh ? `
            <div class="buy-live-meta buy-live-meta-modal">
              <span class="buy-live-pill ${presentation.changed.score || presentation.changed.grade ? 'buy-changed' : ''}">네이버 컨센서스 ${presentation.liveRefresh.recommMean.toFixed(2)} / 5.00</span>
              ${presentation.liveRefresh.currentPrice ? `<span class="buy-live-pill">현재가 ${formatWon(presentation.liveRefresh.currentPrice)}</span>` : ''}
              ${presentation.liveRefresh.targetPrice ? `<span class="buy-live-pill ${presentation.changed.statusLabel ? 'buy-changed' : ''}">목표가 ${formatWon(presentation.liveRefresh.targetPrice)} (${formatSignedPercent(presentation.liveRefresh.upsideRate)})</span>` : ''}
              ${presentation.liveRefresh.asOf ? `<span class="buy-live-pill">기준 ${escapeHtml(formatCompactDate(presentation.liveRefresh.asOf))}</span>` : ''}
            </div>
          ` : ''}

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
    const { stock, data, indicators, decision, actionStage, triggeredRule, targets, gainRate, lossManagement, isBefore0908 } = detail;
    document.getElementById('modal-name').textContent = stock.name;
    document.getElementById('modal-code').textContent = stock.code;
    document.getElementById('modal-type').textContent = stock.type === 'swing' ? '🔄 스윙 보유' : stock.type === 'pullback' ? '📊 눌림목 종가베팅' : '🔥 수급 매집형 종가베팅';

    const chgClass = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
    const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
    const absChg = Math.abs(data.chgRate).toFixed(2);
    const entryPrice = stock.entryPrice || targets?.entryPrice || data.prevClose;

    const badgeInfo = getActionBadge(decision, actionStage);
    const verdictCls = decision === 'sell' ? 'sell' : decision === 'caution' ? 'caution' : 'hold';
    const stageCls = isBefore0908 ? 'stage1' : 'stage2';
    const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';

    const notionEntry = getEntryByCode(stock.code);
    const tradePlanHtml = notionEntry ? renderTradePlanTable(notionEntry) : '<div class="empty-state compact">매매 전략 정보가 노션에 없습니다.</div>';

    const triggeredRuleHtml = triggeredRule ? `
      <div class="modal-triggered-rule">
        <div class="modal-section-label">🚨 트리거된 규칙</div>
        <div class="modal-ind-card triggered">
          <div class="modal-ind-icon">🛑</div>
          <div class="modal-ind-content">
            <div class="modal-ind-title">[${escapeHtml(triggeredRule.code)}] ${escapeHtml(triggeredRule.title)}</div>
            <div class="modal-ind-criterion">${triggeredRule.criterion ? triggeredRule.criterion.split('\n').map(l => `<span>${escapeHtml(l)}</span>`).join('<br>') : ''}</div>
            <div class="modal-ind-result">→ ${escapeHtml(triggeredRule.result || '')}</div>
            ${triggeredRule.value ? `<div class="modal-ind-value">📐 ${escapeHtml(triggeredRule.value)}</div>` : ''}
          </div>
        </div>
      </div>
    ` : '';

    const lossManagementHtml = (stock.type === 'swing' && lossManagement) ? `
      <div class="loss-management-panel">
        <div class="modal-section-label">📉 손실 관리 판정</div>
        <div class="loss-verdict ${lossManagement.lossLevel}">
          <div class="loss-verdict-score">${lossManagement.totalScore} / 6</div>
          <div class="loss-verdict-text">${lossManagement.verdict}</div>
        </div>
        <div class="loss-prices">
          <div class="loss-price-item danger">
            <span class="loss-price-label">최대 손절가</span>
            <span class="loss-price-value">${lossManagement.maxStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(${lossManagement.maxStopRate >= 0 ? '+' : ''}${lossManagement.maxStopRate.toFixed(1)}%)</span>
          </div>
          <div class="loss-price-item warning">
            <span class="loss-price-label">권장 손절가</span>
            <span class="loss-price-value">${lossManagement.recommendedStopPrice.toLocaleString()}원</span>
            <span class="loss-price-rate">(현재가 -2% 또는 5MA)</span>
          </div>
          <div class="loss-price-item recovery">
            <span class="loss-price-label">회복 목표가</span>
            <span class="loss-price-value">${lossManagement.recoveryTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(진입가 +1%)</span>
          </div>
          <div class="loss-price-item target">
            <span class="loss-price-label">반등 익절가</span>
            <span class="loss-price-value">${lossManagement.reboundTarget.toLocaleString()}원</span>
            <span class="loss-price-rate">(20일 고점 80%)</span>
          </div>
        </div>
        <div class="loss-score-grid">
          ${lossManagement.scores.map(s => `
            <div class="loss-score-item ${s.pass ? 'pass' : 'fail'}">
              <span class="loss-score-icon">${s.pass ? '✅' : '❌'}</span>
              <span class="loss-score-code">${s.code}</span>
              <span class="loss-score-title">${escapeHtml(s.title)}</span>
              <span class="loss-score-result">${escapeHtml(s.result)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    document.getElementById('modal-body').innerHTML = `
      <div class="modal-price-bar">
        <span class="price-big">${data.currentPrice.toLocaleString()}원</span>
        <span class="chg-big ${chgClass}">${chgPrefix}${absChg}%</span>
        <div class="modal-stats">
          <div class="modal-stat">
            <span class="modal-stat-label">진입가</span>
            <span class="modal-stat-value">${entryPrice.toLocaleString()}원</span>
          </div>
          <div class="modal-stat">
            <span class="modal-stat-label">수익률</span>
            <span class="modal-stat-value" style="color:${gainRate >= 0 ? 'var(--text-success)' : 'var(--text-danger)'}">${gainRate >= 0 ? '+' : ''}${gainRate.toFixed(2)}%</span>
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

      <div class="modal-verdict ${verdictCls}">${badgeInfo.text}</div>

      ${triggeredRuleHtml}
      ${lossManagementHtml}

      <div>
        <div class="modal-section-label">매매 전략 (노션)</div>
        ${tradePlanHtml}
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
    `;
  }

  document.getElementById('modal-overlay').classList.add('open');
  syncBodyScrollLock();
}

function closeModal() {
  currentModalState = { code: null, mode: null };
  document.getElementById('modal-overlay').classList.remove('open');
  syncBodyScrollLock();
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
  document.getElementById('btn-regime-report').addEventListener('click', openRegimeReport);
  document.getElementById('regime-report-close-btn').addEventListener('click', closeRegimeReport);
  document.getElementById('regime-report-overlay').addEventListener('click', event => {
    if (event.target === document.getElementById('regime-report-overlay')) closeRegimeReport();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      closeGuideModal();
      closeRegimeReport();
    }
  });
});
