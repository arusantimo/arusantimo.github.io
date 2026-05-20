from __future__ import annotations

import re
import time
from pathlib import Path
from typing import Any

from jongga.collectors.base import BaseCollector, CollectResult, CollectionRequest, CollectorError, ManualRequired, stable_hash


BLOCKED_TEXT = re.compile(r"captcha|로그인|access\s*denied|비정상적인\s*접근|robot", re.IGNORECASE)


class PlaywrightCollector(BaseCollector):
    provider = "playwright"
    layer = "headless_browser"

    def __init__(self, artifact_dir: str | Path | None = None) -> None:
        self.artifact_dir = Path(artifact_dir) if artifact_dir else None

    def collect(self, request: CollectionRequest) -> CollectResult:
        params = request.params
        started = time.perf_counter()
        html = params.get("fixtureHtml")
        url = str(params.get("url", ""))
        selector = ""
        if html is None:
            html, selector = self._collect_with_playwright(url, params)
        html = str(html)
        self._assert_not_blocked(html)
        value, selector = self._extract_text(html, params, selector)
        latency_ms = round((time.perf_counter() - started) * 1000)
        return CollectResult(
            metric=request.metric,
            key=request.key,
            value=value,
            raw={"textHash": stable_hash(html), "selector": selector, "latencyMs": latency_ms},
            provider=self.provider,
            layer=self.layer,
            source_url=url,
            confidence=float(params.get("confidence", 0.62)),
            audit={"selector": selector, "latencyMs": latency_ms, "excerptHash": stable_hash(html[:2000])},
        )

    def _collect_with_playwright(self, url: str, params: dict[str, Any]) -> tuple[str, str]:
        if not url:
            raise CollectorError("url is required")
        try:
            from playwright.sync_api import sync_playwright
        except Exception as error:
            raise CollectorError(f"playwright is not available: {error}") from error

        timeout_ms = int(params.get("timeoutMs", 15000))
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1024, "height": 768})
            page.route("**/*", lambda route: route.abort() if route.request.resource_type in {"image", "font", "stylesheet", "media"} else route.continue_())
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=timeout_ms)
                selector = self._wait_for_any_selector(page, params.get("selectors", []), timeout_ms)
                html = page.content()
                return html, selector
            except Exception as error:
                self._write_failure_artifacts(page, params)
                raise CollectorError(f"browser collect failed: {error}") from error
            finally:
                browser.close()

    @staticmethod
    def _wait_for_any_selector(page, selectors: list[str], timeout_ms: int) -> str:
        for selector in selectors:
            try:
                page.wait_for_selector(selector, timeout=max(1000, timeout_ms // max(1, len(selectors))))
                return selector
            except Exception:
                continue
        return "body"

    def _write_failure_artifacts(self, page, params: dict[str, Any]) -> None:
        if not self.artifact_dir:
            return
        self.artifact_dir.mkdir(parents=True, exist_ok=True)
        stem = str(params.get("artifactStem", "browser-failure"))
        page.screenshot(path=str(self.artifact_dir / f"{stem}.png"), full_page=True)
        (self.artifact_dir / f"{stem}.html").write_text(page.content(), encoding="utf-8")

    @staticmethod
    def _assert_not_blocked(html: str) -> None:
        match = BLOCKED_TEXT.search(html)
        if match:
            raise ManualRequired(f"blocked or interactive page detected: {match.group(0)}")

    @staticmethod
    def _extract_text(html: str, params: dict[str, Any], selector: str) -> tuple[Any, str]:
        for item in params.get("regexes", []):
            pattern = item["pattern"] if isinstance(item, dict) else str(item)
            match = re.search(pattern, html, re.IGNORECASE | re.DOTALL | re.MULTILINE)
            if match:
                value = match.group(1) if match.groups() else match.group(0)
                return value.strip(), f"regex:{pattern}"
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text).strip()
        return text[: int(params.get("excerptLength", 1000))], selector or "body"

