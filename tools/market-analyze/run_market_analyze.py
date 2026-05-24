#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import socket
import sys
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent
DEFAULT_SETTINGS_PATH = ROOT_DIR / "store" / "analysis_settings.local.json"
DIAGNOSTIC_HOSTS = [
    "kosis.kr",
    "opendart.fss.or.kr",
    "finance.naver.com",
    "comp.fnguide.com",
    "tradingeconomics.com",
    "query1.finance.yahoo.com",
    "open.er-api.com",
]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.result_generator import generate_result  # noqa: E402


ANSI_RESET = "\033[0m"
ANSI_STYLES = {
    "blue": "\033[34m",
    "cyan": "\033[36m",
    "green": "\033[32m",
    "yellow": "\033[33m",
    "red": "\033[31m",
    "magenta": "\033[35m",
    "dim": "\033[2m",
    "bold": "\033[1m",
}


def stream_supports_color(stream) -> bool:
    if os.environ.get("NO_COLOR"):
        return False
    if os.environ.get("MARKET_ANALYZE_FORCE_COLOR") or os.environ.get("FORCE_COLOR"):
        return True
    return bool(getattr(stream, "isatty", lambda: False)())


class ProgressLogger:
    COMPONENT_WIDTH = 24
    CONTINUATION_INDENT = " " * 54

    def __init__(self, stream=None) -> None:
        self.stream = stream or sys.stdout
        self.use_color = stream_supports_color(self.stream)
        self.step = 0

    def _paint(self, text: str, *styles: str) -> str:
        if not self.use_color:
            return text
        prefix = "".join(ANSI_STYLES.get(style, "") for style in styles)
        return f"{prefix}{text}{ANSI_RESET}" if prefix else text

    def _style_state_tokens(self, message: str) -> str:
        def repl(match: re.Match[str]) -> str:
            state = match.group(1).lower()
            color = {
                "ok": "green",
                "partial": "yellow",
                "missing": "dim",
                "error": "red",
            }.get(state, "cyan")
            return f"state={self._paint(state.upper(), color, 'bold')}"

        styled = re.sub(r"state=(ok|partial|missing|error)", repl, message, flags=re.IGNORECASE)
        styled = re.sub(
            r"\b(remote)=(live|live-with-warning|offline-fallback|skip)\b",
            lambda match: (
                f"{self._paint(match.group(1), 'blue', 'bold')}="
                f"{self._paint(match.group(2), 'green' if match.group(2) == 'live' else 'yellow', 'bold')}"
            ),
            styled,
        )
        styled = re.sub(
            r"\b(KOSIS|DART)=(yes|no)\b",
            lambda match: (
                f"{self._paint(match.group(1), 'blue', 'bold')}="
                f"{self._paint(match.group(2).upper(), 'green' if match.group(2) == 'yes' else 'yellow', 'bold')}"
            ),
            styled,
        )
        styled = re.sub(
            r"\b([A-Za-z][A-Za-z0-9_.-]+)=(ok|partial|missing|error)\b",
            lambda match: (
                f"{self._paint(match.group(1), 'blue', 'bold')}="
                f"{self._paint(match.group(2).upper(), {'ok': 'green', 'partial': 'yellow', 'missing': 'dim', 'error': 'red'}[match.group(2)], 'bold')}"
            )
            if match.group(1) != "state"
            else match.group(0),
            styled,
            flags=re.IGNORECASE,
        )
        styled = re.sub(
            r"(riskIndex|anchor|support|latest)=([^\s,)]+)",
            lambda match: f"{self._paint(match.group(1), 'magenta', 'bold')}={self._paint(match.group(2), 'bold')}",
            styled,
        )
        styled = re.sub(
            r"(source=)([^|]+)",
            lambda match: f"{self._paint(match.group(1), 'dim')}{self._paint(match.group(2).strip(), 'dim')}",
            styled,
        )
        return styled

    def _tag(self, level: str) -> str:
        label_map = {
            "info": ("INFO", "cyan"),
            "success": ("DONE", "green"),
            "warn": ("WARN", "yellow"),
            "error": ("FAIL", "red"),
        }
        label, color = label_map.get(level, ("INFO", "cyan"))
        return self._paint(label, color, "bold")

    def _state_badge(self, state: str) -> str:
        state_key = (state or "missing").lower()
        color = {
            "ok": "green",
            "partial": "yellow",
            "missing": "dim",
            "error": "red",
        }.get(state_key, "cyan")
        return self._paint(f"[{state_key.upper()}]", color, "bold")

    def _component_label(self, component: str) -> str:
        return self._paint(component.ljust(self.COMPONENT_WIDTH), "blue", "bold")

    def _truncate(self, text: str, limit: int) -> str:
        if len(text) <= limit:
            return text
        return f"{text[: limit - 3].rstrip()}..."

    def _parse_result_detail(self, detail: str) -> dict[str, str]:
        parsed: dict[str, str] = {}
        for chunk in detail.split("|"):
            part = chunk.strip()
            if not part:
                continue
            if "=" in part:
                key, value = part.split("=", 1)
                parsed[key.strip()] = value.strip()
            else:
                parsed["message"] = " · ".join(filter(None, [parsed.get("message", ""), part]))
        return parsed

    def _format_component_result(self, component: str, action: str, detail: str) -> list[str]:
        parsed = self._parse_result_detail(detail)
        state = parsed.get("state", "missing")
        source = parsed.get("source", "")
        message = parsed.get("message", "")
        body = self._truncate(message or action, 120)
        lines = [f"{self._component_label(component)} {action} {self._state_badge(state)} {body}"]
        if source:
            lines.append(f"{self.CONTINUATION_INDENT}{self._paint('source', 'dim')}: {self._paint(self._truncate(source, 120), 'dim')}")
        return lines

    def _format_simple_component(self, component: str, action: str) -> list[str]:
        return [f"{self._component_label(component)} {action}"]

    def _format_summary(self, message: str) -> list[str]:
        settings_loaded_match = re.match(
            r"^설정 로드 완료 \(settingsFile=(.+), KOSIS=(yes|no), DART=(yes|no)\)$",
            message,
        )
        if settings_loaded_match:
            settings_file, kosis, dart = settings_loaded_match.groups()
            return [
                "설정 로드 완료",
                f"{self.CONTINUATION_INDENT}{self._paint('settingsFile', 'dim')}: {self._paint(self._truncate(settings_file, 120), 'dim')}",
                f"{self.CONTINUATION_INDENT}{self._style_state_tokens(f'KOSIS={kosis}  |  DART={dart}')}",
            ]

        network_failure_match = re.match(
            r"^네트워크 프리플라이트 실패\. 라이브 수집 대상 호스트의 DNS/네트워크 확인이 필요하지만 수집은 계속 시도합니다\. (.+)$",
            message,
        )
        if network_failure_match:
            return [
                "네트워크 프리플라이트 실패",
                f"{self.CONTINUATION_INDENT}{self._paint('reason', 'dim')}: DNS/네트워크 경고가 있지만 curl/개별 fallback을 포함해 수집을 계속 시도합니다.",
                f"{self.CONTINUATION_INDENT}{self._paint('hosts', 'dim')}: {self._paint(self._truncate(network_failure_match.group(1), 140), 'dim')}",
            ]

        initial_match = re.match(r"^초기 입력 준비 완료 \(snapshot=(.+), remote=(.+)\)$", message)
        if initial_match:
            snapshot, remote = initial_match.groups()
            remote_key = remote.strip().lower()
            remote_color = "green" if remote_key == "live" else "yellow"
            return [
                "초기 입력 준비 완료",
                f"{self.CONTINUATION_INDENT}{self._paint('snapshot', 'dim')}: {self._paint(self._truncate(snapshot, 120), 'dim')}",
                f"{self.CONTINUATION_INDENT}{self._paint('remote', 'dim')}: {self._paint(remote, remote_color, 'bold')}",
            ]

        synth_match = re.match(r"^합성 지표 계산 완료 \((.+)\)$", message)
        if synth_match:
            payload = synth_match.group(1).replace(", ", " / ")
            return [self._style_state_tokens(f"합성 지표 계산 완료 ({payload})")]

        summary_match = re.match(r"^(result|latestFile|latestDate|schemaVersion|settingsFile)=(.+)$", message)
        if summary_match:
            key, value = summary_match.groups()
            return [f"{self._paint(key, 'blue', 'bold')}: {self._truncate(value, 140)}"]

        settings_match = re.match(r"^settings: (.+)$", message)
        if settings_match:
            return [self._style_state_tokens(settings_match.group(1).replace(" / ", "  |  "))]

        anchor_match = re.match(r"^anchor-status: (.+)$", message)
        if anchor_match:
            return [f"{self._paint('anchor-status', 'blue', 'bold')}: {self._style_state_tokens(anchor_match.group(1))}"]

        return [self._style_state_tokens(message)]

    def _format_message(self, message: str) -> list[str]:
        component_action_match = re.match(r"^(?P<component>[\w.-]+)\s+(?P<action>수집 시작|오프라인 대체 경로 적용)$", message)
        if component_action_match:
            return self._format_simple_component(
                component_action_match.group("component"),
                component_action_match.group("action"),
            )

        component_result_match = re.match(
            r"^(?P<component>[\w.-]+)\s+(?P<action>수집 완료|오프라인 대체 완료)\s+->\s+(?P<detail>.+)$",
            message,
        )
        if component_result_match:
            return self._format_component_result(
                component_result_match.group("component"),
                component_result_match.group("action"),
                component_result_match.group("detail"),
            )

        return self._format_summary(message)

    def log(self, level: str, message: str) -> None:
        self.step += 1
        step_text = self._paint(f"STEP {self.step:02d}", "bold", "magenta")
        lines = self._format_message(message)
        print(f"[market-analyze] {step_text} {self._tag(level)} {lines[0]}", file=self.stream, flush=True)
        for line in lines[1:]:
            print(line, file=self.stream, flush=True)

    def info(self, message: str) -> None:
        self.log("info", message)

    def success(self, message: str) -> None:
        self.log("success", message)

    def warn(self, message: str) -> None:
        self.log("warn", message)

    def error(self, message: str) -> None:
        self.log("error", message)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate market-analyze result artifacts (result-YYYYMMDD.js + manifest.json)."
    )
    parser.add_argument(
        "--skip-remote",
        action="store_true",
        help="Skip remote collection and build artifacts from the existing local snapshot only.",
    )
    parser.add_argument(
        "--date",
        dest="explicit_date",
        default=None,
        help="Override the result date key (YYYYMMDD). Defaults to today in local time.",
    )
    parser.add_argument(
        "--settings-file",
        dest="settings_file",
        default=str(DEFAULT_SETTINGS_PATH),
        help="Optional local JSON file with kosisApiKey / dartApiKey. Defaults to store/analysis_settings.local.json.",
    )
    parser.add_argument(
        "--kosis-api-key",
        dest="kosis_api_key",
        default=None,
        help="Override the KOSIS API key for this run.",
    )
    parser.add_argument(
        "--dart-api-key",
        dest="dart_api_key",
        default=None,
        help="Override the OpenDART API key for this run.",
    )
    return parser.parse_args()


def load_analysis_settings(args: argparse.Namespace) -> dict:
    settings = {
        "kosisApiKey": os.environ.get("MARKET_ANALYZE_KOSIS_API_KEY", "").strip(),
        "dartApiKey": os.environ.get("MARKET_ANALYZE_DART_API_KEY", "").strip(),
    }

    settings_file = Path(args.settings_file).expanduser()
    if settings_file.exists():
        try:
            payload = json.loads(settings_file.read_text(encoding="utf-8"))
            if isinstance(payload, dict):
                settings["kosisApiKey"] = str(payload.get("kosisApiKey") or settings["kosisApiKey"]).strip()
                settings["dartApiKey"] = str(payload.get("dartApiKey") or settings["dartApiKey"]).strip()
        except (OSError, json.JSONDecodeError) as error:
            print(f"[market-analyze] warning: settings file ignored ({settings_file}: {error})", file=sys.stderr)

    if args.kosis_api_key is not None:
        settings["kosisApiKey"] = str(args.kosis_api_key).strip()
    if args.dart_api_key is not None:
        settings["dartApiKey"] = str(args.dart_api_key).strip()

    return settings


def notify_missing_settings_file(settings_file: Path) -> None:
    if settings_file.exists():
        return
    example_file = ROOT_DIR / "store" / "analysis_settings.example.json"
    print(
        "[market-analyze] notice: settings file not found "
        f"({settings_file}). "
        "로컬 API 키 없이 실행합니다. "
        f"필요하면 {example_file} 를 참고해 같은 위치에 analysis_settings.local.json 을 만들어 주세요.",
        file=sys.stderr,
    )


def run_network_diagnostics() -> list[tuple[str, str]]:
    failures: list[tuple[str, str]] = []
    for host in DIAGNOSTIC_HOSTS:
        try:
            socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
        except OSError as error:
            failures.append((host, str(error)))
    return failures


LOGGER = ProgressLogger()


def infer_progress_level(message: str) -> str:
    if "실패" in message or "오류" in message:
        return "error" if "state=error" in message.lower() else "warn"
    if "건너뜀" in message or "대체" in message or "offline" in message.lower():
        return "warn"
    if "완료" in message or "통과" in message or "승격" in message or "갱신" in message:
        return "success"
    return "info"


def log_progress(message: str) -> None:
    level = infer_progress_level(message)
    if level == "success":
        LOGGER.success(message)
    elif level == "warn":
        LOGGER.warn(message)
    elif level == "error":
        LOGGER.error(message)
    else:
        LOGGER.info(message)


def main() -> int:
    args = parse_args()
    settings_file = Path(args.settings_file).expanduser()
    notify_missing_settings_file(settings_file)
    LOGGER.info("run_market_analyze 시작")
    settings = load_analysis_settings(args)
    LOGGER.info(
        "설정 로드 완료 "
        f"(settingsFile={settings_file}, KOSIS={'yes' if settings['kosisApiKey'] else 'no'}, "
        f"DART={'yes' if settings['dartApiKey'] else 'no'})"
    )
    network_failures: list[tuple[str, str]] = []
    if not args.skip_remote:
        LOGGER.info("네트워크 프리플라이트 시작")
        network_failures = run_network_diagnostics()
        if network_failures:
            summary = ", ".join(f"{host} ({reason})" for host, reason in network_failures)
            LOGGER.warn(
                "네트워크 프리플라이트 실패. "
                "라이브 수집 대상 호스트의 DNS/네트워크 확인이 필요하지만 수집은 계속 시도합니다. "
                f"{summary}"
            )
        else:
            LOGGER.success("네트워크 프리플라이트 통과")
    else:
        LOGGER.warn("skip-remote 옵션 감지 -> 원격 수집 건너뜀")
    result = generate_result(
        skip_remote=args.skip_remote,
        explicit_date=args.explicit_date,
        settings=settings,
        network_failures=network_failures,
        progress_callback=log_progress,
    )
    result_path = Path(result["result_path"]).resolve()
    manifest = result["manifest"]
    status = result["payload"]["status"]

    LOGGER.success(f"result={result_path}")
    LOGGER.info(f"latestFile={manifest['latestFile']}")
    LOGGER.info(f"latestDate={manifest['latestDate']}")
    LOGGER.info(f"schemaVersion={manifest['schemaVersion']}")
    LOGGER.info(f"settingsFile={settings_file}")
    LOGGER.info(
        f"settings: KOSIS={'yes' if settings['kosisApiKey'] else 'no'} / "
        f"DART={'yes' if settings['dartApiKey'] else 'no'}"
    )
    LOGGER.info(
        "anchor-status: "
        f"export={status['anchor']['export']['state']} / "
        f"earnings={status['anchor']['earnings']['state']} / "
        f"broadening={status['anchor']['broadening']['state']} / "
        f"sectorBreadth={status['anchor']['sectorBreadth']['state']} / "
        f"valuation={status['anchor']['valuation']['state']} / "
        f"support={status['anchor']['support']['state']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
