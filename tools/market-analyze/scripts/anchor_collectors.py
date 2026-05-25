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
from threading import RLock
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
    normalize_request_error,
    parse_json_text,
    parse_signed_number,
    safe_number,
    status_entry,
    strip_html,
)
from .cycle_policy import calculate_cycle_runtime_values
from .regime_policy import resolve_hot_zone_market_regime, summarize_bubble_overlay


FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT = 12
FUNDAMENTAL_BROADENING_UNIVERSE_COUNT = 20
FUNDAMENTAL_VALUATION_UNIVERSE_COUNT = 30
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
LEADER_PICK_COUNT = 6
LEADER_PRIMARY_HISTORY_LIMIT = 18
LEADER_FALLBACK_HISTORY_LIMIT = 12
LEADER_RECENT_HISTORY_DAYS = 15
LEADER_WYCKOFF_HISTORY_DAYS = 120
WYCKOFF_MIN_HISTORY_DAYS = 30
WYCKOFF_PRICE_WINDOW_DAYS = 120
WYCKOFF_SHORT_FLOW_DAYS = 10
WYCKOFF_MID_FLOW_DAYS = 20
SECTOR_MOMENTUM_TARGET_COUNT = 5
SECTOR_HISTORY_REQUIRED_DAYS = 20
SECTOR_GROUP_URL_CANDIDATES = [
    "https://finance.naver.com/sise/sise_group.naver?type=upjong",
    "https://finance.naver.com/sise/sise_group.naver?type=group",
]
SECTOR_EXCLUDE_REGEX = re.compile(r"(반도체|반도체장비)", re.IGNORECASE)
MARKET_VALUATION_THRESHOLD = 13.0
YAHOO_KOREA_SUFFIXES = ("KS", "KQ")
LEADER_EXCLUDE_REGEX = re.compile(
    r"(ETF|ETN|KODEX|TIGER|KOSEF|ARIRANG|KBSTAR|HANARO|ACE|SOL|RISE|PLUS|TIMEFOLIO|인버스|레버리지)",
    re.IGNORECASE,
)
LEADER_PREFERRED_SUFFIX_REGEX = re.compile(r"\s*\d*우(?:[A-Z]+)?(?:\([^)]*\))?$", re.IGNORECASE)
LEADER_SECTOR_MAX_COUNT = 2
LEADER_WEIGHT_CAP = 0.35
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
EXPORT_SEED_PATH = STORE_DIR / "export_seed.json"
DART_CORP_MAP_CACHE_PATH = CACHE_DIR / "dart_corp_map.json"
DART_CORP_MAP_META_PATH = CACHE_DIR / "dart_corp_map_meta.json"
LEADER_STOCKS_CACHE_PATH = CACHE_DIR / "leader_stocks.json"
LEADER_HISTORY_CACHE_PATH = CACHE_DIR / "leader_history.json"
LEADER_INVESTOR_CACHE_PATH = CACHE_DIR / "leader_investor_series.json"
SECTOR_HISTORY_CACHE_PATH = CACHE_DIR / "sector_history.json"
SECTOR_CANDIDATE_CACHE_PATH = CACHE_DIR / "sector_group_candidates.json"
ANCHOR_COMPONENT_CACHE_PATHS = {
    "export": CACHE_DIR / "anchor_export.json",
    "earnings": CACHE_DIR / "anchor_earnings.json",
    "broadening": CACHE_DIR / "anchor_broadening.json",
    "sectorBreadth": CACHE_DIR / "anchor_sector_breadth.json",
    "valuation": CACHE_DIR / "anchor_valuation.json",
}
CACHE_FILE_LOCK = RLock()
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


def now_local_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def load_cache_file(cache_path: Path) -> Dict[str, Any]:
    with CACHE_FILE_LOCK:
        if not cache_path.exists():
            return {}
        try:
            payload = json.loads(cache_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return {}
        return payload if isinstance(payload, dict) else {}


def save_cache_file(cache_path: Path, payload: Dict[str, Any]) -> None:
    with CACHE_FILE_LOCK:
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        cache_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def get_cache_entry(cache_path: Path, key: str) -> Optional[Dict[str, Any]]:
    payload = load_cache_file(cache_path)
    entry = payload.get(str(key) or "")
    return entry if isinstance(entry, dict) else None


def set_cache_entry(cache_path: Path, key: str, entry: Dict[str, Any]) -> None:
    normalized_key = str(key or "").strip()
    if not normalized_key:
        return
    with CACHE_FILE_LOCK:
        payload = load_cache_file(cache_path)
        payload[normalized_key] = entry
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        cache_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


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
    if component == "sectorBreadth":
        return (patch.get("nonSemiconductorMomentumCoverageCount") or 0) > 0 or has_value(
            patch.get("nonSemiconductorMomentum"),
        )
    if component == "valuation":
        return (patch.get("marketValuationCoverageCount") or 0) > 0 or has_value(
            patch.get("marketValuationForwardPerAvg"),
            patch.get("marketValuationScore"),
        ) or patch.get("marketValuationStability") in {True, False}
    if component == "support":
        return has_value(
            patch.get("fundamentalSupportScore"),
            patch.get("supportOffsetPoints"),
        ) or str(patch.get("fundamentalSupportState") or "") in {"validated", "supportive", "fragile"}
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


def load_export_seed_payload() -> Optional[Dict[str, Any]]:
    if not EXPORT_SEED_PATH.exists():
        return None
    try:
        payload = json.loads(EXPORT_SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    if not isinstance(payload, dict):
        return None
    data_patch = {
        "exportLatestMonth": str(payload.get("exportLatestMonth") or ""),
        "exportValueUsd": safe_number(payload.get("exportValueUsd")),
        "exportYoY": safe_number(payload.get("exportYoY")),
        "exportYoYDelta": safe_number(payload.get("exportYoYDelta")),
        "export3mAvgYoY": safe_number(payload.get("export3mAvgYoY")),
    }
    if not anchor_component_has_values("export", data_patch):
        return None
    return {
        "savedAt": str(payload.get("savedAt") or ""),
        "source": str(payload.get("source") or to_store_relative(EXPORT_SEED_PATH)),
        "dataPatch": data_patch,
    }


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
    if component == "sectorBreadth":
        return {
            "nonSemiconductorMomentum": data.get("nonSemiconductorMomentum"),
            "nonSemiconductorMomentumCoverageCount": data.get("nonSemiconductorMomentumCoverageCount"),
            "nonSemiconductorMomentumPassCount": data.get("nonSemiconductorMomentumPassCount"),
            "nonSemiconductorMomentumProxy": data.get("nonSemiconductorMomentumProxy"),
            "nonSemiconductorMomentumProxyReason": data.get("nonSemiconductorMomentumProxyReason"),
        }
    if component == "valuation":
        return {
            "marketValuationStability": data.get("marketValuationStability"),
            "marketValuationScore": data.get("marketValuationScore"),
            "marketValuationCoverageCount": data.get("marketValuationCoverageCount"),
            "marketValuationForwardPerAvg": data.get("marketValuationForwardPerAvg"),
            "marketValuationThreshold": data.get("marketValuationThreshold"),
            "marketValuationMethod": data.get("marketValuationMethod"),
            "marketValuationProxyCount": data.get("marketValuationProxyCount"),
        }
    if component == "support":
        return {
            "fundamentalSupportScore": data.get("fundamentalSupportScore"),
            "fundamentalSupportState": data.get("fundamentalSupportState"),
            "fundamentalSupportReason": data.get("fundamentalSupportReason"),
            "supportOffsetPoints": data.get("supportOffsetPoints"),
            "marketRegimeKey": data.get("marketRegimeKey"),
            "marketRegimeLabel": data.get("marketRegimeLabel"),
            "marketRegimeReason": data.get("marketRegimeReason"),
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
            if component in {"export", "earnings", "broadening", "sectorBreadth", "valuation", "support"}:
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
    deduped_source_parts = [part for part in dict.fromkeys(part.strip() for part in source_parts if part and str(part).strip())]
    saved_at = str(payload.get("savedAt") or "")
    suffix = f" · {suffix_label} ({saved_at})" if saved_at else f" · {suffix_label}"
    return CollectorResult(
        dict(payload.get("dataPatch") or {}),
        status_entry(
            "partial",
            " · ".join(deduped_source_parts),
            f"{live_error_message}{suffix}",
        ),
    )


def build_export_seed_result(live_error_message: str) -> Optional[CollectorResult]:
    payload = load_export_seed_payload()
    if not payload:
        return None
    saved_at = str(payload.get("savedAt") or "")
    suffix = f" · 기본 수출 시드 사용 ({saved_at})" if saved_at else " · 기본 수출 시드 사용"
    return CollectorResult(
        dict(payload.get("dataPatch") or {}),
        status_entry(
            "partial",
            str(payload.get("source") or to_store_relative(EXPORT_SEED_PATH)),
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


def extract_js_string_array(raw_html: str, variable_name: str) -> List[str]:
    match = re.search(
        rf"var\s+{re.escape(variable_name)}\s*=\s*\[(.*?)\]\s*;",
        raw_html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not match:
        return []
    return [
        token.strip().strip("'\"")
        for token in re.split(r"\s*,\s*", match.group(1).strip())
        if token.strip().strip("'\"")
    ]


def parse_indicator_page_export_data(raw_html: str) -> Dict[str, Any]:
    value_match = re.search(r"현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.\-]+)<\/dd>", raw_html, flags=re.IGNORECASE)
    month_match = re.search(r"기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>", raw_html, flags=re.IGNORECASE)
    latest_month = normalize_month_key(month_match.group(1) if month_match else "")
    if not latest_month:
        month_candidates = extract_js_string_array(raw_html, "vPrdDeArry")
        latest_month = normalize_month_key(month_candidates[-1] if month_candidates else "")
    return {
        "latestMonth": latest_month,
        "exportValueUsd": parse_signed_amount(value_match.group(1) if value_match else ""),
    }


def fetch_indicator_page_export_data() -> Dict[str, Any]:
    html = fetch_text(KOSIS_EXPORT_INDICATOR_URL, timeout=12)
    return parse_indicator_page_export_data(html)


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
        re.compile(
            rf"South Korea.?s exports .*? to ([\d,.\-]+) USD (Million|Billion) in ({MONTH_NAME_REGEX}) "
            rf"from ([\d,.\-]+) USD (Million|Billion) in ({MONTH_NAME_REGEX})(?: of)? (\d{{4}})",
            flags=re.IGNORECASE,
        ),
        re.compile(
            rf"South Korea.?s exports .*? to ([\d,.\-]+) in ({MONTH_NAME_REGEX}) "
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


def count_patch_fields(patch: Optional[Dict[str, Any]]) -> int:
    if not isinstance(patch, dict):
        return 0
    return sum(1 for value in patch.values() if value not in (None, "", []))


def export_patch_has_level(patch: Optional[Dict[str, Any]]) -> bool:
    if not isinstance(patch, dict):
        return False
    return bool(patch.get("exportLatestMonth")) or safe_number(patch.get("exportValueUsd")) is not None


def export_patch_has_core_momentum(patch: Optional[Dict[str, Any]]) -> bool:
    if not isinstance(patch, dict):
        return False
    return (
        bool(patch.get("exportLatestMonth"))
        and safe_number(patch.get("exportYoY")) is not None
        and safe_number(patch.get("exportYoYDelta")) is not None
    )


def load_best_export_result_patch(current_month: str = "") -> Dict[str, Any]:
    best_patch: Dict[str, Any] = {}
    best_score = -1
    for path in sorted(RESULTS_DIR.glob("result-*.js"), key=lambda item: item.name, reverse=True):
        try:
            raw_text = path.read_text(encoding="utf-8")
            trimmed = re.sub(r"^\s*window\.__MARKET_ANALYZE_RESULT__\s*=\s*", "", raw_text, count=1)
            payload = json.loads(trimmed.rstrip(";\n "))
            data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
            patch = extract_anchor_component_patch("export", data)
            if not anchor_component_has_values("export", patch):
                continue
            patch_month = str(patch.get("exportLatestMonth") or "")
            if current_month and patch_month and current_month != patch_month:
                continue
            patch_score = count_patch_fields(patch)
            if patch_score > best_score:
                best_patch = patch
                best_score = patch_score
        except (OSError, json.JSONDecodeError, TypeError):
            continue
    return best_patch


def merge_export_patch_with_cache(patch: Dict[str, Any]) -> Dict[str, Any]:
    current_month = str(patch.get("exportLatestMonth") or "")
    cached_candidates = [
        dict((payload or {}).get("dataPatch") or {}) for payload in [load_anchor_component_cache("export")]
    ]
    result_patch = load_best_export_result_patch(current_month)
    if result_patch:
        cached_candidates.append(result_patch)
    compatible_candidates = []
    for cached_patch in cached_candidates:
        cached_month = str(cached_patch.get("exportLatestMonth") or "")
        if current_month and cached_month and current_month != cached_month:
            continue
        if cached_patch:
            compatible_candidates.append(cached_patch)
    if not compatible_candidates:
        return patch
    cached_patch = max(compatible_candidates, key=count_patch_fields)
    merged = dict(cached_patch)
    for key, value in patch.items():
        if value not in (None, "", []):
            merged[key] = value
    return merged


def merge_export_source_labels(*labels: str) -> str:
    return " · ".join(dict.fromkeys(label.strip() for label in labels if label and label.strip()))


def build_export_partial_reason(patch: Dict[str, Any], fallback_message: str = "최신 발표월/레벨만 반영") -> str:
    labels: List[str] = []
    if export_patch_has_level(patch):
        labels.append("최신 발표월/레벨")
    if safe_number(patch.get("exportYoY")) is not None:
        labels.append("YoY")
    if safe_number(patch.get("exportYoYDelta")) is not None:
        labels.append("가속도")
    if safe_number(patch.get("export3mAvgYoY")) is not None:
        labels.append("3개월 평균")
    if not labels:
        return fallback_message
    return f"공개 소스 기준 {' / '.join(labels)} 반영"


def build_export_status_from_patch(
    patch: Dict[str, Any],
    source: str,
    partial_reason: str = "최신 발표월/레벨만 반영",
) -> Dict[str, str]:
    latest_month = str(patch.get("exportLatestMonth") or "")
    if export_patch_has_core_momentum(patch):
        return status_entry(
            "ok",
            source,
            f"수출 모멘텀 {latest_month} 기준 갱신" if latest_month else "수출 모멘텀 갱신",
        )
    return status_entry("partial", source, partial_reason)


def merge_export_data_patch(primary_patch: Dict[str, Any], secondary_patch: Dict[str, Any]) -> Dict[str, Any]:
    merged = dict(primary_patch or {})
    for key, value in (secondary_patch or {}).items():
        if merged.get(key) in (None, "", []) and value not in (None, "", []):
            merged[key] = value
    return merge_export_patch_with_cache(merged)


def collect_export_from_kosis_openapi(api_key: str, page_data: Optional[Dict[str, Any]] = None) -> CollectorResult:
    page_data = page_data or {}
    raw_text = fetch_text(build_kosis_export_url(api_key), timeout=15)
    payload = parse_kosis_payload(raw_text)
    series = select_best_kosis_export_series(payload)
    momentum = calculate_export_momentum_from_series(series)
    patch = merge_export_patch_with_cache(
        {
            "exportLatestMonth": momentum["latestMonth"] or page_data.get("latestMonth", ""),
            "exportValueUsd": momentum["exportValueUsd"]
            if momentum["exportValueUsd"] is not None
            else page_data.get("exportValueUsd"),
            "exportYoY": momentum["exportYoY"],
            "exportYoYDelta": momentum["exportYoYDelta"],
            "export3mAvgYoY": momentum["export3mAvgYoY"],
        }
    )
    return CollectorResult(
        patch,
        build_export_status_from_patch(patch, "kosis.kr/openapi", "KOSIS 시계열 보강 반영"),
    )


def collect_export_from_tradingeconomics(page_data: Optional[Dict[str, Any]] = None) -> Optional[CollectorResult]:
    try:
        export_data = fetch_tradingeconomics_export_data()
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if page_data and export_patch_has_level(page_data):
            merged_patch = merge_export_patch_with_cache(build_export_patch(page_data.get("latestMonth", ""), page_data.get("exportValueUsd")))
            return CollectorResult(
                merged_patch,
                status_entry(
                    "partial",
                    "kosis.kr",
                    f"KOSIS 공개 페이지 기준 최신 발표월/레벨 반영 · TradingEconomics 보완 실패 ({normalize_request_error(error)})",
                ),
            )
        return None

    patch = merge_export_patch_with_cache(build_export_patch_from_payload(export_data, page_data))
    source = merge_export_source_labels(
        "tradingeconomics.com",
        "kosis.kr" if page_data and export_patch_has_level(page_data) else "",
    )
    result = CollectorResult(
        patch,
        build_export_status_from_patch(patch, source, build_export_partial_reason(patch)),
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

    public_result = collect_export_from_tradingeconomics(page_data)
    if public_result and public_result.status.get("state") == "ok":
        if api_key:
            try:
                kosis_result = collect_export_from_kosis_openapi(api_key, page_data)
                merged = CollectorResult(
                    merge_export_data_patch(public_result.data_patch, kosis_result.data_patch),
                    build_export_status_from_patch(
                        merge_export_data_patch(public_result.data_patch, kosis_result.data_patch),
                        merge_export_source_labels(public_result.status.get("source", ""), kosis_result.status.get("source", "")),
                    ),
                )
                save_anchor_component_cache("export", merged.data_patch, merged.status.get("source", ""))
                return merged
            except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError):
                pass
        return public_result

    if api_key:
        try:
            kosis_result = collect_export_from_kosis_openapi(api_key, page_data)
            if public_result:
                merged_patch = merge_export_data_patch(public_result.data_patch, kosis_result.data_patch)
                merged = CollectorResult(
                    merged_patch,
                    build_export_status_from_patch(
                        merged_patch,
                        merge_export_source_labels(public_result.status.get("source", ""), kosis_result.status.get("source", "")),
                        build_export_partial_reason(merged_patch),
                    ),
                )
                save_anchor_component_cache("export", merged.data_patch, merged.status.get("source", ""))
                return merged
            save_anchor_component_cache("export", kosis_result.data_patch, kosis_result.status.get("source", ""))
            return kosis_result
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError):
            pass

    if public_result:
        return public_result
    if export_patch_has_level(page_data):
        patch = merge_export_patch_with_cache(build_export_patch(page_data.get("latestMonth", ""), page_data.get("exportValueUsd")))
        return CollectorResult(
            patch,
            status_entry("partial", "kosis.kr", "KOSIS 공개 페이지 기준 최신 발표월/레벨 반영"),
        )

    cached_result = build_cached_component_result("export", "공개 수출 소스 수집 실패")
    if cached_result:
        return cached_result
    seed_result = build_export_seed_result("공개 수출 소스 수집 실패")
    if seed_result:
        return seed_result

    export_available = bool(base_data.get("exportLatestMonth")) or has_value(
        base_data.get("exportValueUsd"),
        base_data.get("exportYoY"),
        base_data.get("exportYoYDelta"),
        base_data.get("export3mAvgYoY"),
    )
    if export_available:
        return CollectorResult(
            {},
            status_entry("partial", "store/market_analyze_data.json", "공개 수출 소스 수집 실패 · 기존 스냅샷 유지"),
        )
    return CollectorResult(build_export_patch(), status_entry("error", "tradingeconomics.com · kosis.kr", "공개 수출 소스 수집 실패"))


def dedupe_candidates(candidates: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    deduped: Dict[str, Dict[str, Any]] = {}
    for candidate in candidates:
        code = str(candidate.get("code") or "")
        if not code:
            continue
        previous = deduped.get(code)
        current_value = safe_number(candidate.get("todayTradingValue")) or 0
        previous_value = safe_number(previous.get("todayTradingValue")) if previous else None
        merged = dict(previous or {})
        for key, value in candidate.items():
            if key in {"code", "name", "todayTradingValue"}:
                continue
            if value is not None and value != "":
                merged[key] = value
            elif key not in merged:
                merged[key] = value
        merged["code"] = code
        merged["name"] = str(candidate.get("name") or merged.get("name") or "").strip()
        merged["todayTradingValue"] = current_value if previous is None or current_value > (previous_value or 0) else (previous_value or 0)
        deduped[code] = merged
    return list(deduped.values())


def normalize_leader_issuer_name(name: Any) -> str:
    normalized_name = strip_html(str(name or "")).strip()
    issuer_name = LEADER_PREFERRED_SUFFIX_REGEX.sub("", normalized_name).strip()
    return issuer_name or normalized_name


def get_leader_issuer_key(candidate: Dict[str, Any]) -> str:
    issuer_name = normalize_leader_issuer_name(candidate.get("name"))
    if issuer_name:
        return re.sub(r"\s+", "", issuer_name).upper()
    return str(candidate.get("code") or "").strip()


def is_preferred_leader_candidate(candidate: Dict[str, Any]) -> bool:
    normalized_name = strip_html(str(candidate.get("name") or "")).strip()
    return bool(normalized_name) and normalize_leader_issuer_name(normalized_name) != normalized_name


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
    header_labels: List[str] = []
    rows: List[Dict[str, Any]] = []

    def header_index(label_matchers: Iterable[str]) -> int:
        for index, label in enumerate(header_labels):
            normalized_label = normalize_whitespace(label)
            if any(matcher in normalized_label for matcher in label_matchers):
                return index
        return -1

    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", str(html or ""), flags=re.IGNORECASE):
        cell_objects = parse_html_row_cell_objects(tr_content)
        cell_texts = [cell["text"] for cell in cell_objects]
        if not cell_texts:
            continue
        if "종목명" in cell_texts and any("거래대금" in text for text in cell_texts):
            header_labels = cell_texts
            continue
        if '/item/main.naver?code=' not in tr_content:
            continue

        code_match = re.search(r"/item/main\.naver\?code=([A-Z0-9]+)", tr_content)
        name_match = re.search(r'class="tltle">([^<]+)<', tr_content)
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if not code_match or not name_match or len(td_matches) < 10:
            continue

        trading_value = None
        per_value = None
        roe_value = None

        trading_index = header_index(("거래대금",))
        per_index = header_index(("PER",))
        roe_index = header_index(("ROE",))
        if 0 <= trading_index < len(cell_texts):
            trading_value = parse_signed_number(cell_texts[trading_index])
        if 0 <= per_index < len(cell_texts):
            per_value = parse_signed_number(cell_texts[per_index])
        if 0 <= roe_index < len(cell_texts):
            roe_value = parse_signed_number(cell_texts[roe_index])

        if trading_value is None and len(td_matches) > 7:
            trading_value = parse_signed_number(td_matches[7])
        if per_value is None and len(td_matches) >= 2:
            per_value = parse_signed_number(td_matches[-2])
        if roe_value is None and len(td_matches) >= 1:
            roe_value = parse_signed_number(td_matches[-1])

        if safe_number(trading_value) is None:
            continue

        rows.append(
            {
                "code": code_match.group(1),
                "name": strip_html(name_match.group(1)),
                "todayTradingValue": trading_value,
                "marketSumPer": per_value if is_valid_forward_per(per_value) else None,
                "marketSumRoe": roe_value,
            }
        )

    return rows


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
                "industryCode": str(stock.get("industryCode") or "").strip(),
                "industryPeerCount": int(safe_number(stock.get("industryPeerCount")) or 0),
            }
        )
    return candidates


def dedupe_leader_metrics(items: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    deduped: Dict[str, Dict[str, Any]] = {}
    for item in items:
        code = str(item.get("code") or "")
        if not code:
            continue
        previous = deduped.get(code)
        current_value = safe_number(item.get("cum15dTradingValue")) or 0
        previous_value = safe_number(previous.get("cum15dTradingValue")) if previous else None
        if previous is None or current_value > (previous_value or 0):
            deduped[code] = item
    return list(deduped.values())


def pick_better_leader_item(
    current: Optional[Dict[str, Any]],
    challenger: Optional[Dict[str, Any]],
    value_key: str = "cum15dTradingValue",
) -> Optional[Dict[str, Any]]:
    if current is None:
        return challenger
    if challenger is None:
        return current

    current_preferred = is_preferred_leader_candidate(current)
    challenger_preferred = is_preferred_leader_candidate(challenger)
    if current_preferred != challenger_preferred:
        return current if not current_preferred else challenger

    current_value = safe_number(current.get(value_key)) or 0
    challenger_value = safe_number(challenger.get(value_key)) or 0
    return challenger if challenger_value > current_value else current


def select_leader_stocks_with_issuer_cap(
    items: Iterable[Dict[str, Any]],
    limit: int = LEADER_PICK_COUNT,
) -> List[Dict[str, Any]]:
    per_issuer: Dict[str, Dict[str, Any]] = {}
    for item in items:
        code = str(item.get("code") or "").strip()
        if not code:
            continue
        issuer_key = get_leader_issuer_key(item) or code
        per_issuer[issuer_key] = pick_better_leader_item(
            per_issuer.get(issuer_key),
            item,
            "cum15dTradingValue",
        ) or item
    return sorted(
        per_issuer.values(),
        key=lambda item: safe_number(item.get("cum15dTradingValue")) or 0,
        reverse=True,
    )[:limit]


def get_leader_sector_key(item: Dict[str, Any]) -> str:
    return str(item.get("industryCode") or "").strip()


def select_leader_stocks_with_sector_cap(
    items: Iterable[Dict[str, Any]],
    limit: int = LEADER_PICK_COUNT,
    sector_max_count: int = LEADER_SECTOR_MAX_COUNT,
) -> Dict[str, List[Dict[str, Any]]]:
    selected: List[Dict[str, Any]] = []
    skipped_by_sector: List[Dict[str, Any]] = []
    sector_counts: Dict[str, int] = {}
    sorted_items = sorted(
        items,
        key=lambda item: safe_number(item.get("cum15dTradingValue")) or 0,
        reverse=True,
    )

    for item in sorted_items:
        if len(selected) >= limit:
            break
        sector_key = get_leader_sector_key(item)
        if sector_key:
            next_count = int(sector_counts.get(sector_key) or 0)
            if next_count >= sector_max_count:
                skipped_by_sector.append(item)
                continue
            sector_counts[sector_key] = next_count + 1
        selected.append(item)

    return {"selected": selected, "skippedBySector": skipped_by_sector}


def apply_leader_weight_cap(
    items: Iterable[Dict[str, Any]],
    max_weight: float = LEADER_WEIGHT_CAP,
) -> List[Dict[str, Any]]:
    normalized_items = [dict(item) for item in items]
    total_trading_value = sum(safe_number(item.get("cum15dTradingValue")) or 0 for item in normalized_items)
    if total_trading_value <= 0 or not normalized_items:
        return normalized_items

    for item in normalized_items:
        item["rawWeight"] = (safe_number(item.get("cum15dTradingValue")) or 0) / total_trading_value

    weights: Dict[str, float] = {}
    remaining_items = normalized_items[:]
    remaining_weight = 1.0

    while remaining_items:
        remaining_trading_value = sum(safe_number(item.get("cum15dTradingValue")) or 0 for item in remaining_items)
        if remaining_trading_value <= 0 or remaining_weight <= 0:
            for item in remaining_items:
                weights[str(item.get("code") or "")] = 0.0
            break

        overweight_items = []
        for item in remaining_items:
            provisional_weight = remaining_weight * ((safe_number(item.get("cum15dTradingValue")) or 0) / remaining_trading_value)
            if provisional_weight > max_weight:
                overweight_items.append(item)

        if not overweight_items:
            for item in remaining_items:
                weights[str(item.get("code") or "")] = remaining_weight * (
                    (safe_number(item.get("cum15dTradingValue")) or 0) / remaining_trading_value
                )
            break

        for item in overweight_items:
            weights[str(item.get("code") or "")] = max_weight

        remaining_weight -= len(overweight_items) * max_weight
        overweight_codes = {str(item.get("code") or "") for item in overweight_items}
        remaining_items = [
            item
            for item in remaining_items
            if str(item.get("code") or "") not in overweight_codes
        ]

    normalized_weight_sum = sum(weights.values()) or 1.0
    weighted_items: List[Dict[str, Any]] = []
    for item in normalized_items:
        weight = (weights.get(str(item.get("code") or ""), 0.0)) / normalized_weight_sum
        weighted_items.append(
            {
                **item,
                "weight": weight,
                "weightCapApplied": weight + 1e-9 < (safe_number(item.get("rawWeight")) or 0),
            }
        )
    return weighted_items


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


def format_epoch_date_key(timestamp: Any) -> str:
    timestamp_value = safe_number(timestamp)
    if timestamp_value is None:
        return ""
    try:
        return datetime.utcfromtimestamp(int(timestamp_value)).strftime("%Y%m%d")
    except (OverflowError, OSError, ValueError):
        return ""


def parse_yahoo_leader_history_rows(quote: Dict[str, Any]) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    series = quote.get("ohlcvSeries") if isinstance(quote, dict) else None
    for index, row in enumerate(series or []):
        close_value = safe_number(row.get("close"))
        if close_value is None:
            continue
        open_value = safe_number(row.get("open"))
        high_value = safe_number(row.get("high"))
        low_value = safe_number(row.get("low"))
        volume_value = safe_number(row.get("volume"))
        resolved_open = open_value if open_value is not None else close_value
        resolved_high = high_value if high_value is not None else close_value
        resolved_low = low_value if low_value is not None else close_value
        resolved_volume = volume_value if volume_value is not None else 0.0
        trading_value = ((resolved_open + resolved_high + resolved_low + close_value) / 4) * resolved_volume / 1_000_000
        date_key = format_epoch_date_key(row.get("timestamp")) or f"Y{index:04d}"
        rows.append(
            {
                "dateKey": date_key,
                "open": resolved_open,
                "high": resolved_high,
                "low": resolved_low,
                "close": close_value,
                "volume": resolved_volume,
                "tradingValue": trading_value,
            }
        )
    deduped = {row["dateKey"]: row for row in rows}
    return [deduped[key] for key in sorted(deduped)][-max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS) :]


def load_cached_leader_history(code: str, minimum_days: int = 60) -> Optional[Dict[str, Any]]:
    payload = get_cache_entry(LEADER_HISTORY_CACHE_PATH, code)
    if not payload:
        return None
    history = payload.get("history")
    if not isinstance(history, list) or len(history) < minimum_days:
        return None
    return {
        "history": history[-max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS) :],
        "historySource": to_store_relative(LEADER_HISTORY_CACHE_PATH),
        "historyFallbackReason": str(payload.get("fallbackReason") or ""),
        "historyCachedAt": str(payload.get("savedAt") or ""),
        "historyOriginalSource": str(payload.get("source") or ""),
    }


def save_cached_leader_history(code: str, history: List[Dict[str, Any]], source: str) -> None:
    if not code or len(history) < 10:
        return
    set_cache_entry(
        LEADER_HISTORY_CACHE_PATH,
        code,
        {
            "savedAt": now_local_iso(),
            "source": source,
            "history": history[-max(LEADER_HISTORY_FETCH_COUNT, LEADER_WYCKOFF_HISTORY_DAYS) :],
        },
    )


def load_cached_leader_investor_series(code: str) -> Optional[Dict[str, Any]]:
    payload = get_cache_entry(LEADER_INVESTOR_CACHE_PATH, code)
    if not payload:
        return None
    foreign_net = payload.get("foreignNet") if isinstance(payload.get("foreignNet"), list) else []
    inst_net = payload.get("instNet") if isinstance(payload.get("instNet"), list) else []
    retail_net = payload.get("retailNet") if isinstance(payload.get("retailNet"), list) else []
    if not foreign_net and not inst_net and not retail_net:
        return None
    return {
        "foreignNet": foreign_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
        "instNet": inst_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
        "retailNet": retail_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
        "industryCode": str(payload.get("industryCode") or "").strip(),
        "industryPeerCount": int(safe_number(payload.get("industryPeerCount")) or 0),
        "available": True,
        "reason": "투자자 수급 캐시 사용",
        "source": to_store_relative(LEADER_INVESTOR_CACHE_PATH),
        "cached": True,
    }


def save_cached_leader_investor_series(code: str, payload: Dict[str, Any], source: str) -> None:
    if not code:
        return
    foreign_net = payload.get("foreignNet") if isinstance(payload.get("foreignNet"), list) else []
    inst_net = payload.get("instNet") if isinstance(payload.get("instNet"), list) else []
    retail_net = payload.get("retailNet") if isinstance(payload.get("retailNet"), list) else []
    if not foreign_net and not inst_net and not retail_net:
        return
    set_cache_entry(
        LEADER_INVESTOR_CACHE_PATH,
        code,
        {
            "savedAt": now_local_iso(),
            "source": source,
            "foreignNet": foreign_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
            "instNet": inst_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
            "retailNet": retail_net[-LEADER_WYCKOFF_HISTORY_DAYS:],
            "industryCode": str(payload.get("industryCode") or "").strip(),
            "industryPeerCount": int(safe_number(payload.get("industryPeerCount")) or 0),
        },
    )


def load_cached_sector_history(candidate: Dict[str, Any], minimum_days: int) -> Optional[Dict[str, Any]]:
    cache_key = str(candidate.get("detailUrl") or candidate.get("name") or "")
    payload = get_cache_entry(SECTOR_HISTORY_CACHE_PATH, cache_key)
    if not payload:
        return None
    source = str(payload.get("source") or "").strip().lower()
    if any(marker in source for marker in ("test-source", "mock", "fixture")):
        return None
    history = payload.get("history")
    if not isinstance(history, list) or len(history) < minimum_days:
        return None
    return {
        "history": history[-minimum_days:],
        "historySource": to_store_relative(SECTOR_HISTORY_CACHE_PATH),
        "historyOriginalSource": str(payload.get("source") or ""),
        "historyCachedAt": str(payload.get("savedAt") or ""),
    }


def save_cached_sector_history(candidate: Dict[str, Any], history: List[Dict[str, Any]], source: str) -> None:
    cache_key = str(candidate.get("detailUrl") or candidate.get("name") or "").strip()
    if not cache_key or len(history) < 5:
        return
    set_cache_entry(
        SECTOR_HISTORY_CACHE_PATH,
        cache_key,
        {
            "savedAt": now_local_iso(),
            "source": source,
            "history": history,
        },
    )


def load_cached_sector_group_candidates() -> Optional[Dict[str, Any]]:
    if not SECTOR_CANDIDATE_CACHE_PATH.exists():
        return None
    try:
        payload = json.loads(SECTOR_CANDIDATE_CACHE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None

    rows = payload.get("rows")
    if not isinstance(rows, list):
        return None

    normalized_rows: List[Dict[str, Any]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        name = normalize_whitespace(row.get("name"))
        detail_url = str(row.get("detailUrl") or "").strip()
        if not name or not detail_url:
            continue
        normalized_rows.append(
            {
                "name": name,
                "detailUrl": detail_url,
                "todayTradingValue": safe_number(row.get("todayTradingValue")) or 0,
                "sourceUrl": str(row.get("sourceUrl") or ""),
            }
        )

    if not normalized_rows:
        return None

    return {
        "rows": normalized_rows[:SECTOR_MOMENTUM_TARGET_COUNT],
        "source": to_store_relative(SECTOR_CANDIDATE_CACHE_PATH),
        "originalSource": str(payload.get("source") or ""),
        "savedAt": str(payload.get("savedAt") or ""),
    }


def save_cached_sector_group_candidates(rows: List[Dict[str, Any]], source: str) -> None:
    if not rows:
        return
    normalized_rows = [
        {
            "name": normalize_whitespace(row.get("name")),
            "detailUrl": str(row.get("detailUrl") or "").strip(),
            "todayTradingValue": safe_number(row.get("todayTradingValue")) or 0,
            "sourceUrl": str(row.get("sourceUrl") or ""),
        }
        for row in rows
        if isinstance(row, dict) and normalize_whitespace(row.get("name")) and str(row.get("detailUrl") or "").strip()
    ]
    if not normalized_rows:
        return
    payload = {
        "savedAt": now_local_iso(),
        "source": source,
        "rows": normalized_rows[:SECTOR_MOMENTUM_TARGET_COUNT],
    }
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    SECTOR_CANDIDATE_CACHE_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fetch_yahoo_leader_history(candidate: Dict[str, Any]) -> Dict[str, Any]:
    errors: List[str] = []
    for symbol in create_yahoo_equity_symbols(str(candidate.get("code") or "")):
        try:
            quote = fetch_yahoo_chart(symbol, "1y")
            history = parse_yahoo_leader_history_rows(quote)
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
        payload = {
            "history": history,
            "historySource": "finance.naver.com/fchart",
        }
        save_cached_leader_history(code, history, payload["historySource"])
        return payload
    except Exception as naver_error:  # noqa: BLE001
        try:
            yahoo_payload = fetch_yahoo_leader_history(candidate)
            yahoo_payload["historyFallbackReason"] = str(naver_error)
            save_cached_leader_history(code, yahoo_payload.get("history") or [], yahoo_payload["historySource"])
            return yahoo_payload
        except Exception as yahoo_error:  # noqa: BLE001
            cached_payload = load_cached_leader_history(code, minimum_days=60)
            if cached_payload:
                cached_payload["historyFallbackReason"] = f"Naver: {naver_error}; Yahoo: {yahoo_error}"
                return cached_payload
            raise ValueError(f"{label} 차트 60영업일 확보 실패 (Naver: {naver_error}; Yahoo: {yahoo_error})")


def parse_investor_value(value: Any) -> Optional[float]:
    if isinstance(value, (int, float)):
        return float(value) if math.isfinite(value) else None
    if isinstance(value, str):
        cleaned = value.replace(",", "").strip()
        if not cleaned:
            return None
        parsed = safe_number(cleaned)
        return parsed
    return None


def normalize_investor_key(value: Any) -> str:
    return re.sub(r"[^a-z0-9]", "", str(value or "").lower())


def flatten_investor_entries(value: Any, prefix: str = "") -> List[tuple[str, Any]]:
    if not isinstance(value, dict):
        return []
    entries: List[tuple[str, Any]] = []
    for key, child in value.items():
        next_key = f"{prefix}.{key}" if prefix else str(key)
        if isinstance(child, dict):
            entries.extend(flatten_investor_entries(child, next_key))
        else:
            entries.append((next_key, child))
    return entries


def pick_investor_number(row: Dict[str, Any], keys: Iterable[str], fallback_token_groups: Iterable[Iterable[str]]) -> Optional[float]:
    for key in keys:
        if key in row:
            value = parse_investor_value(row.get(key))
            if value is not None:
                return value

    flattened = flatten_investor_entries(row)
    if not flattened:
        return None

    for raw_key, raw_value in flattened:
        normalized_key = normalize_investor_key(raw_key)
        matched = any(all(token in normalized_key for token in token_group) for token_group in fallback_token_groups)
        if not matched:
            continue
        value = parse_investor_value(raw_value)
        if value is not None:
            return value
    return None


def fetch_leader_investor_series(candidate: Dict[str, Any]) -> Dict[str, Any]:
    code = str(candidate.get("code") or "").strip()
    candidate_industry_code = str(candidate.get("industryCode") or "").strip()
    candidate_industry_peer_count = int(safe_number(candidate.get("industryPeerCount")) or 0)
    try:
        raw_text = fetch_text(
            f"https://m.stock.naver.com/api/stock/{code}/integration",
            timeout=12,
            encodings=("utf-8", "euc-kr"),
        )
        payload = parse_json_text(raw_text, context=f"{code} 투자자 수급")
        deals = payload.get("dealTrendInfos") if isinstance(payload, dict) else []
        industry_code = str(payload.get("industryCode") or candidate_industry_code).strip() if isinstance(payload, dict) else candidate_industry_code
        industry_peer_count = (
            len(payload.get("industryCompareInfo"))
            if isinstance(payload, dict) and isinstance(payload.get("industryCompareInfo"), list)
            else candidate_industry_peer_count
        )
        if not isinstance(deals, list) or not deals:
            raise ValueError("투자자 수급 시계열 없음")

        ordered = list(reversed(deals))[-LEADER_WYCKOFF_HISTORY_DAYS:]
        foreign_net = [
            value
            for value in (
                pick_investor_number(
                    row,
                    ["foreignerPureBuyQuant", "foreignPureBuyQuant", "foreignerNetBuyQuant"],
                    [["foreigner", "buy"], ["foreign", "buy"], ["foreigner", "net"], ["foreign", "net"]],
                )
                for row in ordered
            )
            if value is not None
        ]
        inst_net = [
            value
            for value in (
                pick_investor_number(
                    row,
                    ["organPureBuyQuant", "institutionPureBuyQuant", "organNetBuyQuant"],
                    [["organ", "buy"], ["institution", "buy"], ["organ", "net"], ["institution", "net"]],
                )
                for row in ordered
            )
            if value is not None
        ]
        retail_net = [
            value
            for value in (
                pick_investor_number(
                    row,
                    ["individualPureBuyQuant", "retailPureBuyQuant", "individualNetBuyQuant"],
                    [["individual", "buy"], ["retail", "buy"], ["individual", "net"], ["retail", "net"]],
                )
                for row in ordered
            )
            if value is not None
        ]

        available = bool(foreign_net or inst_net or retail_net)
        result = {
            "foreignNet": foreign_net,
            "instNet": inst_net,
            "retailNet": retail_net,
            "industryCode": industry_code,
            "industryPeerCount": industry_peer_count,
            "available": available,
            "reason": "" if available else "투자자 수급 필드/형식 미확인",
            "source": "m.stock.naver.com/api",
            "cached": False,
        }
        if available:
            save_cached_leader_investor_series(code, result, result["source"])
        return result
    except Exception as error:  # noqa: BLE001
        cached_payload = load_cached_leader_investor_series(code)
        if cached_payload:
            cached_payload["reason"] = f"투자자 수급 라이브 실패 ({normalize_request_error(error)}) · 캐시 사용"
            if not cached_payload.get("industryCode"):
                cached_payload["industryCode"] = candidate_industry_code
            if safe_number(cached_payload.get("industryPeerCount")) is None:
                cached_payload["industryPeerCount"] = candidate_industry_peer_count
            return cached_payload
        return {
            "foreignNet": [],
            "instNet": [],
            "retailNet": [],
            "industryCode": candidate_industry_code,
            "industryPeerCount": candidate_industry_peer_count,
            "available": False,
            "reason": f"투자자 수급 조회 실패 ({normalize_request_error(error)})",
            "source": "m.stock.naver.com/api",
            "cached": False,
        }


def tail(values: List[Any], size: int) -> List[Any]:
    return values[max(0, len(values) - size) :]


def mean(values: Iterable[Any]) -> float:
    normalized = [safe_number(value) or 0 for value in values]
    return (sum(normalized) / len(normalized)) if normalized else 0.0


def stddev(values: Iterable[Any]) -> float:
    normalized = [safe_number(value) or 0 for value in values]
    if len(normalized) < 2:
        return 0.0
    avg = mean(normalized)
    return math.sqrt(mean((value - avg) ** 2 for value in normalized))


def sum_numbers(values: Iterable[Any]) -> float:
    return sum(safe_number(value) or 0 for value in values)


def classify_wyckoff_phase(input_data: Dict[str, Any]) -> Dict[str, Any]:
    ohlcv = input_data.get("ohlcv") if isinstance(input_data.get("ohlcv"), list) else []
    foreign_net = input_data.get("foreignNet") if isinstance(input_data.get("foreignNet"), list) else []
    inst_net = input_data.get("instNet") if isinstance(input_data.get("instNet"), list) else []

    if len(ohlcv) < WYCKOFF_MIN_HISTORY_DAYS:
        return {
            "phase": "NEUTRAL",
            "confidence": 0.3,
            "reason": "와이코프용 시계열 부족 (중립)",
            "candidatePhase": "NEUTRAL",
            "candidateReason": "표본 부족으로 후보 단계 산출 보류",
            "metrics": {},
        }

    window = tail(ohlcv, WYCKOFF_PRICE_WINDOW_DAYS)
    price_window_days = len(window)
    flow_window_days = min(max(len(foreign_net), len(inst_net)), WYCKOFF_PRICE_WINDOW_DAYS)
    closes = [safe_number(row.get("close")) or 0 for row in window]
    highs = [safe_number(row.get("high")) or 0 for row in window]
    lows = [safe_number(row.get("low")) or 0 for row in window]
    volumes = [safe_number(row.get("volume")) or 0 for row in window]

    last = window[-1]
    high_window = max(highs) if highs else 0
    low_candidates = [value for value in lows if value > 0]
    low_window = min(low_candidates) if low_candidates else 0
    drawdown_pct = ((safe_number(last.get("close")) or 0) / high_window - 1) * 100 if high_window > 0 else 0
    range_pct = ((high_window / low_window) - 1) * 100 if low_window > 0 else 0

    vol10_avg = mean(tail(volumes, 10))
    vol30_prev_avg = mean(volumes[-30:-10])
    vol_ratio_10_vs_30 = vol10_avg / vol30_prev_avg if vol30_prev_avg > 0 else 1

    close20_std = stddev(tail(closes, 20))
    close_window_std = stddev(closes)
    volatility_ratio = close20_std / close_window_std if close_window_std > 0 else 1

    high60_recent = max(tail(highs, 5)) if highs else 0
    new_high_breakout = high60_recent >= high_window * 0.999 if high_window > 0 else False

    foreign_cum_window = sum_numbers(tail(foreign_net, flow_window_days or WYCKOFF_PRICE_WINDOW_DAYS))
    inst_cum_window = sum_numbers(tail(inst_net, flow_window_days or WYCKOFF_PRICE_WINDOW_DAYS))
    foreign_cum_10 = sum_numbers(tail(foreign_net, WYCKOFF_SHORT_FLOW_DAYS))
    inst_cum_10 = sum_numbers(tail(inst_net, WYCKOFF_SHORT_FLOW_DAYS))
    foreign_cum_20 = sum_numbers(tail(foreign_net, WYCKOFF_MID_FLOW_DAYS))
    inst_cum_20 = sum_numbers(tail(inst_net, WYCKOFF_MID_FLOW_DAYS))
    smart_cum_window = foreign_cum_window + inst_cum_window
    smart_cum_10 = foreign_cum_10 + inst_cum_10
    smart_cum_20 = foreign_cum_20 + inst_cum_20
    window_label = f"{price_window_days}일"
    flow_label = f"{flow_window_days or price_window_days}일"
    candidate_scores: List[Dict[str, Any]] = []

    if drawdown_pct >= -10 and smart_cum_10 < 0:
        return {
            "phase": "E",
            "confidence": 0.76 if drawdown_pct >= -6 else 0.68,
            "reason": f"{window_label} 고점 부근({drawdown_pct:.1f}%)에서 외인+기관 {WYCKOFF_SHORT_FLOW_DAYS}일 누적 {smart_cum_10:.0f} 분배",
            "candidatePhase": "E",
            "candidateReason": "신고가 부근 분배",
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCum10": smart_cum_10},
        }
    candidate_scores.append(
        {
            "phase": "E",
            "score": clamp((max(0, 10 + drawdown_pct) / 10) * 0.42 + (0.32 if smart_cum_10 < 0 else 0) + (0.1 if vol_ratio_10_vs_30 >= 0.95 else 0), 0, 0.76),
            "reason": f"고점 거리 {drawdown_pct:.1f}% · 최근 {WYCKOFF_SHORT_FLOW_DAYS}일 스마트머니 {smart_cum_10:.0f}",
        }
    )

    near_high_breakout = drawdown_pct >= -6
    if near_high_breakout and smart_cum_10 > 0 and vol_ratio_10_vs_30 >= 0.95:
        return {
            "phase": "D",
            "confidence": 0.78 if new_high_breakout and vol_ratio_10_vs_30 >= 1.05 else 0.66,
            "reason": f"{window_label} 고점 부근 유지 + 외인+기관 {WYCKOFF_SHORT_FLOW_DAYS}일 누적 {smart_cum_10:.0f} + 거래량 {(vol_ratio_10_vs_30 * 100):.0f}%",
            "candidatePhase": "D",
            "candidateReason": "고점 돌파 추세 지속",
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCum10": smart_cum_10},
        }
    candidate_scores.append(
        {
            "phase": "D",
            "score": clamp((0.3 if near_high_breakout else 0) + (0.22 if smart_cum_10 > 0 else 0) + clamp((vol_ratio_10_vs_30 - 0.9) * 0.35, 0, 0.18), 0, 0.76),
            "reason": f"고점 거리 {drawdown_pct:.1f}% · 최근 {WYCKOFF_SHORT_FLOW_DAYS}일 스마트머니 {smart_cum_10:.0f}",
        }
    )

    recovery_rate = (
        clamp(((safe_number(last.get("close")) or 0) - (safe_number(last.get("low")) or 0)) / ((safe_number(last.get("high")) or 0) - (safe_number(last.get("low")) or 0)), 0, 1)
        if (safe_number(last.get("high")) or 0) > (safe_number(last.get("low")) or 0)
        else 1
    )
    low_probe_min = min(tail(lows, 20)) if lows else 0
    probed_and_recovered = (safe_number(last.get("low")) or 0) <= low_probe_min * 1.02 and recovery_rate >= 0.5 if low_probe_min > 0 else False
    today_foreign_net = foreign_net[-1] if foreign_net else 0
    today_inst_net = inst_net[-1] if inst_net else 0
    if probed_and_recovered and volatility_ratio <= 0.8 and (safe_number(today_foreign_net) or 0) + (safe_number(today_inst_net) or 0) >= 0:
        return {
            "phase": "C",
            "confidence": 0.7 if recovery_rate >= 0.6 else 0.6,
            "reason": f"박스권 하단 테스트 후 종가 {(recovery_rate * 100):.0f}% 회복 + 당일 외인·기관 매수 전환",
            "candidatePhase": "C",
            "candidateReason": "Spring 신호",
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCum10": smart_cum_10},
        }
    candidate_scores.append(
        {
            "phase": "C",
            "score": clamp((0.32 if probed_and_recovered else 0) + (0.18 if recovery_rate >= 0.6 else recovery_rate * 0.18) + (0.1 if (safe_number(today_foreign_net) or 0) + (safe_number(today_inst_net) or 0) >= 0 else 0), 0, 0.72),
            "reason": f"회복률 {(recovery_rate * 100):.0f}% · 당일 스마트머니 {((safe_number(today_foreign_net) or 0) + (safe_number(today_inst_net) or 0)):.0f}",
        }
    )

    is_range = volatility_ratio <= 0.92 and -35 <= drawdown_pct <= -5 and range_pct <= 120
    smart_flow_support = smart_cum_window > 0 or smart_cum_20 > 0
    if is_range and smart_flow_support and 0.55 <= vol_ratio_10_vs_30 <= 1.45:
        return {
            "phase": "B",
            "confidence": 0.68 if smart_cum_window > 0 and smart_cum_20 > 0 else 0.6,
            "reason": f"박스권(σ {(volatility_ratio * 100):.0f}%) + 외인+기관 {flow_label} 누적 {smart_cum_window:.0f} + 최근 {WYCKOFF_MID_FLOW_DAYS}일 {smart_cum_20:.0f}",
            "candidatePhase": "B",
            "candidateReason": "매집 박스권",
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCumWindow": smart_cum_window, "smartCum20": smart_cum_20},
        }
    candidate_scores.append(
        {
            "phase": "B",
            "score": clamp((0.32 if is_range else 0) + (0.18 if smart_cum_window > 0 else 0) + (0.12 if smart_cum_20 > 0 else 0) + (0.1 if 0.55 <= vol_ratio_10_vs_30 <= 1.45 else 0), 0, 0.76),
            "reason": f"박스권 {'유사' if is_range else '아님'} · {flow_label} 스마트머니 {smart_cum_window:.0f}",
        }
    )

    deep_drawdown = drawdown_pct <= -12
    volume_dried = vol_ratio_10_vs_30 <= 0.85
    expected_foreign_10 = foreign_cum_window * (WYCKOFF_SHORT_FLOW_DAYS / flow_window_days) if flow_window_days > 0 else 0
    foreign_turning = foreign_cum_window <= 0 and foreign_cum_10 >= expected_foreign_10 * 0.5
    if deep_drawdown and volume_dried and foreign_turning:
        return {
            "phase": "A",
            "confidence": 0.62 if drawdown_pct <= -20 and vol_ratio_10_vs_30 <= 0.7 else 0.54,
            "reason": f"{window_label} 고점 대비 {drawdown_pct:.1f}% + 거래량 {(vol_ratio_10_vs_30 * 100):.0f}% + 외인 매도 수렴",
            "candidatePhase": "A",
            "candidateReason": "하락 정지 초기",
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window},
        }
    candidate_scores.append(
        {
            "phase": "A",
            "score": clamp((0.34 if deep_drawdown else 0) + (0.18 if volume_dried else 0) + (0.18 if foreign_turning else 0), 0, 0.76),
            "reason": f"낙폭 {drawdown_pct:.1f}% · 거래량 {(vol_ratio_10_vs_30 * 100):.0f}%",
        }
    )

    best_candidate = sorted(candidate_scores, key=lambda item: item.get("score") or 0, reverse=True)[0] if candidate_scores else {"phase": "NEUTRAL", "score": 0.25, "reason": "우세한 후보 단계 없음"}
    neutral_signals = [
        "스마트머니 우세" if smart_cum_window > 0 else ("단기 수급 개선" if smart_cum_20 > 0 else "스마트머니 혼조/이탈"),
        "박스권 유사" if is_range else "추세 구조 우세",
        "거래량 수축" if vol_ratio_10_vs_30 <= 0.7 else ("거래량 확대" if vol_ratio_10_vs_30 >= 1.1 else "거래량 중립"),
    ]
    if best_candidate.get("phase") != "NEUTRAL" and (best_candidate.get("score") or 0) >= 0.48:
        return {
            "phase": best_candidate["phase"],
            "confidence": clamp(best_candidate["score"], 0.45, 0.62),
            "reason": f"후보 구조 우세 ({' · '.join(neutral_signals)})",
            "candidatePhase": best_candidate["phase"],
            "candidateReason": best_candidate["reason"],
            "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCum10": smart_cum_10, "smartCum20": smart_cum_20},
        }

    return {
        "phase": "NEUTRAL",
        "confidence": max(0.3, min(0.45, best_candidate.get("score") or 0)),
        "reason": f"명확한 와이코프 단계 패턴 없음 ({' · '.join(neutral_signals)})",
        "candidatePhase": best_candidate.get("phase") or "NEUTRAL",
        "candidateReason": best_candidate.get("reason") or "우세한 후보 단계 없음",
        "metrics": {"foreignCumWindow": foreign_cum_window, "instCumWindow": inst_cum_window, "smartCum10": smart_cum_10, "smartCum20": smart_cum_20},
    }


def compute_shock_metrics(history: List[Dict[str, Any]]) -> Dict[str, Optional[float]]:
    rolling_high = 0.0
    shock_start = max(0, len(history) - 5)
    for index, row in enumerate(history):
        rolling_high = max(rolling_high, safe_number(row.get("high")) or 0)
        close_value = safe_number(row.get("close")) or 0
        row["drawdownFromPeakPct"] = ((close_value / rolling_high) - 1) * 100 if rolling_high > 0 else 0

    for index in range(shock_start, len(history)):
        current = history[index]
        previous = history[index - 1] if index > 0 else None
        previous_close = safe_number(previous.get("close")) if isinstance(previous, dict) else None
        current_close = safe_number(current.get("close"))
        day_return_pct = ((current_close / previous_close) - 1) * 100 if current_close is not None and previous_close and previous_close > 0 else 0
        if day_return_pct <= -6 or (safe_number(current.get("drawdownFromPeakPct")) or 0) <= -5:
            prior_window = history[max(0, index - 5) : index]
            baseline = mean((row.get("tradingValue") for row in prior_window)) if prior_window else None
            high_value = safe_number(current.get("high"))
            low_value = safe_number(current.get("low"))
            recovery_rate = (
                clamp(((current_close or 0) - (low_value or 0)) / ((high_value or 0) - (low_value or 0)), 0, 1)
                if high_value is not None and low_value is not None and high_value > low_value
                else 1
            )
            return {
                "shockDate": str(current.get("dateKey") or ""),
                "shockValueRatio": ((safe_number(current.get("tradingValue")) or 0) / baseline) if baseline and baseline > 0 else None,
                "closeRecoveryRate": recovery_rate,
            }
    return {"shockDate": None, "shockValueRatio": None, "closeRecoveryRate": None}


def compute_three_day_metrics(history: List[Dict[str, Any]]) -> Dict[str, Optional[float]]:
    if len(history) < 6:
        return {"threeDayDropPct": None, "threeDayValueRatio": None}
    last_three = history[-3:]
    if not all((safe_number(row.get("close")) or 0) < (safe_number(row.get("open")) or 0) for row in last_three):
        return {"threeDayDropPct": None, "threeDayValueRatio": None}
    previous_three = history[-6:-3]
    start_price = safe_number(previous_three[-1].get("close")) if previous_three else safe_number(last_three[0].get("open"))
    value_base = sum_numbers(row.get("tradingValue") for row in previous_three)
    value_current = sum_numbers(row.get("tradingValue") for row in last_three)
    last_close = safe_number(last_three[-1].get("close"))
    return {
        "threeDayDropPct": ((last_close / start_price) - 1) * 100 if last_close is not None and start_price and start_price > 0 else None,
        "threeDayValueRatio": (value_current / value_base) if value_base > 0 else None,
    }


def compute_leader_metrics(candidate: Dict[str, Any], full_history: List[Dict[str, Any]], investor_series: Dict[str, Any]) -> Dict[str, Any]:
    recent_history = full_history[-LEADER_RECENT_HISTORY_DAYS:]
    wyckoff_history = full_history[-LEADER_WYCKOFF_HISTORY_DAYS:]
    latest = recent_history[-1]
    previous = recent_history[-2] if len(recent_history) >= 2 else None
    highest_high = max((safe_number(row.get("high")) or 0 for row in recent_history), default=0)
    shock_metrics = compute_shock_metrics(recent_history)
    three_day_metrics = compute_three_day_metrics(recent_history)

    foreign_net = investor_series.get("foreignNet") if isinstance(investor_series.get("foreignNet"), list) else []
    inst_net = investor_series.get("instNet") if isinstance(investor_series.get("instNet"), list) else []
    has_investor_series = investor_series.get("available") is not False and bool(foreign_net or inst_net)
    investor_series_count = max(len(foreign_net), len(inst_net))
    industry_peer_count = safe_number(investor_series.get("industryPeerCount"))
    if industry_peer_count is None:
        industry_peer_count = safe_number(candidate.get("industryPeerCount"))
    foreign_cum_wyckoff = sum_numbers(foreign_net[-LEADER_WYCKOFF_HISTORY_DAYS:]) if has_investor_series and foreign_net else None
    inst_cum_wyckoff = sum_numbers(inst_net[-LEADER_WYCKOFF_HISTORY_DAYS:]) if has_investor_series and inst_net else None

    wyckoff = {"phase": "NEUTRAL", "confidence": 0, "reason": "데이터 부족", "candidatePhase": "NEUTRAL", "candidateReason": ""}
    if len(wyckoff_history) >= 10:
        wyckoff = classify_wyckoff_phase({"ohlcv": wyckoff_history, "foreignNet": foreign_net, "instNet": inst_net})

    latest_close = safe_number(latest.get("close"))
    previous_close = safe_number(previous.get("close")) if previous else None
    return {
        "code": candidate.get("code"),
        "name": candidate.get("name"),
        "weight": 0,
        "todayTradingValue": candidate.get("todayTradingValue"),
        "history15dCount": len(recent_history),
        "historyWyckoffCount": len(wyckoff_history),
        "cum15dTradingValue": sum_numbers(row.get("tradingValue") for row in recent_history),
        "dayReturnPct": ((latest_close / previous_close) - 1) * 100 if latest_close is not None and previous_close and previous_close > 0 else None,
        "drawdown15dPct": ((latest_close / highest_high) - 1) * 100 if latest_close is not None and highest_high > 0 else None,
        "shockValueRatio": shock_metrics.get("shockValueRatio"),
        "threeDayDropPct": three_day_metrics.get("threeDayDropPct"),
        "threeDayValueRatio": three_day_metrics.get("threeDayValueRatio"),
        "closeRecoveryRate": shock_metrics.get("closeRecoveryRate"),
        "shockDate": shock_metrics.get("shockDate"),
        "latestDate": latest.get("dateKey"),
        "investorSeriesCount": investor_series_count,
        "industryCode": str(investor_series.get("industryCode") or candidate.get("industryCode") or "").strip(),
        "industryPeerCount": int(industry_peer_count or 0),
        "foreignNetCumWyckoff": foreign_cum_wyckoff,
        "instNetCumWyckoff": inst_cum_wyckoff,
        "smartCumWyckoff": (foreign_cum_wyckoff + inst_cum_wyckoff) if foreign_cum_wyckoff is not None and inst_cum_wyckoff is not None else None,
        "investorSeriesAvailable": has_investor_series,
        "investorSeriesReason": investor_series.get("reason") or "",
        "history60dCount": len(wyckoff_history),
        "foreignNetCum60d": foreign_cum_wyckoff,
        "instNetCum60d": inst_cum_wyckoff,
        "smartCum60d": (foreign_cum_wyckoff + inst_cum_wyckoff) if foreign_cum_wyckoff is not None and inst_cum_wyckoff is not None else None,
        "wyckoffPhase": wyckoff.get("phase") or "NEUTRAL",
        "wyckoffConfidence": wyckoff.get("confidence") or 0,
        "wyckoffReason": wyckoff.get("reason") or "",
        "wyckoffCandidatePhase": wyckoff.get("candidatePhase") or "NEUTRAL",
        "wyckoffCandidateReason": wyckoff.get("candidateReason") or "",
        "historySource": "",
        "investorSource": investor_series.get("source") or "",
    }


def build_leader_history_universe(candidates: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    filtered = sorted(
        [candidate for candidate in candidates if not is_leader_excluded(candidate)],
        key=lambda item: safe_number(item.get("todayTradingValue")) or 0,
        reverse=True,
    )
    primary = filtered[: min(LEADER_PRIMARY_HISTORY_LIMIT, len(filtered))]
    primary_codes = {str(candidate.get("code") or "") for candidate in primary}
    fallback = [
        candidate
        for candidate in create_static_fallback_candidates()
        if not is_leader_excluded(candidate) and str(candidate.get("code") or "") not in primary_codes
    ][:LEADER_FALLBACK_HISTORY_LIMIT]
    return {"filtered": filtered, "primary": primary, "fallback": fallback}


def collect_leader_metrics(candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    if not candidates:
        return []

    collected: List[Dict[str, Any]] = []
    with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(candidates))) as executor:
        future_map = {
            executor.submit(
                lambda current: (
                    fetch_leader_history(current),
                    fetch_leader_investor_series(current),
                ),
                candidate,
            ): candidate
            for candidate in candidates
        }
        for future in as_completed(future_map):
            candidate = future_map[future]
            try:
                history_payload, investor_payload = future.result()
                metrics = compute_leader_metrics(candidate, history_payload.get("history") or [], investor_payload)
                metrics["historySource"] = history_payload.get("historySource") or ""
                collected.append(metrics)
            except Exception:
                continue
    return collected


def load_cached_leader_stocks() -> Optional[Dict[str, Any]]:
    if not LEADER_STOCKS_CACHE_PATH.exists():
        return None
    try:
        payload = json.loads(LEADER_STOCKS_CACHE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    data_patch = payload.get("dataPatch")
    if not isinstance(data_patch, dict) or not data_patch.get("leaderStocks"):
        return None
    return payload


def save_cached_leader_stocks(data_patch: Dict[str, Any], source: str = "") -> None:
    if not data_patch.get("leaderStocks"):
        return
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    LEADER_STOCKS_CACHE_PATH.write_text(
        json.dumps(
            {
                "savedAt": now_local_iso(),
                "source": source,
                "dataPatch": data_patch,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def collect_leader_stocks(base_data: Dict[str, Any]) -> CollectorResult:
    gathered: List[Dict[str, Any]] = []
    sources: List[str] = []

    try:
        quant_candidates = fetch_quant_candidates()
        if quant_candidates:
            gathered.extend(quant_candidates)
            sources.append("finance.naver.com/sise_quant")
    except Exception:
        pass

    if len(gathered) < LEADER_SCREEN_LIMIT:
        try:
            market_sum_candidates = fetch_market_sum_candidates()
            if market_sum_candidates:
                gathered.extend(market_sum_candidates)
                sources.append("finance.naver.com/sise_market_sum")
        except Exception:
            pass

    snapshot_candidates = create_snapshot_fallback_candidates(base_data)
    if snapshot_candidates:
        gathered.extend(snapshot_candidates)
        sources.append("store/market_analyze_data.json")

    if len(dedupe_candidates(gathered)) < LEADER_PICK_COUNT:
        gathered.extend(create_static_fallback_candidates())
        sources.append("static_fallback")

    candidates = dedupe_candidates(gathered)
    universe = build_leader_history_universe(candidates)
    primary_metrics = collect_leader_metrics(universe["primary"])
    metrics = primary_metrics

    if len(metrics) < LEADER_PICK_COUNT and universe["fallback"]:
        metrics = dedupe_leader_metrics(metrics + collect_leader_metrics(universe["fallback"]))

    issuer_selected = select_leader_stocks_with_issuer_cap(metrics, LEADER_PICK_COUNT * 2)
    sector_selection = select_leader_stocks_with_sector_cap(
        issuer_selected,
        LEADER_PICK_COUNT,
        LEADER_SECTOR_MAX_COUNT,
    )
    leader_stocks = apply_leader_weight_cap(sector_selection["selected"], LEADER_WEIGHT_CAP)
    if leader_stocks:
        leader_snapshot_date = sorted(str(stock.get("latestDate") or "") for stock in leader_stocks if stock.get("latestDate"))[-1] if any(stock.get("latestDate") for stock in leader_stocks) else ""
        yahoo_count = sum(1 for stock in leader_stocks if str(stock.get("historySource") or "").startswith("query1.finance.yahoo.com"))
        cached_history_count = sum(1 for stock in leader_stocks if str(stock.get("historySource") or "").startswith("store/cache/leader_history.json"))
        cached_investor_count = sum(1 for stock in leader_stocks if str(stock.get("investorSource") or "").startswith("store/cache/leader_investor_series.json"))
        investor_missing_count = sum(1 for stock in leader_stocks if not stock.get("investorSeriesAvailable"))
        partial_reasons = yahoo_count > 0 or cached_history_count > 0 or cached_investor_count > 0 or investor_missing_count > 0 or len(leader_stocks) < LEADER_PICK_COUNT
        status_message = f"대표주 {len(leader_stocks)}/{LEADER_PICK_COUNT}종목 갱신"
        issuer_deduped_count = max(0, len(metrics) - len(issuer_selected))
        sector_deduped_count = len(sector_selection["skippedBySector"])
        weight_capped_count = sum(1 for stock in leader_stocks if stock.get("weightCapApplied"))
        if issuer_deduped_count > 0:
            status_message += f" · issuer 중복 제거 {issuer_deduped_count}건"
        if sector_deduped_count > 0:
            status_message += f" · 업종 cap 적용 {sector_deduped_count}건"
        if weight_capped_count > 0:
            status_message += f" · weight cap {int(LEADER_WEIGHT_CAP * 100)}% 적용 {weight_capped_count}건"
        if yahoo_count > 0:
            status_message += f" · Yahoo 차트 보완 {yahoo_count}종목"
        if cached_history_count > 0:
            status_message += f" · 차트 캐시 보완 {cached_history_count}종목"
        if cached_investor_count > 0:
            status_message += f" · 수급 캐시 보완 {cached_investor_count}종목"
        if investor_missing_count > 0:
            status_message += f" · 투자자 수급 미연동 {investor_missing_count}종목"
        if len(metrics) < len(universe["primary"]):
            status_message += f" · 1차 확보 {len(metrics)}건"

        source_parts = list(dict.fromkeys(
            [part for part in sources if part]
            + [str(stock.get("historySource") or "") for stock in leader_stocks if stock.get("historySource")]
            + [str(stock.get("investorSource") or "") for stock in leader_stocks if stock.get("investorSource")]
        ))
        data_patch = {
            "leaderSnapshotDate": leader_snapshot_date,
            "leaderStocks": leader_stocks,
            "leaderSelectionMeta": {
                "issuerDedupedCount": issuer_deduped_count,
                "sectorDedupedCount": sector_deduped_count,
                "weightCappedCount": weight_capped_count,
                "weightCap": LEADER_WEIGHT_CAP,
                "sectorMaxCount": LEADER_SECTOR_MAX_COUNT,
            },
        }
        save_cached_leader_stocks(data_patch, " · ".join(source_parts))
        return CollectorResult(
            data_patch,
            status_entry("partial" if partial_reasons else "ok", " · ".join(source_parts), status_message),
        )

    cached_payload = load_cached_leader_stocks()
    if cached_payload:
        saved_at = str(cached_payload.get("savedAt") or "")
        suffix = f" · 최근 성공 캐시 사용 ({saved_at})" if saved_at else " · 최근 성공 캐시 사용"
        return CollectorResult(
            dict(cached_payload.get("dataPatch") or {}),
            status_entry(
                "partial",
                " · ".join(part for part in [to_store_relative(LEADER_STOCKS_CACHE_PATH), str(cached_payload.get("source") or "")] if part),
                f"대표주 수집 실패{suffix}",
            ),
        )

    if base_data.get("leaderStocks"):
        return CollectorResult(
            {},
            status_entry("partial", "store/market_analyze_data.json", "대표주 수집 실패 · 기존 스냅샷 유지"),
        )

    return CollectorResult({"leaderSnapshotDate": "", "leaderStocks": []}, status_entry("error", "finance.naver.com", "대표주 수집 실패"))


def build_anchor_universes(base_data: Dict[str, Any]) -> Dict[str, Any]:
    gathered: List[Dict[str, Any]] = []
    sources: List[str] = []
    history_source_counts: Dict[str, int] = {}

    try:
        quant_candidates = fetch_quant_candidates()
        if quant_candidates:
            gathered.extend(quant_candidates)
            sources.append("finance.naver.com/sise_quant")
    except Exception:
        pass

    if len(gathered) < LEADER_SCREEN_LIMIT:
        try:
            market_sum_candidates = fetch_market_sum_candidates()
            if market_sum_candidates:
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
    valuation_universe = filtered[:FUNDAMENTAL_VALUATION_UNIVERSE_COUNT]
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
        "valuationUniverse": valuation_universe,
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


def create_sector_history_page_url(detail_url: str, page: int) -> str:
    separator = "&" if "?" in detail_url else "?"
    return f"{detail_url}{separator}page={page}"


def parse_sector_group_rows(raw_html: str, source_url: str) -> List[Dict[str, Any]]:
    header_labels: List[str] = []
    rows: List[Dict[str, Any]] = []

    for row_html in re.findall(r"<tr[^>]*>[\s\S]*?<\/tr>", str(raw_html or ""), flags=re.IGNORECASE):
        cells = parse_html_row_cell_objects(row_html)
        cell_texts = [cell["text"] for cell in cells]
        if not cell_texts:
            continue
        if "업종명" in cell_texts and any("거래대금" in text for text in cell_texts):
            header_labels = cell_texts
            continue
        if "sise_group_detail.naver" not in row_html:
            continue

        link_match = re.search(r'href=["\']([^"\']*sise_group_detail\.naver\?[^"\']+)["\']', row_html, flags=re.IGNORECASE)
        if not link_match:
            continue
        detail_href = html.unescape(link_match.group(1))
        detail_url = detail_href if detail_href.startswith("http") else f"https://finance.naver.com{detail_href}"
        name_match = re.search(r"<a[^>]*href=[\"\'][^\"\']*sise_group_detail\.naver\?[^\"\']+[\"\'][^>]*>([\s\S]*?)<\/a>", row_html, flags=re.IGNORECASE)
        name = normalize_whitespace(strip_html(name_match.group(1))) if name_match else ""
        if not name or SECTOR_EXCLUDE_REGEX.search(name):
            continue

        trading_value = None
        if header_labels:
            try:
                trading_index = next(index for index, label in enumerate(header_labels) if "거래대금" in label)
            except StopIteration:
                trading_index = -1
            if trading_index >= 0 and trading_index < len(cell_texts):
                trading_value = parse_signed_amount(cell_texts[trading_index])
        if trading_value is None:
            numeric_candidates = [parse_signed_amount(text) for text in cell_texts if parse_signed_amount(text) is not None]
            trading_value = max(numeric_candidates) if numeric_candidates else None

        rows.append(
            {
                "name": name,
                "detailUrl": detail_url,
                "todayTradingValue": trading_value or 0,
                "sourceUrl": source_url,
            }
        )

    deduped: Dict[str, Dict[str, Any]] = {}
    for row in rows:
        previous = deduped.get(row["name"])
        if previous is None or (safe_number(row.get("todayTradingValue")) or 0) > (safe_number(previous.get("todayTradingValue")) or 0):
            deduped[row["name"]] = row
    return sorted(deduped.values(), key=lambda item: safe_number(item.get("todayTradingValue")) or 0, reverse=True)


def fetch_sector_group_candidates() -> Dict[str, Any]:
    last_error: Optional[Exception] = None
    for source_url in SECTOR_GROUP_URL_CANDIDATES:
        try:
            html_text = fetch_text(source_url, timeout=12, encodings=("euc-kr", "utf-8"))
            rows = parse_sector_group_rows(html_text, source_url)
            if rows:
                save_cached_sector_group_candidates(rows, source_url)
                return {
                    "rows": rows[:SECTOR_MOMENTUM_TARGET_COUNT],
                    "source": source_url,
                }
            last_error = ValueError("업종 행 파싱 실패")
        except Exception as error:  # noqa: BLE001
            last_error = error
            continue
    cached_payload = load_cached_sector_group_candidates()
    if cached_payload:
        cached_payload["fallbackReason"] = str(last_error or "")
        return cached_payload
    raise ValueError(f"업종 페이지 수집 실패 ({last_error})")


def parse_sector_history_rows(raw_html: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for row_html in re.findall(r"<tr[^>]*>[\s\S]*?<\/tr>", str(raw_html or ""), flags=re.IGNORECASE):
        cell_texts = [cell["text"] for cell in parse_html_row_cells(row_html) if cell.get("text")]
        if len(cell_texts) < 2:
            continue
        date_key = normalize_date_key(cell_texts[0])
        if not date_key:
            continue
        numeric_values = [parse_signed_amount(text) for text in cell_texts[1:]]
        numeric_values = [value for value in numeric_values if value is not None]
        if not numeric_values:
            continue
        rows.append({"dateKey": date_key, "close": numeric_values[0]})

    deduped = {row["dateKey"]: row for row in rows}
    return [deduped[key] for key in sorted(deduped)]


def fetch_sector_history(candidate: Dict[str, Any], days: int = SECTOR_HISTORY_REQUIRED_DAYS) -> Dict[str, Any]:
    detail_url = str(candidate.get("detailUrl") or "")
    if not detail_url:
        raise ValueError("업종 상세 링크 없음")

    history_rows: List[Dict[str, Any]] = []
    try:
        for page in range(1, 7):
            page_html = fetch_text(create_sector_history_page_url(detail_url, page), timeout=12, encodings=("euc-kr", "utf-8"))
            parsed_rows = parse_sector_history_rows(page_html)
            if not parsed_rows:
                continue
            history_rows.extend(parsed_rows)
            deduped = {row["dateKey"]: row for row in history_rows}
            history_rows = [deduped[key] for key in sorted(deduped)]
            if len(history_rows) >= days + 1:
                break

        if len(history_rows) < days + 1:
            raise ValueError(f"업종 일봉 {days + 1}영업일 부족 ({len(history_rows)}건)")
        history_rows = history_rows[-(days + 1) :]
        save_cached_sector_history(candidate, history_rows, detail_url)
        return {
            "history": history_rows,
            "historySource": detail_url,
        }
    except Exception as live_error:  # noqa: BLE001
        cached_payload = load_cached_sector_history(candidate, minimum_days=days + 1)
        if cached_payload:
            cached_payload["historyFallbackReason"] = str(live_error)
            return cached_payload
        raise


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


def build_neutral_sector_breadth_patch() -> Dict[str, Any]:
    return {
        "nonSemiconductorMomentum": None,
        "nonSemiconductorMomentumCoverageCount": 0,
        "nonSemiconductorMomentumPassCount": 0,
        "nonSemiconductorMomentumProxy": False,
        "nonSemiconductorMomentumProxyReason": "",
    }


def build_sector_breadth_proxy_patch(base_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    positive_return_breadth = safe_number(base_data.get("supportPositiveReturnBreadth"))
    above_sma20_breadth = safe_number(base_data.get("supportBreadth20d"))
    proxy_inputs = [value for value in (positive_return_breadth, above_sma20_breadth) if value is not None]
    if len(proxy_inputs) < 2:
        return None

    proxy_momentum = clamp((sum(proxy_inputs) / len(proxy_inputs)) * 100, 0, 100)
    return {
        "nonSemiconductorMomentum": proxy_momentum,
        "nonSemiconductorMomentumCoverageCount": 0,
        "nonSemiconductorMomentumPassCount": 0,
        "nonSemiconductorMomentumProxy": True,
        "nonSemiconductorMomentumProxyReason": "비주도주 20일 수익률/20일선 breadth 기반 업종 프록시",
    }


def build_neutral_valuation_patch() -> Dict[str, Any]:
    return {
        "marketValuationStability": None,
        "marketValuationScore": None,
        "marketValuationCoverageCount": 0,
        "marketValuationForwardPerAvg": None,
        "marketValuationThreshold": MARKET_VALUATION_THRESHOLD,
        "marketValuationMethod": "forward",
        "marketValuationProxyCount": 0,
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


def parse_html_row_cell_objects(table_row_html: str) -> List[Dict[str, Any]]:
    cells: List[Dict[str, Any]] = []
    for match in re.finditer(r"<t([hd])([^>]*)>([\s\S]*?)<\/t[hd]>", table_row_html, flags=re.IGNORECASE):
        attrs = match.group(2)
        inner_html = match.group(3)
        colspan_match = re.search(r"colspan=['\"]?(\d+)", attrs, flags=re.IGNORECASE)
        cells.append(
            {
                "text": normalize_whitespace(strip_html(inner_html)),
                "html": inner_html,
                "attrs": attrs,
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


def is_valid_forward_per(value: Optional[float]) -> bool:
    return value is not None and 0 < value <= 100


def extract_naver_forward_per_from_text(raw_html: str) -> Optional[float]:
    text = html_to_compact_text(raw_html)
    patterns = [
        re.compile(r"(?:Fwd|Forward)\s*12M\s*PER[^0-9\-]{0,12}(-?\d+(?:\.\d+)?)", flags=re.IGNORECASE),
        re.compile(r"선행\s*PER[^0-9\-]{0,12}(-?\d+(?:\.\d+)?)", flags=re.IGNORECASE),
        re.compile(r"Fwd\s*PER[^0-9\-]{0,12}(-?\d+(?:\.\d+)?)", flags=re.IGNORECASE),
    ]
    for pattern in patterns:
        match = pattern.search(text)
        if not match:
            continue
        value = parse_signed_amount(match.group(1))
        if is_valid_forward_per(value):
            return value
    return None


def extract_forward_per_from_table_row(row: List[str], header_labels: List[str]) -> Optional[float]:
    if not row:
        return None
    values = normalize_metric_row_cells(row, len(header_labels))
    estimate_pairs = list(zip(header_labels, values))
    for label, value_text in reversed(estimate_pairs):
        if "(E)" not in label:
            continue
        value = parse_numeric_cell(value_text)
        if is_valid_forward_per(value):
            return value
    for _label, value_text in reversed(estimate_pairs):
        value = parse_numeric_cell(value_text)
        if is_valid_forward_per(value):
            return value
    return None


def extract_naver_forward_per(raw_html: str) -> Optional[float]:
    direct_value = extract_naver_forward_per_from_text(raw_html)
    if is_valid_forward_per(direct_value):
        return direct_value

    try:
        table_html = extract_naver_financial_table(raw_html)
    except ValueError:
        return None

    header_labels = extract_naver_header_labels(table_html)
    if not header_labels:
        return None

    for row in extract_html_table_rows(table_html):
        if not row:
            continue
        normalized_label = normalize_statement_name(row[0])
        if not normalized_label.startswith("PER"):
            continue
        value = extract_forward_per_from_table_row(row, header_labels)
        if is_valid_forward_per(value):
            return value
    return None


def extract_fnguide_forward_per(finance_html: str, ratio_html: str) -> Optional[float]:
    for raw_html in (ratio_html, finance_html):
        direct_value = extract_naver_forward_per_from_text(raw_html)
        if is_valid_forward_per(direct_value):
            return direct_value

        for row in extract_html_table_rows(raw_html):
            if not row:
                continue
            normalized_label = normalize_statement_name(row[0])
            if "PER" not in normalized_label:
                continue
            values = [parse_numeric_cell(value) for value in row[1:]]
            valid_values = [value for value in values if is_valid_forward_per(value)]
            if valid_values:
                return valid_values[-1]
    return None


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
            f"OpenDART 수집 실패 ({normalize_request_error(error)})",
        )
        if naver_result:
            return naver_result
        fnguide_result = collect_earnings_from_fnguide(
            target_universe,
            total_trading_value,
            f"OpenDART 수집 실패 ({normalize_request_error(error)}) · 네이버 기업실적분석 보완 실패",
        )
        if fnguide_result:
            return fnguide_result
        cached_result = build_cached_component_result("earnings", f"실적 breadth 수집 실패 ({normalize_request_error(error)})")
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
                status_entry("partial", "store/market_analyze_data.json", f"실적 breadth 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult(build_neutral_earnings_patch(), status_entry("error", "opendart.fss.or.kr", f"실적 breadth 수집 실패 ({normalize_request_error(error)})"))


def collect_sector_breadth(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        sector_payload = fetch_sector_group_candidates()
        sector_candidates = list(sector_payload.get("rows") or [])[:SECTOR_MOMENTUM_TARGET_COUNT]
        if not sector_candidates:
            raise ValueError("비반도체 업종 후보 없음")

        analyzed: List[Dict[str, Any]] = []
        failures: List[str] = []
        cached_count = 0
        used_cached_candidates = str(sector_payload.get("source") or "").startswith(to_store_relative(SECTOR_CANDIDATE_CACHE_PATH))
        with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(sector_candidates))) as executor:
            future_map = {executor.submit(fetch_sector_history, candidate): candidate for candidate in sector_candidates}
            for future in as_completed(future_map):
                candidate = future_map[future]
                try:
                    history_payload = future.result()
                    history = history_payload.get("history") if isinstance(history_payload, dict) else None
                    if not isinstance(history, list):
                        raise ValueError("업종 시계열 형식 이상")
                    latest_close = safe_number(history[-1].get("close"))
                    previous_close = safe_number(history[-2].get("close")) if len(history) >= 2 else None
                    sma20 = compute_moving_average(history, SECTOR_HISTORY_REQUIRED_DAYS)
                    if latest_close is None or previous_close is None or previous_close <= 0 or sma20 is None:
                        raise ValueError("업종 종가/SMA20 계산 실패")
                    day_return_pct = ((latest_close / previous_close) - 1) * 100
                    history_source = str(history_payload.get("historySource") or "")
                    if history_source.startswith("store/cache/sector_history.json"):
                        cached_count += 1
                    analyzed.append(
                        {
                            "name": candidate["name"],
                            "passed": day_return_pct >= 0 and latest_close > sma20,
                        }
                    )
                except Exception as error:  # noqa: BLE001
                    failures.append(f"{candidate.get('name')}: {error}")

        coverage_count = len(analyzed)
        if coverage_count <= 0:
            proxy_patch = build_sector_breadth_proxy_patch(base_data)
            if proxy_patch:
                message = "업종 시계열 확보 실패로 비주도주 확산 프록시 사용"
                if failures:
                    message += f" · 실패 {len(failures)}개"
                result = CollectorResult(
                    proxy_patch,
                    status_entry(
                        "partial",
                        f"{sector_payload.get('source') or 'finance.naver.com/sise_group'} · broadening-proxy",
                        f"{message} · {proxy_patch.get('nonSemiconductorMomentumProxyReason')}",
                    ),
                )
                save_anchor_component_cache("sectorBreadth", result.data_patch, result.status.get("source", ""))
                return result
            raise ValueError(f"업종 확산 분석 실패 ({'; '.join(failures[:2]) or '유효 시계열 없음'})")

        pass_count = sum(1 for item in analyzed if item.get("passed"))
        momentum = (pass_count / coverage_count) * 100
        patch = {
            "nonSemiconductorMomentum": momentum,
            "nonSemiconductorMomentumCoverageCount": coverage_count,
            "nonSemiconductorMomentumPassCount": pass_count,
            "nonSemiconductorMomentumProxy": False,
            "nonSemiconductorMomentumProxyReason": "",
        }

        minimum_live_coverage = max(3, min(SECTOR_MOMENTUM_TARGET_COUNT, len(sector_candidates)))
        if coverage_count >= SECTOR_MOMENTUM_TARGET_COUNT and not used_cached_candidates and cached_count == 0:
            status_state = "ok"
        else:
            status_state = "partial"

        message = f"비반도체 업종 확산 {pass_count}/{coverage_count}업종 통과"
        if coverage_count < len(sector_candidates):
            message += f" · 상위 {len(sector_candidates)}개 중 {coverage_count}개 분석"
        if failures:
            message += f" · 실패 {len(failures)}개"
        if cached_count:
            message += f" · 섹터 캐시 보완 {cached_count}개"
        if used_cached_candidates:
            message += " · 업종 후보 캐시 사용"
        if coverage_count < minimum_live_coverage:
            proxy_patch = build_sector_breadth_proxy_patch(base_data)
            if proxy_patch:
                proxy_message = (
                    f"업종 실측 {pass_count}/{coverage_count}개로 부족 · 비주도주 확산 프록시 {round(proxy_patch['nonSemiconductorMomentum'])}% 사용"
                )
                if failures:
                    proxy_message += f" · 실패 {len(failures)}개"
                if cached_count:
                    proxy_message += f" · 섹터 캐시 보완 {cached_count}개"
                result = CollectorResult(
                    proxy_patch,
                    status_entry(
                        "partial",
                        f"{sector_payload.get('source') or 'finance.naver.com/sise_group'} · broadening-proxy",
                        f"{proxy_message} · {proxy_patch.get('nonSemiconductorMomentumProxyReason')}",
                    ),
                )
                save_anchor_component_cache("sectorBreadth", result.data_patch, result.status.get("source", ""))
                return result
            message += " · 커버리지 부족으로 보수적 판정"

        result = CollectorResult(
            patch,
            status_entry(
                status_state,
                str(sector_payload.get("source") or "finance.naver.com/sise_group"),
                message,
            ),
        )
        save_anchor_component_cache("sectorBreadth", result.data_patch, result.status.get("source", ""))
        return result
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        proxy_patch = build_sector_breadth_proxy_patch(base_data)
        if proxy_patch:
            result = CollectorResult(
                proxy_patch,
                status_entry(
                    "partial",
                    "broadening-proxy",
                    f"비반도체 업종 확산 수집 실패 ({normalize_request_error(error)}) · 업종 페이지 대신 비주도주 확산 프록시 사용 · {proxy_patch.get('nonSemiconductorMomentumProxyReason')}",
                ),
            )
            save_anchor_component_cache("sectorBreadth", result.data_patch, result.status.get("source", ""))
            return result
        cached_result = build_cached_component_result("sectorBreadth", f"비반도체 업종 확산 수집 실패 ({normalize_request_error(error)})")
        if cached_result:
            return cached_result
        sector_available = (base_data.get("nonSemiconductorMomentumCoverageCount") or 0) > 0 or has_value(
            base_data.get("nonSemiconductorMomentum"),
        )
        if sector_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"비반도체 업종 확산 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult(
            build_neutral_sector_breadth_patch(),
            status_entry("error", "finance.naver.com/sise_group", f"비반도체 업종 확산 수집 실패 ({normalize_request_error(error)})"),
        )


def collect_market_valuation(
    base_data: Dict[str, Any],
    universes: Optional[Dict[str, Any]] = None,
) -> CollectorResult:
    universes = universes or {}
    target_universe = list(universes.get("valuationUniverse") or [])[:FUNDAMENTAL_VALUATION_UNIVERSE_COUNT]
    if not target_universe:
        return CollectorResult(build_neutral_valuation_patch(), status_entry("missing", "finance.naver.com", "밸류에이션 유니버스 없음"))

    total_trading_value = sum(safe_number(item.get("todayTradingValue")) or 0 for item in target_universe) or 1

    def worker(candidate: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        code = str(candidate.get("code") or "")
        if not code:
            return None

        naver_error = None
        try:
            naver_html = fetch_naver_company_financial_summary(code)
            naver_value = extract_naver_forward_per(naver_html)
            if is_valid_forward_per(naver_value):
                return {
                    "code": code,
                    "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
                    "forwardPer": naver_value,
                    "source": "finance.naver.com",
                    "valuationMethod": "forward",
                }
        except Exception as error:  # noqa: BLE001
            naver_error = error

        try:
            fnguide_pages = fetch_fnguide_company_financial_pages(code)
            fnguide_value = extract_fnguide_forward_per(fnguide_pages.get("finance", ""), fnguide_pages.get("ratio", ""))
            if is_valid_forward_per(fnguide_value):
                return {
                    "code": code,
                    "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
                    "forwardPer": fnguide_value,
                    "source": "comp.fnguide.com",
                    "valuationMethod": "forward",
                }
        except Exception as error:  # noqa: BLE001
            if naver_error:
                raise ValueError(f"Naver {naver_error}; FnGuide {error}") from error
            raise

        market_sum_per = safe_number(candidate.get("marketSumPer"))
        if is_valid_forward_per(market_sum_per):
            return {
                "code": code,
                "weight": (safe_number(candidate.get("todayTradingValue")) or 0) / total_trading_value,
                "forwardPer": market_sum_per,
                "source": "finance.naver.com/sise_market_sum",
                "valuationMethod": "trailing-proxy",
            }

        if naver_error:
            raise ValueError(f"Naver {naver_error}; FnGuide 유효 Fwd PER 없음")
        raise ValueError("유효 Fwd PER 없음")

    results: List[Dict[str, Any]] = []
    failures = 0
    with ThreadPoolExecutor(max_workers=min(LEADER_FETCH_CONCURRENCY, len(target_universe))) as executor:
        future_map = {executor.submit(worker, candidate): candidate for candidate in target_universe}
        for future in as_completed(future_map):
            try:
                result = future.result()
                if result:
                    results.append(result)
                else:
                    failures += 1
            except Exception:  # noqa: BLE001
                failures += 1

    if not results:
        cached_result = build_cached_component_result("valuation", "밸류에이션 안정도 수집 실패 (유효 Fwd PER 없음)")
        if cached_result:
            return cached_result
        valuation_available = (base_data.get("marketValuationCoverageCount") or 0) > 0 or has_value(
            base_data.get("marketValuationForwardPerAvg"),
            base_data.get("marketValuationScore"),
        ) or base_data.get("marketValuationStability") in {True, False}
        if valuation_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", "밸류에이션 안정도 수집 실패 (유효 Fwd PER 없음) · 기존 스냅샷 유지"),
            )
        return CollectorResult(
            build_neutral_valuation_patch(),
            status_entry("error", "finance.naver.com · comp.fnguide.com", "밸류에이션 안정도 수집 실패 (유효 Fwd PER 없음)"),
        )

    valid_weight_sum = sum(safe_number(item.get("weight")) or 0 for item in results) or 1
    weighted_forward_per = sum((safe_number(item.get("weight")) or 0) * (safe_number(item.get("forwardPer")) or 0) for item in results) / valid_weight_sum
    coverage_count = len(results)
    proxy_count = sum(1 for item in results if str(item.get("valuationMethod") or "") == "trailing-proxy")
    forward_count = max(0, coverage_count - proxy_count)
    stability = None
    if coverage_count >= 10:
        stability = weighted_forward_per <= MARKET_VALUATION_THRESHOLD

    valuation_method = "forward"
    if proxy_count > 0 and forward_count == 0:
        valuation_method = "trailing-proxy"
    elif proxy_count > 0:
        valuation_method = "mixed-proxy"

    score = 25 if stability is None else (50 if stability else 0)
    patch = {
        "marketValuationStability": stability,
        "marketValuationScore": score,
        "marketValuationCoverageCount": coverage_count,
        "marketValuationForwardPerAvg": weighted_forward_per,
        "marketValuationThreshold": MARKET_VALUATION_THRESHOLD,
        "marketValuationMethod": valuation_method,
        "marketValuationProxyCount": proxy_count,
    }
    source_parts = list(dict.fromkeys(item["source"] for item in results if item.get("source")))
    status_state = "ok" if coverage_count >= 10 and proxy_count == 0 else "partial"
    metric_label = "Fwd PER" if proxy_count == 0 else "PER"
    status_message = f"{metric_label} {coverage_count}/{len(target_universe)}종목 확보 · 가중 평균 {weighted_forward_per:.1f}배"
    if proxy_count > 0:
        status_message += f" · trailing PER 프록시 {proxy_count}종목"
    if stability is True:
        status_message += f" · 안정 기준 {MARKET_VALUATION_THRESHOLD:.1f}배 이하"
    elif stability is False:
        status_message += f" · 안정 기준 {MARKET_VALUATION_THRESHOLD:.1f}배 초과"
    else:
        status_message += " · 커버 종목 부족으로 중립 처리"
    if failures > 0:
        status_message += f" · 실패 {failures}종목"

    result = CollectorResult(
        patch,
        status_entry(status_state, " · ".join(source_parts) or "finance.naver.com · comp.fnguide.com", status_message),
    )
    save_anchor_component_cache("valuation", result.data_patch, result.status.get("source", ""))
    return result


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
        cached_result = build_cached_component_result("broadening", f"확산 수집 실패 ({normalize_request_error(error)})")
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
                status_entry("partial", "store/market_analyze_data.json", f"확산 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        universes = universes or {}
        return CollectorResult(
            build_neutral_broadening_patch(),
            status_entry(
                "error",
                universes.get("historyAttemptSourceSummary") or "finance.naver.com/fchart · query1.finance.yahoo.com",
                f"확산 수집 실패 ({normalize_request_error(error)})",
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


def normalize_boolean_flag(value: Any) -> Optional[bool]:
    if value is True or value is False:
        return value
    normalized = str(value or "").strip().lower()
    if normalized in {"true", "1", "stable", "validated"}:
        return True
    if normalized in {"false", "0", "unstable", "fragile"}:
        return False
    return None


def calculate_fundamental_support_values(data: Dict[str, Any]) -> Dict[str, Any]:
    sector_momentum = safe_number(data.get("nonSemiconductorMomentum"))
    sector_coverage = int(data.get("nonSemiconductorMomentumCoverageCount") or 0)
    sector_pass_count = int(data.get("nonSemiconductorMomentumPassCount") or 0)
    sector_proxy = bool(data.get("nonSemiconductorMomentumProxy"))
    sector_proxy_reason = str(data.get("nonSemiconductorMomentumProxyReason") or "").strip()
    has_sector_measurement = sector_momentum is not None and (sector_coverage >= 3 or sector_proxy)
    sector_support_points = clamp((sector_momentum or 0) * 0.5, 0, 50) if has_sector_measurement else 25

    valuation_threshold = safe_number(data.get("marketValuationThreshold")) or MARKET_VALUATION_THRESHOLD
    valuation_stability = normalize_boolean_flag(data.get("marketValuationStability"))
    valuation_method = str(data.get("marketValuationMethod") or "forward").strip().lower()
    if valuation_stability is True:
        valuation_support_points = 50
    elif valuation_stability is False:
        valuation_support_points = 0
    else:
        valuation_support_points = 25

    fundamental_support_score = clamp(sector_support_points + valuation_support_points, 0, 100)
    if fundamental_support_score >= 70:
        support_state = "validated"
    elif fundamental_support_score >= 45:
        support_state = "supportive"
    else:
        support_state = "fragile"

    sector_reason = (
        f"업종 프록시 확산 {round(sector_momentum)}% ({sector_proxy_reason or '비주도주 breadth 기반'})"
        if sector_proxy and sector_momentum is not None
        else
        f"업종 확산 {sector_pass_count}/{sector_coverage}개 통과"
        if has_sector_measurement
        else f"업종 확산 커버리지 {sector_coverage}개로 중립값"
        if sector_coverage > 0 and sector_momentum is not None
        else "업종 확산 중립값"
    )
    valuation_forward_per = safe_number(data.get("marketValuationForwardPerAvg"))
    valuation_label = "가중 Fwd PER" if valuation_method == "forward" else "가중 PER"
    if valuation_stability is True:
        valuation_reason = f"{valuation_label} {valuation_forward_per:.1f}배 <= {valuation_threshold:.1f}배" if valuation_forward_per is not None else f"{valuation_label} <= {valuation_threshold:.1f}배"
    elif valuation_stability is False:
        valuation_reason = f"{valuation_label} {valuation_forward_per:.1f}배 > {valuation_threshold:.1f}배" if valuation_forward_per is not None else f"{valuation_label} > {valuation_threshold:.1f}배"
    else:
        valuation_reason = "밸류에이션 중립값"

    return {
        "marketValuationScore": valuation_support_points,
        "marketValuationThreshold": valuation_threshold,
        "fundamentalSupportScore": fundamental_support_score,
        "fundamentalSupportState": support_state,
        "fundamentalSupportReason": f"업종 확산 {round(sector_support_points)}/50 · 밸류에이션 {round(valuation_support_points)}/50 · {sector_reason} · {valuation_reason}",
        "supportOffsetPoints": round(fundamental_support_score * 0.3, 2),
    }


def calculate_euphoria_flow_bonus_values(data: Dict[str, Any]) -> Dict[str, Any]:
    required_values = [
        data.get("retailNetToday"),
        data.get("foreignNetToday"),
        data.get("institutionNetToday"),
        data.get("retailNet10dCum"),
        data.get("foreignNet10dCum"),
        data.get("institutionNet10dCum"),
        data.get("retailNet10dAbsAvg"),
        data.get("retailNet10dAbsSum"),
    ]
    if any(safe_number(value) is None for value in required_values):
        return {
            "flowBonus": 0,
            "flowReason": str(data.get("flowReason") or "수급 데이터 미연동 (중립 처리)"),
        }

    disparity = safe_number(data.get("disparity")) or 0
    if disparity > 103:
        return {
            "flowBonus": 0,
            "flowReason": "가격 과열 구간(disparity>103)에서는 수급 보정을 비활성화했습니다 (중립 처리).",
        }

    retail_today = safe_number(data.get("retailNetToday")) or 0
    retail_cum = safe_number(data.get("retailNet10dCum")) or 0
    retail_abs_avg = safe_number(data.get("retailNet10dAbsAvg")) or 0
    retail_abs_sum = safe_number(data.get("retailNet10dAbsSum")) or 0
    if retail_today <= 0 or retail_cum <= 0 or retail_abs_avg <= 0 or retail_abs_sum <= 0:
        return {
            "flowBonus": 0,
            "flowReason": "개인 순매수 과열 조건이 충족되지 않아 수급 보정을 적용하지 않았습니다.",
        }

    daily_intensity = clamp(retail_today / retail_abs_avg, 0, 3) / 3
    trend_conviction = clamp(retail_cum / retail_abs_sum, 0, 1)
    retail_pressure_score = round(clamp((daily_intensity * 0.6 + trend_conviction * 0.4) * 9, 0, 9))
    if retail_pressure_score <= 0:
        return {
            "flowBonus": 0,
            "flowReason": "개인 순매수는 있으나 강도가 약해 수급 보정을 적용하지 않았습니다.",
        }

    foreign_distribution = (safe_number(data.get("foreignNetToday")) or 0) < 0 and (safe_number(data.get("foreignNet10dCum")) or 0) < 0
    institution_distribution = (safe_number(data.get("institutionNetToday")) or 0) < 0 and (safe_number(data.get("institutionNet10dCum")) or 0) < 0
    if not foreign_distribution and not institution_distribution:
        return {
            "flowBonus": 0,
            "flowReason": "개인 매수는 강하지만 외국인/기관 분배 신호가 없어 수급 보정을 적용하지 않았습니다.",
        }

    distribution_score = 6 if foreign_distribution and institution_distribution else 3
    distribution_label = (
        "외국인·기관 동시 분배 6점"
        if foreign_distribution and institution_distribution
        else "외국인 분배 3점"
        if foreign_distribution
        else "기관 분배 3점"
    )
    return {
        "flowBonus": min(15, retail_pressure_score + distribution_score),
        "flowReason": f"개인 순매수 과열 {retail_pressure_score}점 + {distribution_label}",
    }


def calculate_support_adjusted_cycle_values(data: Dict[str, Any]) -> Dict[str, Any]:
    fx = safe_number(data.get("fx")) or 0
    vix = safe_number(data.get("vix")) or 0
    sentiment = safe_number(data.get("sentiment")) or 50
    disparity = safe_number(data.get("disparity")) or 100
    bull_ratio = safe_number(data.get("bullRatio")) or 50
    margin_slope = safe_number(data.get("marginSlope")) or 0
    support_score = safe_number(data.get("fundamentalSupportScore"))
    if support_score is None:
        support_score = 50
    support_offset = safe_number(data.get("supportOffsetPoints"))
    if support_offset is None:
        support_offset = round(support_score * 0.3, 2)

    f_fx = 1.5 if fx >= 1450 else 1.0 if fx >= 1420 else 0.5 if fx >= 1350 else 0
    g_vix = 1.5 if vix >= 30 else 1.0 if vix >= 22 else 0.5 if vix >= 15 else 0
    macro_stress = min(70, (40 * f_fx) + (30 * g_vix))
    equity_overbought = min(100, max(0, (disparity - 95)) * 2 + (bull_ratio * 0.5))

    credit_score = min(100, max(0, margin_slope / 200))
    linear_greed = (equity_overbought * 0.4) + (credit_score * 0.3) + (sentiment * 0.3)
    disparity_surplus = max(0, (disparity - 100) / 5)
    sentiment_surplus = max(0, (sentiment - 50) / 20)
    reflexivity_points = min(25, max(0, disparity_surplus * sentiment_surplus * 12))
    greed_score = clamp(linear_greed + reflexivity_points, 0, 100) or 50

    flow_patch = calculate_euphoria_flow_bonus_values(data)
    raw_risk_index = clamp(50 + (greed_score - macro_stress) + (safe_number(flow_patch.get("flowBonus")) or 0), 0, 100)
    risk_index = clamp(raw_risk_index - support_offset, 0, 100)
    bubble_summary = summarize_bubble_overlay(data)
    regime_patch = resolve_hot_zone_market_regime(
        {
            **data,
            "bubbleSignals": bubble_summary["bubbleSignals"],
            "bubbleIndex": bubble_summary["bubbleIndex"],
            "bubbleActiveFlagCount": bubble_summary["bubbleActiveFlagCount"],
            "bubbleCriticalTrigger": bubble_summary["bubbleCriticalTrigger"],
            "bubbleSignalCoverageCount": bubble_summary["bubbleSignalCoverageCount"],
        },
        fx=fx,
        equity_overbought=equity_overbought,
        fundamental_support_score=support_score,
        risk_index=risk_index,
    )
    cycle_patch = calculate_cycle_runtime_values(
        {
            **data,
            "vix": vix,
            "bullRatio": bull_ratio,
            "flowBonus": safe_number(flow_patch.get("flowBonus")) or 0,
            "flowReason": str(flow_patch.get("flowReason") or data.get("flowReason") or ""),
            "rawRiskIndex": raw_risk_index,
            "supportOffsetPoints": support_offset,
            "riskIndex": regime_patch["riskIndex"],
            "bubbleSignals": bubble_summary["bubbleSignals"],
            "bubbleIndex": bubble_summary["bubbleIndex"],
            "bubbleActiveFlagCount": bubble_summary["bubbleActiveFlagCount"],
            "bubbleCriticalTrigger": bubble_summary["bubbleCriticalTrigger"],
            "bubbleCriticalReason": bubble_summary["bubbleCriticalReason"],
            "marketRegimeKey": regime_patch["marketRegimeKey"],
            "marketRegimeLabel": regime_patch["marketRegimeLabel"],
            "marketRegimeReason": regime_patch["marketRegimeReason"],
            "debasementAlert": regime_patch["debasementAlert"],
        }
    )

    return {
        "flowBonus": safe_number(flow_patch.get("flowBonus")) or 0,
        "flowReason": str(flow_patch.get("flowReason") or data.get("flowReason") or ""),
        "macroStressScore": macro_stress,
        "equityOverboughtScore": equity_overbought,
        "greedScore": greed_score,
        "rawRiskIndex": raw_risk_index,
        "supportOffsetPoints": support_offset,
        "riskIndex": regime_patch["riskIndex"],
        "reflexivitySynergyPoints": reflexivity_points,
        "reflexivityState": "runaway" if reflexivity_points >= 15 else "caution" if reflexivity_points >= 6 else "normal",
        "bubbleSignals": bubble_summary["bubbleSignals"],
        "bubbleIndex": bubble_summary["bubbleIndex"],
        "bubbleActiveFlagCount": bubble_summary["bubbleActiveFlagCount"],
        "bubbleCriticalTrigger": bubble_summary["bubbleCriticalTrigger"],
        "bubbleCriticalReason": bubble_summary["bubbleCriticalReason"],
        "marketRegimeKey": regime_patch["marketRegimeKey"],
        "marketRegimeLabel": regime_patch["marketRegimeLabel"],
        "marketRegimeReason": regime_patch["marketRegimeReason"],
        "debasementAlert": regime_patch["debasementAlert"],
        **cycle_patch,
    }
