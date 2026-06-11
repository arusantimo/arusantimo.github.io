from __future__ import annotations

from typing import Any

MIXED_EXIT_POLICY_VERSION = "mixed-exit-v1-balanced"

BUY_STATUS_MARKERS = ("강력매수", "매수추천", "최우선 진입", "진입 가능", "관심후보")
BLOCKED_STATUS_MARKERS = ("매매금지", "자동매수 금지", "신규 진입 금지", "시장 Gate 차단")


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


def is_blocked_status_label(status_label: Any) -> bool:
    label = str(status_label or "")
    return any(marker in label for marker in BLOCKED_STATUS_MARKERS)


def is_recommendation_status_label(status_label: Any) -> bool:
    label = str(status_label or "").strip()
    if not label or is_blocked_status_label(label):
        return False
    return any(marker in label for marker in BUY_STATUS_MARKERS)


def mixed_recommendation_cases(entry: dict[str, Any]) -> list[str]:
    score = _grade_score(entry)
    grade = _grade_code(entry.get("replayGrade") or entry.get("grade"))
    cases: list[str] = []
    if score >= 8.0 and grade in {"A", "S"}:
        cases.append("a8plus")
    if score >= 7.0 and grade == "A":
        cases.append("a7plus")
    if score >= 6.0 and grade in {"A", "B", "S"}:
        cases.append("replay")
    if (
        bool(entry.get("historyRecommendation"))
        or bool(entry.get("entryEligibleOriginal"))
        or bool(entry.get("entryEligible"))
        or is_recommendation_status_label(entry.get("statusLabel"))
    ):
        cases.append("recommendation")
    return cases


def matches_mixed_recommendation_case(entry: dict[str, Any], case_key: str) -> bool:
    normalized = str(case_key or "").strip()
    if normalized == "all":
        return True
    return normalized in mixed_recommendation_cases(entry)


POLICY_DEFINITIONS: dict[str, dict[str, Any]] = {
    "reversal-a8plus-balanced": {
        "label": "반등 × 8&A+",
        "priority": 1,
        "strategyCase": "reversal",
        "recommendationCase": "a8plus",
        "stopPct": -2.0,
        "takeProfitStages": [
            {"targetPct": 8.0, "quantityPct": 40.0},
            {"targetPct": 15.0, "quantityPct": 60.0},
        ],
        "positionWeightHint": "normal",
        "reason": "고등급 반등 후보는 조기 일부익절 후 큰 반등 목표를 열어둡니다.",
    },
    "reversal-a7plus-balanced": {
        "label": "반등 × 7&A",
        "priority": 2,
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
    "pullback-a8plus-balanced": {
        "label": "눌림목 × 8&A+",
        "priority": 3,
        "strategyCase": "pullback",
        "recommendationCase": "a8plus",
        "stopPct": -2.0,
        "takeProfitStages": [
            {"targetPct": 5.0, "quantityPct": 50.0},
            {"targetPct": 12.0, "quantityPct": 50.0},
        ],
        "positionWeightHint": "normal",
        "reason": "고등급 눌림목은 기본 5% 익절 뒤 12% 보조 목표를 허용합니다.",
    },
    "pullback-a7plus-balanced": {
        "label": "눌림목 × 7&A",
        "priority": 3,
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
    "pullback-replay-balanced": {
        "label": "눌림목 × 전체(6&B+)",
        "priority": 4,
        "strategyCase": "pullback",
        "recommendationCase": "replay",
        "stopPct": -2.0,
        "takeProfitStages": [{"targetPct": 5.0, "quantityPct": 100.0}],
        "positionWeightHint": "small",
        "reason": "6&B+ 눌림목은 보조 후보로만 보고 5% 익절을 우선합니다.",
    },
    "reversal-replay-balanced": {
        "label": "반등 × 전체(6&B+)",
        "priority": 4,
        "strategyCase": "reversal",
        "recommendationCase": "replay",
        "stopPct": -2.0,
        "takeProfitStages": [{"targetPct": 15.0, "quantityPct": 100.0}],
        "positionWeightHint": "small",
        "reason": "6&B+ 반등은 보조 후보로만 보고 큰 반등 목표를 열어둡니다.",
    },
    "pullback-recommendation-balanced": {
        "label": "눌림목 × 매수추천",
        "priority": 5,
        "strategyCase": "pullback",
        "recommendationCase": "recommendation",
        "stopPct": -2.0,
        "takeProfitStages": [{"targetPct": 5.0, "quantityPct": 100.0}],
        "positionWeightHint": "small",
        "reason": "매수추천 라벨은 보조 가산점으로만 보고 5% 익절을 우선합니다.",
    },
}

POLICY_PRIORITY = (
    ("reversal", "a8plus", "reversal-a8plus-balanced"),
    ("reversal", "a7plus", "reversal-a7plus-balanced"),
    ("pullback", "a8plus", "pullback-a8plus-balanced"),
    ("pullback", "a7plus", "pullback-a7plus-balanced"),
    ("pullback", "replay", "pullback-replay-balanced"),
    ("reversal", "replay", "reversal-replay-balanced"),
    ("pullback", "recommendation", "pullback-recommendation-balanced"),
)


def mixed_exit_policy_key_for_cell(strategy: Any, case_key: Any) -> str:
    normalized_strategy = normalize_mixed_strategy(strategy)
    normalized_case = str(case_key or "").strip()
    for strategy_key, case_name, policy_key in POLICY_PRIORITY:
        if normalized_strategy == strategy_key and normalized_case == case_name:
            return policy_key
    if normalized_strategy in {"accumulation", "breakout"}:
        return f"observe-{normalized_strategy}"
    return "observe-unmatched"


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
            "takeProfitStages": [],
            "positionWeightHint": "observe",
            "reason": "현재 혼합 전략 기준에서는 자동 진입 대상이 아닙니다.",
        }
    return {
        "version": MIXED_EXIT_POLICY_VERSION,
        "policyKey": policy_key,
        "active": True,
        "stopExecution": "close",
        **definition,
    }


def select_mixed_exit_policy(entry: dict[str, Any], strategy: Any | None = None) -> dict[str, Any]:
    normalized_strategy = normalize_mixed_strategy(strategy if strategy is not None else entry.get("strategy"))
    if is_blocked_status_label(entry.get("statusLabel")):
        payload = _policy_payload(f"observe-{normalized_strategy or 'blocked'}")
        payload["reason"] = "매매금지 또는 시장 차단 상태라 혼합 전략도 관찰 전용으로 둡니다."
        return payload

    cases = mixed_recommendation_cases(entry)
    for strategy_key, case_key, policy_key in POLICY_PRIORITY:
        if normalized_strategy == strategy_key and case_key in cases:
            return _policy_payload(policy_key)

    return _policy_payload(mixed_exit_policy_key_for_cell(normalized_strategy, cases[0] if cases else ""))
