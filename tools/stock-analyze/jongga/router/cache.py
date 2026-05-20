from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

from jongga.collectors.base import CollectResult, utc_now_iso


def _safe_part(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value.strip()) or "default"


class FileCache:
    def __init__(self, root: str | Path) -> None:
        self.root = Path(root)

    def _path(self, metric: str, key: str) -> Path:
        return self.root / _safe_part(metric) / f"{_safe_part(key)}.json"

    def put(self, result: CollectResult) -> None:
        path = self._path(result.metric, result.key)
        path.parent.mkdir(parents=True, exist_ok=True)
        payload = {"cachedAt": utc_now_iso(), "result": result.to_dict()}
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    def get(self, metric: str, key: str, max_age_seconds: int, allow_stale: bool = True) -> CollectResult | None:
        path = self._path(metric, key)
        if not path.exists():
            return None
        payload = json.loads(path.read_text(encoding="utf-8"))
        result = CollectResult.from_dict(payload["result"])
        cached_at = datetime.fromisoformat(payload["cachedAt"])
        age = (datetime.now(timezone.utc) - cached_at).total_seconds()
        if age > max_age_seconds and not allow_stale:
            return None
        result.provider = "cache"
        result.layer = "cache"
        result.stale = age > max_age_seconds
        result.fallback_level = max(result.fallback_level, 99)
        result.confidence = min(result.confidence, 0.55 if result.stale else 0.75)
        result.audit = {**result.audit, "cachedAt": payload["cachedAt"], "cacheAgeSeconds": round(age)}
        return result

