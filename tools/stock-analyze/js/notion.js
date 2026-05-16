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
    if (heading.includes('갭 예측 스코어') || heading.includes('갭 스코어')) {
      lines.push('## 익일 갭 예측 스코어');
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
    if (heading.includes('급락 반등') || heading.includes('전략 ③')) {
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

    const headingMatch = line.match(/^#{2,3}\s*(.+)$/);
    if (headingMatch) {
      currentEntry = null;
      const heading = normalizeHeading(headingMatch[1]);
      if (!/^\d+위\./.test(heading)) {
        if (heading.includes('시장 레짐') || heading.includes('레짐 판정') || heading.includes('레짐 요약')) {
          currentSection = 'regime';
        } else if (heading.includes('익일 갭 예측 스코어') || heading.includes('갭 예측 스코어') || heading.includes('갭 스코어')) {
          currentSection = 'gap';
        } else if (heading.includes('스윙') && heading.includes('전환') && heading.includes('평가')) {
          currentSection = 'swing';
        } else if (heading.includes('눌림목') && heading.includes('종가베팅')) {
          currentSection = 'pullback';
        } else if (heading.includes('수급') && heading.includes('종가베팅')) {
          currentSection = 'momentum';
        } else if (heading.includes('급락 반등') || heading.includes('전략 ③')) {
          currentSection = 'reversal';
        } else {
          currentSection = 'other';
        }
        index += 1;
        continue;
      }
    }

    if (currentSection === 'regime' && /^\|/.test(line)) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) {
        const colCount = rows[0].length;
        let parsed = [];
        if (colCount === 2) {
          parsed = rows.slice(1).map(row => ({ item: row[0] || '', value: row[1] || '' }));
        } else if (colCount >= 3) {
          snapshot.regimeEvidence.push(...rows.slice(1).map(row => ({
            item: stripMarkdownText(row[0] || ''),
            value: stripMarkdownText(row[1] || ''),
            verdict: stripMarkdownText(row[2] || '')
          })).filter(row => row.item || row.value || row.verdict));
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

    if (currentSection === 'gap' && /^\|/.test(line)) {
      const { rows, nextIndex } = parseMarkdownTable(lines, index);
      if (rows.length > 1) parseGapScoreRows(rows, snapshot.gapScore);
      index = nextIndex;
      continue;
    }

    if (currentSection === 'gap') {
      const plainLine = stripMarkdownText(line);
      if (plainLine.startsWith('갭 등급:')) {
        snapshot.gapScore.grade = plainLine.replace(/^갭 등급:\s*/, '').trim();
      } else if (plainLine.startsWith('진입 조정:')) {
        snapshot.gapScore.entryAdjustment = plainLine.replace(/^진입 조정:\s*/, '').trim();
      } else if (plainLine.startsWith('매도 조정:')) {
        snapshot.gapScore.sellAdjustment = plainLine.replace(/^매도 조정:\s*/, '').trim();
      } else if (plainLine.startsWith('스윙 전환:')) {
        snapshot.gapScore.swingAdjustment = plainLine.replace(/^스윙 전환:\s*/, '').trim();
      } else if (plainLine.startsWith('특이사항:')) {
        snapshot.gapScore.note = plainLine.replace(/^특이사항:\s*/, '').trim();
      }
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

    if ((currentSection === 'pullback' || currentSection === 'momentum' || currentSection === 'reversal') && line.startsWith('### ')) {
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
