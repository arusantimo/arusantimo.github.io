import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function loadBuyLiveContext() {
  const wyckoffCode = fs.readFileSync(new URL('./wyckoff-bias.js', import.meta.url), 'utf8');
  const code = fs.readFileSync(new URL('./buy-live.js', import.meta.url), 'utf8');
  const context = {
    console,
    clamp: (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max),
    escapeHtml: value => String(value ?? ''),
    formatWon: value => `${Math.round(Number(value) || 0).toLocaleString()}원`,
    formatSignedPercent: value => `${value >= 0 ? '+' : ''}${Number(value).toFixed(1)}%`,
    formatCompactDate: value => String(value ?? ''),
    getBuyGradeFromScore(score, strategy = 'pullback') {
      if (strategy === 'reversal') {
        if (score >= 8.5) return 'S';
        if (score >= 7.0) return 'A';
        if (score >= 5.5) return 'B';
        return 'C';
      }
      if (score >= 9) return 'S';
      if (score >= 7.5) return 'A';
      if (score >= 6) return 'B';
      return 'C';
    },
    getBuyVerdictClassFromGrade(grade) {
      if (String(grade ?? '').startsWith('S')) return 'strong';
      if (String(grade ?? '').startsWith('A')) return 'good';
      if (String(grade ?? '').startsWith('B')) return 'watch';
      return 'exclude';
    }
  };
  vm.createContext(context);
  vm.runInContext(wyckoffCode, context);
  vm.runInContext(code, context);
  return context;
}

test('컨센서스 보정 payload는 전략 점수를 제한형 가감산으로 계산한다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 7.8, grade: 'A', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 4.1,
    currentPrice: 10000,
    targetPrice: 11000,
    upsideRate: 10,
    asOf: '20260518'
  });

  assert.equal(payload.consensusScore, 8.2);
  assert.equal(payload.scoreGap, 0.4);
  assert.equal(payload.adjustment, 0.1);
  assert.equal(payload.wyckoffAdjustment, 0);
  assert.equal(payload.finalScore, 7.9);
  assert.equal(payload.finalGrade, 'A');
  assert.equal(payload.finalStatusLabel, '매수추천');
});

test('상향 보정은 최대 +1.0점으로 제한된다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 6.5, grade: 'B', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 5.0,
    currentPrice: 10000,
    targetPrice: 12000,
    upsideRate: 20,
    asOf: '20260518'
  });

  assert.equal(payload.consensusScore, 10.0);
  assert.equal(payload.adjustment, 1.0);
  assert.equal(payload.wyckoffAdjustment, 0);
  assert.equal(payload.finalScore, 7.5);
});

test('하향 보정은 최대 -1.0점으로 제한된다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 8.5, grade: 'A', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 2.5,
    currentPrice: 10000,
    targetPrice: 9500,
    upsideRate: -5,
    asOf: '20260518'
  });

  assert.equal(payload.consensusScore, 5.0);
  assert.equal(payload.adjustment, -1.0);
  assert.equal(payload.wyckoffAdjustment, 0);
  assert.equal(payload.finalScore, 7.5);
});

test('급락 반등 전략은 최종 점수 7.0에서 A로 승격된다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 6.9, grade: 'B', strategy: 'reversal' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 4.0,
    currentPrice: 10000,
    targetPrice: 11200,
    upsideRate: 12,
    asOf: '20260518'
  });

  assert.equal(payload.consensusScore, 8.0);
  assert.equal(payload.adjustment, 0.4);
  assert.equal(payload.wyckoffAdjustment, 0);
  assert.equal(payload.finalScore, 7.3);
  assert.equal(payload.finalGrade, 'A');
});

test('구형 archive liveRefresh는 consensus 기준으로 정규화된다', () => {
  const { normalizeBuyLiveRefresh, getBuyPresentation } = loadBuyLiveContext();
  const entry = {
    score: 7.8,
    grade: 'A',
    statusLabel: '종가베팅',
    strategy: 'pullback',
    liveRefresh: {
      recommMean: 4.1,
      score: 8.2,
      grade: 'A',
      currentPrice: 10000,
      targetPrice: 11000,
      upsideRate: 10,
      asOf: '20260518'
    }
  };

  const normalized = normalizeBuyLiveRefresh(entry, entry.liveRefresh);
  const presentation = getBuyPresentation(entry);
  assert.equal(normalized.consensusScore, 8.2);
  assert.equal(normalized.adjustment, 0.1);
  assert.equal(normalized.wyckoffAdjustment, 0);
  assert.equal(normalized.finalScore, 7.9);
  assert.equal(presentation.primaryGrade, 'A');
  assert.equal(presentation.primaryStatusLabel, '매수추천');
});

test('Phase B는 매수 최종 점수를 올린다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 7.8, grade: 'A', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 4.1,
    wyckoff: {
      phase: 'B',
      confidence: 0.62,
      reason: '매집 박스권'
    }
  });

  assert.equal(payload.adjustment, 0.1);
  assert.equal(payload.wyckoffAdjustment, 0.4);
  assert.equal(payload.finalScore, 8.3);
  assert.equal(payload.finalGrade, 'A');
});

test('Phase D는 매수 최종 점수를 올린다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 6.8, grade: 'B', strategy: 'momentum' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 3.8,
    wyckoff: {
      phase: 'D',
      confidence: 0.71,
      reason: '상승 추세'
    }
  });

  assert.equal(payload.wyckoffAdjustment, 0.4);
  assert.equal(payload.finalScore, 7.5);
  assert.equal(payload.finalGrade, 'A');
});

test('Phase E는 매수 최종 점수를 낮춘다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 8.4, grade: 'A', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 4.0,
    wyckoff: {
      phase: 'E',
      confidence: 0.58,
      reason: '분배 신호'
    }
  });

  assert.equal(payload.adjustment, -0.1);
  assert.equal(payload.wyckoffAdjustment, -0.8);
  assert.equal(payload.finalScore, 7.5);
  assert.equal(payload.finalGrade, 'A');
});

test('Phase E 고신뢰도는 매수 등급 상한을 B로 제한한다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 8.8, grade: 'A', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    recommMean: 4.5,
    wyckoff: {
      phase: 'E',
      confidence: 0.72,
      reason: '고점 분배'
    }
  });

  assert.equal(payload.finalScore, 8.1);
  assert.equal(payload.gradeCap, 'B');
  assert.equal(payload.finalGrade, 'B');
  assert.equal(payload.finalStatusLabel, '관심후보');
});

test('Phase B 저신뢰도와 Neutral은 와이코프 보정을 적용하지 않는다', () => {
  const { buildBuyLiveRefreshPayload } = loadBuyLiveContext();
  const entry = { score: 7.2, grade: 'B', strategy: 'pullback' };
  const lowConfidence = buildBuyLiveRefreshPayload(entry, {
    recommMean: 3.8,
    wyckoff: {
      phase: 'B',
      confidence: 0.5,
      reason: '낮은 신뢰도'
    }
  });
  const neutral = buildBuyLiveRefreshPayload(entry, {
    recommMean: 3.8,
    wyckoff: {
      phase: 'NEUTRAL',
      confidence: 0.4,
      reason: '중립'
    }
  });

  assert.equal(lowConfidence.wyckoffAdjustment, 0);
  assert.equal(neutral.wyckoffAdjustment, 0);
  assert.equal(lowConfidence.finalScore, neutral.finalScore);
});

test('컨센서스 미제공 종목은 전략 점수를 유지한 채 와이코프만 반영한다', () => {
  const { buildBuyLiveRefreshPayload, getBuyPresentation } = loadBuyLiveContext();
  const entry = { score: 7.2, grade: 'B', statusLabel: '관심후보', strategy: 'pullback' };
  const payload = buildBuyLiveRefreshPayload(entry, {
    consensusUnavailable: true,
    wyckoff: {
      phase: 'D',
      confidence: 0.71,
      reason: '상승 추세'
    }
  });

  assert.equal(payload.consensusUnavailable, true);
  assert.equal(payload.recommMean, null);
  assert.equal(payload.consensusScore, 7.2);
  assert.equal(payload.consensusGrade, '미제공');
  assert.equal(payload.adjustment, 0);
  assert.equal(payload.wyckoffAdjustment, 0.4);
  assert.equal(payload.finalScore, 7.6);

  const presentation = getBuyPresentation({ ...entry, liveRefresh: payload });
  assert.match(presentation.primarySummary, /컨센서스 미제공/);
});

test('검증 패널은 전략, 실시간 근거, 최종 결과와 와이코프 보정을 모두 노출한다', () => {
  const { buildBuyVerificationHtml } = loadBuyLiveContext();
  const entry = {
    code: '123456',
    score: 7.8,
    grade: 'A',
    statusLabel: '종가베팅',
    strategy: 'pullback',
    entryPriceValue: 10000,
    liveRefresh: {
      recommMean: 4.1,
      consensusScore: 8.2,
      consensusGrade: 'A',
      scoreGap: 0.4,
      adjustment: 0.1,
      wyckoff: {
        phase: 'B',
        label: '매집 (Phase B)',
        confidence: 0.62,
        confidencePct: 62,
        reason: '매집 박스권'
      },
      wyckoffAdjustment: 0.4,
      finalScore: 8.3,
      finalGrade: 'A',
      finalStatusLabel: '매수추천',
      currentPrice: 10000,
      targetPrice: 11000,
      upsideRate: 10,
      asOf: '20260518'
    }
  };

  const html = buildBuyVerificationHtml(entry);
  assert.match(html, /전략 기준/);
  assert.match(html, /실시간 근거/);
  assert.match(html, /최종 결과/);
  assert.match(html, /와이코프/);
  assert.match(html, /\+0\.1점 \+ 와이코프 \+0\.4점 → 8\.3점/);
});
