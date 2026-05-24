from __future__ import annotations

import atexit
import base64
import ipaddress
import json
import math
import os
import re
import shutil
import socket
import subprocess
import threading
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
)

NAVER_ENCODING = "euc-kr"
FLOW_WINDOW_DAYS = 10
TROY_OUNCE_IN_GRAMS = 31.1034768
CURL_PATH = shutil.which("curl")
CURL_FALLBACK_ENABLED = os.environ.get("MARKET_ANALYZE_DISABLE_CURL_FALLBACK", "").strip().lower() not in {"1", "true", "yes"}
NODE_PATH = shutil.which("node")
NODE_FETCH_FALLBACK_ENABLED = os.environ.get("MARKET_ANALYZE_DISABLE_NODE_FETCH_FALLBACK", "").strip().lower() not in {"1", "true", "yes"}
PLAYWRIGHT_FALLBACK_ENABLED = os.environ.get("MARKET_ANALYZE_DISABLE_PLAYWRIGHT_FALLBACK", "").strip().lower() not in {"1", "true", "yes"}
ROOT_DIR = Path(__file__).resolve().parent.parent
HOST_RESOLUTION_CACHE_PATH = ROOT_DIR / "store" / "cache" / "host_resolution_cache.json"
NODE_FETCH_WORKER_PATH = ROOT_DIR / "scripts" / "node_fetch_worker.mjs"
PLAYWRIGHT_WORKER_PATH = ROOT_DIR / "scripts" / "playwright_fetch_worker.mjs"
HOST_RESOLUTION_CACHE_LOCK = threading.RLock()
HOST_RESOLUTION_CACHE: Optional[Dict[str, Any]] = None
NODE_FETCH_REQUEST_LOCK = threading.Lock()
NODE_FETCH_BOOT_LOCK = threading.Lock()
NODE_FETCH_CLIENT: Optional["NodeFetchClient"] = None
NODE_FETCH_BOOT_ERROR: Optional[str] = None
PLAYWRIGHT_REQUEST_LOCK = threading.Lock()
PLAYWRIGHT_BOOT_LOCK = threading.Lock()
PLAYWRIGHT_CLIENT: Optional["PlaywrightFetchClient"] = None
PLAYWRIGHT_BOOT_ERROR: Optional[str] = None
PLAYWRIGHT_DOWNLOAD_HINTS = ("corpcode.xml", ".zip", "filedownload", "download")
DNS_PRIORITY_HOSTS = (
    "finance.naver.com",
    "opendart.fss.or.kr",
    "kosis.kr",
    "comp.fnguide.com",
    "query1.finance.yahoo.com",
    "open.er-api.com",
    "tradingeconomics.com",
)
NAVER_WORLD_GOLD_DETAIL_URLS = (
    "https://finance.naver.com/marketindex/worldGoldDetail.naver?marketindexCd=CMDT_GC&fdtc=2",
    "https://finance.naver.com/marketindex/worldGoldDetail.nhn?marketindexCd=CMDT_GC&fdtc=2",
)
NAVER_WORLD_GOLD_DAILY_QUOTE_URLS = (
    "https://finance.naver.com/marketindex/worldDailyQuote.nhn?marketindexCd=CMDT_GC&fdtc=2&page=1",
    "https://finance.naver.com/marketindex/worldDailyQuote.naver?marketindexCd=CMDT_GC&fdtc=2&page=1",
)
NAVER_DOMESTIC_GOLD_DETAIL_URLS = (
    "https://finance.naver.com/marketindex/goldDetail.naver",
    "https://finance.naver.com/marketindex/goldDetail.nhn",
)


@dataclass
class CollectorResult:
    data_patch: Dict[str, Any]
    status: Dict[str, str]


def status_entry(state: str, source: str, message: str) -> Dict[str, str]:
    return {"state": state, "source": source, "message": message}


def normalize_request_error(error: Any) -> str:
    raw = str(error or "").strip()
    normalized = raw
    while True:
        unwrapped = re.sub(r"^<urlopen error\s*", "", normalized, flags=re.IGNORECASE).rstrip(">").strip()
        if unwrapped == normalized:
            break
        normalized = unwrapped
    if not normalized:
        normalized = raw or "요청 실패"

    while True:
        deduped = re.sub(r"^DNS 해석 실패 \((DNS 해석 실패 .*)\)$", r"\1", normalized, flags=re.IGNORECASE)
        if deduped == normalized:
            break
        normalized = deduped

    if normalized.startswith("DNS 해석 실패"):
        return normalized

    if re.search(r"nodename nor servname provided|name or service not known|temporary failure in name resolution", normalized, flags=re.IGNORECASE):
        return f"DNS 해석 실패 ({normalized})"
    if re.search(r"Could not resolve host", normalized, flags=re.IGNORECASE):
        return f"DNS 해석 실패 ({normalized})"
    return normalized


def is_dns_failure(error: Any) -> bool:
    return "DNS 해석 실패" in normalize_request_error(error)


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def parse_url_parts(url: str) -> tuple[str, int, str]:
    parsed = urlsplit(str(url or ""))
    hostname = str(parsed.hostname or "").strip()
    if not hostname:
        return "", 0, ""
    if parsed.port:
        port = int(parsed.port)
    else:
        port = 443 if parsed.scheme == "https" else 80
    return hostname, port, parsed.scheme


def is_ip_literal(value: str) -> bool:
    try:
        ipaddress.ip_address(str(value or "").strip())
        return True
    except ValueError:
        return False


def normalize_ip_candidates(values: Iterable[Any]) -> List[str]:
    unique: List[str] = []
    seen = set()
    for value in values:
        candidate = str(value or "").strip()
        if not candidate or candidate in seen or not is_ip_literal(candidate):
            continue
        seen.add(candidate)
        unique.append(candidate)
    return unique


def load_host_resolution_cache() -> Dict[str, Any]:
    global HOST_RESOLUTION_CACHE
    with HOST_RESOLUTION_CACHE_LOCK:
        if HOST_RESOLUTION_CACHE is not None:
            return HOST_RESOLUTION_CACHE
        if not HOST_RESOLUTION_CACHE_PATH.exists():
            HOST_RESOLUTION_CACHE = {}
            return HOST_RESOLUTION_CACHE
        try:
            payload = json.loads(HOST_RESOLUTION_CACHE_PATH.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            payload = {}
        HOST_RESOLUTION_CACHE = payload if isinstance(payload, dict) else {}
        return HOST_RESOLUTION_CACHE


def save_host_resolution_cache(cache_payload: Dict[str, Any]) -> None:
    HOST_RESOLUTION_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    HOST_RESOLUTION_CACHE_PATH.write_text(
        json.dumps(cache_payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def remember_host_resolution(url: str) -> None:
    global HOST_RESOLUTION_CACHE
    hostname, port, scheme = parse_url_parts(url)
    if not hostname or is_ip_literal(hostname) or scheme not in {"http", "https"}:
        return
    try:
        infos = socket.getaddrinfo(hostname, port, family=socket.AF_INET, type=socket.SOCK_STREAM)
    except OSError:
        return
    ip_candidates = normalize_ip_candidates(info[4][0] for info in infos if info and len(info) >= 5)
    if not ip_candidates:
        return
    with HOST_RESOLUTION_CACHE_LOCK:
        cache_payload = load_host_resolution_cache().copy()
        cache_payload[hostname] = {
            "ips": ip_candidates,
            "updatedAt": utc_now_iso(),
        }
        HOST_RESOLUTION_CACHE = cache_payload
        try:
            save_host_resolution_cache(cache_payload)
        except OSError:
            pass


def get_cached_host_ips(url: str) -> List[str]:
    hostname, _, _ = parse_url_parts(url)
    if not hostname or is_ip_literal(hostname):
        return []
    with HOST_RESOLUTION_CACHE_LOCK:
        entry = load_host_resolution_cache().get(hostname, {})
        if not isinstance(entry, dict):
            return []
        return normalize_ip_candidates(entry.get("ips") or [])


def make_urllib_request(url: str, timeout: int = 10) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=timeout) as response:
        return response.read()


def make_curl_request(url: str, timeout: int = 10) -> bytes:
    if not CURL_PATH or not CURL_FALLBACK_ENABLED:
        raise URLError("curl fallback unavailable")

    command = [
        CURL_PATH,
        "--fail",
        "--silent",
        "--show-error",
        "--location",
        "--compressed",
        "--connect-timeout",
        str(max(3, int(timeout))),
        "--max-time",
        str(max(5, int(timeout) + 3)),
        "--retry",
        "1",
        "--retry-delay",
        "1",
        "--user-agent",
        USER_AGENT,
        url,
    ]
    completed = subprocess.run(
        command,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=False,
    )
    return completed.stdout


class NodeFetchClient:
    def __init__(self) -> None:
        if not NODE_PATH:
            raise URLError("node 실행 파일을 찾지 못했습니다.")
        if not NODE_FETCH_WORKER_PATH.exists():
            raise URLError(f"Node fetch 워커 파일이 없습니다 ({NODE_FETCH_WORKER_PATH}).")

        self._stderr_lines: deque[str] = deque(maxlen=20)
        self._request_id = 0
        self.process = subprocess.Popen(
            [NODE_PATH, str(NODE_FETCH_WORKER_PATH)],
            cwd=str(ROOT_DIR),
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            bufsize=1,
            env=os.environ.copy(),
        )
        self._stderr_thread = threading.Thread(target=self._consume_stderr, daemon=True)
        self._stderr_thread.start()
        self._wait_ready()

    def _consume_stderr(self) -> None:
        if not self.process.stderr:
            return
        for line in self.process.stderr:
            normalized = line.strip()
            if normalized:
                self._stderr_lines.append(normalized)

    def _stderr_summary(self) -> str:
        return " | ".join(self._stderr_lines) if self._stderr_lines else ""

    def _wait_ready(self) -> None:
        if not self.process.stdout:
            raise URLError("Node fetch 워커 stdout 파이프를 열지 못했습니다.")
        ready_line = self.process.stdout.readline()
        if not ready_line:
            raise URLError(
                f"Node fetch 워커가 초기화되지 않았습니다."
                f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
            )
        try:
            payload = json.loads(ready_line)
        except json.JSONDecodeError as error:
            raise URLError(f"Node fetch 워커 ready 응답 파싱 실패 ({error})") from error
        if not payload.get("ready"):
            raise URLError(str(payload.get("error") or "Node fetch 워커 초기화 실패"))

    def is_alive(self) -> bool:
        return self.process.poll() is None

    def fetch_bytes(
        self,
        url: str,
        timeout: int = 10,
        *,
        ip_candidates: Optional[Iterable[str]] = None,
        skip_system_dns: bool = False,
    ) -> bytes:
        with NODE_FETCH_REQUEST_LOCK:
            if not self.is_alive():
                raise URLError(
                    f"Node fetch 워커가 종료되었습니다."
                    f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
                )
            self._request_id += 1
            request_payload = {
                "id": self._request_id,
                "url": url,
                "timeoutMs": max(1_000, int(timeout * 1000)),
                "ipCandidates": normalize_ip_candidates(ip_candidates or []),
                "skipSystemDns": bool(skip_system_dns),
            }
            try:
                assert self.process.stdin is not None
                assert self.process.stdout is not None
                self.process.stdin.write(json.dumps(request_payload, ensure_ascii=False) + "\n")
                self.process.stdin.flush()
                response_line = self.process.stdout.readline()
            except OSError as error:
                raise URLError(f"Node fetch 워커 통신 실패 ({error})") from error

            if not response_line:
                raise URLError(
                    f"Node fetch 워커 응답 없음."
                    f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
                )

            try:
                payload = json.loads(response_line)
            except json.JSONDecodeError as error:
                raise URLError(f"Node fetch 워커 응답 파싱 실패 ({error})") from error

            if not payload.get("ok"):
                raise URLError(str(payload.get("error") or "Node fetch 요청 실패"))

            body_base64 = str(payload.get("bodyBase64") or "")
            try:
                return base64.b64decode(body_base64)
            except (ValueError, TypeError) as error:
                raise URLError(f"Node fetch 응답 디코딩 실패 ({error})") from error

    def close(self) -> None:
        try:
            if self.process.stdin:
                self.process.stdin.close()
        except OSError:
            pass
        if self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()


class PlaywrightFetchClient:
    def __init__(self) -> None:
        if not NODE_PATH:
            raise URLError("node 실행 파일을 찾지 못했습니다.")
        if not PLAYWRIGHT_WORKER_PATH.exists():
            raise URLError(f"Playwright 워커 파일이 없습니다 ({PLAYWRIGHT_WORKER_PATH}).")

        env = os.environ.copy()
        if not env.get("MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH"):
            chrome_candidates = [
                "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
                "/usr/bin/google-chrome",
                "/usr/bin/google-chrome-stable",
                "/snap/bin/chromium",
                "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            ]
            resolved = next((candidate for candidate in chrome_candidates if Path(candidate).exists()), "")
            if resolved:
                env["MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH"] = resolved

        self._stderr_lines: deque[str] = deque(maxlen=20)
        self._request_id = 0
        self.process = subprocess.Popen(
            [NODE_PATH, str(PLAYWRIGHT_WORKER_PATH)],
            cwd=str(ROOT_DIR),
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            bufsize=1,
            env=env,
        )
        self._stderr_thread = threading.Thread(target=self._consume_stderr, daemon=True)
        self._stderr_thread.start()
        self._wait_ready()

    def _consume_stderr(self) -> None:
        if not self.process.stderr:
            return
        for line in self.process.stderr:
            normalized = line.strip()
            if normalized:
                self._stderr_lines.append(normalized)

    def _stderr_summary(self) -> str:
        return " | ".join(self._stderr_lines) if self._stderr_lines else ""

    def _wait_ready(self) -> None:
        if not self.process.stdout:
            raise URLError("Playwright 워커 stdout 파이프를 열지 못했습니다.")
        ready_line = self.process.stdout.readline()
        if not ready_line:
            raise URLError(
                f"Playwright 워커가 초기화되지 않았습니다."
                f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
            )
        try:
            payload = json.loads(ready_line)
        except json.JSONDecodeError as error:
            raise URLError(f"Playwright 워커 ready 응답 파싱 실패 ({error})") from error
        if not payload.get("ready"):
            raise URLError(str(payload.get("error") or "Playwright 워커 초기화 실패"))

    def is_alive(self) -> bool:
        return self.process.poll() is None

    def fetch_bytes(self, url: str, timeout: int = 10, *, expect_download: bool = False) -> bytes:
        with PLAYWRIGHT_REQUEST_LOCK:
            if not self.is_alive():
                raise URLError(
                    f"Playwright 워커가 종료되었습니다."
                    f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
                )
            self._request_id += 1
            request_payload = {
                "id": self._request_id,
                "url": url,
                "timeoutMs": max(1_000, int(timeout * 1000)),
                "expectDownload": expect_download,
            }
            try:
                assert self.process.stdin is not None
                assert self.process.stdout is not None
                self.process.stdin.write(json.dumps(request_payload, ensure_ascii=False) + "\n")
                self.process.stdin.flush()
                response_line = self.process.stdout.readline()
            except OSError as error:
                raise URLError(f"Playwright 워커 통신 실패 ({error})") from error

            if not response_line:
                raise URLError(
                    f"Playwright 워커 응답 없음."
                    f"{f' ({self._stderr_summary()})' if self._stderr_summary() else ''}"
                )

            try:
                payload = json.loads(response_line)
            except json.JSONDecodeError as error:
                raise URLError(f"Playwright 워커 응답 파싱 실패 ({error})") from error

            if not payload.get("ok"):
                raise URLError(str(payload.get("error") or "Playwright 요청 실패"))

            body_base64 = str(payload.get("bodyBase64") or "")
            try:
                return base64.b64decode(body_base64)
            except (ValueError, TypeError) as error:
                raise URLError(f"Playwright 응답 디코딩 실패 ({error})") from error

    def close(self) -> None:
        try:
            if self.process.stdin:
                self.process.stdin.close()
        except OSError:
            pass
        if self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()


def close_node_fetch_client() -> None:
    global NODE_FETCH_CLIENT
    client = NODE_FETCH_CLIENT
    NODE_FETCH_CLIENT = None
    if client:
        client.close()


def close_playwright_client() -> None:
    global PLAYWRIGHT_CLIENT
    client = PLAYWRIGHT_CLIENT
    PLAYWRIGHT_CLIENT = None
    if client:
        client.close()


atexit.register(close_node_fetch_client)
atexit.register(close_playwright_client)


def get_node_fetch_client() -> NodeFetchClient:
    global NODE_FETCH_CLIENT, NODE_FETCH_BOOT_ERROR
    with NODE_FETCH_BOOT_LOCK:
        if NODE_FETCH_CLIENT and NODE_FETCH_CLIENT.is_alive():
            return NODE_FETCH_CLIENT
        if NODE_FETCH_BOOT_ERROR:
            raise URLError(NODE_FETCH_BOOT_ERROR)
        try:
            NODE_FETCH_CLIENT = NodeFetchClient()
        except URLError as error:
            NODE_FETCH_BOOT_ERROR = str(error)
            raise
        return NODE_FETCH_CLIENT


def get_playwright_client() -> PlaywrightFetchClient:
    global PLAYWRIGHT_CLIENT, PLAYWRIGHT_BOOT_ERROR
    with PLAYWRIGHT_BOOT_LOCK:
        if PLAYWRIGHT_CLIENT and PLAYWRIGHT_CLIENT.is_alive():
            return PLAYWRIGHT_CLIENT
        if PLAYWRIGHT_BOOT_ERROR:
            raise URLError(PLAYWRIGHT_BOOT_ERROR)
        try:
            PLAYWRIGHT_CLIENT = PlaywrightFetchClient()
        except URLError as error:
            PLAYWRIGHT_BOOT_ERROR = str(error)
            raise
        return PLAYWRIGHT_CLIENT


def should_expect_playwright_download(url: str) -> bool:
    normalized = str(url or "").lower()
    return any(hint in normalized for hint in PLAYWRIGHT_DOWNLOAD_HINTS)


def should_prioritize_node_fetch(url: str, primary_error: Any) -> bool:
    normalized_url = str(url or "").lower()
    if is_dns_failure(primary_error):
        return True
    return any(host in normalized_url for host in DNS_PRIORITY_HOSTS)


def should_prioritize_playwright(url: str, primary_error: Any) -> bool:
    normalized_url = str(url or "").lower()
    normalized_error = normalize_request_error(primary_error)
    if "DNS 해석 실패" in normalized_error:
        return True
    return any(
        host in normalized_url
        for host in ("finance.naver.com", "opendart.fss.or.kr", "kosis.kr", "comp.fnguide.com")
    )


def make_node_request(
    url: str,
    timeout: int = 10,
    *,
    ip_candidates: Optional[Iterable[str]] = None,
    skip_system_dns: bool = False,
) -> bytes:
    if not NODE_FETCH_FALLBACK_ENABLED:
        raise URLError("Node fetch fallback disabled")
    client = get_node_fetch_client()
    return client.fetch_bytes(
        url,
        timeout=timeout,
        ip_candidates=ip_candidates,
        skip_system_dns=skip_system_dns,
    )


def make_playwright_request(url: str, timeout: int = 10) -> bytes:
    if not PLAYWRIGHT_FALLBACK_ENABLED:
        raise URLError("Playwright fallback disabled")
    client = get_playwright_client()
    return client.fetch_bytes(url, timeout=timeout, expect_download=should_expect_playwright_download(url))


def make_request(url: str, timeout: int = 10) -> bytes:
    primary_error: Optional[Exception] = None
    try:
        payload = make_urllib_request(url, timeout=timeout)
        remember_host_resolution(url)
        return payload
    except (HTTPError, URLError, TimeoutError, OSError, ValueError) as error:
        primary_error = error

    fallback_errors: List[str] = []
    cached_host_ips = get_cached_host_ips(url)

    def try_node_fetch() -> Optional[bytes]:
        if not NODE_FETCH_FALLBACK_ENABLED:
            return None
        try:
            return make_node_request(
                url,
                timeout=timeout,
                ip_candidates=cached_host_ips,
                skip_system_dns=is_dns_failure(primary_error),
            )
        except URLError as error:
            fallback_errors.append(f"Node DNS 우회 실패 ({normalize_request_error(error)})")
            return None

    def try_playwright() -> Optional[bytes]:
        if not PLAYWRIGHT_FALLBACK_ENABLED:
            return None
        try:
            return make_playwright_request(url, timeout=timeout)
        except URLError as error:
            fallback_errors.append(f"Playwright 우회 실패 ({normalize_request_error(error)})")
            return None

    def try_curl() -> Optional[bytes]:
        if not (CURL_PATH and CURL_FALLBACK_ENABLED):
            return None
        try:
            return make_curl_request(url, timeout=timeout)
        except (subprocess.CalledProcessError, OSError, URLError) as error:
            if isinstance(error, subprocess.CalledProcessError):
                stderr = (error.stderr or b"").decode("utf-8", errors="ignore").strip()
                curl_message = stderr or f"exit {error.returncode}"
            else:
                curl_message = str(error)
            fallback_errors.append(f"curl 우회 실패 ({normalize_request_error(curl_message)})")
            return None

    fallback_order = (
        [try_node_fetch, try_playwright, try_curl]
        if should_prioritize_node_fetch(url, primary_error)
        else [try_curl, try_node_fetch, try_playwright]
    )
    for fallback in fallback_order:
        payload = fallback()
        if payload is not None:
            remember_host_resolution(url)
            return payload

    if primary_error is None:
        raise URLError("알 수 없는 요청 실패")
    if fallback_errors:
        raise URLError(f"{normalize_request_error(primary_error)}; {'; '.join(fallback_errors)}")
    if isinstance(primary_error, URLError):
        raise primary_error
    raise URLError(str(primary_error)) from primary_error


def fetch_text(url: str, *, timeout: int = 10, encodings: Optional[Iterable[str]] = None) -> str:
    raw = make_request(url, timeout=timeout)
    for encoding in encodings or ("utf-8", NAVER_ENCODING):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="ignore")


def parse_json_text(raw_text: str, context: str = "JSON 응답") -> Any:
    trimmed = str(raw_text or "").strip().lstrip("\ufeff")
    if not trimmed:
        raise ValueError(f"{context} 빈 응답")
    if trimmed.startswith("<"):
        title_match = re.search(r"<title[^>]*>(.*?)</title>", trimmed, flags=re.IGNORECASE | re.DOTALL)
        title = strip_html(title_match.group(1)) if title_match else ""
        if title:
            raise ValueError(f"{context} JSON 대신 HTML 응답 ({title})")
        raise ValueError(f"{context} JSON 대신 HTML 응답")
    try:
        return json.loads(trimmed)
    except json.JSONDecodeError as error:
        snippet = trimmed[:120].replace("\n", " ").strip()
        raise ValueError(f"{context} JSON 파싱 실패 ({error}) · 응답 시작: {snippet or '-' }") from error


def fetch_json(url: str, *, timeout: int = 10) -> Any:
    raw = make_request(url, timeout=timeout)
    return parse_json_text(raw.decode("utf-8", errors="ignore"), context=f"{url} 응답")


def safe_number(value: Any) -> Optional[float]:
    try:
        num = float(value)
    except (TypeError, ValueError):
        return None
    return num if math.isfinite(num) else None


def last_finite(values: Iterable[Any]) -> Optional[float]:
    items = list(values)
    for value in reversed(items):
        num = safe_number(value)
        if num is not None:
            return num
    return None


def has_value(*values: Any) -> bool:
    return any(value not in (None, "", []) and safe_number(value) is not None for value in values)


def strip_html(raw: str) -> str:
    return re.sub(r"<[^>]+>", "", raw or "").replace("&nbsp;", "").strip()


def normalize_date_key(raw: str) -> str:
    return re.sub(r"\D", "", raw or "")


def parse_signed_number(raw: str) -> float:
    normalized = strip_html(raw).replace(",", "")
    match = re.search(r"-?\d+(?:\.\d+)?", normalized)
    return float(match.group(0)) if match else 0.0


def calculate_linear_slope(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    xs = list(range(1, len(values) + 1))
    sum_x = sum(xs)
    sum_y = sum(values)
    sum_xy = sum(x * y for x, y in zip(xs, values))
    sum_x2 = sum(x * x for x in xs)
    denominator = len(values) * sum_x2 - sum_x * sum_x
    if denominator == 0:
        return 0.0
    return (len(values) * sum_xy - sum_x * sum_y) / denominator


def extract_last_finite_number(values: Iterable[Any]) -> Optional[float]:
    for value in reversed(list(values or [])):
        parsed = safe_number(value)
        if parsed is not None:
            return parsed
    return None


def parse_yahoo_chart_payload(payload: Any, symbol: str, context: str) -> Dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValueError(f"{context} 응답 구조 이상: {symbol}")
    result = payload.get("chart", {}).get("result", [{}])[0]
    if not result:
        raise ValueError(f"{context} 응답 구조 이상: {symbol}")
    quote_items = result.get("indicators", {}).get("quote", [{}]) or [{}]
    quote_data = quote_items[0] if quote_items else {}
    closes = quote_data.get("close", []) or []
    opens = quote_data.get("open", []) or []
    highs = quote_data.get("high", []) or []
    lows = quote_data.get("low", []) or []
    volumes = quote_data.get("volume", []) or []
    timestamps = result.get("timestamp", []) or []
    regular_market_price = safe_number(result.get("meta", {}).get("regularMarketPrice"))
    ohlcv_series: List[Dict[str, Any]] = []
    for index, timestamp in enumerate(timestamps):
        ohlcv_series.append(
            {
                "timestamp": safe_number(timestamp),
                "open": safe_number(opens[index]) if index < len(opens) else None,
                "high": safe_number(highs[index]) if index < len(highs) else None,
                "low": safe_number(lows[index]) if index < len(lows) else None,
                "close": safe_number(closes[index]) if index < len(closes) else None,
                "volume": safe_number(volumes[index]) if index < len(volumes) else None,
            }
        )
    return {
        "closes": [safe_number(value) for value in closes if safe_number(value) is not None],
        "regularMarketPrice": regular_market_price,
        "ohlcvSeries": ohlcv_series,
    }


def parse_yahoo_spark_payload(payload: Any, symbol: str) -> Dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValueError(f"Yahoo spark 응답 구조 이상: {symbol}")
    results = payload.get("spark", {}).get("result", []) or []
    if not results:
        raise ValueError(f"Yahoo spark 결과 없음: {symbol}")
    response_items = results[0].get("response", []) or []
    if not response_items:
        raise ValueError(f"Yahoo spark 상세 응답 없음: {symbol}")
    result = response_items[0]
    quote_items = result.get("indicators", {}).get("quote", [{}]) or [{}]
    quote_data = quote_items[0] if quote_items else {}
    closes = quote_data.get("close", []) or []
    timestamps = result.get("timestamp", []) or []
    regular_market_price = safe_number(result.get("meta", {}).get("regularMarketPrice"))
    ohlcv_series: List[Dict[str, Any]] = []
    for index, timestamp in enumerate(timestamps):
        close_value = safe_number(closes[index]) if index < len(closes) else None
        ohlcv_series.append(
            {
                "timestamp": safe_number(timestamp),
                "open": close_value,
                "high": close_value,
                "low": close_value,
                "close": close_value,
                "volume": None,
            }
        )
    return {
        "closes": [safe_number(value) for value in closes if safe_number(value) is not None],
        "regularMarketPrice": regular_market_price,
        "ohlcvSeries": ohlcv_series,
    }


def fetch_yahoo_chart(symbol: str, range_name: str, interval: str = "1d") -> Dict[str, Any]:
    encoded_symbol = quote(symbol, safe="")
    errors: List[str] = []
    chart_urls = [
        f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded_symbol}?range={range_name}&interval={interval}",
        f"https://query2.finance.yahoo.com/v8/finance/chart/{encoded_symbol}?range={range_name}&interval={interval}",
    ]

    for url in chart_urls:
        try:
            raw_text = fetch_text(url, timeout=12, encodings=("utf-8",))
            payload = parse_json_text(raw_text, context="Yahoo 차트")
            return parse_yahoo_chart_payload(payload, symbol, "Yahoo 차트")
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
            errors.append(f"{urlsplit(url).netloc}: {normalize_request_error(error)}")

    spark_url = (
        f"https://query1.finance.yahoo.com/v7/finance/spark?symbols={encoded_symbol}"
        f"&range={range_name}&interval={interval}&indicators=close"
    )
    try:
        raw_text = fetch_text(spark_url, timeout=12, encodings=("utf-8",))
        payload = parse_json_text(raw_text, context="Yahoo spark")
        return parse_yahoo_spark_payload(payload, symbol)
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        errors.append(f"{urlsplit(spark_url).netloc}: {normalize_request_error(error)}")

    raise ValueError(f"Yahoo 차트 다중 엔드포인트 실패 ({' / '.join(errors[:3])})")


def parse_latest_vix_close_from_csv(csv_text: str) -> float:
    lines = [line for line in re.split(r"\r?\n", str(csv_text or "").strip()) if line.strip()]
    for line in reversed(lines[1:]):
        columns = [column.strip() for column in line.split(",")]
        if len(columns) < 5:
            continue
        close_value = safe_number(columns[4])
        if close_value is not None and close_value > 0:
            return close_value
    raise ValueError("VIX CSV 종가 파싱 실패")


def fetch_cboe_vix_close() -> float:
    csv_text = fetch_text(
        "https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv",
        timeout=12,
        encodings=("utf-8",),
    )
    return parse_latest_vix_close_from_csv(csv_text)


def parse_naver_index_closes(html_text: str) -> List[float]:
    closes = [
        safe_number(match.group(2).replace(",", ""))
        for match in re.finditer(
            r'<td class="date">([\d.]+)</td>[\s\S]*?<td class="number_1">([\d,.]+)</td>',
            str(html_text or ""),
            flags=re.IGNORECASE,
        )
    ]
    return [value for value in closes if value is not None]


def parse_naver_marketindex_current_value(html_text: str) -> float:
    patterns = (
        r'class=["\']value["\'][^>]*>\s*([\d,]+(?:\.\d+)?)\s*<',
        r'class=["\']no_today["\'][^>]*>[\s\S]*?<em[^>]*>\s*([\d,]+(?:\.\d+)?)\s*</em>',
        r'class=["\']no_(?:up|down|same)[^"\']*["\'][^>]*>\s*([\d,]+(?:\.\d+)?)\s*<',
    )
    html = str(html_text or "")
    for pattern in patterns:
        match = re.search(pattern, html, flags=re.IGNORECASE)
        if not match:
            continue
        value = safe_number(match.group(1).replace(",", ""))
        if value is not None and value > 0:
            return value
    raise ValueError("네이버 마켓지수 현재가 파싱 실패")


def parse_naver_world_daily_quote_rows(html_text: str, limit: int = 7) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    html = str(html_text or "")
    tr_regex = re.compile(r"<tr[^>]*>([\s\S]*?)</tr>", flags=re.IGNORECASE)
    td_regex = re.compile(r'<td[^>]*class=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</td>', flags=re.IGNORECASE)

    for tr_match in tr_regex.finditer(html):
        td_matches = td_regex.findall(tr_match.group(1))
        if len(td_matches) < 4:
            continue
        if "date" not in td_matches[0][0].lower():
            continue

        date_key = normalize_date_key(strip_html(td_matches[0][1]))
        close_value = safe_number(strip_html(td_matches[1][1]).replace(",", ""))
        change_pct = safe_number(re.sub(r"[^\d.+-]", "", strip_html(td_matches[3][1])))
        if len(date_key) != 8 or close_value is None or close_value <= 0:
            continue

        rows.append(
            {
                "dateKey": date_key,
                "close": close_value,
                "changePct": change_pct,
            }
        )
        if len(rows) >= limit:
            break

    return rows


def fetch_naver_world_gold_quote() -> Dict[str, Any]:
    errors: List[str] = []

    for url in NAVER_WORLD_GOLD_DETAIL_URLS:
        try:
            html_text = fetch_text(url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
            value = parse_naver_marketindex_current_value(html_text)
            return {
                "value": value,
                "source": url,
                "mode": "detail-current",
            }
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            errors.append(f"{urlsplit(url).path}: {normalize_request_error(error)}")

    for url in NAVER_WORLD_GOLD_DAILY_QUOTE_URLS:
        try:
            html_text = fetch_text(url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
            rows = parse_naver_world_daily_quote_rows(html_text, limit=1)
            if not rows:
                raise ValueError("네이버 국제금 일별시세 행이 없습니다.")
            row = rows[0]
            return {
                "value": row["close"],
                "dateKey": row["dateKey"],
                "changePct": row.get("changePct"),
                "source": url,
                "mode": "daily-close",
            }
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            errors.append(f"{urlsplit(url).path}: {normalize_request_error(error)}")

    raise ValueError(f"네이버 국제금 시세 파싱 실패 ({' / '.join(errors[:4])})")


def fetch_naver_domestic_gold_usd_quote(fx_rate: Optional[float]) -> Dict[str, Any]:
    normalized_fx_rate = safe_number(fx_rate)
    if normalized_fx_rate is None or normalized_fx_rate <= 0:
        raise ValueError("국내 금 환산용 원/달러 환율이 없습니다.")

    errors: List[str] = []
    for url in NAVER_DOMESTIC_GOLD_DETAIL_URLS:
        try:
            html_text = fetch_text(url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
            krw_per_gram = parse_naver_marketindex_current_value(html_text)
            usd_per_ounce = (krw_per_gram * TROY_OUNCE_IN_GRAMS) / normalized_fx_rate
            if usd_per_ounce <= 0:
                raise ValueError("국내 금 환산값이 0 이하입니다.")
            return {
                "value": usd_per_ounce,
                "source": url,
                "mode": "domestic-converted",
                "domesticKrwPerGram": krw_per_gram,
            }
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            errors.append(f"{urlsplit(url).path}: {normalize_request_error(error)}")

    raise ValueError(f"네이버 국내 금 시세 파싱 실패 ({' / '.join(errors[:4])})")


def fetch_kospi_disparity_from_naver() -> Dict[str, float]:
    closes: List[float] = []
    for page in range(1, 41):
        html_text = fetch_text(
            f"https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI&page={page}",
            timeout=12,
            encodings=("euc-kr", "utf-8"),
        )
        closes.extend(parse_naver_index_closes(html_text))
        if len(closes) >= 200:
            break
    if len(closes) < 200:
        raise ValueError(f"네이버 KOSPI 일별 지수 200일 부족 ({len(closes)}건)")
    latest = closes[0]
    sma200 = sum(closes[:200]) / 200
    if sma200 <= 0:
        raise ValueError("네이버 KOSPI SMA200 계산 실패")
    return {
        "currentPrice": latest,
        "sma200": sma200,
        "disparity": (latest / sma200) * 100,
    }


def calculate_disparity(closes: List[float], current_price: Optional[float] = None) -> Dict[str, float]:
    if len(closes) < 200:
        raise ValueError("200일치 종가 부족")
    latest = current_price if current_price is not None else closes[-1]
    window = closes[-200:]
    sma200 = sum(window) / 200
    if sma200 <= 0:
        raise ValueError("SMA200 계산 실패")
    return {
        "currentPrice": latest,
        "sma200": sma200,
        "disparity": (latest / sma200) * 100,
    }


def collect_fx(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        payload = fetch_json("https://open.er-api.com/v6/latest/USD", timeout=10)
        krw = safe_number(payload.get("rates", {}).get("KRW"))
        if krw is None:
            raise ValueError("KRW 환율 없음")
        return CollectorResult(
            {"fx": krw},
            status_entry("ok", "open.er-api.com", f"원/달러 환율 {krw:,.3f}원 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        if safe_number(base_data.get("fx")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"환율 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "open.er-api.com", f"환율 수집 실패 ({normalize_request_error(error)})"))


def collect_vix(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_yahoo_chart("^VIX", "5d")
        value = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
        if value is None:
            raise ValueError("VIX 현재가 없음")
        return CollectorResult(
            {"vix": value},
            status_entry("ok", "query1.finance.yahoo.com", f"VIX {value:.2f} 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        try:
            value = fetch_cboe_vix_close()
            return CollectorResult(
                {"vix": value},
                status_entry("partial", "cdn.cboe.com", f"Yahoo 차트 실패 후 CBOE CSV 폴백으로 VIX {value:.2f} 수집"),
            )
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as fallback_error:
            error = ValueError(f"Yahoo/CBOE 모두 실패 ({normalize_request_error(error)}; {normalize_request_error(fallback_error)})")
        if safe_number(base_data.get("vix")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"VIX 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"VIX 수집 실패 ({normalize_request_error(error)})"))


def collect_gold(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_naver_world_gold_quote()
        value = safe_number(quote.get("value"))
        if value is None:
            raise ValueError("네이버 국제금 값이 없습니다.")
        if quote.get("mode") == "daily-close":
            date_key = str(quote.get("dateKey") or "")
            date_label = f"{date_key[:4]}.{date_key[4:6]}.{date_key[6:8]} 종가" if len(date_key) == 8 else "최근 종가"
            message = f"네이버 국제금 일별시세로 금 시세 {value:,.1f} 수집 ({date_label})"
        else:
            message = f"네이버 국제금 현재가로 금 시세 {value:,.1f} 수집"
        return CollectorResult(
            {"gold": value},
            status_entry("ok", str(quote.get("source") or "finance.naver.com"), message),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as naver_error:
        try:
            quote = fetch_naver_domestic_gold_usd_quote(base_data.get("fx"))
            value = safe_number(quote.get("value"))
            if value is None:
                raise ValueError("네이버 국내 금 환산값이 없습니다.")
            domestic_krw = safe_number(quote.get("domesticKrwPerGram"))
            domestic_label = f"{domestic_krw:,.0f}원/g" if domestic_krw is not None else "국내 금 시세"
            return CollectorResult(
                {"gold": value},
                status_entry(
                    "partial",
                    str(quote.get("source") or "finance.naver.com"),
                    f"네이버 국제금 실패 후 국내 금 {domestic_label}을 환율로 환산해 금 시세 {value:,.1f} 수집",
                ),
            )
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as domestic_error:
            try:
                try:
                    quote = fetch_yahoo_chart("GC=F", "5d")
                except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError):
                    quote = fetch_yahoo_chart("GC=F", "1mo")
                value = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
                if value is None:
                    raise ValueError("금 현재가 없음")
                return CollectorResult(
                    {"gold": value},
                    status_entry("partial", "query1.finance.yahoo.com", f"네이버 금 시세 실패 후 Yahoo 금 선물 {value:,.1f} 수집"),
                )
            except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as yahoo_error:
                error = ValueError(
                    "네이버/Yahoo 모두 실패 "
                    f"({normalize_request_error(naver_error)}; {normalize_request_error(domestic_error)}; {normalize_request_error(yahoo_error)})"
                )
        if safe_number(base_data.get("gold")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"금 시세 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"금 시세 수집 실패 ({normalize_request_error(error)})"))


def collect_disparity(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        quote = fetch_yahoo_chart("^KS11", "1y")
        current_price = quote.get("regularMarketPrice") or last_finite(quote.get("closes", []))
        metrics = calculate_disparity(quote.get("closes", []), current_price)
        return CollectorResult(
            {"disparity": metrics["disparity"]},
            status_entry(
                "ok",
                "query1.finance.yahoo.com",
                f"코스피 200일 이격도 {metrics['disparity']:.2f}% 수집",
            ),
        )
    except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
        try:
            metrics = fetch_kospi_disparity_from_naver()
            return CollectorResult(
                {"disparity": metrics["disparity"]},
                status_entry(
                    "partial",
                    "finance.naver.com/sise_index_day",
                    f"Yahoo 차트 실패 후 네이버 일별 지수 폴백으로 코스피 200일 이격도 {metrics['disparity']:.2f}% 수집",
                ),
            )
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as fallback_error:
            error = ValueError(f"Yahoo/네이버 모두 실패 ({normalize_request_error(error)}; {normalize_request_error(fallback_error)})")
        if safe_number(base_data.get("disparity")) is not None:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"이격도 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "query1.finance.yahoo.com", f"이격도 수집 실패 ({normalize_request_error(error)})"))


def parse_investor_flow_bizdate(html: str) -> Optional[str]:
    match = re.search(r"investorDealTrendDay\.naver\?bizdate=(\d{8})&(?:amp;)?sosok=", html)
    return match.group(1) if match else None


def parse_investor_trend_rows(html: str, limit: int = FLOW_WINDOW_DAYS) -> List[Dict[str, float]]:
    rows: List[Dict[str, float]] = []
    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", html, flags=re.IGNORECASE):
        if 'class="date2"' not in tr_content:
            continue
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if len(td_matches) < 4:
            continue
        rows.append(
            {
                "date": strip_html(td_matches[0]),
                "retail": parse_signed_number(td_matches[1]),
                "foreign": parse_signed_number(td_matches[2]),
                "institution": parse_signed_number(td_matches[3]),
            }
        )
        if len(rows) >= limit:
            break
    return rows


def merge_investor_rows(kospi_rows: List[Dict[str, float]], kosdaq_rows: List[Dict[str, float]]) -> List[Dict[str, float]]:
    if len(kospi_rows) < FLOW_WINDOW_DAYS or len(kosdaq_rows) < FLOW_WINDOW_DAYS:
        raise ValueError("최근 10영업일 수급 데이터 부족")
    merged: List[Dict[str, float]] = []
    for kospi_row, kosdaq_row in zip(kospi_rows[:FLOW_WINDOW_DAYS], kosdaq_rows[:FLOW_WINDOW_DAYS]):
        if kospi_row["date"] != kosdaq_row["date"]:
            raise ValueError(f"시장 수급 기준일 불일치 ({kospi_row['date']} / {kosdaq_row['date']})")
        merged.append(
            {
                "date": kospi_row["date"],
                "retail": kospi_row["retail"] + kosdaq_row["retail"],
                "foreign": kospi_row["foreign"] + kosdaq_row["foreign"],
                "institution": kospi_row["institution"] + kosdaq_row["institution"],
            }
        )
    return merged


def summarize_investor_rows(rows: List[Dict[str, float]]) -> Dict[str, float]:
    window_rows = rows[:FLOW_WINDOW_DAYS]
    retail_abs_sum = sum(abs(row["retail"]) for row in window_rows)
    return {
        "retailNetToday": window_rows[0]["retail"],
        "foreignNetToday": window_rows[0]["foreign"],
        "institutionNetToday": window_rows[0]["institution"],
        "retailNet10dCum": sum(row["retail"] for row in window_rows),
        "foreignNet10dCum": sum(row["foreign"] for row in window_rows),
        "institutionNet10dCum": sum(row["institution"] for row in window_rows),
        "retailNet10dAbsAvg": retail_abs_sum / FLOW_WINDOW_DAYS if retail_abs_sum > 0 else None,
        "retailNet10dAbsSum": retail_abs_sum if retail_abs_sum > 0 else None,
    }


def collect_flow(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        trend_index_html = fetch_text(
            "https://finance.naver.com/sise/sise_trans_style.naver",
            timeout=12,
            encodings=(NAVER_ENCODING, "utf-8"),
        )
        bizdate = parse_investor_flow_bizdate(trend_index_html)
        if not bizdate:
            raise ValueError("수급 기준일 파싱 실패")

        base_url = f"https://finance.naver.com/sise/investorDealTrendDay.naver?bizdate={bizdate}&sosok="
        kospi_html = fetch_text(base_url, timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
        kosdaq_html = fetch_text(f"{base_url}02", timeout=12, encodings=(NAVER_ENCODING, "utf-8"))
        merged_rows = merge_investor_rows(parse_investor_trend_rows(kospi_html), parse_investor_trend_rows(kosdaq_html))
        summary = summarize_investor_rows(merged_rows)
        summary["flowBizDate"] = bizdate
        return CollectorResult(
            summary,
            status_entry("ok", "finance.naver.com", f"시장 수급 {bizdate} 기준 10영업일 수집"),
        )
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        flow_available = has_value(
            base_data.get("retailNetToday"),
            base_data.get("foreignNetToday"),
            base_data.get("institutionNetToday"),
            base_data.get("retailNet10dCum"),
            base_data.get("foreignNet10dCum"),
            base_data.get("institutionNet10dCum"),
        ) or bool(base_data.get("flowBizDate"))
        if flow_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"시장 수급 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "finance.naver.com", f"시장 수급 수집 실패 ({normalize_request_error(error)})"))


def parse_margin_history_rows(html: str, limit: int = 20) -> List[Dict[str, Optional[float]]]:
    rows: List[Dict[str, Optional[float]]] = []
    for tr_content in re.findall(r"<tr[\s\S]*?<\/tr>", html, flags=re.IGNORECASE):
        if 'class="date"' not in tr_content:
            continue
        td_matches = re.findall(r"<td[^>]*>([\s\S]*?)<\/td>", tr_content, flags=re.IGNORECASE)
        if len(td_matches) < 5:
            continue
        date_key = normalize_date_key(strip_html(td_matches[0]))
        balance = safe_number(strip_html(td_matches[4]).replace(",", ""))
        deposit = safe_number(strip_html(td_matches[1]).replace(",", ""))
        if not date_key or balance is None:
            continue
        rows.append({"dateKey": date_key, "balance": balance, "deposit": deposit})
        if len(rows) >= limit:
            break
    return rows


def derive_margin_shock_context(margin_history: List[Dict[str, Optional[float]]], leader_stocks: List[Dict[str, Any]]) -> Dict[str, Optional[float]]:
    rows = sorted(
        [row for row in margin_history if row.get("dateKey") and safe_number(row.get("balance")) is not None],
        key=lambda item: item["dateKey"],
    )
    margin_balance_today = rows[-1]["balance"] if rows else None
    shock_dates = sorted([stock.get("shockDate") for stock in leader_stocks if stock.get("shockDate")])
    shock_anchor_date = shock_dates[0] if shock_dates else None

    if not shock_anchor_date or margin_balance_today is None:
        return {
            "shockAnchorDate": shock_anchor_date,
            "marginBalanceToday": margin_balance_today,
            "marginBalanceBeforeShock": None,
            "marginShockChangePct": None,
        }

    prior_rows = [row for row in rows if row["dateKey"] < shock_anchor_date]
    margin_balance_before_shock = prior_rows[-1]["balance"] if prior_rows else None
    change_pct = None
    if margin_balance_before_shock and margin_balance_before_shock > 0:
        change_pct = ((margin_balance_today - margin_balance_before_shock) / margin_balance_before_shock) * 100

    return {
        "shockAnchorDate": shock_anchor_date,
        "marginBalanceToday": margin_balance_today,
        "marginBalanceBeforeShock": margin_balance_before_shock,
        "marginShockChangePct": change_pct,
    }


def collect_margin(base_data: Dict[str, Any]) -> CollectorResult:
    try:
        html = fetch_text(
            "https://finance.naver.com/sise/sise_deposit.naver",
            timeout=12,
            encodings=(NAVER_ENCODING, "utf-8"),
        )
        margin_history = parse_margin_history_rows(html, limit=20)
        if len(margin_history) < 5:
            raise ValueError("신용융자잔고 5영업일 부족")

        recent_margin_rows = [row for row in reversed(margin_history[:5]) if row["balance"] is not None]
        if len(recent_margin_rows) < 2:
            raise ValueError("신용융자잔고 유효값 부족")

        recent_balances = [row["balance"] for row in recent_margin_rows if row["balance"] is not None]
        slope = calculate_linear_slope(recent_balances)
        margin_slope_start_date = recent_margin_rows[0]["dateKey"] or ""
        margin_slope_end_date = recent_margin_rows[-1]["dateKey"] or ""
        margin_slope_change_pct = None
        if recent_balances[0] and recent_balances[0] > 0:
            margin_slope_change_pct = ((recent_balances[-1] - recent_balances[0]) / recent_balances[0]) * 100

        deposit_values = [row["deposit"] for row in reversed(margin_history[:5]) if row["deposit"] is not None]
        deposit_slope = calculate_linear_slope(deposit_values) if len(deposit_values) >= 3 else None
        customer_deposit_today = margin_history[0]["deposit"]
        leader_stocks = base_data.get("leaderStocks") if isinstance(base_data.get("leaderStocks"), list) else []
        shock_context = derive_margin_shock_context(margin_history, leader_stocks)
        deposit_margin_ratio = None
        if customer_deposit_today and shock_context["marginBalanceToday"] is not None and customer_deposit_today > 0:
            deposit_margin_ratio = shock_context["marginBalanceToday"] / customer_deposit_today

        data_patch = {
            "marginSlope": slope,
            "marginSlope5dChangePct": margin_slope_change_pct,
            "marginSlopeStartDate": margin_slope_start_date,
            "marginSlopeEndDate": margin_slope_end_date,
            "marginBalanceToday": shock_context["marginBalanceToday"],
            "marginBalanceBeforeShock": shock_context["marginBalanceBeforeShock"],
            "marginShockChangePct": shock_context["marginShockChangePct"],
            "shockAnchorDate": shock_context["shockAnchorDate"] or base_data.get("shockAnchorDate") or "",
            "customerDeposit": customer_deposit_today,
            "customerDepositSlope": deposit_slope,
            "depositMarginRatio": deposit_margin_ratio,
        }
        status_state = "ok" if shock_context["shockAnchorDate"] else "partial"
        status_message = (
            f"신용/예탁금 갱신 완료 · 충격 기준일 {shock_context['shockAnchorDate']}"
            if shock_context["shockAnchorDate"]
            else "신용/예탁금 갱신 완료 · 충격 기준일은 기존 대표주 스냅샷 기준"
        )
        return CollectorResult(data_patch, status_entry(status_state, "finance.naver.com", status_message))
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        margin_available = has_value(
            base_data.get("marginSlope"),
            base_data.get("customerDeposit"),
            base_data.get("depositMarginRatio"),
            base_data.get("marginShockChangePct"),
        )
        if margin_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"신용/예탁금 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("error", "finance.naver.com", f"신용/예탁금 수집 실패 ({normalize_request_error(error)})"))


def collect_export_indicator(base_data: Dict[str, Any]) -> CollectorResult:
    indicator_url = (
        "https://kosis.kr/visual/nsportalStats/detailContents.do?"
        "listId=B&statJipyoId=3660&vStatJipyoId=5193"
    )
    try:
        html = fetch_text(indicator_url, timeout=12)
        value_match = re.search(r"현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.\-]+)<\/dd>", html, flags=re.IGNORECASE)
        month_match = re.search(r"기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>", html, flags=re.IGNORECASE)
        month_key = normalize_date_key(month_match.group(1))[:6] if month_match else ""
        export_value = safe_number(value_match.group(1).replace(",", "")) if value_match else None
        if not month_key and export_value is None:
            raise ValueError("수출 지표 페이지 파싱 실패")
        patch: Dict[str, Any] = {}
        if month_key:
            patch["exportLatestMonth"] = month_key
        if export_value is not None:
            patch["exportValueUsd"] = export_value
        return CollectorResult(
            patch,
            status_entry("partial", "kosis.kr", "최신 발표월/레벨만 갱신했습니다. YoY 모멘텀은 별도 산출이 필요합니다."),
        )
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        export_available = bool(base_data.get("exportLatestMonth")) or has_value(
            base_data.get("exportValueUsd"),
            base_data.get("exportYoY"),
            base_data.get("exportYoYDelta"),
            base_data.get("export3mAvgYoY"),
        )
        if export_available:
            return CollectorResult(
                {},
                status_entry("partial", "store/market_analyze_data.json", f"수출 지표 수집 실패 ({normalize_request_error(error)}) · 기존 스냅샷 유지"),
            )
        return CollectorResult({}, status_entry("missing", "kosis.kr", f"수출 지표 미수집 ({normalize_request_error(error)})"))
