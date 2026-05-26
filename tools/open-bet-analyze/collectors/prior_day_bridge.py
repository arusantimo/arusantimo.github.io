from __future__ import annotations

import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from router.quality import MetricEnvelope

ROOT_DIR = Path(__file__).resolve().parent.parent
JONGGA_OUTPUT = ROOT_DIR.parent / "stock-analyze" / "jongga" / "output"
KST = timezone(timedelta(hours=9))


def _find_jongga_file(trade_date: str) -> Path | None:
    candidates = [
        JONGGA_OUTPUT / f"latest_{trade_date}.json",
        JONGGA_OUTPUT / "latest.json",
        JONGGA_OUTPUT / f"latest_{trade_date}_canary.json",
    ]
    for path in candidates:
        if path.exists():
            return path
    dated_js = sorted(JONGGA_OUTPUT.glob("jongga_data_*.js"), reverse=True)
    if dated_js:
        return dated_js[0]
    return None


def _load_json_or_js(path: Path) -> dict[str, Any]:
    raw = path.read_text(encoding="utf-8")
    if path.suffix == ".js":
        start = raw.find("{")
        end = raw.rfind("}")
        if start < 0 or end < 0:
            return {}
        raw = raw[start : end + 1]
    return json.loads(raw)


def _extract_regime(payload: dict[str, Any]) -> dict[str, Any]:
    slots = payload.get("slots") or []
    if not slots:
        return {}
    regime_table = (slots[0].get("regime") or {}).get("table") or []
    result: dict[str, Any] = {}
    for row in regime_table:
        if not isinstance(row, dict):
            continue
        item = str(row.get("item") or "").strip()
        value = row.get("value")
        if item:
            result[item] = value
    return result


def _extract_open_bet_candidates(payload: dict[str, Any]) -> list[dict[str, Any]]:
    slots = payload.get("slots") or []
    if not slots:
        return []
    entries = slots[0].get("entries") or {}
    for key in ("openBet", "openingBet", "open_bet", "시가베팅"):
        block = entries.get(key)
        if isinstance(block, list):
            return [row for row in block if isinstance(row, dict)]
    # Search nested sections
    sections = slots[0].get("sections") or {}
    signals = sections.get("openBetSignals") or sections.get("시가베팅시그널")
    if isinstance(signals, list):
        return [row for row in signals if isinstance(row, dict)]
    return []


def _extract_gap_score(payload: dict[str, Any]) -> dict[str, Any]:
    slots = payload.get("slots") or []
    if not slots:
        return {}
    gap = slots[0].get("gapScore") or {}
    return gap if isinstance(gap, dict) else {}


def collect_eod_signals(trade_date: str | None = None) -> MetricEnvelope:
    current = datetime.now(KST)
    date_key = trade_date or current.strftime("%Y%m%d")
    path = _find_jongga_file(date_key)
    if not path:
        return MetricEnvelope(
            metric="eod_open_bet_signals",
            status="blocked",
            source="jongga_json_bridge",
            confidence=0.0,
            errors=[f"jongga file not found for {date_key}"],
        )
    try:
        payload = _load_json_or_js(path)
    except (OSError, json.JSONDecodeError) as error:
        return MetricEnvelope(
            metric="eod_open_bet_signals",
            status="blocked",
            source="jongga_json_bridge",
            confidence=0.0,
            errors=[str(error)],
        )

    regime = _extract_regime(payload)
    opening_label = str(regime.get("시가베팅") or regime.get("openingBet") or "")
    open_active = "활성" in opening_label or "active" in opening_label.lower()
    regime_label = str(regime.get("레짐") or regime.get("regime") or "")

    value = {
        "sourceFile": str(path.name),
        "regime": regime_label,
        "openBetActive": open_active,
        "openingBetLabel": opening_label,
        "gapScore": _extract_gap_score(payload),
        "candidates": _extract_open_bet_candidates(payload),
        "vkospi": regime.get("VKOSPI") or regime.get("vkospi"),
    }
    return MetricEnvelope(
        metric="eod_open_bet_signals",
        value=value,
        source="jongga_json_bridge",
        confidence=1.0,
    )
