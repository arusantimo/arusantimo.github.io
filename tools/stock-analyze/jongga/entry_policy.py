"""진입 가능 여부와 차단 사유를 statusLabel·Gate·등급에서 분리해 계산합니다."""

from __future__ import annotations

from typing import Any

BUY_STATUS_MARKERS = (
    "강력매수",
    "매수추천",
    "최우선 진입",
    "진입 가능",
)


def _gate_blockers(rows: list[dict[str, Any]]) -> list[str]:
    blockers: list[str] = []
    for row in rows or []:
        if row.get("status") == "⛔":
            code = str(row.get("code") or "").strip() or "?"
            blockers.append(f"핵심 Gate 미충족: {code}")
    return blockers


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

    min_grades = {"S", "A"}
    grade_ok = grade_code in min_grades
    if not grade_ok and grade_code:
        blockers.append(f"등급 {grade_code} — 진입 최소 {', '.join(sorted(min_grades))}")

    buy_status = _is_buy_status_label(label)
    watch_status = _is_watch_status_label(label)

    entry_eligible = not blockers and grade_ok and buy_status
    entry_watch = not entry_eligible and not blockers and grade_code == "B" and watch_status

    return {
        "entryEligible": entry_eligible,
        "entryWatch": entry_watch,
        "entryBlockers": blockers,
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
