from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Iterable


def _raw_date_dirs(root_dir: Path) -> list[Path]:
    raw_root = root_dir / "store" / "raw"
    if not raw_root.exists():
        return []
    return sorted(
        [path for path in raw_root.iterdir() if path.is_dir() and path.name.isdigit()],
        key=lambda path: path.name,
        reverse=True,
    )


def load_recent_metric_snapshot(
    root_dir: Path,
    metric_names: Iterable[str],
    *,
    require_rows: bool = False,
) -> dict[str, Any] | None:
    names = [str(name) for name in metric_names if str(name).strip()]
    if not names:
        return None
    for date_dir in _raw_date_dirs(root_dir):
        for metric_name in names:
            path = date_dir / f"{metric_name}.json"
            if not path.exists():
                continue
            try:
                payload = json.loads(path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                continue
            if not isinstance(payload, dict):
                continue
            value = payload.get("value")
            if payload.get("status") == "blocked" or value is None:
                continue
            rows = (value or {}).get("rows") if isinstance(value, dict) else None
            if require_rows and not rows:
                continue
            return {
                "metric": metric_name,
                "tradeDate": date_dir.name,
                "payload": payload,
            }
    return None


def load_market_analyze_latest_data(root_dir: Path) -> dict[str, Any] | None:
    path = root_dir.parent / "market-analyze" / "store" / "results" / "latest.js"
    if not path.exists():
        return None
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError:
        return None
    start = raw.find("{")
    end = raw.rfind("}")
    if start < 0 or end <= start:
        return None
    try:
        payload = json.loads(raw[start : end + 1])
    except json.JSONDecodeError:
        return None
    data = payload.get("data")
    return data if isinstance(data, dict) else None
