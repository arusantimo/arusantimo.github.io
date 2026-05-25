from __future__ import annotations

import re
from collections import Counter
from functools import lru_cache
from typing import Any, Dict, Iterable, List, Optional
from urllib.error import HTTPError, URLError

from .collectors import fetch_text, normalize_request_error, parse_json_text, safe_number


SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json"
SEC_COMPANYFACTS_URL_TEMPLATE = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik:010d}.json"
STOCKANALYSIS_STOCK_URL_TEMPLATE = "https://stockanalysis.com/stocks/{ticker}/"
STOCKANALYSIS_FINANCIALS_URL_TEMPLATE = "https://stockanalysis.com/stocks/{ticker}/financials/"
MARKETWATCH_STOCK_URL_TEMPLATE = "https://www.marketwatch.com/investing/stock/{ticker}"
SEC_ALLOWED_FORMS = {
    "10-K",
    "10-K/A",
    "10-Q",
    "10-Q/A",
    "20-F",
    "20-F/A",
    "6-K",
    "6-K/A",
    "F-1",
    "F-1/A",
    "S-1",
    "S-1/A",
    "424B1",
    "424B3",
    "424B4",
    "424B5",
}
SEC_NET_INCOME_KEYS = (
    "NetIncomeLoss",
    "ProfitLoss",
    "NetIncomeLossAvailableToCommonStockholdersBasic",
    "NetIncomeLossAvailableToCommonStockholdersDiluted",
    "ProfitLossAttributableToOwnersOfParent",
    "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
    "OperatingIncomeLoss",
)
SEC_EPS_KEYS = (
    "EarningsPerShareBasic",
    "EarningsPerShareDiluted",
    "BasicEarningsLossPerShare",
    "DilutedEarningsLossPerShare",
)
SOURCE_LABELS = {
    "sec-companyfacts": "SEC companyfacts",
    "stockanalysis-eps": "StockAnalysis EPS",
    "stockanalysis-net-income": "StockAnalysis Net Income",
    "marketwatch-eps": "MarketWatch EPS",
}
SOURCE_DOMAINS = {
    "sec-companyfacts": "sec.gov",
    "stockanalysis-eps": "stockanalysis.com",
    "stockanalysis-net-income": "stockanalysis.com",
    "marketwatch-eps": "marketwatch.com",
}


def parse_signed_display_number(raw: Any) -> Optional[float]:
    text = str(raw or "").strip()
    if not text or text.lower() in {"n/a", "na", "-", "--", "—"}:
        return None
    negative = text.startswith("-") or (text.startswith("(") and text.endswith(")"))
    normalized = text.replace("$", "").replace(",", "").replace("+", "").strip()
    normalized = normalized.lstrip("-").strip("()").strip()
    multiplier = 1.0
    if normalized:
        suffix = normalized[-1].upper()
        if suffix in {"K", "M", "B", "T"}:
            multiplier = {"K": 0.001, "M": 1.0, "B": 1000.0, "T": 1_000_000.0}[suffix]
            normalized = normalized[:-1].strip()
    value = safe_number(normalized)
    if value is None:
        return None
    scaled = float(value) * multiplier
    return -abs(scaled) if negative else scaled


@lru_cache(maxsize=1)
def load_sec_ticker_cik_map() -> Dict[str, int]:
    payload = parse_json_text(fetch_text(SEC_TICKERS_URL, timeout=20, encodings=("utf-8",)), "SEC ticker map")
    mapping: Dict[str, int] = {}
    if not isinstance(payload, dict):
        return mapping
    for item in payload.values():
        if not isinstance(item, dict):
            continue
        ticker = str(item.get("ticker") or "").strip().upper()
        cik = safe_number(item.get("cik_str"))
        if ticker and cik is not None:
            mapping[ticker] = int(cik)
    return mapping


def extract_sec_profitability_metric(payload: Any) -> Optional[Dict[str, Any]]:
    facts = payload.get("facts") if isinstance(payload, dict) else {}
    if not isinstance(facts, dict):
        return None

    candidates: List[Dict[str, Any]] = []
    for taxonomy_name, taxonomy_facts in facts.items():
        if not isinstance(taxonomy_facts, dict):
            continue
        for metric_type, metric_keys in (("netIncome", SEC_NET_INCOME_KEYS), ("eps", SEC_EPS_KEYS)):
            for metric_key in metric_keys:
                fact_entry = taxonomy_facts.get(metric_key)
                if not isinstance(fact_entry, dict):
                    continue
                units = fact_entry.get("units")
                if not isinstance(units, dict):
                    continue
                for unit_name, values in units.items():
                    if not isinstance(values, list):
                        continue
                    for value_entry in values:
                        if not isinstance(value_entry, dict) or value_entry.get("segment"):
                            continue
                        form = str(value_entry.get("form") or "")
                        if form and form not in SEC_ALLOWED_FORMS:
                            continue
                        value = safe_number(value_entry.get("val"))
                        if value is None:
                            continue
                        candidates.append(
                            {
                                "value": float(value),
                                "metricType": metric_type,
                                "metricKey": metric_key,
                                "metricUnit": unit_name,
                                "taxonomy": taxonomy_name,
                                "form": form,
                                "filedAt": str(value_entry.get("filed") or ""),
                                "periodEnd": str(value_entry.get("end") or ""),
                            }
                        )

    if not candidates:
        return None

    candidates.sort(
        key=lambda item: (
            item["filedAt"],
            item["periodEnd"],
            1 if item["metricType"] == "netIncome" else 0,
        ),
        reverse=True,
    )
    return candidates[0]


def parse_stockanalysis_snapshot_eps(html_text: str) -> Optional[float]:
    match = re.search(r">EPS</td><td[^>]*>([^<]+)<", str(html_text or ""), flags=re.IGNORECASE)
    return parse_signed_display_number(match.group(1)) if match else None


def parse_stockanalysis_net_income(html_text: str) -> Optional[float]:
    match = re.search(
        r"Net Income(?: to Company)?</div>[\s\S]{0,2200}?<td class=\"svelte-[^\"]+\">([^<]+)</td>",
        str(html_text or ""),
        flags=re.IGNORECASE,
    )
    return parse_signed_display_number(match.group(1)) if match else None


def parse_marketwatch_eps(html_text: str) -> Optional[float]:
    match = re.search(
        r"<small class=\"label\">EPS</small>\s*<span class=\"primary[^\"]*\">([^<]+)</span>",
        str(html_text or ""),
        flags=re.IGNORECASE,
    )
    return parse_signed_display_number(match.group(1)) if match else None


def fetch_sec_profitability_metric(ticker: str, cik: int) -> Optional[Dict[str, Any]]:
    payload = parse_json_text(
        fetch_text(
            SEC_COMPANYFACTS_URL_TEMPLATE.format(cik=int(cik)),
            timeout=20,
            encodings=("utf-8",),
        ),
        f"SEC companyfacts {ticker}",
    )
    metric = extract_sec_profitability_metric(payload)
    if not metric:
        return None
    metric.update(
        {
            "ticker": ticker,
            "lossMaking": metric["value"] < 0,
            "sourceKey": "sec-companyfacts",
            "sourceLabel": SOURCE_LABELS["sec-companyfacts"],
        }
    )
    return metric


def fetch_stockanalysis_snapshot_metric(ticker: str) -> Optional[Dict[str, Any]]:
    html = fetch_text(STOCKANALYSIS_STOCK_URL_TEMPLATE.format(ticker=ticker.lower()), timeout=20, encodings=("utf-8",))
    value = parse_stockanalysis_snapshot_eps(html)
    if value is None:
        return None
    return {
        "ticker": ticker,
        "value": value,
        "lossMaking": value < 0,
        "metricType": "eps",
        "metricKey": "EPS",
        "metricUnit": "USD/shares",
        "taxonomy": "html",
        "form": "",
        "filedAt": "",
        "periodEnd": "",
        "sourceKey": "stockanalysis-eps",
        "sourceLabel": SOURCE_LABELS["stockanalysis-eps"],
    }


def fetch_stockanalysis_net_income_metric(ticker: str) -> Optional[Dict[str, Any]]:
    html = fetch_text(STOCKANALYSIS_FINANCIALS_URL_TEMPLATE.format(ticker=ticker.lower()), timeout=20, encodings=("utf-8",))
    value = parse_stockanalysis_net_income(html)
    if value is None:
        return None
    return {
        "ticker": ticker,
        "value": value,
        "lossMaking": value < 0,
        "metricType": "netIncome",
        "metricKey": "Net Income",
        "metricUnit": "display",
        "taxonomy": "html",
        "form": "",
        "filedAt": "",
        "periodEnd": "",
        "sourceKey": "stockanalysis-net-income",
        "sourceLabel": SOURCE_LABELS["stockanalysis-net-income"],
    }


def fetch_marketwatch_eps_metric(ticker: str) -> Optional[Dict[str, Any]]:
    html = fetch_text(MARKETWATCH_STOCK_URL_TEMPLATE.format(ticker=ticker.lower()), timeout=20, encodings=("utf-8",))
    value = parse_marketwatch_eps(html)
    if value is None:
        return None
    return {
        "ticker": ticker,
        "value": value,
        "lossMaking": value < 0,
        "metricType": "eps",
        "metricKey": "EPS",
        "metricUnit": "USD/shares",
        "taxonomy": "html",
        "form": "",
        "filedAt": "",
        "periodEnd": "",
        "sourceKey": "marketwatch-eps",
        "sourceLabel": SOURCE_LABELS["marketwatch-eps"],
    }


def resolve_ipo_profitability_metric(ticker: str, sec_ticker_cik_map: Optional[Dict[str, int]] = None) -> Optional[Dict[str, Any]]:
    normalized_ticker = str(ticker or "").strip().upper()
    if not normalized_ticker:
        return None

    sec_ticker_cik_map = sec_ticker_cik_map or {}
    cik = sec_ticker_cik_map.get(normalized_ticker)
    resolvers = []
    if cik:
        resolvers.append(lambda: fetch_sec_profitability_metric(normalized_ticker, cik))
    resolvers.extend(
        (
            lambda: fetch_stockanalysis_snapshot_metric(normalized_ticker),
            lambda: fetch_stockanalysis_net_income_metric(normalized_ticker),
            lambda: fetch_marketwatch_eps_metric(normalized_ticker),
        )
    )

    for resolver in resolvers:
        try:
            metric = resolver()
        except (HTTPError, URLError, TimeoutError, ValueError):
            continue
        if metric:
            return metric
    return None


def collect_ipo_profitability_samples(rows: Iterable[Dict[str, Any]]) -> Dict[str, Any]:
    samples = [row for row in rows if str(row.get("ticker") or "").strip()]
    lookup_errors: List[str] = []
    try:
        sec_ticker_cik_map = load_sec_ticker_cik_map()
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        sec_ticker_cik_map = {}
        lookup_errors.append(f"SEC ticker map {normalize_request_error(error)}")

    covered: List[Dict[str, Any]] = []
    missing_tickers: List[str] = []
    source_counter: Counter[str] = Counter()
    for row in samples:
        ticker = str(row.get("ticker") or "").strip().upper()
        metric = resolve_ipo_profitability_metric(ticker, sec_ticker_cik_map)
        if not metric:
            missing_tickers.append(ticker)
            continue
        covered.append(metric)
        source_counter[str(metric["sourceKey"])] += 1

    sample_count = len(samples)
    covered_count = len(covered)
    loss_making_count = sum(1 for metric in covered if metric["lossMaking"])
    coverage_ratio_pct = round((covered_count / sample_count) * 100, 2) if sample_count else 0.0
    loss_making_ratio_pct = round((loss_making_count / covered_count) * 100, 2) if covered_count else None
    ordered_source_keys = [key for key in SOURCE_LABELS if source_counter.get(key)]
    source_summary = " · ".join(f"{SOURCE_LABELS[key]} {source_counter[key]}건" for key in ordered_source_keys)
    source_domains = [SOURCE_DOMAINS[key] for key in ordered_source_keys]

    return {
        "sampleCount": sample_count,
        "coveredCount": covered_count,
        "missingCount": len(missing_tickers),
        "lossMakingCount": loss_making_count,
        "lossMakingRatioPct": loss_making_ratio_pct,
        "coverageRatioPct": coverage_ratio_pct,
        "sourceBreakdown": dict(source_counter),
        "sourceSummary": source_summary,
        "sourceDomains": source_domains,
        "missingTickers": missing_tickers[:8],
        "lookupErrors": lookup_errors[:3],
    }
