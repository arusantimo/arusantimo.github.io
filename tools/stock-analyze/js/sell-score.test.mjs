import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadSellScoreContext() {
  const code = fs.readFileSync(new URL('./sell-score.js', import.meta.url), 'utf8');
  const context = {
    console,
    clamp: (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max),
    formatWon: value => `${Math.round(Number(value) || 0).toLocaleString()}원`
  };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

test('하드 손절은 점수 100과 전량 매도로 고정된다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'momentum' },
    payload: {
      actionStage: 'hold',
      triggeredRule: { severity: 'hard', code: 'H1', title: '유효 손절가 이탈', result: '즉시 전량 매도' },
      targets: { stopLoss: { price: 9500 } }
    },
    data: { currentPrice: 9400, openPrice: 9600, strength: 120 },
    isBefore0908: false,
    ruleSet: { effectiveStopPrice: 9500, fallbackStopPrice: 9600, rules: [] }
  });

  assert.equal(result.sellScore, 100);
  assert.equal(result.actionPlan.bucket, 'full_exit');
  assert.equal(result.actionPlan.sellNowPct, 100);
  assert.equal(result.actionPlan.recheckLabel, '즉시 실행');
});

test('수급 매집형 9:08 이전 시초가 미회복은 최소 70점과 70% 축소를 만든다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'momentum' },
    payload: {
      actionStage: 'hold',
      triggeredRule: null,
      targets: { stopLoss: { price: 9500 } },
      gapProfile: {}
    },
    data: { currentPrice: 9900, openPrice: 10000, strength: 110 },
    isBefore0908: true,
    ruleSet: { effectiveStopPrice: 9500, fallbackStopPrice: 9600, partialSignals: [], hardSignals: [], rules: [] }
  });

  assert.equal(result.sellScore, 70);
  assert.equal(result.actionPlan.bucket, 'trim70');
  assert.equal(result.actionPlan.sellNowPct, 70);
  assert.equal(result.actionPlan.holdPct, 30);
  assert.equal(result.actionPlan.recheckLabel, '09:08 재분석');
});

test('5일선 경고 단독 신호는 70% 이상 매도로 승격되지 않는다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'momentum' },
    payload: {
      actionStage: 'warning',
      triggeredRule: null,
      targets: { stopLoss: { price: 9000 } },
      gapProfile: {}
    },
    data: { currentPrice: 9750, openPrice: 9800, strength: 120 },
    isBefore0908: false,
    ruleSet: {
      effectiveStopPrice: 9000,
      fallbackStopPrice: 9000,
      partialSignals: [],
      hardSignals: [],
      rules: [{ code: 'W2', triggered: true }]
    }
  });

  assert.ok(result.sellScore <= 54);
  assert.notEqual(result.actionPlan.bucket, 'full_exit');
  assert.notEqual(result.actionPlan.bucket, 'trim70');
});

test('프리마켓 보수 운용 partial 신호는 최소 70점으로 유지된다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'momentum' },
    payload: {
      actionStage: 'partial_exit',
      triggeredRule: { code: 'P1', severity: 'soft', bucket: 'partial', result: '50% 선정리 우선' },
      targets: { stopLoss: { price: 9800 } },
      gapProfile: {}
    },
    data: { currentPrice: 10050, openPrice: 10100, strength: 108 },
    isBefore0908: true,
    ruleSet: {
      effectiveStopPrice: 9800,
      fallbackStopPrice: 9800,
      partialSignals: [{ code: 'P1' }],
      hardSignals: [],
      rules: [{ code: 'P1', triggered: true }]
    }
  });

  assert.equal(result.sellScore, 70);
  assert.equal(result.actionPlan.bucket, 'trim70');
});

test('단계형 익절 구간은 다음 단계 재평가 문구를 유지한다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'pullback' },
    payload: {
      actionStage: 'intraday1',
      triggeredRule: null,
      targets: { stopLoss: { price: 9500 } },
      gapProfile: {}
    },
    data: { currentPrice: 10000, openPrice: 10100, strength: 95 },
    isBefore0908: false,
    ruleSet: { effectiveStopPrice: 9500, fallbackStopPrice: 9500, partialSignals: [], hardSignals: [], rules: [] },
    stageResult: { stage: 'intraday1', detail: '1차 익절 구간' }
  });

  assert.equal(result.actionPlan.bucket, 'hold');
  assert.equal(result.actionPlan.recheckLabel, '다음 매매 단계 도달 시 재평가');
});

test('스윙 약화 시나리오는 50% 축소 플랜으로 연결된다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'swing' },
    payload: {
      actionStage: 'hold',
      triggeredRule: null,
      gainRate: -1,
      lossManagement: {
        totalScore: 45,
        holdThreshold: 60,
        recommendedStopPrice: 24100,
        maxStopPrice: 23500
      },
      gapProfile: {
        code: 'G-B',
        swingMode: 'conditional',
        swingText: '조건부 유지',
        comparison: { available: false }
      }
    },
    data: {
      currentPrice: 25000,
      ma20: 24800,
      ma5Direction: 'down',
      volMa5: 100000,
      todayVolume: 60000,
      foreignNet: -1000,
      institutionNet: -500,
      strength: 88,
      low5d: 24700
    },
    isBefore0908: false
  });

  assert.equal(result.sellScore, 55);
  assert.equal(result.actionPlan.bucket, 'trim50');
  assert.equal(result.actionPlan.sellNowPct, 50);
  assert.equal(result.actionPlan.followUpStopPrice, 24100);
});

test('건강한 스윙 수익 구간은 홀딩 또는 낮은 점수 구간을 유지한다', () => {
  const { buildSellExecutionContext } = loadSellScoreContext();
  const result = buildSellExecutionContext({
    stock: { type: 'swing' },
    payload: {
      actionStage: 'swing',
      triggeredRule: null,
      gainRate: 4.2,
      lossManagement: {
        totalScore: 80,
        holdThreshold: 60,
        recommendedStopPrice: 25200,
        maxStopPrice: 24800
      },
      gapProfile: {
        code: 'G-A',
        swingMode: 'allow',
        swingText: '허용',
        comparison: { available: true, bias: 0, summary: '노션 대비 변화 없음' }
      }
    },
    data: {
      currentPrice: 26000,
      ma20: 25200,
      ma5Direction: 'up',
      volMa5: 100000,
      todayVolume: 120000,
      foreignNet: 500,
      institutionNet: 250,
      strength: 110,
      low5d: 24900
    },
    isBefore0908: false
  });

  assert.ok(result.sellScore < 40);
  assert.equal(result.actionPlan.bucket, 'hold');
});
