import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadNotionContext() {
  const files = ['gap.js', 'utils.js', 'notion.js'];
  const code = files
    .map(file => fs.readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'))
    .join('\n');

  const context = { console };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

test('종목 헤더는 점수 앞 추정 표기를 허용한다', () => {
  const { parseStockHeader } = loadNotionContext();
  const parsed = parseStockHeader(
    '1위. SK하이닉스 (000660) — 추정 6.0/10 [B등급] ← 매매금지(약세장+G3·G5 미충족 관망)',
    'momentum'
  );

  assert.ok(parsed);
  assert.equal(parsed.rank, 1);
  assert.equal(parsed.name, 'SK하이닉스');
  assert.equal(parsed.code, '000660');
  assert.equal(parsed.score, 6.0);
  assert.equal(parsed.grade, 'B등급');
});

test('종목 헤더는 기존 점수 형식도 그대로 허용한다', () => {
  const { parseStockHeader } = loadNotionContext();
  const parsed = parseStockHeader(
    '1위. 삼성전자 (005930) — 6.0/10 [B등급] ← 매매금지',
    'momentum'
  );

  assert.ok(parsed);
  assert.equal(parsed.score, 6.0);
  assert.equal(parsed.statusLabel, '매매금지');
});

test('종목 헤더는 점수 미산출 형식도 파싱한다', () => {
  const { parseStockHeader } = loadNotionContext();
  const parsed = parseStockHeader(
    '1위. 한미반도체 (042700) — 추정 점수 미산출 [데이터 부족] ← 매매금지(약세장)',
    'pullback'
  );

  assert.ok(parsed);
  assert.equal(parsed.rank, 1);
  assert.equal(parsed.name, '한미반도체');
  assert.equal(parsed.code, '042700');
  assert.equal(parsed.score, null);
  assert.equal(parsed.grade, '데이터 부족');
  assert.equal(parsed.scoreUnavailable, true);
  assert.equal(parsed.scoreLabel, '미산출');
  assert.equal(parsed.statusLabel, '매매금지(약세장)');
});

test('Claude 페이지형 점수 미산출 라인도 매수 후보로 집계된다', () => {
  const { parseNotionSnapshotFromText } = loadNotionContext();
  const sourceText = `
## 🔥 수급매집형 종가베팅 신규 진입 TOP 3
### 1위. SK하이닉스 (000660) — 추정 점수 미산출 [데이터 부족] ← 매매금지(약세장)
- Gate: G1✅ G2⚠️
### 2위. 삼성전자 (005930) — 추정 점수 미산출 [데이터 부족] ← 매매금지(약세장)
## ⚡ 눌림목 종가베팅 신규 진입 TOP 3
### 1위. 한미반도체 (042700) — 추정 점수 미산출 ← 매매금지(약세장)
## 🔻 주도주 급락 반등 후보 (전략 ③)
### 1위. SK하이닉스 (000660) — 데이터 부족으로 점수 미산출 ← 매매금지(약세장+G-D)
`.trim();

  const snapshot = parseNotionSnapshotFromText(sourceText);

  assert.equal(snapshot.momentumEntries.length, 2);
  assert.equal(snapshot.pullbackEntries.length, 1);
  assert.equal(snapshot.reversalEntries.length, 1);
  assert.equal(snapshot.momentumEntries[0].scoreUnavailable, true);
  assert.equal(snapshot.reversalEntries[0].grade, '데이터 부족');
});
