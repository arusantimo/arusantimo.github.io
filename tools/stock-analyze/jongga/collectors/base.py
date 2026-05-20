from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from hashlib import sha256
from typing import Any


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def stable_hash(text: str) -> str:
    return sha256(text.encode("utf-8", errors="ignore")).hexdigest()


class CollectorError(RuntimeError):
    """Raised when a collector cannot produce a usable result."""


class ManualRequired(CollectorError):
    """Raised when safe automation must stop and ask for manual data."""


class MissingCredentials(CollectorError):
    """Raised when an optional authenticated provider is not configured."""


@dataclass(frozen=True)
class CollectionRequest:
    metric: str
    key: str = "default"
    params: dict[str, Any] = field(default_factory=dict)


@dataclass
class CollectResult:
    metric: str
    key: str
    value: Any
    provider: str
    layer: str
    status: str = "ok"
    source_url: str = ""
    as_of: str = field(default_factory=utc_now_iso)
    confidence: float = 1.0
    stale: bool = False
    fallback_level: int = 0
    raw: Any = None
    errors: list[str] = field(default_factory=list)
    audit: dict[str, Any] = field(default_factory=dict)

    @property
    def ok(self) -> bool:
        return self.status == "ok"

    def to_dict(self) -> dict[str, Any]:
        return {
            "metric": self.metric,
            "key": self.key,
            "value": self.value,
            "provider": self.provider,
            "layer": self.layer,
            "status": self.status,
            "sourceUrl": self.source_url,
            "asOf": self.as_of,
            "confidence": self.confidence,
            "stale": self.stale,
            "fallbackLevel": self.fallback_level,
            "raw": self.raw,
            "errors": self.errors,
            "audit": self.audit,
        }

    @classmethod
    def from_dict(cls, payload: dict[str, Any]) -> "CollectResult":
        return cls(
            metric=str(payload.get("metric", "")),
            key=str(payload.get("key", "default")),
            value=payload.get("value"),
            provider=str(payload.get("provider", "")),
            layer=str(payload.get("layer", "")),
            status=str(payload.get("status", "ok")),
            source_url=str(payload.get("sourceUrl", "")),
            as_of=str(payload.get("asOf", utc_now_iso())),
            confidence=float(payload.get("confidence", 0.0)),
            stale=bool(payload.get("stale", False)),
            fallback_level=int(payload.get("fallbackLevel", 0)),
            raw=payload.get("raw"),
            errors=list(payload.get("errors", [])),
            audit=dict(payload.get("audit", {})),
        )


class BaseCollector:
    provider = "base"
    layer = "api"

    def collect(self, request: CollectionRequest) -> CollectResult:
        raise NotImplementedError

