from __future__ import annotations

import csv
import re
import zipfile
from datetime import date, datetime, timedelta, timezone
from io import BytesIO, StringIO
from typing import Any, Dict, Iterable, List, Optional
from urllib.error import HTTPError, URLError
from xml.etree import ElementTree as ET

from .collectors import (
    NAVER_ENCODING,
    CollectorResult,
    fetch_text,
    fetch_yahoo_chart,
    last_finite,
    make_request,
    normalize_request_error,
    parse_margin_history_rows,
    safe_number,
    status_entry,
    strip_html,
)
from .ipo_profitability import collect_ipo_profitability_samples
from .regime_policy import build_bubble_signal


FINRA_MARGIN_URL = "https://www.finra.org/sites/default/files/2021-03/margin-statistics.xlsx"
RENAISSANCE_PRICINGS_URL = "https://www.renaissancecapital.com/IPO-Center/Pricings"
FRED_FED_TARGET_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFEDTARU"
NAVER_MARGIN_URL = "https://finance.naver.com/sise/sise_deposit.naver"
XLSX_NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
XLSX_SHARED_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def get_existing_bubble_signal(base_data: Dict[str, Any], signal_key: str) -> Optional[Dict[str, Any]]:
    bubble_signals = base_data.get("bubbleSignals")
    if not isinstance(bubble_signals, dict):
        return None
    signal = bubble_signals.get(signal_key)
    return signal if isinstance(signal, dict) else None


def build_failure_result(base_data: Dict[str, Any], signal_key: str, source: str, message: str) -> CollectorResult:
    if get_existing_bubble_signal(base_data, signal_key):
        return CollectorResult(
            {},
            status_entry("partial", "store/results/latest.js", f"{message} · 기존 버블 스냅샷 유지"),
        )
    return CollectorResult({}, status_entry("error", source, message))


def load_xlsx_shared_strings(archive: zipfile.ZipFile) -> List[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    values: List[str] = []
    for item in root.findall(".//x:si", XLSX_NS):
        values.append("".join(text.text or "" for text in item.findall(".//x:t", XLSX_NS)))
    return values


def read_xlsx_cell_value(cell: ET.Element, shared_strings: List[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(text.text or "" for text in cell.findall(".//x:t", XLSX_NS))
    raw_value = cell.findtext(f"{XLSX_SHARED_NS}v") or ""
    if cell_type == "s":
        index = int(raw_value or 0)
        return shared_strings[index] if 0 <= index < len(shared_strings) else ""
    return raw_value.strip()


def parse_finra_margin_series(raw: bytes) -> List[Dict[str, Any]]:
    with zipfile.ZipFile(BytesIO(raw)) as archive:
        shared_strings = load_xlsx_shared_strings(archive)
        sheet_xml = archive.read("xl/worksheets/sheet1.xml")
    root = ET.fromstring(sheet_xml)
    series: List[Dict[str, Any]] = []
    for row in root.findall(".//x:sheetData/x:row", XLSX_NS):
        row_values: Dict[str, str] = {}
        for cell in row.findall("x:c", XLSX_NS):
            ref = str(cell.attrib.get("r") or "")
            column = re.sub(r"\d", "", ref)
            row_values[column] = read_xlsx_cell_value(cell, shared_strings)
        month = row_values.get("A", "").strip()
        margin_debt = safe_number(row_values.get("B"))
        if re.fullmatch(r"\d{4}-\d{2}", month) and margin_debt is not None and margin_debt > 0:
            series.append({"month": month, "marginDebt": margin_debt})
    return series


def collect_naver_margin_rows(max_pages: int = 10) -> List[Dict[str, Any]]:
    rows_by_date: Dict[str, Dict[str, Any]] = {}
    for page in range(1, max_pages + 1):
        url = NAVER_MARGIN_URL if page == 1 else f"{NAVER_MARGIN_URL}?page={page}"
        html = fetch_text(url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
        page_rows = parse_margin_history_rows(html, limit=20)
        if not page_rows:
            break
        for row in page_rows:
            date_key = str(row.get("dateKey") or "")
            if date_key and date_key not in rows_by_date:
                rows_by_date[date_key] = row
        if len(page_rows) < 20:
            break
    return sorted(rows_by_date.values(), key=lambda item: item["dateKey"], reverse=True)


def compute_trough_growth(
    rows: Iterable[Dict[str, Any]],
    value_key: str,
    date_key: str,
    *,
    minimum_ratio: float = 0.05,
) -> Dict[str, Any]:
    normalized = [row for row in rows if safe_number(row.get(value_key)) not in {None, 0}]
    if not normalized:
        raise ValueError("유효 시계열이 없습니다.")
    latest = normalized[0]
    latest_value = float(latest[value_key])
    floor_value = latest_value * max(0.0, minimum_ratio)
    filtered = [row for row in normalized if float(row[value_key]) >= floor_value]
    base_rows = filtered or normalized
    trough = min(base_rows, key=lambda item: float(item[value_key]))
    trough_value = float(trough[value_key])
    growth_pct = ((latest_value - trough_value) / trough_value) * 100 if trough_value > 0 else 0
    return {
        "latestDate": str(latest.get(date_key) or ""),
        "latestValue": latest_value,
        "troughDate": str(trough.get(date_key) or ""),
        "troughValue": trough_value,
        "growthPct": round(growth_pct, 2),
        "sampleCount": len(base_rows),
    }


def limit_recent_rows(rows: List[Dict[str, Any]], max_count: int) -> List[Dict[str, Any]]:
    if max_count <= 0:
        return rows
    return rows[:max_count]


def extract_series_points(quote: Dict[str, Any]) -> List[Dict[str, Any]]:
    ohlcv_series = quote.get("ohlcvSeries")
    if isinstance(ohlcv_series, list) and ohlcv_series:
        points = [
            {"timestamp": int(point["timestamp"]), "close": float(point["close"])}
            for point in ohlcv_series
            if safe_number(point.get("timestamp")) is not None and safe_number(point.get("close")) is not None
        ]
        if points:
            return points

    closes = [safe_number(value) for value in quote.get("closes", [])]
    valid_closes = [float(value) for value in closes if value is not None]
    return [{"timestamp": index, "close": close} for index, close in enumerate(valid_closes)]


def build_ratio_metrics(left_quote: Dict[str, Any], right_quote: Dict[str, Any], sma_window: int = 20) -> Dict[str, Any]:
    left_series = extract_series_points(left_quote)
    right_series = {point["timestamp"]: point["close"] for point in extract_series_points(right_quote)}
    ratio_series = [
        {"timestamp": point["timestamp"], "ratio": point["close"] / right_series[point["timestamp"]]}
        for point in left_series
        if point["timestamp"] in right_series and right_series[point["timestamp"]] > 0
    ]
    if len(ratio_series) < sma_window:
        raise ValueError(f"상대강도 시계열 부족 ({len(ratio_series)}건)")

    ratio_values = [point["ratio"] for point in ratio_series]
    current_ratio = ratio_values[-1]
    sma20 = sum(ratio_values[-sma_window:]) / sma_window
    if sma20 <= 0:
        raise ValueError("상대강도 SMA20 계산 실패")

    overshoot_pct = (current_ratio / sma20) * 100
    duration_days = 0
    for value in reversed(ratio_values):
        if (value / sma20) * 100 >= 120:
            duration_days += 1
        else:
            break

    def trailing_return(points: List[Dict[str, Any]], window: int = 20) -> float:
        if len(points) <= window:
            raise ValueError(f"수익률 창 부족 ({len(points)}건)")
        start = points[-(window + 1)]["close"]
        end = points[-1]["close"]
        if start <= 0:
            raise ValueError("기준 가격이 0 이하입니다.")
        return ((end - start) / start) * 100

    left_return = trailing_return(left_series)
    right_points = extract_series_points(right_quote)
    right_return = trailing_return(right_points)
    return {
        "currentRatio": round(current_ratio, 4),
        "sma20": round(sma20, 4),
        "overshootPct": round(overshoot_pct, 2),
        "durationDays": duration_days,
        "leftReturnPct": round(left_return, 2),
        "rightReturnPct": round(right_return, 2),
        "outperformancePct": round(left_return - right_return, 2),
    }


def parse_renaissance_pricings(html_text: str) -> List[Dict[str, Any]]:
    tbody_match = re.search(
        r'<div id="calendar"[\s\S]*?<tbody>(?P<tbody>[\s\S]*?)</tbody>',
        str(html_text or ""),
        flags=re.IGNORECASE,
    )
    if not tbody_match:
        raise ValueError("Renaissance Pricings tbody 파싱 실패")
    rows: List[Dict[str, Any]] = []
    for tr_content in re.findall(r"<tr[^>]*>([\s\S]*?)</tr>", tbody_match.group("tbody"), flags=re.IGNORECASE):
        cells = re.findall(r'<td[^>]*class="([^"]+)"[^>]*>([\s\S]*?)</td>', tr_content, flags=re.IGNORECASE)
        if not cells:
            continue
        row_map: Dict[str, str] = {}
        for class_name, value_html in cells:
            row_map[class_name] = strip_html(value_html)
        offer_date_text = row_map.get("col-offer-date", "").strip()
        return_text = row_map.get("col-return", "").strip()
        company = row_map.get("col-company", "").strip()
        ticker = row_map.get("ticker1 col-ticker", "").strip() or row_map.get("ticker2 col-ticker", "").strip()
        if not offer_date_text:
            continue
        try:
            offer_date = datetime.strptime(offer_date_text, "%m/%d/%y").date()
        except ValueError:
            continue
        return_pct = safe_number(re.sub(r"[^\d.+-]", "", return_text))
        rows.append(
            {
                "ticker": ticker,
                "company": company,
                "offerDate": offer_date,
                "returnPct": return_pct if return_pct is not None else 0.0,
            }
        )
    if not rows:
        raise ValueError("Renaissance Pricings 행이 없습니다.")
    return rows


def parse_fred_rate_series(csv_text: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    reader = csv.DictReader(StringIO(csv_text))
    for item in reader:
        try:
            observation_date = datetime.strptime(str(item.get("observation_date") or ""), "%Y-%m-%d").date()
        except ValueError:
            continue
        rate = safe_number(item.get("DFEDTARU"))
        if rate is None:
            continue
        rows.append({"date": observation_date, "rate": float(rate)})
    if not rows:
        raise ValueError("FRED 금리 시계열이 비었습니다.")
    return rows


def compress_rate_change_events(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    events: List[Dict[str, Any]] = []
    previous_rate: Optional[float] = None
    for row in rows:
        rate = float(row["rate"])
        if previous_rate is None:
            previous_rate = rate
            continue
        if abs(rate - previous_rate) < 1e-9:
            continue
        events.append(
            {
                "date": row["date"],
                "rate": rate,
                "delta": round(rate - previous_rate, 2),
            }
        )
        previous_rate = rate
    if not events:
        raise ValueError("금리 변화 이벤트가 없습니다.")
    return events


def derive_rehike_metrics(events: List[Dict[str, Any]]) -> Dict[str, Any]:
    rehike_count = 0
    last_hike_date: Optional[date] = None
    recent_pause_anchor = ""
    in_rehike_phase = False

    for event in events:
        delta = float(event["delta"])
        event_date = event["date"]
        if delta < 0:
            rehike_count = 0
            last_hike_date = None
            recent_pause_anchor = ""
            in_rehike_phase = False
            continue
        if delta <= 0:
            continue
        if last_hike_date is not None:
            gap_days = (event_date - last_hike_date).days
            if gap_days >= 50:
                rehike_count = 1
                in_rehike_phase = True
                recent_pause_anchor = last_hike_date.isoformat()
            elif in_rehike_phase:
                rehike_count += 1
        last_hike_date = event_date

    latest_event = events[-1]
    return {
        "rehikeCount": rehike_count,
        "lastChangeDate": latest_event["date"].isoformat(),
        "lastHikeDate": last_hike_date.isoformat() if last_hike_date else "",
        "recentPauseAnchorDate": recent_pause_anchor,
    }


def collect_margin_debt_flag(base_data: Dict[str, Any]) -> CollectorResult:
    errors: List[str] = []
    updated_at = utc_now_iso()
    us_metrics: Dict[str, Any] = {}
    kr_metrics: Dict[str, Any] = {}

    try:
        finra_rows = limit_recent_rows(parse_finra_margin_series(make_request(FINRA_MARGIN_URL, timeout=20)), 84)
        us_metrics = compute_trough_growth(finra_rows, "marginDebt", "month", minimum_ratio=0.10)
    except (HTTPError, URLError, TimeoutError, ValueError, ET.ParseError, zipfile.BadZipFile) as error:
        errors.append(f"FINRA {normalize_request_error(error)}")

    try:
        kr_rows = collect_naver_margin_rows(max_pages=10)
        kr_metrics = compute_trough_growth(kr_rows, "balance", "dateKey", minimum_ratio=0.40)
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        errors.append(f"네이버 신용 {normalize_request_error(error)}")

    if not us_metrics and not kr_metrics:
        return build_failure_result(base_data, "marginDebt", "finra.org", f"신용매수 과열 수집 실패 ({'; '.join(errors[:2])})")

    growth_values = [value["growthPct"] for value in (us_metrics, kr_metrics) if value]
    composite_growth = sum(growth_values) / len(growth_values)
    score = min(100.0, composite_growth)
    critical = bool(us_metrics and kr_metrics and us_metrics["growthPct"] >= 100 and kr_metrics["growthPct"] >= 100)
    quality_state = "ok" if us_metrics and kr_metrics else "partial"
    label = "신용매수 과열"
    reason = (
        f"미국 {round(us_metrics['growthPct']) if us_metrics else '-'}%, 국내 {round(kr_metrics['growthPct']) if kr_metrics else '-'}% "
        f"trough 대비 상승으로 composite {round(composite_growth)}점입니다."
    )
    if quality_state != "ok":
        reason = f"{reason} 일부 지역만 확보되어 partial 상태입니다."

    signal = build_bubble_signal(
        label,
        score,
        critical=critical,
        reason=reason,
        metrics={
            "usLatestMonth": us_metrics.get("latestDate", ""),
            "usLatestValue": us_metrics.get("latestValue"),
            "usTroughMonth": us_metrics.get("troughDate", ""),
            "usTroughValue": us_metrics.get("troughValue"),
            "usGrowthPct": us_metrics.get("growthPct"),
            "krLatestDate": kr_metrics.get("latestDate", ""),
            "krLatestValue": kr_metrics.get("latestValue"),
            "krTroughDate": kr_metrics.get("troughDate", ""),
            "krTroughValue": kr_metrics.get("troughValue"),
            "krGrowthPct": kr_metrics.get("growthPct"),
            "compositeGrowthPct": round(composite_growth, 2),
            "availableRegions": len(growth_values),
        },
        updated_at=updated_at,
    )
    source = "finra.org · finance.naver.com" if quality_state == "ok" else ("finra.org" if us_metrics else "finance.naver.com")
    status_message = (
        f"미국/국내 신용 trough 대비 상승률 계산 완료 · composite {round(composite_growth)}%"
        if quality_state == "ok"
        else f"신용매수 과열 일부만 확보 ({'; '.join(errors[:2])})"
    )
    return CollectorResult({"bubbleSignals": {"marginDebt": signal}}, status_entry(quality_state, source, status_message))


def collect_ipo_glut_flag(base_data: Dict[str, Any]) -> CollectorResult:
    updated_at = utc_now_iso()
    try:
        html = fetch_text(RENAISSANCE_PRICINGS_URL, timeout=16, encodings=("utf-8",))
        rows = parse_renaissance_pricings(html)
        cutoff = date.today() - timedelta(days=90)
        recent_rows = [row for row in rows if row["offerDate"] >= cutoff]
        if not recent_rows:
            raise ValueError("최근 90일 IPO 표본이 없습니다.")
        avg_return = sum(row["returnPct"] for row in recent_rows) / len(recent_rows)
        profitability = collect_ipo_profitability_samples(recent_rows)
        relative: Dict[str, Any] = {}
        yahoo_error = ""
        try:
            ipo_quote = fetch_yahoo_chart("IPO", "1y")
            qqq_quote = fetch_yahoo_chart("QQQ", "1y")
            relative = build_ratio_metrics(ipo_quote, qqq_quote)
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            ipo_quote = {"regularMarketPrice": None, "closes": []}
            qqq_quote = {"regularMarketPrice": None, "closes": []}
            yahoo_error = normalize_request_error(error)

        sample_count = len(recent_rows)
        covered_count = int(profitability.get("coveredCount") or 0)
        missing_count = int(profitability.get("missingCount") or max(0, sample_count - covered_count))
        coverage_ratio_pct = float(profitability.get("coverageRatioPct") or 0.0)
        loss_making_ratio_pct = profitability.get("lossMakingRatioPct")
        sample_component = min(100.0, (sample_count / 20) * 100)
        return_component = min(100.0, max(0.0, avg_return))
        loss_component = min(100.0, max(0.0, float(loss_making_ratio_pct or 0.0)))
        etf_component = min(
            100.0,
            max(0.0, float(relative.get("outperformancePct") or 0.0) * 5)
            + max(0.0, float(relative.get("overshootPct") or 100.0) - 100.0) * 2,
        )
        raw_score = (return_component * 0.4) + (loss_component * 0.25) + (sample_component * 0.2) + (etf_component * 0.15)
        score_cap = 100.0 if coverage_ratio_pct >= 60 else (80.0 if covered_count else 70.0)
        score = min(score_cap, raw_score)
        critical = bool(
            loss_making_ratio_pct is not None
            and sample_count >= 12
            and covered_count >= max(10, int(sample_count * 0.6))
            and coverage_ratio_pct >= 60
            and avg_return >= 100
            and float(loss_making_ratio_pct) >= 60
            and relative
            and (
                float(relative.get("outperformancePct") or 0.0) >= 10
                or float(relative.get("overshootPct") or 0.0) >= 110
            )
        )
        quality_state = "ok" if loss_making_ratio_pct is not None and coverage_ratio_pct >= 75 and relative else "partial"
        profitability_text = (
            f"적자/비수익 {float(loss_making_ratio_pct):.1f}% ({covered_count}/{sample_count} 커버)"
            if loss_making_ratio_pct is not None
            else f"적자/비수익 프록시 미확보 ({covered_count}/{sample_count} 커버)"
        )
        reason = (
            f"최근 {sample_count}건 IPO의 평균 초과수익률 {avg_return:.1f}%와 "
            f"{profitability_text}, "
            f"IPO ETF의 QQQ 대비 20일 초과수익 {float(relative.get('outperformancePct') or 0.0):.1f}%를 반영했습니다."
        )
        if missing_count > 0:
            reason = f"{reason} 미커버 {missing_count}건은 제외했습니다."
        if profitability.get("sourceSummary"):
            reason = f"{reason} 수익성 프록시는 {profitability['sourceSummary']} 기반입니다."
        if yahoo_error:
            reason = f"{reason} IPO ETF 상대강도는 일부 미수집({yahoo_error}) 상태라 점수를 보수적으로 유지합니다."
        signal = build_bubble_signal(
            "공모주 광풍",
            score,
            critical=critical,
            reason=reason,
            metrics={
                "sampleWindowDays": 90,
                "sampleCount": sample_count,
                "avgFirstDayExcessReturnPct": round(avg_return, 2),
                "returnProxy": True,
                "lossMakingRatioPct": round(float(loss_making_ratio_pct), 2) if loss_making_ratio_pct is not None else None,
                "lossMakingCount": profitability.get("lossMakingCount"),
                "profitabilityCoverageCount": covered_count,
                "profitabilityMissingCount": missing_count,
                "profitabilityCoverageRatioPct": round(coverage_ratio_pct, 2),
                "profitabilitySourceSummary": profitability.get("sourceSummary") or "",
                "profitabilitySourceBreakdown": profitability.get("sourceBreakdown") or {},
                "profitabilityMethod": "negative EPS/net income proxy",
                "profitabilityMissingTickers": profitability.get("missingTickers") or [],
                "ipoEtfPrice": ipo_quote.get("regularMarketPrice") or last_finite(ipo_quote.get("closes", [])),
                "ipoVsQqq20dOutperformancePct": relative.get("outperformancePct"),
                "ipoVsQqqRatio": relative.get("currentRatio"),
                "ipoVsQqqRatioVsSma20Pct": relative.get("overshootPct"),
            },
            updated_at=updated_at,
        )
        source_parts = ["renaissancecapital.com"]
        source_parts.extend(profitability.get("sourceDomains") or [])
        if relative:
            source_parts.append("query1.finance.yahoo.com")
        status_message = (
            f"IPO 표본 {sample_count}건 · 적자 IPO {float(loss_making_ratio_pct):.1f}% ({covered_count}/{sample_count})"
            if loss_making_ratio_pct is not None
            else f"IPO 표본 {sample_count}건 · 적자 IPO 프록시 {covered_count}/{sample_count}만 확보"
        )
        if relative:
            status_message = f"{status_message} · ETF 상대강도 {float(relative.get('outperformancePct') or 0.0):+.1f}%"
        elif yahoo_error:
            status_message = f"{status_message} · ETF 상대강도 미수집 ({yahoo_error})"
        return CollectorResult(
            {"bubbleSignals": {"ipo": signal}},
            status_entry(quality_state, " · ".join(dict.fromkeys(source_parts)), status_message),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, ET.ParseError) as error:
        return build_failure_result(base_data, "ipo", "renaissancecapital.com", f"공모주 광풍 수집 실패 ({normalize_request_error(error)})")


def collect_trash_flag(base_data: Dict[str, Any]) -> CollectorResult:
    updated_at = utc_now_iso()
    try:
        arkk_quote = fetch_yahoo_chart("ARKK", "1y")
        qqq_quote = fetch_yahoo_chart("QQQ", "1y")
        relative = build_ratio_metrics(arkk_quote, qqq_quote)
        overshoot_component = min(100.0, max(0.0, (relative["overshootPct"] - 100) * 5))
        duration_component = min(100.0, relative["durationDays"] * 20)
        outperformance_component = min(100.0, max(0.0, relative["outperformancePct"] * 8))
        score = min(100.0, (overshoot_component * 0.5) + (duration_component * 0.2) + (outperformance_component * 0.3))
        critical = relative["overshootPct"] >= 120 and relative["durationDays"] >= 3 and relative["outperformancePct"] >= 5
        reason = (
            f"ARKK/QQQ 비율이 20일선 대비 {relative['overshootPct']:.1f}%이며 "
            f"{relative['durationDays']}일 연속 과열 상태입니다. "
            f"최근 20일 ARKK의 QQQ 대비 초과수익은 {relative['outperformancePct']:.1f}%p입니다."
        )
        signal = build_bubble_signal(
            "적자 혁신주 투기",
            score,
            critical=critical,
            reason=reason,
            metrics={
                "arkkPrice": arkk_quote.get("regularMarketPrice") or last_finite(arkk_quote.get("closes", [])),
                "qqqPrice": qqq_quote.get("regularMarketPrice") or last_finite(qqq_quote.get("closes", [])),
                "arkkQqqRatio": relative["currentRatio"],
                "ratioSma20": relative["sma20"],
                "overshootPct": relative["overshootPct"],
                "durationDays": relative["durationDays"],
                "arkk20dReturnPct": relative["leftReturnPct"],
                "qqq20dReturnPct": relative["rightReturnPct"],
                "outperformancePct": relative["outperformancePct"],
            },
            updated_at=updated_at,
        )
        return CollectorResult(
            {"bubbleSignals": {"trash": signal}},
            status_entry("ok", "query1.finance.yahoo.com", f"ARKK/QQQ 상대강도 계산 완료 · 오버슈트 {relative['overshootPct']:.1f}%"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        return build_failure_result(base_data, "trash", "query1.finance.yahoo.com", f"적자 혁신주 투기 수집 실패 ({normalize_request_error(error)})")


def collect_fed_brake_flag(base_data: Dict[str, Any]) -> CollectorResult:
    updated_at = utc_now_iso()
    try:
        csv_text = fetch_text(FRED_FED_TARGET_URL, timeout=16, encodings=("utf-8",))
        rows = parse_fred_rate_series(csv_text)
        events = compress_rate_change_events(rows)
        rehike_metrics = derive_rehike_metrics(events)
        latest_rate = rows[-1]["rate"]
        raw_score = min(100.0, rehike_metrics["rehikeCount"] * 20)
        score = min(60.0, raw_score)
        reason = (
            f"실제 재인상 카운트는 {rehike_metrics['rehikeCount']}회입니다. "
            "FedWatch 다음 회의 확률은 아직 미연동이라 점수는 capped 상태로 유지합니다."
        )
        signal = build_bubble_signal(
            "연준 브레이크",
            score,
            critical=False,
            reason=reason,
            metrics={
                "fedRateTargetUpperBound": latest_rate,
                "lastChangeDate": rehike_metrics["lastChangeDate"],
                "lastHikeDate": rehike_metrics["lastHikeDate"],
                "recentPauseAnchorDate": rehike_metrics["recentPauseAnchorDate"],
                "rehikeCount": rehike_metrics["rehikeCount"],
                "nextHikeProbabilityPct": None,
                "probabilityAvailable": False,
            },
            updated_at=updated_at,
        )
        return CollectorResult(
            {"bubbleSignals": {"fed": signal}},
            status_entry("partial", "fred.stlouisfed.org", "FRED 기반 실제 재인상 카운트만 반영했고 FedWatch 확률은 미연동입니다."),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, csv.Error) as error:
        return build_failure_result(base_data, "fed", "fred.stlouisfed.org", f"연준 브레이크 수집 실패 ({normalize_request_error(error)})")
