// Wyckoff Phase 판정 모듈 (market-analyze / stock-analyze 공유 순수 함수)
// 입력: { ohlcv: [{date, open, high, low, close, volume}, ...], foreignNet: number[], instNet: number[] }
// 출력: { phase: 'A'|'B'|'C'|'D'|'E'|'NEUTRAL', confidence: 0~1, reason: string,
//          metrics: { foreignNetCum60d, instNetCum60d, volume60dAvg, ... } }

(function (root) {
    function safeNumber(value) {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
    }

    function sum(arr) {
        return arr.reduce((acc, v) => acc + safeNumber(v), 0);
    }

    function mean(arr) {
        if (!arr.length) return 0;
        return sum(arr) / arr.length;
    }

    function stddev(arr) {
        if (arr.length < 2) return 0;
        const m = mean(arr);
        return Math.sqrt(mean(arr.map(v => Math.pow(safeNumber(v) - m, 2))));
    }

    function tail(arr, n) {
        return arr.slice(Math.max(0, arr.length - n));
    }

    function classifyWyckoffPhase(input) {
        const ohlcv = Array.isArray(input?.ohlcv) ? input.ohlcv : [];
        const foreignNet = Array.isArray(input?.foreignNet) ? input.foreignNet : [];
        const instNet = Array.isArray(input?.instNet) ? input.instNet : [];

        if (ohlcv.length < 30) {
            return {
                phase: 'NEUTRAL',
                confidence: 0,
                reason: '60영업일 시계열 부족 (중립)',
                metrics: {}
            };
        }

        const window = tail(ohlcv, 60);
        const closes = window.map(row => safeNumber(row.close));
        const highs = window.map(row => safeNumber(row.high));
        const lows = window.map(row => safeNumber(row.low));
        const volumes = window.map(row => safeNumber(row.volume));

        const last = window[window.length - 1];
        const high60 = Math.max(...highs);
        const low60 = Math.min(...lows.filter(v => v > 0));
        const drawdownPct = high60 > 0 ? ((last.close / high60) - 1) * 100 : 0;
        const rangePct = low60 > 0 ? ((high60 / low60) - 1) * 100 : 0;

        const vol60Avg = mean(volumes);
        const vol10Avg = mean(tail(volumes, 10));
        const vol30PrevAvg = mean(volumes.slice(-30, -10));
        const volRatio10vs30 = vol30PrevAvg > 0 ? vol10Avg / vol30PrevAvg : 1;

        const close20Std = stddev(tail(closes, 20));
        const close60Std = stddev(closes);
        const volatilityRatio = close60Std > 0 ? close20Std / close60Std : 1;

        const last5Close = closes[closes.length - 1];
        const high60Recent = Math.max(...tail(highs, 5));
        const newHighBreakout = high60Recent >= high60 * 0.999;

        // 매수 주체 누적
        const foreignCum60 = sum(tail(foreignNet, 60));
        const instCum60 = sum(tail(instNet, 60));
        const foreignCum5 = sum(tail(foreignNet, 5));
        const instCum5 = sum(tail(instNet, 5));
        const smartCum60 = foreignCum60 + instCum60;
        const smartCum5 = foreignCum5 + instCum5;

        // Phase E: Distribution — 신고가 부근에서 스마트 머니 5일 이탈
        if (drawdownPct >= -5 && smartCum5 < 0) {
            return {
                phase: 'E',
                confidence: 0.75,
                reason: `신고가 부근(${drawdownPct.toFixed(1)}%)에서 외인+기관 5일 누적 ${smartCum5.toFixed(0)} 분배`,
                metrics: { foreignCum60, instCum60, smartCum5, drawdownPct, volRatio10vs30 }
            };
        }

        // Phase D: Markup — 60일 고점 갱신 + 스마트 머니 5일 양수 + 거래량 증가
        if (newHighBreakout && smartCum5 > 0 && volRatio10vs30 >= 1.1) {
            return {
                phase: 'D',
                confidence: 0.8,
                reason: `60일 고점 갱신 + 외인+기관 5일 누적 ${smartCum5.toFixed(0)} + 거래량 ${(volRatio10vs30 * 100).toFixed(0)}%`,
                metrics: { foreignCum60, instCum60, smartCum5, drawdownPct, volRatio10vs30 }
            };
        }

        // Phase C: Spring — 박스권 하단 일시 이탈 후 종가 회복 + 그날 스마트 머니 양수
        const recoveryRate = (last.high > last.low) ? (last.close - last.low) / (last.high - last.low) : 1;
        const yesterdayLow = window.length >= 2 ? window[window.length - 2].low : last.low;
        const lowProbeMin = Math.min(...tail(lows, 20));
        const probedAndRecovered = last.low <= lowProbeMin * 1.005 && recoveryRate >= 0.6;
        const todayForeignNet = foreignNet[foreignNet.length - 1];
        const todayInstNet = instNet[instNet.length - 1];
        if (probedAndRecovered && volatilityRatio <= 0.7 && (safeNumber(todayForeignNet) + safeNumber(todayInstNet) > 0)) {
            return {
                phase: 'C',
                confidence: 0.7,
                reason: `박스권 하단 테스트 후 종가 ${(recoveryRate * 100).toFixed(0)}% 회복 + 당일 외인·기관 매수 전환`,
                metrics: { foreignCum60, instCum60, smartCum5, recoveryRate, volatilityRatio }
            };
        }

        // Phase B: Accumulation — 박스권 + 스마트 머니 60일 양전환 + 거래량 횡보 (신고가 부근 제외)
        const isRange = volatilityRatio <= 0.65 && drawdownPct >= -25 && drawdownPct <= -5;
        if (isRange && smartCum60 > 0 && volRatio10vs30 >= 0.7 && volRatio10vs30 <= 1.3) {
            return {
                phase: 'B',
                confidence: 0.7,
                reason: `박스권(σ ${(volatilityRatio * 100).toFixed(0)}%) + 외인+기관 60일 누적 ${smartCum60.toFixed(0)} + 거래량 횡보`,
                metrics: { foreignCum60, instCum60, smartCum60, volatilityRatio, volRatio10vs30 }
            };
        }

        // Phase A: 하락 정지 — 깊은 낙폭 + 거래량 급감 + 외인 매도 수렴
        const deepDrawdown = drawdownPct <= -20;
        const volumeDried = volRatio10vs30 <= 0.6;
        const foreignTurning = foreignCum60 <= 0 && sum(tail(foreignNet, 10)) >= foreignCum60 * 0.2;
        if (deepDrawdown && volumeDried && foreignTurning) {
            return {
                phase: 'A',
                confidence: 0.6,
                reason: `60일 고점 대비 ${drawdownPct.toFixed(1)}% + 거래량 ${(volRatio10vs30 * 100).toFixed(0)}% + 외인 매도 수렴`,
                metrics: { foreignCum60, instCum60, drawdownPct, volRatio10vs30 }
            };
        }

        return {
            phase: 'NEUTRAL',
            confidence: 0,
            reason: '명확한 와이코프 단계 패턴 없음 (관망)',
            metrics: { foreignCum60, instCum60, smartCum5, drawdownPct, volatilityRatio, volRatio10vs30 }
        };
    }

    function getWyckoffPhaseLabel(phase) {
        switch (phase) {
            case 'A': return '하락 정지 (Phase A)';
            case 'B': return '매집 (Phase B)';
            case 'C': return 'Spring (Phase C)';
            case 'D': return 'Markup (Phase D)';
            case 'E': return '분배 (Phase E)';
            default: return '관망 (Neutral)';
        }
    }

    function getWyckoffPhaseAccent(phase) {
        switch (phase) {
            case 'A': return '#94a3b8';
            case 'B': return '#22d3ee';
            case 'C': return '#34d399';
            case 'D': return '#fbbf24';
            case 'E': return '#f43f5e';
            default: return '#64748b';
        }
    }

    root.classifyWyckoffPhase = classifyWyckoffPhase;
    root.getWyckoffPhaseLabel = getWyckoffPhaseLabel;
    root.getWyckoffPhaseAccent = getWyckoffPhaseAccent;
})(typeof window !== 'undefined' ? window : globalThis);
