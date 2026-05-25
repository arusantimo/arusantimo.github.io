from __future__ import annotations

from typing import Any


SENTIMENT_SOURCE_LIVE_AI = "live-ai"
SENTIMENT_SOURCE_MANUAL_CONFIRMED = "manual-confirmed"
SENTIMENT_SOURCE_SNAPSHOT_FALLBACK = "snapshot-fallback"
VALID_SENTIMENT_SOURCES = {
    SENTIMENT_SOURCE_LIVE_AI,
    SENTIMENT_SOURCE_MANUAL_CONFIRMED,
    SENTIMENT_SOURCE_SNAPSHOT_FALLBACK,
}
SENTIMENT_SOURCE_LABELS = {
    SENTIMENT_SOURCE_LIVE_AI: "AI추정",
    SENTIMENT_SOURCE_MANUAL_CONFIRMED: "수동 확정",
    SENTIMENT_SOURCE_SNAPSHOT_FALLBACK: "저장본",
}
SENTIMENT_SOURCE_MESSAGES = {
    SENTIMENT_SOURCE_LIVE_AI: "심리 입력은 종토방 AI 추정 최신값 사용",
    SENTIMENT_SOURCE_MANUAL_CONFIRMED: "심리 입력은 수동 확정값 사용",
    SENTIMENT_SOURCE_SNAPSHOT_FALLBACK: "심리 입력은 최근 저장본 사용",
}
SENTIMENT_SOURCE_STATUS_SOURCES = {
    SENTIMENT_SOURCE_LIVE_AI: "finance.naver.com/item/board.naver (AI)",
    SENTIMENT_SOURCE_MANUAL_CONFIRMED: "manual",
    SENTIMENT_SOURCE_SNAPSHOT_FALLBACK: "snapshot",
}


def normalize_sentiment_source(value: Any, *, has_sentiment: bool = False) -> str:
    raw = str(value or "").strip()
    if raw in VALID_SENTIMENT_SOURCES:
        return raw
    return SENTIMENT_SOURCE_SNAPSHOT_FALLBACK if has_sentiment else ""


def get_sentiment_source_label(value: Any, *, has_sentiment: bool = False) -> str:
    source = normalize_sentiment_source(value, has_sentiment=has_sentiment)
    return SENTIMENT_SOURCE_LABELS.get(source, "미확인")


def get_sentiment_source_message(value: Any, *, has_sentiment: bool = False) -> str:
    source = normalize_sentiment_source(value, has_sentiment=has_sentiment)
    return SENTIMENT_SOURCE_MESSAGES.get(source, "심리 입력 출처 미확인")


def get_sentiment_status_state(value: Any, *, has_sentiment: bool = False) -> str:
    source = normalize_sentiment_source(value, has_sentiment=has_sentiment)
    if source in {SENTIMENT_SOURCE_LIVE_AI, SENTIMENT_SOURCE_MANUAL_CONFIRMED}:
        return "ok"
    if source == SENTIMENT_SOURCE_SNAPSHOT_FALLBACK:
        return "partial"
    return "missing"


def get_sentiment_status_source(value: Any, *, has_sentiment: bool = False) -> str:
    source = normalize_sentiment_source(value, has_sentiment=has_sentiment)
    return SENTIMENT_SOURCE_STATUS_SOURCES.get(source, "manual")
