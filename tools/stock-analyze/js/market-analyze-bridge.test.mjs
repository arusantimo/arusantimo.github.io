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
  const label = ctx.recalculateTrendStatusLabel('pullback', 'A', '강세장 ✅ (펀더·지수 정당)', 'G-A', [], {
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
  const label = ctx.recalculateTrendStatusLabel('pullback', 'A', '강세장 ✅ (펀더·지수 정당)', 'G-A', [gate], {
    riseJustifiedByMacro: true
  });
  assert.equal(label, '매수추천');
});

test('buildPullbackG5Gate warns when kospi is below ma5', () => {
  const ctx = loadBridgeContext();
  const gate = ctx.buildPullbackG5Gate({
    kospiClose: 8100,
    kospiMa5: 8500,
    vkospiValue: 73,
    vkospiLabel: 'VKOSPI',
    riseJustifiedByMacro: false,
    effectiveRegimeLabel: '박스권 ⚠️'
  });
  assert.equal(gate.status, '⚠️');
  assert.match(gate.note, /KOSPI 단기 추세 이탈/);
});

test('recalculateTrendStatusLabel separates G5-only market gate block from general gate failure', () => {
  const ctx = loadBridgeContext();
  const marketHold = ctx.recalculateTrendStatusLabel('pullback', 'A', '강세장 ✅', 'G-A', [{ code: 'G5', status: '⛔' }], {});
  const hardBlock = ctx.recalculateTrendStatusLabel('pullback', 'A', '강세장 ✅', 'G-A', [{ code: 'G2', status: '⛔' }], {});
  assert.equal(marketHold, '시장 Gate 차단 · 신규 진입 보류');
  assert.equal(hardBlock, '매매금지(핵심 Gate 미충족: G2)');
});

test('recalculateTrendStatusLabel allows pullback B conditionally', () => {
  const ctx = loadBridgeContext();
  const label = ctx.recalculateTrendStatusLabel('pullback', 'B', '강세장 ✅ (펀더·지수 정당)', 'G-A', [], {
    riseJustifiedByMacro: true
  });
  assert.equal(label, '진입 가능(B·조건부)');
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

test('gap code labels distinguish G-D holdback and G-E entry ban', () => {
  const ctx = loadBridgeContext();
  const trendLabel = ctx.recalculateTrendStatusLabel('pullback', 'A', '강세장 ✅', 'G-E', [], {});
  const reversalLabel = ctx.recalculateReversalStatusLabel('A', '강세장 ✅', 'G-D', [], [], {});
  assert.equal(trendLabel, '매매금지(갭다운 경고 · 신규 진입 금지)');
  assert.equal(reversalLabel, '매매금지(갭다운 주의 · 신규 진입 보류)');
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
