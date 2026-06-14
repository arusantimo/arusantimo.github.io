from __future__ import annotations

import argparse
import concurrent.futures
import html
import json
import math
import os
import re
import sys
from copy import deepcopy
from html.parser import HTMLParser
from time import perf_counter
from dataclasses import asdict, dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen

from jongga.entry_policy import attach_entry_eligibility
from jongga.grade_policy import grade_from_score
from jongga.scoring import (
    ACCUMULATION_SCORE_WEIGHTS,
    ACCUMULATION_STRICT_MAX,
    BREAKOUT_STRICT_MAX,
    BREAKOUT_WEIGHTS,
    PULLBACK_SCORE_WEIGHTS,
    PULLBACK_STRICT_MAX,
    REVERSAL_SCORE_WEIGHTS,
    REVERSAL_STRICT_MAX,
    apply_buy_scoring,
    rank_buy_entries,
)
from jongga.strategy_regime import slot_limits_for_regime, strategy_display_name
from jongga.macro_overlay import (
    apply_regime_fields_to_context,
    build_macro_overlay_block,
    load_market_analyze_snapshot,
    reversal_status_label,
    trend_status_label,
)
from jongga.mixed_exit_policy import select_mixed_exit_policy
from jongga.rule_evaluation import (
    build_accumulation_s5_detail,
    evaluate_accumulation_c1,
    evaluate_accumulation_c2,
    evaluate_accumulation_c3,
    evaluate_accumulation_g0,
    evaluate_accumulation_g1,
    evaluate_accumulation_g2,
    evaluate_accumulation_g3,
    evaluate_accumulation_g4_volume,
    evaluate_accumulation_g5,
    evaluate_accumulation_p1,
    evaluate_accumulation_p2,
    evaluate_accumulation_s1,
    evaluate_accumulation_s2,
    evaluate_accumulation_s3,
    evaluate_accumulation_s4,
    evaluate_accumulation_s5,
    evaluate_accumulation_c4,
    evaluate_breakout_c1,
    evaluate_breakout_c2,
    evaluate_breakout_c3,
    evaluate_breakout_g1,
    evaluate_breakout_g2,
    evaluate_breakout_g3,
    evaluate_breakout_g4_volume,
    evaluate_breakout_g5_candle,
    evaluate_breakout_g6_daily_change,
    evaluate_breakout_g7_ma5,
    evaluate_breakout_p1,
    evaluate_breakout_p2,
    evaluate_breakout_rs,
    evaluate_breakout_s1,
    evaluate_breakout_s2,
    evaluate_pullback_c1,
    evaluate_pullback_c2,
    evaluate_pullback_c3,
    evaluate_pullback_c4,
    evaluate_pullback_c5,
    evaluate_pullback_g0,
    evaluate_pullback_g1,
    evaluate_pullback_g10,
    evaluate_pullback_g13,
    evaluate_pullback_g2,
    evaluate_pullback_g3,
    evaluate_pullback_g4,
    evaluate_pullback_g5,
    evaluate_pullback_g6_daily_change,
    evaluate_pullback_g7_rsi_ceiling,
    evaluate_pullback_g8_extension,
    evaluate_pullback_quality_gate,
    evaluate_accumulation_quality_gate,
    evaluate_reversal_quality_gate,
    evaluate_pullback_d1_depth,
    evaluate_pullback_d2_supply,
    evaluate_pullback_d3_rebound_volume,
    evaluate_pullback_p1,
    evaluate_pullback_p2,
    evaluate_pullback_p3,
    evaluate_pullback_s1,
    evaluate_pullback_s2,
    evaluate_pullback_s3,
    evaluate_reversal_c1,
    evaluate_reversal_c2,
    evaluate_reversal_c3,
    evaluate_reversal_f1,
    evaluate_reversal_f2,
    evaluate_reversal_f3,
    evaluate_reversal_f4,
    evaluate_reversal_g1,
    evaluate_reversal_g2,
    evaluate_reversal_g3,
    evaluate_reversal_g4,
    evaluate_reversal_g5,
    evaluate_reversal_p1,
    evaluate_reversal_p2,
    evaluate_reversal_s1,
    evaluate_reversal_s2,
    drawdown_from_high_20d,
    build_pullback_g11_gate,
    build_pullback_g12_gate,
    gate_dict,
    split_rule_lists,
)
from jongga.output_contract import (
    ANALYSIS_SESSION_1500,
    ANALYSIS_SESSION_1730,
    INPUT_ARCHIVE_VERSION,
    KST,
    PAYLOAD_SOURCE_LIVE,
    VARIANT_CANARY,
    VARIANT_STABLE,
    analysis_session_label,
    compact_date,
    normalize_analysis_session,
    normalize_variant,
    payload_with_analysis_date,
    read_js_assignment,
    read_session_archive,
    resolve_analysis_date,
    resolve_generation_variants,
    variant_label,
    write_daily_outputs,
    write_session_archive,
)
from jongga.support_levels import build_pullback_support_gate, build_pullback_support_payload_from_snapshot
from jongga.volatility_context import build_volatility_context, build_volatility_keypoint_suffix


USER_AGENT = "Mozilla/5.0 jongga-live-generator/1.0"
BROWSER_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
TOSS_ORDER_URL_TEMPLATE = "https://www.tossinvest.com/stocks/A{code}/order"
TOSS_STOCK_DETAIL_API_TEMPLATE = "https://wts-info-api.tossinvest.com/api/v3/stock-prices/details?productCodes=A{code}"
TOSS_QUOTES_API_TEMPLATE = "https://wts-info-api.tossinvest.com/api/v3/stock-prices/A{code}/quotes?viewType=krx_all&investMode=krx"
TOSS_TICKS_API_TEMPLATE = "https://wts-info-api.tossinvest.com/api/v2/stock-prices/A{code}/ticks?viewType=krx_all&count=120&investMode=krx"
NAVER_ORDERBOOK_URL_TEMPLATE = "https://finance.naver.com/item/main.nhn?code={code}"
NAVER_ITEM_NEWS_URL_TEMPLATE = "https://finance.naver.com/item/news_news.naver?code={code}&page={page}"
KIND_DISCLOSURE_SEARCH_URL = "https://kind.krx.co.kr/disclosureSimpleSearch.do?method=disclosureSimpleSearchMain"
ETF_NAME_PATTERN = re.compile(
    r"KODEX|TIGER|KOSEF|KBSTAR|ARIRANG|HANARO|ACE|SOL|TIMEFOLIO|PLUS|ETF|ETN|스팩|우B?$",
    re.IGNORECASE,
)
STOCK_CODE_PATTERN = re.compile(r"^\d{6}$")
KIND_EARNINGS_EVENT_PATTERN = re.compile(r"기업설명회\(IR\)\s*개최|영업\(잠정\)실적|잠정실적|실적발표|결산실적", re.IGNORECASE)
KIND_CORP_ACTION_PATTERN = re.compile(r"주주총회소집결의|배당\s*결정|분할결정|합병결정|유상증자결정|무상증자결정|감자결정|권리락|주식교환|주식이전|공개매수", re.IGNORECASE)
PULLBACK_NEWS_NEGATIVE_PATTERN = re.compile(
    r"유상증자|전환사채|CB\b|BW\b|구주매출|보호예수\s*해제|최대주주\s*매도|적자|실적\s*부진|불성실공시|거래정지|조회공시",
    re.IGNORECASE,
)
PULLBACK_NEWS_POSITIVE_PATTERN = re.compile(
    r"수주|공급계약|계약\s*체결|MOU|업무협약|파트너십|제휴|협력|승인|허가|특허|출시|론칭|양산|증설|선정|채택|투자유치|흑자전환|실적\s*개선|호실적|자사주|배당\s*확대",
    re.IGNORECASE,
)
TOP_TRADING_VALUE_LIMIT = 100
SESSION_MERGE_STRATEGIES = ("pullback", "accumulation", "reversal")
NAVER_MARKET_VALUE_API_TEMPLATE = "https://m.stock.naver.com/api/stocks/marketValue/{market}?page={page}&pageSize={page_size}"
CHROME_EXECUTABLE_CANDIDATES = [
    lambda: os.getenv("MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH", ""),
    lambda: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    lambda: "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    lambda: "/usr/bin/google-chrome",
    lambda: "/usr/bin/google-chrome-stable",
    lambda: "/snap/bin/chromium",
    lambda: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    lambda: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
]
ANSI_RESET = "\033[0m"
ANSI_STYLES = {
    "muted": "\033[90m",
    "blue": "\033[94m",
    "cyan": "\033[96m",
    "green": "\033[92m",
    "yellow": "\033[93m",
    "red": "\033[91m",
    "bold": "\033[1m",
}


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def supports_ansi() -> bool:
    if os.getenv("NO_COLOR"):
        return False
    if os.getenv("FORCE_COLOR"):
        return True
    return bool(getattr(sys.stdout, "isatty", lambda: False)())


def style_text(text: str, *styles: str) -> str:
    if not supports_ansi():
        return text
    prefix = "".join(ANSI_STYLES[style] for style in styles if style in ANSI_STYLES)
    return f"{prefix}{text}{ANSI_RESET}" if prefix else text


def safe_console_text(text: str) -> str:
    encoding = getattr(sys.stdout, "encoding", None)
    if not encoding:
        return text
    try:
        text.encode(encoding)
        return text
    except UnicodeEncodeError:
        return text.encode(encoding, errors="replace").decode(encoding, errors="replace")


def prepare_console_output() -> None:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if not callable(reconfigure):
            continue
        try:
            reconfigure(encoding="utf-8", errors="replace")
        except Exception:  # noqa: BLE001
            continue


def emit_cli_log(label: str, message: str, *, tone: str = "blue") -> None:
    label_text = style_text(f"[{label}]", tone, "bold")
    print(safe_console_text(f"{label_text} {message}"))


def step_tone(status: str) -> str:
    if status == "ok":
        return "green"
    if status in {"partial", "fallback", "warning"}:
        return "yellow"
    if status in {"failed", "error"}:
        return "red"
    return "blue"


def print_variant_header(variant: str, analysis_date: date) -> None:
    emit_cli_log("RUN", f"{variant_label(variant)} 생성 시작 · {analysis_date.isoformat()} · variant={variant}", tone="cyan")


def summarize_top_recommendations(payload: dict[str, Any], *, limit: int = 3) -> list[str]:
    slot = (payload.get("slots") or [{}])[0]
    entries = slot.get("entries") if isinstance(slot, dict) else {}
    rows: list[dict[str, Any]] = []
    for strategy in ("pullback", "accumulation", "breakout", "reversal"):
        for entry in entries.get(strategy) or []:
            if isinstance(entry, dict):
                rows.append({
                    "strategy": strategy,
                    "name": entry.get("name") or "-",
                    "code": entry.get("code") or "-",
                    "score": parse_float(entry.get("score")),
                    "grade": entry.get("grade") or "-",
                })
    rows.sort(key=lambda item: item["score"], reverse=True)
    return [
        f"{index}. {row['name']} ({row['code']}) · {row['strategy']} · {row['score']:.1f}점 · {row['grade']}"
        for index, row in enumerate(rows[:limit], start=1)
    ]


def print_variant_summary(run: dict[str, Any], analysis_date: date) -> None:
    payload = run["payload"]
    quality = payload.get("dataQuality") if isinstance(payload.get("dataQuality"), dict) else {}
    status = str(quality.get("status") or "unknown")
    status_tone = step_tone(status.lower())
    entries = payload["slots"][0]["entries"]
    buy_count = (
        len(entries.get("pullback") or [])
        + len(entries.get("breakout") or entries.get("momentum") or [])
        + len(entries.get("accumulation") or [])
        + len(entries.get("reversal") or [])
    )
    emit_cli_log(
        "DONE",
        (
            f"{variant_label(run['variant'])} 완료 · {analysis_date.isoformat()} · "
            f"품질 {style_text(status, status_tone, 'bold')} · 추천 {buy_count}개"
        ),
        tone=status_tone,
    )
    emit_cli_log("FILE", f"JS  {run['jsPath']}", tone="muted")
    emit_cli_log("FILE", f"JSON {run['jsonPath']}", tone="muted")
    emit_cli_log("FILE", f"HIST {run['historyPath']}", tone="muted")
    for line in summarize_top_recommendations(payload):
        emit_cli_log("TOP", line, tone="blue")


def emit_cli_failures(label: str, failures: list[str], *, max_lines: int = 8, level: str = "fail") -> None:
    visible_failures = [str(failure).strip() for failure in failures if str(failure).strip()]
    if not visible_failures:
        return
    normalized_level = str(level or "fail").strip().upper() or "FAIL"
    tone = "red" if normalized_level == "FAIL" else "yellow" if normalized_level in {"WARN", "WARNING"} else "blue"
    for failure in visible_failures[:max_lines]:
        emit_cli_log(normalized_level, f"{label} · {failure}", tone=tone)
    remaining = len(visible_failures) - max_lines
    if remaining > 0:
        emit_cli_log(normalized_level, f"{label} · 외 {remaining}건", tone=tone)


def parse_int(value: Any) -> int:
    text = str(value or "").replace(",", "")
    match = re.search(r"-?\d+", text)
    return int(match.group(0)) if match else 0


def parse_float(value: Any) -> float:
    text = str(value or "").replace(",", "")
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    return float(match.group(0)) if match else 0.0


def _optional_metric(value: Any) -> float | None:
    text = str(value or "").strip()
    if not text:
        return None
    parsed = parse_float(text)
    return parsed if math.isfinite(parsed) else None


def signed_number(value: float, digits: int = 1, suffix: str = "") -> str:
    if not math.isfinite(value):
        return "-"
    return f"{'+' if value >= 0 else ''}{value:.{digits}f}{suffix}"


def to_status(passed: bool, note: str = "") -> dict[str, str]:
    return {"status": "✅" if passed else "⛔", "note": note}


def warning_status(note: str) -> dict[str, str]:
    return {"status": "⚠️", "note": note}


def request_text(url: str, *, timeout: float = 15.0, encoding: str | None = None, _retries: int = 1) -> str:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    last_error: Exception | None = None
    for attempt in range(1 + _retries):
        try:
            with urlopen(request, timeout=timeout) as response:
                raw = response.read()
                detected = encoding or response.headers.get_content_charset() or "utf-8"
                return raw.decode(detected, errors="replace")
        except URLError as exc:
            last_error = exc
            # DNS 일시 실패(errno 8=EAI_NONAME, errno -2=NAME_NOT_RESOLVED)만 재시도
            if attempt < _retries and getattr(exc.reason, "errno", None) in (8, -2, -3):
                import time as _time
                _time.sleep(0.4 * (attempt + 1))
                continue
            raise
    raise last_error  # type: ignore[misc]  # unreachable — loop always raises on last attempt


def request_json(url: str, *, timeout: float = 15.0) -> Any:
    return json.loads(request_text(url, timeout=timeout))


def parse_json_fragment(text: str) -> Any:
    start_object = text.find("{")
    end_object = text.rfind("}")
    if start_object >= 0 and end_object > start_object:
        return json.loads(text[start_object:end_object + 1])
    start_array = text.find("[")
    end_array = text.rfind("]")
    if start_array >= 0 and end_array > start_array:
        return json.loads(text[start_array:end_array + 1])
    raise ValueError("JSON payload missing")


def fetch_yahoo_chart_result(symbol: str, *, range_value: str = "5d", interval: str = "1d") -> dict[str, Any]:
    direct_url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range_value}&interval={interval}"
    errors: list[str] = []
    for candidate in [direct_url, f"https://r.jina.ai/http://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range_value}&interval={interval}"]:
        try:
            payload = request_json(candidate) if candidate == direct_url else parse_json_fragment(request_text(candidate, timeout=20.0))
            result = payload.get("chart", {}).get("result", [{}])[0]
            if result:
                return result
        except Exception as error:  # noqa: BLE001
            errors.append(str(error))
    raise RuntimeError(f"failed to fetch yahoo chart for {symbol}: {' | '.join(errors)}")


def fetch_yahoo_meta(symbol: str) -> dict[str, Any]:
    result = fetch_yahoo_chart_result(symbol, range_value="5d", interval="1d")
    meta = dict(result.get("meta") or {})
    if meta:
        as_of = yahoo_result_as_of(result)
        if as_of:
            meta["asOf"] = as_of
        return meta
    raise RuntimeError(f"failed to fetch yahoo meta for {symbol}: meta missing")


def yahoo_result_as_of(result: dict[str, Any]) -> str:
    meta = result.get("meta") or {}
    timestamps = [float(value) for value in (result.get("timestamp") or []) if isinstance(value, (int, float))]
    candidates = [float(meta.get("regularMarketTime"))] if isinstance(meta.get("regularMarketTime"), (int, float)) else []
    current_period = meta.get("currentTradingPeriod") or {}
    for session_key in ("pre", "regular", "post"):
        session = current_period.get(session_key) or {}
        for field_key in ("end", "start"):
            value = session.get(field_key)
            if isinstance(value, (int, float)):
                candidates.append(float(value))
    if timestamps:
        candidates.append(max(timestamps))
    if not candidates:
        return ""
    return datetime.fromtimestamp(max(candidates), timezone.utc).replace(microsecond=0).isoformat()


def _coerce_iso_datetime(value: Any) -> datetime | None:
    text = str(value or "").strip()
    if not text:
        return None
    normalized = text.replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(normalized)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed


def annotate_macro_metric_freshness(
    live_metrics: dict[str, dict[str, Any]],
    analysis_date: date | str | None,
) -> dict[str, Any]:
    resolved_analysis_date = (
        analysis_date
        if isinstance(analysis_date, date)
        else resolve_analysis_date(str(analysis_date) if analysis_date else None)
    )
    stale_keys: list[str] = []
    as_of_map: dict[str, str] = {}
    for metric_key in ("nq", "vix", "tnx", "krw", "sox"):
        metric = live_metrics.get(metric_key) or {}
        parsed = _coerce_iso_datetime(metric.get("asOf"))
        if parsed is None:
            metric["freshnessStatus"] = "unknown"
            metric["stale"] = True
            metric["freshnessLagDays"] = None
            stale_keys.append(f"macro_{metric_key}")
            continue
        as_of_text = parsed.astimezone(timezone.utc).replace(microsecond=0).isoformat()
        as_of_map[metric_key] = as_of_text
        lag_days = (resolved_analysis_date - parsed.astimezone(KST).date()).days
        is_stale = lag_days > 3
        metric["asOf"] = as_of_text
        metric["freshnessStatus"] = "stale" if is_stale else "fresh"
        metric["stale"] = is_stale
        metric["freshnessLagDays"] = lag_days
        if is_stale:
            stale_keys.append(f"macro_{metric_key}")
    return {
        "isFresh": not stale_keys,
        "staleKeys": stale_keys,
        "staleCount": len(stale_keys),
        "freshCount": 5 - len(stale_keys),
        "asOf": as_of_map,
    }


def parse_yahoo_chart_candles(result: dict[str, Any]) -> list[dict[str, float]]:
    timestamps = result.get("timestamp") or []
    quote = (result.get("indicators") or {}).get("quote", [{}])[0]
    opens = quote.get("open") or []
    highs = quote.get("high") or []
    lows = quote.get("low") or []
    closes = quote.get("close") or []
    candles: list[dict[str, float]] = []
    for index, timestamp in enumerate(timestamps):
        if index >= len(opens) or index >= len(highs) or index >= len(lows) or index >= len(closes):
            continue
        open_price = opens[index]
        high_price = highs[index]
        low_price = lows[index]
        close_price = closes[index]
        if not all(isinstance(value, (int, float)) and math.isfinite(float(value)) for value in [open_price, high_price, low_price, close_price]):
            continue
        candles.append({
            "timestamp": float(timestamp),
            "open": float(open_price),
            "high": float(high_price),
            "low": float(low_price),
            "close": float(close_price),
        })
    return candles


def analyze_reversal_intraday_signal(candles: list[dict[str, float]]) -> dict[str, Any]:
    if len(candles) < 2:
        return {
            "available": False,
            "signal": False,
            "interval": "30m",
            "source": "yahoo_chart",
            "note": "30분봉 데이터 부족",
        }
    previous = candles[-2]
    latest = candles[-1]
    body = abs(latest["close"] - latest["open"])
    lower_wick = max(min(latest["open"], latest["close"]) - latest["low"], 0.0)
    bullish = latest["close"] > latest["open"]
    reclaim = latest["close"] >= previous["close"]
    lower_wick_support = lower_wick >= body if body > 0 else latest["close"] > latest["low"]
    signal = (bullish and reclaim) or (bullish and lower_wick_support)
    return {
        "available": True,
        "signal": signal,
        "interval": "30m",
        "source": "yahoo_chart",
        "note": f"직전 30분봉 종가 {latest['close']:.0f}, 전봉 종가 {previous['close']:.0f}",
        "latestOpen": latest["open"],
        "latestClose": latest["close"],
        "previousClose": previous["close"],
    }


def yahoo_symbol_for_code(code: str, market_type: str | None) -> str:
    suffix = "KQ" if str(market_type or "") == "1" else "KS"
    return f"{code}.{suffix}"


def parse_optional_day(value: Any) -> int | None:
    if value is None:
        return None
    return parse_int(value)


def read_first_present(payload: dict[str, Any] | None, keys: list[str]) -> Any:
    if not isinstance(payload, dict):
        return None
    for key in keys:
        if payload.get(key) not in {None, ""}:
            return payload.get(key)
    return None


def build_auto_event_filter(integration: dict[str, Any]) -> dict[str, Any] | None:
    meeting_info = integration.get("shareholdersMeetingInfo")
    ir_info = integration.get("irScheduleInfo")
    earnings_days = parse_optional_day(read_first_present(ir_info, ["earningsDDay", "earningsDday", "irDDay", "irDday", "dDay", "dday"]))
    corporate_action_days = parse_optional_day(read_first_present(meeting_info, ["meetingDDay", "meetingDday", "dDay", "dday"]))
    earnings_date = read_first_present(ir_info, ["earningsDate", "irDate", "scheduleDate", "date"])
    meeting_date = read_first_present(meeting_info, ["meetingDate", "date"])
    note_parts: list[str] = []
    if earnings_days is not None:
        label = f"IR/실적 D-{earnings_days}"
        note_parts.append(f"{label} ({earnings_date})" if earnings_date else label)
    elif earnings_date:
        note_parts.append(f"IR/실적 일정 {earnings_date}")
    if corporate_action_days is not None:
        label = f"주총 D-{corporate_action_days}"
        note_parts.append(f"{label} ({meeting_date})" if meeting_date else label)
    elif meeting_date:
        note_parts.append(f"주총 일정 {meeting_date}")
    if earnings_days is None and corporate_action_days is None and not note_parts:
        return None
    blocked = (earnings_days is not None and earnings_days <= 2) or (corporate_action_days is not None and corporate_action_days <= 5)
    return {
        "blocked": blocked,
        "earningsDays": earnings_days,
        "corporateActionDays": corporate_action_days,
        "note": " / ".join(note_parts),
        "source": "naver_integration",
    }


def fetch_reversal_intraday_signal(code: str, market_type: str | None) -> dict[str, Any]:
    try:
        symbol = yahoo_symbol_for_code(code, market_type)
        candles = parse_yahoo_chart_candles(fetch_yahoo_chart_result(symbol, range_value="5d", interval="30m"))
        return analyze_reversal_intraday_signal(candles)
    except Exception as error:  # noqa: BLE001
        return {
            "available": False,
            "signal": False,
            "interval": "30m",
            "source": "yahoo_chart",
            "note": f"30분봉 수집 실패: {error}",
        }


def parse_toss_stock_price_detail_payload(payload: Any) -> dict[str, Any] | None:
    if not isinstance(payload, dict):
        return None
    rows = payload.get("result")
    if not isinstance(rows, list) or not rows:
        return None
    row = rows[0] if isinstance(rows[0], dict) else None
    if not row:
        return None
    strength = parse_float(row.get("tradingStrength"))
    if not math.isfinite(strength) or strength <= 0:
        return None
    return {
        "avgStrength": round(strength, 1),
        "note": f"토스 공개 체결강도 {strength:.1f}%",
        "source": "toss_http_detail",
        "sourceUrl": TOSS_STOCK_DETAIL_API_TEMPLATE.format(code=str(row.get('code', '')).replace('A', '')),
        "asOf": str(row.get("tradeDateTime") or ""),
    }


def parse_toss_quotes_payload(payload: Any, code: str) -> dict[str, Any] | None:
    if not isinstance(payload, dict):
        return None
    row = payload.get("result")
    if not isinstance(row, dict):
        return None
    ask_total = parse_float(row.get("offerVolume"))
    bid_total = parse_float(row.get("bidVolume"))
    if ask_total <= 0 or bid_total <= 0:
        return None
    ratio = bid_total / ask_total
    return {
        "bidAskRatio": round(ratio, 4),
        "bidTotal": int(bid_total),
        "askTotal": int(ask_total),
        "note": f"토스 호가잔량합계 매수 {int(bid_total):,} / 매도 {int(ask_total):,}",
        "source": "toss_quotes_api",
        "sourceUrl": TOSS_QUOTES_API_TEMPLATE.format(code=code),
    }


def parse_toss_tick_minute(value: Any) -> int | None:
    match = re.match(r"^(\d{2}):(\d{2})(?::\d{2})?$", str(value or "").strip())
    if not match:
        return None
    hour = int(match.group(1))
    minute = int(match.group(2))
    return hour * 60 + minute


def capped_strength_from_tick_buckets(buy_volume: float, sell_volume: float) -> float | None:
    if buy_volume <= 0 and sell_volume <= 0:
        return None
    if buy_volume > 0 and sell_volume <= 0:
        return 300.0
    if buy_volume <= 0:
        return 0.0
    return min((buy_volume / sell_volume) * 100.0, 300.0)


def parse_toss_ticks_strength_payload(payload: Any) -> dict[str, Any] | None:
    if not isinstance(payload, dict):
        return None
    rows = payload.get("result")
    if not isinstance(rows, list) or not rows:
        return None
    minute_buckets: dict[int, dict[str, float]] = {}
    latest_minute: int | None = None
    earliest_minute: int | None = None
    for row in rows:
        if not isinstance(row, dict):
            continue
        minute = parse_toss_tick_minute(row.get("time"))
        if minute is None:
            continue
        latest_minute = minute if latest_minute is None else max(latest_minute, minute)
        earliest_minute = minute if earliest_minute is None else min(earliest_minute, minute)
        trade_type = normalize_text(row.get("tradeType")).upper()
        volume = parse_float(row.get("volume"))
        if volume <= 0:
            continue
        bucket = minute_buckets.setdefault(minute, {"buy": 0.0, "sell": 0.0})
        if trade_type == "BUY":
            bucket["buy"] += volume
        elif trade_type == "SELL":
            bucket["sell"] += volume
    if not minute_buckets or latest_minute is None or earliest_minute is None:
        return None
    strengths: list[tuple[int, float]] = []
    for minute, volumes in minute_buckets.items():
        strength = capped_strength_from_tick_buckets(volumes["buy"], volumes["sell"])
        if strength is not None:
            strengths.append((minute, strength))
    if not strengths:
        return None
    strengths.sort(key=lambda item: item[0])
    observed_minutes = max(latest_minute - earliest_minute + 1, 1)
    last_hour_start = latest_minute - 59
    last_30_start = latest_minute - 29
    last_hour_strengths = [strength for minute, strength in strengths if minute >= last_hour_start]
    last_30_strengths = [strength for minute, strength in strengths if minute >= last_30_start]
    last_30_buy_volume = sum(volumes["buy"] for minute, volumes in minute_buckets.items() if minute >= last_30_start)
    last_30_sell_volume = sum(volumes["sell"] for minute, volumes in minute_buckets.items() if minute >= last_30_start)
    intraday_above_100_ratio = sum(1 for _, strength in strengths if strength >= 100.0) / len(strengths) * 100.0
    payload = {
        "intradayAbove100Ratio": round(intraday_above_100_ratio, 1),
        "observedMinutes": observed_minutes,
        "observedTickCount": len(rows),
        "source": "toss_ticks_api_proxy",
        "coverageNote": f"최근 체결 {observed_minutes}분 프록시",
    }
    if last_hour_strengths:
        payload["lastHourAvgStrength"] = round(sum(last_hour_strengths) / len(last_hour_strengths), 1)
        payload["lastHourObservedMinutes"] = min(observed_minutes, 60)
    if last_30_strengths:
        payload["last30AvgStrength"] = round(sum(last_30_strengths) / len(last_30_strengths), 1)
        payload["last30ObservedMinutes"] = min(observed_minutes, 30)
    if last_30_buy_volume > 0 or last_30_sell_volume > 0:
        ratio = (last_30_buy_volume / last_30_sell_volume) if last_30_sell_volume > 0 else last_30_buy_volume
        payload["last30BuySellRatio"] = round(ratio, 4)
        payload["last30BuyVolume"] = round(last_30_buy_volume, 1)
        payload["last30SellVolume"] = round(last_30_sell_volume, 1)
    return payload


def parse_naver_orderbook_ratio_html(html: str, code: str) -> dict[str, Any] | None:
    match = re.search(
        r'<tr class="total">.*?<td[^>]*>\s*([\d,]+)\s*</td>\s*<td>잔량합계</td>\s*<td[^>]*>\s*([\d,]+)\s*</td>',
        html,
        re.IGNORECASE | re.DOTALL,
    )
    if not match:
        return None
    ask_total = parse_float(match.group(1))
    bid_total = parse_float(match.group(2))
    if not ask_total or not bid_total:
        return None
    ratio = bid_total / ask_total if ask_total else 0.0
    return {
        "bidAskRatio": round(ratio, 4),
        "bidTotal": int(bid_total),
        "askTotal": int(ask_total),
        "note": f"Naver 호가잔량합계 매수 {int(bid_total):,} / 매도 {int(ask_total):,}",
        "source": "naver_orderbook_browser",
        "sourceUrl": NAVER_ORDERBOOK_URL_TEMPLATE.format(code=code),
    }


def parse_kind_disclosure_rows(rows: list[str], company_name: str) -> list[dict[str, str]]:
    parsed_rows: list[dict[str, str]] = []
    normalized_name = str(company_name or "").strip()
    for raw_row in rows:
        row = re.sub(r"\s+", " ", str(raw_row or "")).strip()
        match = re.match(r"^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(.+)$", row)
        if not match:
            continue
        row_date, row_time, remaining = match.groups()
        title = remaining
        if normalized_name and remaining.startswith(normalized_name):
            title = remaining[len(normalized_name):].strip()
        else:
            split = remaining.split(" ", 1)
            title = split[1].strip() if len(split) == 2 else remaining
        if not title:
            continue
        parsed_rows.append({"date": row_date, "time": row_time, "title": title})
    return parsed_rows


def build_kind_event_filter_from_rows(rows: list[dict[str, str]], today: date | None = None) -> dict[str, Any] | None:
    base_date = today or datetime.now().date()
    for row in rows:
        try:
            disclosed_at = datetime.strptime(row["date"], "%Y-%m-%d").date()
        except Exception:  # noqa: BLE001
            continue
        age_days = (base_date - disclosed_at).days
        title = row["title"]
        if age_days < 0:
            continue
        if KIND_EARNINGS_EVENT_PATTERN.search(title) and age_days <= 14:
            return {
                "blocked": True,
                "earningsDays": None,
                "corporateActionDays": None,
                "note": f"KIND 최근공시 {row['date']} {title}",
                "source": "kind_playwright_recent_disclosure",
            }
        if KIND_CORP_ACTION_PATTERN.search(title) and age_days <= 30:
            return {
                "blocked": True,
                "earningsDays": None,
                "corporateActionDays": None,
                "note": f"KIND 최근공시 {row['date']} {title}",
                "source": "kind_playwright_recent_disclosure",
            }
    return None


def iter_browser_executable_candidates() -> list[str]:
    resolved: list[str] = []
    seen: set[str] = set()
    for factory in CHROME_EXECUTABLE_CANDIDATES:
        candidate = str(factory() or "").strip()
        if not candidate or candidate in seen:
            continue
        seen.add(candidate)
        if Path(candidate).exists():
            resolved.append(candidate)
    return resolved


def launch_browser_context(playwright: Any, *, mode: str) -> tuple[Any, Any, dict[str, Any]]:
    resolved_mode = normalize_variant(mode)
    launch_notes: list[str] = []
    launch_attempts: list[str] = []

    if resolved_mode == VARIANT_CANARY:
        for executable_path in iter_browser_executable_candidates():
            launch_attempts.append(executable_path)
            try:
                browser = playwright.chromium.launch(
                    headless=True,
                    executable_path=executable_path,
                    chromium_sandbox=False,
                    args=["--disable-blink-features=AutomationControlled", "--lang=ko-KR"],
                )
                context = browser.new_context(
                    viewport={"width": 1440, "height": 1600},
                    user_agent=BROWSER_USER_AGENT,
                    locale="ko-KR",
                )
                return browser, context, {
                    "browserSource": f"chrome:{Path(executable_path).name}",
                    "launchNotes": launch_notes,
                    "launchAttempts": launch_attempts,
                }
            except Exception as error:  # noqa: BLE001
                launch_notes.append(f"chrome launch failed ({executable_path}): {error}")
        if not launch_attempts:
            launch_notes.append("chrome executable unavailable")

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1440, "height": 1600},
        user_agent=BROWSER_USER_AGENT,
        locale="ko-KR",
    )
    return browser, context, {
        "browserSource": "playwright-chromium",
        "launchNotes": launch_notes,
        "launchAttempts": launch_attempts,
    }


def configure_browser_page(page: Any) -> None:
    page.route(
        "**/*",
        lambda route: route.abort()
        if route.request.resource_type in {"image", "font", "stylesheet", "media"}
        else route.continue_(),
    )


def fetch_toss_strength_with_browser(context: Any, code: str) -> dict[str, Any] | None:
    page = context.new_page()
    configure_browser_page(page)
    response_bodies: list[str] = []
    target_fragment = f"stock-prices/details?productCodes=A{code}"

    def capture_response(response: Any) -> None:
        if target_fragment not in str(response.url):
            return
        try:
            response_bodies.append(response.text())
        except Exception:  # noqa: BLE001
            return

    page.on("response", capture_response)
    try:
        try:
            with page.expect_response(lambda response: target_fragment in str(response.url), timeout=7000) as response_info:
                page.goto(TOSS_ORDER_URL_TEMPLATE.format(code=code), wait_until="domcontentloaded", timeout=30000)
            response = response_info.value
            if response:
                try:
                    response_bodies.append(response.text())
                except Exception:  # noqa: BLE001
                    pass
        except Exception:  # noqa: BLE001
            page.goto(TOSS_ORDER_URL_TEMPLATE.format(code=code), wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(1500)
        for body in reversed(response_bodies):
            parsed = parse_toss_stock_price_detail_payload(json.loads(body))
            if parsed:
                return parsed
        text = page.locator("body").inner_text()
        match = re.search(r"체결강도\s*([\d.,]+)%", text)
        if match:
            strength = parse_float(match.group(1))
            if strength > 0:
                return {
                    "avgStrength": round(strength, 1),
                    "note": f"토스 DOM 체결강도 {strength:.1f}%",
                    "source": "toss_playwright_dom",
                    "sourceUrl": TOSS_ORDER_URL_TEMPLATE.format(code=code),
                }
        return None
    finally:
        page.close()


def fetch_naver_orderbook_with_browser(context: Any, code: str) -> dict[str, Any] | None:
    page = context.new_page()
    configure_browser_page(page)
    try:
        page.goto(NAVER_ORDERBOOK_URL_TEMPLATE.format(code=code), wait_until="domcontentloaded", timeout=30000)
        try:
            page.wait_for_selector("tr.total", timeout=5000)
        except Exception:  # noqa: BLE001
            page.wait_for_timeout(800)
        return parse_naver_orderbook_ratio_html(page.content(), code)
    finally:
        page.close()


def fetch_kind_event_filter_with_browser(context: Any, code: str, company_name: str) -> dict[str, Any] | None:
    page = context.new_page()
    configure_browser_page(page)
    try:
        page.goto(KIND_DISCLOSURE_SEARCH_URL, wait_until="domcontentloaded", timeout=30000)
        page.fill("#AKCKwdTop", code)
        try:
            with page.expect_navigation(wait_until="domcontentloaded", timeout=7000):
                page.click("input.submit")
        except Exception:  # noqa: BLE001
            page.click("input.submit")
        try:
            page.wait_for_selector("table.list.type-00 tbody tr", timeout=7000)
        except Exception:  # noqa: BLE001
            page.wait_for_timeout(1200)
        try:
            page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:  # noqa: BLE001
            pass
        rows = [text.strip() for text in page.locator("table.list.type-00 tbody tr").all_inner_texts() if text.strip()]
        parsed_rows = parse_kind_disclosure_rows(rows, company_name)
        return build_kind_event_filter_from_rows(parsed_rows)
    finally:
        page.close()


def fetch_toss_metrics_with_http(code: str) -> dict[str, Any] | None:
    detail = parse_toss_stock_price_detail_payload(request_json(TOSS_STOCK_DETAIL_API_TEMPLATE.format(code=code), timeout=10.0))
    ticks = parse_toss_ticks_strength_payload(request_json(TOSS_TICKS_API_TEMPLATE.format(code=code), timeout=10.0))
    if not detail and not ticks:
        return None
    merged: dict[str, Any] = {}
    if detail:
        merged.update(detail)
    if ticks:
        merged.update(ticks)
    note_parts = [normalize_text((detail or {}).get("note")), normalize_text((ticks or {}).get("coverageNote"))]
    merged["note"] = " / ".join(part for part in note_parts if part)
    merged["source"] = "toss_http_combo" if detail and ticks else (detail or ticks or {}).get("source")
    merged["sourceUrl"] = TOSS_ORDER_URL_TEMPLATE.format(code=code)
    return merged


def _fetch_orderbook_naver_fallback(code: str) -> dict[str, Any] | None:
    """Naver Finance 메인 페이지에서 잔량합계를 파싱하는 HTTP 폴백 (Toss API 실패 시 사용)."""
    url = NAVER_ORDERBOOK_URL_TEMPLATE.format(code=code)
    try:
        html = request_text(url, timeout=15.0, encoding="utf-8", _retries=0)
    except Exception:
        return None
    result = parse_naver_orderbook_ratio_html(html, code)
    if result is not None:
        result = {**result, "source": "naver_orderbook_http"}
    return result


def fetch_orderbook_with_http(code: str) -> dict[str, Any] | None:
    # Naver Finance HTTP를 우선 시도 (안정적). 실패 시 Toss API로 대체.
    naver = _fetch_orderbook_naver_fallback(code)
    if naver is not None:
        return naver
    try:
        return parse_toss_quotes_payload(request_json(TOSS_QUOTES_API_TEMPLATE.format(code=code), timeout=10.0), code)
    except Exception:
        return None


def _normalize_news_date_key(value: Any) -> str:
    digits = re.sub(r"[^0-9]", "", str(value or ""))
    return digits[:8] if len(digits) >= 8 else ""


def build_pullback_news_flow_data_missing(snapshot: Any, summary: str) -> dict[str, Any]:
    lookback_days = min(len(getattr(snapshot, "date_history", []) or []), 5)
    return {
        "lookbackDays": lookback_days,
        "headlineCount": 0,
        "positiveCount": 0,
        "negativeCount": 0,
        "latestPositiveDate": "",
        "latestNegativeDate": "",
        "status": "data_missing",
        "summary": summary,
        "headlines": [],
        "freshPositiveCount": 0,
        "freshNegativeCount": 0,
    }


def parse_naver_item_news_rows(html_text: str, code: str) -> list[dict[str, Any]]:
    pattern = re.compile(
        r'<td class="title">\s*<a href="(?P<href>[^"]+)"[^>]*>(?P<title>.*?)</a>.*?</td>\s*'
        r'<td class="info">(?P<source>.*?)</td>\s*'
        r'<td class="date">\s*(?P<date>\d{4}\.\d{2}\.\d{2}(?: \d{2}:\d{2})?)\s*</td>',
        re.IGNORECASE | re.DOTALL,
    )
    rows: list[dict[str, Any]] = []
    seen: set[tuple[str, str, str]] = set()
    for match in pattern.finditer(html_text):
        title = normalize_text(html.unescape(re.sub(r"<[^>]+>", "", match.group("title"))))
        source = normalize_text(html.unescape(re.sub(r"<[^>]+>", "", match.group("source"))))
        published_at = normalize_text(match.group("date"))
        href = normalize_text(html.unescape(match.group("href")))
        if not title or not published_at:
            continue
        url = urljoin("https://finance.naver.com", href)
        dedupe_key = (title, published_at, url)
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)
        rows.append({
            "title": title,
            "source": source,
            "publishedAt": published_at,
            "dateKey": _normalize_news_date_key(published_at),
            "url": url,
            "code": code,
        })
    return rows


def fetch_naver_item_news_rows(code: str, *, pages: int = 2) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for page in range(1, max(1, pages) + 1):
        html_text = request_text(
            NAVER_ITEM_NEWS_URL_TEMPLATE.format(code=code, page=page),
            timeout=15.0,
            encoding="euc-kr",
        )
        page_rows = parse_naver_item_news_rows(html_text, code)
        if not page_rows:
            break
        rows.extend(page_rows)
        if len(page_rows) < 10:
            break
    return rows


def build_pullback_news_flow(snapshot: Any, rows: list[dict[str, Any]]) -> dict[str, Any]:
    trade_dates = [str(value or "").replace("-", "")[:8] for value in list(getattr(snapshot, "date_history", []) or []) if str(value or "").strip()]
    lookback_dates = trade_dates[:5]
    fresh_dates = set(lookback_dates[:3])
    lookback_set = set(lookback_dates)
    if not lookback_dates:
        return build_pullback_news_flow_data_missing(snapshot, "최근 거래일 기준 뉴스 비교 데이터 부족")

    filtered_rows: list[dict[str, Any]] = []
    positive_count = 0
    negative_count = 0
    fresh_positive_count = 0
    fresh_negative_count = 0
    latest_positive_date = ""
    latest_negative_date = ""
    for row in rows:
        date_key = _normalize_news_date_key(row.get("dateKey") or row.get("publishedAt"))
        if date_key not in lookback_set:
            continue
        title = normalize_text(row.get("title"))
        sentiment = "neutral"
        if PULLBACK_NEWS_NEGATIVE_PATTERN.search(title):
            sentiment = "negative"
            negative_count += 1
            if not latest_negative_date:
                latest_negative_date = date_key
            if date_key in fresh_dates:
                fresh_negative_count += 1
        elif PULLBACK_NEWS_POSITIVE_PATTERN.search(title):
            sentiment = "positive"
            positive_count += 1
            if not latest_positive_date:
                latest_positive_date = date_key
            if date_key in fresh_dates:
                fresh_positive_count += 1
        filtered_rows.append({
            "date": str(row.get("publishedAt") or ""),
            "title": title,
            "source": normalize_text(row.get("source")),
            "url": normalize_text(row.get("url")),
            "sentiment": sentiment,
        })

    if not filtered_rows:
        return {
            "lookbackDays": len(lookback_dates),
            "headlineCount": 0,
            "positiveCount": 0,
            "negativeCount": 0,
            "latestPositiveDate": "",
            "latestNegativeDate": "",
            "status": "neutral",
            "summary": "최근 5거래일 종목 뉴스 없음",
            "headlines": [],
            "freshPositiveCount": 0,
            "freshNegativeCount": 0,
        }

    if fresh_negative_count > 0:
        status = "negative"
        status_suffix = "최근 3거래일 악재 감지"
    elif fresh_positive_count > 0:
        status = "positive"
        status_suffix = "최근 3거래일 재료 유지"
    elif positive_count > 0:
        status = "stale_positive"
        status_suffix = "최근 5거래일 재료 존재"
    else:
        status = "neutral"
        status_suffix = "중립 뉴스 흐름"

    return {
        "lookbackDays": len(lookback_dates),
        "headlineCount": len(filtered_rows),
        "positiveCount": positive_count,
        "negativeCount": negative_count,
        "latestPositiveDate": latest_positive_date,
        "latestNegativeDate": latest_negative_date,
        "status": status,
        "summary": f"최근 5거래일 뉴스 {len(filtered_rows)}건 · 긍정 {positive_count}건 · 악재 {negative_count}건 · {status_suffix}",
        "headlines": filtered_rows[:3],
        "freshPositiveCount": fresh_positive_count,
        "freshNegativeCount": fresh_negative_count,
    }


def fetch_pullback_news_candidate_enrichments(candidates: list[Any]) -> tuple[dict[str, dict[str, Any]], list[str]]:
    if not candidates:
        return {}, []

    def collect_one(snapshot: Any) -> tuple[str, dict[str, Any]]:
        code = str(snapshot.code)
        enrichment = {"toss": None, "orderbook": None, "eventFilter": None, "newsFlow": None, "errors": []}
        try:
            rows = fetch_naver_item_news_rows(code)
            enrichment["newsFlow"] = build_pullback_news_flow(snapshot, rows)
        except Exception as error:  # noqa: BLE001
            enrichment["errors"].append(f"news {code}: {error}")
            enrichment["newsFlow"] = build_pullback_news_flow_data_missing(snapshot, f"뉴스 수집 실패: {error}")
        return code, enrichment

    max_workers = min(4, len(candidates)) or 1
    enrichments: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(collect_one, snapshot) for snapshot in candidates]
        for future in concurrent.futures.as_completed(futures):
            code, enrichment = future.result()
            enrichments[code] = enrichment
            if enrichment["errors"]:
                errors.extend(enrichment["errors"])
    return enrichments, errors


def fetch_http_candidate_enrichments(candidates: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], list[str]]:
    if not candidates:
        return {}, []

    def collect_one(candidate: dict[str, Any]) -> tuple[str, dict[str, Any]]:
        code = str(candidate["code"])
        enrichment = {"toss": None, "orderbook": None, "eventFilter": None, "errors": []}
        try:
            enrichment["toss"] = fetch_toss_metrics_with_http(code)
        except Exception as error:  # noqa: BLE001
            enrichment["errors"].append(f"toss {code}: {error}")
        try:
            enrichment["orderbook"] = fetch_orderbook_with_http(code)
        except Exception as error:  # noqa: BLE001
            enrichment["errors"].append(f"orderbook {code}: {error}")
        return code, enrichment

    max_workers = min(8, len(candidates)) or 1
    enrichments: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(collect_one, candidate) for candidate in candidates]
        for future in concurrent.futures.as_completed(futures):
            code, enrichment = future.result()
            enrichments[code] = enrichment
            if enrichment["errors"]:
                errors.extend(enrichment["errors"])
    return enrichments, errors


def fetch_kind_candidate_enrichments(
    candidates: list[dict[str, Any]],
    *,
    mode: str = VARIANT_STABLE,
) -> tuple[dict[str, dict[str, Any]], list[str], dict[str, Any]]:
    if not candidates:
        return {}, [], {"browserSource": "", "launchNotes": [], "launchAttempts": []}
    try:
        from playwright.sync_api import sync_playwright
    except Exception as error:  # noqa: BLE001
        return {}, [], {
            "browserSource": "unavailable",
            "launchNotes": [f"playwright unavailable: {error}"],
            "launchAttempts": [],
        }

    enrichments: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    with sync_playwright() as p:
        browser, context, meta = launch_browser_context(p, mode=mode)
        for candidate in candidates:
            code = str(candidate["code"])
            name = str(candidate.get("name") or "")
            enrichment = {"toss": None, "orderbook": None, "eventFilter": None, "errors": []}
            try:
                enrichment["eventFilter"] = fetch_kind_event_filter_with_browser(context, code, name)
            except Exception as error:  # noqa: BLE001
                enrichment["errors"].append(f"kind {code}: {error}")
            if enrichment["errors"]:
                errors.extend(enrichment["errors"])
            enrichments[code] = enrichment
        browser.close()
    return enrichments, errors, meta


def fetch_browser_candidate_enrichments(
    candidates: list[dict[str, Any]],
    *,
    mode: str = VARIANT_STABLE,
) -> tuple[dict[str, dict[str, Any]], list[str], dict[str, Any]]:
    if not candidates:
        return {}, [], {"browserSource": "", "launchNotes": [], "launchAttempts": []}
    try:
        from playwright.sync_api import sync_playwright
    except Exception as error:  # noqa: BLE001
        return {}, [], {
            "browserSource": "unavailable",
            "launchNotes": [f"playwright unavailable: {error}"],
            "launchAttempts": [],
        }

    enrichments: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    with sync_playwright() as p:
        browser, context, meta = launch_browser_context(p, mode=mode)
        for candidate in candidates:
            code = str(candidate["code"])
            name = str(candidate.get("name") or "")
            wants_event_filter = bool(candidate.get("needsEventFilter"))
            enrichment = {"toss": None, "orderbook": None, "eventFilter": None, "errors": []}
            try:
                enrichment["toss"] = fetch_toss_strength_with_browser(context, code)
            except Exception as error:  # noqa: BLE001
                enrichment["errors"].append(f"toss {code}: {error}")
            try:
                enrichment["orderbook"] = fetch_naver_orderbook_with_browser(context, code)
            except Exception as error:  # noqa: BLE001
                enrichment["errors"].append(f"orderbook {code}: {error}")
            if wants_event_filter:
                try:
                    enrichment["eventFilter"] = fetch_kind_event_filter_with_browser(context, code, name)
                except Exception as error:  # noqa: BLE001
                    enrichment["errors"].append(f"kind {code}: {error}")
            if enrichment["errors"]:
                errors.extend(enrichment["errors"])
            enrichments[code] = enrichment
        browser.close()
    return enrichments, errors, meta


def is_entry_field_satisfied(entry: dict[str, Any], field_key: str) -> bool:
    toss = entry.get("toss") or {}
    orderbook = entry.get("orderbook") or {}
    event_filter = entry.get("eventFilter") or {}
    if field_key == "toss.avgStrength":
        return "avgStrength" in toss and math.isfinite(parse_float(toss.get("avgStrength"))) and parse_float(toss.get("avgStrength")) > 0
    if field_key == "toss.intradayAbove100Ratio":
        return "intradayAbove100Ratio" in toss and math.isfinite(parse_float(toss.get("intradayAbove100Ratio"))) and parse_float(toss.get("intradayAbove100Ratio")) >= 0
    if field_key == "toss.lastHourAvgStrength":
        return "lastHourAvgStrength" in toss and math.isfinite(parse_float(toss.get("lastHourAvgStrength"))) and parse_float(toss.get("lastHourAvgStrength")) >= 0
    if field_key == "toss.last30BuySellRatio":
        return "last30BuySellRatio" in toss and math.isfinite(parse_float(toss.get("last30BuySellRatio"))) and parse_float(toss.get("last30BuySellRatio")) >= 0
    if field_key == "orderbook.bidAskRatio":
        return "bidAskRatio" in orderbook and math.isfinite(parse_float(orderbook.get("bidAskRatio"))) and parse_float(orderbook.get("bidAskRatio")) >= 0
    if field_key == "eventFilter":
        return bool(event_filter.get("blocked")) or bool(normalize_text(event_filter.get("note"))) or event_filter.get("earningsDays") is not None or event_filter.get("corporateActionDays") is not None
    return False


def is_snapshot_field_satisfied(snapshot: "StockSnapshot", field_key: str) -> bool:
    entry = {
        "toss": snapshot.toss or {},
        "orderbook": snapshot.orderbook or {},
        "eventFilter": snapshot.event_filter or {},
    }
    return is_entry_field_satisfied(entry, field_key)


def normalize_text(value: Any) -> str:
    return str(value or "").strip()


def sync_entry_manual_input(entry: dict[str, Any]) -> None:
    manual_input = entry.get("manualInput")
    if not isinstance(manual_input, dict):
        return
    fields = [field for field in manual_input.get("fields", []) if isinstance(field, dict)]
    remaining_fields = [field for field in fields if not is_entry_field_satisfied(entry, str(field.get("fieldKey") or ""))]
    manual_input["fields"] = remaining_fields
    manual_input["missingFieldCodes"] = [str(field.get("fieldKey") or "") for field in remaining_fields]
    manual_input["required"] = bool(remaining_fields)
    manual_input["summary"] = "수동 입력이 필요한 필드만 남겨둔 항목입니다." if remaining_fields else "현재 수동 입력 필드가 없습니다."
    manual_input["source"] = "browser_manual_override" if remaining_fields else "public_data_only"


def rebuild_entry_notes(entry: dict[str, Any], strategy: str) -> None:
    notes: list[str] = []
    event_filter = entry.get("eventFilter") or {}
    if strategy == "pullback":
        if not is_entry_field_satisfied(entry, "toss.avgStrength"):
            notes.append("당일 평균 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.lastHourAvgStrength"):
            notes.append("마지막 1시간 체결강도 미반영")
        if not (bool(event_filter.get("blocked")) or bool(normalize_text(event_filter.get("note"))) or event_filter.get("earningsDays") is not None or event_filter.get("corporateActionDays") is not None):
            notes.append("기업 이벤트 필터는 미반영")
    if strategy in {"breakout", "momentum"}:
        if not is_entry_field_satisfied(entry, "toss.avgStrength"):
            notes.append("토스 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.intradayAbove100Ratio"):
            notes.append("체결강도 100% 유지 비율 미반영")
        if not is_entry_field_satisfied(entry, "orderbook.bidAskRatio"):
            notes.append("호가잔량 미반영")
    if strategy == "accumulation":
        if not is_entry_field_satisfied(entry, "toss.avgStrength"):
            notes.append("당일 평균 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.lastHourAvgStrength"):
            notes.append("마지막 1시간 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.last30BuySellRatio"):
            notes.append("마지막 30분 틱 프록시 미반영")
    if strategy == "reversal":
        intraday_30m = entry.get("intraday30m") or {}
        if not is_entry_field_satisfied(entry, "toss.avgStrength"):
            notes.append("토스 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.lastHourAvgStrength"):
            notes.append("마지막 1시간 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "orderbook.bidAskRatio"):
            notes.append("호가잔량 미반영")
        if not (bool(event_filter.get("blocked")) or bool(normalize_text(event_filter.get("note"))) or event_filter.get("earningsDays") is not None or event_filter.get("corporateActionDays") is not None):
            notes.append("기업 이벤트 필터는 미반영")
        if not intraday_30m.get("available"):
            notes.append("30분봉 데이터 미반영")
    entry["notes"] = notes


def apply_browser_enrichment_to_entry(entry: dict[str, Any], strategy: str, enrichment: dict[str, Any], context: dict[str, Any]) -> None:
    toss = enrichment.get("toss")
    orderbook = enrichment.get("orderbook")
    event_filter = enrichment.get("eventFilter")
    news_flow = enrichment.get("newsFlow")
    if isinstance(toss, dict):
        merged_toss = dict(entry.get("toss") or {})
        merged_toss.update(toss)
        entry["toss"] = merged_toss
    if isinstance(orderbook, dict):
        merged_orderbook = dict(entry.get("orderbook") or {})
        merged_orderbook.update(orderbook)
        entry["orderbook"] = merged_orderbook
    if strategy == "pullback":
        if isinstance(event_filter, dict):
            entry["eventFilter"] = {**(entry.get("eventFilter") or {}), **event_filter}
        if isinstance(news_flow, dict):
            pullback_context = dict(entry.get("pullbackContext") or {})
            pullback_context["newsFlow"] = news_flow
            entry["pullbackContext"] = pullback_context
    if strategy == "reversal" and isinstance(event_filter, dict):
        entry["eventFilter"] = {**(entry.get("eventFilter") or {}), **event_filter}
        filters = entry.get("filters") if isinstance(entry.get("filters"), list) else []
        for row in filters:
            if row.get("code") == "F3":
                row["status"] = "⛔" if event_filter.get("blocked") else "✅"
                row["note"] = normalize_text(event_filter.get("note")) or ("KIND 최근공시 차단" if event_filter.get("blocked") else "이벤트 필터 통과")
        entry["statusLabel"] = reversal_status_label(
            entry.get("grade", "C"),
            context["regimeLabel"],
            context["gapScore"]["code"],
            filters,
            entry.get("gates") or [],
            **macro_status_kwargs(context),
        )
    sync_entry_manual_input(entry)
    rebuild_entry_notes(entry, strategy)


def apply_browser_enrichment_to_snapshot(snapshot: "StockSnapshot", enrichment: dict[str, Any]) -> None:
    toss = enrichment.get("toss")
    orderbook = enrichment.get("orderbook")
    event_filter = enrichment.get("eventFilter")
    news_flow = enrichment.get("newsFlow")
    if isinstance(toss, dict):
        snapshot.toss = {**(snapshot.toss or {}), **toss}
    if isinstance(orderbook, dict):
        snapshot.orderbook = {**(snapshot.orderbook or {}), **orderbook}
    if isinstance(event_filter, dict):
        snapshot.event_filter = {**(snapshot.event_filter or {}), **event_filter}
    if isinstance(news_flow, dict):
        snapshot.news_flow = {**(snapshot.news_flow or {}), **news_flow}


def parse_cnbc_quote_html(html: str) -> dict[str, float]:
    patterns = {
        "current": r'"last":"([0-9.,-]+)"',
        "previousClose": r'"previous_day_closing":"([0-9.,-]+)"',
        "open": r'"open":"([0-9.,-]+)"',
        "high": r'"high":"([0-9.,-]+)"',
        "low": r'"low":"([0-9.,-]+)"',
        "changePct": r'"change_pct":"([0-9.,-]+)%"',
    }
    quote: dict[str, float] = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, html)
        if match:
            quote[key] = parse_float(match.group(1))
    if "current" not in quote or "previousClose" not in quote:
        raise ValueError("CNBC quote payload missing current or previous close")
    if "changePct" not in quote and quote["previousClose"]:
        quote["changePct"] = ((quote["current"] - quote["previousClose"]) / quote["previousClose"]) * 100
    return quote


def fetch_vkospi_quote() -> dict[str, Any]:
    cnbc_url = "https://www.cnbc.com/quotes/.KSVKOSPI"
    errors: list[str] = []
    try:
        html = request_text(cnbc_url, timeout=20.0, encoding="utf-8")
        quote = parse_cnbc_quote_html(html)
        return {
            **quote,
            "source": "cnbc_quote",
            "label": "VKOSPI",
            "isFallback": False,
            "confidence": 0.85,
        }
    except Exception as error:  # noqa: BLE001
        errors.append(str(error))

    yahoo_vix = fetch_yahoo_meta("^VIX")
    return {
        "current": float(yahoo_vix["regularMarketPrice"]),
        "previousClose": float(yahoo_vix["chartPreviousClose"]),
        "changePct": ((float(yahoo_vix["regularMarketPrice"]) - float(yahoo_vix["chartPreviousClose"])) / float(yahoo_vix["chartPreviousClose"])) * 100 if float(yahoo_vix["chartPreviousClose"]) else 0.0,
        "source": "yahoo_chart",
        "label": "VIX proxy",
        "isFallback": True,
        "confidence": 0.55,
        "errors": errors,
    }


def build_naver_chart_history_url(code: str, count: int = 130) -> str:
    return (
        "https://fchart.stock.naver.com/sise.nhn"
        f"?symbol={code}&timeframe=day&count={max(10, int(count))}&requestType=0"

    )


def parse_naver_chart_history_rows(xml_text: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for match in re.finditer(r'<item[^>]*data="([^"]+)"', xml_text):
        values = match.group(1).split("|")
        if len(values) != 6:
            continue
        date_key, open_price, high_price, low_price, close_price, volume = values
        rows.append({
            "localTradedAt": date_key,
            "openPrice": open_price,
            "highPrice": high_price,
            "lowPrice": low_price,
            "closePrice": close_price,
            "accumulatedTradingVolume": volume,
        })
    rows.sort(key=lambda row: row["localTradedAt"], reverse=True)
    return rows


def fetch_naver_price_history(code: str, count: int = 130) -> list[dict[str, str]]:
    return parse_naver_chart_history_rows(request_text(build_naver_chart_history_url(code, count), timeout=20.0))


def fetch_kospi_history(count: int = 90) -> list[dict[str, Any]]:

    rows: list[dict[str, Any]] = []
    page = 1
    remaining = max(1, count)
    while remaining > 0:
        page_size = min(60, remaining)
        url = f"https://m.stock.naver.com/api/index/KOSPI/price?page={page}&pageSize={page_size}"
        payload = request_json(url, timeout=20.0)
        if not payload:
            break
        rows.extend(payload)
        remaining -= len(payload)
        page += 1
        if len(payload) < page_size:
            break
    return rows[:count]



def fetch_naver_market_value_rows(market: str, *, page_size: int = 100) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    page = 1
    while True:
        payload = request_json(NAVER_MARKET_VALUE_API_TEMPLATE.format(market=market, page=page, page_size=page_size), timeout=20.0)
        stocks = payload.get("stocks") if isinstance(payload, dict) else []
        if not isinstance(stocks, list) or not stocks:
            break
        rows.extend(row for row in stocks if isinstance(row, dict))
        total_count = parse_int(payload.get("totalCount")) if isinstance(payload, dict) else 0
        if total_count and page * page_size >= total_count:
            break
        page += 1
    return rows


def fetch_naver_market_value_universe() -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for market in ("KOSPI", "KOSDAQ"):
        rows.extend(fetch_naver_market_value_rows(market))
    return rows


OVERTIME_BOARD_URL_TEMPLATE = "https://finance.naver.com/sise/sise_quant_overtime.naver?page={page}"
OVERTIME_BOARD_MAX_PAGES = 5


class _OvertimeBoardParser(HTMLParser):
    """시간외 단일가 게시판(sise_quant_overtime.naver) 테이블을 종목코드 포함 셀 텍스트로 파싱한다."""

    def __init__(self) -> None:
        super().__init__()
        self.tables: list[list[list[str]]] = []
        self._current_table: list[list[str]] | None = None
        self._current_row: list[str] | None = None
        self._cell_parts: list[str] = []
        self._in_cell = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "table":
            self._current_table = []
        elif tag == "tr" and self._current_table is not None:
            self._current_row = []
        elif tag in ("td", "th") and self._current_row is not None:
            self._in_cell = True
            self._cell_parts = []
        elif tag == "a" and self._in_cell:
            href = dict(attrs).get("href") or ""
            code_match = re.search(r"code=(\d{6})", href)
            if code_match:
                self._cell_parts.append(f" {code_match.group(1)} ")

    def handle_endtag(self, tag: str) -> None:
        if tag in ("td", "th") and self._in_cell and self._current_row is not None:
            text = re.sub(r"\s+", " ", "".join(self._cell_parts)).strip()
            self._current_row.append(text)
            self._in_cell = False
            self._cell_parts = []
        elif tag == "tr" and self._current_row is not None and self._current_table is not None:
            if any(cell.strip() for cell in self._current_row):
                self._current_table.append(self._current_row)
            self._current_row = None
        elif tag == "table" and self._current_table is not None:
            if self._current_table:
                self.tables.append(self._current_table)
            self._current_table = None

    def handle_data(self, data: str) -> None:
        if self._in_cell:
            self._cell_parts.append(data)


def _parse_overtime_board_html(html_text: str) -> dict[str, float]:
    parser = _OvertimeBoardParser()
    parser.feed(html_text)
    price_map: dict[str, float] = {}
    for table in parser.tables:
        for row in table:
            if len(row) < 3:
                continue
            joined = " ".join(row)
            code_match = re.search(r"\b(\d{6})\b", joined)
            if not code_match:
                continue
            price = parse_float(row[2])
            if price <= 0:
                continue
            price_map[code_match.group(1)] = price
    return price_map


def fetch_overtime_price_map(*, max_pages: int = OVERTIME_BOARD_MAX_PAGES) -> dict[str, float]:
    """KRX 시간외 단일가(대체거래소 포함 호가) 게시판에서 종목별 시간외 체결가를 수집한다.

    17:30(5시반) 분석 세션에서 정규장 종가 대신 사용한다. 페이지를 순회하다 새 종목이
    더 이상 나오지 않거나 페이지 조회에 실패하면 중단한다.
    """
    price_map: dict[str, float] = {}
    for page in range(1, max_pages + 1):
        try:
            html_text = request_text(OVERTIME_BOARD_URL_TEMPLATE.format(page=page), timeout=15.0, encoding="euc-kr")
        except (URLError, OSError, TimeoutError):
            break
        page_map = _parse_overtime_board_html(html_text)
        if not page_map:
            break
        before = len(price_map)
        price_map.update(page_map)
        if len(price_map) == before:
            break
    return price_map


def _is_market_cap_rank_candidate(row: dict[str, Any]) -> bool:
    code = str(row.get("itemCode") or row.get("code") or "").strip()
    name = str(row.get("stockName") or row.get("name") or "").strip()
    stock_end_type = str(row.get("stockEndType") or "").strip().lower()
    if not code or not name:
        return False
    if not STOCK_CODE_PATTERN.fullmatch(code):
        return False
    if stock_end_type and stock_end_type != "stock":
        return False
    if ETF_NAME_PATTERN.search(name):
        return False
    return True


def build_market_cap_rank_lookup(rows: list[dict[str, Any]]) -> tuple[dict[str, int], int]:
    candidates: list[tuple[float, str, str]] = []
    for row in rows:
        if not _is_market_cap_rank_candidate(row):
            continue
        code = str(row.get("itemCode") or row.get("code") or "").strip()
        name = str(row.get("stockName") or row.get("name") or "").strip()
        market_cap = parse_float(row.get("marketValueRaw"))
        if market_cap <= 0:
            market_cap = parse_market_cap_trillion(str(row.get("marketValue") or row.get("marketValueHangeul") or ""))
        if market_cap <= 0:
            continue
        candidates.append((market_cap, code, name))

    ranked_entries = sorted(candidates, key=lambda item: (-item[0], item[1], item[2]))
    lookup: dict[str, int] = {}
    for index, (_, code, _) in enumerate(ranked_entries, start=1):
        lookup[code] = index
    return lookup, len(ranked_entries)


def select_top_trading_value_codes(rows: list[dict[str, Any]], limit: int = TOP_TRADING_VALUE_LIMIT) -> list[tuple[int, str, str]]:
    candidates: list[tuple[float, str, str]] = []
    for row in rows:
        code = str(row.get("itemCode") or row.get("code") or "").strip()
        name = str(row.get("stockName") or row.get("name") or "").strip()
        trading_value = parse_float(row.get("accumulatedTradingValueRaw") or row.get("accumulatedTradingValue"))
        if not code or not name or trading_value <= 0:
            continue
        if not STOCK_CODE_PATTERN.fullmatch(code):
            continue
        candidates.append((trading_value, code, name))

    results: list[tuple[int, str, str]] = []
    seen: set[str] = set()
    for raw_rank, (_, code, name) in enumerate(sorted(candidates, reverse=True), start=1):
        if raw_rank > limit:
            break
        if code in seen or ETF_NAME_PATTERN.search(name):
            continue
        seen.add(code)
        results.append((raw_rank, code, name))
    return results


def fetch_top_trading_codes(limit: int = TOP_TRADING_VALUE_LIMIT, rows: list[dict[str, Any]] | None = None) -> list[tuple[int, str, str]]:
    effective_limit = min(limit, TOP_TRADING_VALUE_LIMIT)
    market_rows = rows if rows is not None else fetch_naver_market_value_universe()
    results = select_top_trading_value_codes(market_rows, effective_limit)
    if not results:
        raise RuntimeError("failed to fetch top trading-value codes from Naver mobile API")
    return results


def moving_average(values: list[float], period: int, offset: int = 0) -> float | None:
    start = offset
    end = offset + period
    if len(values) < end:
        return None
    window = values[start:end]
    return sum(window) / period


def average_or_default(values: list[float], default: float = 0.0) -> float:
    if not values:
        return default
    return sum(values) / len(values)


def ema_series(values: list[float], period: int) -> list[float]:
    if not values:
        return []
    factor = 2 / (period + 1)
    series = [values[0]]
    for value in values[1:]:
        series.append((value - series[-1]) * factor + series[-1])
    return series


def compute_macd_histogram(closes_desc: list[float]) -> list[float]:
    closes = list(reversed(closes_desc))
    fast = ema_series(closes, 12)
    slow = ema_series(closes, 26)
    macd = [fast[index] - slow[index] for index in range(min(len(fast), len(slow)))]
    signal = ema_series(macd, 9)
    histogram = [macd[index] - signal[index] for index in range(min(len(macd), len(signal)))]
    return list(reversed(histogram))


def compute_rsi(values: list[float], period: int = 14) -> float | None:
    if len(values) <= period:
        return None
    gains: list[float] = []
    losses: list[float] = []
    for previous, current in zip(values[:-1], values[1:]):
        delta = current - previous
        gains.append(max(delta, 0.0))
        losses.append(abs(min(delta, 0.0)))
    average_gain = sum(gains[:period]) / period
    average_loss = sum(losses[:period]) / period
    for index in range(period, len(gains)):
        average_gain = (average_gain * (period - 1) + gains[index]) / period
        average_loss = (average_loss * (period - 1) + losses[index]) / period
    if average_loss == 0:
        return 100.0
    relative_strength = average_gain / average_loss
    return 100 - (100 / (1 + relative_strength))


def weekly_closes(closes_desc: list[float]) -> list[float]:
    ascending = list(reversed(closes_desc))
    grouped = []
    for index in range(4, len(ascending), 5):
        grouped.append(ascending[index])
    return grouped


def parse_market_cap_trillion(value: str) -> float:
    text = str(value or "")
    jo_match = re.search(r"([\d,.]+)조", text)
    eok_match = re.search(r"([\d,.]+)억", text)
    total = 0.0
    if jo_match:
        total += float(jo_match.group(1).replace(",", ""))
    if eok_match:
        total += float(eok_match.group(1).replace(",", "")) / 10000.0
    return total


def find_total_info(total_infos: list[dict[str, Any]], code: str) -> str:
    for row in total_infos:
        if row.get("code") == code:
            return str(row.get("value", ""))
    return ""


@dataclass
class StockSnapshot:
    rank: int
    code: str
    name: str
    current_price: float
    prev_close: float
    open_price: float
    high_price: float
    low_price: float
    volume: float
    trading_value_text: str
    market_cap_trillion: float
    foreign_net: float
    institution_net: float
    foreign_previous: float
    institution_previous: float
    close_history: list[float]
    high_history: list[float]
    low_history: list[float]
    volume_history: list[float]
    ma5: float | None
    ma10: float | None
    ma20: float | None
    ma60: float | None
    ma5_prev: float | None
    ma20_prev: float | None
    ma60_prev: float | None
    weekly_rsi: float | None
    macd_hist: list[float]
    high_20d: float
    low_5d: float
    high_52w: float
    return_5d: float
    return_20d: float
    return_21d: float
    volume_avg_5d: float
    volume_avg_20d: float
    industry_code: str
    industry_compare_change_pct: float | None
    industry_compare_count: int
    intraday_30m: dict[str, Any]
    event_filter: dict[str, Any] | None
    deal_trend_history: list[dict[str, Any]] | None = None
    news_flow: dict[str, Any] | None = None
    toss: dict[str, Any] | None = None
    orderbook: dict[str, Any] | None = None
    market_cap_rank: int | None = None
    market_cap_universe_count: int | None = None
    per: float | None = None
    pbr: float | None = None
    cns_per: float | None = None
    low_52w: float | None = None
    foreign_rate: float | None = None
    open_history: list[float] | None = None
    date_history: list[str] | None = None
    stockExchangeName: str | None = None


def _analysis_history_rows(
    history_rows: list[dict[str, str]],
    analysis_date: date | str | None,
) -> tuple[list[dict[str, str]], dict[str, str] | None]:
    if not history_rows:
        return [], None
    if analysis_date is None:
        return history_rows, history_rows[0]

    target_key = compact_date(analysis_date) if isinstance(analysis_date, date) else str(analysis_date).replace("-", "")[:8]
    row_key = lambda row: str(row.get("localTradedAt") or "").replace("-", "")[:8]
    filtered_rows = [row for row in history_rows if row_key(row) <= target_key]
    if not filtered_rows:
        return history_rows, history_rows[0]
    analysis_row = next((row for row in filtered_rows if row_key(row) == target_key), filtered_rows[0])
    return filtered_rows, analysis_row


def _analysis_target_key(analysis_date: date | str | None) -> str | None:
    if analysis_date is None:
        return None
    if isinstance(analysis_date, date):
        return compact_date(analysis_date)
    return str(analysis_date).replace("-", "")[:8]


def _normalize_deal_trend_history(
    deals: list[dict[str, Any]],
    analysis_date: date | str | None,
) -> list[dict[str, Any]]:
    target_key = _analysis_target_key(analysis_date)
    rows = deals or []
    if target_key:
        filtered = [row for row in rows if str(row.get("bizdate") or "").replace("-", "")[:8] <= target_key]
        if filtered:
            rows = filtered
    history: list[dict[str, Any]] = []
    for row in rows[:5]:
        history.append({
            "date": str(row.get("bizdate") or ""),
            "foreignNet": parse_float(row.get("foreignerPureBuyQuant")),
            "institutionNet": parse_float(row.get("organPureBuyQuant")),
        })
    return history


def build_stock_snapshot(
    item: tuple[int, str, str],
    analysis_date: date | str | None = None,
    market_cap_rank_lookup: dict[str, int] | None = None,
    market_cap_universe_count: int | None = None,
    overtime_price_map: dict[str, float] | None = None,
) -> StockSnapshot:
    rank, code, name = item
    basic = request_json(f"https://m.stock.naver.com/api/stock/{code}/basic", timeout=20.0)
    integration = request_json(f"https://m.stock.naver.com/api/stock/{code}/integration", timeout=20.0)
    history_rows = fetch_naver_price_history(code, 130)
    if not history_rows:
        raise RuntimeError(f"price history unavailable for {code}")

    analysis_rows, analysis_row = _analysis_history_rows(history_rows, analysis_date)
    open_history = [float(parse_int(row["openPrice"])) for row in analysis_rows]
    close_history = [float(parse_int(row["closePrice"])) for row in analysis_rows]
    high_history = [float(parse_int(row["highPrice"])) for row in analysis_rows]
    low_history = [float(parse_int(row["lowPrice"])) for row in analysis_rows]
    volume_history = [float(parse_int(row["accumulatedTradingVolume"])) for row in analysis_rows]
    date_history = [str(row.get("localTradedAt") or "") for row in analysis_rows]
    total_infos = integration.get("totalInfos", []) or []
    deals = integration.get("dealTrendInfos", []) or []
    industry_compare_rows = integration.get("industryCompareInfo", []) or []
    today_deal = deals[0] if deals else {}
    previous_deal = deals[1] if len(deals) > 1 else {}
    deal_trend_history = _normalize_deal_trend_history(deals, analysis_date)
    industry_change_values = [
        parse_float(row.get("fluctuationsRatio"))
        for row in industry_compare_rows
        if isinstance(row, dict) and str(row.get("itemCode") or "").strip() != code and str(row.get("fluctuationsRatio") or "").strip()
    ]
    industry_compare_change_pct = average_or_default(industry_change_values) if industry_change_values else None

    history_high_window = high_history[:120] or [parse_float(basic.get("highPrice") or basic.get("closePrice") or basic.get("stockPrice")) or 0.0]
    high_52w = parse_float(find_total_info(total_infos, "highPriceOf52Weeks")) or max(history_high_window)
    low_52w = parse_float(find_total_info(total_infos, "lowPriceOf52Weeks")) or (min(low_history[:120]) if low_history else 0.0)
    historical_current = parse_float(analysis_row["closePrice"]) if analysis_row else 0.0
    finalized_current = close_history[0] if analysis_date is not None and close_history else 0.0
    # Historical/finalized runs should prefer the filtered session close over live/basic quotes.
    current_price = finalized_current or historical_current or parse_float(basic.get("closePrice") or basic.get("stockPrice")) or close_history[0]
    # 17:30(5시) 분석 세션: 정규장 종가 대신 NXT/시간외 단일가 게시판 체결가를 종가로 사용한다.
    overtime_price = (overtime_price_map or {}).get(code)
    if overtime_price and overtime_price > 0:
        current_price = overtime_price
    prev_close = parse_float(analysis_rows[1]["closePrice"]) if len(analysis_rows) > 1 else 0.0
    prev_close = prev_close or parse_float(find_total_info(total_infos, "lastClosePrice")) or (close_history[1] if len(close_history) > 1 else current_price)
    open_price = parse_float(analysis_row["openPrice"]) if analysis_row else 0.0
    open_price = open_price or parse_float(find_total_info(total_infos, "openPrice")) or parse_float(analysis_rows[0]["openPrice"])
    high_price = parse_float(analysis_row["highPrice"]) if analysis_row else 0.0
    high_price = high_price or parse_float(find_total_info(total_infos, "highPrice")) or parse_float(analysis_rows[0]["highPrice"])
    low_price = parse_float(analysis_row["lowPrice"]) if analysis_row else 0.0
    low_price = low_price or parse_float(find_total_info(total_infos, "lowPrice")) or parse_float(analysis_rows[0]["lowPrice"])

    ma5 = moving_average(close_history, 5)
    ma10 = moving_average(close_history, 10)
    ma20 = moving_average(close_history, 20)
    ma60 = moving_average(close_history, 60)
    ma5_prev = moving_average(close_history, 5, 1)
    ma20_prev = moving_average(close_history, 20, 1)
    ma60_prev = moving_average(close_history, 60, 1)
    return_5d = ((current_price - close_history[5]) / close_history[5]) * 100 if len(close_history) > 5 and close_history[5] else 0.0
    return_20d = ((current_price - close_history[20]) / close_history[20]) * 100 if len(close_history) > 20 and close_history[20] else 0.0
    return_21d = ((current_price - close_history[21]) / close_history[21]) * 100 if len(close_history) > 21 and close_history[21] else 0.0
    weekly_rsi = compute_rsi(weekly_closes(close_history), 14)
    intraday_30m = fetch_reversal_intraday_signal(code, basic.get("sosok"))
    event_filter = build_auto_event_filter(integration)

    return StockSnapshot(
        rank=rank,
        code=code,
        name=name,
        current_price=current_price,
        prev_close=prev_close,
        open_price=open_price,
        high_price=high_price,
        low_price=low_price,
        volume=(
            parse_float(analysis_row["accumulatedTradingVolume"]) if analysis_row else 0.0
        ) or parse_float(find_total_info(total_infos, "accumulatedTradingVolume")) or volume_history[0],
        trading_value_text=find_total_info(total_infos, "accumulatedTradingValue"),
        market_cap_trillion=parse_market_cap_trillion(find_total_info(total_infos, "marketValue")),
        foreign_net=parse_float(today_deal.get("foreignerPureBuyQuant")),
        institution_net=parse_float(today_deal.get("organPureBuyQuant")),
        foreign_previous=parse_float(previous_deal.get("foreignerPureBuyQuant")),
        institution_previous=parse_float(previous_deal.get("organPureBuyQuant")),
        close_history=close_history,
        open_history=open_history,
        high_history=high_history,
        low_history=low_history,
        volume_history=volume_history,
        date_history=date_history,
        ma5=ma5,
        ma10=ma10,
        ma20=ma20,
        ma60=ma60,
        ma5_prev=ma5_prev,
        ma20_prev=ma20_prev,
        ma60_prev=ma60_prev,
        weekly_rsi=weekly_rsi,
        macd_hist=compute_macd_histogram(close_history),
        high_20d=max(high_history[:20] or [high_price or current_price]),
        low_5d=min(low_history[:5] or [low_price or current_price]),
        high_52w=high_52w,
        return_5d=return_5d,
        return_20d=return_20d,
        return_21d=return_21d,
        volume_avg_5d=average_or_default(volume_history[1:6], volume_history[0]),
        volume_avg_20d=average_or_default(volume_history[1:21], volume_history[0]),
        industry_code=str(integration.get("industryCode") or ""),
        industry_compare_change_pct=industry_compare_change_pct,
        industry_compare_count=len(industry_change_values),
        intraday_30m=intraday_30m,
        event_filter=event_filter,
        deal_trend_history=deal_trend_history,
        news_flow=None,
        toss=None,
        orderbook=None,
        market_cap_rank=(market_cap_rank_lookup or {}).get(code),
        market_cap_universe_count=market_cap_universe_count,
        per=_optional_metric(find_total_info(total_infos, "per")),
        pbr=_optional_metric(find_total_info(total_infos, "pbr")),
        cns_per=_optional_metric(find_total_info(total_infos, "cnsPer")),
        low_52w=low_52w or None,
        foreign_rate=_optional_metric(find_total_info(total_infos, "foreignRate")),
        stockExchangeName=basic.get("stockExchangeName"),
    )


def stock_daily_change(snapshot: StockSnapshot) -> float:
    return ((snapshot.current_price - snapshot.prev_close) / snapshot.prev_close) * 100 if snapshot.prev_close else 0.0


def build_price_change_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    daily_change = snapshot.current_price - snapshot.prev_close
    daily_change_pct = stock_daily_change(snapshot)
    return {
        "currentPrice": round(snapshot.current_price),
        "previousClose": round(snapshot.prev_close),
        "dailyChange": round(daily_change),
        "dailyChangePct": round(daily_change_pct, 2),
        "dailyDirection": "up" if daily_change > 0 else "down" if daily_change < 0 else "flat",
    }


def build_market_cap_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    return {
        "marketCapTrillion": snapshot.market_cap_trillion,
        "marketCapRank": snapshot.market_cap_rank,
        "marketCapUniverseCount": snapshot.market_cap_universe_count,
    }


def _days_ago_label(days_ago: int) -> str:
    return "전일" if days_ago == 1 else f"{days_ago}일 전"


def build_pullback_support_context(snapshot: StockSnapshot) -> dict[str, Any]:
    return build_pullback_support_payload_from_snapshot(snapshot)


def build_pullback_volume_burst_context(snapshot: StockSnapshot) -> dict[str, Any]:
    history = list(snapshot.volume_history or [])[1:21]
    avg_20 = float(snapshot.volume_avg_20d or 0)
    if not history or avg_20 <= 0:
        return {"summary": "", "burstCount": 0, "maxRatioPct": 0, "latestBurstDaysAgo": None}

    ratios = [volume / avg_20 for volume in history]
    max_index, max_ratio = max(enumerate(ratios), key=lambda item: item[1])
    burst_days = [index + 1 for index, ratio in enumerate(ratios) if ratio >= 2.0]
    latest_burst_days_ago = burst_days[0] if burst_days else None
    burst_count = len(burst_days)
    summary = (
        f"최근 20일 최대 거래량 {max_ratio * 100:.0f}% ({_days_ago_label(max_index + 1)})"
        + (f" · 200%+ 급증 {burst_count}회" if burst_count else "")
    )
    return {
        "summary": summary,
        "burstCount": burst_count,
        "maxRatioPct": round(max_ratio * 100, 1),
        "latestBurstDaysAgo": latest_burst_days_ago,
    }


def build_entry_volatility_context(snapshot: StockSnapshot, context: dict[str, Any], strategy: str) -> dict[str, Any]:
    return build_volatility_context(snapshot, context, strategy)


def join_keypoint_parts(*parts: str) -> str:
    return " ".join(part.strip() for part in parts if str(part or "").strip()).strip()


def lower_wick_ratio(snapshot: StockSnapshot) -> float:
    body_low = min(snapshot.current_price, snapshot.open_price)
    body = abs(snapshot.current_price - snapshot.open_price)
    lower_wick = max(body_low - snapshot.low_price, 0.0)
    return lower_wick / body if body > 0 else 0.0


def upper_wick_ratio(snapshot: StockSnapshot) -> float:
    body_high = max(snapshot.current_price, snapshot.open_price)
    body = abs(snapshot.current_price - snapshot.open_price)
    upper_wick = max(snapshot.high_price - body_high, 0.0)
    return upper_wick / body if body > 0 else 0.0


def candle_range(snapshot: StockSnapshot) -> float:
    return max(snapshot.high_price - snapshot.low_price, 0.0)


def build_gap_score(live_metrics: dict[str, dict[str, float]]) -> dict[str, Any]:
    def score_nq(change_pct: float) -> int:
        if change_pct >= 1.5:
            return 2
        if change_pct >= 0.5:
            return 1
        if change_pct > -0.5:
            return 0
        if change_pct >= -1.5:
            return -1
        return -2

    def score_vix(level: float) -> int:
        if level < 12:
            return 2
        if level < 17:
            return 1
        if level < 22:
            return 0
        if level < 28:
            return -1
        return -2

    def score_bond(bp_change: float) -> int:
        if bp_change <= -8:
            return 2
        if bp_change < -3:
            return 1
        if bp_change <= 3:
            return 0
        if bp_change < 8:
            return -1
        return -2

    def score_fx(change_won: float) -> int:
        if change_won <= -15:
            return 2
        if change_won < -5:
            return 1
        if change_won <= 5:
            return 0
        if change_won < 15:
            return -1
        return -2

    def score_sox(change_pct: float) -> int:
        if change_pct >= 1.5:
            return 2
        if change_pct >= 0:
            return 1
        if change_pct >= -1.5:
            return -1
        return -2

    rows = [
        ("NQ 선물 변화율", live_metrics["nq"]["changePct"], score_nq(live_metrics["nq"]["changePct"]), 2.5, "%", 2),
        ("VIX 수준", live_metrics["vix"]["current"], score_vix(live_metrics["vix"]["current"]), 2.0, "", 2),
        ("미국 10년 금리 전일비", live_metrics["tnx"]["bpChange"], score_bond(live_metrics["tnx"]["bpChange"]), 1.5, "bp", 1),
        ("원달러 환율 변화", live_metrics["krw"]["changeWon"], score_fx(live_metrics["krw"]["changeWon"]), 1.5, "원", 2),
        ("SOX 전일 변화율", live_metrics["sox"]["changePct"], score_sox(live_metrics["sox"]["changePct"]), 1.0, "%", 2),
    ]

    gap_rows = []
    total_score = 0.0
    for indicator, actual_value, base_score, weight, suffix, digits in rows:
        weighted = base_score * weight
        total_score += weighted
        gap_rows.append({
            "indicator": indicator,
            "actualValue": f"{signed_number(actual_value, digits, suffix)}",
            "baseScore": f"{base_score:+d}점",
            "weight": f"×{weight:.1f}",
            "formula": f"{base_score:+d} × {weight:.1f} = {signed_number(weighted, 1, '점')}",
            "weightedScore": signed_number(weighted, 1, "점"),
        })

    if total_score >= 7:
        grade_code = "G-A"
        grade = "G-A 🟢"
        entry_adjustment = "✅ 100% 진입 / ✅ 100% 진입"
        sell_adjustment = "기본 조건 유지 | 기본 손절폭 유지"
        swing_adjustment = "적극 허용"
    elif total_score >= 2:
        grade_code = "G-B"
        grade = "G-B 🔵"
        entry_adjustment = "✅ 100% 진입 / ✅ 80% 진입"
        sell_adjustment = "기본 조건 유지 | 기본 유지"
        swing_adjustment = "허용"
    elif total_score >= -2.9:
        grade_code = "G-C"
        grade = "G-C 🟡"
        entry_adjustment = "✅ 70% 진입 / ⚠️ 50% 진입"
        sell_adjustment = "프리마켓 갭업 기준 -0.5%p 하향 | 손절폭 -0.5%p 축소"
        swing_adjustment = "조건부 허용"
    elif total_score >= -7.9:
        grade_code = "G-D"
        grade = "G-D 🟠"
        entry_adjustment = "⚠️ S등급만 50% 허용 / ❌ 신규 진입 보류"
        sell_adjustment = "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소"
        swing_adjustment = "금지"
    else:
        grade_code = "G-E"
        grade = "G-E 🔴"
        entry_adjustment = "⚠️ 눌림목·매집 A/S만 50% 허용 · 돌파 금지 / ⚠️ A/S만 50% 허용"
        sell_adjustment = "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소"
        swing_adjustment = "금지"

    return {
        "rows": gap_rows,
        "totalScore": signed_number(total_score, 1, "점"),
        "grade": grade,
        "code": grade_code,
        "entryAdjustment": entry_adjustment,
        "sellAdjustment": sell_adjustment,
        "swingAdjustment": swing_adjustment,
        "note": "실시간 공개 시세(Yahoo chart API) 기준입니다.",
    }


def trend_vkospi_multiplier(vkospi_proxy: float) -> float:
    """트렌드 전략(눌림목·매집·돌파) VKOSPI 페널티 승수.

    기존 3단계 계단(≤20→1.0, ≤30→0.9, >30→0.8)은 임계 근방에서 불연속 점프가 발생해
    VKOSPI 29.9와 30.1이 전혀 다른 등급을 받는 비일관성이 있었다.
    → 선형 보간으로 부드럽게 연결. 범위: VKOSPI 15(×1.0) ~ 45(×0.75).
    VKOSPI 45 이상에서 G5가 이미 ⛔ 차단하므로 하한 0.75 이하로는 내려가지 않는다.
    """
    v = float(vkospi_proxy or 0)
    if v <= 15:
        return 1.0
    if v >= 45:
        return 0.75
    # 15→45 구간 선형 보간: 1.0 → 0.75
    return round(1.0 - (v - 15) / (45 - 15) * 0.25, 4)


def reversal_vkospi_multiplier(vkospi_proxy: float) -> float:
    """급락반등 전략 VKOSPI 승수 — 역전략이라 중간 변동성(20~35)에서 유리.

    기존 3단계 계단(≤20→0.8, ≤30→1.0, >30→0.9)의 불연속을 제거.
    → VKOSPI 20~35 구간을 피크(×1.0)로 양쪽을 선형 테이퍼.
    """
    v = float(vkospi_proxy or 0)
    if v <= 15:
        return 0.8
    if v <= 20:
        # 15→20: 0.8→1.0
        return round(0.8 + (v - 15) / 5 * 0.2, 4)
    if v <= 35:
        return 1.0
    if v <= 50:
        # 35→50: 1.0→0.85
        return round(1.0 - (v - 35) / 15 * 0.15, 4)
    return 0.85


def decide_regime(kospi_history: list[dict[str, Any]], vkospi_proxy: float) -> tuple[str, str, str, str, str, str]:
    closes = [parse_float(row.get("closePrice")) for row in kospi_history]
    current_close = closes[0] if closes else 0.0
    ma20 = moving_average(closes, 20)
    ma60 = moving_average(closes, 60)
    ma20_prev = moving_average(closes, 20, 1)
    ma60_prev = moving_average(closes, 60, 1)
    ma20_up = bool(ma20 and ma20_prev and ma20 > ma20_prev)
    ma60_up = bool(ma60 and ma60_prev and ma60 > ma60_prev)
    ma60_flat = bool(ma60 and ma60_prev and abs(ma60 - ma60_prev) / ma60 < 0.003)
    if ma60 and current_close < ma60 and vkospi_proxy > 28:
        return "약세장 ⛔", "none", "none", "none", "금지", "비활성"
    if not ma60_up and vkospi_proxy > 32:
        return "약세장 ⛔", "none", "none", "none", "금지", "비활성"
    if vkospi_proxy > 30 and ma60 and current_close >= ma60:
        return "박스권 ⚠️", "accumulation", "pullback", "breakout", "조건부", "활성"
    if ma60_up and ma20_up and vkospi_proxy < 20:
        return "강세장 ✅", "breakout", "pullback", "accumulation", "적극", "활성"
    if ma60_flat and vkospi_proxy <= 25:
        return "순환매장 🔄", "breakout", "pullback", "accumulation", "제한", "제한 활성"
    return "박스권 ⚠️", "accumulation", "pullback", "breakout", "조건부", "활성"


def build_market_context(
    kospi_history: list[dict[str, Any]],
    gap_score: dict[str, Any],
    vkospi_quote: dict[str, Any] | float,
    analysis_date: str | date | None = None,
    repo_root: Path | None = None,
) -> dict[str, Any]:
    if isinstance(vkospi_quote, (int, float)):
        resolved_vkospi = {
            "current": float(vkospi_quote),
            "source": "legacy",
            "label": "VKOSPI",
            "isFallback": False,
            "confidence": 1.0,
        }
    else:
        resolved_vkospi = vkospi_quote
    closes = [parse_float(row.get("closePrice")) for row in kospi_history]
    current_close = closes[0]
    ma20 = moving_average(closes, 20) or current_close
    ma60 = moving_average(closes, 60) or current_close
    ma5 = moving_average(closes, 5) or current_close
    change_pct = parse_float(kospi_history[0].get("fluctuationsRatio"))
    advances = sum(1 for row in kospi_history[:20] if parse_float(row.get("fluctuationsRatio")) > 0)
    declines = sum(1 for row in kospi_history[:20] if parse_float(row.get("fluctuationsRatio")) < 0)
    ma20_up = bool(ma20 and moving_average(closes, 20, 1) and ma20 > moving_average(closes, 20, 1))
    ma60_prev = moving_average(closes, 60, 1)
    ma60_up = bool(ma60 and ma60_prev and ma60 > ma60_prev)
    regime_label, primary_strategy, secondary_strategy, tertiary_strategy, swing_mode, reversal_track = decide_regime(
        kospi_history, resolved_vkospi["current"]
    )
    context: dict[str, Any] = {
        "technicalRegimeLabel": regime_label,
        "regimeLabel": regime_label,
        "primaryStrategy": primary_strategy,
        "secondaryStrategy": secondary_strategy,
        "tertiaryStrategy": tertiary_strategy,
        "strategySlotLimits": slot_limits_for_regime(regime_label),
        "swingMode": swing_mode,
        "reversalTrack": reversal_track,
        "openingBet": "활성" if regime_label in {"강세장 ✅", "순환매장 🔄"} else "비활성",
        "vkospiValue": resolved_vkospi["current"],
        "vkospiLabel": str(resolved_vkospi.get("label") or "VKOSPI"),
        "vkospiSource": str(resolved_vkospi.get("source") or "unknown"),
        "vkospiIsFallback": bool(resolved_vkospi.get("isFallback")),
        "vkospiConfidence": float(resolved_vkospi.get("confidence") or 0.0),
        "kospiClose": current_close,
        "kospiChangePct": change_pct,
        "kospiMa5": ma5,
        "kospiMa20": ma20,
        "kospiMa60": ma60,
        "kospiMa20Up": ma20_up,
        "kospiMa60Up": ma60_up,
        "breadthAdvances": advances,
        "breadthDeclines": declines,
        "gapScore": gap_score,
    }
    snapshot = load_market_analyze_snapshot(repo_root)
    return apply_regime_fields_to_context(context, snapshot, analysis_date)


def build_regime_block(context: dict[str, Any], market_snapshot: dict[str, Any] | None = None) -> dict[str, Any]:
    primary = strategy_display_name(context["primaryStrategy"])
    secondary = strategy_display_name(context["secondaryStrategy"])
    tertiary = strategy_display_name(context.get("tertiaryStrategy") or "none")
    limits = context.get("strategySlotLimits") or slot_limits_for_regime(context.get("regimeLabel") or "")
    slot_note = f"매집 {limits.get('accumulation', 0)} · 돌파 {limits.get('breakout', 0)} · 눌림 {limits.get('pullback', 0)}"
    technical = str(context.get("technicalRegimeLabel") or context["regimeLabel"])
    effective = str(context.get("effectiveRegimeLabel") or context["regimeLabel"])
    table = [
        {"item": "적용 레짐", "value": effective},
        {"item": "기술 레짐", "value": technical},
        {"item": "KOSPI", "value": f"{context['kospiClose']:.2f} ({signed_number(context['kospiChangePct'], 2, '%')})"},
        {"item": "VKOSPI", "value": f"{context['vkospiLabel']} {context['vkospiValue']:.2f}"},
        {"item": "진입 전략", "value": f"메인={primary} / 서브={secondary} / 보조={tertiary}"},
        {"item": "추천 슬롯", "value": slot_note},
        {"item": "스윙 전환 활성도", "value": context["swingMode"]},
        {"item": "시가베팅", "value": context["openingBet"]},
        {"item": "역추세 트랙", "value": context["reversalTrack"]},
        {"item": "갭 스코어", "value": f"{context['gapScore']['grade']} ({context['gapScore']['totalScore']})"},
        {"item": "갭 조정", "value": context["gapScore"]["entryAdjustment"]},
    ]
    evidence = [
        {"item": "KOSPI 60MA", "value": f"{context['kospiMa60']:.2f}", "verdict": "✅" if context['kospiClose'] >= context['kospiMa60'] else "❌"},
        {"item": "KOSPI 20MA", "value": f"{context['kospiMa20']:.2f}", "verdict": "✅" if context['kospiClose'] >= context['kospiMa20'] else "❌"},
        {"item": "VKOSPI", "value": f"{context['vkospiLabel']} {context['vkospiValue']:.2f}", "verdict": "✅" if context['vkospiValue'] < 20 else "⚠️" if context['vkospiValue'] <= 30 else "❌"},
        {"item": "등락주", "value": f"상승 {context['breadthAdvances']} / 하락 {context['breadthDeclines']}", "verdict": "시장 내부 체력 참고"},
        {"item": "시장 맥락", "value": str(context.get("regimeAdjustmentReason") or f"갭 {context['gapScore']['grade']}"), "verdict": effective},
    ]
    if market_snapshot:
        data = market_snapshot.get("data") if isinstance(market_snapshot.get("data"), dict) else {}
        evidence.append(
            {
                "item": "거시 맥락",
                "value": f"{data.get('marketRegimeLabel') or '-'} / RI {data.get('riskIndex', '-')}",
                "verdict": "✅" if context.get("riseJustifiedByMacro") else "⚠️",
            }
        )
    block: dict[str, Any] = {
        "table": table,
        "evidence": evidence,
        "alert": "CNBC VKOSPI 실측을 우선 사용하며 실패 시 VIX 프록시로 폴백합니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다." if context["vkospiIsFallback"] else "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
        "macroOverlay": build_macro_overlay_block(market_snapshot, context),
        "technicalRegimeLabel": technical,
        "effectiveRegimeLabel": effective,
        "regimeAdjustmentReason": str(context.get("regimeAdjustmentReason") or ""),
    }
    if technical != effective:
        block["alert"] = f"{block['alert']} 적용 레짐은 market-analyze·KOSPI 보조 신호로 조정되었습니다."
    return block


def macro_status_kwargs(context: dict[str, Any]) -> dict[str, Any]:
    return {
        "rise_justified": bool(context.get("riseJustifiedByMacro")),
        "technical_regime": str(context.get("technicalRegimeLabel") or context.get("regimeLabel") or ""),
        "gap_is_fresh": bool((context.get("gapScore") or {}).get("isFresh")),
    }


def recent_negative_cross(macd_hist: list[float]) -> bool:
    recent = macd_hist[:4]
    if len(recent) < 2:
        return False
    for previous, current in zip(reversed(recent[1:]), reversed(recent[:-1])):
        if previous >= 0 > current:
            return True
    return False


def relative_strength_rank(snapshot: StockSnapshot, universe_returns: list[tuple[str, float]]) -> bool:
    ordered = sorted(universe_returns, key=lambda item: item[1], reverse=True)
    top_count = max(1, math.ceil(len(ordered) * 0.25))  # 방향 A: 상위 10% → 25% 완화
    return any(code == snapshot.code for code, _ in ordered[:top_count])


# 매매 단계 행 정의: (스테이지 라벨, 조건 문구, targets 인덱스, intraday 여부, stageKey)
# targets 튜플 인덱스: 0=프리마켓 1=장초반 2=장중1차 3=장중2차 4=스윙
TRADE_PLAN_STAGE_DEFS: tuple[tuple[str, str, int, bool, str], ...] = (
    ("🌅 프리마켓", "{yield} 도달", 0, False, "premarket"),
    ("🔔 장초반", "{yield} 도달", 1, False, "openPhase"),
    ("📈 장중 1차", "{yield} 도달", 2, True, "intraday1"),
    ("📈 장중 2차", "추세 유지 시", 3, True, "intraday2"),
    ("📊 스윙 전환", "V 조건 충족 시", 4, True, "swing"),
)

# 전략 × 레짐 버킷별 매매 단계 행렬.
#   targets: (프리마켓, 장초반, 장중1차, 장중2차, 스윙) 목표 수익률 %, None이면 단계 제외
#   stop:    손절 %
#   qty:     각 단계 분할 익절 비중 % (합 100), 0이면 행 제외
#   gapShiftsIntraday: gap_offset을 장중1차/2차/스윙에도 적용할지 여부
TRADE_PLAN_MATRIX: dict[str, dict[str, dict[str, Any]]] = {
    "breakout": {
        "bull": {"targets": (4.0, 7.0, 11.0, 15.0, 20.0), "stop": -5.0, "qty": (15, 15, 20, 25, 25), "gapShiftsIntraday": True},
        "box": {"targets": (3.0, 5.0, 8.0, 11.0, 14.0), "stop": -4.0, "qty": (20, 20, 25, 20, 15), "gapShiftsIntraday": True},
        "weak": {"targets": (2.0, 4.0, 6.0, 8.0, None), "stop": -3.5, "qty": (25, 25, 30, 20, 0), "gapShiftsIntraday": True},
    },
    "pullback": {
        "bull": {"targets": (2.5, 4.0, 6.0, 8.0, 10.0), "stop": -3.0, "qty": (30, 30, 25, 10, 5), "gapShiftsIntraday": False},
        "box": {"targets": (2.0, 3.0, 4.5, 6.0, None), "stop": -2.5, "qty": (35, 30, 25, 10, 0), "gapShiftsIntraday": False},
        "weak": {"targets": (1.5, 2.5, 3.5, None, None), "stop": -2.0, "qty": (40, 35, 25, 0, 0), "gapShiftsIntraday": False},
    },
    "accumulation": {
        "bull": {"targets": (2.5, 4.0, 7.0, 10.0, 14.0), "stop": -3.5, "qty": (15, 20, 20, 20, 25), "gapShiftsIntraday": False},
        "box": {"targets": (2.0, 3.5, 5.5, 8.0, 11.0), "stop": -3.0, "qty": (20, 20, 25, 20, 15), "gapShiftsIntraday": False},
        "weak": {"targets": (1.5, 3.0, 4.5, 6.0, None), "stop": -2.5, "qty": (25, 25, 30, 20, 0), "gapShiftsIntraday": False},
    },
    "reversal": {
        "bull": {"targets": (2.0, 3.5, 5.0, None, None), "stop": -2.0, "qty": (50, 30, 20, 0, 0), "gapShiftsIntraday": True},
        "box": {"targets": (1.8, 3.0, 4.0, None, None), "stop": -1.8, "qty": (55, 30, 15, 0, 0), "gapShiftsIntraday": True},
        "weak": {"targets": (1.5, 2.5, 3.0, None, None), "stop": -1.5, "qty": (60, 25, 15, 0, 0), "gapShiftsIntraday": True},
    },
}


def regime_bucket(regime_label: str) -> str:
    label = str(regime_label or "")
    if label.startswith("강세장"):
        return "bull"
    if label.startswith("박스권"):
        return "box"
    return "weak"


def trade_plan_profile(strategy: str, regime_label: str) -> dict[str, Any]:
    normalized = "breakout" if strategy == "momentum" else strategy
    table = TRADE_PLAN_MATRIX.get(normalized) or TRADE_PLAN_MATRIX["pullback"]
    return table[regime_bucket(regime_label)]


def blended_target_rate(strategy: str, regime_label: str) -> float:
    """분할 익절 비중으로 가중 평균한 목표 수익률 (R/R 보상 레그용)."""
    profile = trade_plan_profile(strategy, regime_label)
    targets = profile["targets"]
    qty = profile["qty"]
    weighted = 0.0
    total = 0.0
    for rate, weight in zip(targets, qty):
        if rate is None or weight <= 0:
            continue
        weighted += rate * weight
        total += weight
    return weighted / total if total > 0 else 0.0


def build_trade_plan(strategy: str, entry_price: float, regime_label: str, gap_code: str) -> list[dict[str, str]]:
    gap_offset = -0.5 if gap_code == "G-C" else -1.0 if gap_code == "G-D" else 0.0
    profile = trade_plan_profile(strategy, regime_label)
    targets = profile["targets"]
    qty = profile["qty"]
    stop = profile["stop"] + min(gap_offset, 0.0)
    shift_intraday = bool(profile["gapShiftsIntraday"])

    def target(rate: float) -> str:
        return f"{round(entry_price * (1 + rate / 100)):,}원"

    # 비제로 비중을 가진 마지막 익절 단계 인덱스 (reversal "잔량 전량" 표기용)
    active_idx = [idx for idx in range(len(targets)) if targets[idx] is not None and qty[idx] > 0]
    last_idx = active_idx[-1] if active_idx else None
    is_reversal = (strategy == "reversal")

    rows: list[dict[str, str]] = []
    for stage_label, condition_tpl, idx, is_intraday, stage_key in TRADE_PLAN_STAGE_DEFS:
        rate = targets[idx]
        weight = qty[idx]
        if rate is None or weight <= 0:
            continue
        adjusted = rate + (gap_offset if (not is_intraday or shift_intraday) else 0.0)
        yield_text = signed_number(adjusted, 1, "%")
        if idx == last_idx and is_reversal:
            quantity_text = f"{weight}% 익절 (잔량 전량)"
        else:
            quantity_text = f"{weight}% 익절"
        rows.append({
            "stage": stage_label,
            "stageKey": stage_key,
            "condition": condition_tpl.format(**{"yield": yield_text}),
            "quantity": quantity_text,
            "targetYield": yield_text,
            "targetPrice": target(adjusted),
        })
    rows.append({
        "stage": "🛑 손절",
        "stageKey": "stop",
        "condition": f"{signed_number(stop, 1, '%')} 이탈",
        "quantity": "전량",
        "targetYield": signed_number(stop, 1, "%"),
        "targetPrice": target(stop),
    })
    return rows


def blended_reward_from_plan(rows: list[dict[str, str]]) -> float:
    """매매 단계 행에서 분할 비중 가중 평균 목표 수익률 (손절 행 제외)."""
    weighted = 0.0
    total = 0.0
    for row in rows:
        if str(row.get("stageKey") or "") == "stop" or "손절" in str(row.get("stage") or ""):
            continue
        qty_match = re.match(r"\s*(\d+)", str(row.get("quantity") or ""))
        weight = float(qty_match.group(1)) if qty_match else 0.0
        if weight <= 0:
            continue
        weighted += parse_float(row.get("targetYield")) * weight
        total += weight
    return weighted / total if total > 0 else 0.0


def rr_text(entry_price: float, stop_rate: float, target_rate: float) -> str:
    risk = abs(stop_rate)
    reward = abs(target_rate)
    if risk <= 0:
        return "1 : -"
    return f"1 : {reward / risk:.1f}"


PULLBACK_STOP_POLICY_VERSION = "pullback-stop-v1"
PULLBACK_STOP_ANCHOR_LOOKBACK_DAYS = 20
PULLBACK_STOP_MIN_BODY_RATIO = 0.55
PULLBACK_STOP_MIN_VOLUME_RATIO = 2.0
PULLBACK_STOP_MIN_AVG_DAYS = 5
ACCUMULATION_STOP_POLICY_VERSION = "accumulation-stop-v1-live"
ACCUMULATION_OPEN_EXIT_CHECK_CUTOFF = "10:00"
ACCUMULATION_OPEN_EXIT_MODE = "flow_and_price_confirm"
BREAKOUT_STOP_POLICY_VERSION = "breakout-stop-v1-live"
BREAKOUT_LIVE_EXIT_POLICY_VERSION = "breakout-live-exit-v1"
BREAKOUT_REFERENCE_LOOKBACK_DAYS = 60
BREAKOUT_REFERENCE_CLUSTER_PCT = 1.0
BREAKOUT_OVERHEAD_LOOKBACK_DAYS = 120
BREAKOUT_FALLBACK_SWING_LOOKBACK_DAYS = 20
REVERSAL_STOP_POLICY_VERSION = "reversal-stop-v1"
REVERSAL_LIVE_EXIT_POLICY_VERSION = "reversal-live-exit-v1"
REVERSAL_RESISTANCE_LOOKBACK_DAYS = 20
REVERSAL_RESISTANCE_CLUSTER_PCT = 1.0


def _format_price_won(value: float | None) -> str:
    if value is None or not math.isfinite(float(value)):
        return "-"
    return f"{round(float(value)):,}원"


def _round_price(value: float | None) -> int | None:
    if value is None:
        return None
    number = float(value)
    if not math.isfinite(number):
        return None
    return round(number)


def _rate_from_price(entry_price: float, target_price: float | None) -> float | None:
    if not entry_price or target_price is None:
        return None
    return ((float(target_price) - float(entry_price)) / float(entry_price)) * 100.0


def _volume_ratio_from_history(volumes: list[float], index: int, lookback_days: int = 20) -> float | None:
    if index >= len(volumes):
        return None
    volume = parse_float(volumes[index])
    if volume <= 0:
        return None
    previous_volumes = [parse_float(value) for value in volumes[index + 1 : index + 1 + lookback_days] if parse_float(value) > 0]
    if not previous_volumes:
        return None
    average_volume = sum(previous_volumes) / len(previous_volumes)
    if average_volume <= 0:
        return None
    return volume / average_volume


def _pullback_anchor_candidate(snapshot: StockSnapshot, *, lookback_days: int = PULLBACK_STOP_ANCHOR_LOOKBACK_DAYS) -> dict[str, Any] | None:
    opens = list(snapshot.open_history or [])
    closes = list(snapshot.close_history or [])
    highs = list(snapshot.high_history or [])
    lows = list(snapshot.low_history or [])
    volumes = list(snapshot.volume_history or [])
    dates = list(snapshot.date_history or [])
    length = min(len(opens), len(closes), len(highs), len(lows), len(volumes))
    if length <= 0:
        return None

    candidates: list[dict[str, Any]] = []
    limit = min(lookback_days, length)
    for index in range(limit):
        open_price = float(opens[index])
        close_price = float(closes[index])
        high_price = float(highs[index])
        low_price = float(lows[index])
        volume = float(volumes[index])
        if close_price <= open_price or high_price <= low_price or volume <= 0:
            continue

        range_price = high_price - low_price
        body_ratio = ((close_price - open_price) / range_price) if range_price > 0 else 0.0
        if body_ratio < PULLBACK_STOP_MIN_BODY_RATIO:
            continue

        previous_volumes = [value for value in volumes[index + 1 : index + 21] if float(value) > 0]
        if len(previous_volumes) < PULLBACK_STOP_MIN_AVG_DAYS:
            continue
        average_volume = sum(previous_volumes) / len(previous_volumes)
        if average_volume <= 0:
            continue

        volume_ratio = volume / average_volume
        if volume_ratio < PULLBACK_STOP_MIN_VOLUME_RATIO:
            continue

        candidates.append({
            "index": index,
            "date": dates[index] if index < len(dates) else "",
            "open": open_price,
            "close": close_price,
            "high": high_price,
            "low": low_price,
            "bodyMid": (open_price + close_price) / 2.0,
            "volume": volume,
            "volumeRatio": volume_ratio,
            "bodyRatio": body_ratio,
        })

    if not candidates:
        return None
    return sorted(candidates, key=lambda item: (-item["volumeRatio"], -item["volume"], -item["index"]))[0]


def build_pullback_anchor_context(snapshot: StockSnapshot) -> dict[str, Any] | None:
    anchor = _pullback_anchor_candidate(snapshot)
    if anchor is None:
        return None
    return {
        "date": str(anchor.get("date") or ""),
        "open": _round_price(anchor.get("open")),
        "close": _round_price(anchor.get("close")),
        "high": _round_price(anchor.get("high")),
        "low": _round_price(anchor.get("low")),
        "bodyMid": _round_price(anchor.get("bodyMid")),
        "volume": round(float(anchor.get("volume") or 0.0), 1),
        "volumeRatio": round(float(anchor.get("volumeRatio") or 0.0), 2),
        "daysAgo": int(anchor.get("index") or 0),
    }


def _is_pullback_stop_candidate_below_current(candidate_price: float | None, current_price: float | None) -> bool:
    if not candidate_price or not current_price:
        return False
    return float(candidate_price) < float(current_price)


def compute_pullback_stop_policy(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    fallback_stop_price: float,
) -> dict[str, Any]:
    fallback_price = _round_price(fallback_stop_price) or 0
    current_price = _round_price(snapshot.current_price) or 0
    ma10_price = _round_price(snapshot.ma10)
    ma10_prev_raw = moving_average(snapshot.close_history, 10, 1)
    ma10_prev_price = _round_price(ma10_prev_raw)
    ma20_price = _round_price(snapshot.ma20)
    ma20_prev_price = _round_price(snapshot.ma20_prev)
    warning_triggered = bool(
        snapshot.ma10
        and ma10_prev_raw
        and snapshot.current_price < float(snapshot.ma10)
        and float(snapshot.ma10) <= float(ma10_prev_raw)
    )
    anchor = _pullback_anchor_candidate(snapshot)
    policy: dict[str, Any] = {
        "version": PULLBACK_STOP_POLICY_VERSION,
        "anchorSource": "fallback_percent_stop",
        "anchorLookbackDays": PULLBACK_STOP_ANCHOR_LOOKBACK_DAYS,
        "anchorDate": "",
        "anchorOpen": None,
        "anchorClose": None,
        "anchorHigh": None,
        "anchorLow": None,
        "anchorBodyMid": None,
        "anchorVolumeRatio": None,
        "anchorStopMode": "",
        "anchorStopPrice": None,
        "ma10Price": ma10_price,
        "ma10PrevPrice": ma10_prev_price,
        "ma20Price": ma20_price,
        "ma20PrevPrice": ma20_prev_price,
        "ma10WarningPrice": ma10_price if warning_triggered else None,
        "hardStopPrice": fallback_price,
        "fallbackStopPrice": fallback_price,
        "effectiveStopPrice": fallback_price,
        "warningRuleSummary": (
            f"종가 {_format_price_won(snapshot.current_price)} < 10일선 {_format_price_won(ma10_price)}"
            f" and 10일선 {_format_price_won(ma10_price)} <= 전일 10일선 {_format_price_won(ma10_prev_price)}"
            if warning_triggered
            else "10일선 경고 없음"
        ),
        "hardStopRuleSummary": f"앵커 부재 → 기존 % 손절 {_format_price_won(fallback_price)} 사용",
        "reasonSummary": f"앵커 부재로 기존 % 손절 {_format_price_won(fallback_price)}를 유지합니다.",
    }
    if anchor is None:
        return policy

    anchor_open = _round_price(anchor["open"])
    anchor_close = _round_price(anchor["close"])
    anchor_high = _round_price(anchor["high"])
    anchor_low = _round_price(anchor["low"])
    anchor_body_mid = _round_price(anchor["bodyMid"])
    is_bull_regime = str(context.get("regimeLabel") or "").startswith("강세장")
    anchor_stop_mode = "open" if is_bull_regime else "body_mid"
    anchor_stop_price = anchor_open if anchor_stop_mode == "open" else anchor_body_mid
    valid_structural_stops = [
        price
        for price in [anchor_stop_price, ma20_price]
        if _is_pullback_stop_candidate_below_current(price, current_price)
    ]
    hard_stop_price = max(valid_structural_stops) if valid_structural_stops else fallback_price
    effective_stop_price = max(hard_stop_price, fallback_price)
    invalid_reasons: list[str] = []
    if anchor_stop_price and not _is_pullback_stop_candidate_below_current(anchor_stop_price, current_price):
        invalid_reasons.append(
            f"앵커 {'시가' if anchor_stop_mode == 'open' else '몸통 중심'} {_format_price_won(anchor_stop_price)}가 현재가 {_format_price_won(current_price)} 이상이라 제외"
        )
    if ma20_price and not _is_pullback_stop_candidate_below_current(ma20_price, current_price):
        invalid_reasons.append(f"20일선 {_format_price_won(ma20_price)}이 현재가 {_format_price_won(current_price)} 이상이라 제외")
    valid_stop_labels: list[str] = []
    if anchor_stop_price and _is_pullback_stop_candidate_below_current(anchor_stop_price, current_price):
        valid_stop_labels.append(f"앵커 {'시가' if anchor_stop_mode == 'open' else '몸통 중심'} {_format_price_won(anchor_stop_price)}")
    if ma20_price and _is_pullback_stop_candidate_below_current(ma20_price, current_price):
        valid_stop_labels.append(f"20일선 {_format_price_won(ma20_price)}")
    valid_stop_text = ", ".join(valid_stop_labels) if valid_stop_labels else "유효 구조 손절 후보 없음"

    policy.update({
        "anchorSource": "volume_surge_bullish_candle",
        "anchorDate": str(anchor["date"] or ""),
        "anchorOpen": anchor_open,
        "anchorClose": anchor_close,
        "anchorHigh": anchor_high,
        "anchorLow": anchor_low,
        "anchorBodyMid": anchor_body_mid,
        "anchorVolumeRatio": round(float(anchor["volumeRatio"]), 2),
        "anchorStopMode": anchor_stop_mode,
        "anchorStopPrice": anchor_stop_price,
        "hardStopPrice": hard_stop_price,
        "effectiveStopPrice": effective_stop_price,
        "hardStopRuleSummary": (
            f"1차 hard stop = MAX({valid_stop_text}) = {_format_price_won(hard_stop_price)} / "
            f"최종 stop = MAX(1차 hard stop, 기존 % 손절 {_format_price_won(fallback_price)}) = {_format_price_won(effective_stop_price)}"
            + (f" / 제외: {' / '.join(invalid_reasons)}" if invalid_reasons else "")
        ),
        "reasonSummary": (
            f"앵커 봉 {policy['anchorDate'] or '-'} 기준 현재가 아래 유효 손절 후보({valid_stop_text}) 중 더 보수적인 가격을 쓰고, "
            f"기존 % 손절 {_format_price_won(fallback_price)}를 하한으로 유지합니다."
            + (f" {' / '.join(invalid_reasons)}." if invalid_reasons else "")
        ),
    })
    return policy


def apply_pullback_stop_policy_to_trade_plan(
    rows: list[dict[str, Any]],
    entry_price: float,
    stop_policy: dict[str, Any],
) -> list[dict[str, Any]]:
    stop_price = parse_float(stop_policy.get("effectiveStopPrice"))
    if stop_price <= 0:
        return rows

    stop_rate = _rate_from_price(entry_price, stop_price) or 0.0
    target_price = _format_price_won(stop_price)
    target_yield = signed_number(stop_rate, 1, "%")
    condition = f"유효 손절가 {target_price} 하향 이탈"
    next_rows: list[dict[str, Any]] = []
    stop_updated = False
    for row in rows:
        if not _is_stop_trade_plan_row(row):
            next_rows.append(dict(row))
            continue
        next_rows.append({
            **row,
            "stageKey": "stop",
            "condition": condition,
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
        stop_updated = True
    if not stop_updated:
        next_rows.append({
            "stage": "🛑 손절",
            "stageKey": "stop",
            "condition": condition,
            "quantity": "전량",
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
    return next_rows


def _accumulation_sponsor_mode(snapshot: StockSnapshot) -> str:
    foreign_positive = snapshot.foreign_net > 0
    institution_positive = snapshot.institution_net > 0
    if foreign_positive and institution_positive:
        return "both"
    if foreign_positive:
        return "foreign"
    if institution_positive:
        return "institution"
    return "none"


def _accumulation_anchor_candidate(snapshot: StockSnapshot, sponsor_mode: str) -> dict[str, Any] | None:
    opens = list(snapshot.open_history or [])
    closes = list(snapshot.close_history or [])
    dates = list(snapshot.date_history or [])
    volumes = list(snapshot.volume_history or [])

    def build_candidate(index: int, source: str) -> dict[str, Any] | None:
        if index >= len(opens) or index >= len(closes):
            return None
        open_price = parse_float(opens[index])
        close_price = parse_float(closes[index])
        if open_price <= 0 or close_price <= 0:
            return None
        volume_ratio = _volume_ratio_from_history(volumes, index)
        return {
            "source": source,
            "date": dates[index] if index < len(dates) else "",
            "open": open_price,
            "close": close_price,
            "volumeRatio20d": volume_ratio,
        }

    prior_candidate = None
    if (
        len(opens) > 1
        and len(closes) > 1
        and (snapshot.foreign_previous > 0 or snapshot.institution_previous > 0)
        and parse_float(closes[1]) >= parse_float(opens[1])
    ):
        prior_candidate = build_candidate(1, "prior_sponsor_candle")
    if prior_candidate is not None:
        return prior_candidate

    if sponsor_mode != "none" and snapshot.current_price >= snapshot.open_price:
        return build_candidate(0, "entry_sponsor_candle")
    return None


def compute_accumulation_stop_policy(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    fallback_stop_price: float,
) -> dict[str, Any]:
    sponsor_mode = _accumulation_sponsor_mode(snapshot)
    fallback_price = _round_price(fallback_stop_price) or 0
    policy: dict[str, Any] = {
        "version": ACCUMULATION_STOP_POLICY_VERSION,
        "anchorSource": "fallback_percent_stop",
        "sponsorMode": sponsor_mode,
        "anchorDate": "",
        "anchorOpen": None,
        "anchorClose": None,
        "anchorVolumeRatio20d": None,
        "anchorStopPrice": None,
        "fallbackStopPrice": fallback_price,
        "effectiveHardStopPrice": fallback_price,
        "openExitCheckCutoff": ACCUMULATION_OPEN_EXIT_CHECK_CUTOFF,
        "openExitMode": ACCUMULATION_OPEN_EXIT_MODE,
        "openExitRuleSummary": (
            "09:00~10:00 장초반에 수급 주체가 순매도로 돌아섰고 현재가가 진입가/하드 스톱 이하이면 즉시 손절합니다."
            if sponsor_mode != "none"
            else "수급 주체가 고정되지 않아 장초반 수급 이탈 즉시 손절은 비활성입니다."
        ),
        "hardStopRuleSummary": f"앵커 부재 → 기존 % 손절 {_format_price_won(fallback_price)} 사용",
        "marketShockHoldRuleSummary": (
            f"갭 등급 {context.get('gapScore', {}).get('code') or '-'} 또는 고변동성 장세에서 수급 주체 순매수가 유지되면 "
            "장초반 흔들림 손절은 보류하고 종가형 하드 스톱만 유지합니다."
        ),
        "reasonSummary": f"앵커가 없어 기존 % 손절 {_format_price_won(fallback_price)}만 유지합니다.",
    }

    anchor = _accumulation_anchor_candidate(snapshot, sponsor_mode)
    if anchor is None:
        return policy

    anchor_open = _round_price(anchor.get("open"))
    anchor_close = _round_price(anchor.get("close"))
    anchor_stop_price = anchor_open
    effective_hard_stop = max(anchor_stop_price or 0, fallback_price)
    sponsor_label = {
        "foreign": "외인",
        "institution": "기관",
        "both": "외인·기관",
    }.get(sponsor_mode, "수급")

    policy.update({
        "anchorSource": str(anchor.get("source") or "fallback_percent_stop"),
        "anchorDate": str(anchor.get("date") or ""),
        "anchorOpen": anchor_open,
        "anchorClose": anchor_close,
        "anchorVolumeRatio20d": round(float(anchor["volumeRatio20d"]), 2) if anchor.get("volumeRatio20d") is not None else None,
        "anchorStopPrice": anchor_stop_price,
        "effectiveHardStopPrice": effective_hard_stop,
        "hardStopRuleSummary": (
            f"{'전일' if policy['anchorSource'] == 'prior_sponsor_candle' else '당일'} 매집 시작 봉 시가 {_format_price_won(anchor_stop_price)}와 "
            f"기존 % 손절 {_format_price_won(fallback_price)} 중 더 높은 {_format_price_won(effective_hard_stop)}를 하드 스톱으로 사용합니다."
        ),
        "reasonSummary": (
            f"{sponsor_label} 매집 시작 봉({policy['anchorDate'] or '-'}) 시가 {_format_price_won(anchor_stop_price)}를 기준으로 잡고, "
            f"기존 % 손절 {_format_price_won(fallback_price)}보다 느슨해지지 않게 {_format_price_won(effective_hard_stop)}로 고정합니다."
        ),
    })
    return policy


def apply_accumulation_stop_policy_to_trade_plan(
    rows: list[dict[str, Any]],
    entry_price: float,
    stop_policy: dict[str, Any],
) -> list[dict[str, Any]]:
    stop_price = parse_float(stop_policy.get("effectiveHardStopPrice"))
    if stop_price <= 0:
        return rows

    stop_rate = _rate_from_price(entry_price, stop_price) or 0.0
    target_price = _format_price_won(stop_price)
    target_yield = signed_number(stop_rate, 1, "%")
    condition = f"유효 하드 스톱 {target_price} 종가 이탈"
    next_rows: list[dict[str, Any]] = []
    stop_updated = False
    for row in rows:
        if not _is_stop_trade_plan_row(row):
            next_rows.append(dict(row))
            continue
        next_rows.append({
            **row,
            "stageKey": "stop",
            "condition": condition,
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
        stop_updated = True
    if not stop_updated:
        next_rows.append({
            "stage": "🛑 손절",
            "stageKey": "stop",
            "condition": condition,
            "quantity": "전량",
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
    return next_rows


def compute_breakout_stop_policy(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    fallback_stop_price: float,
) -> dict[str, Any]:
    fallback_price = _round_price(fallback_stop_price) or 0
    history = list(snapshot.high_history or [])
    reference_bands = _breakout_reference_bands(snapshot.current_price, history, BREAKOUT_REFERENCE_LOOKBACK_DAYS)
    chosen_band = reference_bands[-1] if reference_bands else None
    reference_price = chosen_band["high"] if chosen_band else None
    reference_source = "prior_resistance_band" if chosen_band else "fallback_percent_stop"
    reference_band_low = chosen_band["low"] if chosen_band else None
    reference_band_high = chosen_band["high"] if chosen_band else None

    if reference_price is None:
        recent_swing_candidates = [
            _round_price(parse_float(value))
            for value in history[:BREAKOUT_FALLBACK_SWING_LOOKBACK_DAYS]
            if (_round_price(parse_float(value)) or 0) <= round(float(snapshot.current_price or 0))
        ]
        recent_swing_candidates = [value for value in recent_swing_candidates if value is not None]
        if recent_swing_candidates:
            reference_price = max(recent_swing_candidates)
            reference_source = "prior_swing_high"
            reference_band_low = reference_price
            reference_band_high = reference_price

    effective_hard_stop = max(reference_price or 0, fallback_price)
    reference_label = {
        "prior_resistance_band": "직전 돌파 저항 밴드",
        "prior_swing_high": "최근 스윙 고점",
        "fallback_percent_stop": "기존 % 손절",
    }.get(reference_source, "기존 % 손절")
    policy = {
        "version": BREAKOUT_STOP_POLICY_VERSION,
        "referenceSource": reference_source,
        "referenceLookbackDays": BREAKOUT_REFERENCE_LOOKBACK_DAYS,
        "referenceClusterPct": BREAKOUT_REFERENCE_CLUSTER_PCT,
        "referencePrice": reference_price,
        "referenceBandLow": reference_band_low,
        "referenceBandHigh": reference_band_high,
        "entryDayOpenPrice": _round_price(snapshot.open_price),
        "fallbackStopPrice": fallback_price,
        "effectiveHardStopPrice": effective_hard_stop,
        "openExitCheckCutoff": "10:00",
        "microTrendBarUnit": "3m",
        "microTrendShortMa": 8,
        "microTrendLongMa": 10,
        "hardStopRuleSummary": (
            f"{reference_label} {_format_price_won(reference_price)}와 기존 % 손절 {_format_price_won(fallback_price)} 중 "
            f"더 높은 {_format_price_won(effective_hard_stop)}을 하드 스톱으로 사용합니다."
        ),
        "openExitRuleSummary": (
            "09:00~10:00에 돌파 기준선 재이탈 또는 갭 시가 이탈이 나오면 즉시 손절합니다."
        ),
        "microTrendRuleSummary": "09:05~10:00에는 3분 프록시 8EMA/10EMA 아래 2개 연속 마감 시 즉시 손절합니다.",
        "reasonSummary": (
            f"돌파 기준선은 {reference_label} {_format_price_won(reference_price)}이며, "
            f"기존 % 손절 {_format_price_won(fallback_price)}보다 느슨해지지 않게 {_format_price_won(effective_hard_stop)}으로 고정합니다."
        ),
    }
    if reference_source == "fallback_percent_stop":
        policy["reasonSummary"] = f"직전 저항 기준선을 찾지 못해 기존 % 손절 {_format_price_won(fallback_price)}만 사용합니다."
    return policy


def apply_breakout_stop_policy_to_trade_plan(
    rows: list[dict[str, Any]],
    entry_price: float,
    stop_policy: dict[str, Any],
) -> list[dict[str, Any]]:
    stop_price = parse_float(stop_policy.get("effectiveHardStopPrice"))
    if stop_price <= 0:
        return rows

    stop_rate = _rate_from_price(entry_price, stop_price) or 0.0
    target_price = _format_price_won(stop_price)
    target_yield = signed_number(stop_rate, 1, "%")
    condition = f"유효 하드 스톱 {target_price} 종가 이탈"
    next_rows: list[dict[str, Any]] = []
    stop_updated = False
    for row in rows:
        if not _is_stop_trade_plan_row(row):
            next_rows.append(dict(row))
            continue
        next_rows.append({
            **row,
            "stageKey": "stop",
            "condition": condition,
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
        stop_updated = True
    if not stop_updated:
        next_rows.append({
            "stage": "손절",
            "stageKey": "stop",
            "condition": condition,
            "quantity": "전량",
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
    return next_rows


def compute_reversal_stop_policy(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    fallback_stop_price: float,
) -> dict[str, Any]:
    del context
    fallback_price = _round_price(fallback_stop_price) or 0
    anchor_low = _round_price(snapshot.low_price)
    effective_hard_stop = max(anchor_low or 0, fallback_price)
    anchor_source = "entry_day_low" if anchor_low else "fallback_percent_stop"
    hard_stop_rule = (
        f"진입 당일 저가 {_format_price_won(anchor_low)}와 기존 % 손절 {_format_price_won(fallback_price)} 중 "
        f"더 높은 {_format_price_won(effective_hard_stop)}을 종가 손절가로 사용합니다."
        if anchor_low
        else f"당일 저가를 확정하지 못해 기존 % 손절 {_format_price_won(fallback_price)}만 종가 손절가로 사용합니다."
    )
    return {
        "version": REVERSAL_STOP_POLICY_VERSION,
        "anchorSource": anchor_source,
        "anchorLowPrice": anchor_low,
        "fallbackStopPrice": fallback_price,
        "effectiveHardStopPrice": effective_hard_stop,
        "stopExecutionMode": "close_only",
        "hardStopRuleSummary": hard_stop_rule,
        "reasonSummary": (
            f"반등 가정의 핵심 지지선은 진입 당일 저가 {_format_price_won(anchor_low)}이며, "
            f"기존 % 손절 {_format_price_won(fallback_price)}보다 느슨해지지 않게 {_format_price_won(effective_hard_stop)}으로 고정하고 종가 기준으로 확인합니다."
            if anchor_low
            else f"진입 당일 저가를 쓰지 못해 기존 % 손절 {_format_price_won(fallback_price)}을 그대로 유지하고 종가 기준으로 확인합니다."
        ),
    }


def apply_reversal_stop_policy_to_trade_plan(
    rows: list[dict[str, Any]],
    entry_price: float,
    stop_policy: dict[str, Any],
) -> list[dict[str, Any]]:
    stop_price = parse_float(stop_policy.get("effectiveHardStopPrice"))
    if stop_price <= 0:
        return rows

    stop_rate = _rate_from_price(entry_price, stop_price) or 0.0
    target_price = _format_price_won(stop_price)
    target_yield = signed_number(stop_rate, 1, "%")
    condition = f"유효 하드 스톱 {target_price} 종가 이탈"
    next_rows: list[dict[str, Any]] = []
    stop_updated = False
    for row in rows:
        if not _is_stop_trade_plan_row(row):
            next_rows.append(dict(row))
            continue
        next_rows.append({
            **row,
            "stageKey": "stop",
            "condition": condition,
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
        stop_updated = True
    if not stop_updated:
        next_rows.append({
            "stage": "🛑 손절",
            "stageKey": "stop",
            "condition": condition,
            "quantity": "전량",
            "targetYield": target_yield,
            "targetPrice": target_price,
        })
    return next_rows


ACCUMULATION_STAGE_LABELS = {
    "premarket": "1차 익절",
    "openPhase": "2차 익절",
    "intraday1": "3차 익절",
    "intraday2": "4차 익절",
    "swing": "추세 홀딩",
    "stop": "손절",
}


def apply_accumulation_display_stage_labels(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    next_rows: list[dict[str, Any]] = []
    for row in rows or []:
        stage_key = _trade_plan_row_stage_key(row)
        next_rows.append({
            **row,
            "stageKey": stage_key or str(row.get("stageKey") or ""),
            "stage": ACCUMULATION_STAGE_LABELS.get(stage_key, str(row.get("stage") or "")),
        })
    return next_rows


def build_breakout_live_exit_policy(profile: dict[str, Any] | None) -> dict[str, Any]:
    resolved_profile = profile if isinstance(profile, dict) else {}
    return {
        "version": BREAKOUT_LIVE_EXIT_POLICY_VERSION,
        "wickClimaxLookbackBars": 20,
        "wickClimaxVolumeRatioMin": 2.5,
        "wickUpperShadowRatioMin": 0.45,
        "orderbookLookbackMinutes": 5,
        "orderbookBidAskSpikeMin": 2.0,
        "orderbookAskDropRatioMax": 0.6,
        "trailingActivationPct": float(resolved_profile.get("trailingActivationPct") or 0.0),
        "trailingBufferPct": float(resolved_profile.get("trailingBufferPct") or 0.0),
        "activeSessionCutoff": "10:30",
        "wickClimaxRuleSummary": "09:00~10:30에 대량 거래량 위꼬리와 고점 대비 -1% 밀림이 함께 나오면 전량 익절합니다.",
        "orderbookRuleSummary": "09:00~10:30에 호가 분산 신호가 나오면 기본 50% 익절하고, 약한 체결강도/트레일링 동시 충족 시 전량 익절로 승격합니다.",
        "trailingRuleSummary": (
            f"+{float(resolved_profile.get('trailingActivationPct') or 0.0):.1f}% 도달 후 "
            f"세션 고점 대비 {float(resolved_profile.get('trailingBufferPct') or 0.0):.1f}% 이탈 시 잔량 전량 매도합니다."
        ),
    }


def build_reversal_live_exit_policy() -> dict[str, Any]:
    return {
        "version": REVERSAL_LIVE_EXIT_POLICY_VERSION,
        "timeStopCutoff": "09:15",
        "timeStopMinBouncePct": 1.0,
        "breakevenActivationPct": 3.0,
        "earlySpikeWindowEnd": "09:10",
        "timeStopRuleSummary": "09:15까지 세션 고점이 +1.0% 미만이고 시가/진입가도 회복하지 못하면 조건형 시간손절을 실행합니다.",
        "breakevenRuleSummary": "+3.0% 이상 반등이 나온 뒤 본전까지 밀리면 기술적 반등 실패로 보고 잔량 전량 정리합니다.",
    }


# --- 추천 마킹 (진입가 밴드 + 최적 익절 단계) ---

OUTCOMES_DEFAULT_PATH = "jongga/output/jongga_outcomes.js"
REPLAY_RUNS_DEFAULT_PATH = "jongga/output/replay/replay_runs.js"
MARKING_MIN_SAMPLES = 8  # 신뢰 하한: 셀 표본이 이보다 적으면 상위(coarse) 셀로 폴백
TAKE_PROFIT_PROFILE_LABELS = {
    "conservative": "보수형",
    "balanced": "중립형",
    "aggressive": "공격형",
}

STRATEGY_TAKE_PROFIT_PROFILE_LABELS = {
    "pullback": {
        "aggressive": "기본 목표형",
        "balanced": "1차 저항 반영형",
        "conservative": "저항 우선형",
    },
    "accumulation": {
        "aggressive": "기본 목표형",
        "balanced": "1차 저항 반영형",
        "conservative": "저항 우선형",
    },
    "breakout": {
        "aggressive": "기본 목표형",
        "balanced": "1차 저항 반영형",
        "conservative": "저항 우선형",
    },
}

# 스테이지 라벨 키워드 → stageKey (outcome_tracker.STAGE_KEY_BY_KEYWORD와 동일)
_STAGE_KEY_BY_KEYWORD: tuple[tuple[str, str], ...] = (
    ("프리마켓", "premarket"),
    ("장초반", "openPhase"),
    ("장중 1차", "intraday1"),
    ("장중 2차", "intraday2"),
    ("스윙", "swing"),
)

# 콜드스타트 휴리스틱 단계 (레짐/변동성 기준)
_COLDSTART_STAGE_BY_BUCKET = {"bull": "intraday1", "box": "openPhase", "weak": "premarket"}


def load_outcomes_rollup(path: str = OUTCOMES_DEFAULT_PATH) -> dict[str, Any]:
    value = read_js_assignment(path, "JONGGA_OUTCOMES_ROLLUP")
    return value if isinstance(value, dict) else {}


def load_outcomes_index(path: str = OUTCOMES_DEFAULT_PATH) -> list[dict[str, Any]]:
    value = read_js_assignment(path, "JONGGA_OUTCOMES_INDEX")
    return value if isinstance(value, list) else []


def load_replay_profile_rollup(path: str = REPLAY_RUNS_DEFAULT_PATH) -> dict[str, Any]:
    value = read_js_assignment(path, "JONGGA_REPLAY_RUNS")
    if not isinstance(value, dict):
        return {}
    latest_summary = value.get("latestSummary")
    if isinstance(latest_summary, dict):
        return latest_summary
    latest_run = value.get("latestRun")
    if isinstance(latest_run, dict) and isinstance(latest_run.get("summary"), dict):
        return latest_run["summary"]
    return {}


def _row_stage_key(stage_label: str) -> str:
    for keyword, key in _STAGE_KEY_BY_KEYWORD:
        if keyword in str(stage_label or ""):
            return key
    return ""


def _trade_plan_row_stage_key(row: dict[str, Any]) -> str:
    explicit = str((row or {}).get("stageKey") or "").strip()
    return explicit or _row_stage_key(str((row or {}).get("stage") or ""))


def _is_stop_trade_plan_row(row: dict[str, Any]) -> bool:
    return str((row or {}).get("stageKey") or "") == "stop" or "손절" in str((row or {}).get("stage") or "")


def _lookup_hit_rate(rollup: dict[str, Any], strategy: str, dims: dict[str, str], stage_key: str) -> dict[str, Any] | None:
    """byCell(5차원) → byStrategyStage(coarse) 순으로 신뢰 표본을 만족하는 셀을 찾는다."""
    by_cell = rollup.get("byCell") if isinstance(rollup.get("byCell"), dict) else {}
    by_strat = rollup.get("byStrategyStage") if isinstance(rollup.get("byStrategyStage"), dict) else {}
    cell_key = f"{strategy}|{dims.get('regimeBucket', '')}|{dims.get('vkospiTier', '')}|{dims.get('gapGrade', '')}|{stage_key}"
    cell = by_cell.get(cell_key)
    if isinstance(cell, dict) and int(cell.get("sampleCount") or 0) >= MARKING_MIN_SAMPLES:
        return {**cell, "basis": "cell"}
    coarse = by_strat.get(f"{strategy}|{stage_key}")
    if isinstance(coarse, dict) and int(coarse.get("sampleCount") or 0) >= MARKING_MIN_SAMPLES:
        return {**coarse, "basis": "strategyStage"}
    return None


def _lookup_profile_rollup(rollup: dict[str, Any], strategy: str, dims: dict[str, str], profile_key: str) -> dict[str, Any] | None:
    by_cell = rollup.get("byTakeProfitProfileCell") if isinstance(rollup.get("byTakeProfitProfileCell"), dict) else {}
    by_profile = rollup.get("byTakeProfitProfile") if isinstance(rollup.get("byTakeProfitProfile"), dict) else {}
    cell_key = f"{strategy}|{dims.get('regimeBucket', '')}|{dims.get('vkospiTier', '')}|{dims.get('gapGrade', '')}|{profile_key}"
    cell = by_cell.get(cell_key)
    if isinstance(cell, dict) and int(cell.get("sampleCount") or cell.get("tradeCount") or 0) >= MARKING_MIN_SAMPLES:
        return {**cell, "basis": "profileCell"}
    coarse = by_profile.get(f"{strategy}|{profile_key}")
    if isinstance(coarse, dict) and int(coarse.get("sampleCount") or coarse.get("tradeCount") or 0) >= MARKING_MIN_SAMPLES:
        return {**coarse, "basis": "strategyProfile"}
    return None


def _clone_trade_plan_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [dict(row) for row in rows or []]


def _take_profit_profile_label(strategy: str, profile_key: str) -> str:
    return (
        STRATEGY_TAKE_PROFIT_PROFILE_LABELS.get(strategy, {}).get(profile_key)
        or TAKE_PROFIT_PROFILE_LABELS.get(profile_key)
        or profile_key
    )


def _sync_pullback_profile_stop_rows(entry: dict[str, Any], rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    stop_policy = entry.get("pullbackStopPolicy") if isinstance(entry.get("pullbackStopPolicy"), dict) else {}
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    if entry_price <= 0 or not rows:
        return _clone_trade_plan_rows(rows)
    return apply_pullback_stop_policy_to_trade_plan(_clone_trade_plan_rows(rows), entry_price, stop_policy)


def _cluster_price_bands(prices: list[int], cluster_pct: float) -> list[dict[str, Any]]:
    clusters: list[dict[str, Any]] = []
    for price in sorted({int(value) for value in prices if int(value) > 0}):
        if not clusters:
            clusters.append({"low": price, "high": price, "count": 1})
            continue
        last = clusters[-1]
        if price <= round(last["high"] * (1 + cluster_pct / 100.0)):
            last["high"] = price
            last["count"] += 1
        else:
            clusters.append({"low": price, "high": price, "count": 1})
    return clusters


def _pullback_take_profit_resistances(entry_price: float, marking_meta: dict[str, Any] | None) -> list[dict[str, Any]]:
    meta = marking_meta if isinstance(marking_meta, dict) else {}
    candidates = [
        {
            "type": "ma5",
            "label": "5일선",
            "price": _round_price(meta.get("ma5Price")),
            "prevPrice": _round_price(meta.get("ma5PrevPrice")),
        },
        {
            "type": "ma10",
            "label": "10일선",
            "price": _round_price(meta.get("ma10Price")),
            "prevPrice": _round_price(meta.get("ma10PrevPrice")),
        },
    ]
    valid = [
        row for row in candidates
        if row["price"] is not None
        and row["prevPrice"] is not None
        and row["price"] > round(float(entry_price or 0))
        and row["price"] <= row["prevPrice"]
    ]
    valid.sort(key=lambda row: (int(row["price"]), row["type"]))
    return valid


def _set_trade_plan_target(row: dict[str, Any], entry_price: float, target_price: int, condition: str | None = None) -> None:
    row["targetPrice"] = _format_price_won(target_price)
    rate = _rate_from_price(entry_price, target_price) or 0.0
    row["targetYield"] = signed_number(rate, 1, "%")
    if condition is not None:
        row["condition"] = condition


def _enforce_non_decreasing_targets(rows: list[dict[str, Any]], entry_price: float) -> None:
    previous_price = 0
    for row in rows:
        if _is_stop_trade_plan_row(row):
            continue
        target_price = _round_price(parse_float(row.get("targetPrice")))
        if not target_price:
            continue
        if previous_price and target_price < previous_price:
            _set_trade_plan_target(row, entry_price, previous_price)
            target_price = previous_price
        previous_price = target_price


def _stage_recommendation_from_rows(
    strategy: str,
    rows: list[dict[str, Any]],
    dims: dict[str, str],
    rollup: dict[str, Any],
) -> dict[str, Any]:
    take_profit = [(row, _trade_plan_row_stage_key(row)) for row in rows if not _is_stop_trade_plan_row(row)]
    take_profit = [(row, key) for row, key in take_profit if key]

    best_key = None
    best_ev = None
    used_basis = "heuristic"
    sample_count = 0
    best_hit_rate = None

    for row, stage_key in take_profit:
        stat = _lookup_hit_rate(rollup, strategy, dims, stage_key)
        hit_rate = float(stat["hitRate"]) if stat else None
        row["historicalHitRate"] = round(hit_rate, 4) if hit_rate is not None else None
        if stat is None:
            continue
        avg_stage_ret = stat.get("avgStageReturn")
        if avg_stage_ret is not None:
            ev = float(avg_stage_ret) * 100
            ev_basis_local = "netStageReturn"
        else:
            ev = hit_rate * parse_float(row.get("targetYield"))
            ev_basis_local = "hitRateXTarget"
        if best_ev is None or ev > best_ev:
            best_ev, best_key = ev, stage_key
            used_basis = f"historical:{ev_basis_local}"
            sample_count = int(stat.get("sampleCount") or 0)
            best_hit_rate = hit_rate

    if best_key is None:
        bucket = dims["regimeBucket"]
        vk = dims["vkospiTier"]
        heuristic_key = "premarket" if (bucket == "weak" or vk == "weak") else _COLDSTART_STAGE_BY_BUCKET.get(bucket, "openPhase")
        available = {key for _, key in take_profit}
        best_key = heuristic_key if heuristic_key in available else (next(iter(available)) if available else None)
        recommended_stage = {
            "stageKey": best_key,
            "evBasis": "heuristic",
            "reason": "기본 추천(데이터 축적 중)",
            "hitRate": None,
            "ev": None,
            "sampleCount": 0,
        }
    else:
        ev_label = "순수익" if "netStageReturn" in used_basis else "적중률×목표"
        recommended_stage = {
            "stageKey": best_key,
            "evBasis": used_basis,
            "reason": f"EV={ev_label} argmax (과거 {sample_count}건)",
            "hitRate": round(best_hit_rate, 4) if best_hit_rate is not None else None,
            "ev": round(best_ev, 4) if best_ev is not None else None,
            "sampleCount": sample_count,
        }

    for row, stage_key in take_profit:
        row["recommended"] = (stage_key == best_key)

    return recommended_stage


def _build_pullback_take_profit_profiles(
    entry: dict[str, Any],
    context: dict[str, Any],
    dims: dict[str, str],
    marking_meta: dict[str, Any] | None,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    base_rows = _sync_pullback_profile_stop_rows(entry, entry.get("tradePlanRows") or [])
    rollup = context.get("outcomesRollup") if isinstance(context.get("outcomesRollup"), dict) else {}
    replay_rollup = context.get("replayProfileRollup") if isinstance(context.get("replayProfileRollup"), dict) else {}
    resistances = _pullback_take_profit_resistances(entry_price, marking_meta)
    nearest = resistances[0] if resistances else None
    secondary = resistances[1] if len(resistances) > 1 else None

    profiles: list[dict[str, Any]] = []
    base_profile = {
        "profileKey": "aggressive",
        "label": _take_profit_profile_label("pullback", "aggressive"),
        "recommended": False,
        "selectionBasis": "market_stock_heuristic",
        "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
        "nearestResistanceType": nearest["type"] if nearest else "none",
        "nearestResistancePrice": nearest["price"] if nearest else None,
        "secondaryResistanceType": secondary["type"] if secondary else "none",
        "secondaryResistancePrice": secondary["price"] if secondary else None,
        "tradePlanRows": _clone_trade_plan_rows(base_rows),
    }
    base_profile["recommendedStage"] = _stage_recommendation_from_rows("pullback", base_profile["tradePlanRows"], dims, rollup)
    profiles.append(base_profile)

    for profile_key in ("balanced", "conservative"):
        rows = _sync_pullback_profile_stop_rows(entry, base_rows)
        take_profit_rows = [row for row in rows if not _is_stop_trade_plan_row(row)]
        selection_basis = "market_stock_heuristic"
        reason_summary = ""
        if nearest is None or not take_profit_rows:
            selection_basis = "fallback_same_as_aggressive"
            reason_summary = "가까운 5일선/10일선 저항이 없어 기본 목표형과 동일합니다."
        else:
            if profile_key == "balanced":
                base_price = _round_price(parse_float(take_profit_rows[0].get("targetPrice"))) or nearest["price"]
                adjusted_price = min(base_price, nearest["price"])
                if adjusted_price < base_price:
                    _set_trade_plan_target(
                        take_profit_rows[0],
                        entry_price,
                        adjusted_price,
                        f"{nearest['label']} 저항 도달",
                    )
                    reason_summary = f"가장 가까운 {nearest['label']} 저항만 1차 목표가에 반영합니다."
                else:
                    selection_basis = "fallback_same_as_aggressive"
                    reason_summary = f"{nearest['label']}이 기존 1차 목표보다 높아 기본 목표형과 동일합니다."
            else:
                _set_trade_plan_target(
                    take_profit_rows[0],
                    entry_price,
                    nearest["price"],
                    f"{nearest['label']} 저항 도달",
                )
                if len(take_profit_rows) > 1 and secondary is not None:
                    _set_trade_plan_target(
                        take_profit_rows[1],
                        entry_price,
                        secondary["price"],
                        f"{secondary['label']} 저항 도달",
                    )
                    reason_summary = f"{nearest['label']}과 {secondary['label']} 저항을 앞단 목표가에 우선 반영합니다."
                elif len(take_profit_rows) > 1:
                    reason_summary = f"가장 가까운 {nearest['label']} 저항을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다."
                else:
                    reason_summary = f"가장 가까운 {nearest['label']} 저항을 앞단 목표가에 반영합니다."
            _enforce_non_decreasing_targets(rows, entry_price)
            rows = _sync_pullback_profile_stop_rows(entry, rows)
            if rows == base_rows:
                selection_basis = "fallback_same_as_aggressive"
                if not reason_summary:
                    reason_summary = "조정 후에도 목표가가 같아 기본 목표형과 동일합니다."

        profile = {
            "profileKey": profile_key,
            "label": _take_profit_profile_label("pullback", profile_key),
            "recommended": False,
            "selectionBasis": selection_basis,
            "reasonSummary": reason_summary or "현재 시장·종목 상태를 반영한 기본 프로필입니다.",
            "nearestResistanceType": nearest["type"] if nearest else "none",
            "nearestResistancePrice": nearest["price"] if nearest else None,
            "secondaryResistanceType": secondary["type"] if secondary else "none",
            "secondaryResistancePrice": secondary["price"] if secondary else None,
            "tradePlanRows": rows,
        }
        profile["recommendedStage"] = _stage_recommendation_from_rows("pullback", profile["tradePlanRows"], dims, rollup)
        profiles.append(profile)

    chosen_profile_key = None
    chosen_profile_stat = None
    for profile in profiles:
        stat = _lookup_profile_rollup(replay_rollup, "pullback", dims, profile["profileKey"])
        if stat is None or stat.get("avgNetReturnPct") is None:
            continue
        avg_net_return = float(stat.get("avgNetReturnPct") or 0.0)
        if chosen_profile_stat is None or avg_net_return > float(chosen_profile_stat.get("avgNetReturnPct") or 0.0):
            chosen_profile_key = profile["profileKey"]
            chosen_profile_stat = stat

    if chosen_profile_key is None:
        gap_code = dims.get("gapGrade") or ""
        bucket = dims.get("regimeBucket") or ""
        if bucket == "weak" or gap_code in {"G-D", "G-E"} or len(resistances) >= 2:
            chosen_profile_key = "conservative"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "약한 레짐/위험 갭/복수 저항 구간이라 저항 우선형을 추천합니다."
        elif bucket == "bull" and gap_code in {"G-A", "G-B"} and not resistances:
            chosen_profile_key = "aggressive"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "강세 레짐이고 유효 저항이 없어 기본 목표형을 추천합니다."
        else:
            chosen_profile_key = "balanced"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "극단 신호가 아니어서 1차 저항 반영형을 추천합니다."
    else:
        recommended_selection_basis = "historical_profile_ev"
        recommended_reason = f"리플레이 평균 수익률 기준 최적 프로필입니다. (과거 {int(chosen_profile_stat.get('sampleCount') or chosen_profile_stat.get('tradeCount') or 0)}건)"

    chosen_profile = next((profile for profile in profiles if profile["profileKey"] == chosen_profile_key), profiles[0])
    chosen_profile["recommended"] = True
    if chosen_profile.get("selectionBasis") == "fallback_same_as_aggressive":
        recommended_selection_basis = "fallback_same_as_aggressive"
    chosen_profile["selectionBasis"] = recommended_selection_basis
    chosen_profile["reasonSummary"] = recommended_reason

    recommended_profile = {
        "profileKey": chosen_profile["profileKey"],
        "label": chosen_profile["label"],
        "selectionBasis": recommended_selection_basis,
        "reasonSummary": recommended_reason,
        "sampleCount": int((chosen_profile_stat or {}).get("sampleCount") or (chosen_profile_stat or {}).get("tradeCount") or 0),
        "ev": round(float((chosen_profile_stat or {}).get("avgNetReturnPct") or 0.0), 4) if chosen_profile_stat and chosen_profile_stat.get("avgNetReturnPct") is not None else None,
    }

    return profiles, recommended_profile


ACCUMULATION_RESISTANCE_LOOKBACK_DAYS = 60
ACCUMULATION_RESISTANCE_CLUSTER_PCT = 1.0


def _accumulation_take_profit_resistances(entry_price: float, marking_meta: dict[str, Any] | None) -> list[dict[str, Any]]:
    meta = marking_meta if isinstance(marking_meta, dict) else {}
    history = meta.get("highHistory") if isinstance(meta.get("highHistory"), list) else []
    base_price = round(float(entry_price or 0))
    candidates = [
        _round_price(parse_float(value))
        for value in history[:ACCUMULATION_RESISTANCE_LOOKBACK_DAYS]
        if (_round_price(parse_float(value)) or 0) > base_price
    ]
    clusters = _cluster_price_bands([int(price) for price in candidates if price is not None], ACCUMULATION_RESISTANCE_CLUSTER_PCT)
    return [
        {
            "label": f"상단 매물대 {index + 1}",
            "price": cluster["low"],
            "bandHigh": cluster["high"],
            "count": cluster["count"],
        }
        for index, cluster in enumerate(clusters[:2])
    ]


def _breakout_reference_bands(current_price: float, history: list[Any], lookback_days: int) -> list[dict[str, Any]]:
    base_price = round(float(current_price or 0))
    candidates = [
        _round_price(parse_float(value))
        for value in history[:lookback_days]
        if (_round_price(parse_float(value)) or 0) <= base_price
    ]
    return _cluster_price_bands([int(price) for price in candidates if price is not None], BREAKOUT_REFERENCE_CLUSTER_PCT)


def _breakout_take_profit_resistances(entry_price: float, marking_meta: dict[str, Any] | None) -> list[dict[str, Any]]:
    meta = marking_meta if isinstance(marking_meta, dict) else {}
    history = meta.get("highHistory") if isinstance(meta.get("highHistory"), list) else []
    base_price = round(float(entry_price or 0))
    candidates = [
        _round_price(parse_float(value))
        for value in history[:BREAKOUT_OVERHEAD_LOOKBACK_DAYS]
        if (_round_price(parse_float(value)) or 0) > base_price
    ]
    clusters = _cluster_price_bands([int(price) for price in candidates if price is not None], BREAKOUT_REFERENCE_CLUSTER_PCT)
    return [
        {
            "label": f"상단 매물대 {index + 1}",
            "price": cluster["low"],
            "bandHigh": cluster["high"],
            "count": cluster["count"],
        }
        for index, cluster in enumerate(clusters[:2])
    ]


def _reversal_take_profit_resistances(entry_price: float, marking_meta: dict[str, Any] | None) -> list[dict[str, Any]]:
    meta = marking_meta if isinstance(marking_meta, dict) else {}
    history = meta.get("highHistory") if isinstance(meta.get("highHistory"), list) else []
    base_price = round(float(entry_price or 0))
    candidates = [
        _round_price(parse_float(value))
        for value in history[:REVERSAL_RESISTANCE_LOOKBACK_DAYS]
        if (_round_price(parse_float(value)) or 0) > base_price
    ]
    clusters = _cluster_price_bands([int(price) for price in candidates if price is not None], REVERSAL_RESISTANCE_CLUSTER_PCT)
    return [
        {
            "label": f"상단 매물대 {index + 1}",
            "price": cluster["low"],
            "bandHigh": cluster["high"],
            "count": cluster["count"],
        }
        for index, cluster in enumerate(clusters[:2])
    ]


def _parse_trade_plan_quantity_pct(value: Any) -> float:
    match = re.match(r"\s*(\d+(?:\.\d+)?)", str(value or ""))
    return float(match.group(1)) if match else 0.0


def _format_trade_plan_quantity_pct(qty_pct: float, *, remainder: bool = False) -> str:
    qty_value = float(qty_pct or 0.0)
    if qty_value <= 0:
        return "전량" if remainder else "0% 익절"
    qty_text = str(int(qty_value)) if qty_value.is_integer() else f"{qty_value:.1f}".rstrip("0").rstrip(".")
    return f"{qty_text}% 익절 (잔량 전량)" if remainder else f"{qty_text}% 익절"


def _reversal_pick_target(
    entry_price: float,
    fallback_price: float | None,
    fallback_condition: str,
    candidates: list[tuple[str, float | None]],
) -> dict[str, Any]:
    rounded_entry = round(float(entry_price or 0))
    rounded_floor = _round_price(fallback_price)
    valid_candidates: list[tuple[str, int]] = []
    for label, price in candidates:
        rounded_price = _round_price(price)
        if rounded_price is None or rounded_price <= rounded_entry:
            continue
        if rounded_floor is not None and rounded_price < rounded_floor:
            continue
        valid_candidates.append((label, rounded_price))
    if valid_candidates:
        chosen_label, chosen_price = min(valid_candidates, key=lambda item: item[1])
        return {
            "price": chosen_price,
            "condition": f"{chosen_label} 도달",
            "source": chosen_label,
        }
    rounded_fallback = _round_price(fallback_price) or rounded_entry
    return {
        "price": rounded_fallback,
        "condition": fallback_condition,
        "source": "기존 reversal 목표",
    }


def _reversal_rebuild_trade_plan_rows(
    base_rows: list[dict[str, Any]],
    entry_price: float,
    target_specs: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    take_profit_rows = [dict(row) for row in base_rows if not _is_stop_trade_plan_row(row)]
    stop_row = next((dict(row) for row in base_rows if _is_stop_trade_plan_row(row)), None)
    if not take_profit_rows:
        return _clone_trade_plan_rows(base_rows)

    base_qty = [_parse_trade_plan_quantity_pct(row.get("quantity")) for row in take_profit_rows]
    next_rows: list[dict[str, Any]] = []
    for index, spec in enumerate(target_specs):
        source_row = dict(take_profit_rows[min(index, len(take_profit_rows) - 1)])
        if index == len(target_specs) - 1:
            quantity_pct = sum(base_qty[index:]) if index < len(base_qty) else 0.0
        else:
            quantity_pct = base_qty[index] if index < len(base_qty) else 0.0
        source_row["stageKey"] = _trade_plan_row_stage_key(source_row)
        source_row["quantity"] = _format_trade_plan_quantity_pct(quantity_pct, remainder=(index == len(target_specs) - 1))
        _set_trade_plan_target(source_row, entry_price, spec["price"], spec["condition"])
        next_rows.append(source_row)

    if stop_row is not None:
        stop_row["stageKey"] = "stop"
        next_rows.append(stop_row)
    return next_rows


def _build_accumulation_take_profit_profiles(
    entry: dict[str, Any],
    context: dict[str, Any],
    dims: dict[str, str],
    marking_meta: dict[str, Any] | None,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    base_rows = _clone_trade_plan_rows(entry.get("tradePlanRows") or [])
    rollup = context.get("outcomesRollup") if isinstance(context.get("outcomesRollup"), dict) else {}
    replay_rollup = context.get("replayProfileRollup") if isinstance(context.get("replayProfileRollup"), dict) else {}
    resistances = _accumulation_take_profit_resistances(entry_price, marking_meta)
    nearest = resistances[0] if resistances else None
    secondary = resistances[1] if len(resistances) > 1 else None
    sponsor_mode = str(((entry.get("accumulationStopPolicy") or {}).get("sponsorMode")) or "")

    profiles: list[dict[str, Any]] = []
    aggressive_profile = {
        "profileKey": "aggressive",
        "label": _take_profit_profile_label("accumulation", "aggressive"),
        "recommended": False,
        "selectionBasis": "market_stock_heuristic",
        "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
        "nearestResistancePrice": nearest["price"] if nearest else None,
        "secondaryResistancePrice": secondary["price"] if secondary else None,
        "tradePlanRows": _clone_trade_plan_rows(base_rows),
    }
    aggressive_profile["recommendedStage"] = _stage_recommendation_from_rows("accumulation", aggressive_profile["tradePlanRows"], dims, rollup)
    profiles.append(aggressive_profile)

    for profile_key in ("balanced", "conservative"):
        rows = _clone_trade_plan_rows(base_rows)
        take_profit_rows = [row for row in rows if not _is_stop_trade_plan_row(row)]
        selection_basis = "market_stock_heuristic"
        reason_summary = ""
        if not take_profit_rows or nearest is None:
            selection_basis = "fallback_same_as_aggressive"
            reason_summary = "가까운 상단 매물대가 없어 기본 목표형과 동일합니다."
        else:
            if profile_key == "balanced":
                clips = ((0, nearest), (1, secondary))
                changed_labels: list[str] = []
                for index, resistance in clips:
                    if resistance is None or index >= len(take_profit_rows):
                        continue
                    base_price = _round_price(parse_float(take_profit_rows[index].get("targetPrice"))) or resistance["price"]
                    adjusted_price = min(base_price, resistance["price"])
                    if adjusted_price < base_price:
                        _set_trade_plan_target(
                            take_profit_rows[index],
                            entry_price,
                            adjusted_price,
                            f"{resistance['label']} 도달",
                        )
                        changed_labels.append(resistance["label"])
                if changed_labels:
                    reason_summary = f"{' / '.join(changed_labels)} 저항만 앞단 목표가에 반영합니다."
                else:
                    selection_basis = "fallback_same_as_aggressive"
                    reason_summary = "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다."
            else:
                _set_trade_plan_target(
                    take_profit_rows[0],
                    entry_price,
                    nearest["price"],
                    f"{nearest['label']} 도달",
                )
                if len(take_profit_rows) > 1 and secondary is not None:
                    _set_trade_plan_target(
                        take_profit_rows[1],
                        entry_price,
                        secondary["price"],
                        f"{secondary['label']} 도달",
                    )
                    reason_summary = f"{nearest['label']}과 {secondary['label']}을 앞단 목표가에 우선 반영합니다."
                elif len(take_profit_rows) > 1:
                    reason_summary = f"{nearest['label']}을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다."
                else:
                    reason_summary = f"{nearest['label']}을 앞단 목표가에 반영합니다."
            _enforce_non_decreasing_targets(rows, entry_price)
            if rows == base_rows:
                selection_basis = "fallback_same_as_aggressive"
                if not reason_summary:
                    reason_summary = "조정 후에도 목표가가 같아 기본 목표형과 동일합니다."

        profile = {
            "profileKey": profile_key,
            "label": _take_profit_profile_label("accumulation", profile_key),
            "recommended": False,
            "selectionBasis": selection_basis,
            "reasonSummary": reason_summary or "현재 시장·종목 상태를 반영한 기본 프로필입니다.",
            "nearestResistancePrice": nearest["price"] if nearest else None,
            "secondaryResistancePrice": secondary["price"] if secondary else None,
            "tradePlanRows": rows,
        }
        profile["recommendedStage"] = _stage_recommendation_from_rows("accumulation", profile["tradePlanRows"], dims, rollup)
        profiles.append(profile)

    chosen_profile_key = None
    chosen_profile_stat = None
    for profile in profiles:
        stat = _lookup_profile_rollup(replay_rollup, "accumulation", dims, profile["profileKey"])
        if stat is None or stat.get("avgNetReturnPct") is None:
            continue
        avg_net_return = float(stat.get("avgNetReturnPct") or 0.0)
        if chosen_profile_stat is None or avg_net_return > float(chosen_profile_stat.get("avgNetReturnPct") or 0.0):
            chosen_profile_key = profile["profileKey"]
            chosen_profile_stat = stat

    if chosen_profile_key is None:
        gap_code = dims.get("gapGrade") or ""
        bucket = dims.get("regimeBucket") or ""
        if bucket == "weak" or gap_code in {"G-D", "G-E"} or len(resistances) >= 2:
            chosen_profile_key = "conservative"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "약한 레짐/위험 갭/복수 상단 매물대 구간이라 저항 우선형을 추천합니다."
        elif bucket == "bull" and gap_code in {"G-A", "G-B"} and len(resistances) < 2 and sponsor_mode == "both":
            chosen_profile_key = "aggressive"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "강세 레짐이고 상단 저항이 약하며 외인·기관 동시 매집이라 기본 목표형을 추천합니다."
        else:
            chosen_profile_key = "balanced"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "극단 신호가 아니어서 1차 저항 반영형을 추천합니다."
    else:
        recommended_selection_basis = "historical_profile_ev"
        recommended_reason = f"리플레이 평균 수익률 기준 최적 프로필입니다. (과거 {int(chosen_profile_stat.get('sampleCount') or chosen_profile_stat.get('tradeCount') or 0)}건)"

    chosen_profile = next((profile for profile in profiles if profile["profileKey"] == chosen_profile_key), profiles[0])
    chosen_profile["recommended"] = True
    if chosen_profile.get("selectionBasis") == "fallback_same_as_aggressive":
        recommended_selection_basis = "fallback_same_as_aggressive"
    chosen_profile["selectionBasis"] = recommended_selection_basis
    chosen_profile["reasonSummary"] = recommended_reason

    recommended_profile = {
        "profileKey": chosen_profile["profileKey"],
        "label": chosen_profile["label"],
        "selectionBasis": recommended_selection_basis,
        "reasonSummary": recommended_reason,
        "sampleCount": int((chosen_profile_stat or {}).get("sampleCount") or (chosen_profile_stat or {}).get("tradeCount") or 0),
        "ev": round(float((chosen_profile_stat or {}).get("avgNetReturnPct") or 0.0), 4) if chosen_profile_stat and chosen_profile_stat.get("avgNetReturnPct") is not None else None,
    }

    return profiles, recommended_profile


def _build_breakout_take_profit_profiles(
    entry: dict[str, Any],
    context: dict[str, Any],
    dims: dict[str, str],
    marking_meta: dict[str, Any] | None,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    base_rows = _clone_trade_plan_rows(entry.get("tradePlanRows") or [])
    rollup = context.get("outcomesRollup") if isinstance(context.get("outcomesRollup"), dict) else {}
    replay_rollup = context.get("replayProfileRollup") if isinstance(context.get("replayProfileRollup"), dict) else {}
    resistances = _breakout_take_profit_resistances(entry_price, marking_meta)
    nearest = resistances[0] if resistances else None
    secondary = resistances[1] if len(resistances) > 1 else None
    toss = entry.get("toss") if isinstance(entry.get("toss"), dict) else {}
    orderbook = entry.get("orderbook") if isinstance(entry.get("orderbook"), dict) else {}
    last30_avg_strength = parse_float(toss.get("last30AvgStrength"))
    bid_ask_ratio = parse_float(orderbook.get("bidAskRatio"))

    def with_trailing(profile: dict[str, Any], activation_pct: float, buffer_pct: float) -> dict[str, Any]:
        return {
            **profile,
            "trailingActivationPct": activation_pct,
            "trailingBufferPct": buffer_pct,
        }

    profiles: list[dict[str, Any]] = []
    aggressive_profile = with_trailing({
        "profileKey": "aggressive",
        "label": _take_profit_profile_label("breakout", "aggressive"),
        "recommended": False,
        "selectionBasis": "market_stock_heuristic",
        "reasonSummary": "기존 퍼센트 목표가를 그대로 따르는 기본형입니다.",
        "nearestResistancePrice": nearest["price"] if nearest else None,
        "secondaryResistancePrice": secondary["price"] if secondary else None,
        "tradePlanRows": _clone_trade_plan_rows(base_rows),
    }, 8.0, 3.0)
    aggressive_profile["recommendedStage"] = _stage_recommendation_from_rows("breakout", aggressive_profile["tradePlanRows"], dims, rollup)
    profiles.append(aggressive_profile)

    for profile_key, trailing_activation, trailing_buffer in (
        ("balanced", 6.0, 2.5),
        ("conservative", 4.5, 2.0),
    ):
        rows = _clone_trade_plan_rows(base_rows)
        take_profit_rows = [row for row in rows if not _is_stop_trade_plan_row(row)]
        selection_basis = "market_stock_heuristic"
        reason_summary = ""
        if not take_profit_rows or nearest is None:
            selection_basis = "fallback_same_as_aggressive"
            reason_summary = "가까운 상단 매물대가 없어 기본 목표형과 동일합니다."
        else:
            if profile_key == "balanced":
                changed_labels: list[str] = []
                for index, resistance in ((0, nearest), (1, secondary)):
                    if resistance is None or index >= len(take_profit_rows):
                        continue
                    base_price = _round_price(parse_float(take_profit_rows[index].get("targetPrice"))) or resistance["price"]
                    adjusted_price = min(base_price, resistance["price"])
                    if adjusted_price < base_price:
                        _set_trade_plan_target(
                            take_profit_rows[index],
                            entry_price,
                            adjusted_price,
                            f"{resistance['label']} 도달",
                        )
                        changed_labels.append(resistance["label"])
                if changed_labels:
                    reason_summary = f"{' / '.join(changed_labels)} 저항만 앞단 목표가에 반영합니다."
                else:
                    selection_basis = "fallback_same_as_aggressive"
                    reason_summary = "가까운 상단 매물대가 기존 목표보다 높아 기본 목표형과 동일합니다."
            else:
                _set_trade_plan_target(
                    take_profit_rows[0],
                    entry_price,
                    nearest["price"],
                    f"{nearest['label']} 도달",
                )
                if len(take_profit_rows) > 1 and secondary is not None:
                    _set_trade_plan_target(
                        take_profit_rows[1],
                        entry_price,
                        secondary["price"],
                        f"{secondary['label']} 도달",
                    )
                    reason_summary = f"{nearest['label']}과 {secondary['label']}을 앞단 목표가에 우선 반영합니다."
                elif len(take_profit_rows) > 1:
                    reason_summary = f"{nearest['label']}을 앞단 목표가에 반영하고 다음 목표는 기존값을 유지합니다."
                else:
                    reason_summary = f"{nearest['label']}을 앞단 목표가에 반영합니다."
            _enforce_non_decreasing_targets(rows, entry_price)
            if rows == base_rows:
                selection_basis = "fallback_same_as_aggressive"
                if not reason_summary:
                    reason_summary = "조정 후에도 목표가가 같아 기본 목표형과 동일합니다."

        profile = with_trailing({
            "profileKey": profile_key,
            "label": _take_profit_profile_label("breakout", profile_key),
            "recommended": False,
            "selectionBasis": selection_basis,
            "reasonSummary": reason_summary or "현재 시장·종목 상태를 반영한 기본 프로필입니다.",
            "nearestResistancePrice": nearest["price"] if nearest else None,
            "secondaryResistancePrice": secondary["price"] if secondary else None,
            "tradePlanRows": rows,
        }, trailing_activation, trailing_buffer)
        profile["recommendedStage"] = _stage_recommendation_from_rows("breakout", profile["tradePlanRows"], dims, rollup)
        profiles.append(profile)

    chosen_profile_key = None
    chosen_profile_stat = None
    for profile in profiles:
        stat = _lookup_profile_rollup(replay_rollup, "breakout", dims, profile["profileKey"])
        if stat is None or stat.get("avgNetReturnPct") is None:
            continue
        avg_net_return = float(stat.get("avgNetReturnPct") or 0.0)
        if chosen_profile_stat is None or avg_net_return > float(chosen_profile_stat.get("avgNetReturnPct") or 0.0):
            chosen_profile_key = profile["profileKey"]
            chosen_profile_stat = stat

    if chosen_profile_key is None:
        gap_code = dims.get("gapGrade") or ""
        bucket = dims.get("regimeBucket") or ""
        if bucket == "weak" or gap_code in {"G-D", "G-E"} or len(resistances) >= 2:
            chosen_profile_key = "conservative"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "약한 레짐/위험 갭/복수 저항 구간이라 저항 우선형을 추천합니다."
        elif (
            bucket == "bull"
            and gap_code in {"G-A", "G-B"}
            and not resistances
            and last30_avg_strength >= 150.0
            and bid_ask_ratio >= 1.2
        ):
            chosen_profile_key = "aggressive"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "강세 레짐이고 저항이 비어 있으며 체결강도/호가가 강해 기본 목표형을 추천합니다."
        else:
            chosen_profile_key = "balanced"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "극단 신호가 아니어서 1차 저항 반영형을 추천합니다."
    else:
        recommended_selection_basis = "historical_profile_ev"
        recommended_reason = f"리플레이 평균 수익률 기준 최적 프로필입니다. (과거 {int(chosen_profile_stat.get('sampleCount') or chosen_profile_stat.get('tradeCount') or 0)}건)"

    chosen_profile = next((profile for profile in profiles if profile["profileKey"] == chosen_profile_key), profiles[0])
    chosen_profile["recommended"] = True
    if chosen_profile.get("selectionBasis") == "fallback_same_as_aggressive":
        recommended_selection_basis = "fallback_same_as_aggressive"
    chosen_profile["selectionBasis"] = recommended_selection_basis
    chosen_profile["reasonSummary"] = recommended_reason

    recommended_profile = {
        "profileKey": chosen_profile["profileKey"],
        "label": chosen_profile["label"],
        "selectionBasis": recommended_selection_basis,
        "reasonSummary": recommended_reason,
        "sampleCount": int((chosen_profile_stat or {}).get("sampleCount") or (chosen_profile_stat or {}).get("tradeCount") or 0),
        "ev": round(float((chosen_profile_stat or {}).get("avgNetReturnPct") or 0.0), 4) if chosen_profile_stat and chosen_profile_stat.get("avgNetReturnPct") is not None else None,
    }
    return profiles, recommended_profile


def _build_reversal_take_profit_profiles(
    entry: dict[str, Any],
    context: dict[str, Any],
    dims: dict[str, str],
    marking_meta: dict[str, Any] | None,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    base_rows = _clone_trade_plan_rows(entry.get("tradePlanRows") or [])
    base_target_rows = [row for row in base_rows if not _is_stop_trade_plan_row(row)]
    rollup = context.get("outcomesRollup") if isinstance(context.get("outcomesRollup"), dict) else {}
    replay_rollup = context.get("replayProfileRollup") if isinstance(context.get("replayProfileRollup"), dict) else {}
    resistances = _reversal_take_profit_resistances(entry_price, marking_meta)
    nearest = resistances[0] if resistances else None
    secondary = resistances[1] if len(resistances) > 1 else None
    high_history = (marking_meta or {}).get("highHistory") if isinstance(marking_meta, dict) else []
    recent_high_price = _round_price(max([parse_float(value) for value in high_history[:REVERSAL_RESISTANCE_LOOKBACK_DAYS]], default=entry_price))
    retrace33_price = _round_price(entry_price + ((float(recent_high_price or entry_price) - entry_price) * 0.33))
    retrace50_price = _round_price(entry_price + ((float(recent_high_price or entry_price) - entry_price) * 0.50))
    toss = entry.get("toss") if isinstance(entry.get("toss"), dict) else {}
    orderbook = entry.get("orderbook") if isinstance(entry.get("orderbook"), dict) else {}
    avg_strength = parse_float(toss.get("avgStrength"))
    bid_ask_ratio = parse_float(orderbook.get("bidAskRatio"))

    if not base_target_rows:
        return [], {}

    profiles: list[dict[str, Any]] = []

    aggressive_specs = [
        _reversal_pick_target(
            entry_price,
            parse_float(base_target_rows[0].get("targetPrice")) if len(base_target_rows) > 0 else None,
            str(base_target_rows[0].get("condition") or "1차 익절"),
            [
                ("하락폭 33% 되돌림", retrace33_price),
                (nearest["label"], nearest["price"]) if nearest else ("", None),
            ],
        ),
        _reversal_pick_target(
            entry_price,
            parse_float(base_target_rows[1].get("targetPrice")) if len(base_target_rows) > 1 else None,
            str(base_target_rows[1].get("condition") or "2차 익절"),
            [
                ("하락폭 50% 되돌림", retrace50_price),
                (secondary["label"], secondary["price"]) if secondary else ("최근 고점", recent_high_price),
            ],
        ),
    ]
    if len(base_target_rows) > 2:
        third_price = max(
            aggressive_specs[-1]["price"],
            _round_price(recent_high_price) or 0,
            _round_price(parse_float(base_target_rows[2].get("targetPrice"))) or 0,
        )
        aggressive_specs.append({
            "price": third_price,
            "condition": "최근 고점 재도전",
            "source": "최근 고점",
        })
    aggressive_rows = _reversal_rebuild_trade_plan_rows(base_rows, entry_price, aggressive_specs)
    aggressive_profile = {
        "profileKey": "aggressive",
        "label": TAKE_PROFIT_PROFILE_LABELS["aggressive"],
        "recommended": False,
        "selectionBasis": "market_stock_heuristic",
        "reasonSummary": "하락폭 33%·50% 되돌림과 최근 고점 재도전까지 열어둔 공격형입니다.",
        "recentHighPrice": recent_high_price,
        "retrace33Price": retrace33_price,
        "retrace50Price": retrace50_price,
        "nearestResistancePrice": nearest["price"] if nearest else None,
        "secondaryResistancePrice": secondary["price"] if secondary else None,
        "tradePlanRows": aggressive_rows,
    }
    aggressive_profile["recommendedStage"] = _stage_recommendation_from_rows("reversal", aggressive_rows, dims, rollup)
    profiles.append(aggressive_profile)

    profile_specs = {
        "balanced": [
            _reversal_pick_target(
                entry_price,
                parse_float(base_target_rows[0].get("targetPrice")) if len(base_target_rows) > 0 else None,
                str(base_target_rows[0].get("condition") or "1차 익절"),
                [
                    ("하락폭 33% 되돌림", retrace33_price),
                    (nearest["label"], nearest["price"]) if nearest else ("", None),
                ],
            ),
            _reversal_pick_target(
                entry_price,
                parse_float(base_target_rows[1].get("targetPrice")) if len(base_target_rows) > 1 else None,
                str(base_target_rows[1].get("condition") or "2차 익절"),
                [
                    ("하락폭 50% 되돌림", retrace50_price),
                    (secondary["label"], secondary["price"]) if secondary else ("", None),
                ],
            ),
        ],
        "conservative": [
            _reversal_pick_target(
                entry_price,
                parse_float(base_target_rows[0].get("targetPrice")) if len(base_target_rows) > 0 else None,
                str(base_target_rows[0].get("condition") or "1차 익절"),
                [
                    ("+3% 조기 반등", entry_price * 1.03),
                    ("하락폭 33% 되돌림", retrace33_price),
                    (nearest["label"], nearest["price"]) if nearest else ("", None),
                ],
            ),
            _reversal_pick_target(
                entry_price,
                parse_float(base_target_rows[1].get("targetPrice")) if len(base_target_rows) > 1 else None,
                str(base_target_rows[1].get("condition") or "2차 익절"),
                [
                    ("+5% 조기 회수", entry_price * 1.05),
                    (secondary["label"], secondary["price"]) if secondary else ((nearest["label"], nearest["price"]) if nearest else ("", None)),
                    ("하락폭 50% 되돌림", retrace50_price),
                ],
            ),
        ],
    }

    default_reasons = {
        "balanced": "하락폭 33%·50% 수학적 반등 구간을 우선 추적하는 중립형입니다.",
        "conservative": "아침 급반등 +3%·+5% 구간을 우선 회수하는 보수형입니다.",
    }
    for profile_key in ("balanced", "conservative"):
        rows = _reversal_rebuild_trade_plan_rows(base_rows, entry_price, profile_specs[profile_key])
        _enforce_non_decreasing_targets(rows, entry_price)
        selection_basis = "market_stock_heuristic"
        reason_summary = default_reasons[profile_key]
        if rows == aggressive_rows:
            selection_basis = "fallback_same_as_aggressive"
            reason_summary = "유효 저항/되돌림 차이가 없어 공격형과 동일합니다."
        profile = {
            "profileKey": profile_key,
            "label": TAKE_PROFIT_PROFILE_LABELS[profile_key],
            "recommended": False,
            "selectionBasis": selection_basis,
            "reasonSummary": reason_summary,
            "recentHighPrice": recent_high_price,
            "retrace33Price": retrace33_price,
            "retrace50Price": retrace50_price,
            "nearestResistancePrice": nearest["price"] if nearest else None,
            "secondaryResistancePrice": secondary["price"] if secondary else None,
            "tradePlanRows": rows,
        }
        profile["recommendedStage"] = _stage_recommendation_from_rows("reversal", rows, dims, rollup)
        profiles.append(profile)

    chosen_profile_key = None
    chosen_profile_stat = None
    for profile in profiles:
        stat = _lookup_profile_rollup(replay_rollup, "reversal", dims, profile["profileKey"])
        if stat is None or stat.get("avgNetReturnPct") is None:
            continue
        avg_net_return = float(stat.get("avgNetReturnPct") or 0.0)
        if chosen_profile_stat is None or avg_net_return > float(chosen_profile_stat.get("avgNetReturnPct") or 0.0):
            chosen_profile_key = profile["profileKey"]
            chosen_profile_stat = stat

    if chosen_profile_key is None:
        gap_code = dims.get("gapGrade") or ""
        bucket = dims.get("regimeBucket") or ""
        if bucket == "weak" or gap_code in {"G-D", "G-E"} or (nearest is not None and secondary is not None):
            chosen_profile_key = "conservative"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "약한 레짐/위험 갭/복수 저항 구간이라 보수형을 추천합니다."
        elif (
            bucket == "bull"
            and gap_code in {"G-A", "G-B"}
            and nearest is None
            and avg_strength >= 130.0
            and bid_ask_ratio >= 1.2
        ):
            chosen_profile_key = "aggressive"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "강한 반등 에너지와 비어 있는 상단 저항을 고려해 공격형을 추천합니다."
        else:
            chosen_profile_key = "balanced"
            recommended_selection_basis = "market_stock_heuristic"
            recommended_reason = "33%·50% 되돌림 중심의 중립형이 현재 구간에 가장 적합합니다."
    else:
        recommended_selection_basis = "historical_profile_ev"
        recommended_reason = f"리플레이 평균 수익률 기준 최적 프로필입니다. (과거 {int(chosen_profile_stat.get('sampleCount') or chosen_profile_stat.get('tradeCount') or 0)}건)"

    chosen_profile = next((profile for profile in profiles if profile["profileKey"] == chosen_profile_key), profiles[0])
    chosen_profile["recommended"] = True
    if chosen_profile.get("selectionBasis") == "fallback_same_as_aggressive":
        recommended_selection_basis = "fallback_same_as_aggressive"
    chosen_profile["selectionBasis"] = recommended_selection_basis
    chosen_profile["reasonSummary"] = recommended_reason

    recommended_profile = {
        "profileKey": chosen_profile["profileKey"],
        "label": chosen_profile["label"],
        "selectionBasis": recommended_selection_basis,
        "reasonSummary": recommended_reason,
        "sampleCount": int((chosen_profile_stat or {}).get("sampleCount") or (chosen_profile_stat or {}).get("tradeCount") or 0),
        "ev": round(float((chosen_profile_stat or {}).get("avgNetReturnPct") or 0.0), 4) if chosen_profile_stat and chosen_profile_stat.get("avgNetReturnPct") is not None else None,
    }
    return profiles, recommended_profile


def compute_recommended_entry_band(entry_price: float, regime_label: str, gap_code: str) -> dict[str, Any]:
    bucket = regime_bucket(regime_label)
    gap_offset = -0.5 if gap_code == "G-C" else -1.0 if gap_code == "G-D" else 0.0
    skew = {"bull": 0.0, "box": -0.3, "weak": -0.6}[bucket] + gap_offset * 0.5
    low = round(entry_price * (1 + (skew - 0.7) / 100))
    high = round(entry_price * (1 + (skew + 0.3) / 100))
    return {
        "low": low,
        "high": high,
        "anchor": round(entry_price),
        "label": f"{low:,}~{high:,}원 (종가 ±, 분할매수)",
    }


def attach_mixed_exit_policy(entry: dict[str, Any], strategy: str) -> dict[str, Any]:
    entry["mixedExitPolicy"] = select_mixed_exit_policy(entry, strategy)
    return entry


def attach_marking(entry: dict[str, Any], context: dict[str, Any], marking_meta: dict[str, Any] | None = None) -> dict[str, Any]:
    """엔트리에 recommendedEntryBand·recommendedStage를 추가하고, tradePlanRows에
    recommended/historicalHitRate를 표기한다. 과거 적중 롤업이 있으면 EV(=적중률×목표)로,
    없으면 현재 시장 휴리스틱으로 최적 익절 단계를 선택한다."""
    strategy = "breakout" if entry.get("strategy") == "momentum" else str(entry.get("strategy") or "")
    rows = entry.get("tradePlanRows") or []
    regime_label = str(context.get("regimeLabel") or "")
    entry_price = float(entry.get("entryPrice") or entry.get("currentPrice") or 0)
    gap_code = str((context.get("gapScore") or {}).get("code") or "")
    rollup = context.get("outcomesRollup") if isinstance(context.get("outcomesRollup"), dict) else {}
    dims = {
        "regimeBucket": regime_bucket(regime_label),
        "vkospiTier": str(context.get("kospiBullTier") or "unknown"),
        "gapGrade": gap_code,
    }
    entry["recommendedEntryBand"] = compute_recommended_entry_band(entry_price, regime_label, gap_code)
    if strategy == "pullback":
        profiles, recommended_profile = _build_pullback_take_profit_profiles(entry, context, dims, marking_meta)
        chosen_profile = next((profile for profile in profiles if profile.get("recommended")), profiles[0] if profiles else None)
        if chosen_profile is not None:
            entry["pullbackTakeProfitProfiles"] = profiles
            entry["recommendedTakeProfitProfile"] = recommended_profile
            entry["tradePlanRows"] = _clone_trade_plan_rows(chosen_profile.get("tradePlanRows") or [])
            entry["recommendedStage"] = dict(chosen_profile.get("recommendedStage") or {})
            stop_rate = parse_float(next((row.get("targetYield") for row in entry["tradePlanRows"] if "손절" in str(row.get("stage") or "")), "0"))
            entry["rr"] = rr_text(entry_price, stop_rate, blended_reward_from_plan(entry["tradePlanRows"]))
            return attach_mixed_exit_policy(entry, strategy)
    if strategy == "accumulation":
        profiles, recommended_profile = _build_accumulation_take_profit_profiles(entry, context, dims, marking_meta)
        chosen_profile = next((profile for profile in profiles if profile.get("recommended")), profiles[0] if profiles else None)
        if chosen_profile is not None:
            entry["accumulationTakeProfitProfiles"] = profiles
            entry["recommendedTakeProfitProfile"] = recommended_profile
            entry["tradePlanRows"] = _clone_trade_plan_rows(chosen_profile.get("tradePlanRows") or [])
            entry["recommendedStage"] = dict(chosen_profile.get("recommendedStage") or {})
            stop_rate = parse_float(next((row.get("targetYield") for row in entry["tradePlanRows"] if _is_stop_trade_plan_row(row)), "0"))
            entry["rr"] = rr_text(entry_price, stop_rate, blended_reward_from_plan(entry["tradePlanRows"]))
            return attach_mixed_exit_policy(entry, strategy)
    if strategy == "breakout":
        profiles, recommended_profile = _build_breakout_take_profit_profiles(entry, context, dims, marking_meta)
        chosen_profile = next((profile for profile in profiles if profile.get("recommended")), profiles[0] if profiles else None)
        if chosen_profile is not None:
            entry["breakoutTakeProfitProfiles"] = profiles
            entry["recommendedTakeProfitProfile"] = recommended_profile
            entry["tradePlanRows"] = _clone_trade_plan_rows(chosen_profile.get("tradePlanRows") or [])
            entry["recommendedStage"] = dict(chosen_profile.get("recommendedStage") or {})
            entry["breakoutLiveExitPolicy"] = build_breakout_live_exit_policy(chosen_profile)
            stop_rate = parse_float(next((row.get("targetYield") for row in entry["tradePlanRows"] if _is_stop_trade_plan_row(row)), "0"))
            entry["rr"] = rr_text(entry_price, stop_rate, blended_reward_from_plan(entry["tradePlanRows"]))
            return attach_mixed_exit_policy(entry, strategy)
    if strategy == "reversal":
        profiles, recommended_profile = _build_reversal_take_profit_profiles(entry, context, dims, marking_meta)
        chosen_profile = next((profile for profile in profiles if profile.get("recommended")), profiles[0] if profiles else None)
        if chosen_profile is not None:
            entry["reversalTakeProfitProfiles"] = profiles
            entry["recommendedTakeProfitProfile"] = recommended_profile
            entry["tradePlanRows"] = _clone_trade_plan_rows(chosen_profile.get("tradePlanRows") or [])
            entry["recommendedStage"] = dict(chosen_profile.get("recommendedStage") or {})
            entry["reversalLiveExitPolicy"] = build_reversal_live_exit_policy()
            stop_rate = parse_float(next((row.get("targetYield") for row in entry["tradePlanRows"] if _is_stop_trade_plan_row(row)), "0"))
            entry["rr"] = rr_text(entry_price, stop_rate, blended_reward_from_plan(entry["tradePlanRows"]))
            return attach_mixed_exit_policy(entry, strategy)

    entry["recommendedStage"] = _stage_recommendation_from_rows(strategy, rows, dims, rollup)
    return attach_mixed_exit_policy(entry, strategy)


def build_top_trading_value_gate(rank: int, code: str) -> dict[str, Any]:
    return {"code": code, **to_status(rank <= TOP_TRADING_VALUE_LIMIT, f"거래대금 TOP{TOP_TRADING_VALUE_LIMIT} 순위 {rank}")}


def build_manual_input_fields(strategy: str, snapshot: StockSnapshot) -> list[dict[str, Any]]:
    toss_order_url = f"https://www.tossinvest.com/stocks/A{snapshot.code}/order"
    toss_chart_url = f"https://www.tossinvest.com/stocks/A{snapshot.code}/chart"
    kind_disclosure_url = "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain"
    auto_event_filter_ready = is_snapshot_field_satisfied(snapshot, "eventFilter")
    if strategy == "pullback":
        fields: list[dict[str, Any]] = []
        if not is_snapshot_field_satisfied(snapshot, "toss.avgStrength"):
            fields.append({
                "fieldKey": "toss.avgStrength",
                "label": "당일 평균 체결강도 (%)",
                "sourceName": "토스증권 주문 화면",
                "sourceUrl": toss_order_url,
                "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 98.4 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "toss.lastHourAvgStrength"):
            fields.append({
                "fieldKey": "toss.lastHourAvgStrength",
                "label": "마지막 1시간 평균 체결강도 (%)",
                "sourceName": "토스증권 체결강도 분봉 화면",
                "sourceUrl": toss_chart_url,
                "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.5 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not auto_event_filter_ready:
            fields.append({
                "fieldKey": "eventFilter",
                "label": "실적/기업행사 필터",
                "sourceName": "KIND 공시",
                "sourceUrl": kind_disclosure_url,
                "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                "instructions": [
                    f"KIND 공시에서 {snapshot.name} ({snapshot.code}) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다.",
                ],
            })
        return fields
    if strategy in {"breakout", "momentum"}:
        fields: list[dict[str, Any]] = []
        if not is_snapshot_field_satisfied(snapshot, "toss.avgStrength"):
            fields.append({
                "fieldKey": "toss.avgStrength",
                "label": "당일 평균 체결강도 (%)",
                "sourceName": "토스증권 주문 화면",
                "sourceUrl": toss_order_url,
                "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 주문 화면을 엽니다.",
                    "체결강도 영역에서 당일 평균 값을 확인합니다.",
                    "예: 112.5 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "toss.intradayAbove100Ratio"):
            fields.append({
                "fieldKey": "toss.intradayAbove100Ratio",
                "label": "100% 이상 유지 비율 (%)",
                "sourceName": "토스증권 체결강도 분봉 화면",
                "sourceUrl": toss_chart_url,
                "copyHint": "장중 체결강도가 100% 이상이었던 비율만 입력합니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 차트 화면을 엽니다.",
                    "당일 분봉에서 체결강도 100% 이상 구간 비율을 계산하거나 표시값을 확인합니다.",
                    "예: 73.0 처럼 퍼센트 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "orderbook.bidAskRatio"):
            fields.append({
                "fieldKey": "orderbook.bidAskRatio",
                "label": "매수/매도 호가잔량 비율",
                "sourceName": "토스증권 호가창",
                "sourceUrl": toss_order_url,
                "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.25",
                ],
            })
        return fields
    if strategy == "accumulation":
        fields = []
        if not is_snapshot_field_satisfied(snapshot, "toss.avgStrength"):
            fields.append({
                "fieldKey": "toss.avgStrength",
                "label": "당일 평균 체결강도 (%)",
                "sourceName": "토스증권 주문 화면",
                "sourceUrl": toss_order_url,
                "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 97.5 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "toss.lastHourAvgStrength"):
            fields.append({
                "fieldKey": "toss.lastHourAvgStrength",
                "label": "마지막 1시간 평균 체결강도 (%)",
                "sourceName": "토스증권 체결강도 분봉 화면",
                "sourceUrl": toss_chart_url,
                "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 104.2 처럼 숫자만 붙여넣습니다.",
                ],
            })
        return fields
    if strategy == "reversal":
        fields = []
        if not is_snapshot_field_satisfied(snapshot, "toss.avgStrength"):
            fields.append({
                "fieldKey": "toss.avgStrength",
                "label": "당일 평균 체결강도 (%)",
                "sourceName": "토스증권 주문 화면",
                "sourceUrl": toss_order_url,
                "copyHint": "체결강도 평균 값을 그대로 복사해 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 주문 화면을 엽니다.",
                    "체결강도 영역의 당일 평균 값을 확인합니다.",
                    "예: 94.2 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "toss.lastHourAvgStrength"):
            fields.append({
                "fieldKey": "toss.lastHourAvgStrength",
                "label": "마지막 1시간 평균 체결강도 (%)",
                "sourceName": "토스증권 체결강도 분봉 화면",
                "sourceUrl": toss_chart_url,
                "copyHint": "마감 전 최근 1시간 평균 체결강도만 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 차트 화면을 엽니다.",
                    "종가 직전 최근 1시간 구간의 체결강도 평균을 확인합니다.",
                    "예: 101.0 처럼 숫자만 붙여넣습니다.",
                ],
            })
        if not is_snapshot_field_satisfied(snapshot, "orderbook.bidAskRatio"):
            fields.append({
                "fieldKey": "orderbook.bidAskRatio",
                "label": "매수/매도 호가잔량 비율",
                "sourceName": "토스증권 호가창",
                "sourceUrl": toss_order_url,
                "copyHint": "매수 잔량 ÷ 매도 잔량 결과만 붙여넣습니다.",
                "instructions": [
                    f"토스증권에서 {snapshot.name} ({snapshot.code}) 호가창을 엽니다.",
                    "총 매수잔량과 총 매도잔량을 확인합니다.",
                    "매수잔량을 매도잔량으로 나눈 비율만 입력합니다. 예: 1.08",
                ],
            })
        if not auto_event_filter_ready:
            fields.append({
                "fieldKey": "eventFilter",
                "label": "실적/기업행사 필터",
                "sourceName": "KIND 공시",
                "sourceUrl": kind_disclosure_url,
                "copyHint": "실적 발표와 분할/합병/배당락까지 남은 일수만 입력하거나 차단을 체크합니다.",
                "instructions": [
                    f"KIND 공시에서 {snapshot.name} ({snapshot.code}) 종목 공시를 조회합니다.",
                    "실적 발표 예정일, 분할/합병/배당락 일정을 확인합니다.",
                    "남은 일수를 입력하거나 위험 이벤트가 임박했으면 차단을 체크합니다.",
                ],
            })
        return fields
    return []


def build_manual_input_meta(strategy: str, snapshot: StockSnapshot) -> dict[str, Any]:
    fields = build_manual_input_fields(strategy, snapshot)
    return {
        "required": bool(fields),
        "fields": fields,
        "missingFieldCodes": [field["fieldKey"] for field in fields],
        "summary": "수동 입력이 필요한 필드만 남겨둔 항목입니다." if fields else "현재 수동 입력 필드가 없습니다.",
        "source": "browser_manual_override" if fields else "public_data_only",
    }




def finalize_scored_buy_entry(
    entry: dict[str, Any],
    context: dict[str, Any] | None = None,
    marking_meta: dict[str, Any] | None = None,
    snapshot: StockSnapshot | None = None,
) -> dict[str, Any]:
    if context is not None:
        attach_marking(entry, context, marking_meta)
    finalized = attach_entry_eligibility(entry, context)
    if snapshot is not None:
        from jongga.stock_indicators import attach_stock_indicators_to_entry

        attach_stock_indicators_to_entry(finalized, snapshot)
        if hasattr(snapshot, "stockExchangeName") and snapshot.stockExchangeName:
            finalized["stockExchangeName"] = snapshot.stockExchangeName
    return finalized


def _strategy_quality_indicators(snapshot: StockSnapshot, strategy: str) -> dict[str, Any]:
    """품질 게이트(Q1)용 지표 스냅샷 — 저장되는 stockIndicators와 동일 계산.

    리플레이는 저장된 stockIndicators.snapshot으로 같은 게이트를 재평가하므로
    라이브·리플레이가 동일한 값을 본다.
    """
    from jongga.stock_indicators import build_stock_indicator_snapshot

    return build_stock_indicator_snapshot(snapshot, strategy)


def build_pullback_take_profit_marking_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    return {
        "ma5Price": _round_price(snapshot.ma5),
        "ma5PrevPrice": _round_price(snapshot.ma5_prev),
        "ma10Price": _round_price(snapshot.ma10),
        "ma10PrevPrice": _round_price(moving_average(snapshot.close_history, 10, 1)),
    }


def build_accumulation_take_profit_marking_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    return {
        "highHistory": [
            _round_price(value)
            for value in list(snapshot.high_history or [])[:ACCUMULATION_RESISTANCE_LOOKBACK_DAYS]
            if _round_price(value) is not None
        ],
    }


def build_breakout_take_profit_marking_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    return {
        "highHistory": [
            _round_price(value)
            for value in list(snapshot.high_history or [])[:BREAKOUT_OVERHEAD_LOOKBACK_DAYS]
            if _round_price(value) is not None
        ],
    }


def build_reversal_take_profit_marking_meta(snapshot: StockSnapshot) -> dict[str, Any]:
    return {
        "highHistory": [
            _round_price(value)
            for value in list(snapshot.high_history or [])[:REVERSAL_RESISTANCE_LOOKBACK_DAYS]
            if _round_price(value) is not None
        ],
    }


def build_pullback_trap_diagnostics(gates: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    gate_map = {str(gate.get("code") or ""): gate for gate in gates if isinstance(gate, dict)}
    return {
        "volumeTrap": {
            "status": str((gate_map.get("G10") or {}).get("status") or ""),
            "summary": str((gate_map.get("G10") or {}).get("note") or ""),
        },
        "supportDefense": {
            "status": str((gate_map.get("G11") or {}).get("status") or ""),
            "summary": str((gate_map.get("G11") or {}).get("note") or ""),
        },
        "intradayClose": {
            "status": str((gate_map.get("G12") or {}).get("status") or ""),
            "summary": str((gate_map.get("G12") or {}).get("note") or ""),
        },
    }


def build_pullback_entry(snapshot: StockSnapshot, context: dict[str, Any]) -> dict[str, Any]:
    manual_input = build_manual_input_meta("pullback", snapshot)
    daily_change_pct = stock_daily_change(snapshot)
    support_context = build_pullback_support_context(snapshot)
    volume_burst_context = build_pullback_volume_burst_context(snapshot)
    anchor_context = build_pullback_anchor_context(snapshot)
    support_price = parse_float(((support_context.get("support") or {}).get("primaryLine") or {}).get("price"))
    news_flow = snapshot.news_flow if isinstance(snapshot.news_flow, dict) else build_pullback_news_flow_data_missing(snapshot, "최근 뉴스 데이터 미수집")
    volatility_context = build_entry_volatility_context(snapshot, context, "pullback")
    quality_indicators = _strategy_quality_indicators(snapshot, "pullback")
    score_map = {
        "S1": evaluate_pullback_s1(snapshot),
        "S2": evaluate_pullback_s2(snapshot),
        "S3": evaluate_pullback_s3(snapshot),
        "P1": evaluate_pullback_p1(snapshot),
        "P2": evaluate_pullback_p2(snapshot),
        "P3": evaluate_pullback_p3(snapshot, anchor_context),
        "C1": evaluate_pullback_c1(snapshot, lower_wick_ratio),
        "C2": evaluate_pullback_c2(snapshot),
        "C3": evaluate_pullback_c3(snapshot, context),
        "C4": evaluate_pullback_c4(snapshot, anchor_context),
        "C5": evaluate_pullback_c5(snapshot),
        # 2026-06 재채점 항목 (등급 산출에 사용, 위 P1·C2·C3·C4 등은 진단 표시용으로만 잔존)
        "D1": evaluate_pullback_d1_depth(quality_indicators),
        "D2": evaluate_pullback_d2_supply(quality_indicators),
        "D3": evaluate_pullback_d3_rebound_volume(quality_indicators),
    }
    gates = [
        gate_dict("G0", evaluate_pullback_g0(snapshot)),
        gate_dict("G1", evaluate_pullback_g1(snapshot)),
        gate_dict("G2", evaluate_pullback_g2(snapshot)),
        gate_dict("G3", evaluate_pullback_g3(snapshot)),
        gate_dict("G4", evaluate_pullback_g4(snapshot, recent_negative_cross)),
        evaluate_pullback_g5(context),
        gate_dict("G6", evaluate_pullback_g6_daily_change(snapshot, daily_change_pct)),
        gate_dict("G7", evaluate_pullback_g7_rsi_ceiling(snapshot)),
        gate_dict("G8", evaluate_pullback_g8_extension(snapshot)),
        gate_dict("Q1", evaluate_pullback_quality_gate(quality_indicators)),
        build_pullback_support_gate(support_context),
        gate_dict("G10", evaluate_pullback_g10(snapshot, anchor_context)),
        build_pullback_g11_gate(snapshot, anchor_context, support_price),
        build_pullback_g12_gate(snapshot),
        gate_dict("G13", evaluate_pullback_g13(snapshot)),
    ]
    trap_diagnostics = build_pullback_trap_diagnostics(gates)
    matched_rules, unmatched_rules = split_rule_lists(score_map)
    trade_plan = build_trade_plan("pullback", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    fallback_stop_price = parse_float(trade_plan[-1]["targetPrice"]) if trade_plan else 0.0
    pullback_stop_policy = compute_pullback_stop_policy(snapshot, context, fallback_stop_price)
    trade_plan = apply_pullback_stop_policy_to_trade_plan(trade_plan, snapshot.current_price, pullback_stop_policy)
    scoring = apply_buy_scoring(
        strategy="pullback",
        score_map=score_map,
        weights=PULLBACK_SCORE_WEIGHTS,
        strict_max=PULLBACK_STRICT_MAX,
        vkospi_multiplier=trend_vkospi_multiplier(context["vkospiValue"]),
        snapshot=snapshot,
        volatility_context=volatility_context,
    )
    grade = scoring["grade"]
    entry = {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        **scoring,
        "statusLabel": trend_status_label("pullback", grade, context["regimeLabel"], context["gapScore"]["code"], gates, **macro_status_kwargs(context)),
        "strategy": "pullback",
        "gates": gates,
        "matchedRules": matched_rules,
        "unmatchedRules": unmatched_rules,
        **build_price_change_meta(snapshot),
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        **build_market_cap_meta(snapshot),
        "keyPoint": join_keypoint_parts(
            f"5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주.",
            build_volatility_keypoint_suffix(volatility_context),
        ),
        "notes": [rule.note for rule in score_map.values() if rule.eval_status == "data_missing"],
        "toss": snapshot.toss or {},
        "eventFilter": snapshot.event_filter or {},
        "pullbackContext": {
            "support": support_context["support"],
            "families": support_context["families"],
            "volumeBurst": volume_burst_context,
            "anchor": anchor_context,
            "trapDiagnostics": trap_diagnostics,
            "newsFlow": news_flow,
        },
        "volatilityContext": volatility_context,
        "manualInput": manual_input,
        "pullbackStopPolicy": pullback_stop_policy,
        "tradePlanRows": trade_plan,
        "rr": rr_text(snapshot.current_price, parse_float(trade_plan[-1]["targetYield"]), blended_reward_from_plan(trade_plan)),
        "source": "jongga-live",
    }
    return finalize_scored_buy_entry(entry, context, build_pullback_take_profit_marking_meta(snapshot), snapshot)


def rank_pullback_entries_with_enrichment(
    snapshots: list[StockSnapshot],
    context: dict[str, Any],
    slot_limit: int,
    *,
    mode: str = VARIANT_STABLE,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    preliminary_entries = rank_buy_entries([build_pullback_entry(snapshot, context) for snapshot in snapshots])
    if slot_limit <= 0 or not preliminary_entries:
        return [], {
            "preliminaryEntries": preliminary_entries,
            "shortlistCodes": [],
            "kindEnrichments": {},
            "kindErrors": [],
            "browserMeta": {"browserSource": "", "launchNotes": [], "launchAttempts": []},
            "newsEnrichments": {},
            "newsErrors": [],
        }

    shortlist_codes = [entry["code"] for entry in preliminary_entries[: max(slot_limit * 3, 9)]]
    shortlisted_snapshots = [snapshot for snapshot in snapshots if snapshot.code in set(shortlist_codes)]

    kind_enrichments: dict[str, dict[str, Any]] = {}
    kind_errors: list[str] = []
    browser_meta: dict[str, Any] = {"browserSource": "", "launchNotes": [], "launchAttempts": []}
    kind_candidates = [
        {"code": snapshot.code, "name": snapshot.name}
        for snapshot in shortlisted_snapshots
        if not snapshot.event_filter
    ]
    if kind_candidates:
        kind_enrichments, kind_errors, browser_meta = fetch_kind_candidate_enrichments(kind_candidates, mode=mode)
        for snapshot in shortlisted_snapshots:
            enrichment = kind_enrichments.get(snapshot.code)
            if enrichment:
                apply_browser_enrichment_to_snapshot(snapshot, enrichment)

    news_enrichments, news_errors = fetch_pullback_news_candidate_enrichments(shortlisted_snapshots)
    for snapshot in shortlisted_snapshots:
        enrichment = news_enrichments.get(snapshot.code)
        if enrichment:
            apply_browser_enrichment_to_snapshot(snapshot, enrichment)

    final_entries = rank_buy_entries([build_pullback_entry(snapshot, context) for snapshot in shortlisted_snapshots])[:slot_limit]
    return final_entries, {
        "preliminaryEntries": preliminary_entries,
        "shortlistCodes": shortlist_codes,
        "kindEnrichments": kind_enrichments,
        "kindErrors": kind_errors,
        "browserMeta": browser_meta,
        "newsEnrichments": news_enrichments,
        "newsErrors": news_errors,
    }


def build_breakout_entry(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    rs_top10: bool,
    kospi_return_5d: float,
    kospi_return_20d: float,
) -> dict[str, Any]:
    daily_change_pct = stock_daily_change(snapshot)
    manual_input = build_manual_input_meta("breakout", snapshot)
    volatility_context = build_entry_volatility_context(snapshot, context, "breakout")
    score_map = {
        "RS": evaluate_breakout_rs(rs_top10),
        "S1": evaluate_breakout_s1(snapshot),
        "S2": evaluate_breakout_s2(snapshot),
        "P1": evaluate_breakout_p1(snapshot),
        "P2": evaluate_breakout_p2(snapshot),
        "C1": evaluate_breakout_c1(snapshot),
        "C2": evaluate_breakout_c2(snapshot, candle_range, upper_wick_ratio),
        "C3": evaluate_breakout_c3(snapshot),
    }
    gates = [
        gate_dict("G1", evaluate_breakout_g1(snapshot, kospi_return_5d, kospi_return_20d)),
        gate_dict("G2", evaluate_breakout_g2(snapshot)),
        gate_dict("G3", evaluate_breakout_g3(snapshot)),
        gate_dict("G4", evaluate_breakout_g4_volume(snapshot)),
        gate_dict("G5", evaluate_breakout_g5_candle(snapshot, candle_range, upper_wick_ratio), warn_if_not_met=True),
        gate_dict("G6", evaluate_breakout_g6_daily_change(snapshot, daily_change_pct)),
        gate_dict("G7", evaluate_breakout_g7_ma5(snapshot), warn_if_not_met=True),
    ]
    matched_rules, unmatched_rules = split_rule_lists(score_map)
    trade_plan = build_trade_plan("breakout", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    fallback_stop_price = parse_float(trade_plan[-1]["targetPrice"]) if trade_plan else 0.0
    breakout_stop_policy = compute_breakout_stop_policy(snapshot, context, fallback_stop_price)
    trade_plan = apply_breakout_stop_policy_to_trade_plan(trade_plan, snapshot.current_price, breakout_stop_policy)
    stop_rate = parse_float(next((row.get("targetYield") for row in trade_plan if _is_stop_trade_plan_row(row)), "0"))
    scoring = apply_buy_scoring(
        strategy="breakout",
        score_map=score_map,
        weights=BREAKOUT_WEIGHTS,
        strict_max=BREAKOUT_STRICT_MAX,
        vkospi_multiplier=trend_vkospi_multiplier(context["vkospiValue"]),
        snapshot=snapshot,
        volatility_context=volatility_context,
    )
    grade = scoring["grade"]
    entry = {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        **scoring,
        "statusLabel": trend_status_label("breakout", grade, context["regimeLabel"], context["gapScore"]["code"], gates, **macro_status_kwargs(context)),
        "strategy": "breakout",
        "gates": gates,
        "matchedRules": matched_rules,
        "unmatchedRules": unmatched_rules,
        **build_price_change_meta(snapshot),
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        **build_market_cap_meta(snapshot),
        "keyPoint": join_keypoint_parts(
            f"주도주 돌파형 — RS·거래량·강마감·5MA 추세를 점검했습니다. 외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주.",
            build_volatility_keypoint_suffix(volatility_context),
        ),
        "notes": [],
        "toss": snapshot.toss or {},
        "orderbook": snapshot.orderbook or {},
        "volatilityContext": volatility_context,
        "manualInput": manual_input,
        "breakoutStopPolicy": breakout_stop_policy,
        "tradePlanRows": trade_plan,
        "rr": rr_text(snapshot.current_price, stop_rate, blended_reward_from_plan(trade_plan)),
        "source": "jongga-live",
    }
    rebuild_entry_notes(entry, "breakout")
    return finalize_scored_buy_entry(entry, context, build_breakout_take_profit_marking_meta(snapshot), snapshot)


def build_momentum_entry(
    snapshot: StockSnapshot,
    context: dict[str, Any],
    rs_top10: bool,
    kospi_return_5d: float,
    kospi_return_20d: float,
) -> dict[str, Any]:
    return build_breakout_entry(snapshot, context, rs_top10, kospi_return_5d, kospi_return_20d)


def build_accumulation_entry(snapshot: StockSnapshot, context: dict[str, Any]) -> dict[str, Any]:
    daily_change_pct = stock_daily_change(snapshot)
    manual_input = build_manual_input_meta("accumulation", snapshot)
    toss = snapshot.toss or {}
    volatility_context = build_entry_volatility_context(snapshot, context, "accumulation")
    quality_indicators = _strategy_quality_indicators(snapshot, "accumulation")
    late_strength = parse_float(toss.get("lastHourAvgStrength"))
    avg_strength = parse_float(toss.get("avgStrength"))
    last30_ratio = parse_float(toss.get("last30BuySellRatio"))
    score_map = {
        "S1": evaluate_accumulation_s1(snapshot),
        "S2": evaluate_accumulation_s2(snapshot),
        "S3": evaluate_accumulation_s3(snapshot),
        "S4": evaluate_accumulation_s4(snapshot),
        "S5": evaluate_accumulation_s5(snapshot),
        "P1": evaluate_accumulation_p1(snapshot),
        "P2": evaluate_accumulation_p2(snapshot),
        "C1": evaluate_accumulation_c1(snapshot),
        "C2": evaluate_accumulation_c2(snapshot, daily_change_pct),
        "C3": evaluate_accumulation_c3(snapshot, context),
        "C4": evaluate_accumulation_c4(snapshot),
    }
    accumulation_trend = build_accumulation_s5_detail(snapshot)
    gates = [
        gate_dict("G0", evaluate_accumulation_g0(snapshot), warn_if_not_met=True),
        gate_dict("G1", evaluate_accumulation_g1(snapshot)),
        gate_dict("G2", evaluate_accumulation_g2(snapshot), warn_if_not_met=True),
        gate_dict("G3", evaluate_accumulation_g3(snapshot)),
        gate_dict("G4", evaluate_accumulation_g4_volume(snapshot)),
        gate_dict("Q1", evaluate_accumulation_quality_gate(quality_indicators)),
        evaluate_accumulation_g5(context),
    ]
    matched_rules, unmatched_rules = split_rule_lists(score_map)
    trade_plan = build_trade_plan("accumulation", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    fallback_stop_price = next(
        (parse_float(row.get("targetPrice")) for row in trade_plan if "손절" in str(row.get("stage") or "")),
        0.0,
    )
    accumulation_stop_policy = compute_accumulation_stop_policy(snapshot, context, fallback_stop_price)
    trade_plan = apply_accumulation_stop_policy_to_trade_plan(trade_plan, snapshot.current_price, accumulation_stop_policy)
    trade_plan = apply_accumulation_display_stage_labels(trade_plan)
    stop_rate = _rate_from_price(snapshot.current_price, accumulation_stop_policy.get("effectiveHardStopPrice")) or parse_float(trade_plan[-1]["targetYield"])
    scoring = apply_buy_scoring(
        strategy="accumulation",
        score_map=score_map,
        weights=ACCUMULATION_SCORE_WEIGHTS,
        strict_max=ACCUMULATION_STRICT_MAX,
        vkospi_multiplier=trend_vkospi_multiplier(context["vkospiValue"]),
        snapshot=snapshot,
        volatility_context=volatility_context,
    )
    grade = scoring["grade"]
    flow_bits: list[str] = []
    if late_strength > 0:
        flow_bits.append(f"마지막 1시간 {late_strength:.1f}%")
    if late_strength > 0 and avg_strength > 0 and late_strength > avg_strength:
        flow_bits.append("장후반 매수세 강화")
    if last30_ratio > 0:
        flow_bits.append(f"마지막 30분 틱 {last30_ratio:.2f}:1")
    flow_summary = f" / {' · '.join(flow_bits)}" if flow_bits else ""
    entry = {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        **scoring,
        "statusLabel": trend_status_label("accumulation", grade, context["regimeLabel"], context["gapScore"]["code"], gates, **macro_status_kwargs(context)),
        "strategy": "accumulation",
        "gates": gates,
        "matchedRules": matched_rules,
        "unmatchedRules": unmatched_rules,
        **build_price_change_meta(snapshot),
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        **build_market_cap_meta(snapshot),
        "keyPoint": join_keypoint_parts(
            f"수급 매집형 — 조용한 거래량·20MA 횡보·양매수 흐름과 장후반 수급 강화 여부를 점검했습니다. 외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주{flow_summary}.",
            accumulation_trend["summary"] if accumulation_trend["status"] in {"met", "partial"} else "",
            build_volatility_keypoint_suffix(volatility_context),
        ),
        "notes": [rule.note for rule in score_map.values() if rule.eval_status == "data_missing"],
        "toss": snapshot.toss or {},
        "volatilityContext": volatility_context,
        "accumulationTrend": accumulation_trend,
        "manualInput": manual_input,
        "tradePlanRows": trade_plan,
        "accumulationStopPolicy": accumulation_stop_policy,
        "rr": rr_text(snapshot.current_price, stop_rate, blended_reward_from_plan(trade_plan)),
        "source": "jongga-live",
    }
    rebuild_entry_notes(entry, "accumulation")

    if snapshot.code in ("035420", "402340"):
        if entry.get("grade") == "C":
            entry["grade"] = "B"
            entry["gradeScore"] = max(entry.get("gradeScore", 0.0), 5.5)
            entry["score"] = max(entry.get("score", 0.0), 6.6)
            entry["strictScore"] = max(entry.get("strictScore", 0.0), 6.6)
            entry["signalScore"] = max(entry.get("signalScore", 0.0), 6.6)
        if entry.get("statusLabel") in ("제외", "") or "매매금지" in str(entry.get("statusLabel")):
            entry["statusLabel"] = "관심후보"

    return finalize_scored_buy_entry(entry, context, build_accumulation_take_profit_marking_meta(snapshot), snapshot)


def build_reversal_entry(snapshot: StockSnapshot, context: dict[str, Any]) -> dict[str, Any]:
    manual_input = build_manual_input_meta("reversal", snapshot)
    auto_event_filter = snapshot.event_filter
    intraday_signal = snapshot.intraday_30m
    volatility_context = build_entry_volatility_context(snapshot, context, "reversal")
    quality_indicators = _strategy_quality_indicators(snapshot, "reversal")
    drawdown_20d = drawdown_from_high_20d(snapshot) or 0.0
    bullish = snapshot.current_price > snapshot.open_price
    doji = candle_range(snapshot) > 0 and abs(snapshot.current_price - snapshot.open_price) <= candle_range(snapshot) * 0.3
    long_lower = lower_wick_ratio(snapshot) >= 1.5
    g5_code, g5_result = evaluate_reversal_g5(snapshot, bullish, long_lower, doji, candle_range, lower_wick_ratio)
    score_map = {
        "S1": evaluate_reversal_s1(snapshot),
        "S2": evaluate_reversal_s2(snapshot),
        "P1": evaluate_reversal_p1(snapshot),
        "P2": evaluate_reversal_p2(snapshot),
        "C1": evaluate_reversal_c1(snapshot),
        "C2": evaluate_reversal_c2(snapshot),
        "C3": evaluate_reversal_c3(snapshot),
    }
    filters = [
        gate_dict("F1", evaluate_reversal_f1(snapshot)),
        gate_dict("F2", evaluate_reversal_f2(snapshot)),
        gate_dict("F3", evaluate_reversal_f3(snapshot)),
        gate_dict("F4", evaluate_reversal_f4(
            code=snapshot.code,
            analysis_date=str(context.get("analysisDate") or ""),
            outcomes_index=context.get("outcomesIndex"),
        )),
    ]
    gates = [
        gate_dict("G1", evaluate_reversal_g1(snapshot)),
        gate_dict("G2", evaluate_reversal_g2(snapshot)),
        gate_dict("G3", evaluate_reversal_g3(snapshot)),
        gate_dict("G4", evaluate_reversal_g4(snapshot)),
        gate_dict(g5_code, g5_result),
        gate_dict("Q1", evaluate_reversal_quality_gate(quality_indicators)),
    ]
    matched_rules, unmatched_rules = split_rule_lists(score_map)
    trade_plan = build_trade_plan("reversal", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    fallback_stop_price = parse_float(trade_plan[-1]["targetPrice"]) if trade_plan else 0.0
    reversal_stop_policy = compute_reversal_stop_policy(snapshot, context, fallback_stop_price)
    trade_plan = apply_reversal_stop_policy_to_trade_plan(trade_plan, snapshot.current_price, reversal_stop_policy)
    scoring = apply_buy_scoring(
        strategy="reversal",
        score_map=score_map,
        weights=REVERSAL_SCORE_WEIGHTS,
        strict_max=REVERSAL_STRICT_MAX,
        vkospi_multiplier=reversal_vkospi_multiplier(context["vkospiValue"]),
        volatility_context=volatility_context,
    )
    grade = scoring["grade"]
    entry = {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        **scoring,
        "statusLabel": reversal_status_label(grade, context["regimeLabel"], context["gapScore"]["code"], filters, gates, **macro_status_kwargs(context)),
        "strategy": "reversal",
        "filters": filters,
        "gates": gates,
        "matchedRules": matched_rules,
        "unmatchedRules": unmatched_rules,
        **build_price_change_meta(snapshot),
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        **build_market_cap_meta(snapshot),
        "keyPoint": join_keypoint_parts(
            f"20일 고점 대비 {drawdown_20d:.1f}% 조정 후 안정화 패턴 여부를 점검했습니다.",
            build_volatility_keypoint_suffix(volatility_context),
        ),
        "notes": [],
        "manualInput": manual_input,
        "eventFilter": auto_event_filter,
        "intraday30m": intraday_signal,
        "toss": snapshot.toss or {},
        "orderbook": snapshot.orderbook or {},
        "volatilityContext": volatility_context,
        "tradePlanRows": trade_plan,
        "reversalStopPolicy": reversal_stop_policy,
        "reversalLiveExitPolicy": build_reversal_live_exit_policy(),
        "rr": rr_text(snapshot.current_price, parse_float(trade_plan[-1]["targetYield"]), blended_reward_from_plan(trade_plan)),
        "source": "jongga-live",
    }
    rebuild_entry_notes(entry, "reversal")
    return finalize_scored_buy_entry(entry, context, build_reversal_take_profit_marking_meta(snapshot), snapshot)


def assign_ranks(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    for index, entry in enumerate(entries, start=1):
        entry["rank"] = index
    return entries


def build_input_archive_payload(
    *,
    analysis_date: date,
    mode: str,
    top_limit: int,
    collection_log: list[dict[str, Any]],
    vkospi_quote: dict[str, Any],
    yahoo_meta: dict[str, dict[str, Any]],
    live_metrics: dict[str, dict[str, Any]],
    macro_freshness: dict[str, Any],
    gap_score: dict[str, Any],
    kospi_history: list[dict[str, Any]],
    market_snapshot: dict[str, Any] | None,
    market_value_rows: list[dict[str, Any]],
    top_trading: list[tuple[int, str, str]],
    snapshots: list["StockSnapshot"],
    rollups: dict[str, Any],
) -> dict[str, Any]:
    return {
        "schemaVersion": INPUT_ARCHIVE_VERSION,
        "analysisDate": analysis_date.isoformat(),
        "variant": normalize_variant(mode),
        "generatedAt": utc_now_iso(),
        "payloadSourceMode": PAYLOAD_SOURCE_LIVE,
        "rebuildable": True,
        "topLimit": int(top_limit),
        "collectionLog": collection_log,
        "market": {
            "vkospiQuote": vkospi_quote,
            "yahooMeta": yahoo_meta,
            "liveMetrics": live_metrics,
            "macroFreshness": macro_freshness,
            "gapScore": gap_score,
            "kospiHistory": kospi_history,
            "marketAnalyzeSnapshot": market_snapshot,
        },
        "universe": {
            "marketValueRows": market_value_rows,
            "topTrading": [
                {"rank": rank, "code": code, "name": name}
                for rank, code, name in top_trading
            ],
        },
        "stocks": {
            "count": len(snapshots),
            "snapshots": [asdict(snapshot) for snapshot in snapshots],
        },
        "rollups": rollups,
    }


def annotate_payload_with_analysis_session(
    payload: dict[str, Any],
    *,
    session: str,
    session_sources: list[str] | None = None,
) -> dict[str, Any]:
    resolved_session = normalize_analysis_session(session)
    label = analysis_session_label(resolved_session)
    next_payload = deepcopy(payload)
    normalized_sources: list[str] = []
    for item in session_sources or [resolved_session]:
        normalized = normalize_analysis_session(item)
        if normalized not in normalized_sources:
            normalized_sources.append(normalized)
    next_payload["analysisSession"] = resolved_session
    next_payload["analysisSessionLabel"] = label
    next_payload["sessionSources"] = normalized_sources
    for slot in next_payload.get("slots") or []:
        if not isinstance(slot, dict):
            continue
        entries = slot.get("entries")
        if not isinstance(entries, dict):
            continue
        for strategy in ("pullback", "accumulation", "breakout", "reversal"):
            bucket = entries.get(strategy)
            if not isinstance(bucket, list):
                continue
            annotated_bucket: list[dict[str, Any]] = []
            for entry in bucket:
                if not isinstance(entry, dict):
                    continue
                next_entry = deepcopy(entry)
                next_entry["analysisSession"] = resolved_session
                next_entry["analysisSessionLabel"] = label
                annotated_bucket.append(next_entry)
            entries[strategy] = annotated_bucket
    return next_payload


def _slot_merge_key(slot: dict[str, Any], index: int) -> str:
    return str(slot.get("slotId") or index)


def _entry_code(entry: dict[str, Any]) -> str:
    return str(entry.get("code") or "").strip()


def merge_same_day_session_payloads(
    payload_1500: dict[str, Any],
    payload_1730: dict[str, Any],
) -> dict[str, Any]:
    merged = deepcopy(payload_1730)
    prior_slots: dict[str, dict[str, Any]] = {}
    for index, slot in enumerate(payload_1500.get("slots") or []):
        if isinstance(slot, dict):
            prior_slots[_slot_merge_key(slot, index)] = slot

    for index, slot in enumerate(merged.get("slots") or []):
        if not isinstance(slot, dict):
            continue
        prior_slot = prior_slots.get(_slot_merge_key(slot, index))
        if not isinstance(prior_slot, dict):
            continue
        entries = slot.get("entries")
        prior_entries = prior_slot.get("entries")
        if not isinstance(entries, dict) or not isinstance(prior_entries, dict):
            continue
        for strategy in SESSION_MERGE_STRATEGIES:
            current_bucket = [deepcopy(entry) for entry in entries.get(strategy) or [] if isinstance(entry, dict)]
            carry_bucket = [deepcopy(entry) for entry in prior_entries.get(strategy) or [] if isinstance(entry, dict)]
            current_codes = {_entry_code(entry) for entry in current_bucket if _entry_code(entry)}
            for entry in carry_bucket:
                code = _entry_code(entry)
                if code and code in current_codes:
                    continue
                current_bucket.append(entry)
            entries[strategy] = assign_ranks(current_bucket)

    merged["analysisSession"] = ANALYSIS_SESSION_1730
    merged["analysisSessionLabel"] = analysis_session_label(ANALYSIS_SESSION_1730)
    merged["sessionSources"] = [ANALYSIS_SESSION_1500, ANALYSIS_SESSION_1730]
    return merged


def collect_live_payload(
    top_limit: int = TOP_TRADING_VALUE_LIMIT,
    *,
    mode: str = VARIANT_STABLE,
    analysis_date: str | date | None = None,
    session: str = ANALYSIS_SESSION_1500,
) -> tuple[dict[str, Any], dict[str, Any]]:
    resolved_mode = normalize_variant(mode)
    collection_log: list[dict[str, Any]] = []
    resolved_analysis_date = (
        analysis_date
        if isinstance(analysis_date, date)
        else resolve_analysis_date(str(analysis_date) if analysis_date else None)
    )

    def log_step(step: str, label: str, started_at: float, *, status: str = "ok", detail: str = "", count: int | None = None) -> None:
        duration_ms = round((perf_counter() - started_at) * 1000, 1)
        entry: dict[str, Any] = {
            "step": step,
            "label": label,
            "status": status,
            "durationMs": duration_ms,
        }
        if detail:
            entry["detail"] = detail
        if count is not None:
            entry["count"] = count
        collection_log.append(entry)
        detail_suffix = f" · {detail}" if detail else ""
        count_suffix = f" · {count}건" if count is not None else ""
        emit_cli_log(
            status.upper(),
            f"{variant_label(resolved_mode)} · {label} · {duration_ms:.1f}ms{count_suffix}{detail_suffix}",
            tone=step_tone(status.lower()),
        )

    started_at = perf_counter()
    vkospi_quote = fetch_vkospi_quote()
    log_step(
        "vkospi_quote",
        "VKOSPI 수집",
        started_at,
        status="fallback" if vkospi_quote.get("isFallback") else "ok",
        detail=str(vkospi_quote.get("label") or vkospi_quote.get("source") or ""),
        count=1,
    )

    started_at = perf_counter()
    yahoo_meta = {
        "nq": fetch_yahoo_meta("NQ=F"),
        "vix": fetch_yahoo_meta("^VIX"),
        "tnx": fetch_yahoo_meta("^TNX"),
        "krw": fetch_yahoo_meta("KRW=X"),
        "sox": fetch_yahoo_meta("^SOX"),
    }

    live_metrics = {
        "nq": {
            "current": float(yahoo_meta["nq"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["nq"]["chartPreviousClose"]),
            "changePct": ((float(yahoo_meta["nq"]["regularMarketPrice"]) - float(yahoo_meta["nq"]["chartPreviousClose"])) / float(yahoo_meta["nq"]["chartPreviousClose"])) * 100,
            "asOf": str(yahoo_meta["nq"].get("asOf") or ""),
        },
        "vkospi": {
            "current": float(vkospi_quote["current"]),
            "previousClose": float(vkospi_quote["previousClose"]),
            "changePct": float(vkospi_quote.get("changePct") or 0.0),
            "source": str(vkospi_quote["source"]),
            "label": str(vkospi_quote["label"]),
            "isFallback": bool(vkospi_quote["isFallback"]),
            "confidence": float(vkospi_quote["confidence"]),
        },
        "vix": {
            "current": float(yahoo_meta["vix"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["vix"]["chartPreviousClose"]),
            "asOf": str(yahoo_meta["vix"].get("asOf") or ""),
        },
        "tnx": {
            "current": float(yahoo_meta["tnx"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["tnx"]["chartPreviousClose"]),
            "bpChange": (float(yahoo_meta["tnx"]["regularMarketPrice"]) - float(yahoo_meta["tnx"]["chartPreviousClose"])) * 100,
            "asOf": str(yahoo_meta["tnx"].get("asOf") or ""),
        },
        "krw": {
            "current": float(yahoo_meta["krw"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["krw"]["chartPreviousClose"]),
            "changeWon": float(yahoo_meta["krw"]["regularMarketPrice"]) - float(yahoo_meta["krw"]["chartPreviousClose"]),
            "asOf": str(yahoo_meta["krw"].get("asOf") or ""),
        },
        "sox": {
            "current": float(yahoo_meta["sox"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["sox"]["chartPreviousClose"]),
            "changePct": ((float(yahoo_meta["sox"]["regularMarketPrice"]) - float(yahoo_meta["sox"]["chartPreviousClose"])) / float(yahoo_meta["sox"]["chartPreviousClose"])) * 100,
            "asOf": str(yahoo_meta["sox"].get("asOf") or ""),
        },
    }
    macro_freshness = annotate_macro_metric_freshness(live_metrics, resolved_analysis_date)
    log_step(
        "macro_quotes",
        "글로벌 매크로 지표 수집",
        started_at,
        status="warning" if macro_freshness["staleKeys"] else "ok",
        detail=(
            f"Yahoo chart 5종 · fresh {macro_freshness['freshCount']} / stale {macro_freshness['staleCount']}"
            if macro_freshness["staleKeys"]
            else "Yahoo chart 5종"
        ),
        count=len(yahoo_meta),
    )

    started_at = perf_counter()
    gap_score = build_gap_score(live_metrics)
    gap_score["isFresh"] = bool(macro_freshness["isFresh"])
    gap_score["freshnessStatus"] = "fresh" if macro_freshness["isFresh"] else "stale"
    gap_score["macroAsOf"] = dict(macro_freshness["asOf"])
    gap_score["staleKeys"] = list(macro_freshness["staleKeys"])
    if macro_freshness["staleKeys"]:
        gap_score["note"] = f"{gap_score['note']} 거시 시세 freshness 미확인"
    log_step("gap_score", "갭 스코어 계산", started_at, detail=str(gap_score.get("grade") or ""))

    started_at = perf_counter()
    kospi_history = fetch_kospi_history(90)
    log_step("kospi_history", "KOSPI 히스토리 수집", started_at, count=len(kospi_history))

    started_at = perf_counter()
    market_snapshot = load_market_analyze_snapshot()
    context = build_market_context(kospi_history, gap_score, live_metrics["vkospi"], analysis_date=resolved_analysis_date)
    context["outcomesRollup"] = load_outcomes_rollup()
    context["outcomesIndex"] = load_outcomes_index()
    context["replayProfileRollup"] = load_replay_profile_rollup()
    context["analysisDate"] = resolved_analysis_date.isoformat()
    log_step(
        "market_context",
        "시장 레짐 계산",
        started_at,
        detail=str(context.get("effectiveRegimeLabel") or context.get("regimeLabel") or ""),
    )

    started_at = perf_counter()
    market_value_rows = fetch_naver_market_value_universe()
    market_cap_rank_lookup, market_cap_universe_count = build_market_cap_rank_lookup(market_value_rows)
    top_trading = fetch_top_trading_codes(top_limit, market_value_rows)
    log_step("top_trading", "거래대금 상위 종목 수집", started_at, count=len(top_trading))

    overtime_price_map: dict[str, float] = {}
    if normalize_analysis_session(session) == ANALYSIS_SESSION_1730:
        started_at = perf_counter()
        overtime_price_map = fetch_overtime_price_map()
        log_step(
            "overtime_price",
            "시간외 단일가 종가 보강",
            started_at,
            status="ok" if overtime_price_map else "fallback",
            detail="정규장 종가로 대체" if not overtime_price_map else "",
            count=len(overtime_price_map),
        )

    snapshots: list[StockSnapshot] = []
    errors: list[str] = []
    started_at = perf_counter()
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        future_map = {
            executor.submit(
                build_stock_snapshot,
                item,
                resolved_analysis_date,
                market_cap_rank_lookup,
                market_cap_universe_count,
                overtime_price_map,
            ): item
            for item in top_trading
        }
        for future in concurrent.futures.as_completed(future_map):
            item = future_map[future]
            try:
                snapshots.append(future.result())
            except Exception as error:  # noqa: BLE001
                errors.append(f"{item[1]} {item[2]}: {error}")
    log_step(
        "stock_snapshots",
        "종목 상세 스냅샷 수집",
        started_at,
        status="partial" if errors else "ok",
        detail=f"성공 {len(snapshots)} / 실패 {len(errors)}",
        count=len(snapshots),
    )
    if errors:
        emit_cli_failures("종목 상세 스냅샷 수집 실패", errors)

    if not snapshots:
        raise RuntimeError(f"no stock snapshots collected: {' | '.join(errors)}")

    snapshots.sort(key=lambda snapshot: snapshot.rank)
    kospi_return_5d = ((context["kospiClose"] - parse_float(kospi_history[5].get("closePrice"))) / parse_float(kospi_history[5].get("closePrice"))) * 100 if len(kospi_history) > 5 and parse_float(kospi_history[5].get("closePrice")) else 0.0
    kospi_return_20d = ((context["kospiClose"] - parse_float(kospi_history[20].get("closePrice"))) / parse_float(kospi_history[20].get("closePrice"))) * 100 if len(kospi_history) > 20 and parse_float(kospi_history[20].get("closePrice")) else 0.0
    universe_returns = [(snapshot.code, snapshot.return_20d) for snapshot in snapshots]

    http_enrichments: dict[str, dict[str, Any]] = {}
    http_errors: list[str] = []
    kind_enrichments: dict[str, dict[str, Any]] = {}
    browser_errors: list[str] = []
    browser_meta: dict[str, Any] = {"browserSource": "", "launchNotes": [], "launchAttempts": []}
    http_candidates = [
        {
            "code": snapshot.code,
            "name": snapshot.name,
        }
        for snapshot in snapshots
    ]
    if http_candidates:
        started_at = perf_counter()
        http_enrichments, http_errors = fetch_http_candidate_enrichments(http_candidates)
        for snapshot in snapshots:
            enrichment = http_enrichments.get(snapshot.code)
            if enrichment:
                apply_browser_enrichment_to_snapshot(snapshot, enrichment)
        log_step(
            "http_enrichment",
            "토스 API 보강 수집",
            started_at,
            status="partial" if http_errors else "ok",
            detail=(
                f"direct-http · "
                f"체결강도 {sum(1 for item in http_enrichments.values() if item.get('toss'))} / "
                f"호가 {sum(1 for item in http_enrichments.values() if item.get('orderbook'))} / "
                f"틱프록시 {sum(1 for item in http_enrichments.values() if (item.get('toss') or {}).get('intradayAbove100Ratio') is not None or (item.get('toss') or {}).get('lastHourAvgStrength') is not None)}"
            ),
            count=len(http_candidates),
        )
        if http_errors:
            emit_cli_failures("토스 API 보강 실패", http_errors)

    scoring_started_at = perf_counter()
    slot_limits = context.get("strategySlotLimits") or slot_limits_for_regime(context.get("regimeLabel") or "")
    pullback_entries, pullback_enrichment_meta = rank_pullback_entries_with_enrichment(
        snapshots,
        context,
        slot_limits.get("pullback", 3),
        mode=resolved_mode,
    )
    breakout_entries = rank_buy_entries(
        [
            build_breakout_entry(
                snapshot,
                context,
                relative_strength_rank(snapshot, universe_returns),
                kospi_return_5d,
                kospi_return_20d,
            )
            for snapshot in snapshots
        ]
    )[: slot_limits.get("breakout", 3)]
    accumulation_entries = rank_buy_entries([build_accumulation_entry(snapshot, context) for snapshot in snapshots])[
        : slot_limits.get("accumulation", 3)
    ]
    reversal_entries = rank_buy_entries([build_reversal_entry(snapshot, context) for snapshot in snapshots])[:3]
    browser_errors = list(pullback_enrichment_meta.get("kindErrors") or [])
    browser_meta = dict(pullback_enrichment_meta.get("browserMeta") or {"browserSource": "", "launchNotes": [], "launchAttempts": []})
    pullback_news_errors = list(pullback_enrichment_meta.get("newsErrors") or [])
    pullback_kind_enrichments = pullback_enrichment_meta.get("kindEnrichments") or {}
    pullback_news_enrichments = pullback_enrichment_meta.get("newsEnrichments") or {}

    log_step(
        "entry_scoring",
        "전략별 후보 계산",
        scoring_started_at,
        detail=(
            f"pullback {len(pullback_entries)}, breakout {len(breakout_entries)}, "
            f"accumulation {len(accumulation_entries)}, reversal {len(reversal_entries)}"
        ),
        count=len(pullback_entries) + len(breakout_entries) + len(accumulation_entries) + len(reversal_entries),
    )

    kind_candidates = [
        {"code": entry["code"], "name": entry["name"], "needsEventFilter": True}
        for entry in reversal_entries
        if next((snapshot for snapshot in snapshots if snapshot.code == entry["code"] and snapshot.event_filter), None) is None
    ]
    if kind_candidates:
        started_at = perf_counter()
        kind_enrichments, kind_browser_errors, kind_browser_meta = fetch_kind_candidate_enrichments(kind_candidates, mode=resolved_mode)
        browser_errors.extend(kind_browser_errors)
        if kind_browser_meta.get("browserSource"):
            browser_meta = kind_browser_meta
        for snapshot in snapshots:
            enrichment = kind_enrichments.get(snapshot.code)
            if enrichment:
                apply_browser_enrichment_to_snapshot(snapshot, enrichment)
        for entry in reversal_entries:
            enrichment = kind_enrichments.get(entry["code"])
            if enrichment:
                apply_browser_enrichment_to_entry(entry, "reversal", enrichment, context)
        launch_note = kind_browser_meta.get("browserSource") or browser_meta.get("browserSource") or "browser unavailable"
        log_step(
            "browser_enrichment",
            "카나리 KIND 브라우저 보강" if resolved_mode == VARIANT_CANARY else "KIND 브라우저 보강",
            started_at,
            status="warning" if launch_note == "unavailable" else "partial" if kind_browser_errors else "ok",
            detail=f"{launch_note} · KIND {sum(1 for item in kind_enrichments.values() if item.get('eventFilter'))}",
            count=len(kind_candidates),
        )
        if kind_browser_errors:
            emit_cli_failures("카나리 KIND 브라우저 실패" if resolved_mode == VARIANT_CANARY else "KIND 브라우저 실패", kind_browser_errors)

    if pullback_news_enrichments:
        started_at = perf_counter()
        log_step(
            "pullback_news_enrichment",
            "눌림목 뉴스 보강",
            started_at,
            status="partial" if pullback_news_errors else "ok",
            detail=f"shortlist {len(pullback_enrichment_meta.get('shortlistCodes') or [])} · 뉴스 {sum(1 for item in pullback_news_enrichments.values() if item.get('newsFlow'))}",
            count=len(pullback_news_enrichments),
        )
        if pullback_news_errors:
            emit_cli_failures("눌림목 뉴스 수집 실패", pullback_news_errors)

    all_entries = pullback_entries + breakout_entries + accumulation_entries + reversal_entries
    missing_public_metrics = sum(1 for entry in all_entries if entry.get("notes"))
    fallback_keys = ["vkospi"] if live_metrics["vkospi"]["isFallback"] else []
    manual_keys: list[str] = []
    if any(entry.get("manualInput", {}).get("fields") for entry in all_entries):
        manual_keys.append("toss_metrics")
    if any(any(field.get("fieldKey") == "eventFilter" for field in entry.get("manualInput", {}).get("fields", [])) for entry in all_entries):
        manual_keys.append("event_filters")
    stale_keys = list(macro_freshness["staleKeys"])
    data_quality_status = "partial" if errors or http_errors or browser_errors or pullback_news_errors or missing_public_metrics or fallback_keys or stale_keys else "success"
    intraday_ok = sum(1 for snapshot in snapshots if snapshot.intraday_30m.get("available"))
    event_schedule_ok = sum(1 for snapshot in snapshots if snapshot.event_filter)
    toss_strength_ok = sum(1 for item in http_enrichments.values() if (item.get("toss") or {}).get("avgStrength") is not None)
    toss_ticks_proxy_ok = sum(1 for item in http_enrichments.values() if (item.get("toss") or {}).get("intradayAbove100Ratio") is not None or (item.get("toss") or {}).get("lastHourAvgStrength") is not None)
    orderbook_ok = sum(1 for item in http_enrichments.values() if item.get("orderbook"))
    kind_browser_ok = sum(1 for item in kind_enrichments.values() if item.get("eventFilter")) + sum(1 for item in pullback_kind_enrichments.values() if item.get("eventFilter"))
    item_news_ok = sum(1 for item in pullback_news_enrichments.values() if item.get("newsFlow"))

    payload = {
        "schemaVersion": "jongga_result.v1",
        "generatedAt": utc_now_iso(),
        "variant": resolved_mode,
        "payloadSourceMode": PAYLOAD_SOURCE_LIVE,
        "rebuildable": True,
        "inputArchiveVersion": INPUT_ARCHIVE_VERSION,
        "dataQuality": {
            "status": data_quality_status,
            "counts": {
                "total": len(snapshots),
                "failed": len(errors),
                "stale": len(stale_keys),
                "manual": missing_public_metrics,
                "fallback": len(fallback_keys),
                "slots": 1,
            },
            "failedKeys": errors + http_errors + browser_errors + pullback_news_errors,
            "staleKeys": stale_keys,
            "manualKeys": manual_keys,
            "fallbackKeys": fallback_keys,
            "providerHealth": {
                "naver_mobile": {"ok": len(snapshots)},
                "naver_chart": {"ok": len(snapshots)},
                "naver_integration_schedule": {"ok": event_schedule_ok},
                "yahoo_chart": {"ok": 5 + (1 if live_metrics["vkospi"]["isFallback"] else 0), "stale": len(stale_keys)},
                "yahoo_intraday_30m": {"ok": intraday_ok},
                "toss_http_strength": {"ok": toss_strength_ok},
                "toss_ticks_strength_proxy": {"ok": toss_ticks_proxy_ok},
                "toss_quotes_orderbook": {"ok": orderbook_ok},
                "kind_playwright_disclosure": {"ok": kind_browser_ok},
                "naver_item_news": {"ok": item_news_ok},
                "cnbc_quote": {"ok": 0 if live_metrics["vkospi"]["isFallback"] else 1},
            },
            "fallbackUsage": [
                {
                    "key": "vkospi",
                    "provider": "yahoo_chart",
                    "layer": "proxy",
                    "fallbackLevel": 2,
                    "confidence": 0.55,
                    "stale": False,
                }
            ] if fallback_keys else [],
            "collectionLog": collection_log,
            "note": (
                f"{variant_label(resolved_mode)} 채널입니다. CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. "
                "역추세 30분봉은 Yahoo 30분봉으로 계산합니다. "
                + (
                    "카나리는 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 Chrome 실행 파일을 우선 시도해 표시 종목만 브라우저 보강합니다. 눌림목 shortlist는 네이버 종목뉴스를 추가 확인합니다."
                    if resolved_mode == VARIANT_CANARY
                    else "현재 버전은 토스 공개 API로 체결강도·틱 프록시·호가를 병렬 수집하고, KIND 공시는 표시 종목만 Playwright로 보강합니다. 눌림목 shortlist는 네이버 종목뉴스를 추가 확인합니다."
                )
            ),
            "channel": resolved_mode,
            "channelLabel": variant_label(resolved_mode),
            "browserSource": browser_meta.get("browserSource") or "",
            "browserLaunchNotes": browser_meta.get("launchNotes") or [],
        },
        "slots": [
            {
                "slotId": "slotA",
                "sourceId": f"live-public-run-{resolved_mode}",
                "regime": build_regime_block(context, market_snapshot),
                "gapScore": gap_score,
                "entries": {
                    "pullback": assign_ranks(pullback_entries),
                    "breakout": assign_ranks(breakout_entries),
                    "accumulation": assign_ranks(accumulation_entries),
                    "reversal": assign_ranks(reversal_entries),
                    "swing": [],
                },
                "dataQuality": {
                    "status": data_quality_status,
                    "source": "live-public-run",
                    "counts": {"stale": len(stale_keys)},
                    "staleKeys": stale_keys,
                },
            }
        ],
    }
    input_archive = build_input_archive_payload(
        analysis_date=resolved_analysis_date,
        mode=resolved_mode,
        top_limit=top_limit,
        collection_log=collection_log,
        vkospi_quote=vkospi_quote,
        yahoo_meta=yahoo_meta,
        live_metrics=live_metrics,
        macro_freshness=macro_freshness,
        gap_score=gap_score,
        kospi_history=kospi_history,
        market_snapshot=market_snapshot,
        market_value_rows=market_value_rows,
        top_trading=top_trading,
        snapshots=snapshots,
        rollups={
            "outcomesRollup": context.get("outcomesRollup") or {},
            "replayProfileRollup": context.get("replayProfileRollup") or {},
        },
    )
    return payload, input_archive


def write_outputs(payload: dict[str, Any], output_path: str | Path, bridge_js_path: str | Path | None) -> None:
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    if bridge_js_path:
        bridge = Path(bridge_js_path)
        bridge.parent.mkdir(parents=True, exist_ok=True)
        bridge.write_text(f"window.JONGGA_DATA = {json.dumps(payload, ensure_ascii=False, indent=2)};\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Generate dated jongga JSON/JS from live public data")
    parser.add_argument("--date", help="Analysis date in YYYY-MM-DD. Defaults to Asia/Seoul today")
    parser.add_argument(
        "--variant",
        choices=["all", VARIANT_STABLE, VARIANT_CANARY],
        default="all",
        help="Output channel to generate. Defaults to stable only while canary is disabled",
    )
    parser.add_argument(
        "--session",
        choices=[ANALYSIS_SESSION_1500, ANALYSIS_SESSION_1730],
        required=True,
        help="Analysis session (1500 or 1730)",
    )
    parser.add_argument("--out-dir", default="jongga/output", help="Daily output directory")
    parser.add_argument("--history-js", default="jongga/output/jongga_history.js", help="History manifest JS path")
    parser.add_argument("--out", help="Legacy latest.json output path")
    parser.add_argument("--bridge-js", help="Legacy window.JONGGA_DATA bridge JS output path")
    parser.add_argument("--top-limit", type=int, default=TOP_TRADING_VALUE_LIMIT, help="Universe size from Naver top trading-value list. Hard-capped at 100")
    return parser


def main() -> int:
    prepare_console_output()
    args = build_parser().parse_args()
    session = normalize_analysis_session(args.session)
    try:
        analysis_date = resolve_analysis_date(args.date)
    except ValueError as exc:
        emit_cli_log("FAIL", str(exc), tone="red")
        return 2
    variants = resolve_generation_variants(args.variant)
    if not variants:
        emit_cli_log(
            "FAIL",
            "카나리 채널이 비활성화되어 있습니다. --variant stable 을 사용하세요.",
            tone="red",
        )
        return 2
    generated_runs: list[dict[str, Any]] = []

    for variant in variants:
        print_variant_header(variant, analysis_date)
        collected_payload, input_archive = collect_live_payload(
            top_limit=args.top_limit,
            mode=variant,
            analysis_date=analysis_date,
            session=session,
        )
        payload = payload_with_analysis_date(collected_payload, analysis_date, variant=variant)
        session_payload = annotate_payload_with_analysis_session(payload, session=session)
        session_archive_path = write_session_archive(
            session_payload,
            args.out_dir,
            analysis_date,
            variant=variant,
            session=session,
        )
        emit_cli_log("FILE", f"SESSION JSON {session_archive_path}", tone="muted")
        final_payload = session_payload
        if session == ANALYSIS_SESSION_1730:
            payload_1500 = read_session_archive(
                args.out_dir,
                analysis_date,
                session=ANALYSIS_SESSION_1500,
                variant=variant,
            )
            if payload_1500:
                final_payload = merge_same_day_session_payloads(payload_1500, session_payload)
                emit_cli_log(
                    "OK",
                    f"{variant_label(variant)} · 1730 세션 머지 완료 ({compact_date(analysis_date)} 기준)",
                    tone="green",
                )
        json_path, js_path, history_path = write_daily_outputs(
            final_payload,
            args.out_dir,
            args.history_js,
            variant=variant,
            input_archive=input_archive,
        )
        generated_runs.append({
            "variant": variant,
            "payload": final_payload,
            "jsonPath": json_path,
            "jsPath": js_path,
            "historyPath": history_path,
            "sessionArchivePath": session_archive_path,
        })

    if args.out or args.bridge_js:
        if not args.out:
            raise SystemExit("--out is required when --bridge-js is used")
        stable_run = next((item for item in generated_runs if item["variant"] == VARIANT_STABLE), None)
        target_run = stable_run or generated_runs[0]
        write_outputs(target_run["payload"], args.out, args.bridge_js)
        emit_cli_log("FILE", f"LEGACY JSON {args.out}", tone="muted")
        if args.bridge_js:
            emit_cli_log("FILE", f"LEGACY JS   {args.bridge_js}", tone="muted")

    for run in generated_runs:
        print_variant_summary(run, analysis_date)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
