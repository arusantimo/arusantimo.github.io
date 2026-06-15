"""매수추천에서 제외할 블랙리스트 종목 판정.

수집 단계에서 각 후보 종목이 '공매도 과열' 또는 '투자 주의' 지정 대상인지 검증합니다.
1차 소스는 KRX/KIND 공식 공시이고, 토스 주문페이지 뱃지로 교차확인합니다.
검증에 실패하면(네트워크/봇차단 등) 종목을 제외하지 않고 'unconfirmed'(미확인)으로 기록합니다(fail-open).

판정 로직은 순수 함수로 두어 픽스처로 단위 테스트하고, 실제 수집(브라우저)은
generate_latest 에서 이 모듈의 detect_* 함수를 호출합니다.
"""
from __future__ import annotations

import re
from typing import Any, Iterable

REASON_SHORT_OVERHEAT = "공매도 과열"
REASON_CAUTION = "투자 주의"
BLACKLIST_REASONS = (REASON_SHORT_OVERHEAT, REASON_CAUTION)

STATUS_CONFIRMED = "confirmed"
STATUS_UNCONFIRMED = "unconfirmed"

# 수동 블랙리스트. 공시/토스로 못 잡는 종목을 직접 추가합니다.
#   "058470": [REASON_SHORT_OVERHEAT]
MANUAL_BLACKLIST: dict[str, list[str]] = {}

# KRX 시장경보·공매도 과열종목 지정 공시 제목 패턴 (KIND).
_KIND_SHORT_OVERHEAT_PATTERN = re.compile(r"공매도\s*과열\s*종목\s*지정")
_KIND_CAUTION_PATTERN = re.compile(r"투자\s*주의\s*종목\s*지정")

# 토스 주문페이지에 노출되는 뱃지 텍스트 패턴 (교차확인용).
_TOSS_SHORT_OVERHEAT_PATTERN = re.compile(r"공매도\s*과열")
_TOSS_CAUTION_PATTERN = re.compile(r"투자\s*주의")


def normalize_blacklist_code(code: Any) -> str:
    digits = re.sub(r"\D", "", str(code or ""))
    return digits if len(digits) == 6 else ""


def _dedupe_reasons(reasons: Iterable[str]) -> list[str]:
    ordered: list[str] = []
    for reason in reasons:
        if reason in BLACKLIST_REASONS and reason not in ordered:
            ordered.append(reason)
    return ordered


def detect_kind_blacklist_reasons(titles: Iterable[str]) -> list[str]:
    """KIND 공시 제목 목록에서 블랙리스트 사유를 추출합니다."""
    reasons: list[str] = []
    for title in titles:
        text = str(title or "")
        if _KIND_SHORT_OVERHEAT_PATTERN.search(text):
            reasons.append(REASON_SHORT_OVERHEAT)
        if _KIND_CAUTION_PATTERN.search(text):
            reasons.append(REASON_CAUTION)
    return _dedupe_reasons(reasons)


def detect_toss_blacklist_reasons(page_text: str) -> list[str]:
    """토스 주문페이지 렌더링 텍스트에서 블랙리스트 사유를 추출합니다."""
    text = str(page_text or "")
    reasons: list[str] = []
    if _TOSS_SHORT_OVERHEAT_PATTERN.search(text):
        reasons.append(REASON_SHORT_OVERHEAT)
    if _TOSS_CAUTION_PATTERN.search(text):
        reasons.append(REASON_CAUTION)
    return _dedupe_reasons(reasons)


def build_blacklist_record(
    code: Any,
    name: str = "",
    *,
    kind_reasons: Iterable[str] | None = None,
    toss_reasons: Iterable[str] | None = None,
    manual_reasons: Iterable[str] | None = None,
    kind_checked: bool = False,
    toss_checked: bool = False,
) -> dict[str, Any] | None:
    """한 종목의 블랙리스트 판정 결과를 만듭니다.

    - 사유가 하나라도 잡히면 status=confirmed (매수추천에서 제외 대상).
    - 사유가 없고 두 소스 모두 확인 실패면 status=unconfirmed (fail-open, 제외 안 함).
    - 사유가 없고 확인에 성공했으면(clean) None 을 반환해 기록을 남기지 않습니다.
    """
    normalized_code = normalize_blacklist_code(code)
    if not normalized_code:
        return None

    kind_list = _dedupe_reasons(kind_reasons or [])
    toss_list = _dedupe_reasons(toss_reasons or [])
    manual_list = _dedupe_reasons(manual_reasons or [])
    reasons = _dedupe_reasons([*kind_list, *toss_list, *manual_list])

    sources: list[str] = []
    if kind_list:
        sources.append("kind")
    if toss_list:
        sources.append("toss")
    if manual_list:
        sources.append("manual")

    if reasons:
        return {
            "code": normalized_code,
            "name": str(name or "").strip(),
            "reasons": reasons,
            "sources": sources,
            "status": STATUS_CONFIRMED,
        }

    if not kind_checked and not toss_checked and not manual_list:
        return {
            "code": normalized_code,
            "name": str(name or "").strip(),
            "reasons": [],
            "sources": [],
            "status": STATUS_UNCONFIRMED,
        }

    return None


def blacklisted_codes(records: Iterable[dict[str, Any]]) -> set[str]:
    """제외 대상(status=confirmed) 종목코드 집합."""
    codes: set[str] = set()
    for record in records or []:
        if not isinstance(record, dict):
            continue
        if record.get("status") == STATUS_CONFIRMED:
            normalized = normalize_blacklist_code(record.get("code"))
            if normalized:
                codes.add(normalized)
    return codes


def extract_blacklist_records(payload: dict[str, Any]) -> list[dict[str, Any]]:
    """payload 의 블랙리스트 기록을 정규화해 반환합니다."""
    raw = payload.get("blacklist") if isinstance(payload, dict) else None
    records: list[dict[str, Any]] = []
    for item in raw or []:
        if not isinstance(item, dict):
            continue
        normalized_code = normalize_blacklist_code(item.get("code"))
        if not normalized_code:
            continue
        records.append({
            "code": normalized_code,
            "name": str(item.get("name") or "").strip(),
            "reasons": _dedupe_reasons(item.get("reasons") or []),
            "sources": [str(source) for source in (item.get("sources") or [])],
            "status": str(item.get("status") or STATUS_CONFIRMED),
        })
    return records
