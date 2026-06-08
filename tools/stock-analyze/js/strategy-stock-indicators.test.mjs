import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadIndicatorContext() {
  const context = {
    console,
    escapeHtml: value => String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    extractFirstNumber(text) {
      const match = String(text ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
      return match ? Number(match[0]) : null;
    },
    extractTradingValueRank(rules) {
      if (!Array.isArray(rules)) return null;
      for (const rule of rules) {
        const note = String(rule.note || '');
        if (note.includes('거래대금') && note.includes('순위')) {
          const match = note.match(/순위\s*(\d+)/);
          if (match) return Number(match[1]);
        }
      }
      return null;
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('./config.js', import.meta.url), 'utf8'), context);
  vm.runInContext(fs.readFileSync(new URL('./strategy-stock-indicators.js', import.meta.url), 'utf8'), context);
  return context;
}

test('네이버 totalInfos에서 PER/PBR을 파싱한다', () => {
  const { buildNaverFundamentalMap } = loadIndicatorContext();
  const map = buildNaverFundamentalMap({
    totalInfos: [
      { code: 'per', value: '24.22배' },
      { code: 'pbr', value: '1.42배' },
      { code: 'foreignRate', value: '34.62%' },
      { code: 'highPriceOf52Weeks', value: '307,000' },
      { code: 'lowPriceOf52Weeks', value: '190,800' }
    ]
  });
  assert.equal(map.per, 24.22);
  assert.equal(map.pbr, 1.42);
  assert.equal(map.foreignRate, 34.62);
  assert.equal(map.high52, 307000);
});

test('전략별 지표 안정도 판정이 tone을 반환한다', () => {
  const { evaluateIndicatorStability } = loadIndicatorContext();
  const def = {
    ranges: { stable: [42, 62], warn: [35, 42], abnormal: [0, 35] },
    stableHint: '눌림 적정',
    warnHint: '약세 경계',
    abnormalHint: '과매도'
  };
  const stable = evaluateIndicatorStability(50, def);
  const abnormal = evaluateIndicatorStability(20, def);
  assert.equal(stable.tone, 'stable');
  assert.equal(abnormal.tone, 'abnormal');
});

test('jongga entry rule 메모에서 눌림목 지표를 복원한다', () => {
  const { attachStockIndicatorsToEntry } = loadIndicatorContext();
  const entry = {
    strategy: 'pullback',
    name: '테스트',
    code: '005930',
    currentPrice: 279000,
    pullbackContext: {
      support: {
        primaryLine: { price: 269062, distancePct: 3.56 }
      }
    },
    pullbackStopPolicy: {
      ma20Price: 221620
    },
    gates: [
      { code: 'G8', note: '이격 20MA +25.9% (필요 ≤ +25%) · 60MA +29.9% (필요 ≤ +60%) · 과이격(지지선 눌림 아님)' },
      { code: 'G3', note: '주봉 RSI 63.0 (필요 ≥ 50)' }
    ],
    unmatchedRules: [
      { code: 'C2', note: '당일 거래량 / 5일 평균 134% (필요 ≤ 80%)' }
    ]
  };
  attachStockIndicatorsToEntry(entry, {}, {}, []);
  const snapshot = entry.stockIndicators.snapshot;
  assert.equal(snapshot.ma20GapPct, 25.9);
  assert.equal(snapshot.rsi14, 63);
  assert.equal(snapshot.volumeRatio20d, 134);
  assert.equal(snapshot.supportDistancePct, 3.56);
});

test('눌림목 모달 섹션 HTML에 tone 클래스가 포함된다', () => {
  const {
    attachStockIndicatorsToEntry,
    renderStrategyStockIndicatorsSection
  } = loadIndicatorContext();
  const entry = {
    strategy: 'pullback',
    name: 'NAVER',
    code: '035420',
    currentPrice: 255500,
    pullbackContext: {
      support: {
        primaryLine: { price: 250000, distancePct: 2.1 }
      }
    }
  };
  attachStockIndicatorsToEntry(entry, {
    totalInfos: [
      { code: 'per', value: '20배' },
      { code: 'pbr', value: '1.2배' },
      { code: 'highPriceOf52Weeks', value: '307000' },
      { code: 'lowPriceOf52Weeks', value: '190800' }
    ]
  }, {}, []);
  const html = renderStrategyStockIndicatorsSection(entry);
  assert.match(html, /strategy-indicators-panel/);
  assert.match(html, /indicator-tone-(stable|warn|abnormal)/);
});
