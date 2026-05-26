from __future__ import annotations

import json
from pathlib import Path
from typing import Any
from urllib.error import URLError

from router.quality import MetricEnvelope
from scripts.fetch_bridge import fetch_json, normalize_request_error

ROOT_DIR = Path(__file__).resolve().parent.parent

YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=5d"
SYMBOLS = {
    "nq": "%5ENDX",
    "vix": "^VIX",
    "sox": "^SOX",
    "us10y": "^TNX",
    "usdkrw": "KRW=X",
}


def _yahoo_change_pct(symbol: str) -> float | None:
    url = YAHOO_CHART.format(symbol=symbol)
    try:
        payload = fetch_json(url, timeout=12)
    except (URLError, OSError, json.JSONDecodeError):
        return None
    result = (payload.get("chart") or {}).get("result") or []
    if not result:
        return None
    meta = result[0].get("meta") or {}
    regular = meta.get("regularMarketPrice")
    prev = meta.get("chartPreviousClose") or meta.get("previousClose")
    if regular is None or prev in (None, 0):
        return None
    return round((float(regular) - float(prev)) / float(prev) * 100, 3)


def _gap_grade(total: float) -> str:
    if total >= 7:
        return "G-A"
    if total >= 2:
        return "G-B"
    if total >= -2.9:
        return "G-C"
    if total >= -7.9:
        return "G-D"
    return "G-E"


def _gap_score_bundle() -> dict[str, Any]:
    nq = _yahoo_change_pct(SYMBOLS["nq"])
    vix_level = None
    vix_payload = None
    try:
        vix_payload = fetch_json(YAHOO_CHART.format(symbol=SYMBOLS["vix"]), timeout=12)
        result = (vix_payload.get("chart") or {}).get("result") or []
        if result:
            vix_level = (result[0].get("meta") or {}).get("regularMarketPrice")
    except (URLError, OSError, json.JSONDecodeError):
        pass

    sox = _yahoo_change_pct(SYMBOLS["sox"])
    us10y = _yahoo_change_pct(SYMBOLS["us10y"])
    usdkrw = _yahoo_change_pct(SYMBOLS["usdkrw"])

    rows: list[dict[str, Any]] = []
    total = 0.0

    def add_row(name: str, raw: float | None, base: float, weight: float) -> None:
        nonlocal total
        if raw is None:
            rows.append({"name": name, "baseScore": None, "weight": weight, "applied": None})
            return
        if name == "VIX":
            if raw >= 30:
                base_score = -2
            elif raw >= 25:
                base_score = -1
            else:
                base_score = 0
            applied = base_score * weight
        else:
            if raw >= 1.5:
                base_score = 2
            elif raw >= 0.3:
                base_score = 1
            elif raw <= -1.5:
                base_score = -2
            elif raw <= -0.3:
                base_score = -1
            else:
                base_score = 0
            applied = base_score * weight
        total += applied
        rows.append(
            {
                "name": name,
                "raw": raw,
                "baseScore": base_score,
                "weight": weight,
                "applied": round(applied, 2),
            }
        )

    add_row("NQ", nq, 0, 2.5)
    add_row("VIX", float(vix_level) if vix_level is not None else None, 0, 2.0)
    add_row("US10Y", us10y, 0, 1.5)
    add_row("USDKRW", usdkrw, 0, 1.5)
    add_row("SOX", sox, 0, 1.0)

    return {
        "rows": rows,
        "totalScore": round(total, 2),
        "grade": _gap_grade(total),
        "nq": nq,
        "vix": vix_level,
        "sox": sox,
        "us10y": us10y,
        "usdkrw": usdkrw,
    }


def _load_macro_fixture() -> dict[str, Any] | None:
    path = ROOT_DIR / "store" / "fixtures" / "macro_sample.json"
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def collect_global_macro(*, use_fixture: bool = False) -> MetricEnvelope:
    if use_fixture:
        fixture = _load_macro_fixture()
        if fixture:
            return MetricEnvelope(
                metric="global_gap_bundle",
                value=fixture,
                source="fixture",
                confidence=1.0,
            )
    try:
        bundle = _gap_score_bundle()
        if bundle.get("nq") is None and bundle.get("vix") is None:
            fixture = _load_macro_fixture()
            if fixture:
                return MetricEnvelope(
                    metric="global_gap_bundle",
                    value=fixture,
                    source="fixture_fallback",
                    confidence=0.5,
                    stale=True,
                    errors=["macro quotes unavailable — fixture fallback"],
                )
            return MetricEnvelope(
                metric="global_gap_bundle",
                status="blocked",
                source="yahoo_chart",
                confidence=0.0,
                errors=["macro quotes unavailable"],
            )
        return MetricEnvelope(
            metric="global_gap_bundle",
            value=bundle,
            source="yahoo_chart",
            confidence=0.8,
        )
    except (URLError, OSError, TimeoutError) as error:
        fixture = _load_macro_fixture()
        if fixture:
            return MetricEnvelope(
                metric="global_gap_bundle",
                value=fixture,
                source="fixture_fallback",
                confidence=0.5,
                stale=True,
                errors=[normalize_request_error(error)],
            )
        return MetricEnvelope(
            metric="global_gap_bundle",
            status="blocked",
            confidence=0.0,
            errors=[normalize_request_error(error)],
        )


def collect_night_future() -> MetricEnvelope:
    """KOSPI200 선물 프록시 — Yahoo NQ intraday as fallback when Naver blocked."""
    change = _yahoo_change_pct("%5ENDX")
    if change is None:
        return MetricEnvelope(
            metric="night_kospi_future",
            status="blocked",
            source="yahoo_proxy",
            confidence=0.4,
            errors=["night future proxy unavailable"],
        )
    return MetricEnvelope(
        metric="night_kospi_future",
        value={"changePct": change, "sourceNote": "NQ proxy"},
        source="yahoo_proxy",
        confidence=0.5,
    )
