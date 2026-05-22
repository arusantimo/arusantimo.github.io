from __future__ import annotations

import json
from copy import deepcopy
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


try:
    KST = ZoneInfo("Asia/Seoul")
except ZoneInfoNotFoundError:
    KST = timezone(timedelta(hours=9), name="KST")
STRATEGY_ORDER = ("pullback", "momentum", "reversal", "swing")


def resolve_analysis_date(value: str | None = None) -> date:
    if value:
        return date.fromisoformat(value)
    return datetime.now(KST).date()


def compact_date(value: date | str) -> str:
    if isinstance(value, str):
        value = date.fromisoformat(value)
    return value.strftime("%Y%m%d")


def build_daily_output_paths(out_dir: str | Path, analysis_date: date) -> tuple[Path, Path]:
    directory = Path(out_dir)
    compact = compact_date(analysis_date)
    return directory / f"latest_{compact}.json", directory / f"jongga_data_{compact}.js"


def payload_with_analysis_date(payload: dict[str, Any], analysis_date: date) -> dict[str, Any]:
    next_payload = deepcopy(payload)
    next_payload["analysisDate"] = analysis_date.isoformat()
    return next_payload


def render_daily_bridge_js(payload: dict[str, Any]) -> str:
    analysis_date = str(payload.get("analysisDate") or "").strip()
    if not analysis_date:
        raise ValueError("payload.analysisDate is required")
    return (
        "window.JONGGA_DAILY_DATA = window.JONGGA_DAILY_DATA || {};\n"
        f"window.JONGGA_DAILY_DATA[{json.dumps(analysis_date)}] = "
        f"{json.dumps(payload, ensure_ascii=False, indent=2)};\n"
    )


def render_history_bridge_js(entries: list[dict[str, Any]]) -> str:
    return f"window.JONGGA_HISTORY_INDEX = {json.dumps(entries, ensure_ascii=False, indent=2)};\n"


def read_history_index(path: str | Path) -> list[dict[str, Any]]:
    history_path = Path(path)
    if not history_path.exists():
        return []
    text = history_path.read_text(encoding="utf-8")
    start = text.find("[")
    end = text.rfind("]")
    if start < 0 or end <= start:
        return []
    parsed = json.loads(text[start:end + 1])
    return parsed if isinstance(parsed, list) else []


def web_path(path: str | Path) -> str:
    candidate = Path(path)
    try:
        if candidate.is_absolute():
            candidate = candidate.relative_to(Path.cwd())
    except ValueError:
        pass
    return candidate.as_posix()


def build_history_entry(
    payload: dict[str, Any],
    daily_js_path: str | Path,
    daily_json_path: str | Path,
    *,
    top_limit: int = 10,
) -> dict[str, Any]:
    quality = payload.get("dataQuality") if isinstance(payload.get("dataQuality"), dict) else {}
    return {
        "date": str(payload.get("analysisDate") or ""),
        "jsFile": web_path(daily_js_path),
        "jsonFile": web_path(daily_json_path),
        "generatedAt": payload.get("generatedAt") or "",
        "status": quality.get("status") or "unknown",
        "buyCount": count_buy_entries(payload),
        "topRecommendations": extract_top_recommendations(payload, limit=top_limit),
    }


def update_history_index(existing: list[dict[str, Any]], entry: dict[str, Any]) -> list[dict[str, Any]]:
    target_date = entry.get("date")
    merged = [item for item in existing if item.get("date") != target_date]
    merged.append(entry)
    return sorted(merged, key=lambda item: str(item.get("date") or ""), reverse=True)


def write_daily_outputs(
    payload: dict[str, Any],
    out_dir: str | Path,
    history_js_path: str | Path,
    *,
    top_limit: int = 10,
) -> tuple[Path, Path, Path]:
    raw_date = payload.get("analysisDate")
    analysis_date = resolve_analysis_date(str(raw_date) if raw_date else None)
    json_path, js_path = build_daily_output_paths(out_dir, analysis_date)
    history_path = Path(history_js_path)

    json_path.parent.mkdir(parents=True, exist_ok=True)
    history_path.parent.mkdir(parents=True, exist_ok=True)

    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    js_path.write_text(render_daily_bridge_js(payload), encoding="utf-8")

    entry = build_history_entry(payload, js_path, json_path, top_limit=top_limit)
    history = update_history_index(read_history_index(history_path), entry)
    history_path.write_text(render_history_bridge_js(history), encoding="utf-8")
    return json_path, js_path, history_path


def count_buy_entries(payload: dict[str, Any]) -> int:
    total = 0
    for _, entry in iter_buy_entries(payload):
        total += 1
    return total


def extract_top_recommendations(payload: dict[str, Any], *, limit: int = 10) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for strategy, entry in iter_buy_entries(payload):
        rows.append({
            "strategy": strategy,
            "name": entry.get("name") or "",
            "code": entry.get("code") or "",
            "score": entry.get("score"),
            "grade": entry.get("grade") or "",
            "statusLabel": entry.get("statusLabel") or entry.get("status") or "",
        })
    rows.sort(key=lambda item: _score_sort_value(item.get("score")), reverse=True)
    return rows[:limit]


def iter_buy_entries(payload: dict[str, Any]):
    for slot in payload.get("slots") or []:
        entries = slot.get("entries") if isinstance(slot, dict) else {}
        if not isinstance(entries, dict):
            continue
        for strategy in STRATEGY_ORDER:
            for entry in entries.get(strategy) or []:
                if isinstance(entry, dict):
                    yield strategy, entry


def _score_sort_value(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float("-inf")
