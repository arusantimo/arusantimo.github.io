from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class MetricEnvelope:
    metric: str
    value: Any = None
    status: str = "ok"  # ok | blocked | stale | manual_required
    source: str = ""
    confidence: float = 1.0
    stale: bool = False
    errors: list[str] = field(default_factory=list)
    fallback_usage: list[str] = field(default_factory=list)

    def is_filled(self) -> bool:
        if self.status == "blocked":
            return False
        return self.value is not None

    def to_dict(self) -> dict[str, Any]:
        return {
            "metric": self.metric,
            "status": self.status,
            "source": self.source,
            "confidence": self.confidence,
            "stale": self.stale,
            "errors": self.errors,
            "fallbackUsage": self.fallback_usage,
            "filled": self.is_filled(),
        }


CRITICAL_METRICS = frozenset({"overtime_single_board", "eod_open_bet_signals"})


def evaluate_quality(
    envelopes: dict[str, MetricEnvelope],
    required: list[str],
) -> dict[str, Any]:
    required = list(required)
    filled = [name for name in required if envelopes.get(name) and envelopes[name].is_filled()]
    coverage = len(filled) / len(required) if required else 1.0

    missing = [name for name in required if name not in filled]
    critical_failed = [name for name in CRITICAL_METRICS if name in missing]

    optional_missing = [
        name
        for name, env in envelopes.items()
        if name not in required and env.status in {"blocked", "manual_required"}
    ]

    fallback_usage: list[str] = []
    for env in envelopes.values():
        fallback_usage.extend(env.fallback_usage)

    if critical_failed or coverage < 0.85:
        status = "incomplete"
    elif coverage < 1.0:
        status = "degraded"
    elif optional_missing:
        status = "degraded"
    else:
        status = "complete"

    return {
        "status": status,
        "coverage": round(coverage, 4),
        "requiredTotal": len(required),
        "requiredFilled": len(filled),
        "missingRequired": missing,
        "criticalFailed": critical_failed,
        "optionalIssues": optional_missing,
        "fallbackUsage": fallback_usage,
        "metrics": {name: env.to_dict() for name, env in envelopes.items()},
    }
