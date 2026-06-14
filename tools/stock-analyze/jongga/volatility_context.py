"""시장·종목 혼합 변동성으로 전략 적합도와 보조 점수를 계산한다."""

from __future__ import annotations

import math
from typing import Any

from jongga.strategy_regime import strategy_display_name

CALM = "calm"
NEUTRAL = "neutral"
VOLATILE = "volatile"

FAVORABLE = "favorable"
SLIGHT_FAVORABLE = "slight_favorable"
FIT_NEUTRAL = "neutral"
UNFAVORABLE = "unfavorable"

CALM_LABEL = "저변동성"
NEUTRAL_LABEL = "중립 변동성"
VOLATILE_LABEL = "고변동성"

FIT_LABELS = {
    FAVORABLE: "유리",
    SLIGHT_FAVORABLE: "다소 유리",
    FIT_NEUTRAL: "중립",
    UNFAVORABLE: "불리",
}

VOLATILITY_SCORE_RULES: dict[str, dict[str, tuple[str, float]]] = {
    "breakout": {
        CALM: (FAVORABLE, 1.0),
        NEUTRAL: (SLIGHT_FAVORABLE, 0.25),
        VOLATILE: (UNFAVORABLE, -1.0),
    },
    "momentum": {
        CALM: (FAVORABLE, 1.0),
        NEUTRAL: (SLIGHT_FAVORABLE, 0.25),
        VOLATILE: (UNFAVORABLE, -1.0),
    },
    "pullback": {
        CALM: (FIT_NEUTRAL, 0.0),
        NEUTRAL: (SLIGHT_FAVORABLE, 0.25),
        VOLATILE: (FAVORABLE, 0.75),
    },
    "accumulation": {
        CALM: (UNFAVORABLE, -0.5),
        NEUTRAL: (FIT_NEUTRAL, 0.0),
        VOLATILE: (FAVORABLE, 0.75),
    },
    "reversal": {
        CALM: (UNFAVORABLE, -1.0),
        NEUTRAL: (FIT_NEUTRAL, 0.0),
        VOLATILE: (FAVORABLE, 1.0),
    },
}

VOLATILITY_REASON_TEMPLATES = {
    "breakout": {
        CALM: "저변동성 장세라 돌파 지속성이 좋아 유리합니다.",
        NEUTRAL: "중립 변동성이라 돌파는 가능하지만 추격은 보수적으로 봅니다.",
        VOLATILE: "고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다.",
    },
    "momentum": {
        CALM: "저변동성 장세라 돌파 지속성이 좋아 유리합니다.",
        NEUTRAL: "중립 변동성이라 돌파는 가능하지만 추격은 보수적으로 봅니다.",
        VOLATILE: "고변동성 장세라 실패 돌파·윗꼬리 위험이 커 불리합니다.",
    },
    "pullback": {
        CALM: "저변동성 장세라 눌림목 우위는 뚜렷하지 않습니다.",
        NEUTRAL: "중립 변동성이라 눌림목 진입은 다소 유리합니다.",
        VOLATILE: "고변동성 장세라 눌림목 반등 포착에 유리합니다.",
    },
    "accumulation": {
        CALM: "저변동성 장세에서는 조용한 횡보가 길어지기 쉬워 불리합니다.",
        NEUTRAL: "중립 변동성이라 매집 해석은 중립으로 봅니다.",
        VOLATILE: "고변동성 장세에서는 조용한 매집 구간이 상대적으로 유리합니다.",
    },
    "reversal": {
        CALM: "저변동성 장세에서는 낙주 매매 명분이 약해 불리합니다.",
        NEUTRAL: "중립 변동성이라 낙주 매매는 중립으로 봅니다.",
        VOLATILE: "고변동성 장세에서는 낙주 매매 기회가 늘어 유리합니다.",
    },
}


def _safe_float(value: Any) -> float:
    try:
        number = float(value or 0)
    except (TypeError, ValueError):
        return 0.0
    return number if math.isfinite(number) else 0.0


def _average(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def _daily_returns(close_history: list[float], limit: int) -> list[float]:
    returns: list[float] = []
    max_index = min(len(close_history) - 1, limit)
    for index in range(max_index):
        current_close = _safe_float(close_history[index])
        previous_close = _safe_float(close_history[index + 1])
        if previous_close <= 0:
            continue
        returns.append((current_close - previous_close) / previous_close * 100.0)
    return returns


def _stddev(values: list[float]) -> float:
    if len(values) < 2:
        return 0.0
    mean = _average(values)
    variance = sum((value - mean) ** 2 for value in values) / len(values)
    return math.sqrt(variance)


def _atr_pct_10(snapshot: Any) -> float:
    closes = list(getattr(snapshot, "close_history", []) or [])
    highs = list(getattr(snapshot, "high_history", []) or [])
    lows = list(getattr(snapshot, "low_history", []) or [])
    if len(closes) < 2 or not highs or not lows:
        return 0.0

    samples: list[float] = []
    max_index = min(len(closes) - 1, len(highs), len(lows), 10)
    for index in range(max_index):
        high = _safe_float(highs[index])
        low = _safe_float(lows[index])
        close = _safe_float(closes[index])
        previous_close = _safe_float(closes[index + 1])
        if close <= 0:
            continue
        true_range = max(high - low, abs(high - previous_close), abs(low - previous_close))
        samples.append(true_range / close * 100.0)
    return round(_average(samples), 2)


def classify_market_state(context: dict[str, Any]) -> str:
    effective_regime = str(context.get("effectiveRegimeLabel") or context.get("regimeLabel") or "")
    vkospi = _safe_float(context.get("vkospiValue"))
    if effective_regime.startswith("강세장") and vkospi < 18.5:
        return CALM
    if vkospi >= 25.0 or effective_regime.startswith("박스권") or effective_regime.startswith("약세장"):
        return VOLATILE
    return NEUTRAL


def classify_stock_state(snapshot: Any) -> tuple[str, dict[str, float]]:
    atr_pct_10 = _atr_pct_10(snapshot)
    return_std_20 = round(_stddev(_daily_returns(list(getattr(snapshot, "close_history", []) or []), 20)), 2)
    prev_close = _safe_float(getattr(snapshot, "prev_close", 0))
    high_price = _safe_float(getattr(snapshot, "high_price", 0))
    low_price = _safe_float(getattr(snapshot, "low_price", 0))
    today_range_pct = round(((high_price - low_price) / prev_close * 100.0) if prev_close > 0 else 0.0, 2)

    if atr_pct_10 >= 4.5 or return_std_20 >= 3.2 or today_range_pct >= 6.0:
        state = VOLATILE
    elif atr_pct_10 <= 2.2 and return_std_20 <= 1.8 and today_range_pct <= 3.0:
        state = CALM
    else:
        state = NEUTRAL

    return state, {
        "atrPct10": atr_pct_10,
        "returnStd20": return_std_20,
        "todayRangePct": today_range_pct,
    }


def blend_volatility_state(market_state: str, stock_state: str) -> str:
    if market_state == VOLATILE or stock_state == VOLATILE:
        return VOLATILE
    if market_state == CALM and stock_state == CALM:
        return CALM
    return NEUTRAL


def _state_label(state: str) -> str:
    if state == CALM:
        return CALM_LABEL
    if state == VOLATILE:
        return VOLATILE_LABEL
    return NEUTRAL_LABEL


def build_volatility_context(snapshot: Any, context: dict[str, Any], strategy: str) -> dict[str, Any]:
    normalized = "breakout" if str(strategy or "").strip().lower() == "momentum" else str(strategy or "").strip().lower()
    market_state = classify_market_state(context)
    stock_state, metrics = classify_stock_state(snapshot)
    blended_state = blend_volatility_state(market_state, stock_state)
    strategy_fit, score_delta = VOLATILITY_SCORE_RULES.get(normalized, VOLATILITY_SCORE_RULES["pullback"]).get(
        blended_state,
        (FIT_NEUTRAL, 0.0),
    )
    vkospi = round(_safe_float(context.get("vkospiValue")), 2)
    metrics["vkospi"] = vkospi
    reason_headline = VOLATILITY_REASON_TEMPLATES.get(normalized, VOLATILITY_REASON_TEMPLATES["pullback"]).get(
        blended_state,
        "",
    )
    summary = f"{FIT_LABELS.get(strategy_fit, '중립')} ({reason_headline.replace('.', '')})"
    reason = (
        f"시장 {_state_label(market_state)} / 종목 {_state_label(stock_state)} → 혼합 {_state_label(blended_state)}. "
        f"{reason_headline} "
        f"VKOSPI {vkospi:.2f}, ATR10 {metrics['atrPct10']:.2f}%, "
        f"일간 표준편차 {metrics['returnStd20']:.2f}%, 당일 레인지 {metrics['todayRangePct']:.2f}%."
    )
    return {
        "marketState": market_state,
        "stockState": stock_state,
        "blendedState": blended_state,
        "strategyFit": strategy_fit,
        "scoreDelta": round(score_delta, 2),
        "summary": summary,
        "reason": reason,
        "metrics": metrics,
        "strategyLabel": strategy_display_name(normalized),
    }


def build_volatility_keypoint_suffix(volatility_context: dict[str, Any]) -> str:
    blended_state = str(volatility_context.get("blendedState") or "")
    fit = str(volatility_context.get("strategyFit") or "")
    if blended_state == VOLATILE and fit in {FAVORABLE, SLIGHT_FAVORABLE}:
        return "고변동성 장세라 현재 전략이 상대적으로 유리합니다."
    if blended_state == VOLATILE and fit == UNFAVORABLE:
        return "고변동성 장세라 현재 전략은 보수적으로 해석해야 합니다."
    if blended_state == CALM and fit == FAVORABLE:
        return "저변동성 장세라 현재 전략이 상대적으로 유리합니다."
    if blended_state == CALM and fit == UNFAVORABLE:
        return "저변동성 장세라 현재 전략 우위는 낮습니다."
    if fit == SLIGHT_FAVORABLE:
        return "중립 변동성이라 현재 전략이 다소 유리합니다."
    return "변동성 기준으로는 중립에 가깝습니다."
