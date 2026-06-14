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
    "L1": 1.0,  # 대차잔고 증가 추이 — 숏스퀴즈 동력 (대형주만 수집, 그 외 데이터 부족)
}
BREAKOUT_STRICT_MAX = 12.5

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

# 2026-06 재채점: 기존 항목(S1 거래대금순위·S3 체결강도·P1 MA터치·P3 앵커회복·
# C2/C4 거래량수축·C3 섹터추격)은 눌림목 수익과 무상관 또는 역상관(grade-ret corr
# -0.42)이라 등급 산출에서 제외했다. 대신 '눌림 깊이(D1)·수급(D2)·반등 거래량(D3)'을
# 가점해 corr +0.51로 전환. 제외 항목은 score_map에 남아 UI 진단으로만 표시된다.
PULLBACK_SCORE_WEIGHTS: dict[str, float] = {
    "S2": 2.0,   # 외인·기관 당일 순매수 (수급 바닥)
    "P2": 1.5,   # 종가가 5/10/20MA 중 1개 위 (반등 시작 확인, 순상관 +5.39)
    "C1": 1.0,   # 양봉 또는 아래꼬리:몸통 ≥ 1:1 (반등 캔들)
    "C5": 0.5,   # 뉴스 재료 신선도 (수급 무관 가점 — 뉴스 리랭크 유지용)
    "D1": 2.5,   # 눌림 깊이 (52주 고가 대비 낙폭)
    "D2": 2.0,   # 수급 추세 (2일 순매수 강도)
    "D3": 2.0,   # 반등 거래량 (당일/20일 평균)
    "D4": 1.5,   # 대차잔고(공매도) 감소 추이 — 숏커버링 징후 (대형주만 수집, 그 외 데이터 부족)
}
PULLBACK_STRICT_MAX = 13.0

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
    "L1": 1.0,  # 대차잔고 감소 추이 — 클린 매집 징후 (대형주만 수집, 그 외 데이터 부족)
}
ACCUMULATION_STRICT_MAX = 14.0

REVERSAL_SCORE_WEIGHTS = dict(TREND_SCORE_WEIGHTS)
REVERSAL_STRICT_MAX = 10.0

SignalFactorFn = Callable[[str, EvalResult, Optional[Any]], float]


def _clamp_score(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(maximum, value))


def _snapshot_value(snapshot: Any | None, key: str, default: Any = None) -> Any:
    if snapshot is None:
        return default
    if isinstance(snapshot, dict):
        return snapshot.get(key, default)
    return getattr(snapshot, key, default)


def _snapshot_mapping(snapshot: Any | None, key: str) -> dict[str, Any]:
    value = _snapshot_value(snapshot, key, {})
    return value if isinstance(value, dict) else {}


def _breakout_s2_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    if snapshot is None:
        return 0.0
    toss = _snapshot_mapping(snapshot, "toss")
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
    orderbook = _snapshot_mapping(snapshot, "orderbook")
    bid_ask_ratio = float(orderbook.get("bidAskRatio") or 0)
    if bid_ask_ratio >= 1.2:
        return 1.0
    if bid_ask_ratio >= 1.0:
        return 0.5
    return 0.0


def _breakout_p1_signal_factor(_code: str, result: EvalResult, snapshot: Any | None) -> float:
    if result.score >= 1.0:
        return 1.0
    high_20d = _snapshot_value(snapshot, "high_20d")
    if high_20d is None and isinstance(snapshot, dict):
        high_20d = snapshot.get("high20d")
    price = _snapshot_value(snapshot, "current_price")
    if price is None and isinstance(snapshot, dict):
        price = snapshot.get("currentPrice")
    if snapshot is None or not high_20d or not price:
        return 0.0
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


# 강세장 + VKOSPI strong + 갭다운 경고(G-D/G-E) 조합은 익일 보유 종가베팅이
# 오버나이트 갭다운에 최대로 노출되는 구간이다. 백테스트에서 이 조합에 최악 손실
# (역추세 갭다운)이 집중돼, 해당 케이스의 점수·랭크를 대폭 깎아 추천에서 배제한다.
OVERNIGHT_GAP_RISK_PENALTY = 2.5


def overnight_gap_risk_penalty(regime_bucket: str, vkospi_tier: str, gap_code: str) -> float:
    if (
        str(regime_bucket) == "bull"
        and str(vkospi_tier) == "strong"
        and str(gap_code) in {"G-D", "G-E"}
    ):
        return OVERNIGHT_GAP_RISK_PENALTY
    return 0.0


def apply_buy_scoring(
    *,
    strategy: str,
    score_map: dict[str, EvalResult],
    weights: dict[str, float],
    strict_max: float,
    vkospi_multiplier: float,
    snapshot: Any | None = None,
    volatility_context: dict[str, Any] | None = None,
    regime_bucket: str = "",
    vkospi_tier: str = "",
    gap_code: str = "",
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
    overnight_penalty = overnight_gap_risk_penalty(regime_bucket, vkospi_tier, gap_code)
    if overnight_penalty > 0:
        grade_score = round(max(0.0, grade_score - overnight_penalty), 1)
        strict_score = round(max(0.0, strict_score - overnight_penalty), 1)
        signal_score = round(max(0.0, signal_score - overnight_penalty), 1)
    grade = grade_from_score(grade_score, strategy)
    return {
        "strictScore": strict_score,
        "signalScore": signal_score,
        "score": signal_score,
        "scoreMax": strict_max,        # 원래 최대점수는 정보용으로 보존
        "effectiveScoreMax": round(eff_max, 2),  # 실효 분모 (등급 산출에 사용)
        "gradeScore": grade_score,
        "grade": grade,
        "overnightGapPenalty": overnight_penalty,
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
