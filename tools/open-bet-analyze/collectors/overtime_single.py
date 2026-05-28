from __future__ import annotations

import json
import re
from typing import Any
from urllib.error import URLError

from collectors._html import find_stock_code, parse_number, parse_tables
from collectors._stale_fallback import load_recent_metric_snapshot
from router.quality import MetricEnvelope
from scripts.fetch_bridge import ROOT_DIR, fetch_text, make_playwright_request, normalize_request_error

OVERTIME_URL = "https://finance.naver.com/sise/sise_quant_overtime.naver"
MOBILE_API_URL = (
    "https://m.stock.naver.com/api/stocks/exchange/{code}/overtime"
)


def _parse_overtime_html(html: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for table in parse_tables(html):
        for row in table:
            if len(row) < 4:
                continue
            joined = " ".join(row)
            code = find_stock_code(joined)
            if not code:
                continue
            name = row[1] if len(row) > 1 else ""
            change_pct = None
            for cell in row:
                if "%" in cell:
                    change_pct = parse_number(cell.replace("%", ""))
                    break
            if change_pct is None:
                continue
            volume = None
            for cell in reversed(row):
                val = parse_number(cell)
                if val is not None and val > 1000:
                    volume = val
                    break
            price = parse_number(row[2]) if len(row) > 2 else None
            rows.append(
                {
                    "code": code,
                    "name": name.strip(),
                    "ahChangePct": change_pct,
                    "ahPrice": price,
                    "ahVolume": volume,
                }
            )
    # Deduplicate by code
    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for item in rows:
        if item["code"] in seen:
            continue
        seen.add(item["code"])
        unique.append(item)
    return unique


def _is_error_page(html: str) -> bool:
    lowered = html.lower()
    return "error_content" in lowered or len(html) < 4000


def load_fixture_rows() -> list[dict[str, Any]]:
    fixture = ROOT_DIR / "store" / "fixtures" / "overtime_sample.json"
    if not fixture.exists():
        return []
    payload = json.loads(fixture.read_text(encoding="utf-8"))
    return list(payload.get("rows") or [])


def _load_stale_overtime_rows() -> tuple[list[dict[str, Any]], str] | tuple[None, None]:
    snapshot = load_recent_metric_snapshot(
        ROOT_DIR,
        ["overtime_single_board", "overnight_volume", "expected_open"],
        require_rows=True,
    )
    if not snapshot:
        return None, None
    payload = snapshot["payload"]
    rows = list(((payload.get("value") or {}).get("rows") or []))
    if not rows:
        return None, None
    return rows, str(snapshot.get("tradeDate") or "")


def _fetch_overtime_html() -> tuple[str, str, list[str]]:
    errors: list[str] = []
    try:
        return fetch_text(OVERTIME_URL, timeout=15), "naver_html", errors
    except (URLError, OSError, TimeoutError) as error:
        errors.append(f"urllib: {normalize_request_error(error)}")
    try:
        payload = make_playwright_request(OVERTIME_URL, timeout=20)
        for enc in ("euc-kr", "cp949", "utf-8"):
            try:
                return payload.decode(enc), "playwright", errors
            except UnicodeDecodeError:
                continue
        return payload.decode("utf-8", errors="replace"), "playwright", errors
    except (URLError, OSError, TimeoutError) as error:
        errors.append(f"playwright: {normalize_request_error(error)}")
    raise URLError("; ".join(errors) or "overtime fetch failed")


def collect_overtime_board(
    *,
    save_raw: bool = True,
    trade_date: str = "",
    use_fixture: bool = False,
) -> MetricEnvelope:
    if use_fixture:
        rows = load_fixture_rows()
        if rows:
            return MetricEnvelope(
                metric="overtime_single_board",
                value={"rows": rows, "count": len(rows)},
                source="fixture",
                confidence=1.0,
            )
    stale_rows, stale_date = _load_stale_overtime_rows()
    fallback: list[str] = []
    try:
        html, source, errors = _fetch_overtime_html()
        fallback.extend(errors)
        if _is_error_page(html):
            fixture_rows = load_fixture_rows()
            if fixture_rows:
                return MetricEnvelope(
                    metric="overtime_single_board",
                    value={"rows": fixture_rows, "count": len(fixture_rows)},
                    source="fixture_fallback",
                    confidence=0.5,
                    stale=True,
                    errors=["naver error page — fixture fallback"],
                    fallback_usage=fallback,
                )
            if stale_rows:
                return MetricEnvelope(
                    metric="overtime_single_board",
                    value={"rows": stale_rows, "count": len(stale_rows)},
                    source="raw_snapshot",
                    confidence=0.55,
                    stale=True,
                    errors=[f"naver overtime unavailable (error page) — snapshot {stale_date} fallback"],
                    fallback_usage=fallback,
                )
            return MetricEnvelope(
                metric="overtime_single_board",
                status="blocked",
                source=source,
                confidence=0.0,
                errors=["naver overtime unavailable (error page)"],
                fallback_usage=fallback,
            )
        rows = _parse_overtime_html(html)
        if not rows:
            # Regex fallback for Naver markup variants
            pattern = re.compile(
                r"(\d{6})[^%]{0,80}?([+-]?\d+\.?\d*)%",
                re.DOTALL,
            )
            for match in pattern.finditer(html):
                rows.append(
                    {
                        "code": match.group(1),
                        "name": "",
                        "ahChangePct": float(match.group(2)),
                        "ahPrice": None,
                        "ahVolume": None,
                    }
                )
        if save_raw and trade_date:
            raw_dir = ROOT_DIR / "store" / "raw" / trade_date
            raw_dir.mkdir(parents=True, exist_ok=True)
            (raw_dir / "overtime_single_board.json").write_text(
                json.dumps({"rows": rows, "source": source}, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
        if not rows:
            if stale_rows:
                return MetricEnvelope(
                    metric="overtime_single_board",
                    value={"rows": stale_rows, "count": len(stale_rows)},
                    source="raw_snapshot",
                    confidence=0.55,
                    stale=True,
                    errors=[f"parsed 0 rows — snapshot {stale_date} fallback"],
                    fallback_usage=fallback,
                )
            return MetricEnvelope(
                metric="overtime_single_board",
                status="blocked",
                source=source,
                confidence=0.0,
                errors=["parsed 0 rows"],
                fallback_usage=fallback,
            )
        return MetricEnvelope(
            metric="overtime_single_board",
            value={"rows": rows, "count": len(rows)},
            source=source,
            confidence=0.85 if source == "naver_html" else 0.75,
            fallback_usage=fallback,
        )
    except (URLError, OSError, TimeoutError) as error:
        if stale_rows:
            return MetricEnvelope(
                metric="overtime_single_board",
                value={"rows": stale_rows, "count": len(stale_rows)},
                source="raw_snapshot",
                confidence=0.55,
                stale=True,
                errors=[f"{normalize_request_error(error)} — snapshot {stale_date} fallback"],
                fallback_usage=fallback,
            )
        return MetricEnvelope(
            metric="overtime_single_board",
            status="blocked",
            confidence=0.0,
            errors=[normalize_request_error(error)],
            fallback_usage=fallback,
        )
