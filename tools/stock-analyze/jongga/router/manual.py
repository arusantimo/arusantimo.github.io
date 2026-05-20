from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from jongga.collectors.base import CollectResult


def _safe_part(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value.strip()) or "default"


class ManualOverrideStore:
    def __init__(self, root: str | Path) -> None:
        self.root = Path(root)

    def get(self, metric: str, key: str) -> CollectResult | None:
        candidates = [
            self.root / f"{_safe_part(metric)}__{_safe_part(key)}.json",
            self.root / f"{_safe_part(metric)}.json",
            self.root / "overrides.json",
        ]
        for path in candidates:
            if not path.exists():
                continue
            payload = json.loads(path.read_text(encoding="utf-8"))
            item = self._resolve_payload(payload, metric, key)
            if item is None:
                continue
            return CollectResult(
                metric=metric,
                key=key,
                value=item.get("value"),
                raw=item.get("raw"),
                provider="manual_override",
                layer="manual_override",
                confidence=float(item.get("confidence", 0.8)),
                source_url=str(path),
                audit={"manualPath": str(path), "reason": item.get("reason", "")},
            )
        return None

    @staticmethod
    def _resolve_payload(payload: Any, metric: str, key: str) -> dict[str, Any] | None:
        if isinstance(payload, dict) and "value" in payload:
            return payload
        metric_payload = payload.get(metric) if isinstance(payload, dict) else None
        if isinstance(metric_payload, dict) and key in metric_payload:
            return metric_payload[key]
        if isinstance(metric_payload, dict) and "default" in metric_payload:
            return metric_payload["default"]
        return None

