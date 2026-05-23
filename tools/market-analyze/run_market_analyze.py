#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
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


def main() -> int:
    args = parse_args()
    settings_file = Path(args.settings_file).expanduser()
    notify_missing_settings_file(settings_file)
    settings = load_analysis_settings(args)
    if not args.skip_remote:
        network_failures = run_network_diagnostics()
        if network_failures:
            summary = ", ".join(f"{host} ({reason})" for host, reason in network_failures)
            print(
                "[market-analyze] warning: network preflight failed. "
                "라이브 수집 대상 호스트의 DNS/네트워크 확인이 필요합니다. "
                f"{summary}",
                file=sys.stderr,
            )
    result = generate_result(
        skip_remote=args.skip_remote,
        explicit_date=args.explicit_date,
        settings=settings,
    )
    result_path = Path(result["result_path"]).resolve()
    manifest = result["manifest"]
    status = result["payload"]["status"]

    print(f"[market-analyze] result: {result_path}")
    print(f"[market-analyze] latestFile: {manifest['latestFile']}")
    print(f"[market-analyze] latestDate: {manifest['latestDate']}")
    print(f"[market-analyze] schemaVersion: {manifest['schemaVersion']}")
    print(f"[market-analyze] settingsFile: {settings_file}")
    print(
        f"[market-analyze] settings: KOSIS={'yes' if settings['kosisApiKey'] else 'no'} / "
        f"DART={'yes' if settings['dartApiKey'] else 'no'}"
    )
    print(
        "[market-analyze] anchor-status: "
        f"export={status['anchor']['export']['state']} / "
        f"earnings={status['anchor']['earnings']['state']} / "
        f"broadening={status['anchor']['broadening']['state']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
