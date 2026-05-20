from __future__ import annotations

import re
import time
from typing import Any
from urllib.request import Request, urlopen

from jongga.collectors.base import BaseCollector, CollectResult, CollectionRequest, CollectorError, ManualRequired, stable_hash


BLOCKED_PATTERNS = [
    r"captcha",
    r"로그인",
    r"access\s*denied",
    r"robot",
    r"비정상적인\s*접근",
]


class HttpScraperCollector(BaseCollector):
    layer = "http_scraper"

    def __init__(self, provider: str = "http_scraper", timeout_seconds: float = 10.0, fetcher=None) -> None:
        self.provider = provider
        self.timeout_seconds = timeout_seconds
        self.fetcher = fetcher or self._fetch_url

    def collect(self, request: CollectionRequest) -> CollectResult:
        params = request.params
        url = str(params.get("url", ""))
        html = params.get("fixtureHtml")
        started = time.perf_counter()
        if html is None:
            if not url:
                raise CollectorError("url is required")
            html = self.fetcher(url, float(params.get("timeoutSeconds", self.timeout_seconds)))
        html = str(html)
        self._assert_not_blocked(html)
        value, selector = self._extract_value(html, params)
        latency_ms = round((time.perf_counter() - started) * 1000)
        confidence = float(params.get("confidence", 0.72 if selector else 0.55))
        return CollectResult(
            metric=request.metric,
            key=request.key,
            value=value,
            raw={"textHash": stable_hash(html), "selector": selector, "latencyMs": latency_ms},
            provider=self.provider,
            layer=self.layer,
            source_url=url,
            confidence=confidence,
            audit={"selector": selector, "latencyMs": latency_ms, "excerptHash": stable_hash(html[:2000])},
        )

    @staticmethod
    def _fetch_url(url: str, timeout_seconds: float) -> str:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0 jongga-collector/1.0"})
        with urlopen(req, timeout=timeout_seconds) as response:
            charset = response.headers.get_content_charset() or "utf-8"
            return response.read().decode(charset, errors="replace")

    @staticmethod
    def _assert_not_blocked(html: str) -> None:
        lowered = html.lower()
        for pattern in BLOCKED_PATTERNS:
            if re.search(pattern, lowered, re.IGNORECASE):
                raise ManualRequired(f"blocked or interactive page detected: {pattern}")

    @staticmethod
    def _extract_value(html: str, params: dict[str, Any]) -> tuple[Any, str]:
        for item in params.get("regexes", []):
            pattern = item["pattern"] if isinstance(item, dict) else str(item)
            flags = re.IGNORECASE | re.MULTILINE | re.DOTALL
            match = re.search(pattern, html, flags)
            if not match:
                continue
            value = match.group(1) if match.groups() else match.group(0)
            return value.strip(), f"regex:{pattern}"
        keyword = params.get("validationKeyword")
        if keyword and str(keyword) not in html:
            raise CollectorError(f"validation keyword not found: {keyword}")
        return html[: int(params.get("excerptLength", 1000))], "text_excerpt"

