import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadBridgeContext() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./market-analyze-bridge.js', import.meta.url), 'utf8'), context);
  return context;
}

test('computeEffectiveRegimeLabel upgrades box to strong bull when macro and kospi agree', () => {
  const ctx = loadBridgeContext();
  const result = ctx.computeEffectiveRegimeLabel('박스권 ⚠️', true, 'strong');
  assert.equal(result.effective, '강세장 ✅ (펀더·지수 정당)');
});

test('recalculateTrendStatusLabel respects effective bull regime', () => {
  const ctx = loadBridgeContext();
  const label = ctx.recalculateTrendStatusLabel('A', '강세장 ✅ (펀더·지수 정당)', 'G-A', [], {
    riseJustifiedByMacro: true,
    technicalRegimeLabel: '약세장 ⛔'
  });
  assert.equal(label, '매수추천');
});

test('buildPullbackG5Gate warns for vkospi 68 when macro friendly', () => {
  const ctx = loadBridgeContext();
  const gate = ctx.buildPullbackG5Gate({
    kospiClose: 8100,
    kospiMa5: 7600,
    vkospiValue: 68,
    vkospiLabel: 'VKOSPI',
    riseJustifiedByMacro: true,
    effectiveRegimeLabel: '강세장 ✅ (펀더·지수 정당)'
  });
  assert.equal(gate.status, '⚠️');
  const label = ctx.recalculateTrendStatusLabel('A', '강세장 ✅ (펀더·지수 정당)', 'G-A', [gate], {
    riseJustifiedByMacro: true
  });
  assert.equal(label, '매수추천');
});

test('buildPullbackG5Gate warns for vkospi 68 even without macro-friendly context', () => {
  const ctx = loadBridgeContext();
  const gate = ctx.buildPullbackG5Gate({
    kospiClose: 8100,
    kospiMa5: 7600,
    vkospiValue: 68,
    vkospiLabel: 'VKOSPI',
    riseJustifiedByMacro: false,
    effectiveRegimeLabel: '박스권 ⚠️'
  });
  assert.equal(gate.status, '⚠️');
});

test('buildPullbackG5Gate blocks above warn cap without macro-friendly context', () => {
  const ctx = loadBridgeContext();
  const gate = ctx.buildPullbackG5Gate({
    kospiClose: 8100,
    kospiMa5: 7600,
    vkospiValue: 78,
    vkospiLabel: 'VKOSPI',
    riseJustifiedByMacro: false,
    effectiveRegimeLabel: '박스권 ⚠️'
  });
  assert.equal(gate.status, '⛔');
});

test('isRiseJustifiedByMacro rejects critical bubble', () => {
  const ctx = loadBridgeContext();
  const snapshot = {
    meta: { resultDate: '20260526' },
    data: {
      bubbleCriticalTrigger: true,
      fundamentalAnchorState: 'validated',
      fundamentalAnchorScore: 90,
      marketRegimeKey: 'anchor-buffered-overheat',
      bubbleIndex: 40
    }
  };
  assert.equal(ctx.isRiseJustifiedByMacro(snapshot, '20260526'), false);
});
