from __future__ import annotations

from typing import Any

from jongga.collectors.base import CollectResult
from jongga.router.audit import AuditRecorder


def build_data_quality(results: dict[str, CollectResult], audit: AuditRecorder) -> dict[str, Any]:
    failed = [key for key, result in results.items() if not result.ok]
    stale = [key for key, result in results.items() if result.stale]
    manual = [key for key, result in results.items() if result.layer == "manual_override"]
    fallback = [key for key, result in results.items() if result.fallback_level > 1]

    if failed:
        status = "failed"
    elif stale or manual or fallback:
        status = "partial"
    else:
        status = "complete"

    return {
        "status": status,
        "counts": {
            "total": len(results),
            "failed": len(failed),
            "stale": len(stale),
            "manual": len(manual),
            "fallback": len(fallback),
        },
        "failedKeys": failed,
        "staleKeys": stale,
        "manualKeys": manual,
        "fallbackKeys": fallback,
        "providerHealth": audit.provider_health(),
        "fallbackUsage": _fallback_usage(results),
    }


def _fallback_usage(results: dict[str, CollectResult]) -> list[dict[str, Any]]:
    rows = []
    for key, result in results.items():
        if result.fallback_level <= 1:
            continue
        rows.append({
            "key": key,
            "provider": result.provider,
            "layer": result.layer,
            "fallbackLevel": result.fallback_level,
            "confidence": result.confidence,
            "stale": result.stale,
        })
    return rows

