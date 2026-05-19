function getLeaderWeightedMetric(leaderStocks, field) {
    let weightedSum = 0;
    let weightSum = 0;

    leaderStocks.forEach(stock => {
        const weight = Number(stock.weight);
        const value = Number(stock[field]);
        if (!Number.isFinite(weight) || !Number.isFinite(value)) return;
        weightedSum += weight * value;
        weightSum += weight;
    });

    return weightSum > 0 ? weightedSum / weightSum : null;
}

function getLeaderWeightedBreadth(leaderStocks, predicate) {
    return clamp(
        leaderStocks.reduce((sum, stock) => sum + (predicate(stock) ? Number(stock.weight) || 0 : 0), 0),
        0,
        1
    );
}

function buildNeutralTrapResult(reason, basketDrawdown15d = null, hasShockDrop = false) {
    return {
        trapScore: 0,
        trapState: "neutral",
        trapReason: reason,
        trapFlowScore: 0,
        trapMarginScore: 0,
        trapFirstShockScore: 0,
        trapThreeDayScore: 0,
        trapRecoveryScore: 0,
        basketDrawdown15d,
        hasShockDrop
    };
}

function deriveMarginShockContext(marginHistory, leaderStocks) {
    const rows = [...(marginHistory || [])]
        .filter(row => row && row.dateKey && Number.isFinite(row.balance))
        .sort((left, right) => left.dateKey.localeCompare(right.dateKey));
    const marginBalanceToday = rows.at(-1)?.balance ?? null;
    const shockAnchorDate = leaderStocks
        .map(stock => stock.shockDate)
        .filter(Boolean)
        .sort()
        .at(0) || null;

    if (!shockAnchorDate || !Number.isFinite(marginBalanceToday)) {
        return {
            shockAnchorDate,
            marginBalanceToday,
            marginBalanceBeforeShock: null,
            marginShockChangePct: null
        };
    }

    const marginBalanceBeforeShock = rows.filter(row => row.dateKey < shockAnchorDate).at(-1)?.balance ?? null;
    return {
        shockAnchorDate,
        marginBalanceToday,
        marginBalanceBeforeShock,
        marginShockChangePct: Number.isFinite(marginBalanceBeforeShock) && marginBalanceBeforeShock > 0
            ? ((marginBalanceToday - marginBalanceBeforeShock) / marginBalanceBeforeShock) * 100
            : null
    };
}

function calculateTrapFlowScore(data) {
    if (!(data.retailNetToday > 0 && data.retailNet10dCum > 0 && data.retailNet10dAbsAvg > 0)) {
        return { score: 0, label: "개인 흡수 없음" };
    }

    const dailyRatio = data.retailNetToday / data.retailNet10dAbsAvg;
    let score = dailyRatio >= 1.5 ? 3 : dailyRatio >= 1.0 ? 2 : 1;

    const foreignDistribution = data.foreignNetToday < 0 && data.foreignNet10dCum < 0;
    const institutionDistribution = data.institutionNetToday < 0 && data.institutionNet10dCum < 0;

    if (foreignDistribution && institutionDistribution) score += 3;
    else if (foreignDistribution || institutionDistribution) score += 2;

    return {
        score: Math.min(6, score),
        label: foreignDistribution && institutionDistribution ? "개인 흡수 + 양축 분배" : "개인 흡수 중심"
    };
}

function calculateTrapMarginScore(data, basketDrawdown15d) {
    const changePct = Number(data.marginShockChangePct);
    if (!Number.isFinite(changePct) || !Number.isFinite(basketDrawdown15d)) {
        return { score: 0, label: "신용 기준값 없음" };
    }

    let baseScore = 0;
    let baseLabel = "";
    if (basketDrawdown15d <= -8 && changePct >= 1) { baseScore = 4; baseLabel = `신용 ${changePct.toFixed(1)}% 증가`; }
    else if (basketDrawdown15d <= -8 && changePct >= 0) { baseScore = 3; baseLabel = `신용 ${changePct.toFixed(1)}% 유지`; }
    else if (basketDrawdown15d <= -5 && changePct > -2) { baseScore = 2; baseLabel = `신용 ${changePct.toFixed(1)}% 견조`; }
    else { baseScore = 0; baseLabel = `신용 ${changePct.toFixed(1)}% 감소`; }

    // 민스키 폰지 임계: 신용/예탁 비율이 0.20 이상 + 1차 충격 후 신용이 줄지 않음
    const depositMarginRatio = Number(data.depositMarginRatio);
    if (Number.isFinite(depositMarginRatio) && depositMarginRatio >= 0.20 && basketDrawdown15d <= -5 && changePct >= 0) {
        return {
            score: Math.min(5, baseScore + 1),
            label: `${baseLabel} · 폰지 신용/예탁 ${(depositMarginRatio * 100).toFixed(0)}%`
        };
    }

    return { score: baseScore, label: baseLabel };
}

function calculateTrapFirstShockScore(leaderStocks) {
    const breadth = getLeaderWeightedBreadth(leaderStocks, stock => Number.isFinite(stock.shockValueRatio));
    const ratio = getLeaderWeightedMetric(
        leaderStocks.filter(stock => Number.isFinite(stock.shockValueRatio)),
        "shockValueRatio"
    );

    if (breadth >= 0.6 && ratio >= 1.5) return { score: 5, label: `폭발 breadth ${(breadth * 100).toFixed(0)}%` };
    if (breadth >= 0.4 && ratio >= 1.2) return { score: 3, label: `강한 음봉 breadth ${(breadth * 100).toFixed(0)}%` };
    if (breadth >= 0.25 && ratio >= 1.0) return { score: 1, label: `초기 음봉 breadth ${(breadth * 100).toFixed(0)}%` };
    return { score: 0, label: "첫 음봉 폭발 약함" };
}

function calculateTrapThreeDayScore(leaderStocks) {
    const candidates = leaderStocks.filter(
        stock => Number.isFinite(stock.threeDayDropPct) && Number.isFinite(stock.threeDayValueRatio)
    );
    const breadth = getLeaderWeightedBreadth(leaderStocks, stock => candidates.includes(stock));
    const dropPct = getLeaderWeightedMetric(candidates, "threeDayDropPct");
    const valueRatio = getLeaderWeightedMetric(candidates, "threeDayValueRatio");

    if (breadth >= 0.5 && dropPct <= -8 && valueRatio >= 1.15) return { score: 3, label: "3일 연속 음봉 지속" };
    if (breadth >= 0.35 && dropPct <= -6) return { score: 2, label: "3일 음봉 확산" };
    if (breadth >= 0.25 && dropPct <= -4) return { score: 1, label: "약한 3일 음봉" };
    return { score: 0, label: "3일 음봉 미약" };
}

function calculateTrapRecoveryScore(leaderStocks) {
    const recoveryRate = getLeaderWeightedMetric(
        leaderStocks.filter(stock => Number.isFinite(stock.closeRecoveryRate)),
        "closeRecoveryRate"
    );

    if (!Number.isFinite(recoveryRate)) return { score: 0, label: "회복률 데이터 없음" };
    if (recoveryRate <= 0.25) return { score: 2, label: `종가 회복 ${(recoveryRate * 100).toFixed(0)}%` };
    if (recoveryRate <= 0.45) return { score: 1, label: `종가 회복 ${(recoveryRate * 100).toFixed(0)}%` };
    return { score: 0, label: `종가 회복 ${(recoveryRate * 100).toFixed(0)}%` };
}

function calculateBullTrapScore(data) {
    const leaderStocks = Array.isArray(data.leaderStocks) ? data.leaderStocks : [];
    if (!leaderStocks.length) {
        return buildNeutralTrapResult("대표주 데이터 미연동 (중립 처리)");
    }

    const basketDrawdown15d = getLeaderWeightedMetric(leaderStocks, "drawdown15dPct");
    const hasShockDrop = leaderStocks.some(stock => Number.isFinite(stock.dayReturnPct) && stock.dayReturnPct <= -6);

    if (data.cycleLeg === "rising") {
        return buildNeutralTrapResult("상승 레그에서는 Bull Trap 오버라이드를 비활성화합니다.", basketDrawdown15d, hasShockDrop);
    }

    if (!(Number.isFinite(data.disparity) && data.disparity >= 100)) {
        return buildNeutralTrapResult("가격 이격 조건 미충족으로 눌림목/중립 처리.", basketDrawdown15d, hasShockDrop);
    }

    if (!((Number.isFinite(basketDrawdown15d) && basketDrawdown15d <= -5) || hasShockDrop)) {
        return buildNeutralTrapResult("대표주 급락 조건 미충족으로 눌림목/중립 처리.", basketDrawdown15d, hasShockDrop);
    }

    const flowResult = calculateTrapFlowScore(data);
    const marginResult = calculateTrapMarginScore(data, basketDrawdown15d);
    const firstShockResult = calculateTrapFirstShockScore(leaderStocks);
    const threeDayResult = calculateTrapThreeDayScore(leaderStocks);
    const recoveryResult = calculateTrapRecoveryScore(leaderStocks);

    const trapScore = flowResult.score + marginResult.score + firstShockResult.score + threeDayResult.score + recoveryResult.score;
    const trapState = trapScore >= 14 ? "denial" : trapScore >= 10 ? "complacency" : "neutral";

    return {
        trapScore,
        trapState,
        trapReason: trapScore > 0
            ? `수급 ${flowResult.score} / 신용 ${marginResult.score} / 첫 음봉 ${firstShockResult.score} / 3일 음봉 ${threeDayResult.score} / 회복 ${recoveryResult.score} · 대표주 낙폭 ${basketDrawdown15d?.toFixed(1) ?? "-"}%`
            : "눌림목/중립 처리",
        trapFlowScore: flowResult.score,
        trapMarginScore: marginResult.score,
        trapFirstShockScore: firstShockResult.score,
        trapThreeDayScore: threeDayResult.score,
        trapRecoveryScore: recoveryResult.score,
        basketDrawdown15d,
        hasShockDrop
    };
}
