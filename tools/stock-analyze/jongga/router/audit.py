from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

from jongga.collectors.base import utc_now_iso


class AuditRecorder:
    def __init__(self, root: str | Path | None = None) -> None:
        self.root = Path(root) if root else None
        self.events: list[dict[str, Any]] = []

    def record(self, event: dict[str, Any]) -> None:
        enriched = {"at": utc_now_iso(), **event}
        self.events.append(enriched)
        if not self.root:
            return
        self.root.mkdir(parents=True, exist_ok=True)
        path = self.root / f"{datetime.now().strftime('%Y%m%d')}-collection.jsonl"
        with path.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(enriched, ensure_ascii=False) + "\n")

    def provider_health(self) -> dict[str, dict[str, int]]:
        health: dict[str, dict[str, int]] = {}
        for event in self.events:
            provider = str(event.get("provider", "unknown"))
            status = str(event.get("status", "unknown"))
            row = health.setdefault(provider, {})
            row[status] = row.get(status, 0) + 1
        return health

