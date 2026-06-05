"""진입 가능 여부와 차단 사유를 statusLabel·Gate·등급에서 분리해 계산합니다."""

from __future__ import annotations

from typing import Any

BUY_STATUS_MARKERS = (
    "강력매수",
    "매수추천",
    "최우선 진입",
    "진입 가능",
)

# 거시 시장 차단 게이트 코드 (종목 셋업과 무관, 시장 상태가 바뀌면 해제됨)
MACRO_GATE_CODES = frozenset({"G5"})


def _entry_min_grades(strategy: str) -> set[str]:
    normalized = str(strategy or "").strip().lower()
    if normalized == "pullback":
        return {"S", "A", "B"}
    return {"S", "A"}


def _gate_blockers(rows: list[dict[str, Any]]) -> list[str]:
    blockers: list[str] = []
    for row in rows or []:
        if row.get("status") == "⛔":
            code = str(row.get("code") or "").strip() or "?"
            blockers.append(f"핵심 Gate 미충족: {code}")
    return blockers


def _classify_setup_quality(
    strategy: str,
    grade: str,
    gates: list[dict[str, Any]],
    filters: list[dict[str, Any]],
    entry_eligible: bool,
) -> str:
    """차단 엔트리를 '시장 보류'와 '셋업 미흡'으로 구분.

    - "eligible": 진입 가능 (차단 없음)
    - "market_hold": 셋업(등급·캔들·기술 게이트)은 양호하나 오직 거시 G5만 차단
    - "setup_weak": 셋업 자체에 문제 (등급 B↓ 또는 비거시 게이트 ⛔)
    """
    if entry_eligible:
        return "eligible"

    grade_code = str(grade or "").strip().upper()[:1]
    grade_ok = grade_code in _entry_min_grades(strategy)

    all_rows = list(gates or []) + list(filters or [])
    blocked_codes = {
        str(row.get("code") or "").strip()
        for row in all_rows
        if row.get("status") == "⛔"
    }

    # 차단 게이트가 모두 거시(G5)이고 등급도 양호한 경우만 market_hold
    if grade_ok and blocked_codes and blocked_codes.issubset(MACRO_GATE_CODES):
        return "market_hold"

    return "setup_weak"


def _is_buy_status_label(status_label: str) -> bool:
    label = str(status_label or "").strip()
    if not label or "매매금지" in label or label == "제외":
        return False
    return any(marker in label for marker in BUY_STATUS_MARKERS)


def _is_watch_status_label(status_label: str) -> bool:
    label = str(status_label or "").strip()
    return "관심후보" in label and "매매금지" not in label


def compute_entry_eligibility(
    strategy: str,
    grade: str,
    status_label: str,
    gates: list[dict[str, Any]] | None = None,
    filters: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    gate_rows = list(gates or [])
    filter_rows = list(filters or [])
    blockers = _gate_blockers(filter_rows) + _gate_blockers(gate_rows)

    label = str(status_label or "").strip()
    grade_code = str(grade or "").strip().upper()[:1]

    if "매매금지" in label:
        if not any("매매금지" in item for item in blockers):
            blockers.append(label)
    elif label == "제외":
        blockers.append("제외")

    min_grades = _entry_min_grades(strategy)
    grade_ok = grade_code in min_grades
    if not grade_ok and grade_code:
        blockers.append(f"등급 {grade_code} — 진입 최소 {', '.join(sorted(min_grades))}")

    buy_status = _is_buy_status_label(label)
    watch_status = _is_watch_status_label(label)

    conditional_pullback_b = strategy == "pullback" and grade_code == "B" and watch_status
    entry_eligible = not blockers and grade_ok and (buy_status or conditional_pullback_b)
    entry_watch = not entry_eligible and not blockers and grade_code == "B" and watch_status
    setup_quality = _classify_setup_quality(strategy, grade, gate_rows, filter_rows, entry_eligible)

    return {
        "entryEligible": entry_eligible,
        "entryWatch": entry_watch,
        "entryBlockers": blockers,
        "setupQuality": setup_quality,
    }


def attach_entry_eligibility(entry: dict[str, Any]) -> dict[str, Any]:
    strategy = str(entry.get("strategy") or "")
    eligibility = compute_entry_eligibility(
        strategy,
        str(entry.get("grade") or ""),
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
    )
    entry.update(eligibility)
    return entry
