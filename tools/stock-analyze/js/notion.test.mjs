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
