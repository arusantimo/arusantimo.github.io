from __future__ import annotations

from copy import deepcopy
from typing import Any, Dict


BUBBLE_SIGNAL_LABELS = {
    "marginDebt": "신용매수 과열",
    "ipo": "공모주 광풍",
    "trash": "적자 혁신주 투기",
    "fed": "연준 브레이크",
}
BUBBLE_SIGNAL_KEYS = tuple(BUBBLE_SIGNAL_LABELS.keys())
DEFAULT_BUBBLE_REASON = "버블 플래그 대기 중"
ANCHOR_BUFFERED_OVERHEAT_KEY = "anchor-buffered-overheat"
ANCHOR_BUFFERED_OVERHEAT_LABEL = "Stage 3.2: 펀더멘털 완충형 과열 (Anchor Buffered Overheat)"


def clamp(value: float, minimum: float = 0.0, maximum: float = 100.0) -> float:
    return max(minimum, min(maximum, float(value)))


def as_number(value: Any) -> float | None:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return None
    if numeric != numeric:
        return None
    return numeric


def score_to_signal_state(score: Any, critical: bool = False) -> str:
    numeric_score = clamp(float(score or 0))
    if critical:
        return "critical"
    if numeric_score >= 70:
        return "warning"
    if numeric_score >= 40:
        return "watch"
    return "neutral"


def build_bubble_signal(
    label: str,
    score: Any = 0,
    *,
    critical: bool = False,
    state: str | None = None,
    reason: str = DEFAULT_BUBBLE_REASON,
    metrics: Dict[str, Any] | None = None,
    updated_at: str = "",
) -> Dict[str, Any]:
    numeric_score = round(clamp(float(score or 0)), 2)
    resolved_state = state or score_to_signal_state(numeric_score, critical)
    return {
        "score": numeric_score,
        "state": resolved_state,
        "critical": bool(critical),
        "label": label,
        "reason": str(reason or DEFAULT_BUBBLE_REASON),
        "metrics": deepcopy(metrics) if isinstance(metrics, dict) else {},
        "updatedAt": str(updated_at or ""),
    }


def create_default_bubble_signal(flag_key: str, reason: str = DEFAULT_BUBBLE_REASON) -> Dict[str, Any]:
    return build_bubble_signal(BUBBLE_SIGNAL_LABELS.get(flag_key, flag_key), reason=reason)


def normalize_bubble_signal(flag_key: str, raw: Any) -> Dict[str, Any]:
    default = create_default_bubble_signal(flag_key)
    if not isinstance(raw, dict):
        return default
    score = clamp(float(raw.get("score") or default["score"]))
    critical = bool(raw.get("critical"))
    state = str(raw.get("state") or score_to_signal_state(score, critical))
    metrics = raw.get("metrics") if isinstance(raw.get("metrics"), dict) else {}
    return {
        "score": round(score, 2),
        "state": state,
        "critical": critical,
        "label": str(raw.get("label") or default["label"]),
        "reason": str(raw.get("reason") or default["reason"]),
        "metrics": deepcopy(metrics),
        "updatedAt": str(raw.get("updatedAt") or ""),
    }


def normalize_bubble_signals(raw_signals: Any) -> Dict[str, Dict[str, Any]]:
    source = raw_signals if isinstance(raw_signals, dict) else {}
    return {
        key: normalize_bubble_signal(key, source.get(key))
        for key in BUBBLE_SIGNAL_KEYS
    }


def summarize_bubble_overlay(data: Dict[str, Any]) -> Dict[str, Any]:
    signals = normalize_bubble_signals(data.get("bubbleSignals"))
    scores = [float(signals[key]["score"]) for key in BUBBLE_SIGNAL_KEYS]
    bubble_index = round(sum(scores) / len(scores), 2)
    active_flag_count = sum(
        1
        for key in BUBBLE_SIGNAL_KEYS
        if signals[key]["critical"] or float(signals[key]["score"]) >= 50
    )
    all_critical = all(bool(signals[key]["critical"]) for key in BUBBLE_SIGNAL_KEYS)
    critical_trigger = bubble_index >= 85 and all_critical
    coverage_count = sum(
        1
        for key in BUBBLE_SIGNAL_KEYS
        if signals[key]["updatedAt"]
        or float(signals[key]["score"]) != 0
        or str(signals[key]["reason"]) != DEFAULT_BUBBLE_REASON
    )
    critical_reason = (
        f"Critical Trigger 발동 · BI {round(bubble_index)} / 4대 플래그 모두 critical"
        if critical_trigger
        else f"Critical Trigger 미발동 · BI {round(bubble_index)} / active {active_flag_count}개"
    )
    return {
        "bubbleSignals": signals,
        "bubbleIndex": bubble_index,
        "bubbleActiveFlagCount": active_flag_count,
        "bubbleCriticalTrigger": critical_trigger,
        "bubbleCriticalReason": critical_reason,
        "bubbleSignalCoverageCount": coverage_count,
    }


def has_strong_anchor_buffer(data: Dict[str, Any]) -> bool:
    anchor_state = str(data.get("fundamentalAnchorState") or "neutral")
    anchor_score = as_number(data.get("fundamentalAnchorScore"))
    return anchor_state == "validated" or (anchor_score is not None and anchor_score >= 75)


def format_anchor_buffer_text(data: Dict[str, Any]) -> str:
    anchor_state = str(data.get("fundamentalAnchorState") or "neutral")
    anchor_score = as_number(data.get("fundamentalAnchorScore"))
    if anchor_score is not None:
        return f"펀더멘털 앵커 {round(anchor_score)}점"
    if anchor_state == "validated":
        return "검증된 펀더멘털 앵커"
    return "강한 펀더멘털 앵커"


def resolve_hot_zone_market_regime(
    data: Dict[str, Any],
    *,
    fx: float,
    equity_overbought: float,
    fundamental_support_score: float,
    risk_index: float,
) -> Dict[str, Any]:
    summary = summarize_bubble_overlay(data)
    bubble_index = as_number(data.get("bubbleIndex"))
    if bubble_index is None:
        bubble_index = summary["bubbleIndex"]
    bubble_active_flag_count = as_number(data.get("bubbleActiveFlagCount"))
    if bubble_active_flag_count is None:
        bubble_active_flag_count = float(summary["bubbleActiveFlagCount"])
    bubble_critical_trigger = bool(data.get("bubbleCriticalTrigger")) if isinstance(data.get("bubbleCriticalTrigger"), bool) else bool(summary["bubbleCriticalTrigger"])
    bubble_coverage_count = as_number(data.get("bubbleSignalCoverageCount"))
    if bubble_coverage_count is None:
        bubble_coverage_count = float(summary["bubbleSignalCoverageCount"])

    market_regime_key = "standard"
    market_regime_label = "표준 레짐"
    market_regime_reason = "특수 레짐 조건 없음"
    debasement_alert = False
    adjusted_risk_index = clamp(risk_index)

    if fx >= 1450 and equity_overbought >= 75:
        if fundamental_support_score >= 70:
            market_regime_key = "secular-expansion"
            market_regime_label = "Stage 3.5: 실적 정당화형 구조적 확장기 (Secular Expansion)"
            market_regime_reason = (
                f"원/달러 {round(fx)}원과 과열 이격이 겹쳐도 "
                f"F_support {round(fundamental_support_score)}점이 높아 구조적 확장기로 완화했습니다."
            )
            adjusted_risk_index = min(adjusted_risk_index, 55)
        elif (
            has_strong_anchor_buffer(data)
            and bubble_coverage_count >= len(BUBBLE_SIGNAL_KEYS)
            and not bubble_critical_trigger
            and bubble_index < 60
            and bubble_active_flag_count <= 1
        ):
            market_regime_key = ANCHOR_BUFFERED_OVERHEAT_KEY
            market_regime_label = ANCHOR_BUFFERED_OVERHEAT_LABEL
            market_regime_reason = (
                f"원/달러 {round(fx)}원과 과열 이격이 겹쳤지만 "
                f"{format_anchor_buffer_text(data)}과 non-critical bubble(BI {round(bubble_index)} / "
                f"active {int(bubble_active_flag_count)}개)가 완충해 펀더멘털 완충형 과열로 낮췄습니다."
            )
            adjusted_risk_index = clamp(adjusted_risk_index, 66, 80)
        else:
            market_regime_key = "debasement-bubble"
            market_regime_label = "Stage 6: 화폐 몰락형 특수 버블 (Debasement Bubble)"
            market_regime_reason = (
                f"원/달러 {round(fx)}원과 과열 이격이 겹쳤지만 "
                f"F_support {round(fundamental_support_score)}점이 부족해 특수 버블 경계로 강화했습니다."
            )
            adjusted_risk_index = max(adjusted_risk_index, 85)
            debasement_alert = True

    return {
        "marketRegimeKey": market_regime_key,
        "marketRegimeLabel": market_regime_label,
        "marketRegimeReason": market_regime_reason,
        "riskIndex": adjusted_risk_index,
        "debasementAlert": debasement_alert,
    }


def decorate_bubble_overlay(data: Dict[str, Any]) -> Dict[str, Any]:
    summary = summarize_bubble_overlay(data)
    market_regime_key = str(data.get("marketRegimeKey") or "standard")
    bubble_state = "standard"
    bubble_regime_label = "표준 버블 경계"
    bubble_regime_reason = (
        f"BI {round(summary['bubbleIndex'])} / active {summary['bubbleActiveFlagCount']}개로 아직 파국 임계기는 아닙니다."
    )

    if summary["bubbleCriticalTrigger"]:
        bubble_state = "critical"
        bubble_regime_label = "Stage 4.0-CRITICAL: 버블 최정점 및 파국 임계기"
        bubble_regime_reason = "Bubble Index와 4대 플래그 critical이 동시에 충족돼 기계적 방어 모드가 우선입니다."
    elif market_regime_key == "debasement-bubble":
        bubble_state = "debasement"
        bubble_regime_label = "화폐 몰락형 특수 버블 경계"
        bubble_regime_reason = (
            f"{data.get('marketRegimeReason') or '기존 레짐이 debasement-bubble로 분류됩니다.'} "
            f"버블 플래그 active {summary['bubbleActiveFlagCount']}개를 병렬로 추적합니다."
        )
    elif market_regime_key == "secular-expansion":
        bubble_state = "gear-second"
        bubble_regime_label = "실적 정당화형 과열 (Gear Second)"
        bubble_regime_reason = (
            f"{data.get('marketRegimeReason') or '기존 레짐이 secular-expansion으로 분류됩니다.'} "
            f"버블 플래그 active {summary['bubbleActiveFlagCount']}개를 병렬로 추적합니다."
        )
    elif market_regime_key == ANCHOR_BUFFERED_OVERHEAT_KEY:
        bubble_state = "gear-second"
        bubble_regime_label = "펀더멘털 완충형 과열 경계"
        bubble_regime_reason = (
            f"{data.get('marketRegimeReason') or '강한 펀더멘털 앵커와 비critical bubble이 과열을 완충합니다.'} "
            f"버블 플래그 active {summary['bubbleActiveFlagCount']}개를 병렬로 추적합니다."
        )

    return {
        "bubbleSignals": summary["bubbleSignals"],
        "bubbleIndex": summary["bubbleIndex"],
        "bubbleActiveFlagCount": summary["bubbleActiveFlagCount"],
        "bubbleCriticalTrigger": summary["bubbleCriticalTrigger"],
        "bubbleCriticalReason": summary["bubbleCriticalReason"],
        "bubbleState": bubble_state,
        "bubbleRegimeLabel": bubble_regime_label,
        "bubbleRegimeReason": bubble_regime_reason,
    }
