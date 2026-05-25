from __future__ import annotations

from typing import Any, Dict, Optional

from .collectors import safe_number
from .trap_policy import calculate_bull_trap_score


ANCHOR_BUFFERED_CYCLE_KEY = "anchor-buffered-overheat"
CYCLE_STAGES = {
    "panic": {"key": "panic", "fullLabel": "상승 1: 투매", "min": 0, "max": 20},
    "pessimism": {"key": "pessimism", "fullLabel": "상승 2: 비관", "min": 21, "max": 35},
    "skepticism": {"key": "skepticism", "fullLabel": "상승 3: 회의", "min": 36, "max": 50},
    "optimism": {"key": "optimism", "fullLabel": "상승 4: 낙관", "min": 51, "max": 65},
    "greed": {"key": "greed", "fullLabel": "상승 5: 탐욕", "min": 66, "max": 80},
    "euphoria": {"key": "euphoria", "fullLabel": "정점: 환희", "min": 81, "max": 100},
    "complacency": {"key": "complacency", "fullLabel": "하락 1: 안도·자만", "min": 61, "max": 80},
    "denial": {"key": "denial", "fullLabel": "하락 2: 불안·부인", "min": 41, "max": 60},
    "capitulation": {"key": "capitulation", "fullLabel": "하락 3: 공포·항복", "min": 21, "max": 40},
}


def get_cycle_stage(stage_key: str) -> Dict[str, Any]:
    return CYCLE_STAGES.get(stage_key, CYCLE_STAGES["skepticism"])


def resolve_cycle_leg(
    previous_risk_index: Optional[float],
    risk_index: float,
    previous_leg: str = "rising",
    *,
    market_regime_key: str = "standard",
    bubble_critical_trigger: bool = False,
    trap_score: Optional[float] = None,
) -> str:
    next_leg = previous_leg or "rising"
    if previous_risk_index is not None:
        delta = risk_index - previous_risk_index
        if delta >= 2:
            next_leg = "rising"
        elif delta <= -2:
            next_leg = "falling"
    if market_regime_key == ANCHOR_BUFFERED_CYCLE_KEY and not bubble_critical_trigger and not ((trap_score or 0) >= 10):
        return "rising"
    return next_leg or "rising"


def resolve_cycle_stage(risk_index: float, vix: float, cycle_leg: str, trap_score: float) -> Dict[str, Any]:
    if risk_index <= 20 or vix >= 30:
        return get_cycle_stage("panic")
    if trap_score >= 14:
        return get_cycle_stage("denial")
    if trap_score >= 10:
        return get_cycle_stage("complacency")
    if risk_index >= 81:
        return get_cycle_stage("euphoria")
    if cycle_leg == "falling":
        if risk_index >= 61:
            return get_cycle_stage("complacency")
        if risk_index >= 41:
            return get_cycle_stage("denial")
        if risk_index >= 21:
            return get_cycle_stage("capitulation")
    if risk_index <= 35:
        return get_cycle_stage("pessimism")
    if risk_index <= 50:
        return get_cycle_stage("skepticism")
    if risk_index <= 65:
        return get_cycle_stage("optimism")
    if risk_index <= 80:
        return get_cycle_stage("greed")
    return get_cycle_stage("euphoria")


def resolve_kostolany_stage(cycle_leg: str, risk_index: float, bull_ratio: Optional[float]) -> Dict[str, str]:
    stage = "B2"
    if cycle_leg == "rising":
        if risk_index <= 33:
            stage = "B1"
        elif risk_index <= 66:
            stage = "B2"
        else:
            stage = "B3"
    elif cycle_leg == "falling":
        if risk_index >= 66:
            stage = "A1"
        elif risk_index >= 33:
            stage = "A2"
        else:
            stage = "A3"

    note = "거래량과 가격이 동행 (정상)"
    if cycle_leg == "rising" and bull_ratio is not None and bull_ratio >= 80 and risk_index >= 60:
        note = "양봉 비율 폭증 · 부화수가 물량을 인수하는 정점 신호"
    elif cycle_leg == "falling" and bull_ratio is not None and bull_ratio <= 25 and risk_index <= 35:
        note = "거래량 고갈 · 소신파만 남는 바닥 신호"
    return {"stage": stage, "note": note}


def calculate_cycle_runtime_values(data: Dict[str, Any]) -> Dict[str, Any]:
    risk_index = safe_number(data.get("riskIndex")) or 50.0
    previous_risk_index = safe_number(data.get("previousRiskIndex"))
    previous_leg = str(data.get("cycleLeg") or "rising")
    natural_cycle_leg = resolve_cycle_leg(previous_risk_index, risk_index, previous_leg)
    trap_result = calculate_bull_trap_score({**data, "riskIndex": risk_index, "cycleLeg": natural_cycle_leg})
    cycle_leg = resolve_cycle_leg(
        previous_risk_index,
        risk_index,
        previous_leg,
        market_regime_key=str(data.get("marketRegimeKey") or "standard"),
        bubble_critical_trigger=bool(data.get("bubbleCriticalTrigger")),
        trap_score=trap_result["trapScore"],
    )
    vix = safe_number(data.get("vix")) or 0.0
    stage = resolve_cycle_stage(risk_index, vix, cycle_leg, trap_result["trapScore"])
    raw_risk_index = safe_number(data.get("rawRiskIndex"))
    support_score = safe_number(data.get("fundamentalSupportScore")) or 50.0
    support_offset = safe_number(data.get("supportOffsetPoints"))
    if support_offset is None:
        support_offset = round(support_score * 0.3, 2)
    market_regime_key = str(data.get("marketRegimeKey") or "standard")
    market_regime_reason = str(data.get("marketRegimeReason") or "특수 레짐 조건 없음")

    if risk_index <= 20 or vix >= 30:
        stage_override_reason = "VIX 급등 또는 저점 P-Index 조건으로 투매 단계를 우선 적용했습니다."
    elif trap_result["trapScore"] >= 14:
        stage_override_reason = f"Bull Trap {trap_result['trapScore']}/20으로 하락 2단계(불안·부인)로 오버라이드했습니다."
    elif trap_result["trapScore"] >= 10:
        stage_override_reason = f"Bull Trap {trap_result['trapScore']}/20으로 하락 1단계(안도·자만)로 오버라이드했습니다."
    elif bool(data.get("bubbleCriticalTrigger")):
        stage_override_reason = str(data.get("bubbleCriticalReason") or "Critical Trigger 대기 중")
    elif market_regime_key in {"secular-expansion", ANCHOR_BUFFERED_CYCLE_KEY}:
        stage_override_reason = market_regime_reason
    elif bool(data.get("debasementAlert")):
        stage_override_reason = market_regime_reason
    elif support_offset > 0:
        raw_label = "-" if raw_risk_index is None else str(round(raw_risk_index))
        stage_override_reason = f"지지력 보정: raw P {raw_label} -> adjusted P {round(risk_index)} · F_support {round(support_score)}점"
    else:
        stage_override_reason = ""

    kostolany = resolve_kostolany_stage(cycle_leg, risk_index, safe_number(data.get("bullRatio")))
    return {
        "cycleLeg": cycle_leg,
        "cycleStageKey": stage["key"],
        "cycleStageLabel": stage["fullLabel"],
        "stageOverrideReason": stage_override_reason,
        "trapScore": trap_result["trapScore"],
        "trapState": trap_result["trapState"],
        "trapReason": trap_result["trapReason"],
        "trapFlowScore": trap_result["trapFlowScore"],
        "trapMarginScore": trap_result["trapMarginScore"],
        "trapFirstShockScore": trap_result["trapFirstShockScore"],
        "trapThreeDayScore": trap_result["trapThreeDayScore"],
        "trapRecoveryScore": trap_result["trapRecoveryScore"],
        "kostolanyStage": kostolany["stage"],
        "kostolanyDivergenceNote": kostolany["note"],
    }
