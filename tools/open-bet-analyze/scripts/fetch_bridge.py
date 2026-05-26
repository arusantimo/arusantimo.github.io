"""HTTP fetch bridge — reuses market-analyze collectors with open-bet paths."""
from __future__ import annotations

import sys
from pathlib import Path
from typing import Any, Iterable, Optional
from urllib.error import URLError

ROOT_DIR = Path(__file__).resolve().parent.parent
MARKET_DIR = ROOT_DIR.parent / "market-analyze"


def _load_market_collectors():
    import importlib.util

    module_path = MARKET_DIR / "scripts" / "collectors.py"
    if not module_path.exists():
        raise ModuleNotFoundError(f"market-analyze collectors not found: {module_path}")
    spec = importlib.util.spec_from_file_location("market_analyze_collectors", module_path)
    if spec is None or spec.loader is None:
        raise ModuleNotFoundError("unable to load market-analyze collectors")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


_mc = _load_market_collectors()

_mc.ROOT_DIR = ROOT_DIR
_mc.NODE_FETCH_WORKER_PATH = ROOT_DIR / "scripts" / "node_fetch_worker.mjs"
_mc.PLAYWRIGHT_WORKER_PATH = ROOT_DIR / "scripts" / "playwright_fetch_worker.mjs"
_mc.HOST_RESOLUTION_CACHE_PATH = ROOT_DIR / "store" / "cache" / "host_resolution_cache.json"

make_request = _mc.make_request
make_node_request = _mc.make_node_request
make_playwright_request = _mc.make_playwright_request
normalize_request_error = _mc.normalize_request_error
close_node_fetch_client = _mc.close_node_fetch_client
close_playwright_client = _mc.close_playwright_client
USER_AGENT = _mc.USER_AGENT
NAVER_ENCODING = _mc.NAVER_ENCODING


def fetch_text(url: str, timeout: int = 15, *, encoding: Optional[str] = None) -> str:
    payload = make_request(url, timeout=timeout)
    enc = encoding or NAVER_ENCODING
    for candidate in (enc, "utf-8", "cp949", "euc-kr"):
        try:
            return payload.decode(candidate)
        except (UnicodeDecodeError, LookupError):
            continue
    return payload.decode("utf-8", errors="replace")


def fetch_json(url: str, timeout: int = 15) -> Any:
    import json

    return json.loads(fetch_text(url, timeout=timeout, encoding="utf-8"))


def run_diagnostics(hosts: Optional[Iterable[str]] = None) -> list[dict[str, Any]]:
    probes = list(
        hosts
        or (
            "https://finance.naver.com/",
            "https://www.tossinvest.com/",
            "https://opendart.fss.or.kr/",
            "https://query1.finance.yahoo.com/v8/finance/chart/%5ENDX",
        )
    )
    results: list[dict[str, Any]] = []
    for url in probes:
        entry: dict[str, Any] = {"url": url, "urllib": None, "node": None, "playwright": None}
        try:
            make_request(url, timeout=8)
            entry["urllib"] = "ok"
        except (URLError, OSError, TimeoutError) as error:
            entry["urllib"] = normalize_request_error(error)
        try:
            make_node_request(url, timeout=8)
            entry["node"] = "ok"
        except (URLError, OSError, TimeoutError) as error:
            entry["node"] = normalize_request_error(error)
        try:
            make_playwright_request(url, timeout=12)
            entry["playwright"] = "ok"
        except (URLError, OSError, TimeoutError) as error:
            entry["playwright"] = normalize_request_error(error)
        results.append(entry)
    return results
