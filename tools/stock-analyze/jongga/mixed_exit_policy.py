from __future__ import annotations

from typing import Any

MIXED_EXIT_POLICY_VERSION = "mixed-exit-v1-balanced"
VOLATILE_RANGE_PCT_MIN = 10.0
VOLATILE_ATR_PCT_MIN = 10.0

BUY_STATUS_MARKERS = ("강력매수", "매수추천", "최우선 진입", "진입 가능")
BLOCKED_STATUS_MARKERS = ("매매금지", "자동매수 금지", "신규 진입 금지", "시장 Gate 차단")
PULLBACK_STRICT_GATE_CODES = frozenset({"G10", "G11", "G12", "G13"})


def normalize_mixed_strategy(strategy: Any) -> str:
    value = str(strategy or "").strip()
    return "breakout" if value == "momentum" else value


def _grade_code(value: Any) -> str:
    return str(value or "").strip().upper()[:1]


def _grade_score(entry: dict[str, Any]) -> float:
    try:
        return float(entry.get("gradeScore") if entry.get("gradeScore") is not None else entry.get("score") or 0.0)
    except (TypeError, ValueError):
        return 0.0


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def is_blocked_status_label(status_label: Any) -> bool:
    label = str(status_label or "")
    return any(marker in label for marker in BLOCKED_STATUS_MARKERS)


def is_recommendation_status_label(status_label: Any) -> bool:
    label = str(status_label or "").strip()
    if not label or is_blocked_status_label(label):
        return False
    return any(marker in label for marker in BUY_STATUS_MARKERS)


def _blocked_gate_codes(entry: dict[str, Any]) -> set[str]:
    rows = [*(entry.get("filters") or []), *(entry.get("gates") or [])]
    return {
        str(row.get("code") or "").strip()
        for row in rows
        if str(row.get("status") or "") == "⛔"
    }


def _pullback_recommendation_gate_ok(entry: dict[str, Any]) -> bool:
    if normalize_mixed_strategy(entry.get("strategy")) != "pullback":
        return True
    if _blocked_gate_codes(entry) & PULLBACK_STRICT_GATE_CODES:
        return False
    setup_quality = str(entry.get("setupQuality") or "")
    status_label = str(entry.get("statusLabel") or "").strip()
    if setup_quality == "setup_weak" and status_label.startswith("매매금지("):
        return False
    return True


def mixed_recommendation_cases(entry: dict[str, Any]) -> list[str]:
    score = _grade_score(entry)
    grade = _grade_code(entry.get("replayGrade") or entry.get("grade"))
    pullback_gate_ok = _pullback_recommendation_gate_ok(entry)
    cases: list[str] = []
    if pullback_gate_ok and score >= 7.0 and grade in {"A", "S"}:
        cases.append("a7plus")
    if (
        pullback_gate_ok
        and (
        bool(entry.get("historyRecommendation"))
        or bool(entry.get("entryEligibleOriginal"))
        or bool(entry.get("entryEligible"))
        or is_recommendation_status_label(entry.get("statusLabel"))
        )
    ):
        cases.append("recommendation")
    return cases


def matches_mixed_recommendation_case(entry: dict[str, Any], case_key: str) -> bool:
    normalized = str(case_key or "").strip()
    if normalized == "all":
        return True
    return normalized in mixed_recommendation_cases(entry)


POLICY_DEFINITIONS: dict[str, dict[str, Any]] = {
    "reversal-a7plus-balanced": {
        "label": "반등 × 7&A",
        "priority": 1,
        "strategyCase": "reversal",
        "recommendationCase": "a7plus",
        "stopPct": -2.0,
        "takeProfitStages": [
            {"targetPct": 2.0, "quantityPct": 50.0},
            {"targetPct": 10.0, "quantityPct": 50.0},
        ],
        "positionWeightHint": "normal",
        "reason": "반등 주력 후보는 빠른 수익 확보와 2차 반등 목표를 같이 사용합니다.",
    },
    "pullback-a7plus-balanced": {
        "label": "눌림목 × 7&A",
        "priority": 2,
        "strategyCase": "pullback",
        "recommendationCase": "a7plus",
        "stopPct": -2.0,
        "takeProfitStages": [
            {"targetPct": 5.0, "quantityPct": 80.0},
            {"targetPct": 12.0, "quantityPct": 20.0},
        ],
        "positionWeightHint": "normal",
        "reason": "눌림목 주력 후보는 5% 익절을 기본으로 하고 일부만 12% 목표를 둡니다.",
    },
    "pullback-recommendation-balanced": {
        "label": "눌림목 × 매수추천",
        "priority": 4,
        "strategyCase": "pullback",
        "recommendationCase": "recommendation",
        "stopPct": -2.0,
        "takeProfitStages": [{"targetPct": 5.0, "quantityPct": 100.0}],
        "positionWeightHint": "small",
        "reason": "매수추천 라벨은 보조 가산점으로만 보고 5% 익절을 우선합니다.",
    },
}

POLICY_PRIORITY = (
    ("reversal", "a7plus", "reversal-a7plus-balanced"),
    ("pullback", "a7plus", "pullback-a7plus-balanced"),
    ("pullback", "recommendation", "pullback-recommendation-balanced"),
)


VOLATILE_TAKE_PROFIT_STAGES_BY_POLICY: dict[str, list[dict[str, float]]] = {
    "pullback-a7plus-balanced": [
        {"targetPct": 3.0, "quantityPct": 50.0},
        {"targetPct": 8.0, "quantityPct": 50.0},
    ],
    "pullback-recommendation-balanced": [
        {"targetPct": 3.0, "quantityPct": 50.0},
        {"targetPct": 8.0, "quantityPct": 50.0},
    ],
    "reversal-a7plus-balanced": [
        {"targetPct": 2.0, "quantityPct": 60.0},
        {"targetPct": 8.0, "quantityPct": 40.0},
    ],
}


def mixed_exit_policy_key_for_cell(strategy: Any, case_key: Any) -> str:
    normalized_strategy = normalize_mixed_strategy(strategy)
    normalized_case = str(case_key or "").strip()
    for strategy_key, case_name, policy_key in POLICY_PRIORITY:
        if normalized_strategy == strategy_key and normalized_case == case_name:
            return policy_key
    if normalized_strategy in {"accumulation", "breakout"}:
        return f"observe-{normalized_strategy}"
    return "observe-unmatched"


def _base_stop_condition(stop_pct: Any) -> str:
    stop = _safe_float(stop_pct)
    return f"종가 기준 {stop:g}% 이탈"


def _base_stop_timing() -> str:
    return "종가 확인 후 전량 정리"


def _volatility_context(entry: dict[str, Any]) -> dict[str, Any]:
    context = entry.get("volatilityContext") if isinstance(entry.get("volatilityContext"), dict) else {}
    metrics = context.get("metrics") if isinstance(context.get("metrics"), dict) else {}
    return {
        "blendedState": str(context.get("blendedState") or ""),
        "marketState": str(context.get("marketState") or ""),
        "stockState": str(context.get("stockState") or ""),
        "atrPct10": round(_safe_float(metrics.get("atrPct10")), 2),
        "todayRangePct": round(_safe_float(metrics.get("todayRangePct")), 2),
        "returnStd20": round(_safe_float(metrics.get("returnStd20")), 2),
        "vkospi": round(_safe_float(metrics.get("vkospi")), 2),
    }


def _is_high_volatility(entry: dict[str, Any]) -> bool:
    context = _volatility_context(entry)
    return (
        context["blendedState"] == "volatile"
        or context["marketState"] == "volatile"
        or context["stockState"] == "volatile"
        or context["todayRangePct"] >= VOLATILE_RANGE_PCT_MIN
        or context["atrPct10"] >= VOLATILE_ATR_PCT_MIN
    )


def _policy_payload(policy_key: str) -> dict[str, Any]:
    definition = POLICY_DEFINITIONS.get(policy_key)
    if not definition:
        return {
            "version": MIXED_EXIT_POLICY_VERSION,
            "policyKey": policy_key,
            "label": "관찰 전용",
            "active": False,
            "priority": None,
            "strategyCase": "",
            "recommendationCase": "",
            "stopPct": None,
            "stopExecution": "close",
            "stopCondition": "",
            "stopTiming": "자동 진입 제외",
            "takeProfitStages": [],
            "positionWeightHint": "observe",
            "positionWeightMultiplier": 0.0,
            "intradayRiskRule": {"active": False},
            "volatilityOverlay": {"active": False},
            "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다.",
        }
    stop_pct = definition.get("stopPct")
    return {
        "version": MIXED_EXIT_POLICY_VERSION,
        "policyKey": policy_key,
        "active": True,
        "stopExecution": "close",
        "stopCondition": _base_stop_condition(stop_pct),
        "stopTiming": _base_stop_timing(),
        "positionWeightMultiplier": 1.0 if definition.get("positionWeightHint") == "normal" else 0.5,
        "intradayRiskRule": {"active": False},
        "volatilityOverlay": {"active": False},
        **definition,
    }


def _apply_volatility_overlay(payload: dict[str, Any], entry: dict[str, Any]) -> dict[str, Any]:
    if not payload.get("active") or not _is_high_volatility(entry):
        return payload
    policy_key = str(payload.get("policyKey") or "")
    adjusted_stages = VOLATILE_TAKE_PROFIT_STAGES_BY_POLICY.get(policy_key)
    if not adjusted_stages:
        return payload
    original_stages = [dict(stage) for stage in payload.get("takeProfitStages") or []]
    context = _volatility_context(entry)
    payload["takeProfitStages"] = [dict(stage) for stage in adjusted_stages]
    payload["positionWeightHint"] = "very_small" if payload.get("positionWeightHint") == "small" else "half"
    payload["positionWeightMultiplier"] = 0.5
    payload["stopCondition"] = "종가 -2% 이탈 시 전량 정리, 장중 -5% 이상 훼손 후 회복 실패 시 50% 축소"
    payload["stopTiming"] = "장중 조건은 10:00/14:00 확인 후 부분 축소, 최종 손절은 종가 확인 후"
    payload["intradayRiskRule"] = {
        "active": True,
        "triggerPct": -5.0,
        "action": "50% 축소",
        "timing": "10:00 또는 14:00 확인",
        "recoveryRule": "진입가 대비 -3% 안쪽으로 회복하지 못하면 부분 축소",
        "finalStopRule": "종가 기준 -2% 이탈 시 남은 물량 전량 정리",
    }
    payload["volatilityOverlay"] = {
        "active": True,
        "mode": "high-volatility",
        "label": "고변동성 방어",
        "reason": "시장 또는 종목 변동성이 커서 비중을 줄이고 1차 익절을 앞당깁니다.",
        "triggerMetrics": context,
        "originalTakeProfitStages": original_stages,
        "adjustedTakeProfitStages": [dict(stage) for stage in adjusted_stages],
        "positionWeightMultiplier": 0.5,
    }
    payload["reason"] = f"{payload.get('reason', '')} 고변동성 방어로 비중을 50%로 낮추고 1차 익절을 앞당깁니다.".strip()
    return payload


def select_mixed_exit_policy(entry: dict[str, Any], strategy: Any | None = None) -> dict[str, Any]:
    normalized_strategy = normalize_mixed_strategy(strategy if strategy is not None else entry.get("strategy"))
    if is_blocked_status_label(entry.get("statusLabel")):
        payload = _policy_payload(f"observe-{normalized_strategy or 'blocked'}")
        payload["reason"] = "매매금지 또는 시장 차단 상태라 혼합 전략도 관찰 전용으로 둡니다."
        return payload

    cases = mixed_recommendation_cases(entry)
    for strategy_key, case_key, policy_key in POLICY_PRIORITY:
        if normalized_strategy == strategy_key and case_key in cases:
            return _apply_volatility_overlay(_policy_payload(policy_key), entry)

    return _apply_volatility_overlay(_policy_payload(mixed_exit_policy_key_for_cell(normalized_strategy, cases[0] if cases else "")), entry)
