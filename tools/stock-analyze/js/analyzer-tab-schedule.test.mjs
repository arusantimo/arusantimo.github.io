import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const utilsCode = fs.readFileSync(new URL('./utils.js', import.meta.url), 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(utilsCode, context);

test('00:00~13:59 기본 탭은 매도', () => {
  assert.equal(context.getDefaultAnalyzerTab(new Date(2026, 4, 26, 0, 0, 0)), 'sell');
  assert.equal(context.getDefaultAnalyzerTab(new Date(2026, 4, 26, 13, 59, 59)), 'sell');
});

test('14:00~23:59 기본 탭은 매수', () => {
  assert.equal(context.getDefaultAnalyzerTab(new Date(2026, 4, 26, 14, 0, 0)), 'buy');
  assert.equal(context.getDefaultAnalyzerTab(new Date(2026, 4, 26, 23, 59, 59)), 'buy');
});
