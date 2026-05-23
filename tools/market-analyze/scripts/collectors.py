from __future__ import annotations

import json
import math
import re
from dataclasses import dataclass
from typing import Any, Dict, Iterable, List, Optional
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
)

NAVER_ENCODING = "euc-kr"
FLOW_WINDOW_DAYS = 10


@dataclass
class CollectorResult:
    data_patch: Dict[str, Any]
    status: Dict[str, str]


def status_entry(state: str, source: str, message: str) -> Dict[str, str]:
    return {"state": state, "source": source, "message": message}


def make_request(url: str, timeout: int = 10) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=timeout) as response:
        return response.read()


def fetch_text(url: str, *, timeout: int = 10, encodings: Optional[Iterable[str]] = None) -> str:
    raw = make_request(url, timeout=timeout)
    for encoding in encodings or ("utf-8", NAVER_ENCODING):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="ignore")


def fetch_json(url: str, *, timeout: int = 10) -> Any:
    raw = make_request(url, timeout=timeout)
    return json.loads(raw.decode("utf-8"))


def safe_number(value: Any) -> Optional[float]:
    try:
        num = float(value)
    except (TypeError, ValueError):
        return None
    return num if math.isfinite(num) else None


def last_finite(values: Iterable[Any]) -> Optional[float]:
    items = list(values)
    for value in reversed(items):
        num = safe_number(value)
        if num is not None:
            return num
    return None


def has_value(*values: Any) -> bool:
    return any(value not in (None, "", []) and safe_number(value) is not None for value in values)


def strip_html(raw: str) -> str:
    return re.sub(r"<[^>]+>", "", raw or "").replace("&nbsp;", "").strip()


def normalize_date_key(raw: str) -> str:
    return re.sub(r"\D", "", raw or "")


def parse_signed_number(raw: str) -> float:
    normalized = strip_html(raw).replace(",", "")
    match = re.search(r"-?\d+(?:\.\d+)?", normalized)
    return float(match.group(0)) if match else 0.0


def calculate_linear_slope(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    xs = list(range(1, len(values) + 1))
    sum_x = sum(xs)
    sum_y = sum(values)
    sum_xy = sum(x * y for x, y in zip(xs, values))
    sum_x2 = sum(x * x for x in xs)
    denominator = len(values) * sum_x2 - sum_x * sum_x
    if denominator == 0:
        return 0.0
    return (len(values) * sum_xy - sum_x * sum_y) / denominator


def fetch_yahoo_chart(symbol: str, range_name: str, interval: str = "1d") -> Dict[str, Any]:
    url = (
        f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
        f"?range={range_name}&interval={interval}"
    )
    payload = fetch_json(url, timeout=12)
    result = payload.get("chart", {}).get("result", [{}])[0]
    if not result:
        raise ValueError(f"Yahoo 차트 응답 구조 이상: {symbol}")

    closes = result.get("indicators", {}).get("quote", [{}])[0].get("close", []) or []
    regular_market_price = safe_number(result.get("meta", {}).get("regularMarketPrice"))
    return {
        "closes": [safe_number(value) for value in closes if safe_number(value) is not None],
        "regularMarketPrice": regular_market_price,
    }


def calculate_disparity(closes: List[float], current_price: Optional[float] = None) -> Dict[str, float]:
    if len(closes) < 200:
        raise ValueError("200일치 종가 부족")
    latest = current_price if current_price is not None else closes[-1]
    window = closes[-200:]
    sma200 = sum(window) / 200
    if sma200 <= 0:
        raise ValueError("SMA200 계산 실패")
    return {
        "currentPrice": latest,
        "sma200": sma200,
        "disparity": (latest / sma200) * 100,
    }


def collect_fx(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        payload = fetch_json("https://open.er-api.com/v6/latest/USD", timeout=10)
        krw = safe_number(payload.get("rates", {}).get("KRW"))
        if krw is None:
            raise ValueError("KRW 환율 없음")
        return CollectorResult(
            {"fx": krw},
            status_entry("ok", "open.er-api.com", f"원/달러 환율 {krw:,.3f}원 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if safe_number(base_data.get("fx")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"환율 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "open.er-api.com", f"환율 수집 실패 ({error})"))


def collect_vix(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_yahoo_chart("%5EVIX", "5d")
        value = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
        if value is None:
            raise ValueError("VIX 현재가 없음")
        return CollectorResult(
            {"vix": value},
            status_entry("ok", "query1.finance.yahoo.com", f"VIX {value:.2f} 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if safe_number(base_data.get("vix")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"VIX 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"VIX 수집 실패 ({error})"))


def collect_gold(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_yahoo_chart("GC=F", "1mo")
        value = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
        if value is None:
            raise ValueError("금 현재가 없음")
        return CollectorResult(
            {"gold": value},
            status_entry("ok", "query1.finance.yahoo.com", f"금 선물 {value:,.1f} 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if safe_number(base_data.get("gold")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"금 시세 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"금 시세 수집 실패 ({error})"))


def collect_disparity(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_yahoo_chart("%5EKS11", "1y")
        current_price = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
        metrics = calculate_disparity(quote.get("closes", []), current_price)
        return CollectorResult(
            {"disparity": metrics["disparity"]},
            status_entry(
                "ok",
                "query1.finance.yahoo.com",
                f"코스피 200일 이격도 {metrics['disparity']:.2f}% 수집",
            ),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if safe_number(base_data.get("disparity")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"이격도 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"이격도 수집 실패 ({error})"))


def parse_investor_flow_bizdate(html: str) -> Optional[str]:
    match = re.search(r"investorDealTrendDay\.naver\?bizdate=(\d{8})&(?:amp;)?sosok=", html)
    return match.group(1) if match else None


def parse_investor_trend_rows(html: str, limit: int = FLOW_WINDOW_DAYS) -> List[Dict[str, float]]:
    rows: List[Dict[str, float]] = []
    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", html, flags=re.IGNORECASE):
        if 'class="date2"' not in tr_content:
            continue
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if len(td_matches) < 4:
            continue
        rows.append(
            {
                "date": strip_html(td_matches[0]),
                "retail": parse_signed_number(td_matches[1]),
                "foreign": parse_signed_number(td_matches[2]),
                "institution": parse_signed_number(td_matches[3]),
            }
        )
        if len(rows) >= limit:
            break
    return rows


def merge_investor_rows(kospi_rows: List[Dict[str, float]], kosdaq_rows: List[Dict[str, float]]) -> List[Dict[str, float]]:
    if len(kospi_rows) < FLOW_WINDOW_DAYS or len(kosdaq_rows) < FLOW_WINDOW_DAYS:
        raise ValueError("최근 10영업일 수급 데이터 부족")
    merged: List[Dict[str, float]] = []
    for kospi_row, kosdaq_row in zip(kospi_rows[:FLOW_WINDOW_DAYS], kosdaq_rows[:FLOW_WINDOW_DAYS]):
        if kospi_row["date"] != kosdaq_row["date"]:
            raise ValueError(f"시장 수급 기준일 불일치 ({kospi_row['date']} / {kosdaq_row['date']})")
        merged.append(
            {
                "date": kospi_row["date"],
                "retail": kospi_row["retail"] + kosdaq_row["retail"],
                "foreign": kospi_row["foreign"] + kosdaq_row["foreign"],
                "institution": kospi_row["institution"] + kosdaq_row["institution"],
            }
        )
    return merged


def summarize_investor_rows(rows: List[Dict[str, float]]) -> Dict[str, float]:
    window_rows = rows[:FLOW_WINDOW_DAYS]
    retail_abs_sum = sum(abs(row["retail"]) for row in window_rows)
    return {
        "retailNetToday": window_rows[0]["retail"],
        "foreignNetToday": window_rows[0]["foreign"],
        "institutionNetToday": window_rows[0]["institution"],
        "retailNet10dCum": sum(row["retail"] for row in window_rows),
        "foreignNet10dCum": sum(row["foreign"] for row in window_rows),
        "institutionNet10dCum": sum(row["institution"] for row in window_rows),
        "retailNet10dAbsAvg": retail_abs_sum / FLOW_WINDOW_DAYS if retail_abs_sum > 0 else None,
        "retailNet10dAbsSum": retail_abs_sum if retail_abs_sum > 0 else None,
    }


def collect_flow(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        trend_index_html = fetch_text(
            "https://finance.naver.com/sise/sise_trans_style.naver",
            timeout=12,
            encodings=(NAVER_ENCODING, "utf-8"),
        )
        bizdate = parse_investor_flow_bizdate(trend_index_html)
        if not bizdate:
            raise ValueError("수급 기준일 파싱 실패")

        base_url = f"https://finance.naver.com/sise/investorDealTrendDay.naver?bizdate={bizdate}&sosok="
        kospi_html = fetch_text(base_url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
        kosdaq_html = fetch_text(f"{base_url}02", timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
        merged_rows = merge_investor_rows(parse_investor_trend_rows(kospi_html), parse_investor_trend_rows(kosdaq_html))
        summary = summarize_investor_rows(merged_rows)
        summary["flowBizDate"] = bizdate
        return CollectorResult(
            summary,
            status_entry("ok", "finance.naver.com", f"시장 수급 {bizdate} 기준 10영업일 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        flow_available = has_value(
            base_data.get("retailNetToday"),
            base_data.get("foreignNetToday"),
            base_data.get("institutionNetToday"),
            base_data.get("retailNet10dCum"),
            base_data.get("foreignNet10dCum"),
            base_data.get("institutionNet10dCum"),
        ) or bool(base_data.get("flowBizDate"))
        if flow_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"시장 수급 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "finance.naver.com", f"시장 수급 수집 실패 ({error})"))


def parse_margin_history_rows(html: str, limit: int = 20) -> List[Dict[str, Optional[float]]]:
    rows: List[Dict[str, Optional[float]]] = []
    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", html, flags=re.IGNORECASE):
        if 'class="date"' not in tr_content:
            continue
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if len(td_matches) < 5:
            continue
        date_key = normalize_date_key(strip_html(td_matches[0]))
        balance = safe_number(strip_html(td_matches[4]).replace(",", ""))
        deposit = safe_number(strip_html(td_matches[1]).replace(",", ""))
        if not date_key or balance is None:
            continue
        rows.append({"dateKey": date_key, "balance": balance, "deposit": deposit})
        if len(rows) >= limit:
            break
    return rows


def derive_margin_shock_context(margin_history: List[Dict[str, Optional[float]]], leader_stocks: List[Dict[str, Any]]) -> Dict[str, Optional[float]]:
    rows = sorted(
        [row for row in margin_history if row.get("dateKey") and safe_number(row.get("balance")) is not None],
        key=lambda item: item["dateKey"],
    )
    margin_balance_today = rows[-1]["balance"] if rows else None
    shock_dates = sorted([stock.get("shockDate") for stock in leader_stocks if stock.get("shockDate")])
    shock_anchor_date = shock_dates[0] if shock_dates else None

    if not shock_anchor_date or margin_balance_today is None:
        return {
            "shockAnchorDate": shock_anchor_date,
            "marginBalanceToday": margin_balance_today,
            "marginBalanceBeforeShock": None,
            "marginShockChangePct": None,
        }

    prior_rows = [row for row in rows if row["dateKey"] < shock_anchor_date]
    margin_balance_before_shock = prior_rows[-1]["balance"] if prior_rows else None
    change_pct = None
    if margin_balance_before_shock and margin_balance_before_shock > 0:
        change_pct = ((margin_balance_today - margin_balance_before_shock) / margin_balance_before_shock) * 100

    return {
        "shockAnchorDate": shock_anchor_date,
        "marginBalanceToday": margin_balance_today,
        "marginBalanceBeforeShock": margin_balance_before_shock,
        "marginShockChangePct": change_pct,
    }


def collect_margin(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        html = fetch_text(
            "https://finance.naver.com/sise/sise_deposit.naver",
            timeout=12,
            encodings=(NAVER_ENCODING, "utf-8"),
        )
        margin_history = parse_margin_history_rows(html, limit=20)
        if len(margin_history) < 5:
            raise ValueError("신용융자잔고 5영업일 부족")

        slope = calculate_linear_slope([row["balance"] for row in reversed(margin_history[:5]) if row["balance"] is not None])
        deposit_values = [row["deposit"] for row in reversed(margin_history[:5]) if row["deposit"] is not None]
        deposit_slope = calculate_linear_slope(deposit_values) if len(deposit_values) >= 3 else None
        customer_deposit_today = margin_history[0]["deposit"]
        leader_stocks = base_data.get("leaderStocks") if isinstance(base_data.get("leaderStocks"), list) else []
        shock_context = derive_margin_shock_context(margin_history, leader_stocks)
        deposit_margin_ratio = None
        if customer_deposit_today and shock_context["marginBalanceToday"] is not None and customer_deposit_today > 0:
            deposit_margin_ratio = shock_context["marginBalanceToday"] / customer_deposit_today

        data_patch = {
            "marginSlope": slope,
            "marginBalanceToday": shock_context["marginBalanceToday"],
            "marginBalanceBeforeShock": shock_context["marginBalanceBeforeShock"],
            "marginShockChangePct": shock_context["marginShockChangePct"],
            "shockAnchorDate": shock_context["shockAnchorDate"] or base_data.get("shockAnchorDate") or "",
            "customerDeposit": customer_deposit_today,
            "customerDepositSlope": deposit_slope,
            "depositMarginRatio": deposit_margin_ratio,
        }
        status_state = "ok" if shock_context["shockAnchorDate"] else "partial"
        status_message = (
            f"신용/예탁금 갱신 완료 · 충격 기준일 {shock_context['shockAnchorDate']}"
            if shock_context["shockAnchorDate"]
            else "신용/예탁금 갱신 완료 · 충격 기준일은 기존 대표주 스냅샷 기준"
        )
        return CollectorResult(data_patch, status_entry(status_state, "finance.naver.com", status_message))
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        margin_available = has_value(
            base_data.get("marginSlope"),
            base_data.get("customerDeposit"),
            base_data.get("depositMarginRatio"),
            base_data.get("marginShockChangePct"),
        )
        if margin_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"신용/예탁금 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "finance.naver.com", f"신용/예탁금 수집 실패 ({error})"))


def collect_export_indicator(base_data: Dict[str, Any]) -> CollectorResult:
    indicator_url = (
        "https://kosis.kr/visual/nsportalStats/detailContents.do?"
        "listId=B&statJipyoId=3660&vStatJipyoId=5193"
    )
    try:
        html = fetch_text(indicator_url, timeout=12)
        value_match = re.search(r"현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.\-]+)<\/dd>", html, flags=re.IGNORECASE)
        month_match = re.search(r"기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>", html, flags=re.IGNORECASE)
        month_key = normalize_date_key(month_match.group(1))[:6] if month_match else ""
        export_value = safe_number(value_match.group(1).replace(",", "")) if value_match else None
        if not month_key and export_value is None:
            raise ValueError("수출 지표 페이지 파싱 실패")
        patch: Dict[str, Any] = {}
        if month_key:
            patch["exportLatestMonth"] = month_key
        if export_value is not None:
            patch["exportValueUsd"] = export_value
        return CollectorResult(
            patch,
            status_entry("partial", "kosis.kr", "최신 발표월/레벨만 갱신했습니다. YoY 모멘텀은 별도 산출이 필요합니다."),
        )
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        export_available = bool(base_data.get("exportLatestMonth")) or has_value(
            base_data.get("exportValueUsd"),
            base_data.get("exportYoY"),
            base_data.get("exportYoYDelta"),
            base_data.get("export3mAvgYoY"),
        )
        if export_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"수출 지표 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("missing", "kosis.kr", f"수출 지표 미수집 ({error})"))
