from __future__ import annotations

import html
import json
import math
import re
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from xml.etree import ElementTree as ET

from .collectors import (
    CollectorResult,
    fetch_text,
    fetch_yahoo_chart,
    has_value,
    make_request,
    normalize_date_key,
    parse_signed_number,
    safe_number,
    status_entry,
    strip_html,
)


FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT = 12
FUNDAMENTAL_BROADENING_UNIVERSE_COUNT = 20
KOSIS_EXPORT_INDICATOR_URL = (
    "https://kosis.kr/visual/nsportalStats/detailContents.do?"
    "listId=B&statJipyoId=3660&vStatJipyoId=5193"
)
TRADING_ECONOMICS_EXPORT_URL = "https://tradingeconomics.com/south-korea/exports"
TRADING_ECONOMICS_EXPORT_YOY_URL = "https://tradingeconomics.com/south-korea/exports-yoy"
KOSIS_EXPORT_SERIES_CONFIG = {
    "orgId": "360",
    "tblId": "DT_1R11001_FRM101",
    "lookbackMonths": 26,
}
MONTH_NAME_REGEX = (
    r"(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|"
    r"Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|"
    r"Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
)
LEADER_FETCH_CONCURRENCY = 4
LEADER_SCREEN_LIMIT = 60
LEADER_HISTORY_FETCH_COUNT = 160
LEADER_PICK_COUNT = 4
LEADER_WYCKOFF_HISTORY_DAYS = 120
YAHOO_KOREA_SUFFIXES = ("KS", "KQ")
LEADER_EXCLUDE_REGEX = re.compile(
    r"(ETF|ETN|KODEX|TIGER|KOSEF|ARIRANG|KBSTAR|HANARO|ACE|SOL|RISE|PLUS|TIMEFOLIO|인버스|레버리지)",
    re.IGNORECASE,
)
LEADER_STATIC_FALLBACK_CODES = [
    ("005930", "삼성전자"),
    ("000660", "SK하이닉스"),
    ("012450", "한화에어로스페이스"),
    ("034020", "두산에너빌리티"),
    ("005380", "현대차"),
    ("000270", "기아"),
    ("105560", "KB금융"),
    ("086790", "하나금융지주"),
    ("055550", "신한지주"),
    ("035420", "NAVER"),
    ("068270", "셀트리온"),
    ("066570", "LG전자"),
    ("267260", "HD현대일렉트릭"),
    ("042660", "한화오션"),
    ("042700", "한미반도체"),
    ("064350", "현대로템"),
    ("247540", "에코프로비엠"),
    ("086520", "에코프로"),
    ("196170", "알테오젠"),
    ("214450", "파마리서치"),
]

ROOT_DIR = Path(__file__).resolve().parent.parent
STORE_DIR = ROOT_DIR / "store"
CACHE_DIR = STORE_DIR / "cache"
RESULTS_DIR = STORE_DIR / "results"
DART_CORP_MAP_CACHE_PATH = CACHE_DIR / "dart_corp_map.json"
DART_CORP_MAP_META_PATH = CACHE_DIR / "dart_corp_map_meta.json"
ANCHOR_COMPONENT_CACHE_PATHS = {
    "export": CACHE_DIR / "anchor_export.json",
    "earnings": CACHE_DIR / "anchor_earnings.json",
    "broadening": CACHE_DIR / "anchor_broadening.json",
}
MONTH_NAME_TO_NUMBER = {
    "jan": 1,
    "feb": 2,
    "mar": 3,
    "apr": 4,
    "may": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "oct": 10,
    "nov": 11,
    "dec": 12,
}


def clamp(value: float, min_value: float, max_value: float) -> float:
    return min(max_value, max(min_value, value))


def parse_signed_amount(raw: Any) -> Optional[float]:
    normalized = (
        str(raw or "")
        .replace(",", "")
        .replace("\u00a0", "")
        .replace(" ", "")
        .replace("(", "-")
        .replace(")", "")
    )
    match = re.search(r"-?\d+(?:\.\d+)?", normalized)
    return float(match.group(0)) if match else None


def normalize_whitespace(raw: Any) -> str:
    return re.sub(r"\s+", " ", str(raw or "")).strip()


def html_to_text_lines(raw_html: str) -> List[str]:
    text = re.sub(r"(?is)<script[^>]*>.*?</script>", " ", raw_html or "")
    text = re.sub(r"(?is)<style[^>]*>.*?</style>", " ", text)
    text = re.sub(r"(?i)<br\s*/?>", "\n", text)
    text = re.sub(r"(?i)</(tr|p|div|li|h\d|table|section|article|ul|ol|dl|dt|dd)>", "\n", text)
    text = re.sub(r"(?i)</(td|th)>", "\t", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text).replace("\xa0", " ")
    lines = []
    for line in text.splitlines():
        normalized = normalize_whitespace(line.replace("\t", " "))
        if normalized:
            lines.append(normalized)
    return lines


def html_to_compact_text(raw_html: str) -> str:
    return normalize_whitespace(" ".join(html_to_text_lines(raw_html)))


def normalize_month_key(raw: Any) -> str:
    normalized = re.sub(r"\D", "", str(raw or ""))
    return normalized[:6] if len(normalized) >= 6 else ""


def month_name_to_key(month_name: str, year: int) -> str:
    month_number = MONTH_NAME_TO_NUMBER.get(str(month_name or "")[:3].lower())
    if not month_number:
        return ""
    return f"{int(year)}{month_number:02d}"


def get_month_number(month_name: str) -> Optional[int]:
    return MONTH_NAME_TO_NUMBER.get(re.sub(r"[^A-Za-z]", "", str(month_name or ""))[:3].lower())


def infer_latest_month_key(latest_month_name: str, previous_month_name: str, previous_year: Any) -> str:
    latest_month_number = get_month_number(latest_month_name)
    previous_month_number = get_month_number(previous_month_name)
    previous_year_value = safe_number(previous_year)
    if latest_month_number is None or previous_month_number is None or previous_year_value is None:
        return ""
    year_value = int(previous_year_value)
    latest_year = year_value + 1 if latest_month_number < previous_month_number else year_value
    return month_name_to_key(latest_month_name, latest_year)


def same_numeric_value(left: Any, right: Any, tolerance: float = 0.9) -> bool:
    left_value = safe_number(left)
    right_value = safe_number(right)
    if left_value is None or right_value is None:
        return False
    return abs(left_value - right_value) <= max(tolerance, abs(right_value) * 0.025)


def parse_numeric_cell(raw: Any) -> Optional[float]:
    normalized = normalize_whitespace(strip_html(str(raw or "")))
    if not normalized or normalized in {"-", "N/A", "N/A(IFRS)", "적정", "잠정"}:
        return None
    if not re.search(r"-?\d", normalized):
        return None
    return parse_signed_amount(normalized.replace("%", ""))


def shift_month_key(raw: Any, delta: int) -> str:
    month_key = normalize_month_key(raw)
    if len(month_key) != 6:
        return ""
    year = int(month_key[:4])
    month = int(month_key[4:6])
    total_months = year * 12 + (month - 1) + delta
    shifted_year, shifted_month_index = divmod(total_months, 12)
    return f"{shifted_year}{shifted_month_index + 1:02d}"


def to_store_relative(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT_DIR)).replace("\\", "/")
    except ValueError:
        return str(path)


def anchor_component_has_values(component: str, patch: Optional[Dict[str, Any]]) -> bool:
    patch = patch or {}
    if component == "export":
        return bool(patch.get("exportLatestMonth")) or has_value(
            patch.get("exportValueUsd"),
            patch.get("exportYoY"),
            patch.get("exportYoYDelta"),
            patch.get("export3mAvgYoY"),
        )
    if component == "earnings":
        return (patch.get("earningsCoverageCount") or 0) > 0 or has_value(
            patch.get("opIncomeBreadth"),
            patch.get("netIncomeBreadth"),
            patch.get("turnaroundBreadth"),
            patch.get("positiveRoeBreadth"),
        )
    if component == "broadening":
        return has_value(
            patch.get("broadeningScore"),
            patch.get("supportBreadth20d"),
            patch.get("supportBreadth60d"),
            patch.get("supportPositiveReturnBreadth"),
        )
    return False


def load_anchor_component_cache(component: str) -> Optional[Dict[str, Any]]:
    cache_path = ANCHOR_COMPONENT_CACHE_PATHS.get(component)
    if not cache_path or not cache_path.exists():
        return None
    try:
        payload = json.loads(cache_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    data_patch = payload.get("dataPatch")
    if not isinstance(data_patch, dict) or not anchor_component_has_values(component, data_patch):
        return None
    return payload


def extract_anchor_component_patch(component: str, data: Dict[str, Any]) -> Dict[str, Any]:
    if component == "export":
        return {
            "exportLatestMonth": data.get("exportLatestMonth"),
            "exportValueUsd": data.get("exportValueUsd"),
            "exportYoY": data.get("exportYoY"),
            "exportYoYDelta": data.get("exportYoYDelta"),
            "export3mAvgYoY": data.get("export3mAvgYoY"),
        }
    if component == "earnings":
        return {
            "earningsCoverageCount": data.get("earningsCoverageCount"),
            "earningsSnapshotQuarter": data.get("earningsSnapshotQuarter"),
            "opIncomeBreadth": data.get("opIncomeBreadth"),
            "netIncomeBreadth": data.get("netIncomeBreadth"),
            "turnaroundBreadth": data.get("turnaroundBreadth"),
            "positiveRoeBreadth": data.get("positiveRoeBreadth"),
        }
    if component == "broadening":
        return {
            "broadeningScore": data.get("broadeningScore"),
            "broadeningState": data.get("broadeningState"),
            "supportBreadth20d": data.get("supportBreadth20d"),
            "supportBreadth60d": data.get("supportBreadth60d"),
            "supportPositiveReturnBreadth": data.get("supportPositiveReturnBreadth"),
        }
    return {}


def load_anchor_component_from_results(component: str) -> Optional[Dict[str, Any]]:
    result_files = sorted(RESULTS_DIR.glob("result-*.js"), key=lambda path: path.name, reverse=True)
    for path in result_files:
        try:
            raw_text = path.read_text(encoding="utf-8")
            trimmed = re.sub(r"^\s*window\.__MARKET_ANALYZE_RESULT__\s*=\s*", "", raw_text, count=1)
            payload = json.loads(trimmed.rstrip(";\n "))
            data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
            patch = extract_anchor_component_patch(component, data)
            if not anchor_component_has_values(component, patch):
                continue
            status_source = ""
            if component in {"export", "earnings", "broadening"}:
                anchor_status = payload.get("status", {}).get("anchor", {})
                if isinstance(anchor_status, dict):
                    status_source = str((anchor_status.get(component) or {}).get("source") or "")
            return {
                "savedAt": str(payload.get("meta", {}).get("generatedAt") or ""),
                "source": to_store_relative(path),
                "originalSource": status_source,
                "dataPatch": patch,
            }
        except (OSError, json.JSONDecodeError, TypeError):
            continue
    return None


def save_anchor_component_cache(component: str, patch: Dict[str, Any], source: str = "") -> None:
    if not anchor_component_has_values(component, patch):
        return
    cache_path = ANCHOR_COMPONENT_CACHE_PATHS.get(component)
    if not cache_path:
        return
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "savedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "source": source,
        "dataPatch": patch,
    }
    cache_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def build_cached_component_result(component: str, live_error_message: str) -> Optional[CollectorResult]:
    payload = load_anchor_component_cache(component)
    cache_path = ANCHOR_COMPONENT_CACHE_PATHS.get(component)
    source_parts: List[str] = []
    suffix_label = "최근 성공 캐시 사용"
    if payload:
        if cache_path:
            source_parts.append(to_store_relative(cache_path))
        original_source = str(payload.get("source") or "")
        if original_source:
            source_parts.append(original_source)
    else:
        payload = load_anchor_component_from_results(component)
        if not payload:
            return None
        suffix_label = "최근 성공 생성본 사용"
        source_parts.append(str(payload.get("source") or ""))
        original_source = str(payload.get("originalSource") or "")
        if original_source:
            source_parts.append(original_source)
    saved_at = str(payload.get("savedAt") or "")
    suffix = f" · {suffix_label} ({saved_at})" if saved_at else f" · {suffix_label}"
    return CollectorResult(
        dict(payload.get("dataPatch") or {}),
        status_entry(
            "partial",
            " · ".join(part for part in source_parts if part),
            f"{live_error_message}{suffix}",
        ),
    )


def build_month_window(lookback_months: int = 24) -> Dict[str, str]:
    count = max(13, int(lookback_months or 24))
    today = date.today()
    end_year = today.year
    end_month = today.month
    total_months = end_year * 12 + (end_month - 1)
    start_total = total_months - (count - 1)
    start_year, start_month_index = divmod(start_total, 12)
    return {
        "startMonth": f"{start_year}{start_month_index + 1:02d}",
        "endMonth": f"{end_year}{end_month:02d}",
    }


def get_object_field(row: Dict[str, Any], candidates: Iterable[str]) -> Any:
    lowered = {str(key).lower(): value for key, value in row.items()}
    for candidate in candidates:
        if candidate in row and row[candidate] not in (None, ""):
            return row[candidate]
        matched = lowered.get(str(candidate).lower())
        if matched not in (None, ""):
            return matched
    return None


def collect_kosis_class_fields(row: Dict[str, Any], suffix: str) -> List[str]:
    values: List[str] = []
    for index in range(1, 9):
        field_value = get_object_field(
            row,
            [
                f"C{index}{suffix}",
                f"c{index}{suffix}",
                f"OBJL{index}{suffix}",
                f"objL{index}{suffix}",
            ],
        )
        if field_value in (None, ""):
            continue
        normalized = str(field_value).strip()
        if normalized:
            values.append(normalized)
    deduped: List[str] = []
    for value in values:
        if value not in deduped:
            deduped.append(value)
    return deduped


def parse_kosis_payload(raw_text: str) -> List[Dict[str, Any]]:
    trimmed = str(raw_text or "").strip().lstrip("\ufeff")
    start_candidates = [index for index in (trimmed.find("["), trimmed.find("{")) if index >= 0]
    start_index = min(start_candidates) if start_candidates else 0
    payload = json.loads(trimmed[start_index:])
    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict):
        for key in ("data", "result", "response"):
            if isinstance(payload.get(key), list):
                return payload[key]
        error_message = payload.get("errMsg") or payload.get("error") or payload.get("message")
        if error_message:
            raise ValueError(str(error_message))
    raise ValueError("KOSIS JSON 구조를 해석하지 못했습니다.")


def build_kosis_export_url(api_key: str) -> str:
    window = build_month_window(KOSIS_EXPORT_SERIES_CONFIG["lookbackMonths"])
    query = urlencode(
        {
            "method": "getList",
            "apiKey": api_key,
            "format": "json",
            "jsonVD": "Y",
            "orgId": KOSIS_EXPORT_SERIES_CONFIG["orgId"],
            "tblId": KOSIS_EXPORT_SERIES_CONFIG["tblId"],
            "itmId": "ALL",
            "objL1": "ALL",
            "prdSe": "M",
            "startPrdDe": window["startMonth"],
            "endPrdDe": window["endMonth"],
        }
    )
    return f"https://kosis.kr/openapi/Param/statisticsParameterData.do?{query}"


def normalize_kosis_series_rows(rows: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    normalized_rows: List[Dict[str, Any]] = []
    for row in rows:
        month_key = normalize_month_key(get_object_field(row, ["PRD_DE", "prd_de", "prdDe", "prdde"]))
        value = parse_signed_amount(get_object_field(row, ["DT", "dt", "DATA_VALUE", "data_value"]))
        item_name = str(get_object_field(row, ["ITM_NM", "itm_nm", "itmNm", "itmNmKor"]) or "").strip()
        item_id = str(get_object_field(row, ["ITM_ID", "itm_id", "itmId"]) or "").strip()
        if not month_key or value is None:
            continue
        normalized_rows.append(
            {
                "monthKey": month_key,
                "value": value,
                "itemName": item_name,
                "itemId": item_id,
                "classNames": collect_kosis_class_fields(row, "_NM"),
                "classCodes": collect_kosis_class_fields(row, ""),
            }
        )
    return normalized_rows


def is_monthly_export_item(item_name: str) -> bool:
    normalized = str(item_name or "")
    return bool(re.search(r"수출", normalized)) and not bool(
        re.search(r"수입|무역수지|증감률|구성비|지수|누계|누적", normalized)
    )


def score_kosis_export_series(series: Dict[str, Any]) -> float:
    class_names = series.get("classNames") or []
    has_total_label = any(name.strip() in {"총계", "합계", "전체", "계"} for name in class_names)
    score = 0.0
    if is_monthly_export_item(str(series.get("itemName") or "")):
        score += 25
    if has_total_label:
        score += 18
    if re.search(r"누계|누적", str(series.get("itemName") or "")):
        score -= 14
    score -= max(0, len(class_names) - 1) * 2
    latest_value = safe_number(series.get("latestValue")) or 1
    avg_value = safe_number(series.get("avgValue")) or 1
    score += math.log10(max(latest_value, avg_value, 1))
    score += len(series.get("rows") or []) / 10
    return score


def select_best_kosis_export_series(rows: Iterable[Dict[str, Any]]) -> Dict[str, Any]:
    normalized_rows = [
        row for row in normalize_kosis_series_rows(rows) if is_monthly_export_item(str(row.get("itemName") or ""))
    ]
    if not normalized_rows:
        raise ValueError("KOSIS 수출 월간 시계열 후보가 없습니다.")

    grouped: Dict[str, Dict[str, Any]] = {}
    for row in normalized_rows:
        class_key = "|".join(row["classCodes"] or row["classNames"]) or "ALL"
        group_key = f"{row['itemId'] or row['itemName']}|{class_key}"
        if group_key not in grouped:
            grouped[group_key] = {
                "key": group_key,
                "itemName": row["itemName"],
                "itemId": row["itemId"],
                "classNames": list(row["classNames"]),
                "rows": [],
            }
        grouped[group_key]["rows"].append(row)

    candidates = list(grouped.values())
    for candidate in candidates:
        candidate["rows"].sort(key=lambda item: item["monthKey"])
        candidate["latestValue"] = candidate["rows"][-1]["value"] if candidate["rows"] else None
        candidate["avgValue"] = (
            sum(row["value"] for row in candidate["rows"]) / len(candidate["rows"]) if candidate["rows"] else None
        )
        candidate["score"] = score_kosis_export_series(candidate)

    candidates.sort(
        key=lambda item: (
            item.get("score") or 0,
            item.get("latestValue") or 0,
            len(item.get("rows") or []),
        ),
        reverse=True,
    )
    return candidates[0]


def calculate_export_momentum_from_series(series: Dict[str, Any]) -> Dict[str, Any]:
    rows = list(series.get("rows") or [])
    if not rows:
        return {
            "latestMonth": "",
            "exportValueUsd": None,
            "exportYoY": None,
            "exportYoYDelta": None,
            "export3mAvgYoY": None,
            "state": "neutral",
            "score": 17,
        }

    latest = rows[-1]
    lookup = {row["monthKey"]: row for row in rows}
    latest_prev_year = lookup.get(shift_month_key(latest["monthKey"], -12))
    export_yoy = (
        ((latest["value"] / latest_prev_year["value"]) - 1) * 100
        if latest_prev_year and safe_number(latest_prev_year.get("value")) and latest_prev_year["value"] > 0
        else None
    )

    prev_month_key = shift_month_key(latest["monthKey"], -1)
    prev_month = lookup.get(prev_month_key)
    prev_month_prev_year = lookup.get(shift_month_key(prev_month_key, -12))
    prev_month_yoy = (
        ((prev_month["value"] / prev_month_prev_year["value"]) - 1) * 100
        if prev_month
        and prev_month_prev_year
        and safe_number(prev_month_prev_year.get("value"))
        and prev_month_prev_year["value"] > 0
        else None
    )
    export_yoy_delta = (
        export_yoy - prev_month_yoy
        if safe_number(export_yoy) is not None and safe_number(prev_month_yoy) is not None
        else None
    )

    export_3m_yoys: List[float] = []
    for row in rows[-3:]:
        previous = lookup.get(shift_month_key(row["monthKey"], -12))
        if previous and safe_number(previous.get("value")) and previous["value"] > 0:
            export_3m_yoys.append(((row["value"] / previous["value"]) - 1) * 100)
    export_3m_avg_yoy = sum(export_3m_yoys) / len(export_3m_yoys) if export_3m_yoys else None

    state = "supportive"
    score = 24
    if safe_number(export_yoy) is not None and export_yoy > 5 and safe_number(export_yoy_delta) is not None and export_yoy_delta > 0:
        state = "validated"
        score = 35
    elif safe_number(export_yoy) is not None and export_yoy <= 0 and safe_number(export_yoy_delta) is not None and export_yoy_delta < 0:
        state = "fragile"
        score = 10
    elif safe_number(export_yoy) is None and safe_number(export_3m_avg_yoy) is None:
        state = "neutral"
        score = 17

    return {
        "latestMonth": latest["monthKey"],
        "exportValueUsd": latest["value"],
        "exportYoY": export_yoy,
        "exportYoYDelta": export_yoy_delta,
        "export3mAvgYoY": export_3m_avg_yoy,
        "state": state,
        "score": score,
    }


def fetch_indicator_page_export_data() -> Dict[str, Any]:
    html = fetch_text(KOSIS_EXPORT_INDICATOR_URL, timeout=12)
    value_match = re.search(r"현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.\-]+)<\/dd>", html, flags=re.IGNORECASE)
    month_match = re.search(r"기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>", html, flags=re.IGNORECASE)
    return {
        "latestMonth": normalize_month_key(month_match.group(1) if month_match else ""),
        "exportValueUsd": parse_signed_amount(value_match.group(1) if value_match else ""),
    }


def parse_tradingeconomics_export_summary(raw_html: str) -> Dict[str, Any]:
    text = html_to_compact_text(raw_html)
    patterns = [
        re.compile(
            rf"Exports in South Korea .*? to ([\d,.\-]+) USD (Million|Billion) in ({MONTH_NAME_REGEX}) "
            rf"from ([\d,.\-]+) USD (Million|Billion) in ({MONTH_NAME_REGEX})(?: of)? (\d{{4}})",
            flags=re.IGNORECASE,
        ),
        re.compile(
            rf"Exports in South Korea .*? to ([\d,.\-]+) in ({MONTH_NAME_REGEX}) "
            rf"from ([\d,.\-]+) in ({MONTH_NAME_REGEX})(?: of)? (\d{{4}})",
            flags=re.IGNORECASE,
        ),
    ]

    for pattern in patterns:
        match = pattern.search(text)
        if not match:
            continue
        if len(match.groups()) == 7:
            value_raw, value_unit, latest_month_name, _prev_raw, _prev_unit, previous_month_name, previous_year = match.groups()
            export_value = parse_signed_amount(value_raw)
            if export_value is not None and str(value_unit or "").lower() == "billion":
                export_value *= 1000
        else:
            value_raw, latest_month_name, _prev_raw, previous_month_name, previous_year = match.groups()
            export_value = parse_signed_amount(value_raw)

        return {
            "latestMonth": infer_latest_month_key(latest_month_name, previous_month_name, previous_year),
            "exportValueUsd": export_value,
        }

    raise ValueError("TradingEconomics 수출 레벨 요약을 해석하지 못했습니다.")


def parse_tradingeconomics_export_yoy(raw_html: str) -> Dict[str, Any]:
    text = html_to_compact_text(raw_html)
    summary_match = re.search(
        rf"Exports YoY in South Korea .*? to ([\d,.\-]+) percent in ({MONTH_NAME_REGEX}) "
        rf"from ([\d,.\-]+) percent in ({MONTH_NAME_REGEX})(?: of)? (\d{{4}})",
        text,
        flags=re.IGNORECASE,
    )
    if not summary_match:
        raise ValueError("TradingEconomics 수출 YoY 요약을 해석하지 못했습니다.")

    latest_yoy = parse_signed_amount(summary_match.group(1))
    latest_month_name = summary_match.group(2)
    previous_yoy = parse_signed_amount(summary_match.group(3))
    previous_month_name = summary_match.group(4)
    previous_year = summary_match.group(5)
    latest_month = infer_latest_month_key(latest_month_name, previous_month_name, previous_year)

    row_candidates: List[Dict[str, Any]] = []
    for line in html_to_text_lines(raw_html):
        if "Exports YoY in South Korea" in line:
            continue
        row_match = re.search(
            rf"\b({MONTH_NAME_REGEX})\b\s+(-?\d+(?:\.\d+)?)\s*%?\s+(-?\d+(?:\.\d+)?)\s*%?",
            line,
            flags=re.IGNORECASE,
        )
        if not row_match:
            continue
        row_candidates.append(
            {
                "monthName": row_match.group(1),
                "value": parse_signed_amount(row_match.group(2)),
                "previousValue": parse_signed_amount(row_match.group(3)),
            }
        )

    previous_previous_yoy = None
    for row in row_candidates:
        if (
            get_month_number(row.get("monthName"))
            == get_month_number(previous_month_name)
            and same_numeric_value(row.get("value"), previous_yoy)
            and safe_number(row.get("previousValue")) is not None
        ):
            previous_previous_yoy = safe_number(row.get("previousValue"))
            break

    export_yoy_delta = (
        latest_yoy - previous_yoy
        if safe_number(latest_yoy) is not None and safe_number(previous_yoy) is not None
        else None
    )
    export_3m_avg_yoy = (
        (latest_yoy + previous_yoy + previous_previous_yoy) / 3
        if safe_number(latest_yoy) is not None
        and safe_number(previous_yoy) is not None
        and safe_number(previous_previous_yoy) is not None
        else None
    )

    return {
        "latestMonth": latest_month,
        "exportYoY": latest_yoy,
        "exportYoYDelta": export_yoy_delta,
        "export3mAvgYoY": export_3m_avg_yoy,
    }


def fetch_tradingeconomics_export_data() -> Dict[str, Any]:
    summary_html = fetch_text(TRADING_ECONOMICS_EXPORT_URL, timeout=15)
    yoy_html = fetch_text(TRADING_ECONOMICS_EXPORT_YOY_URL, timeout=15)
    summary = parse_tradingeconomics_export_summary(summary_html)
    yoy = parse_tradingeconomics_export_yoy(yoy_html)
    return {
        "latestMonth": yoy.get("latestMonth") or summary.get("latestMonth") or "",
        "exportValueUsd": summary.get("exportValueUsd"),
        "exportYoY": yoy.get("exportYoY"),
        "exportYoYDelta": yoy.get("exportYoYDelta"),
        "export3mAvgYoY": yoy.get("export3mAvgYoY"),
    }


def build_export_patch(latest_month: str = "", export_value: Optional[float] = None) -> Dict[str, Any]:
    return {
        "exportLatestMonth": latest_month or "",
        "exportValueUsd": export_value,
        "exportYoY": None,
        "exportYoYDelta": None,
        "export3mAvgYoY": None,
    }


def build_export_patch_from_payload(payload: Dict[str, Any], page_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    page_data = page_data or {}
    latest_month = str(payload.get("latestMonth") or page_data.get("latestMonth") or "")
    export_value = payload.get("exportValueUsd")
    if export_value is None:
        export_value = page_data.get("exportValueUsd")
    return {
        "exportLatestMonth": latest_month,
        "exportValueUsd": export_value,
        "exportYoY": safe_number(payload.get("exportYoY")),
        "exportYoYDelta": safe_number(payload.get("exportYoYDelta")),
        "export3mAvgYoY": safe_number(payload.get("export3mAvgYoY")),
    }


def merge_export_patch_with_cache(patch: Dict[str, Any]) -> Dict[str, Any]:
    cached_payload = load_anchor_component_cache("export") or load_anchor_component_from_results("export")
    cached_patch = dict((cached_payload or {}).get("dataPatch") or {})
    if not cached_patch:
        return patch
    current_month = str(patch.get("exportLatestMonth") or "")
    cached_month = str(cached_patch.get("exportLatestMonth") or "")
    if current_month and cached_month and current_month != cached_month:
        return patch
    merged = dict(cached_patch)
    for key, value in patch.items():
        if value not in (None, "", []):
            merged[key] = value
    return merged


def collect_export_from_tradingeconomics(page_data: Optional[Dict[str, Any]] = None, reason: str = "") -> Optional[CollectorResult]:
    try:
        export_data = fetch_tradingeconomics_export_data()
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if page_data and (page_data.get("latestMonth") or page_data.get("exportValueUsd") is not None):
            merged_patch = merge_export_patch_with_cache(
                build_export_patch(page_data.get("latestMonth", ""), page_data.get("exportValueUsd"))
            )
            return CollectorResult(
                merged_patch,
                status_entry(
                    "partial",
                    "kosis.kr",
                    (f"{reason} · " if reason else "")
                    + f"TradingEconomics 보완도 실패 ({error}) · 최신 발표월/레벨만 반영",
                ),
            )
        return None

    latest_month = str(export_data.get("latestMonth") or (page_data.get("latestMonth") if page_data else "") or "")
    message_prefix = f"{reason} · " if reason else ""
    message = f"{message_prefix}TradingEconomics 공개 페이지 기준 수출 모멘텀 보완"
    if latest_month:
        message = f"{message} ({latest_month})"
    result = CollectorResult(
        build_export_patch_from_payload(export_data, page_data),
        status_entry("partial", "tradingeconomics.com", message),
    )
    save_anchor_component_cache("export", result.data_patch, result.status.get("source", ""))
    return result


def collect_export_momentum(base_data: Dict[str, Any], settings: Optional[Dict[str, str]] = None) -> CollectorResult:
    settings = settings or {}
    api_key = str(settings.get("kosisApiKey") or "").strip()
    page_data: Dict[str, Any] = {"latestMonth": "", "exportValueUsd": None}

    try:
        page_data = fetch_indicator_page_export_data()
    except (HTTPError, URLError, TimeoutError, ValueError) as page_error:
        page_data = {"latestMonth": "", "exportValueUsd": None, "error": str(page_error)}

    if not api_key:
        te_result = collect_export_from_tradingeconomics(page_data, "KOSIS API 키 미입력")
        if te_result:
            return te_result
        cached_result = build_cached_component_result("export", "KOSIS API 키 미입력 · TradingEconomics 보완 실패")
        if cached_result:
            return cached_result
        return CollectorResult(
            merge_export_patch_with_cache(build_export_patch(page_data.get("latestMonth", ""), page_data.get("exportValueUsd"))),
            status_entry(
                "partial" if page_data.get("latestMonth") or page_data.get("exportValueUsd") is not None else "missing",
                "kosis.kr",
                "KOSIS API 키 미입력"
                + (" · 최신 발표월/레벨만 반영" if page_data.get("latestMonth") or page_data.get("exportValueUsd") is not None else ""),
            ),
        )

    try:
        raw_text = fetch_text(build_kosis_export_url(api_key), timeout=15)
        payload = parse_kosis_payload(raw_text)
        series = select_best_kosis_export_series(payload)
        momentum = calculate_export_momentum_from_series(series)
        result = CollectorResult(
            {
                "exportLatestMonth": momentum["latestMonth"] or page_data.get("latestMonth", ""),
                "exportValueUsd": momentum["exportValueUsd"]
                if momentum["exportValueUsd"] is not None
                else page_data.get("exportValueUsd"),
                "exportYoY": momentum["exportYoY"],
                "exportYoYDelta": momentum["exportYoYDelta"],
                "export3mAvgYoY": momentum["export3mAvgYoY"],
            },
            status_entry(
                "ok",
                "kosis.kr/openapi",
                (
                    f"수출 모멘텀 {momentum['latestMonth']} 기준 갱신"
                    if momentum["latestMonth"]
                    else "수출 모멘텀 갱신"
                ),
            ),
        )
        save_anchor_component_cache("export", result.data_patch, result.status.get("source", ""))
        return result
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        te_result = collect_export_from_tradingeconomics(page_data, f"KOSIS 시계열 조회 실패 ({error})")
        if te_result:
            return te_result
        cached_result = build_cached_component_result("export", f"수출 모멘텀 수집 실패 ({error})")
        if cached_result:
            return cached_result
        if page_data.get("latestMonth") or page_data.get("exportValueUsd") is not None:
            return CollectorResult(
                merge_export_patch_with_cache(build_export_patch(page_data.get("latestMonth", ""), page_data.get("exportValueUsd"))),
                status_entry("partial", "kosis.kr", f"KOSIS 시계열 조회 실패 ({error}) · 최신 발표월/레벨만 반영"),
            )

        export_available = bool(base_data.get("exportLatestMonth")) or has_value(
            base_data.get("exportValueUsd"),
            base_data.get("exportYoY"),
            base_data.get("exportYoYDelta"),
            base_data.get("export3mAvgYoY"),
        )
        if export_available:
            return CollectorResult(
                {},
                status_entry(
                    "partial",
                    "store/market_analyze_data.json",
                    f"수출 모멘텀 수집 실패 ({error}) · 기존 스냅샷 유지",
                ),
            )
        return CollectorResult(build_export_patch(), status_entry("error", "kosis.kr/openapi", f"수출 모멘텀 수집 실패 ({error})"))


def dedupe_candidates(candidates: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    deduped: Dict[str, Dict[str, Any]] = {}
    for candidate in candidates:
        code = str(candidate.get("code") or "")
        if not code:
            continue
        previous = deduped.get(code)
        current_value = safe_number(candidate.get("todayTradingValue")) or 0
        previous_value = safe_number(previous.get("todayTradingValue")) if previous else None
        if previous is None or current_value > (previous_value or 0):
            deduped[code] = {
                "code": code,
                "name": str(candidate.get("name") or "").strip(),
                "todayTradingValue": current_value,
            }
    return list(deduped.values())


def create_market_sum_field_url(page: int = 1) -> str:
    return_url = quote(f"http://finance.naver.com/sise/sise_market_sum.naver?page={page}", safe="")
    return (
        "https://finance.naver.com/sise/field_submit.naver"
        f"?menu=market_sum&returnUrl={return_url}"
        "&fieldIds=quant"
        "&fieldIds=amount"
        "&fieldIds=market_sum"
        "&fieldIds=frgn_rate"
        "&fieldIds=per"
        "&fieldIds=roe"
    )


def parse_market_sum_page_count(html: str) -> int:
    values = [
        int(match.group(1))
        for match in re.finditer(r"sise_market_sum\.naver\?[^\"']*?page=(\d+)", str(html or ""))
        if match.group(1).isdigit()
    ]
    return max(values) if values else 1


def parse_leader_candidate_rows(html: str, trading_value_index: int, minimum_td_count: int) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", str(html or ""), flags=re.IGNORECASE):
        if '/item/main.naver?code=' not in tr_content:
            continue
        code_match = re.search(r"/item/main\.naver\?code=([A-Z0-9]+)", tr_content)
        name_match = re.search(r'class="tltle">([^<]+)<', tr_content)
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if not code_match or not name_match or len(td_matches) < minimum_td_count:
            continue
        today_trading_value = parse_signed_number(td_matches[trading_value_index])
        if safe_number(today_trading_value) is None:
            continue
        rows.append(
            {
                "code": code_match.group(1),
                "name": strip_html(name_match.group(1)),
                "todayTradingValue": today_trading_value,
            }
        )
    return rows


def parse_market_sum_rows(html: str) -> List[Dict[str, Any]]:
    return parse_leader_candidate_rows(html, 7, 12)


def parse_quant_rows(html: str) -> List[Dict[str, Any]]:
    return parse_leader_candidate_rows(html, 6, 7)


def fetch_market_sum_candidates() -> List[Dict[str, Any]]:
    first_html = fetch_text(create_market_sum_field_url(1), timeout=12, encodings=("euc-kr", "utf-8"))
    page_count = parse_market_sum_page_count(first_html)
    pages = list(range(2, max(page_count, 1) + 1))

    html_pages = [first_html]
    if pages:
        with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(pages))) as executor:
            future_map = {
                executor.submit(fetch_text, create_market_sum_field_url(page), timeout=12, encodings=("euc-kr", "utf-8")): page
                for page in pages
            }
            for future in as_completed(future_map):
                try:
                    html_pages.append(future.result())
                except Exception:
                    continue

    candidates: List[Dict[str, Any]] = []
    for html in html_pages:
        candidates.extend(parse_market_sum_rows(html))
    return candidates


def fetch_quant_candidates() -> List[Dict[str, Any]]:
    html = fetch_text("https://finance.naver.com/sise/sise_quant.naver", timeout=12, encodings=("euc-kr", "utf-8"))
    candidates = parse_quant_rows(html)
    if not candidates:
        raise ValueError("거래상위 후보 파싱 실패")
    return candidates


def create_static_fallback_candidates() -> List[Dict[str, Any]]:
    return [
        {"code": code, "name": name, "todayTradingValue": float(len(LEADER_STATIC_FALLBACK_CODES) - index)}
        for index, (code, name) in enumerate(LEADER_STATIC_FALLBACK_CODES)
    ]


def create_snapshot_fallback_candidates(base_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    leader_stocks = base_data.get("leaderStocks") if isinstance(base_data.get("leaderStocks"), list) else []
    candidates: List[Dict[str, Any]] = []
    for stock in leader_stocks:
        code = str(stock.get("code") or "")
        name = str(stock.get("name") or "")
        if not code or not name:
            continue
        today_trading_value = safe_number(stock.get("todayTradingValue"))
        if today_trading_value is None:
            today_trading_value = safe_number(stock.get("cum15dTradingValue"))
        if today_trading_value is None:
            weight = safe_number(stock.get("weight")) or 0
            today_trading_value = weight * 1000
        candidates.append(
            {
                "code": code,
                "name": name,
                "todayTradingValue": today_trading_value,
            }
        )
    return candidates


def is_leader_excluded(candidate: Dict[str, Any]) -> bool:
    return bool(LEADER_EXCLUDE_REGEX.search(str(candidate.get("name") or ""))) or not bool(
        re.fullmatch(r"\d{6}", str(candidate.get("code") or ""))
    )


def create_leader_chart_url(code: str) -> str:
    count = max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS + 10)
    return (
        "https://fchart.stock.naver.com/sise.nhn"
        f"?symbol={code}&timeframe=day&count={count}&requestType=0"
    )


def create_yahoo_equity_symbols(code: str) -> List[str]:
    normalized = str(code or "").strip()
    if not re.fullmatch(r"\d{6}", normalized):
        return []
    return [f"{normalized}.{suffix}" for suffix in YAHOO_KOREA_SUFFIXES]


def parse_leader_chart_rows(xml_text: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for raw_item in re.findall(r'<item[^>]*data="([^"]+)"', str(xml_text or ""), flags=re.IGNORECASE):
        parts = raw_item.split("|")
        if len(parts) != 6:
            continue
        date_key, open_price, high_price, low_price, close_price, volume = parts
        parsed = {
            "dateKey": normalize_date_key(date_key),
            "open": safe_number(open_price),
            "high": safe_number(high_price),
            "low": safe_number(low_price),
            "close": safe_number(close_price),
            "volume": safe_number(volume),
        }
        if not parsed["dateKey"] or any(value is None for key, value in parsed.items() if key != "dateKey"):
            continue
        trading_value = ((parsed["open"] + parsed["high"] + parsed["low"] + parsed["close"]) / 4) * parsed["volume"] / 1_000_000
        rows.append({**parsed, "tradingValue": trading_value})

    deduped = {row["dateKey"]: row for row in rows}
    ordered = [deduped[key] for key in sorted(deduped)]
    return ordered[-max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS) :]


def parse_yahoo_leader_history_rows(closes: Iterable[Any]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for index, close in enumerate(closes or []):
        close_value = safe_number(close)
        if close_value is None:
            continue
        rows.append(
            {
                "dateKey": f"Y{index:04d}",
                "close": close_value,
            }
        )
    return rows[-max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS) :]


def fetch_yahoo_leader_history(candidate: Dict[str, Any]) -> Dict[str, Any]:
    errors: List[str] = []
    for symbol in create_yahoo_equity_symbols(str(candidate.get("code") or "")):
        try:
            quote = fetch_yahoo_chart(symbol, "1y")
            history = parse_yahoo_leader_history_rows(quote.get("closes") or [])
            if len(history) < 60:
                raise ValueError(f"{symbol} 60영업일 부족 ({len(history)}건)")
            return {
                "history": history,
                "historySource": "query1.finance.yahoo.com",
                "historySymbol": symbol,
            }
        except Exception as error:  # noqa: BLE001
            errors.append(f"{symbol}: {error}")
            continue
    raise ValueError("Yahoo 일봉 60영업일 확보 실패" + (f" ({' / '.join(errors[:2])})" if errors else ""))


def fetch_leader_history(candidate: Dict[str, Any]) -> Dict[str, Any]:
    code = str(candidate.get("code") or "")
    label = str(candidate.get("name") or code)
    try:
        xml_text = fetch_text(create_leader_chart_url(code), timeout=12)
        history = parse_leader_chart_rows(xml_text)
        if len(history) < 60:
            raise ValueError(f"네이버 차트 60영업일 부족 ({len(history)}건)")
        return {
            "history": history,
            "historySource": "finance.naver.com/fchart",
        }
    except Exception as naver_error:  # noqa: BLE001
        try:
            yahoo_payload = fetch_yahoo_leader_history(candidate)
            yahoo_payload["historyFallbackReason"] = str(naver_error)
            return yahoo_payload
        except Exception as yahoo_error:  # noqa: BLE001
            raise ValueError(f"{label} 차트 60영업일 확보 실패 (Naver: {naver_error}; Yahoo: {yahoo_error})")


def build_anchor_universes(base_data: Dict[str, Any]) -> Dict[str, Any]:
    gathered: List[Dict[str, Any]] = []
    sources: List[str] = []
    history_source_counts: Dict[str, int] = {}

    try:
        quant_candidates = fetch_quant_candidates()
        gathered.extend(quant_candidates)
        sources.append("finance.naver.com/sise_quant")
    except Exception:
        pass

    if len(gathered) < LEADER_SCREEN_LIMIT:
        try:
            market_sum_candidates = fetch_market_sum_candidates()
            gathered.extend(market_sum_candidates)
            sources.append("finance.naver.com/sise_market_sum")
        except Exception:
            pass

    snapshot_candidates = create_snapshot_fallback_candidates(base_data)
    if snapshot_candidates:
        gathered.extend(snapshot_candidates)
        sources.append("store/market_analyze_data.json")

    if len(dedupe_candidates(gathered)) < FUNDAMENTAL_BROADENING_UNIVERSE_COUNT:
        gathered.extend(create_static_fallback_candidates())
        sources.append("static_fallback")

    candidates = dedupe_candidates(gathered)
    filtered = [candidate for candidate in candidates if not is_leader_excluded(candidate)]
    filtered.sort(key=lambda item: safe_number(item.get("todayTradingValue")) or 0, reverse=True)

    if not filtered:
        raise ValueError("앵커 유니버스 후보 확보 실패")

    leader_codes = {
        str(stock.get("code") or "")
        for stock in (base_data.get("leaderStocks") if isinstance(base_data.get("leaderStocks"), list) else [])
        if str(stock.get("code") or "")
    }
    earnings_universe = filtered[:FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT]
    broadening_candidates = [
        candidate for candidate in filtered if str(candidate.get("code") or "") not in leader_codes
    ][:FUNDAMENTAL_BROADENING_UNIVERSE_COUNT]

    broadening_universe: List[Dict[str, Any]] = []
    if broadening_candidates:
        with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(broadening_candidates))) as executor:
            future_map = {
                executor.submit(fetch_leader_history, candidate): candidate for candidate in broadening_candidates
            }
            for future in as_completed(future_map):
                candidate = future_map[future]
                try:
                    history_payload = future.result()
                    history_source = str(history_payload.get("historySource") or "")
                    if history_source:
                        history_source_counts[history_source] = history_source_counts.get(history_source, 0) + 1
                    broadening_universe.append({**candidate, **history_payload})
                except Exception:
                    continue
        broadening_universe.sort(key=lambda item: safe_number(item.get("todayTradingValue")) or 0, reverse=True)

    history_source_parts = [
        f"{source} {count}건"
        for source, count in history_source_counts.items()
        if count > 0
    ]
    return {
        "earningsUniverse": earnings_universe,
        "broadeningUniverse": broadening_universe,
        "source": " · ".join(dict.fromkeys(sources)) or "artifact",
        "historySourceSummary": " · ".join(history_source_parts),
        "historyAttemptSourceSummary": "finance.naver.com/fchart · query1.finance.yahoo.com",
        "broadeningYahooFallbackCount": history_source_counts.get("query1.finance.yahoo.com", 0),
        "candidateCount": len(filtered),
        "broadeningTargetCount": len(broadening_candidates),
        "broadeningFailureCount": max(0, len(broadening_candidates) - len(broadening_universe)),
    }


def get_current_month_fingerprint(settings: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    settings = settings or {}
    return {
        "monthKey": date.today().strftime("%Y-%m"),
        "fingerprint": str(settings.get("dartApiKey") or "")[-4:],
    }


def load_cached_corp_map(settings: Optional[Dict[str, str]] = None) -> Optional[Dict[str, str]]:
    if not DART_CORP_MAP_CACHE_PATH.exists() or not DART_CORP_MAP_META_PATH.exists():
        return None
    fingerprint = get_current_month_fingerprint(settings)
    try:
        meta = json.loads(DART_CORP_MAP_META_PATH.read_text(encoding="utf-8"))
        if meta.get("monthKey") != fingerprint["monthKey"] or meta.get("fingerprint") != fingerprint["fingerprint"]:
            return None
        payload = json.loads(DART_CORP_MAP_CACHE_PATH.read_text(encoding="utf-8"))
        if isinstance(payload, dict):
            return {str(key): str(value) for key, value in payload.items()}
    except (OSError, json.JSONDecodeError):
        return None
    return None


def save_cached_corp_map(corp_map: Dict[str, str], settings: Optional[Dict[str, str]] = None) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    fingerprint = get_current_month_fingerprint(settings)
    DART_CORP_MAP_CACHE_PATH.write_text(json.dumps(corp_map, ensure_ascii=False), encoding="utf-8")
    DART_CORP_MAP_META_PATH.write_text(json.dumps(fingerprint, ensure_ascii=False), encoding="utf-8")


def fetch_corp_code_map(settings: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    settings = settings or {}
    api_key = str(settings.get("dartApiKey") or "").strip()
    if not api_key:
        return {}

    cached = load_cached_corp_map(settings)
    if cached:
        return cached

    raw = make_request(f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={quote(api_key, safe='')}", timeout=20)
    with zipfile.ZipFile(BytesIO(raw)) as archive:
        xml_name = next((name for name in archive.namelist() if name.lower().endswith(".xml")), "")
        if not xml_name:
            raise ValueError("corpCode.xml 압축 해제 실패")
        xml_text = archive.read(xml_name).decode("utf-8", errors="ignore")

    root = ET.fromstring(xml_text)
    corp_map: Dict[str, str] = {}
    for item in root.findall(".//list"):
        stock_code = (item.findtext("stock_code") or "").strip()
        corp_code = (item.findtext("corp_code") or "").strip()
        if stock_code and corp_code:
            corp_map[stock_code] = corp_code

    save_cached_corp_map(corp_map, settings)
    return corp_map


def get_quarter_targets(today_value: Optional[date] = None) -> Dict[str, Dict[str, Any]]:
    today_value = today_value or date.today()
    year = today_value.year
    month = today_value.month
    if 5 <= month < 8:
        return {
            "current": {"bsnsYear": year, "reprtCode": "11013", "label": f"{year} 1Q", "roeMultiplier": 4},
            "previous": {"bsnsYear": year - 1, "reprtCode": "11013", "label": f"{year - 1} 1Q", "roeMultiplier": 4},
        }
    if 8 <= month < 11:
        return {
            "current": {"bsnsYear": year, "reprtCode": "11012", "label": f"{year} 반기", "roeMultiplier": 2},
            "previous": {"bsnsYear": year - 1, "reprtCode": "11012", "label": f"{year - 1} 반기", "roeMultiplier": 2},
        }
    if month >= 11:
        return {
            "current": {"bsnsYear": year, "reprtCode": "11014", "label": f"{year} 3Q", "roeMultiplier": 4 / 3},
            "previous": {"bsnsYear": year - 1, "reprtCode": "11014", "label": f"{year - 1} 3Q", "roeMultiplier": 4 / 3},
        }
    return {
        "current": {"bsnsYear": year - 1, "reprtCode": "11011", "label": f"{year - 1} 연간", "roeMultiplier": 1},
        "previous": {"bsnsYear": year - 2, "reprtCode": "11011", "label": f"{year - 2} 연간", "roeMultiplier": 1},
    }


def fetch_dart_statement(api_key: str, corp_code: str, quarter_target: Dict[str, Any]) -> List[Dict[str, Any]]:
    if not api_key or not corp_code or not quarter_target:
        return []
    query = urlencode(
        {
            "crtfc_key": api_key,
            "corp_code": corp_code,
            "bsns_year": quarter_target["bsnsYear"],
            "reprt_code": quarter_target["reprtCode"],
        }
    )
    payload = json.loads(
        fetch_text(f"https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?{query}", timeout=15)
    )
    if payload.get("status") != "000":
        raise ValueError(payload.get("message") or f"DART 재무 응답 오류 ({payload.get('status')})")
    rows = payload.get("list")
    return rows if isinstance(rows, list) else []


def normalize_statement_name(name: Any) -> str:
    return re.sub(r"\s+", "", str(name or ""))


def pick_statement_amount(rows: Iterable[Dict[str, Any]], matcher) -> Optional[float]:
    for row in rows:
        if matcher(normalize_statement_name(row.get("account_nm"))):
            for field in ("thstrm_amount", "thstrm_add_amount"):
                value = parse_signed_amount(row.get(field))
                if value is not None:
                    return value
    return None


def extract_statement_metrics(rows: List[Dict[str, Any]], quarter_target: Dict[str, Any]) -> Dict[str, Optional[float]]:
    operating_income = pick_statement_amount(rows, lambda account_name: "영업이익" in account_name)
    net_income = pick_statement_amount(
        rows,
        lambda account_name: bool(re.search(r"(당기순이익|분기순이익|반기순이익)", account_name))
        and not bool(re.search(r"(지배기업|비지배)", account_name)),
    )
    equity = pick_statement_amount(rows, lambda account_name: "자본총계" in account_name)
    annualized_roe = (
        (net_income * (quarter_target.get("roeMultiplier") or 1) / equity) * 100
        if net_income is not None and equity is not None and equity > 0
        else None
    )
    return {
        "operatingIncome": operating_income,
        "netIncome": net_income,
        "equity": equity,
        "annualizedRoe": annualized_roe,
    }


def sum_weighted(items: Iterable[Dict[str, Any]], predicate) -> Optional[float]:
    weight_sum = 0.0
    hit_sum = 0.0
    for item in items:
        weight = safe_number(item.get("weight"))
        if weight is None or weight <= 0:
            continue
        weight_sum += weight
        if predicate(item):
            hit_sum += weight
    return hit_sum / weight_sum if weight_sum > 0 else None


def build_neutral_earnings_patch() -> Dict[str, Any]:
    return {
        "earningsCoverageCount": 0,
        "earningsSnapshotQuarter": "",
        "opIncomeBreadth": None,
        "netIncomeBreadth": None,
        "turnaroundBreadth": None,
        "positiveRoeBreadth": None,
    }


def create_naver_item_main_url(code: str) -> str:
    return f"https://finance.naver.com/item/main.naver?code={code}"


def fetch_naver_company_financial_summary(code: str) -> str:
    return fetch_text(create_naver_item_main_url(code), timeout=12, encodings=("euc-kr", "utf-8"))


def create_fnguide_finance_url(code: str) -> str:
    return f"https://comp.fnguide.com/SVO2/ASP/SVD_Finance.asp?gicode=A{code}"


def create_fnguide_ratio_url(code: str) -> str:
    return (
        "https://comp.fnguide.com/SVO2/ASP/SVD_FinanceRatio.asp"
        f"?MenuYn=Y&NewMenuID=104&ReportGB=B&cID=&gicode=A{code}&pGB=1&stkGb=701"
    )


def fetch_fnguide_company_financial_pages(code: str) -> Dict[str, str]:
    return {
        "finance": fetch_text(create_fnguide_finance_url(code), timeout=12, encodings=("utf-8", "euc-kr")),
        "ratio": fetch_text(create_fnguide_ratio_url(code), timeout=12, encodings=("utf-8", "euc-kr")),
    }


def extract_naver_financial_table(raw_html: str) -> str:
    marker_index = str(raw_html or "").find("기업실적분석")
    if marker_index < 0:
        raise ValueError("네이버 기업실적분석 섹션 없음")
    window = raw_html[marker_index : marker_index + 60000]
    summary_match = re.search(
        r"<table[^>]*summary=\"[^\"]*기업실적분석[^\"]*\"[^>]*>[\s\S]*?<\/table>",
        window,
        flags=re.IGNORECASE,
    )
    if summary_match:
        return summary_match.group(0)
    table_match = re.search(r"<table[^>]*>[\s\S]*?<\/table>", window, flags=re.IGNORECASE)
    if table_match:
        return table_match.group(0)
    raise ValueError("네이버 기업실적분석 테이블 없음")


def parse_html_row_cells(table_row_html: str) -> List[Dict[str, Any]]:
    cells: List[Dict[str, Any]] = []
    for match in re.finditer(r"<t([hd])([^>]*)>([\s\S]*?)<\/t[hd]>", table_row_html, flags=re.IGNORECASE):
        attrs = match.group(2)
        colspan_match = re.search(r"colspan=['\"]?(\d+)", attrs, flags=re.IGNORECASE)
        cells.append(
            {
                "text": normalize_whitespace(strip_html(match.group(3))),
                "colspan": int(colspan_match.group(1)) if colspan_match else 1,
            }
        )
    return cells


def extract_naver_header_groups(table_html: str) -> Dict[str, int]:
    annual_count = 0
    quarter_count = 0
    for row_html in re.findall(r"<tr[^>]*>[\s\S]*?<\/tr>", table_html, flags=re.IGNORECASE)[:4]:
        for cell in parse_html_row_cells(row_html):
            if "최근 연간 실적" in cell["text"]:
                annual_count = int(cell.get("colspan") or 0)
            elif "최근 분기 실적" in cell["text"]:
                quarter_count = int(cell.get("colspan") or 0)
    return {"annualCount": annual_count, "quarterCount": quarter_count}


def extract_naver_header_labels(table_html: str) -> List[str]:
    header_html_match = re.search(r"<thead[^>]*>([\s\S]*?)<\/thead>", table_html, flags=re.IGNORECASE)
    header_html = header_html_match.group(1) if header_html_match else table_html
    labels: List[str] = []
    for match in re.finditer(r"<t[hd][^>]*>([\s\S]*?)<\/t[hd]>", header_html, flags=re.IGNORECASE):
        cell_text = normalize_whitespace(strip_html(match.group(1)))
        for label in re.findall(r"\d{4}\.\d{2}(?:\(E\))?", cell_text):
            labels.append(label)
    if labels:
        return labels
    for line in html_to_text_lines(table_html):
        labels.extend(re.findall(r"\d{4}\.\d{2}(?:\(E\))?", line))
    return labels


def determine_quarter_header_slice(header_labels: List[str], header_groups: Dict[str, int]) -> List[str]:
    annual_count = int(header_groups.get("annualCount") or 0)
    quarter_count = int(header_groups.get("quarterCount") or 0)
    if quarter_count and len(header_labels) >= annual_count + quarter_count:
        return header_labels[annual_count : annual_count + quarter_count]
    if len(header_labels) >= 6:
        fallback_count = min(max(5, len(header_labels) - max(annual_count, 4)), len(header_labels))
        return header_labels[-fallback_count:]
    return header_labels


def normalize_metric_row_cells(row_texts: List[str], target_count: int) -> List[str]:
    values = [normalize_whitespace(text) for text in row_texts[1:]]
    if target_count <= 0:
        return values
    if len(values) >= target_count:
        return values[:target_count]
    return values + [""] * (target_count - len(values))


def extract_html_table_rows(table_html: str) -> List[List[str]]:
    rows: List[List[str]] = []
    for row_html in re.findall(r"<tr[^>]*>[\s\S]*?<\/tr>", table_html, flags=re.IGNORECASE):
        cells = [cell["text"] for cell in parse_html_row_cells(row_html)]
        if cells:
            rows.append(cells)
    return rows


def extract_metric_quarter_pairs(
    metric_rows: Dict[str, List[str]],
    metric_name: str,
    header_labels: List[str],
    quarter_labels: List[str],
) -> List[tuple[str, Optional[float]]]:
    row = metric_rows.get(metric_name) or []
    if not row or not quarter_labels:
        return []
    all_values = normalize_metric_row_cells(row, len(header_labels))
    quarter_values = all_values[-len(quarter_labels) :] if len(all_values) >= len(quarter_labels) else all_values
    return [(label, parse_numeric_cell(value)) for label, value in zip(quarter_labels, quarter_values)]


def find_latest_actual_quarter_label(quarter_pairs: List[tuple[str, Optional[float]]]) -> str:
    for label, _value in reversed(quarter_pairs):
        if "(E)" not in label:
            return label
    return ""


def find_previous_year_same_quarter_label(quarter_pairs: List[tuple[str, Optional[float]]], latest_label: str) -> str:
    if not latest_label:
        return ""
    year = int(latest_label[:4])
    month = latest_label[5:7]
    target = f"{year - 1}.{month}"
    for label, _value in quarter_pairs:
        if "(E)" in label:
            continue
        if label.startswith(target):
            return label
    return ""


def quarter_pairs_to_lookup(quarter_pairs: List[tuple[str, Optional[float]]]) -> Dict[str, Optional[float]]:
    lookup: Dict[str, Optional[float]] = {}
    for label, value in quarter_pairs:
        if label and label not in lookup:
            lookup[label] = value
    return lookup


def extract_naver_metric_rows(table_html: str) -> Dict[str, List[str]]:
    rows = extract_html_table_rows(table_html)
    metric_rows: Dict[str, List[str]] = {}
    for row in rows:
        if not row:
            continue
        normalized_label = normalize_statement_name(row[0])
        if normalized_label.startswith("영업이익") and "률" not in normalized_label:
            metric_rows["operatingIncome"] = row
        elif "당기순이익" in normalized_label and "률" not in normalized_label:
            metric_rows["netIncome"] = row
        elif normalized_label.startswith("ROE"):
            metric_rows["roe"] = row
    return metric_rows


def find_last_line_index(lines: List[str], predicate) -> int:
    found = -1
    for index, line in enumerate(lines):
        if predicate(line):
            found = index
    return found


def find_section_end_index(lines: List[str], start_index: int, stop_markers: Iterable[str]) -> int:
    for index in range(max(0, start_index + 1), len(lines)):
        if any(marker in lines[index] for marker in stop_markers):
            return index
    return len(lines)


def parse_number_tokens_from_line(line: str) -> List[float]:
    tokens = re.findall(r"-?\d[\d,]*(?:\.\d+)?", normalize_whitespace(line))
    values: List[float] = []
    for token in tokens:
        value = parse_signed_amount(token)
        if value is not None:
            values.append(value)
    return values


def extract_metric_values_from_lines(
    lines: List[str],
    start_index: int,
    end_index: int,
    label: str,
    minimum_values: int,
) -> List[float]:
    target = normalize_statement_name(label)
    for index in range(start_index, min(end_index, len(lines))):
        if normalize_statement_name(lines[index]) != target:
            continue
        for probe_index in range(index + 1, min(index + 8, end_index)):
            probe_line = lines[probe_index]
            if "계산에 참여한 계정" in probe_line or probe_line.startswith("("):
                continue
            values = parse_number_tokens_from_line(probe_line)
            if len(values) >= minimum_values:
                return values
    return []


def parse_fnguide_financial_summary(finance_html: str, ratio_html: str) -> Dict[str, Any]:
    finance_lines = html_to_text_lines(finance_html)
    finance_header_index = find_last_line_index(
        finance_lines,
        lambda line: ("포괄손익계산서 IFRS" in line or "손익계산서 IFRS" in line)
        and len(re.findall(r"\d{4}/\d{2}", line)) >= 4,
    )
    if finance_header_index < 0:
        raise ValueError("FnGuide 분기 손익계산서 헤더 없음")

    finance_section_end = find_section_end_index(finance_lines, finance_header_index, ["재무상태표", "현금흐름표"])
    quarter_labels = re.findall(r"\d{4}/\d{2}", finance_lines[finance_header_index])
    if len(quarter_labels) < 4:
        raise ValueError("FnGuide 분기 손익 헤더 부족")

    current_label = quarter_labels[-1]
    previous_label = f"{int(current_label[:4]) - 1}/{current_label[5:7]}"
    current_value_index = len(quarter_labels) - 1
    previous_value_index = len(quarter_labels)

    operating_values = extract_metric_values_from_lines(
        finance_lines,
        finance_header_index,
        finance_section_end,
        "영업이익",
        previous_value_index + 1,
    )
    net_income_values = extract_metric_values_from_lines(
        finance_lines,
        finance_header_index,
        finance_section_end,
        "당기순이익",
        previous_value_index + 1,
    )
    if len(operating_values) <= previous_value_index or len(net_income_values) <= previous_value_index:
        raise ValueError("FnGuide 손익 지표 파싱 실패")

    ratio_lines = html_to_text_lines(ratio_html)
    ratio_header_index = find_last_line_index(
        ratio_lines,
        lambda line: "재무비율 IFRS" in line and len(re.findall(r"\d{4}/\d{2}", line)) >= 4,
    )
    if ratio_header_index < 0:
        raise ValueError("FnGuide 재무비율 헤더 없음")

    ratio_section_end = find_section_end_index(ratio_lines, ratio_header_index, ["활동성비율", "안정성비율", "성장성비율"])
    ratio_labels = re.findall(r"\d{4}/\d{2}", ratio_lines[ratio_header_index])
    roe_values = extract_metric_values_from_lines(
        ratio_lines,
        ratio_header_index,
        ratio_section_end,
        "ROE",
        max(1, len(ratio_labels)),
    )
    roe_lookup: Dict[str, float] = {}
    if ratio_labels and len(roe_values) >= len(ratio_labels):
        roe_lookup = {
            label: value
            for label, value in zip(ratio_labels, roe_values[-len(ratio_labels) :])
            if safe_number(value) is not None
        }
    current_roe = safe_number(roe_lookup.get(current_label))
    if current_roe is None and roe_values:
        current_roe = safe_number(roe_values[-1])

    return {
        "snapshotLabel": current_label,
        "previousLabel": previous_label,
        "currentMetrics": {
            "operatingIncome": safe_number(operating_values[current_value_index]),
            "netIncome": safe_number(net_income_values[current_value_index]),
            "annualizedRoe": current_roe,
        },
        "previousMetrics": {
            "operatingIncome": safe_number(operating_values[previous_value_index]),
            "netIncome": safe_number(net_income_values[previous_value_index]),
            "annualizedRoe": safe_number(roe_lookup.get(previous_label)),
        },
    }


def parse_naver_financial_summary(raw_html: str) -> Dict[str, Any]:
    table_html = extract_naver_financial_table(raw_html)
    header_groups = extract_naver_header_groups(table_html)
    header_labels = extract_naver_header_labels(table_html)
    quarter_labels = determine_quarter_header_slice(header_labels, header_groups)
    if len(quarter_labels) < 4:
        raise ValueError("네이버 분기 헤더 부족")

    metric_rows = extract_naver_metric_rows(table_html)
    operating_pairs = extract_metric_quarter_pairs(metric_rows, "operatingIncome", header_labels, quarter_labels)
    net_pairs = extract_metric_quarter_pairs(metric_rows, "netIncome", header_labels, quarter_labels)
    roe_pairs = extract_metric_quarter_pairs(metric_rows, "roe", header_labels, quarter_labels)

    latest_label = find_latest_actual_quarter_label(operating_pairs or net_pairs or roe_pairs)
    previous_label = find_previous_year_same_quarter_label(operating_pairs or net_pairs or roe_pairs, latest_label)
    if not latest_label or not previous_label:
        raise ValueError("전년동기 비교용 분기 라벨 부족")

    operating_lookup = quarter_pairs_to_lookup(operating_pairs)
    net_lookup = quarter_pairs_to_lookup(net_pairs)
    roe_lookup = quarter_pairs_to_lookup(roe_pairs)
    return {
        "snapshotLabel": latest_label,
        "previousLabel": previous_label,
        "currentMetrics": {
            "operatingIncome": safe_number(operating_lookup.get(latest_label)),
            "netIncome": safe_number(net_lookup.get(latest_label)),
            "annualizedRoe": safe_number(roe_lookup.get(latest_label)),
        },
        "previousMetrics": {
            "operatingIncome": safe_number(operating_lookup.get(previous_label)),
            "netIncome": safe_number(net_lookup.get(previous_label)),
            "annualizedRoe": safe_number(roe_lookup.get(previous_label)),
        },
    }


def build_earnings_patch_from_results(results: List[Dict[str, Any]], snapshot_label: str) -> Dict[str, Any]:
    op_income_breadth = sum_weighted(
        results,
        lambda item: (
            safe_number(item["currentMetrics"].get("operatingIncome")) is not None
            and safe_number(item["previousMetrics"].get("operatingIncome")) is not None
            and (
                item["currentMetrics"]["operatingIncome"] > item["previousMetrics"]["operatingIncome"]
                or (
                    item["currentMetrics"]["operatingIncome"] > 0
                    and item["previousMetrics"]["operatingIncome"] <= 0
                )
            )
        ),
    )
    net_income_breadth = sum_weighted(
        results,
        lambda item: (
            safe_number(item["currentMetrics"].get("netIncome")) is not None
            and safe_number(item["previousMetrics"].get("netIncome")) is not None
            and (
                item["currentMetrics"]["netIncome"] > item["previousMetrics"]["netIncome"]
                or (
                    item["currentMetrics"]["netIncome"] > 0
                    and item["previousMetrics"]["netIncome"] <= 0
                )
            )
        ),
    )
    turnaround_breadth = sum_weighted(
        results,
        lambda item: (
            safe_number(item["currentMetrics"].get("operatingIncome")) is not None
            and safe_number(item["previousMetrics"].get("operatingIncome")) is not None
            and item["currentMetrics"]["operatingIncome"] > 0
            and item["previousMetrics"]["operatingIncome"] <= 0
        )
        or (
            safe_number(item["currentMetrics"].get("netIncome")) is not None
            and safe_number(item["previousMetrics"].get("netIncome")) is not None
            and item["currentMetrics"]["netIncome"] > 0
            and item["previousMetrics"]["netIncome"] <= 0
        ),
    )
    positive_roe_breadth = sum_weighted(
        results,
        lambda item: safe_number(item["currentMetrics"].get("annualizedRoe")) is not None
        and item["currentMetrics"]["annualizedRoe"] > 0,
    )
    return {
        "earningsCoverageCount": len(results),
        "earningsSnapshotQuarter": snapshot_label,
        "opIncomeBreadth": op_income_breadth,
        "netIncomeBreadth": net_income_breadth,
        "turnaroundBreadth": turnaround_breadth,
        "positiveRoeBreadth": positive_roe_breadth,
    }


def fetch_naver_earnings_results(candidates: List[Dict[str, Any]], total_trading_value: float) -> List[Dict[str, Any]]:
    if not candidates:
        return []

    def worker(candidate: Dict[str, Any]) -> Dict[str, Any]:
        summary = parse_naver_financial_summary(fetch_naver_company_financial_summary(str(candidate.get("code") or "")))
        return {
            "code": candidate["code"],
            "name": candidate["name"],
            "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
            "snapshotLabel": summary["snapshotLabel"],
            "currentMetrics": summary["currentMetrics"],
            "previousMetrics": summary["previousMetrics"],
        }

    results: List[Dict[str, Any]] = []
    with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(candidates))) as executor:
        future_map = {executor.submit(worker, candidate): candidate for candidate in candidates}
        for future in as_completed(future_map):
            try:
                results.append(future.result())
            except Exception:
                continue
    return results


def fetch_fnguide_earnings_results(candidates: List[Dict[str, Any]], total_trading_value: float) -> List[Dict[str, Any]]:
    if not candidates:
        return []

    def worker(candidate: Dict[str, Any]) -> Dict[str, Any]:
        pages = fetch_fnguide_company_financial_pages(str(candidate.get("code") or ""))
        summary = parse_fnguide_financial_summary(pages["finance"], pages["ratio"])
        return {
            "code": candidate["code"],
            "name": candidate["name"],
            "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
            "snapshotLabel": summary["snapshotLabel"],
            "currentMetrics": summary["currentMetrics"],
            "previousMetrics": summary["previousMetrics"],
        }

    results: List[Dict[str, Any]] = []
    with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(candidates))) as executor:
        future_map = {executor.submit(worker, candidate): candidate for candidate in candidates}
        for future in as_completed(future_map):
            try:
                results.append(future.result())
            except Exception:
                continue
    return results


def collect_earnings_from_naver(
    candidates: List[Dict[str, Any]],
    total_trading_value: float,
    reason: str = "",
) -> Optional[CollectorResult]:
    results = fetch_naver_earnings_results(candidates, total_trading_value)
    if not results:
        return None

    snapshot_label = max((str(item.get("snapshotLabel") or "") for item in results), default="")
    patch = build_earnings_patch_from_results(results, snapshot_label)
    message = f"{reason} · " if reason else ""
    message += f"네이버 기업실적분석 기준 실적 breadth {len(results)}/{len(candidates)}종목 반영"
    if snapshot_label:
        message += f" · {snapshot_label}"
    result = CollectorResult(
        patch,
        status_entry("partial", "finance.naver.com", message),
    )
    save_anchor_component_cache("earnings", result.data_patch, result.status.get("source", ""))
    return result


def collect_earnings_from_fnguide(
    candidates: List[Dict[str, Any]],
    total_trading_value: float,
    reason: str = "",
) -> Optional[CollectorResult]:
    results = fetch_fnguide_earnings_results(candidates, total_trading_value)
    if not results:
        return None

    snapshot_label = max((str(item.get("snapshotLabel") or "") for item in results), default="")
    patch = build_earnings_patch_from_results(results, snapshot_label)
    message = f"{reason} · " if reason else ""
    message += f"FnGuide 재무제표 기준 실적 breadth {len(results)}/{len(candidates)}종목 반영"
    if snapshot_label:
        message += f" · {snapshot_label}"
    result = CollectorResult(
        patch,
        status_entry("partial", "comp.fnguide.com", message),
    )
    save_anchor_component_cache("earnings", result.data_patch, result.status.get("source", ""))
    return result


def collect_earnings_breadth(
    base_data: Dict[str, Any],
    settings: Optional[Dict[str, str]] = None,
    universes: Optional[Dict[str, Any]] = None,
) -> CollectorResult:
    settings = settings or {}
    api_key = str(settings.get("dartApiKey") or "").strip()
    eligible_universe = list((universes or {}).get("earningsUniverse") or [])
    if not eligible_universe:
        return CollectorResult(build_neutral_earnings_patch(), status_entry("missing", "finance.naver.com", "실적 breadth 유니버스 없음"))

    target_universe = eligible_universe[:FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT]
    total_trading_value = sum(safe_number(item.get("todayTradingValue")) or 0 for item in target_universe) or 1

    if not api_key:
        naver_result = collect_earnings_from_naver(target_universe, total_trading_value, "OpenDART API 키 미입력")
        if naver_result:
            return naver_result
        fnguide_result = collect_earnings_from_fnguide(target_universe, total_trading_value, "OpenDART API 키 미입력 · 네이버 기업실적분석 보완 실패")
        if fnguide_result:
            return fnguide_result
        cached_result = build_cached_component_result("earnings", "OpenDART API 키 미입력 · 네이버/FnGuide 보완 실패")
        if cached_result:
            return cached_result
        earnings_available = (base_data.get("earningsCoverageCount") or 0) > 0 or has_value(
            base_data.get("opIncomeBreadth"),
            base_data.get("netIncomeBreadth"),
            base_data.get("turnaroundBreadth"),
            base_data.get("positiveRoeBreadth"),
        )
        if earnings_available:
            return CollectorResult(
                {},
                status_entry(
                    "partial",
                    "store/market_analyze_data.json",
                    "OpenDART API 키 미입력 · 네이버/FnGuide 보완 실패 · 기존 스냅샷 유지",
                ),
            )
        return CollectorResult(build_neutral_earnings_patch(), status_entry("missing", "finance.naver.com · comp.fnguide.com", "OpenDART API 키 미입력 · 네이버/FnGuide 보완 실패"))

    try:
        corp_map = fetch_corp_code_map(settings)
        quarter_targets = get_quarter_targets()
        mapped_universe = []
        for candidate in target_universe:
            corp_code = corp_map.get(str(candidate.get("code") or ""))
            if corp_code:
                mapped_universe.append({**candidate, "corpCode": corp_code})

        if not mapped_universe:
            naver_result = collect_earnings_from_naver(target_universe, total_trading_value, "DART 종목 매핑 실패")
            if naver_result:
                return naver_result
            fnguide_result = collect_earnings_from_fnguide(target_universe, total_trading_value, "DART 종목 매핑 실패 · 네이버 기업실적분석 보완 실패")
            if fnguide_result:
                return fnguide_result
            raise ValueError("DART 종목 매핑 실패")

        def worker(candidate: Dict[str, Any]) -> Dict[str, Any]:
            current_rows = fetch_dart_statement(api_key, candidate["corpCode"], quarter_targets["current"])
            previous_rows = fetch_dart_statement(api_key, candidate["corpCode"], quarter_targets["previous"])
            return {
                "code": candidate["code"],
                "name": candidate["name"],
                "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
                "currentMetrics": extract_statement_metrics(current_rows, quarter_targets["current"]),
                "previousMetrics": extract_statement_metrics(previous_rows, quarter_targets["previous"]),
            }

        results: List[Dict[str, Any]] = []
        with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(mapped_universe))) as executor:
            future_map = {executor.submit(worker, candidate): candidate for candidate in mapped_universe}
            for future in as_completed(future_map):
                try:
                    results.append(future.result())
                except Exception:
                    continue

        success_codes = {str(item.get("code") or "") for item in results}
        naver_candidates = [candidate for candidate in target_universe if str(candidate.get("code") or "") not in success_codes]
        naver_results = fetch_naver_earnings_results(naver_candidates, total_trading_value)
        naver_count = len(naver_results)
        results.extend(naver_results)
        success_codes.update(str(item.get("code") or "") for item in naver_results)

        fnguide_candidates = [candidate for candidate in target_universe if str(candidate.get("code") or "") not in success_codes]
        fnguide_results = fetch_fnguide_earnings_results(fnguide_candidates, total_trading_value)
        fnguide_count = len(fnguide_results)
        results.extend(fnguide_results)

        if not results:
            naver_full_result = collect_earnings_from_naver(
                target_universe,
                total_trading_value,
                "DART 재무 데이터 확보 실패",
            )
            if naver_full_result:
                return naver_full_result
            fnguide_full_result = collect_earnings_from_fnguide(
                target_universe,
                total_trading_value,
                "DART 재무 데이터 확보 실패 · 네이버 기업실적분석 보완 실패",
            )
            if fnguide_full_result:
                return fnguide_full_result
            raise ValueError("DART 재무 데이터 확보 실패")

        patch = build_earnings_patch_from_results(results, quarter_targets["current"]["label"])
        used_naver = naver_count > 0
        used_fnguide = fnguide_count > 0
        status_state = (
            "ok"
            if len(results) == len(target_universe) and len(mapped_universe) == len(target_universe) and not used_naver and not used_fnguide
            else "partial"
        )
        source_parts = ["opendart.fss.or.kr"]
        if used_naver:
            source_parts.append("finance.naver.com")
        if used_fnguide:
            source_parts.append("comp.fnguide.com")
        status_message = f"실적 breadth {len(results)}/{len(target_universe)}종목 반영 · {quarter_targets['current']['label']}"
        if used_naver:
            status_message += f" · 네이버 보완 {naver_count}종목"
        if used_fnguide:
            status_message += f" · FnGuide 보완 {fnguide_count}종목"
        result = CollectorResult(patch, status_entry(status_state, " · ".join(source_parts), status_message))
        save_anchor_component_cache("earnings", result.data_patch, result.status.get("source", ""))
        return result
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError, ET.ParseError, zipfile.BadZipFile) as error:
        naver_result = collect_earnings_from_naver(
            target_universe,
            total_trading_value,
            f"OpenDART 수집 실패 ({error})",
        )
        if naver_result:
            return naver_result
        fnguide_result = collect_earnings_from_fnguide(
            target_universe,
            total_trading_value,
            f"OpenDART 수집 실패 ({error}) · 네이버 기업실적분석 보완 실패",
        )
        if fnguide_result:
            return fnguide_result
        cached_result = build_cached_component_result("earnings", f"실적 breadth 수집 실패 ({error})")
        if cached_result:
            return cached_result
        earnings_available = (base_data.get("earningsCoverageCount") or 0) > 0 or has_value(
            base_data.get("opIncomeBreadth"),
            base_data.get("netIncomeBreadth"),
            base_data.get("turnaroundBreadth"),
            base_data.get("positiveRoeBreadth"),
        )
        if earnings_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"실적 breadth 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        return CollectorResult(build_neutral_earnings_patch(), status_entry("error", "opendart.fss.or.kr", f"실적 breadth 수집 실패 ({error})"))


def compute_moving_average(history: List[Dict[str, Any]], days: int) -> Optional[float]:
    if len(history) < days:
        return None
    window = history[-days:]
    closes = [safe_number(row.get("close")) for row in window]
    if any(close is None for close in closes):
        return None
    return sum(close for close in closes if close is not None) / len(window)


def build_neutral_broadening_patch() -> Dict[str, Any]:
    return {
        "broadeningScore": None,
        "broadeningState": "neutral",
        "supportBreadth20d": None,
        "supportBreadth60d": None,
        "supportPositiveReturnBreadth": None,
    }


def calculate_broadening_data(universe_history: List[Dict[str, Any]], leader_stocks: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not universe_history:
        return {**build_neutral_broadening_patch(), "coverageCount": 0}

    leader_codes = {str(stock.get("code") or "") for stock in leader_stocks}
    support_universe = [
        item
        for item in universe_history
        if str(item.get("code") or "") not in leader_codes and len(item.get("history") or []) >= 60
    ][:FUNDAMENTAL_BROADENING_UNIVERSE_COUNT]

    if not support_universe:
        return {**build_neutral_broadening_patch(), "coverageCount": 0}

    total_trading_value = sum(safe_number(item.get("todayTradingValue")) or 0 for item in support_universe) or 1
    enriched: List[Dict[str, Any]] = []
    for item in support_universe:
        history = item["history"]
        latest = history[-1]
        close_20 = safe_number(history[-21]["close"]) if len(history) >= 21 else None
        latest_close = safe_number(latest.get("close"))
        sma_20 = compute_moving_average(history, 20)
        sma_60 = compute_moving_average(history, 60)
        enriched.append(
            {
                "code": item["code"],
                "name": item["name"],
                "weight": (safe_number(item.get("todayTradingValue")) or 0) / total_trading_value,
                "positiveReturn20d": bool(
                    latest_close is not None and close_20 is not None and close_20 > 0 and ((latest_close / close_20) - 1) * 100 > 0
                ),
                "aboveSma20": bool(latest_close is not None and sma_20 is not None and latest_close > sma_20),
                "aboveSma60": bool(latest_close is not None and sma_60 is not None and latest_close > sma_60),
            }
        )

    support_positive_return_breadth = sum_weighted(enriched, lambda item: bool(item.get("positiveReturn20d")))
    support_breadth_20d = sum_weighted(enriched, lambda item: bool(item.get("aboveSma20")))
    support_breadth_60d = sum_weighted(enriched, lambda item: bool(item.get("aboveSma60")))

    component_scores: List[int] = []
    for value in (support_positive_return_breadth, support_breadth_20d, support_breadth_60d):
        if value is None:
            component_scores.append(5)
        elif value >= 0.6:
            component_scores.append(10)
        elif value >= 0.4:
            component_scores.append(6)
        else:
            component_scores.append(2)

    broadening_score = sum(component_scores)
    if sum(
        1
        for value in (support_positive_return_breadth, support_breadth_20d, support_breadth_60d)
        if value is not None and value >= 0.6
    ) >= 2:
        broadening_state = "validated"
    elif sum(
        1
        for value in (support_positive_return_breadth, support_breadth_20d, support_breadth_60d)
        if value is not None and value >= 0.4
    ) >= 2:
        broadening_state = "supportive"
    else:
        broadening_state = "fragile"

    return {
        "broadeningScore": broadening_score,
        "broadeningState": broadening_state,
        "supportBreadth20d": support_breadth_20d,
        "supportBreadth60d": support_breadth_60d,
        "supportPositiveReturnBreadth": support_positive_return_breadth,
        "coverageCount": len(enriched),
    }


def collect_broadening(
    base_data: Dict[str, Any],
    universes: Optional[Dict[str, Any]] = None,
) -> CollectorResult:
    try:
        universes = universes or {}
        leader_stocks = base_data.get("leaderStocks") if isinstance(base_data.get("leaderStocks"), list) else []
        broadening_data = calculate_broadening_data(
            list(universes.get("broadeningUniverse") or []),
            leader_stocks,
        )
        coverage_count = int(broadening_data.get("coverageCount") or 0)
        if coverage_count <= 0:
            failure_count = int(universes.get("broadeningFailureCount") or 0)
            if failure_count > 0:
                raise ValueError(f"비주도주 차트 시계열 확보 실패 ({failure_count}건)")
            raise ValueError("비주도주 확산 유니버스 부족")

        status_state = "ok"
        target_count = int(universes.get("broadeningTargetCount") or FUNDAMENTAL_BROADENING_UNIVERSE_COUNT)
        if coverage_count < min(target_count, FUNDAMENTAL_BROADENING_UNIVERSE_COUNT):
            status_state = "partial"

        source_parts = [
            part
            for part in (
                universes.get("source"),
                universes.get("historySourceSummary"),
            )
            if part
        ]
        status_message = f"비주도주 확산 {coverage_count}/{target_count}종목 반영"
        yahoo_fallback_count = int(universes.get("broadeningYahooFallbackCount") or 0)
        if yahoo_fallback_count > 0:
            status_message += f" · Yahoo 보완 {yahoo_fallback_count}종목"

        result = CollectorResult(
            {
                "broadeningScore": broadening_data["broadeningScore"],
                "broadeningState": broadening_data["broadeningState"],
                "supportBreadth20d": broadening_data["supportBreadth20d"],
                "supportBreadth60d": broadening_data["supportBreadth60d"],
                "supportPositiveReturnBreadth": broadening_data["supportPositiveReturnBreadth"],
            },
            status_entry(
                status_state,
                " · ".join(source_parts) or universes.get("historyAttemptSourceSummary") or "finance.naver.com/fchart · query1.finance.yahoo.com",
                status_message,
            ),
        )
        save_anchor_component_cache("broadening", result.data_patch, result.status.get("source", ""))
        return result
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        cached_result = build_cached_component_result("broadening", f"확산 수집 실패 ({error})")
        if cached_result:
            return cached_result
        broadening_available = has_value(
            base_data.get("broadeningScore"),
            base_data.get("supportBreadth20d"),
            base_data.get("supportBreadth60d"),
            base_data.get("supportPositiveReturnBreadth"),
        )
        if broadening_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"확산 수집 실패 ({error}) · 기존 스냅샷 유지"),
            )
        universes = universes or {}
        return CollectorResult(
            build_neutral_broadening_patch(),
            status_entry(
                "error",
                universes.get("historyAttemptSourceSummary") or "finance.naver.com/fchart · query1.finance.yahoo.com",
                f"확산 수집 실패 ({error})",
            ),
        )


def derive_export_component(data: Dict[str, Any]) -> Dict[str, Any]:
    export_yoy = safe_number(data.get("exportYoY"))
    export_yoy_delta = safe_number(data.get("exportYoYDelta"))
    export_3m_avg = safe_number(data.get("export3mAvgYoY"))
    has_level = bool(data.get("exportLatestMonth")) or safe_number(data.get("exportValueUsd")) is not None
    if export_yoy is not None and export_yoy > 5 and export_yoy_delta is not None and export_yoy_delta > 0:
        return {"score": 35, "state": "validated"}
    if export_yoy is not None and export_yoy <= 0 and export_yoy_delta is not None and export_yoy_delta < 0:
        return {"score": 10, "state": "fragile"}
    if export_yoy is None and export_3m_avg is None and not has_level:
        return {"score": 17, "state": "neutral"}
    return {"score": 24 if export_yoy is not None or export_3m_avg is not None else 17, "state": "supportive" if export_yoy is not None or export_3m_avg is not None else "neutral"}


def derive_earnings_component(data: Dict[str, Any]) -> Dict[str, Any]:
    coverage = int(data.get("earningsCoverageCount") or 0)
    op_breadth = safe_number(data.get("opIncomeBreadth"))
    net_breadth = safe_number(data.get("netIncomeBreadth"))
    if op_breadth is not None and op_breadth >= 0.6 and net_breadth is not None and net_breadth >= 0.5:
        return {"score": 35, "state": "validated"}
    if (op_breadth is not None and op_breadth >= 0.4) or (net_breadth is not None and net_breadth >= 0.4):
        return {"score": 24, "state": "supportive"}
    if coverage > 0:
        return {"score": 12, "state": "fragile"}
    return {"score": 18, "state": "neutral"}


def calculate_fundamental_anchor_values(data: Dict[str, Any]) -> Dict[str, Any]:
    export_component = derive_export_component(data)
    earnings_component = derive_earnings_component(data)
    broadening_score = safe_number(data.get("broadeningScore"))
    broadening_state = str(data.get("broadeningState") or "neutral")
    if broadening_score is None:
        broadening_score = 15
    total_score = clamp(export_component["score"] + earnings_component["score"] + broadening_score, 0, 100)

    states = [export_component["state"], earnings_component["state"], broadening_state]
    if all(state == "neutral" for state in states):
        anchor_state = "neutral"
    elif total_score >= 70:
        anchor_state = "validated"
    elif total_score >= 45:
        anchor_state = "supportive"
    else:
        anchor_state = "fragile"

    return {
        "fundamentalAnchorScore": total_score,
        "fundamentalAnchorState": anchor_state,
        "fundamentalAnchorReason": (
            f"수출 {round(export_component['score'])}/35 · "
            f"실적 {round(earnings_component['score'])}/35 · "
            f"확산 {round(broadening_score)}/30"
        ),
    }
