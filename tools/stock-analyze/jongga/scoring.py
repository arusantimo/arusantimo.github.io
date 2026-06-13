"""전략별 strict/signal 점수 합산, 부분 점수, breakdown, 등급 환산."""

from __future__ import annotations

from typing import Any, Callable, Optional

from jongga.grade_policy import grade_from_score
from jongga.rule_evaluation import EvalResult

BREAKOUT_WEIGHTS: dict[str, float] = {
    "RS": 1.5,
    "S1": 2.0,
    "S2": 2.0,
    "P1": 1.5,
    "P2": 1.5,
    "C1": 1.0,
    "C2": 1.0,
    "C3": 1.0,
}
BREAKOUT_STRICT_MAX = 11.5

# Legacy names
MOMENTUM_WEIGHTS = BREAKOUT_WEIGHTS
MOMENTUM_STRICT_MAX = BREAKOUT_STRICT_MAX

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

PULLBACK_SCORE_WEIGHTS: dict[str, float] = {
    "S1": 2.0,
    "S2": 2.0,
    "S3": 1.0,
    "P1": 1.5,
    "P2": 1.5,
    "P3": 1.0,
    "C1": 1.0,
    "C2": 1.0,
    "C3": 1.0,
    "C4": 1.0,
    "C5": 0.5,
}
PULLBACK_STRICT_MAX = 13.5

ACCUMULATION_SCORE_WEIGHTS = {
    "S1": 2.0,
    "S2": 2.0,
    "S3": 1.0,
    "S4": 0.5,
    "S5": 1.0,
    "P1": 1.5,
    "P2": 1.5,
    "C1": 1.0,
    "C2": 1.0,
    "C3": 1.0,
    "C4": 0.5,
}
ACCUMULATION_STRICT_MAX = 13.0

REVERSAL_SCORE_WEIGHTS = dict(TREND_SCORE_WEIGHTS)
REVERSAL_STRICT_MAX = 10.0

SignalFactorFn = Callable[[str, EvalResult, Optional[Any]], float]


def _clamp_score(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(maximum, value))


def _breakout_s2_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
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


def _breakout_c3_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
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


def _breakout_p1_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    if snapshot is None or not snapshot.high_20d:
        return 0.0
    price = snapshot.current_price
    high_20d = snapshot.high_20d
    if price > high_20d:
        extension = (price / high_20d - 1) * 100
        if extension <= 5.0:
            return 1.0
        if extension <= 7.0:
            return 0.5
        return 0.0
    ratio = price / high_20d * 100
    if ratio >= 95.0:
        return 1.0
    if ratio >= 92.0:
        return 0.5
    return 0.0


BREAKOUT_SIGNAL_FACTORS: dict[str, SignalFactorFn] = {
    "S2": _breakout_s2_signal_factor,
    "C3": _breakout_c3_signal_factor,
    "P1": _breakout_p1_signal_factor,
}

MOMENTUM_SIGNAL_FACTORS = BREAKOUT_SIGNAL_FACTORS


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


def append_volatility_breakdown_row(
    rows: list[dict[str, Any]],
    volatility_context: dict[str, Any] | None,
) -> list[dict[str, Any]]:
    if not volatility_context:
        return rows
    score_delta = float(volatility_context.get("scoreDelta") or 0.0)
    summary = str(volatility_context.get("summary") or "").strip()
    if abs(score_delta) < 1e-9 and not summary:
        return rows
    next_rows = list(rows)
    next_rows.append(
        {
            "code": "V1",
            "strictPoints": round(score_delta, 2),
            "signalPoints": round(score_delta, 2),
            "maxPoints": 1.0,
            "evalStatus": "met",
            "note": summary or "변동성 적합도 보정",
        }
    )
    return next_rows


def grade_score_from_strict(strict_score: float, strict_max: float) -> float:
    if strict_max <= 0:
        return 0.0
    return round(strict_score * 10.0 / strict_max, 1)


def available_strict_max(
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
) -> float:
    """data_missing / manual_required 항목을 분모에서 제외한 실효 최대점수.

    돌파 전략의 S2(체결강도)·C3(호가잔량)은 토스 데이터 없으면 자동으로 0점이지만
    분모는 고정 11.5라 만점이 불가능했다. 가용 항목 기준으로 분모를 조정하면
    자동 파이프라인에서도 셋업이 좋을 때 S 등급 진입이 가능하다.

    단, data_missing 항목은 평가 불가라 제외하는 게 정확하다.
    manual_required도 동일 — 수동 입력 없이 0점이므로 제외.
    """
    available = 0.0
    for code, weight in weights.items():
        result = score_map.get(code)
        if result is None:
            continue
        if result.eval_status in ("data_missing", "manual_required"):
            continue
        available += weight
    return available if available > 0 else sum(weights.values())


def apply_buy_scoring(
    *,
    strategy: str,
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
    strict_max: float,
    vkospi_multiplier: float,
    snapshot: Any | None = None,
    volatility_context: dict[str, Any] | None = None,
) -> dict[str, Any]:
    normalized = "breakout" if strategy == "momentum" else strategy
    signal_factors = BREAKOUT_SIGNAL_FACTORS if normalized == "breakout" else None
    strict_raw = aggregate_raw_score(score_map, weights, snapshot=None, signal_factors=None)
    signal_raw = aggregate_raw_score(score_map, weights, snapshot=snapshot, signal_factors=signal_factors)
    score_delta = float((volatility_context or {}).get("scoreDelta") or 0.0)
    strict_score = round(_clamp_score(strict_raw * vkospi_multiplier + score_delta, 0.0, strict_max), 1)
    signal_score = round(_clamp_score(signal_raw * vkospi_multiplier + score_delta, 0.0, strict_max), 1)
    # 가용성 인지 정규화: data_missing/manual_required 항목을 분모에서 제외한다.
    # 이를 통해 토스 데이터 미수집 시에도 셋업이 완벽하면 S 등급에 도달 가능.
    eff_max = available_strict_max(score_map, weights)
    grade_score = round(_clamp_score(grade_score_from_strict(strict_score, eff_max), 0.0, 10.0), 1)
    grade = grade_from_score(grade_score, strategy)
    return {
        "strictScore": strict_score,
        "signalScore": signal_score,
        "score": signal_score,
        "scoreMax": strict_max,        # 원래 최대점수는 정보용으로 보존
        "effectiveScoreMax": round(eff_max, 2),  # 실효 분모 (등급 산출에 사용)
        "gradeScore": grade_score,
        "grade": grade,
        "scoreBreakdown": append_volatility_breakdown_row(
            build_score_breakdown(
                score_map,
                weights,
                snapshot=snapshot,
                signal_factors=signal_factors,
            ),
            volatility_context,
        ),
        "scoreScope": normalized,
    }


def rank_buy_entries(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """strictScore 우선, 동점 시 entryEligible·signalScore 순."""

    def sort_key(entry: dict[str, Any]) -> tuple:
        eligible = 1 if entry.get("entryEligible") else 0
        strict = float(entry.get("strictScore") or 0)
        signal = float(entry.get("signalScore") or entry.get("score") or 0)
        return (eligible, strict, signal)

    return sorted(entries, key=sort_key, reverse=True)
