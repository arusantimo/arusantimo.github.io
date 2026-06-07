import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadSupportLevelsContext() {
  const code = fs.readFileSync(new URL('./support-levels.js', import.meta.url), 'utf8');
  const context = { console, window: null };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

function makeBar(close, low = close - 1, high = close + 1, volume = 100, date = '') {
  return { open: close, high, low, close, volume, date };
}

test('support-levels는 ohlcvSeries만으로 strong 지지 경고를 계산한다', () => {
  const { analyzePullbackSupportLevels, buildPullbackSupportGate } = loadSupportLevelsContext();
  const bars = Array.from({ length: 25 }, (_, index) => {
    const close = 102 + (index % 2);
    return makeBar(close, close - 1, close + 1, 100, `2026-05-${String(index + 1).padStart(2, '0')}`);
  });
  bars[8] = makeBar(99, 98, 100, 100, '2026-05-09');
  bars[12] = makeBar(103, 102, 104, 100, '2026-05-13');
  bars[16] = makeBar(99, 98, 100, 420, '2026-05-17');
  bars[20] = makeBar(104, 103, 105, 120, '2026-05-21');
  bars[24] = makeBar(107, 106, 108, 110, '2026-05-25');

  const result = analyzePullbackSupportLevels(bars, { currentPrice: 107 });
  const gate = buildPullbackSupportGate(result);

  assert.equal(result.support.strengthLabel, 'strong');
  assert.equal(result.support.warningLevel, 'clear');
  assert.equal(gate.status, '✅');
});

test('support-levels는 지지 부재 시 danger와 G9 차단을 반환한다', () => {
  const { analyzePullbackSupportLevels, buildPullbackSupportGate } = loadSupportLevelsContext();
  const bars = Array.from({ length: 25 }, (_, index) => {
    const close = 120 - index * 2;
    return makeBar(close, close - 1, close + 1, 100 + index, `2026-05-${String(index + 1).padStart(2, '0')}`);
  });

  const result = analyzePullbackSupportLevels(bars, { currentPrice: 60 });
  const gate = buildPullbackSupportGate(result);

  assert.equal(result.support.warningLevel, 'danger');
  assert.equal(gate.status, '⛔');
});
