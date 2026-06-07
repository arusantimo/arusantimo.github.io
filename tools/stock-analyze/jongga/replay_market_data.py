from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any

from jongga.generate_latest import fetch_naver_price_history
from jongga.output_contract import compact_date

DAILY_FALLBACK_SOURCE = "daily_ohlc_fallback"
TICK_PROXY_SOURCE = "toss_ticks_proxy"
REPLAY_PRIMARY_TARGET_CUTOFF_TIME = "10:00:00+09:00"
REPLAY_SECONDARY_TARGET_CUTOFF_TIME = "15:00:00+09:00"
REPLAY_FINAL_STOP_CUTOFF_TIME = "15:00:00+09:00"
REPLAY_REQUIRED_FOLLOWUP_TRADING_DAYS = 1


@dataclass(frozen=True)
class ReplayBar:
    timestamp: str
    open: float
    high: float
    low: float
    close: float
    volume: float
    source: str
    phase: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def _parse_float(value: Any) -> float:
    text = str(value or "").replace(",", "").strip()
    if not text:
        return 0.0
    try:
        return float(text)
    except ValueError:
        return 0.0


def _normalize_daily_row(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "date": str(row.get("localTradedAt") or "")[:8],
        "open": _parse_float(row.get("openPrice")),
        "high": _parse_float(row.get("highPrice")),
        "low": _parse_float(row.get("lowPrice")),
        "close": _parse_float(row.get("closePrice")),
        "volume": _parse_float(row.get("accumulatedTradingVolume")),
        "source": "naver_daily_history",
    }


def normalize_history_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [_normalize_daily_row(row) for row in rows or []]


def find_daily_row(rows: list[dict[str, Any]], trade_date: str) -> dict[str, Any] | None:
    target = compact_date(trade_date) if "-" in trade_date else trade_date[:8]
    for row in normalize_history_rows(rows):
        if row["date"] == target:
            return row
    return None


def resolve_followup_trading_days(
    entry_date: str,
    rows: list[dict[str, Any]],
    *,
    min_days: int = REPLAY_REQUIRED_FOLLOWUP_TRADING_DAYS,
    max_days: int = 2,
) -> tuple[str, list[dict[str, Any]]]:
    target = compact_date(entry_date) if "-" in str(entry_date) else str(entry_date)[:8]
    normalized_rows = normalize_history_rows(rows)
    for index, row in enumerate(normalized_rows):
        if row["date"] != target:
            continue
        if index < min_days:
            return "pending", []
        available_days = min(max_days, index)
        followup = [normalized_rows[index - offset] for offset in range(1, available_days + 1)]
        return "resolved", followup
    return "no_data", []


def build_synthetic_minute_bars(
    first_day: dict[str, Any],
    second_day: dict[str, Any] | None = None,
    *,
    source: str = DAILY_FALLBACK_SOURCE,
) -> list[dict[str, Any]]:
    first_date = str(first_day.get("date") or "")
    first_open = float(first_day.get("open") or 0.0)
    first_high = float(first_day.get("high") or first_open)
    first_low = float(first_day.get("low") or first_open)
    first_close = float(first_day.get("close") or first_open)
    bars = [
        ReplayBar(
            timestamp=f"{first_date[:4]}-{first_date[4:6]}-{first_date[6:8]}T09:00:00+09:00",
            open=first_open,
            high=first_open,
            low=first_open,
            close=first_open,
            volume=0.0,
            source=source,
            phase="day1_open",
        ),
        ReplayBar(
            timestamp=f"{first_date[:4]}-{first_date[4:6]}-{first_date[6:8]}T{REPLAY_PRIMARY_TARGET_CUTOFF_TIME}",
            open=first_open,
            high=max(first_high, first_open),
            low=min(first_low, first_open),
            close=first_open,
            volume=0.0,
            source=source,
            phase="day1_morning_cutoff",
        ),
        ReplayBar(
            timestamp=f"{first_date[:4]}-{first_date[4:6]}-{first_date[6:8]}T{REPLAY_SECONDARY_TARGET_CUTOFF_TIME}",
            open=first_open,
            high=max(first_high, first_open, first_close),
            low=min(first_low, first_open, first_close),
            close=first_close,
            volume=0.0,
            source=source,
            phase="day1_session_cutoff",
        ),
    ]
    if second_day is not None:
        second_date = str(second_day.get("date") or "")
        second_open = float(second_day.get("open") or 0.0)
        second_high = float(second_day.get("high") or second_open)
        second_low = float(second_day.get("low") or second_open)
        second_close = float(second_day.get("close") or second_open)
        bars.extend(
            [
                ReplayBar(
                    timestamp=f"{second_date[:4]}-{second_date[4:6]}-{second_date[6:8]}T09:00:00+09:00",
                    open=second_open,
                    high=second_open,
                    low=second_open,
                    close=second_open,
                    volume=0.0,
                    source=source,
                    phase="day2_open",
                ),
                ReplayBar(
                    timestamp=f"{second_date[:4]}-{second_date[4:6]}-{second_date[6:8]}T{REPLAY_FINAL_STOP_CUTOFF_TIME}",
                    open=second_open,
                    high=max(second_high, second_open, second_close),
                    low=min(second_low, second_open, second_close),
                    close=second_close,
                    volume=0.0,
                    source=source,
                    phase="day2_final_cutoff",
                ),
            ]
        )
    return [bar.to_dict() for bar in bars]


def build_replay_market_data(
    *,
    code: str,
    entry_date: str,
    entry_price: float,
    history_rows: list[dict[str, Any]] | None = None,
    fetch_count: int = 40,
    bar_unit: str = "1m",
    tick_proxy_source: str | None = None,
) -> dict[str, Any]:
    if bar_unit != "1m":
        raise ValueError(f"unsupported bar unit: {bar_unit}")

    rows = history_rows if history_rows is not None else fetch_naver_price_history(code, count=fetch_count)
    normalized_rows = normalize_history_rows(rows)
    entry_row = find_daily_row(rows, entry_date)
    entry_close = float(entry_row.get("close") or 0.0) if entry_row else 0.0
    entry_ref = float(entry_price or entry_close or 0.0)
    entry_compact = compact_date(entry_date) if "-" in str(entry_date) else str(entry_date)[:8]

    status, followup_days = resolve_followup_trading_days(entry_date, rows)
    sources = [DAILY_FALLBACK_SOURCE]
    if tick_proxy_source:
        sources.append(tick_proxy_source)

    entry_bar = ReplayBar(
        timestamp=f"{entry_compact[:4]}-{entry_compact[4:6]}-{entry_compact[6:8]}T15:30:00+09:00",
        open=entry_ref,
        high=entry_ref,
        low=entry_ref,
        close=entry_ref,
        volume=0.0,
        source=DAILY_FALLBACK_SOURCE,
    ).to_dict()

    if status != "resolved" or len(followup_days) < REPLAY_REQUIRED_FOLLOWUP_TRADING_DAYS:
        quality_status = "pending" if status == "pending" else "missing"
        return {
            "code": code,
            "entryDate": entry_compact,
            "entryBar": entry_bar,
            "barUnit": bar_unit,
            "status": status,
            "nextTradingDate": None,
            "futureTradingDates": [],
            "nextDayOHLC": None,
            "futureDayOHLC": [],
            "replayBars": [],
            "historyRows": normalized_rows,
            "replaySchedule": {},
            "dataQuality": {
                "status": quality_status,
                "barUnit": bar_unit,
                "sources": sources,
                "reason": "required follow-up trading days unavailable",
            },
        }

    next_day = followup_days[0]
    final_day = followup_days[-1] if len(followup_days) > 1 else None
    replay_bars = build_synthetic_minute_bars(next_day, final_day)
    return {
        "code": code,
        "entryDate": entry_compact,
        "entryBar": entry_bar,
        "barUnit": bar_unit,
        "status": "resolved",
        "nextTradingDate": next_day["date"],
        "futureTradingDates": [str(item.get("date") or "") for item in followup_days],
        "nextDayOHLC": {key: float(next_day.get(key) or 0.0) for key in ("open", "high", "low", "close")},
        "futureDayOHLC": [
            {key: float(item.get(key) or 0.0) if key != "date" else str(item.get(key) or "") for key in ("date", "open", "high", "low", "close")}
            for item in followup_days
        ],
        "replayBars": replay_bars,
        "historyRows": normalized_rows,
        "replaySchedule": {
            "primaryTargetUntil": replay_bars[1]["timestamp"],
            "secondaryTargetFrom": replay_bars[1]["timestamp"],
            "secondaryTargetUntil": replay_bars[2]["timestamp"],
            "finalExitAt": replay_bars[-1]["timestamp"],
        },
        "dataQuality": {
            "status": "degraded",
            "barUnit": bar_unit,
            "sources": sources,
            "reason": "synthetic multi-session replay derived from daily OHLC" if final_day is not None else "synthetic one-day replay derived from daily OHLC",
        },
    }
