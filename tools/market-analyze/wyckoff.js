// Wyckoff Phase 판정 모듈 (market-analyze / stock-analyze 공유 순수 함수)
// 입력: { ohlcv: [{date, open, high, low, close, volume}, ...], foreignNet: number[], instNet: number[] }
// 출력: { phase: 'A'|'B'|'C'|'D'|'E'|'NEUTRAL', confidence: 0~1, reason: string,
//          metrics: { foreignNetCumWindow, instNetCumWindow, volumeWindowAvg, ... } }

(function (root) {
    const WYCKOFF_PRICE_WINDOW_DAYS = 120;
    const WYCKOFF_MIN_HISTORY_DAYS = 30;
    const WYCKOFF_SHORT_FLOW_DAYS = 10;
    const WYCKOFF_MID_FLOW_DAYS = 20;

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

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function classifyWyckoffPhase(input) {
        const ohlcv = Array.isArray(input?.ohlcv) ? input.ohlcv : [];
        const foreignNet = Array.isArray(input?.foreignNet) ? input.foreignNet : [];
        const instNet = Array.isArray(input?.instNet) ? input.instNet : [];

        if (ohlcv.length < WYCKOFF_MIN_HISTORY_DAYS) {
            return {
                phase: 'NEUTRAL',
                confidence: 0.3,
                reason: '와이코프용 시계열 부족 (중립)',
                candidatePhase: 'NEUTRAL',
                candidateReason: '표본 부족으로 후보 단계 산출 보류',
                metrics: {}
            };
        }

        const window = tail(ohlcv, WYCKOFF_PRICE_WINDOW_DAYS);
        const priceWindowDays = window.length;
        const flowWindowDays = Math.min(Math.max(foreignNet.length, instNet.length), WYCKOFF_PRICE_WINDOW_DAYS);
        const closes = window.map(row => safeNumber(row.close));
        const highs = window.map(row => safeNumber(row.high));
        const lows = window.map(row => safeNumber(row.low));
        const volumes = window.map(row => safeNumber(row.volume));

        const last = window[window.length - 1];
        const highWindow = Math.max(...highs);
        const lowWindow = Math.min(...lows.filter(v => v > 0));
        const drawdownPct = highWindow > 0 ? ((last.close / highWindow) - 1) * 100 : 0;
        const rangePct = lowWindow > 0 ? ((highWindow / lowWindow) - 1) * 100 : 0;

        const volWindowAvg = mean(volumes);
        const vol10Avg = mean(tail(volumes, 10));
        const vol30PrevAvg = mean(volumes.slice(-30, -10));
        const volRatio10vs30 = vol30PrevAvg > 0 ? vol10Avg / vol30PrevAvg : 1;

        const close20Std = stddev(tail(closes, 20));
        const closeWindowStd = stddev(closes);
        const volatilityRatio = closeWindowStd > 0 ? close20Std / closeWindowStd : 1;

        const high60Recent = Math.max(...tail(highs, 5));
        const newHighBreakout = high60Recent >= highWindow * 0.999;

        // 매수 주체 누적
        const foreignCumWindow = sum(tail(foreignNet, flowWindowDays || WYCKOFF_PRICE_WINDOW_DAYS));
        const instCumWindow = sum(tail(instNet, flowWindowDays || WYCKOFF_PRICE_WINDOW_DAYS));
        const foreignCum10 = sum(tail(foreignNet, WYCKOFF_SHORT_FLOW_DAYS));
        const instCum10 = sum(tail(instNet, WYCKOFF_SHORT_FLOW_DAYS));
        const foreignCum20 = sum(tail(foreignNet, WYCKOFF_MID_FLOW_DAYS));
        const instCum20 = sum(tail(instNet, WYCKOFF_MID_FLOW_DAYS));
        const smartCumWindow = foreignCumWindow + instCumWindow;
        const smartCum10 = foreignCum10 + instCum10;
        const smartCum20 = foreignCum20 + instCum20;
        const windowLabel = `${priceWindowDays}일`;
        const flowLabel = `${flowWindowDays || priceWindowDays}일`;
        const candidateScores = [];

        // Phase E: Distribution — 장기 고점 부근에서 최근 수급 이탈
        if (drawdownPct >= -10 && smartCum10 < 0) {
            return {
                phase: 'E',
                confidence: drawdownPct >= -6 ? 0.76 : 0.68,
                reason: `${windowLabel} 고점 부근(${drawdownPct.toFixed(1)}%)에서 외인+기관 ${WYCKOFF_SHORT_FLOW_DAYS}일 누적 ${smartCum10.toFixed(0)} 분배`,
                candidatePhase: 'E',
                candidateReason: '신고가 부근 분배',
                metrics: { foreignCumWindow, instCumWindow, smartCum10, drawdownPct, volRatio10vs30, priceWindowDays, flowWindowDays }
            };
        }
        candidateScores.push({
            phase: 'E',
            score: clamp((Math.max(0, 10 + drawdownPct) / 10) * 0.42 + (smartCum10 < 0 ? 0.32 : 0) + (volRatio10vs30 >= 0.95 ? 0.1 : 0), 0, 0.76),
            reason: `고점 거리 ${drawdownPct.toFixed(1)}% · 최근 ${WYCKOFF_SHORT_FLOW_DAYS}일 스마트머니 ${smartCum10.toFixed(0)}`
        });

        // Phase D: Markup — 장기 고점 부근 유지 + 최근 수급 유입
        const nearHighBreakout = drawdownPct >= -6;
        if (nearHighBreakout && smartCum10 > 0 && volRatio10vs30 >= 0.95) {
            return {
                phase: 'D',
                confidence: newHighBreakout && volRatio10vs30 >= 1.05 ? 0.78 : 0.66,
                reason: `${newHighBreakout ? `${windowLabel} 고점 부근 유지` : '상승 추세 유지'} + 외인+기관 ${WYCKOFF_SHORT_FLOW_DAYS}일 누적 ${smartCum10.toFixed(0)} + 거래량 ${(volRatio10vs30 * 100).toFixed(0)}%`,
                candidatePhase: 'D',
                candidateReason: '고점 돌파 추세 지속',
                metrics: { foreignCumWindow, instCumWindow, smartCum10, drawdownPct, volRatio10vs30, priceWindowDays, flowWindowDays }
            };
        }
        candidateScores.push({
            phase: 'D',
            score: clamp((nearHighBreakout ? 0.3 : 0) + (smartCum10 > 0 ? 0.22 : 0) + clamp((volRatio10vs30 - 0.9) * 0.35, 0, 0.18), 0, 0.76),
            reason: `고점 거리 ${drawdownPct.toFixed(1)}% · 최근 ${WYCKOFF_SHORT_FLOW_DAYS}일 스마트머니 ${smartCum10.toFixed(0)}`
        });

        // Phase C: Spring — 박스권 하단 일시 이탈 후 종가 회복 + 그날 스마트 머니 양수
        const recoveryRate = (last.high > last.low) ? (last.close - last.low) / (last.high - last.low) : 1;
        const yesterdayLow = window.length >= 2 ? window[window.length - 2].low : last.low;
        const lowProbeMin = Math.min(...tail(lows, 20));
        const probedAndRecovered = last.low <= lowProbeMin * 1.02 && recoveryRate >= 0.5;
        const todayForeignNet = foreignNet[foreignNet.length - 1];
        const todayInstNet = instNet[instNet.length - 1];
        if (probedAndRecovered && volatilityRatio <= 0.8 && (safeNumber(todayForeignNet) + safeNumber(todayInstNet) >= 0)) {
            return {
                phase: 'C',
                confidence: recoveryRate >= 0.6 ? 0.7 : 0.6,
                reason: `박스권 하단 테스트 후 종가 ${(recoveryRate * 100).toFixed(0)}% 회복 + 당일 외인·기관 매수 전환`,
                candidatePhase: 'C',
                candidateReason: 'Spring 신호',
                metrics: { foreignCumWindow, instCumWindow, smartCum10, recoveryRate, volatilityRatio, priceWindowDays, flowWindowDays }
            };
        }
        candidateScores.push({
            phase: 'C',
            score: clamp((probedAndRecovered ? 0.32 : 0) + (recoveryRate >= 0.6 ? 0.18 : recoveryRate * 0.18) + ((safeNumber(todayForeignNet) + safeNumber(todayInstNet)) >= 0 ? 0.1 : 0), 0, 0.72),
            reason: `회복률 ${(recoveryRate * 100).toFixed(0)}% · 당일 스마트머니 ${(safeNumber(todayForeignNet) + safeNumber(todayInstNet)).toFixed(0)}`
        });

        // Phase B: Accumulation — 중간 박스권 + 누적/최근 수급 개선
        const isRange = volatilityRatio <= 0.92 && drawdownPct >= -35 && drawdownPct <= -5 && rangePct <= 120;
        const smartFlowSupport = smartCumWindow > 0 || smartCum20 > 0;
        if (isRange && smartFlowSupport && volRatio10vs30 >= 0.55 && volRatio10vs30 <= 1.45) {
            return {
                phase: 'B',
                confidence: smartCumWindow > 0 && smartCum20 > 0 ? 0.68 : 0.6,
                reason: `박스권(σ ${(volatilityRatio * 100).toFixed(0)}%) + 외인+기관 ${flowLabel} 누적 ${smartCumWindow.toFixed(0)} + 최근 ${WYCKOFF_MID_FLOW_DAYS}일 ${smartCum20.toFixed(0)}`,
                candidatePhase: 'B',
                candidateReason: '매집 박스권',
                metrics: { foreignCumWindow, instCumWindow, smartCumWindow, smartCum20, volatilityRatio, volRatio10vs30, priceWindowDays, flowWindowDays }
            };
        }
        candidateScores.push({
            phase: 'B',
            score: clamp((isRange ? 0.32 : 0) + (smartCumWindow > 0 ? 0.18 : 0) + (smartCum20 > 0 ? 0.12 : 0) + (volRatio10vs30 >= 0.55 && volRatio10vs30 <= 1.45 ? 0.1 : 0), 0, 0.76),
            reason: `박스권 ${isRange ? '유사' : '아님'} · ${flowLabel} 스마트머니 ${smartCumWindow.toFixed(0)}`
        });

        // Phase A: 하락 정지 — 깊은 낙폭 + 거래량 급감 + 외인 매도 수렴
        const deepDrawdown = drawdownPct <= -12;
        const volumeDried = volRatio10vs30 <= 0.85;
        const expectedForeign10 = flowWindowDays > 0 ? foreignCumWindow * (WYCKOFF_SHORT_FLOW_DAYS / flowWindowDays) : 0;
        const foreignTurning = foreignCumWindow <= 0 && foreignCum10 >= expectedForeign10 * 0.5;
        if (deepDrawdown && volumeDried && foreignTurning) {
            return {
                phase: 'A',
                confidence: drawdownPct <= -20 && volRatio10vs30 <= 0.7 ? 0.62 : 0.54,
                reason: `${windowLabel} 고점 대비 ${drawdownPct.toFixed(1)}% + 거래량 ${(volRatio10vs30 * 100).toFixed(0)}% + 외인 매도 수렴`,
                candidatePhase: 'A',
                candidateReason: '하락 정지 초기',
                metrics: { foreignCumWindow, instCumWindow, drawdownPct, volRatio10vs30, priceWindowDays, flowWindowDays }
            };
        }
        candidateScores.push({
            phase: 'A',
            score: clamp((deepDrawdown ? 0.34 : 0) + (volumeDried ? 0.18 : 0) + (foreignTurning ? 0.18 : 0), 0, 0.76),
            reason: `낙폭 ${drawdownPct.toFixed(1)}% · 거래량 ${(volRatio10vs30 * 100).toFixed(0)}%`
        });

        const bestCandidate = candidateScores.sort((left, right) => right.score - left.score)[0] || {
            phase: 'NEUTRAL',
            score: 0.25,
            reason: '우세한 후보 단계 없음'
        };
        const neutralSignals = [
            smartCumWindow > 0 ? '스마트머니 우세' : smartCum20 > 0 ? '단기 수급 개선' : '스마트머니 혼조/이탈',
            isRange ? '박스권 유사' : '추세 구조 우세',
            volRatio10vs30 <= 0.7 ? '거래량 수축' : volRatio10vs30 >= 1.1 ? '거래량 확대' : '거래량 중립'
        ];
        if (bestCandidate.phase !== 'NEUTRAL' && bestCandidate.score >= 0.48) {
            return {
                phase: bestCandidate.phase,
                confidence: clamp(bestCandidate.score, 0.45, 0.62),
                reason: `후보 구조 우세 (${neutralSignals.join(' · ')})`,
                candidatePhase: bestCandidate.phase,
                candidateReason: bestCandidate.reason,
                metrics: { foreignCumWindow, instCumWindow, smartCum10, smartCum20, drawdownPct, volatilityRatio, volRatio10vs30, priceWindowDays, flowWindowDays }
            };
        }

        return {
            phase: 'NEUTRAL',
            confidence: Math.max(0.3, Math.min(0.45, bestCandidate.score)),
            reason: `명확한 와이코프 단계 패턴 없음 (${neutralSignals.join(' · ')})`,
            candidatePhase: bestCandidate.phase,
            candidateReason: bestCandidate.reason,
            metrics: { foreignCumWindow, instCumWindow, smartCum10, smartCum20, drawdownPct, volatilityRatio, volRatio10vs30, priceWindowDays, flowWindowDays }
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
