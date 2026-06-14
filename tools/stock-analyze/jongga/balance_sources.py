from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from jongga.output_contract import compact_date


USER_AGENT = "Mozilla/5.0 jongga-balance-sources/1.0"
STOCK_CODE_PATTERN = re.compile(r"^\d{6}$")
LARGE_CAP_MARKET_CAP_RANK_LIMIT = 100
SHORT_BALANCE_TREND_LOOKBACK_TRADING_DAYS = 10

KRX_DATA_OTP_URL = "https://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd"
KRX_DATA_REFERER = "https://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020303"
KRX_SHORT_BALANCE_LOADER_REFERER = "https://data.krx.co.kr/comm/srt/srtLoader/index.cmd?isuCd=&screenId=MDCSTAT300"
KRX_SHORT_PORTAL_OTP_URL = "https://short.krx.co.kr/comm/bldAttendant/getJsonData.cmd"
KRX_SHORT_PORTAL_REFERER = "https://short.krx.co.kr/contents/SRT/02/02010100/SRT02010100.jsp"

_KRX_ISIN_LOOKUP_BLD = "dbms/MDC/STAT/standard/MDCSTAT01901"
_KRX_SHORT_BALANCE_BLD = "dbms/MDC_OUT/STAT/srt/MDCSTAT30001_OUT"
_KRX_SHORT_PORTAL_BALANCE_BLD = "SRT/02/02010100/srt02010100"
_ISIN_LOOKUP_MAX_LOOKBACK_DAYS = 10


@dataclass
class BalanceTrendCollectionResult:
    metric: str
    values: dict[str, Any] = field(default_factory=dict)
    provider_health: dict[str, dict[str, int]] = field(default_factory=dict)
    fallback_usage: list[dict[str, Any]] = field(default_factory=list)
    failure_messages: list[str] = field(default_factory=list)
    selected_provider_counts: dict[str, int] = field(default_factory=dict)
    status: str = "data_missing"
    manual_required: bool = False
    attempted_codes: int = 0

def _parse_float(value: Any) -> float:
    text = str(value or "").replace(",", "")
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    return float(match.group(0)) if match else 0.0


def _open_request(request: Request, *, timeout: float, opener: Any | None = None):
    if opener is None:
        return urlopen(request, timeout=timeout)
    return opener.open(request, timeout=timeout)


def _krx_post_json(
    url: str,
    params: dict[str, str],
    *,
    referer: str,
    timeout: float = 10.0,
    opener: Any | None = None,
) -> Any:
    body = urlencode(params).encode("utf-8")
    request = Request(
        url,
        data=body,
        headers={
            "User-Agent": USER_AGENT,
            "Referer": referer,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )
    with _open_request(request, timeout=timeout, opener=opener) as response:
        return json.loads(response.read().decode("utf-8", errors="replace"))

def _record_provider_status(result: BalanceTrendCollectionResult, provider: str, status: str) -> None:
    row = result.provider_health.setdefault(provider, {})
    row[status] = row.get(status, 0) + 1
    if status == "manual_required":
        result.manual_required = True


def _record_success(
    result: BalanceTrendCollectionResult,
    provider: str,
    *,
    fallback_level: int,
    layer: str,
    confidence: float,
) -> None:
    result.selected_provider_counts[provider] = result.selected_provider_counts.get(provider, 0) + 1
    if fallback_level > 1:
        existing = next((row for row in result.fallback_usage if row["provider"] == provider), None)
        if existing is None:
            result.fallback_usage.append({
                "key": result.metric,
                "provider": provider,
                "layer": layer,
                "fallbackLevel": fallback_level,
                "confidence": confidence,
                "stale": False,
                "count": 1,
            })
        else:
            existing["count"] = int(existing.get("count") or 0) + 1


def _has_krx_login_credentials() -> bool:
    return bool(os.getenv("KRX_ID", "").strip() and os.getenv("KRX_PW", "").strip())


def _compute_result_status(result: BalanceTrendCollectionResult) -> BalanceTrendCollectionResult:
    if result.values:
        result.status = "ok" if not result.fallback_usage and not result.failure_messages else "partial"
        return result
    if result.manual_required:
        result.status = "data_missing"
    elif result.failure_messages:
        result.status = "failed"
    else:
        result.status = "data_missing"
    return result


def _build_result(metric: str, values: dict[str, Any], attempted_codes: int) -> BalanceTrendCollectionResult:
    return BalanceTrendCollectionResult(metric=metric, values=values, attempted_codes=attempted_codes)


def _short_balance_series_from_rows(rows: list[dict[str, Any]]) -> list[tuple[str, float]]:
    series: list[tuple[str, float]] = []
    for row in rows:
        date_text = str(
            row.get("TRD_DD")
            or row.get("RPT_DUTY_OCCR_DD")
            or row.get("WORK_DD")
            or ""
        ).replace("/", "").replace("-", "").strip()
        balance = _parse_float(
            row.get("BAL_QTY")
            or row.get("BAL_RP_QTY")
            or row.get("BALANCE_QTY")
            or row.get("STR_CONST_VAL1")
        )
        if date_text and balance > 0:
            series.append((date_text, balance))
    series.sort(key=lambda item: item[0])
    return series


def _compute_short_balance_change_pct(series: list[tuple[str, float]], lookback_days: int) -> float | None:
    if len(series) < 2:
        return None
    window = series[-(lookback_days + 1):] if len(series) > lookback_days else series
    start_balance = window[0][1]
    end_balance = window[-1][1]
    if start_balance <= 0:
        return None
    return ((end_balance - start_balance) / start_balance) * 100


def _fetch_code_isin_map(codes: set[str], *, as_of: date | None = None) -> dict[str, str]:
    derived = {
        code: isin
        for code in codes
        if (isin := _derive_krx_isin(code))
    }
    if derived:
        return derived

    cursor = as_of or date.today()
    for _ in range(_ISIN_LOOKUP_MAX_LOOKBACK_DAYS):
        try:
            payload = _krx_post_json(
                KRX_DATA_OTP_URL,
                {
                    "bld": _KRX_ISIN_LOOKUP_BLD,
                    "mktId": "ALL",
                    "trdDd": compact_date(cursor),
                    "share": "1",
                    "csvxls_isNo": "false",
                },
                referer=KRX_DATA_REFERER,
            )
        except (URLError, HTTPError, OSError, TimeoutError, ValueError, json.JSONDecodeError):
            cursor -= timedelta(days=1)
            continue
        rows = payload.get("OutBlock_1", []) or []
        if not rows:
            cursor -= timedelta(days=1)
            continue
        isin_map: dict[str, str] = {}
        for row in rows:
            short_code = str(row.get("ISU_SRT_CD") or "").strip()
            isin = str(row.get("ISU_CD") or "").strip()
            if short_code in codes and isin:
                isin_map[short_code] = isin
        return isin_map
    return {}


def _derive_krx_isin(code: str) -> str | None:
    if not STOCK_CODE_PATTERN.fullmatch(code):
        return None
    body = f"KR7{code}00"
    return body + _isin_check_digit(body)


def _isin_check_digit(body: str) -> str:
    numeric = []
    for char in body.upper():
        if char.isdigit():
            numeric.append(char)
        else:
            numeric.append(str(ord(char) - 55))
    total = 0
    for index, digit in enumerate(reversed("".join(numeric))):
        value = int(digit)
        if index % 2 == 0:
            value *= 2
        total += (value // 10) + (value % 10)
    return str((10 - (total % 10)) % 10)


def _fetch_short_balance_series_krx(isin: str, strt_dd: str, end_dd: str) -> list[tuple[str, float]]:
    payload = _krx_post_json(
        KRX_DATA_OTP_URL,
        {"bld": _KRX_SHORT_BALANCE_BLD, "isuCd": isin, "strtDd": strt_dd, "endDd": end_dd, "locale": "ko_KR"},
        referer=KRX_SHORT_BALANCE_LOADER_REFERER,
    )
    return _short_balance_series_from_rows(payload.get("OutBlock_1", []) or [])


def _fetch_short_balance_series_short_portal(code: str, strt_dd: str, end_dd: str) -> list[tuple[str, float]]:
    payload = _krx_post_json(
        KRX_SHORT_PORTAL_OTP_URL,
        {"bld": _KRX_SHORT_PORTAL_BALANCE_BLD, "isu_cd": code, "strt_dd": strt_dd, "end_dd": end_dd},
        referer=KRX_SHORT_PORTAL_REFERER,
    )
    return _short_balance_series_from_rows(payload.get("OutBlock_1", []) or [])


def _fetch_short_balance_series_pykrx(code: str, strt_dd: str, end_dd: str) -> list[tuple[str, float]]:
    from pykrx import stock

    frame = stock.get_shorting_balance_by_date(strt_dd, end_dd, code)
    if frame is None or frame.empty:
        return []
    series: list[tuple[str, float]] = []
    for index, row in frame.iterrows():
        date_key = index.strftime("%Y%m%d") if hasattr(index, "strftime") else str(index).replace("-", "").strip()
        balance = _parse_float(
            row.get("공매도잔고")
            or row.get("공매도 잔고")
            or row.get("공매도잔고수량")
            or row.get("잔고수량")
        )
        if date_key and balance > 0:
            series.append((date_key, balance))
    series.sort(key=lambda item: item[0])
    return series


def collect_short_balance_trend(
    codes: list[str],
    *,
    lookback_days: int = SHORT_BALANCE_TREND_LOOKBACK_TRADING_DAYS,
    as_of: date | None = None,
) -> BalanceTrendCollectionResult:
    target_codes = [code for code in codes if STOCK_CODE_PATTERN.fullmatch(code)]
    result = _build_result("short_balance_trend", {}, len(target_codes))
    if not target_codes:
        return result

    end_date = as_of or date.today()
    start_date = end_date - timedelta(days=lookback_days * 2 + 7)
    strt_dd, end_dd = compact_date(start_date), compact_date(end_date)
    end_dd_key = compact_date(end_date)
    isin_map: dict[str, str] | None = None

    for code in target_codes:
        for provider, fallback_level, layer, fetcher in (
            ("krx_pykrx_short_balance", 1, "api", lambda: _fetch_short_balance_series_pykrx(code, strt_dd, end_dd)),
            (
                "krx_short_balance_direct_post",
                2,
                "api",
                lambda: _fetch_short_balance_series_krx((isin_map or {}).get(code, ""), strt_dd, end_dd) if (isin_map or {}).get(code) else [],
            ),
            ("krx_short_portal_balance", 3, "http", lambda: _fetch_short_balance_series_short_portal(code, strt_dd, end_dd)),
        ):
            if provider == "krx_pykrx_short_balance" and not _has_krx_login_credentials():
                _record_provider_status(result, provider, "data_missing")
                continue
            if provider == "krx_short_balance_direct_post" and isin_map is None:
                isin_map = _fetch_code_isin_map(set(target_codes), as_of=end_date)
            try:
                series = fetcher()
            except ModuleNotFoundError as error:
                _record_provider_status(result, provider, "failed")
                result.failure_messages.append(f"{provider} {code}: missing dependency ({error})")
                continue
            except PermissionError as error:
                _record_provider_status(result, provider, "manual_required")
                result.failure_messages.append(f"{provider} {code}: {error}")
                continue
            except (URLError, HTTPError, OSError, TimeoutError, ValueError, json.JSONDecodeError) as error:
                _record_provider_status(result, provider, "failed")
                result.failure_messages.append(f"{provider} {code}: {error}")
                continue

            series = [item for item in series if item[0] <= end_dd_key]
            change_pct = _compute_short_balance_change_pct(series, lookback_days)
            if change_pct is None:
                _record_provider_status(result, provider, "data_missing")
                continue
            result.values[code] = change_pct
            _record_provider_status(result, provider, "ok")
            _record_success(result, provider, fallback_level=fallback_level, layer=layer, confidence=max(0.4, 0.95 - (fallback_level - 1) * 0.2))
            break

    return _compute_result_status(result)

def fetch_short_balance_trend_map(
    codes: list[str],
    *,
    lookback_days: int = SHORT_BALANCE_TREND_LOOKBACK_TRADING_DAYS,
    as_of: date | None = None,
) -> dict[str, float]:
    return collect_short_balance_trend(codes, lookback_days=lookback_days, as_of=as_of).values
