from __future__ import annotations

import argparse
import concurrent.futures
import json
import math
import re
from time import perf_counter
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


USER_AGENT = "Mozilla/5.0 jongga-live-generator/1.0"
BROWSER_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
TOSS_ORDER_URL_TEMPLATE = "https://www.tossinvest.com/stocks/A{code}/order"
NAVER_ORDERBOOK_URL_TEMPLATE = "https://finance.naver.com/item/main.naver?code={code}"
KIND_DISCLOSURE_SEARCH_URL = "https://kind.krx.co.kr/disclosureSimpleSearch.do?method=disclosureSimpleSearchMain"
ETF_NAME_PATTERN = re.compile(
    r"KODEX|TIGER|KOSEF|KBSTAR|ARIRANG|HANARO|ACE|SOL|TIMEFOLIO|PLUS|ETF|ETN|스팩|우B?$",
    re.IGNORECASE,
)
KIND_EARNINGS_EVENT_PATTERN = re.compile(r"기업설명회\(IR\)\s*개최|영업\(잠정\)실적|잠정실적|실적발표|결산실적", re.IGNORECASE)
KIND_CORP_ACTION_PATTERN = re.compile(r"주주총회소집결의|배당\s*결정|분할결정|합병결정|유상증자결정|무상증자결정|감자결정|권리락|주식교환|주식이전|공개매수", re.IGNORECASE)


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def parse_int(value: Any) -> int:
    text = str(value or "").replace(",", "")
    match = re.search(r"-?\d+", text)
    return int(match.group(0)) if match else 0


def parse_float(value: Any) -> float:
    text = str(value or "").replace(",", "")
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    return float(match.group(0)) if match else 0.0


def signed_number(value: float, digits: int = 1, suffix: str = "") -> str:
    if not math.isfinite(value):
        return "-"
    return f"{'+' if value >= 0 else ''}{value:.{digits}f}{suffix}"


def to_status(passed: bool, note: str = "") -> dict[str, str]:
    return {"status": "✅" if passed else "⛔", "note": note}


def warning_status(note: str) -> dict[str, str]:
    return {"status": "⚠️", "note": note}


def request_text(url: str, *, timeout: float = 15.0, encoding: str | None = None) -> str:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=timeout) as response:
        raw = response.read()
        detected = encoding or response.headers.get_content_charset() or "utf-8"
        return raw.decode(detected, errors="replace")


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
    meta = fetch_yahoo_chart_result(symbol, range_value="5d", interval="1d").get("meta")
    if meta:
        return meta
    raise RuntimeError(f"failed to fetch yahoo meta for {symbol}: meta missing")


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
        "source": "toss_playwright_response",
        "sourceUrl": TOSS_ORDER_URL_TEMPLATE.format(code=str(row.get('code', '')).replace('A', '')),
        "asOf": str(row.get("tradeDateTime") or ""),
    }


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
        page.goto(TOSS_ORDER_URL_TEMPLATE.format(code=code), wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(5000)
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
        page.wait_for_timeout(1500)
        return parse_naver_orderbook_ratio_html(page.content(), code)
    finally:
        page.close()


def fetch_kind_event_filter_with_browser(context: Any, code: str, company_name: str) -> dict[str, Any] | None:
    page = context.new_page()
    configure_browser_page(page)
    try:
        page.goto(KIND_DISCLOSURE_SEARCH_URL, wait_until="domcontentloaded", timeout=30000)
        page.fill("#AKCKwdTop", code)
        page.click("input.submit")
        page.wait_for_timeout(4000)
        rows = [text.strip() for text in page.locator("table.list.type-00 tbody tr").all_inner_texts() if text.strip()]
        parsed_rows = parse_kind_disclosure_rows(rows, company_name)
        return build_kind_event_filter_from_rows(parsed_rows)
    finally:
        page.close()


def fetch_browser_candidate_enrichments(candidates: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], list[str]]:
    if not candidates:
        return {}, []
    try:
        from playwright.sync_api import sync_playwright
    except Exception as error:  # noqa: BLE001
        return {}, [f"playwright unavailable: {error}"]

    enrichments: dict[str, dict[str, Any]] = {}
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1600}, user_agent=BROWSER_USER_AGENT, locale="ko-KR")
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
    return enrichments, errors


def is_entry_field_satisfied(entry: dict[str, Any], field_key: str) -> bool:
    toss = entry.get("toss") or {}
    orderbook = entry.get("orderbook") or {}
    event_filter = entry.get("eventFilter") or {}
    if field_key == "toss.avgStrength":
        return math.isfinite(parse_float(toss.get("avgStrength"))) and parse_float(toss.get("avgStrength")) > 0
    if field_key == "toss.intradayAbove100Ratio":
        return math.isfinite(parse_float(toss.get("intradayAbove100Ratio"))) and parse_float(toss.get("intradayAbove100Ratio")) > 0
    if field_key == "toss.lastHourAvgStrength":
        return math.isfinite(parse_float(toss.get("lastHourAvgStrength"))) and parse_float(toss.get("lastHourAvgStrength")) > 0
    if field_key == "orderbook.bidAskRatio":
        return math.isfinite(parse_float(orderbook.get("bidAskRatio"))) and parse_float(orderbook.get("bidAskRatio")) > 0
    if field_key == "eventFilter":
        return bool(event_filter.get("blocked")) or bool(normalize_text(event_filter.get("note"))) or event_filter.get("earningsDays") is not None or event_filter.get("corporateActionDays") is not None
    return False


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
    toss = entry.get("toss") or {}
    orderbook = entry.get("orderbook") or {}
    event_filter = entry.get("eventFilter") or {}
    if strategy == "momentum":
        if not is_entry_field_satisfied(entry, "toss.avgStrength"):
            notes.append("토스 체결강도 미반영")
        if not is_entry_field_satisfied(entry, "toss.intradayAbove100Ratio"):
            notes.append("체결강도 100% 유지 비율 미반영")
        if not is_entry_field_satisfied(entry, "orderbook.bidAskRatio"):
            notes.append("호가잔량 미반영")
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
    if isinstance(toss, dict):
        merged_toss = dict(entry.get("toss") or {})
        merged_toss.update(toss)
        entry["toss"] = merged_toss
    if isinstance(orderbook, dict):
        merged_orderbook = dict(entry.get("orderbook") or {})
        merged_orderbook.update(orderbook)
        entry["orderbook"] = merged_orderbook
    if strategy == "reversal" and isinstance(event_filter, dict):
        entry["eventFilter"] = {**(entry.get("eventFilter") or {}), **event_filter}
        filters = entry.get("filters") if isinstance(entry.get("filters"), list) else []
        for row in filters:
            if row.get("code") == "F3":
                row["status"] = "⛔" if event_filter.get("blocked") else "✅"
                row["note"] = normalize_text(event_filter.get("note")) or ("KIND 최근공시 차단" if event_filter.get("blocked") else "이벤트 필터 통과")
        entry["statusLabel"] = reversal_status_label(entry.get("grade", "C"), context["regimeLabel"], context["gapScore"]["code"], filters, entry.get("gates") or [])
    sync_entry_manual_input(entry)
    rebuild_entry_notes(entry, strategy)


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



def fetch_top_trading_codes(limit: int = 30) -> list[tuple[int, str, str]]:
    text = request_text("https://finance.naver.com/sise/sise_quant.naver", timeout=20.0, encoding="euc-kr")
    results: list[tuple[int, str, str]] = []
    seen: set[str] = set()
    for match in re.finditer(r'/item/main\.naver\?code=(\d{6})[^>]*>([^<]+)</a>', text):
        code = match.group(1)
        name = match.group(2).strip()
        if code in seen or ETF_NAME_PATTERN.search(name):
            continue
        seen.add(code)
        results.append((len(results) + 1, code, name))
        if len(results) >= limit:
            break
    if not results:
        raise RuntimeError("failed to scrape top trading codes from Naver")
    return results


def moving_average(values: list[float], period: int, offset: int = 0) -> float | None:
    start = offset
    end = offset + period
    if len(values) < end:
        return None
    window = values[start:end]
    return sum(window) / period


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
    intraday_30m: dict[str, Any]
    event_filter: dict[str, Any] | None


def build_stock_snapshot(item: tuple[int, str, str]) -> StockSnapshot:
    rank, code, name = item
    basic = request_json(f"https://m.stock.naver.com/api/stock/{code}/basic", timeout=20.0)
    integration = request_json(f"https://m.stock.naver.com/api/stock/{code}/integration", timeout=20.0)
    history_rows = fetch_naver_price_history(code, 130)
    if len(history_rows) < 30:
        raise RuntimeError(f"insufficient history for {code}")

    close_history = [float(parse_int(row["closePrice"])) for row in history_rows]
    high_history = [float(parse_int(row["highPrice"])) for row in history_rows]
    low_history = [float(parse_int(row["lowPrice"])) for row in history_rows]
    volume_history = [float(parse_int(row["accumulatedTradingVolume"])) for row in history_rows]
    total_infos = integration.get("totalInfos", []) or []
    deals = integration.get("dealTrendInfos", []) or []
    today_deal = deals[0] if deals else {}
    previous_deal = deals[1] if len(deals) > 1 else {}

    high_52w = parse_float(find_total_info(total_infos, "highPriceOf52Weeks")) or max(high_history[:120])
    current_price = parse_float(basic.get("closePrice") or basic.get("stockPrice")) or close_history[0]
    prev_close = parse_float(find_total_info(total_infos, "lastClosePrice")) or close_history[1]
    open_price = parse_float(find_total_info(total_infos, "openPrice")) or parse_float(history_rows[0]["openPrice"])
    high_price = parse_float(find_total_info(total_infos, "highPrice")) or parse_float(history_rows[0]["highPrice"])
    low_price = parse_float(find_total_info(total_infos, "lowPrice")) or parse_float(history_rows[0]["lowPrice"])

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
        volume=parse_float(find_total_info(total_infos, "accumulatedTradingVolume")) or volume_history[0],
        trading_value_text=find_total_info(total_infos, "accumulatedTradingValue"),
        market_cap_trillion=parse_market_cap_trillion(find_total_info(total_infos, "marketValue")),
        foreign_net=parse_float(today_deal.get("foreignerPureBuyQuant")),
        institution_net=parse_float(today_deal.get("organPureBuyQuant")),
        foreign_previous=parse_float(previous_deal.get("foreignerPureBuyQuant")),
        institution_previous=parse_float(previous_deal.get("organPureBuyQuant")),
        close_history=close_history,
        high_history=high_history,
        low_history=low_history,
        volume_history=volume_history,
        ma5=ma5,
        ma10=ma10,
        ma20=ma20,
        ma60=ma60,
        ma5_prev=ma5_prev,
        ma20_prev=ma20_prev,
        ma60_prev=ma60_prev,
        weekly_rsi=weekly_rsi,
        macd_hist=compute_macd_histogram(close_history),
        high_20d=max(high_history[:20]),
        low_5d=min(low_history[:5]),
        high_52w=high_52w,
        return_5d=return_5d,
        return_20d=return_20d,
        return_21d=return_21d,
        volume_avg_5d=(sum(volume_history[1:6]) / 5) if len(volume_history) > 5 else volume_history[0],
        volume_avg_20d=(sum(volume_history[1:21]) / 20) if len(volume_history) > 20 else sum(volume_history) / len(volume_history),
        intraday_30m=intraday_30m,
        event_filter=event_filter,
    )


def stock_daily_change(snapshot: StockSnapshot) -> float:
    return ((snapshot.current_price - snapshot.prev_close) / snapshot.prev_close) * 100 if snapshot.prev_close else 0.0


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
        entry_adjustment = "⚠️ S등급 50% 진입만 허용 / ❌ 진입 보류"
        sell_adjustment = "프리마켓 첫 가격 즉시 50% 정리 | 손절폭 -1%p 축소"
        swing_adjustment = "금지"
    else:
        grade_code = "G-E"
        grade = "G-E 🔴"
        entry_adjustment = "❌ 전 등급 진입 금지 / ❌ 진입 금지"
        sell_adjustment = "진입 없음 | 해당 없음"
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
    if vkospi_proxy < 20:
        return 1.0
    if vkospi_proxy <= 30:
        return 0.9
    return 0.8


def reversal_vkospi_multiplier(vkospi_proxy: float) -> float:
    if vkospi_proxy < 20:
        return 0.8
    if vkospi_proxy <= 30:
        return 1.0
    return 0.9


def grade_from_score(score: float, strategy: str) -> str:
    if strategy == "reversal":
        if score >= 8.5:
            return "S"
        if score >= 7.0:
            return "A"
        if score >= 5.5:
            return "B"
        return "C"
    if score >= 9.0:
        return "S"
    if score >= 7.5:
        return "A"
    if score >= 6.0:
        return "B"
    return "C"


def decide_regime(kospi_history: list[dict[str, Any]], vkospi_proxy: float) -> tuple[str, str, str, str, str]:
    closes = [parse_float(row.get("closePrice")) for row in kospi_history]
    ma20 = moving_average(closes, 20)
    ma60 = moving_average(closes, 60)
    ma20_prev = moving_average(closes, 20, 1)
    ma60_prev = moving_average(closes, 60, 1)
    ma20_up = bool(ma20 and ma20_prev and ma20 > ma20_prev)
    ma60_up = bool(ma60 and ma60_prev and ma60 > ma60_prev)
    ma60_flat = bool(ma60 and ma60_prev and abs(ma60 - ma60_prev) / ma60 < 0.003)
    if not ma60_up or vkospi_proxy > 30:
        return "약세장 ⛔", "none", "none", "금지", "비활성"
    if ma60_up and ma20_up and vkospi_proxy < 20:
        return "강세장 ✅", "momentum", "pullback", "적극", "활성"
    if ma60_flat and vkospi_proxy <= 25:
        return "순환매장 🔄", "momentum", "pullback", "제한", "제한 활성"
    return "박스권 ⚠️", "pullback", "momentum", "조건부", "활성"


def build_market_context(kospi_history: list[dict[str, Any]], gap_score: dict[str, Any], vkospi_quote: dict[str, Any] | float) -> dict[str, Any]:
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
    regime_label, primary_strategy, secondary_strategy, swing_mode, reversal_track = decide_regime(kospi_history, resolved_vkospi["current"])
    return {
        "regimeLabel": regime_label,
        "primaryStrategy": primary_strategy,
        "secondaryStrategy": secondary_strategy,
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
        "breadthAdvances": advances,
        "breadthDeclines": declines,
        "gapScore": gap_score,
    }


def build_regime_block(context: dict[str, Any]) -> dict[str, Any]:
    primary = {"momentum": "수급매집형", "pullback": "눌림목", "none": "없음"}[context["primaryStrategy"]]
    secondary = {"momentum": "수급매집형", "pullback": "눌림목", "none": "없음"}[context["secondaryStrategy"]]
    table = [
        {"item": "레짐", "value": context["regimeLabel"]},
        {"item": "KOSPI", "value": f"{context['kospiClose']:.2f} ({signed_number(context['kospiChangePct'], 2, '%')})"},
        {"item": "VKOSPI", "value": f"{context['vkospiLabel']} {context['vkospiValue']:.2f}"},
        {"item": "진입 전략", "value": f"메인={primary} / 서브={secondary}"},
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
        {"item": "시장 맥락", "value": f"공개 데이터 기반 레짐 산출 / 갭 {context['gapScore']['grade']}", "verdict": context['regimeLabel']},
    ]
    return {
        "table": table,
        "evidence": evidence,
        "alert": "CNBC VKOSPI 실측을 우선 사용하며 실패 시 VIX 프록시로 폴백합니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다." if context["vkospiIsFallback"] else "CNBC VKOSPI 실측을 사용했습니다. 토스 데이터와 이벤트 필터는 수동 확인이 필요합니다.",
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
    top_count = max(1, math.ceil(len(ordered) * 0.1))
    return any(code == snapshot.code for code, _ in ordered[:top_count])


def build_trade_plan(strategy: str, entry_price: float, regime_label: str, gap_code: str) -> list[dict[str, str]]:
    gap_offset = -0.5 if gap_code == "G-C" else -1.0 if gap_code == "G-D" else 0.0
    if strategy == "pullback":
        if regime_label.startswith("강세장"):
            premarket, open_target, intraday, stop = 3.0 + gap_offset, 4.5 + gap_offset, 9.0, -3.0 + min(gap_offset, 0.0)
        elif regime_label.startswith("박스권"):
            premarket, open_target, intraday, stop = 2.0 + gap_offset, 3.0 + gap_offset, 6.5, -2.0 + min(gap_offset, 0.0)
        else:
            premarket, open_target, intraday, stop = 1.5 + gap_offset, 2.5 + gap_offset, 3.0, -1.5 + min(gap_offset, 0.0)
    elif strategy == "momentum":
        if regime_label.startswith("강세장"):
            premarket, open_target, intraday, stop = 4.0 + gap_offset, 7.0 + gap_offset, 15.0, -4.0 + min(gap_offset, 0.0)
        elif regime_label.startswith("박스권"):
            premarket, open_target, intraday, stop = 3.0 + gap_offset, 5.0 + gap_offset, 10.0, -3.0 + min(gap_offset, 0.0)
        else:
            premarket, open_target, intraday, stop = 2.0 + gap_offset, 4.0 + gap_offset, 5.0, -2.0 + min(gap_offset, 0.0)
    else:
        premarket, open_target, intraday, stop = 3.0, 4.5, 8.0, -3.0 + min(gap_offset, 0.0)

    def target(rate: float) -> str:
        return f"{round(entry_price * (1 + rate / 100)):,}원"

    rows = [
        {"stage": "🌅 프리마켓", "condition": f"{signed_number(premarket, 1, '%')} 도달", "quantity": "40% 익절" if strategy != "reversal" else "50% 익절", "targetYield": signed_number(premarket, 1, "%"), "targetPrice": target(premarket)},
        {"stage": "🔔 장초반", "condition": f"{signed_number(open_target, 1, '%')} 도달", "quantity": "30% 익절", "targetYield": signed_number(open_target, 1, "%"), "targetPrice": target(open_target)},
        {"stage": "📈 장중 1차", "condition": f"{signed_number(intraday, 1, '%')} 도달", "quantity": "잔량 전량" if strategy == "reversal" else "30% 익절", "targetYield": signed_number(intraday, 1, "%"), "targetPrice": target(intraday)},
    ]
    if strategy != "reversal":
        rows.append({"stage": "📈 장중 2차", "condition": "추세 유지 시", "quantity": "잔량 보유", "targetYield": signed_number(intraday + 3.0, 1, "%"), "targetPrice": target(intraday + 3.0)})
        rows.append({"stage": "📊 스윙 전환", "condition": "V 조건 충족 시", "quantity": "잔량 보유", "targetYield": signed_number(intraday + 6.0, 1, "%"), "targetPrice": target(intraday + 6.0)})
    rows.append({"stage": "🛑 손절", "condition": f"{signed_number(stop, 1, '%')} 이탈", "quantity": "전량", "targetYield": signed_number(stop, 1, "%"), "targetPrice": target(stop)})
    return rows


def trend_status_label(grade: str, regime_label: str, gap_code: str, gates: list[dict[str, Any]]) -> str:
    blocked = any(gate["status"] == "⛔" for gate in gates)
    if blocked:
        return "매매금지(핵심 Gate 미충족)"
    if gap_code == "G-E":
        return "매매금지(갭다운 경고)"
    if regime_label.startswith("약세장"):
        return "매매금지(약세장)" if grade != "S" else "강력매수(소액)"
    if grade == "S":
        return "강력매수"
    if grade == "A":
        return "매수추천"
    if grade == "B":
        return "관심후보"
    return "제외"


def reversal_status_label(grade: str, regime_label: str, gap_code: str, filters: list[dict[str, Any]], gates: list[dict[str, Any]]) -> str:
    if any(row["status"] == "⛔" for row in filters + gates):
        return "매매금지"
    if regime_label.startswith("약세장") or gap_code in {"G-D", "G-E"}:
        return "매매금지"
    if grade == "S":
        return "최우선 진입"
    if grade == "A":
        return "진입 가능"
    if grade == "B":
        return "매매금지"
    return "제외"


def rr_text(entry_price: float, stop_rate: float, target_rate: float) -> str:
    risk = abs(stop_rate)
    reward = abs(target_rate)
    if risk <= 0:
        return "1 : -"
    return f"1 : {reward / risk:.1f}"


def build_manual_input_fields(strategy: str, snapshot: StockSnapshot) -> list[dict[str, Any]]:
    toss_order_url = f"https://www.tossinvest.com/stocks/A{snapshot.code}/order"
    toss_chart_url = f"https://www.tossinvest.com/stocks/A{snapshot.code}/chart"
    kind_disclosure_url = "https://kind.krx.co.kr/disclosure/disclosurecompany.do?method=searchDisclosureCompanyMain"
    auto_event_filter_ready = bool(
        snapshot.event_filter
        and (
            snapshot.event_filter.get("blocked")
            or snapshot.event_filter.get("earningsDays") is not None
            or snapshot.event_filter.get("corporateActionDays") is not None
        )
    )
    if strategy == "momentum":
        return [
            {
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
            },
            {
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
            },
            {
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
            },
        ]
    if strategy == "reversal":
        fields = [
            {
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
            },
            {
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
            },
            {
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
            },
        ]
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


def build_pullback_entry(snapshot: StockSnapshot, context: dict[str, Any]) -> dict[str, Any]:
    manual_input = build_manual_input_meta("pullback", snapshot)
    gates = [
        {"code": "G1", **to_status(bool(snapshot.ma5 and snapshot.ma20 and snapshot.ma60 and snapshot.ma5 > snapshot.ma20 > snapshot.ma60 and snapshot.ma5_prev and snapshot.ma5 > snapshot.ma5_prev), "5MA>20MA>60MA")},
        {"code": "G2", **to_status(bool(snapshot.ma60 and snapshot.current_price > snapshot.ma60), "종가 > 60MA")},
        {"code": "G3", **(to_status(bool(snapshot.weekly_rsi and snapshot.weekly_rsi >= 50), f"주봉 RSI {snapshot.weekly_rsi:.1f}" if snapshot.weekly_rsi else "") if snapshot.weekly_rsi is not None else warning_status("주봉 RSI 계산 데이터 제한"))},
        {"code": "G4", **to_status(bool((snapshot.macd_hist[:1] and snapshot.macd_hist[0] >= 0) or recent_negative_cross(snapshot.macd_hist)), "MACD 히스토그램")},
        {"code": "G5", **to_status(bool(context["kospiClose"] > context["kospiMa5"] and context["vkospiValue"] <= 30), f"KOSPI>{context['kospiMa5']:.2f}, {context['vkospiLabel']} {context['vkospiValue']:.2f}")},
    ]
    score_items = {
        "S1": 1.0 if snapshot.rank <= 10 else 0.0,
        "S2": 1.0 if snapshot.foreign_net > 0 or snapshot.institution_net > 0 else 0.0,
        "P1": 1.0 if snapshot.high_20d and -15 <= ((snapshot.current_price - snapshot.high_20d) / snapshot.high_20d) * 100 <= -7 else 0.0,
        "P2": 1.0 if any(ma and snapshot.current_price > ma for ma in [snapshot.ma5, snapshot.ma10, snapshot.ma20]) else 0.0,
        "C1": 1.0 if snapshot.current_price >= snapshot.open_price or lower_wick_ratio(snapshot) >= 1.0 else 0.0,
        "C2": 1.0 if snapshot.volume_avg_5d and 1.0 <= snapshot.volume / snapshot.volume_avg_5d <= 1.8 else 0.0,
        "C3": 0.0,
    }
    raw_score = score_items["S1"] * 2 + score_items["S2"] * 2 + score_items["P1"] * 1.5 + score_items["P2"] * 1.5 + score_items["C1"] + score_items["C2"] + score_items["C3"]
    final_score = round(raw_score * trend_vkospi_multiplier(context["vkospiValue"]), 1)
    grade = grade_from_score(final_score, "pullback")
    trade_plan = build_trade_plan("pullback", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    return {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        "score": final_score,
        "grade": grade,
        "statusLabel": trend_status_label(grade, context["regimeLabel"], context["gapScore"]["code"], gates),
        "strategy": "pullback",
        "gates": gates,
        "matchedRules": [{"code": code, "note": "공개 데이터 충족"} for code, passed in score_items.items() if passed >= 1.0],
        "unmatchedRules": [{"code": code, "note": "미충족 또는 공개 데이터 부족"} for code, passed in score_items.items() if passed < 1.0],
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        "keyPoint": f"5/20/60MA 정렬과 거래대금 상위 여부를 공개 데이터로 점검했습니다. 외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주.",
        "notes": ["토스 체결강도·섹터 outperform은 미반영"] if score_items["C3"] == 0.0 else [],
        "manualInput": manual_input,
        "tradePlanRows": trade_plan,
        "rr": rr_text(snapshot.current_price, parse_float(trade_plan[-1]["targetYield"]), parse_float(trade_plan[0]["targetYield"])),
        "source": "jongga-live",
    }


def build_momentum_entry(snapshot: StockSnapshot, context: dict[str, Any], rs_top10: bool, kospi_return_5d: float, kospi_return_20d: float) -> dict[str, Any]:
    manual_input = build_manual_input_meta("momentum", snapshot)
    gates = [
        {"code": "G1", **to_status(rs_top10, "3개월 상대강도 상위 10%")},
        {"code": "G2", **to_status(snapshot.return_5d - kospi_return_5d > 0 and snapshot.return_20d - kospi_return_20d > 0, "5일·20일 초과수익률")},
        {"code": "G3", **to_status(bool(snapshot.high_52w and snapshot.current_price >= snapshot.high_52w * 0.92), f"52주 고가 대비 {snapshot.current_price / snapshot.high_52w * 100:.1f}%" if snapshot.high_52w else "")},
        {"code": "G4", **to_status(snapshot.rank <= 30, f"거래대금 순위 {snapshot.rank}")},
    ]
    score_items = {
        "S1": 1.0 if snapshot.foreign_net > 0 and snapshot.institution_net > 0 else 0.0,
        "S2": 0.0,
        "P1": 1.0 if snapshot.high_20d and snapshot.current_price >= snapshot.high_20d * 0.95 else 0.0,
        "P2": 1.0 if snapshot.volume_avg_20d and snapshot.volume >= snapshot.volume_avg_20d * 1.5 else 0.0,
        "C1": 1.0 if snapshot.high_price and snapshot.current_price >= snapshot.high_price * 0.95 else 0.0,
        "C2": 1.0 if candle_range(snapshot) > 0 and abs(snapshot.current_price - snapshot.open_price) >= candle_range(snapshot) * 0.7 and upper_wick_ratio(snapshot) <= 0.3 else 0.0,
        "C3": 0.0,
    }
    raw_score = score_items["S1"] * 2 + score_items["S2"] * 2 + score_items["P1"] * 1.5 + score_items["P2"] * 1.5 + score_items["C1"] + score_items["C2"] + score_items["C3"]
    final_score = round(raw_score * trend_vkospi_multiplier(context["vkospiValue"]), 1)
    grade = grade_from_score(final_score, "momentum")
    trade_plan = build_trade_plan("momentum", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    return {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        "score": final_score,
        "grade": grade,
        "statusLabel": trend_status_label(grade, context["regimeLabel"], context["gapScore"]["code"], gates),
        "strategy": "momentum",
        "gates": gates,
        "matchedRules": [{"code": code, "note": "공개 데이터 충족"} for code, passed in score_items.items() if passed >= 1.0],
        "unmatchedRules": [{"code": code, "note": "토스 또는 추가 데이터 필요"} for code, passed in score_items.items() if passed < 1.0],
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        "keyPoint": f"상대강도 상위 여부와 돌파 지속성을 공개 데이터로 계산했습니다. 외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주.",
        "notes": ["토스 체결강도·호가잔량 미반영"],
        "manualInput": manual_input,
        "tradePlanRows": trade_plan,
        "rr": rr_text(snapshot.current_price, parse_float(trade_plan[-1]["targetYield"]), parse_float(trade_plan[0]["targetYield"])),
        "source": "jongga-live",
    }


def build_reversal_entry(snapshot: StockSnapshot, context: dict[str, Any]) -> dict[str, Any]:
    manual_input = build_manual_input_meta("reversal", snapshot)
    auto_event_filter = snapshot.event_filter
    intraday_signal = snapshot.intraday_30m
    daily_returns = []
    for current, previous in zip(snapshot.close_history[:5], snapshot.close_history[1:6]):
        if previous:
            daily_returns.append(((current - previous) / previous) * 100)
    drawdown_20d = ((snapshot.current_price - snapshot.high_20d) / snapshot.high_20d) * 100 if snapshot.high_20d else 0.0
    bullish = snapshot.current_price > snapshot.open_price
    doji = candle_range(snapshot) > 0 and abs(snapshot.current_price - snapshot.open_price) <= candle_range(snapshot) * 0.3
    long_lower = lower_wick_ratio(snapshot) >= 1.5
    g5_variant = "G5-a" if bullish else "G5-b" if long_lower else "G5-c" if doji else "G5"
    filters = [
        {"code": "F1", **to_status(snapshot.rank <= 30, f"거래대금 순위 {snapshot.rank}")},
        {"code": "F2", **to_status(snapshot.market_cap_trillion >= 30.0, f"시총 {snapshot.market_cap_trillion:.1f}조")},
        {"code": "F3", **(
            to_status(not auto_event_filter.get("blocked"), auto_event_filter.get("note") or "Naver 일정 기반 이벤트 필터")
            if auto_event_filter
            else warning_status("실적/배당/분할 일정 수동 확인 필요")
        )},
        {"code": "F4", **warning_status("최근 5거래일 재진입 이력 수동 확인 필요")},
    ]
    gates = [
        {"code": "G1", **to_status(snapshot.return_21d >= 30.0, f"1개월 수익률 {snapshot.return_21d:.1f}%")},
        {"code": "G2", **to_status(-20.0 <= drawdown_20d <= -7.0, f"20일 고점 대비 {drawdown_20d:.1f}%")},
        {"code": "G3", **to_status(bool(snapshot.ma60 and snapshot.current_price > snapshot.ma60), "종가 > 60MA")},
        {"code": "G4", **to_status(any(value <= -5.0 for value in daily_returns), "최근 5거래일 -5% 급락 이력")},
        {"code": g5_variant, **to_status(bullish or long_lower or doji, "안정화 캔들")},
    ]
    position_ratio = ((snapshot.current_price - snapshot.low_price) / (snapshot.high_price - snapshot.low_price) * 100) if snapshot.high_price > snapshot.low_price else 0.0
    score_items = {
        "S1": 1.0 if (snapshot.foreign_previous <= 0 < snapshot.foreign_net) or (snapshot.institution_previous <= 0 < snapshot.institution_net) else 0.0,
        "S2": 0.0,
        "P1": 1.0 if snapshot.ma20 and snapshot.current_price > snapshot.ma20 else 0.0,
        "P2": 1.0 if position_ratio >= 50 else 0.0,
        "C1": 1.0 if snapshot.volume_avg_5d and snapshot.volume >= snapshot.volume_avg_5d * 2.0 else 0.0,
        "C2": 1.0 if intraday_signal.get("available") and intraday_signal.get("signal") else 0.0,
        "C3": 0.0,
    }
    raw_score = score_items["S1"] * 2 + score_items["S2"] * 2 + score_items["P1"] * 1.5 + score_items["P2"] * 1.5 + score_items["C1"] + score_items["C2"] + score_items["C3"]
    final_score = round(raw_score * reversal_vkospi_multiplier(context["vkospiValue"]), 1)
    grade = grade_from_score(final_score, "reversal")
    trade_plan = build_trade_plan("reversal", snapshot.current_price, context["regimeLabel"], context["gapScore"]["code"])
    notes = ["토스 체결강도·호가잔량 미반영"]
    if not auto_event_filter:
        notes.append("기업 이벤트 필터는 미반영")
    if not intraday_signal.get("available"):
        notes.append("30분봉 데이터 미반영")
    return {
        "rank": 0,
        "name": snapshot.name,
        "code": snapshot.code,
        "score": final_score,
        "grade": grade,
        "statusLabel": reversal_status_label(grade, context["regimeLabel"], context["gapScore"]["code"], filters, gates),
        "strategy": "reversal",
        "filters": filters,
        "gates": gates,
        "matchedRules": [{"code": code, "note": "공개 데이터 충족"} for code, passed in score_items.items() if passed >= 1.0],
        "unmatchedRules": [{"code": code, "note": "토스·이벤트 데이터 필요"} for code, passed in score_items.items() if passed < 1.0],
        "entryPriceText": f"{round(snapshot.current_price):,}원 (당일 종가 기준)",
        "entryPrice": round(snapshot.current_price),
        "entryMeta": "당일 종가 기준",
        "keyPoint": f"20일 고점 대비 {drawdown_20d:.1f}% 조정 후 안정화 패턴 여부를 점검했습니다.",
        "notes": notes,
        "manualInput": manual_input,
        "eventFilter": auto_event_filter,
        "intraday30m": intraday_signal,
        "tradePlanRows": trade_plan,
        "rr": rr_text(snapshot.current_price, parse_float(trade_plan[-1]["targetYield"]), parse_float(trade_plan[0]["targetYield"])),
        "source": "jongga-live",
    }


def assign_ranks(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    for index, entry in enumerate(entries, start=1):
        entry["rank"] = index
    return entries


def collect_live_payload(top_limit: int = 30) -> dict[str, Any]:
    collection_log: list[dict[str, Any]] = []

    def log_step(step: str, label: str, started_at: float, *, status: str = "ok", detail: str = "", count: int | None = None) -> None:
        entry: dict[str, Any] = {
            "step": step,
            "label": label,
            "status": status,
            "durationMs": round((perf_counter() - started_at) * 1000, 1),
        }
        if detail:
            entry["detail"] = detail
        if count is not None:
            entry["count"] = count
        collection_log.append(entry)

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
    log_step("macro_quotes", "글로벌 매크로 지표 수집", started_at, detail="Yahoo chart 5종", count=len(yahoo_meta))

    live_metrics = {
        "nq": {
            "current": float(yahoo_meta["nq"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["nq"]["chartPreviousClose"]),
            "changePct": ((float(yahoo_meta["nq"]["regularMarketPrice"]) - float(yahoo_meta["nq"]["chartPreviousClose"])) / float(yahoo_meta["nq"]["chartPreviousClose"])) * 100,
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
        },
        "tnx": {
            "current": float(yahoo_meta["tnx"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["tnx"]["chartPreviousClose"]),
            "bpChange": (float(yahoo_meta["tnx"]["regularMarketPrice"]) - float(yahoo_meta["tnx"]["chartPreviousClose"])) * 100,
        },
        "krw": {
            "current": float(yahoo_meta["krw"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["krw"]["chartPreviousClose"]),
            "changeWon": float(yahoo_meta["krw"]["regularMarketPrice"]) - float(yahoo_meta["krw"]["chartPreviousClose"]),
        },
        "sox": {
            "current": float(yahoo_meta["sox"]["regularMarketPrice"]),
            "previousClose": float(yahoo_meta["sox"]["chartPreviousClose"]),
            "changePct": ((float(yahoo_meta["sox"]["regularMarketPrice"]) - float(yahoo_meta["sox"]["chartPreviousClose"])) / float(yahoo_meta["sox"]["chartPreviousClose"])) * 100,
        },
    }

    started_at = perf_counter()
    gap_score = build_gap_score(live_metrics)
    log_step("gap_score", "갭 스코어 계산", started_at, detail=str(gap_score.get("grade") or ""))

    started_at = perf_counter()
    kospi_history = fetch_kospi_history(90)
    log_step("kospi_history", "KOSPI 히스토리 수집", started_at, count=len(kospi_history))

    started_at = perf_counter()
    context = build_market_context(kospi_history, gap_score, live_metrics["vkospi"])
    log_step("market_context", "시장 레짐 계산", started_at, detail=str(context.get("regime") or ""))

    started_at = perf_counter()
    top_trading = fetch_top_trading_codes(top_limit)
    log_step("top_trading", "거래대금 상위 종목 수집", started_at, count=len(top_trading))

    snapshots: list[StockSnapshot] = []
    errors: list[str] = []
    started_at = perf_counter()
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        future_map = {executor.submit(build_stock_snapshot, item): item for item in top_trading}
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

    if not snapshots:
        raise RuntimeError(f"no stock snapshots collected: {' | '.join(errors)}")

    snapshots.sort(key=lambda snapshot: snapshot.rank)
    kospi_return_5d = ((context["kospiClose"] - parse_float(kospi_history[5].get("closePrice"))) / parse_float(kospi_history[5].get("closePrice"))) * 100 if len(kospi_history) > 5 and parse_float(kospi_history[5].get("closePrice")) else 0.0
    kospi_return_20d = ((context["kospiClose"] - parse_float(kospi_history[20].get("closePrice"))) / parse_float(kospi_history[20].get("closePrice"))) * 100 if len(kospi_history) > 20 and parse_float(kospi_history[20].get("closePrice")) else 0.0
    universe_returns = [(snapshot.code, snapshot.return_20d) for snapshot in snapshots]

    started_at = perf_counter()
    pullback_entries = sorted((build_pullback_entry(snapshot, context) for snapshot in snapshots), key=lambda entry: entry["score"], reverse=True)[:3]
    momentum_entries = sorted((build_momentum_entry(snapshot, context, relative_strength_rank(snapshot, universe_returns), kospi_return_5d, kospi_return_20d) for snapshot in snapshots), key=lambda entry: entry["score"], reverse=True)[:3]
    reversal_entries = sorted((build_reversal_entry(snapshot, context) for snapshot in snapshots), key=lambda entry: entry["score"], reverse=True)[:3]
    log_step(
        "entry_scoring",
        "전략별 후보 계산",
        started_at,
        detail=f"pullback {len(pullback_entries)}, momentum {len(momentum_entries)}, reversal {len(reversal_entries)}",
        count=len(pullback_entries) + len(momentum_entries) + len(reversal_entries),
    )

    browser_candidates: list[dict[str, Any]] = []
    seen_browser_codes: set[str] = set()
    for entry in momentum_entries:
        if entry["code"] in seen_browser_codes:
            continue
        browser_candidates.append({"code": entry["code"], "name": entry["name"], "needsEventFilter": False})
        seen_browser_codes.add(entry["code"])
    for entry in reversal_entries:
        if entry["code"] in seen_browser_codes:
            for candidate in browser_candidates:
                if candidate["code"] == entry["code"]:
                    candidate["needsEventFilter"] = True
                    break
            continue
        browser_candidates.append({"code": entry["code"], "name": entry["name"], "needsEventFilter": True})
        seen_browser_codes.add(entry["code"])

    started_at = perf_counter()
    browser_enrichments, browser_errors = fetch_browser_candidate_enrichments(browser_candidates)
    for entry in momentum_entries:
        enrichment = browser_enrichments.get(entry["code"])
        if enrichment:
            apply_browser_enrichment_to_entry(entry, "momentum", enrichment, context)
    for entry in reversal_entries:
        enrichment = browser_enrichments.get(entry["code"])
        if enrichment:
            apply_browser_enrichment_to_entry(entry, "reversal", enrichment, context)
    log_step(
        "browser_enrichment",
        "브라우저 보강 수집",
        started_at,
        status="partial" if browser_errors else "ok",
        detail=f"토스 {sum(1 for item in browser_enrichments.values() if item.get('toss'))} / 호가 {sum(1 for item in browser_enrichments.values() if item.get('orderbook'))} / KIND {sum(1 for item in browser_enrichments.values() if item.get('eventFilter'))}",
        count=len(browser_candidates),
    )

    all_entries = pullback_entries + momentum_entries + reversal_entries
    missing_public_metrics = sum(1 for entry in all_entries if entry.get("notes"))
    fallback_keys = ["vkospi"] if live_metrics["vkospi"]["isFallback"] else []
    manual_keys: list[str] = []
    if any(entry.get("manualInput", {}).get("fields") for entry in all_entries):
        manual_keys.append("toss_metrics")
    if any(any(field.get("fieldKey") == "eventFilter" for field in entry.get("manualInput", {}).get("fields", [])) for entry in all_entries):
        manual_keys.append("event_filters")
    data_quality_status = "partial" if errors or browser_errors or missing_public_metrics or fallback_keys else "complete"
    intraday_ok = sum(1 for snapshot in snapshots if snapshot.intraday_30m.get("available"))
    event_schedule_ok = sum(1 for snapshot in snapshots if snapshot.event_filter)
    toss_strength_ok = sum(1 for item in browser_enrichments.values() if item.get("toss"))
    orderbook_ok = sum(1 for item in browser_enrichments.values() if item.get("orderbook"))
    kind_browser_ok = sum(1 for item in browser_enrichments.values() if item.get("eventFilter"))

    payload = {
        "schemaVersion": "jongga_result.v1",
        "generatedAt": utc_now_iso(),
        "dataQuality": {
            "status": data_quality_status,
            "counts": {
                "total": len(snapshots),
                "failed": len(errors),
                "stale": 0,
                "manual": missing_public_metrics,
                "fallback": len(fallback_keys),
                "slots": 1,
            },
            "failedKeys": errors + browser_errors,
            "staleKeys": [],
            "manualKeys": manual_keys,
            "fallbackKeys": fallback_keys,
            "providerHealth": {
                "naver_mobile": {"ok": len(snapshots)},
                "naver_chart": {"ok": len(snapshots)},
                "naver_integration_schedule": {"ok": event_schedule_ok},
                "yahoo_chart": {"ok": 5 + (1 if live_metrics["vkospi"]["isFallback"] else 0)},
                "yahoo_intraday_30m": {"ok": intraday_ok},
                "toss_playwright_strength": {"ok": toss_strength_ok},
                "naver_orderbook_browser": {"ok": orderbook_ok},
                "kind_playwright_disclosure": {"ok": kind_browser_ok},
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
            "note": "CNBC VKOSPI 실측을 우선 사용하고, 실패 시 Yahoo VIX 프록시로 대체합니다. 역추세 30분봉은 Yahoo 30분봉으로 계산합니다. 토스 공개 체결강도는 Playwright로, 호가 잔량 비율은 Naver 호가 10단계를 브라우저로 읽어 보강하며, Naver 일정이 없을 때는 KIND 최근공시를 Playwright로 조회해 이벤트 필터를 확장합니다.",
        },
        "slots": [
            {
                "slotId": "slotA",
                "sourceId": "live-public-run",
                "regime": build_regime_block(context),
                "gapScore": gap_score,
                "entries": {
                    "pullback": assign_ranks(pullback_entries),
                    "momentum": assign_ranks(momentum_entries),
                    "reversal": assign_ranks(reversal_entries),
                    "swing": [],
                },
                "dataQuality": {
                    "status": data_quality_status,
                    "source": "live-public-run",
                },
            }
        ],
    }
    return payload


def write_outputs(payload: dict[str, Any], output_path: str | Path, bridge_js_path: str | Path | None) -> None:
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    if bridge_js_path:
        bridge = Path(bridge_js_path)
        bridge.parent.mkdir(parents=True, exist_ok=True)
        bridge.write_text(f"window.JONGGA_DATA = {json.dumps(payload, ensure_ascii=False, indent=2)};\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Generate jongga latest.json from live public data")
    parser.add_argument("--out", required=True, help="Output latest.json path")
    parser.add_argument("--bridge-js", help="Optional bridge JS output path")
    parser.add_argument("--top-limit", type=int, default=30, help="Universe size from Naver top trading list")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    payload = collect_live_payload(top_limit=args.top_limit)
    write_outputs(payload, args.out, args.bridge_js)
    print(f"generated {args.out} with {len(payload['slots'][0]['entries']['pullback']) + len(payload['slots'][0]['entries']['momentum']) + len(payload['slots'][0]['entries']['reversal'])} entries")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())