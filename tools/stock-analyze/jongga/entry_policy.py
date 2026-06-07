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
            if code in MACRO_GATE_CODES:
                blockers.append(f"시장 Gate 차단: {code} — 신규 진입 보류")
            else:
                blockers.append(f"핵심 Gate 미충족: {code}")
    return blockers


def _blocked_rows(filters: list[dict[str, Any]], gates: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [row for row in list(filters or []) + list(gates or []) if row.get("status") == "⛔"]


def _safe_text(value: Any, fallback: str = "") -> str:
    text = str(value or "").strip()
    return text or fallback


def _score_to_float(text: Any) -> float:
    raw = str(text or "").replace("점", "").replace("+", "").strip()
    try:
        return float(raw)
    except (TypeError, ValueError):
        return 0.0


def _compact_indicator_name(name: str) -> str:
    mapping = {
        "NQ 선물 변화율": "NQ",
        "VIX 수준": "VIX",
        "미국 10년 금리 전일비": "미 10년물",
        "원달러 환율 변화": "원달러",
        "SOX 전일 변화율": "SOX",
    }
    text = _safe_text(name)
    return mapping.get(text, text)


def _format_gap_reason(gap_score: dict[str, Any] | None, *, short: bool) -> str:
    score = gap_score or {}
    code = _safe_text(score.get("code") or score.get("grade"))
    total_score = _safe_text(score.get("totalScore"))
    rows = list(score.get("rows") or [])
    negative_rows = sorted(
        (
            row for row in rows
            if _score_to_float(row.get("weightedScore")) < 0
        ),
        key=lambda row: _score_to_float(row.get("weightedScore")),
    )
    top_rows = negative_rows[:2 if short else 4]
    if top_rows:
        factors = ", ".join(
            f"{_compact_indicator_name(row.get('indicator'))} {_safe_text(row.get('actualValue'))}"
            for row in top_rows
        )
        if short:
            return f"갭 스코어 {code or 'G-E'} {total_score}: {factors}"
        return f"갭 스코어 {code or 'G-E'} ({total_score})로 신규 진입 금지입니다. {factors} 악화가 동시에 확인됐습니다."
    if short:
        return f"갭 스코어 {code or 'G-E'} {total_score}: 실시간 리스크 확대"
    return f"갭 스코어 {code or 'G-E'} ({total_score})로 신규 진입 금지입니다."


def _format_gate_reason(blocked_rows: list[dict[str, Any]], *, short: bool) -> str:
    if not blocked_rows:
        return ""
    primary = blocked_rows[0]
    code = _safe_text(primary.get("code"), "?")
    note = _safe_text(primary.get("note"), "세부 조건 미충족")
    extra_count = max(len(blocked_rows) - 1, 0)
    if short:
        suffix = f" · 외 {extra_count}건" if extra_count else ""
        return f"{code} 미충족: {note}{suffix}"
    parts = [
        f"{_safe_text(row.get('code'), '?')} 미충족: {_safe_text(row.get('note'), '세부 조건 미충족')}"
        for row in blocked_rows[:3]
    ]
    if len(blocked_rows) > 3:
        parts.append(f"외 {len(blocked_rows) - 3}건")
    return " / ".join(parts)


def build_status_reason(
    strategy: str,
    grade: str,
    status_label: str,
    gates: list[dict[str, Any]] | None = None,
    filters: list[dict[str, Any]] | None = None,
    gap_score: dict[str, Any] | None = None,
    *,
    short: bool = False,
) -> str:
    del strategy, grade  # status 설명은 현재 차단 상태와 근거가 핵심이다.
    label = _safe_text(status_label)
    gate_rows = list(gates or [])
    filter_rows = list(filters or [])
    blocked_rows = _blocked_rows(filter_rows, gate_rows)

    if "갭다운 경고" in label:
        return _format_gap_reason(gap_score, short=short)
    if "갭다운 주의" in label:
        reason = _format_gap_reason(gap_score, short=short)
        return reason.replace("금지", "보류", 1) if reason else "갭다운 리스크로 신규 진입을 보류합니다."
    if "핵심 Gate 미충족" in label or blocked_rows:
        return _format_gate_reason(blocked_rows, short=short)
    if "시장 Gate 차단" in label:
        market_row = next((row for row in blocked_rows if _safe_text(row.get("code")).upper() in MACRO_GATE_CODES), None)
        if market_row:
            return f"{_safe_text(market_row.get('code'), 'G5')} 경고: {_safe_text(market_row.get('note'), '시장 변동성 경고')}"
        return "시장 환경 경고로 신규 진입을 보류합니다."
    if "약세장" in label:
        return "적용 레짐이 약세장으로 판정돼 신규 진입을 보류합니다."
    if label == "제외":
        return "점수 또는 핵심 조건 우선순위가 낮아 제외됐습니다."
    return ""


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


def attach_entry_eligibility(entry: dict[str, Any], context: dict[str, Any] | None = None) -> dict[str, Any]:
    strategy = str(entry.get("strategy") or "")
    eligibility = compute_entry_eligibility(
        strategy,
        str(entry.get("grade") or ""),
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
    )
    entry.update(eligibility)
    gap_score = (context or {}).get("gapScore") if context else None
    entry["statusReasonShort"] = build_status_reason(
        strategy,
        str(entry.get("grade") or ""),
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
        gap_score,
        short=True,
    )
    entry["statusReason"] = build_status_reason(
        strategy,
        str(entry.get("grade") or ""),
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
        gap_score,
        short=False,
    )
    return entry
