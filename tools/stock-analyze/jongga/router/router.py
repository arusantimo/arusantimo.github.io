from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any

from jongga.collectors.base import (
    BaseCollector,
    CollectResult,
    CollectionRequest,
    CollectorError,
    ManualRequired,
    MissingCredentials,
)
from jongga.router.audit import AuditRecorder
from jongga.router.cache import FileCache
from jongga.router.manual import ManualOverrideStore


@dataclass
class CircuitBreaker:
    max_failures: int = 3
    cooldown_seconds: float = 60.0
    failures: dict[str, int] = field(default_factory=dict)
    opened_at: dict[str, float] = field(default_factory=dict)

    def allow(self, provider: str) -> bool:
        opened = self.opened_at.get(provider)
        if opened is None:
            return True
        if time.time() - opened >= self.cooldown_seconds:
            self.failures[provider] = 0
            self.opened_at.pop(provider, None)
            return True
        return False

    def success(self, provider: str) -> None:
        self.failures[provider] = 0
        self.opened_at.pop(provider, None)

    def failure(self, provider: str) -> None:
        count = self.failures.get(provider, 0) + 1
        self.failures[provider] = count
        if count >= self.max_failures:
            self.opened_at[provider] = time.time()


class DataRouter:
    def __init__(
        self,
        collectors: dict[str, BaseCollector],
        policies: dict[str, Any],
        cache: FileCache | None = None,
        overrides: ManualOverrideStore | None = None,
        audit: AuditRecorder | None = None,
        breaker: CircuitBreaker | None = None,
    ) -> None:
        self.collectors = collectors
        self.policies = policies
        self.cache = cache
        self.overrides = overrides
        self.audit = audit or AuditRecorder()
        self.breaker = breaker or CircuitBreaker()

    def collect(self, metric: str, key: str = "default", params: dict[str, Any] | None = None) -> CollectResult:
        policy = self.policies["metrics"][metric]
        min_confidence = float(policy.get("minConfidence", 0.0))
        merged_params = {**policy.get("params", {}), **(params or {})}

        for fallback_level, route in enumerate(policy.get("routes", []), start=1):
            provider = route["provider"]
            if not self.breaker.allow(provider):
                self._record(metric, key, provider, "circuit_open", fallback_level)
                continue
            collector = self.collectors.get(provider)
            if collector is None:
                self._record(metric, key, provider, "missing_collector", fallback_level)
                continue
            try:
                request = CollectionRequest(metric=metric, key=key, params={**merged_params, **route.get("params", {})})
                result = collector.collect(request)
                result.fallback_level = fallback_level
                if result.ok and result.confidence >= min_confidence:
                    self.breaker.success(provider)
                    self._record(metric, key, provider, "ok", fallback_level, result)
                    if self.cache and route.get("cache", True):
                        self.cache.put(result)
                    return result
                self.breaker.failure(provider)
                self._record(metric, key, provider, "low_confidence", fallback_level, result)
            except MissingCredentials as error:
                self._record(metric, key, provider, "missing_credentials", fallback_level, error=error)
            except ManualRequired as error:
                self.breaker.failure(provider)
                self._record(metric, key, provider, "manual_required", fallback_level, error=error)
            except CollectorError as error:
                self.breaker.failure(provider)
                self._record(metric, key, provider, "failed", fallback_level, error=error)

        cached = self._cache_fallback(metric, key, policy)
        if cached:
            return cached
        manual = self._manual_fallback(metric, key)
        if manual:
            return manual
        return CollectResult(
            metric=metric,
            key=key,
            value=None,
            provider="router",
            layer="router",
            status="failed",
            confidence=0.0,
            errors=[f"all routes failed for {metric}:{key}"],
        )

    def _cache_fallback(self, metric: str, key: str, policy: dict[str, Any]) -> CollectResult | None:
        if not self.cache:
            return None
        cache_policy = policy.get("cache", {})
        result = self.cache.get(metric, key, int(cache_policy.get("ttlSeconds", 86400)), bool(cache_policy.get("allowStale", True)))
        if result:
            self._record(metric, key, "cache", "ok_stale" if result.stale else "ok", result.fallback_level, result)
        return result

    def _manual_fallback(self, metric: str, key: str) -> CollectResult | None:
        if not self.overrides:
            return None
        result = self.overrides.get(metric, key)
        if result:
            self._record(metric, key, "manual_override", "ok", 100, result)
        return result

    def _record(self, metric: str, key: str, provider: str, status: str, fallback_level: int, result: CollectResult | None = None, error: Exception | None = None) -> None:
        self.audit.record({
            "metric": metric,
            "key": key,
            "provider": provider,
            "status": status,
            "fallbackLevel": fallback_level,
            "confidence": result.confidence if result else None,
            "stale": result.stale if result else None,
            "error": str(error) if error else "",
        })

