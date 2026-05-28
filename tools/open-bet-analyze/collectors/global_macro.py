from __future__ import annotations

import json
from pathlib import Path
from typing import Any
from urllib.error import URLError

from collectors._stale_fallback import load_market_analyze_latest_data, load_recent_metric_snapshot
from router.quality import MetricEnvelope
from scripts.fetch_bridge import fetch_json, fetch_text, normalize_request_error

ROOT_DIR = Path(__file__).resolve().parent.parent

YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=5d"
SYMBOLS = {
    "nq": "%5ENDX",
    "vix": "^VIX",
    "sox": "^SOX",
    "us10y": "^TNX",
    "usdkrw": "KRW=X",
}


def _parse_json_fragment(text: str) -> Any:
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end <= start:
        raise json.JSONDecodeError("JSON payload missing", text, 0)
    return json.loads(text[start : end + 1])


def _fetch_yahoo_chart_payload(symbol: str) -> dict[str, Any] | None:
    encoded = str(symbol)
    urls = [
        f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded}?interval=1d&range=5d",
        f"https://query2.finance.yahoo.com/v8/finance/chart/{encoded}?interval=1d&range=5d",
    ]
    for url in urls:
        try:
            return fetch_json(url, timeout=12)
        except (URLError, OSError, json.JSONDecodeError):
            continue
    try:
        text = fetch_text(f"https://r.jina.ai/http://query1.finance.yahoo.com/v8/finance/chart/{encoded}?interval=1d&range=5d", timeout=20, encoding="utf-8")
        payload = _parse_json_fragment(text)
        return payload if isinstance(payload, dict) else None
    except (URLError, OSError, json.JSONDecodeError):
        return None


def _yahoo_change_pct(symbol: str) -> float | None:
    payload = _fetch_yahoo_chart_payload(symbol)
    if not payload:
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
    vix_payload = _fetch_yahoo_chart_payload(SYMBOLS["vix"])
    if vix_payload:
        result = (vix_payload.get("chart") or {}).get("result") or []
        if result:
            vix_level = (result[0].get("meta") or {}).get("regularMarketPrice")
    if vix_level is None:
        market_data = load_market_analyze_latest_data(ROOT_DIR) or {}
        vix_candidate = market_data.get("vix")
        if isinstance(vix_candidate, (int, float)):
            vix_level = float(vix_candidate)

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


def _load_recent_macro_snapshot() -> tuple[dict[str, Any], str] | tuple[None, None]:
    snapshot = load_recent_metric_snapshot(ROOT_DIR, ["global_gap_bundle"])
    if not snapshot:
        return None, None
    payload = snapshot["payload"]
    value = payload.get("value")
    if not isinstance(value, dict):
        return None, None
    return value, str(snapshot.get("tradeDate") or "")


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
    recent_snapshot, snapshot_date = _load_recent_macro_snapshot()
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
            if recent_snapshot:
                return MetricEnvelope(
                    metric="global_gap_bundle",
                    value=recent_snapshot,
                    source="raw_snapshot",
                    confidence=0.55,
                    stale=True,
                    errors=[f"macro quotes unavailable — snapshot {snapshot_date} fallback"],
                )
            return MetricEnvelope(
                metric="global_gap_bundle",
                status="blocked",
                source="yahoo_chart",
                confidence=0.0,
                errors=["macro quotes unavailable"],
            )
        confidence = 0.8 if bundle.get("nq") is not None else 0.55
        return MetricEnvelope(
            metric="global_gap_bundle",
            value=bundle,
            source="yahoo_chart" if bundle.get("nq") is not None else "market_snapshot_mix",
            confidence=confidence,
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
        if recent_snapshot:
            return MetricEnvelope(
                metric="global_gap_bundle",
                value=recent_snapshot,
                source="raw_snapshot",
                confidence=0.55,
                stale=True,
                errors=[f"{normalize_request_error(error)} — snapshot {snapshot_date} fallback"],
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
        snapshot = load_recent_metric_snapshot(ROOT_DIR, ["night_kospi_future"])
        if snapshot:
            payload = snapshot["payload"]
            value = payload.get("value")
            if isinstance(value, dict) and value.get("changePct") is not None:
                return MetricEnvelope(
                    metric="night_kospi_future",
                    value=value,
                    source="raw_snapshot",
                    confidence=0.5,
                    stale=True,
                    errors=[f"night future proxy unavailable — snapshot {snapshot['tradeDate']} fallback"],
                )
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
