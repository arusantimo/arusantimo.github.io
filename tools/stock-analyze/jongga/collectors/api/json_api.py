from __future__ import annotations

import json
import os
import time
from typing import Any
from urllib.request import Request, urlopen

from jongga.collectors.base import BaseCollector, CollectResult, CollectionRequest, CollectorError, MissingCredentials


class JsonApiCollector(BaseCollector):
    layer = "api"

    def __init__(self, provider: str, fetcher=None) -> None:
        self.provider = provider
        self.fetcher = fetcher or self._fetch_json

    def collect(self, request: CollectionRequest) -> CollectResult:
        params = request.params
        self._require_credentials(params.get("requiredEnv", []))
        url = self._build_url(request)
        headers = self._build_headers(params)
        started = time.perf_counter()
        payload = params.get("fixtureJson")
        if payload is None:
            if not url:
                raise CollectorError("url or urlTemplate is required")
            payload = self.fetcher(url, headers, float(params.get("timeoutSeconds", 10)))
        value = self._extract_path(payload, params.get("jsonPath", ""))
        latency_ms = round((time.perf_counter() - started) * 1000)
        return CollectResult(
            metric=request.metric,
            key=request.key,
            value=value,
            raw=payload if params.get("includeRaw", False) else None,
            provider=self.provider,
            layer=self.layer,
            source_url=url,
            confidence=float(params.get("confidence", 0.85)),
            audit={"jsonPath": params.get("jsonPath", ""), "latencyMs": latency_ms},
        )

    @staticmethod
    def _require_credentials(required_env: list[str]) -> None:
        missing = [name for name in required_env if not os.getenv(name)]
        if missing:
            raise MissingCredentials(f"missing env: {', '.join(missing)}")

    @staticmethod
    def _build_headers(params: dict[str, Any]) -> dict[str, str]:
        headers = {str(k): str(v) for k, v in params.get("headers", {}).items()}
        for header, env_name in params.get("headerEnv", {}).items():
            value = os.getenv(str(env_name))
            if value:
                headers[str(header)] = value
        return headers

    @staticmethod
    def _build_url(request: CollectionRequest) -> str:
        params = request.params
        if params.get("url"):
            return str(params["url"])
        template = params.get("urlTemplate")
        if not template:
            return ""
        return str(template).format(metric=request.metric, key=request.key, **params)

    @staticmethod
    def _fetch_json(url: str, headers: dict[str, str], timeout_seconds: float) -> Any:
        req = Request(url, headers={"User-Agent": "jongga-collector/1.0", **headers})
        with urlopen(req, timeout=timeout_seconds) as response:
            charset = response.headers.get_content_charset() or "utf-8"
            return json.loads(response.read().decode(charset, errors="replace"))

    @staticmethod
    def _extract_path(payload: Any, path: str) -> Any:
        if not path:
            return payload
        current = payload
        for part in path.split("."):
            if isinstance(current, list):
                current = current[int(part)]
            elif isinstance(current, dict):
                current = current[part]
            else:
                raise CollectorError(f"json path cannot continue at {part}")
        return current

