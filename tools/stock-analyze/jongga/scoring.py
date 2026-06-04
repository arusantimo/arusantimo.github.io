"""전략별 strict/signal 점수 합산, 부분 점수, breakdown, 등급 환산."""

from __future__ import annotations

from typing import Any, Callable

from jongga.grade_policy import grade_from_score
from jongga.rule_evaluation import EvalResult

MOMENTUM_WEIGHTS: dict[str, float] = {
    "RS": 1.5,
    "S1": 2.0,
    "S2": 2.0,
    "P1": 1.5,
    "P2": 1.5,
    "C1": 1.0,
    "C2": 1.0,
    "C3": 1.0,
}
MOMENTUM_STRICT_MAX = 12.5  # sum(weights); float 합산은 11.5로 깨질 수 있음

TREND_SCORE_WEIGHTS: dict[str, float] = {
    "S1": 2.0,
    "S2": 2.0,
    "P1": 1.5,
    "P2": 1.5,
    "C1": 1.0,
    "C2": 1.0,
    "C3": 1.0,
}
TREND_STRICT_MAX = 10.0

REVERSAL_SCORE_WEIGHTS = TREND_SCORE_WEIGHTS
REVERSAL_STRICT_MAX = TREND_STRICT_MAX

SignalFactorFn = Callable[[str, EvalResult, Any | None], float]


def _momentum_s2_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    if snapshot is None:
        return 0.0
    toss = snapshot.toss or {}
    avg_strength = float(toss.get("avgStrength") or 0)
    intraday_ratio = float(toss.get("intradayAbove100Ratio") or 0)
    if avg_strength >= 110.0 or intraday_ratio >= 70.0:
        return 0.5
    return 0.0


def _momentum_c3_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    if snapshot is None:
        return 0.0
    orderbook = snapshot.orderbook or {}
    bid_ask_ratio = float(orderbook.get("bidAskRatio") or 0)
    if bid_ask_ratio >= 1.2:
        return 1.0
    if bid_ask_ratio >= 1.0:
        return 0.5
    return 0.0


def _momentum_p1_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    if snapshot is None or not snapshot.high_20d:
        return 0.0
    ratio = snapshot.current_price / snapshot.high_20d * 100
    if ratio >= 95.0:
        return 1.0
    if ratio >= 92.0:
        return 0.5
    return 0.0


MOMENTUM_SIGNAL_FACTORS: dict[str, SignalFactorFn] = {
    "S2": _momentum_s2_signal_factor,
    "C3": _momentum_c3_signal_factor,
    "P1": _momentum_p1_signal_factor,
}


def weight_factor(
    code: str,
    result: EvalResult,
    snapshot: Any | None,
    signal_factors: dict[str, SignalFactorFn] | None,
) -> float:
    if signal_factors and code in signal_factors:
        return signal_factors[code](code, result, snapshot)
    return float(result.score)


def aggregate_raw_score(
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
    *,
    snapshot: Any | None = None,
    signal_factors: dict[str, SignalFactorFn] | None = None,
) -> float:
    total = 0.0
    for code, weight in weights.items():
        result = score_map.get(code)
        if result is None:
            continue
        total += weight_factor(code, result, snapshot, signal_factors) * weight
    return total


def build_score_breakdown(
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
    *,
    snapshot: Any | None = None,
    signal_factors: dict[str, SignalFactorFn] | None = None,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for code, max_points in weights.items():
        result = score_map.get(code)
        if result is None:
            continue
        strict_points = float(result.score) * max_points
        signal_unit = weight_factor(code, result, snapshot, signal_factors)
        signal_points = round(signal_unit * max_points, 2)
        rows.append(
            {
                "code": code,
                "strictPoints": round(strict_points, 2),
                "signalPoints": signal_points,
                "maxPoints": max_points,
                "evalStatus": result.eval_status,
                "note": result.note,
            }
        )
    return rows


def grade_score_from_strict(strict_score: float, strict_max: float) -> float:
    if strict_max <= 0:
        return 0.0
    return round(strict_score * 10.0 / strict_max, 1)


def apply_buy_scoring(
    *,
    strategy: str,
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
    strict_max: float,
    vkospi_multiplier: float,
    snapshot: Any | None = None,
) -> dict[str, Any]:
    signal_factors = MOMENTUM_SIGNAL_FACTORS if strategy == "momentum" else None
    strict_raw = aggregate_raw_score(score_map, weights, snapshot=None, signal_factors=None)
    signal_raw = aggregate_raw_score(score_map, weights, snapshot=snapshot, signal_factors=signal_factors)
    strict_score = round(strict_raw * vkospi_multiplier, 1)
    signal_score = round(signal_raw * vkospi_multiplier, 1)
    grade_score = grade_score_from_strict(strict_score, strict_max)
    grade = grade_from_score(grade_score, strategy)
    return {
        "strictScore": strict_score,
        "signalScore": signal_score,
        "score": signal_score,
        "scoreMax": strict_max,
        "gradeScore": grade_score,
        "grade": grade,
        "scoreBreakdown": build_score_breakdown(
            score_map,
            weights,
            snapshot=snapshot,
            signal_factors=signal_factors,
        ),
        "scoreScope": strategy,
    }
