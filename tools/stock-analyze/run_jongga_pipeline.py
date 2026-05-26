#!/usr/bin/env python3
"""종가베팅 추천 데이터 전체 파이프라인 (수집·채점·JSON/JS 출력)."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import unittest
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
JONGGA_OUTPUT = ROOT / "jongga" / "output"
JONGGA_TESTS = ROOT / "jongga" / "tests"


def prepare_console_output() -> None:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if not callable(reconfigure):
            continue
        try:
            reconfigure(encoding="utf-8", errors="replace")
        except Exception:  # noqa: BLE001
            continue


def emit(label: str, message: str) -> None:
    print(f"[{label}] {message}")


def run_preflight() -> list[str]:
    warnings: list[str] = []
    emit("STEP", "0/3 환경 점검")
    emit("OK", f"Python {sys.version.split()[0]} · cwd={ROOT.name}")
    try:
        import playwright  # noqa: F401
    except ImportError:
        warnings.append(
            "playwright 미설치 — KIND/토스 브라우저 보강이 생략될 수 있습니다. "
            "pip install playwright && playwright install chromium"
        )
    chrome = os.getenv("MARKET_ANALYZE_PLAYWRIGHT_EXECUTABLE_PATH", "").strip()
    if chrome:
        emit("OK", f"Chrome 경로: {chrome}")
    elif warnings:
        emit("WARN", warnings[0])
    else:
        emit("OK", "Playwright 사용 가능")
    return warnings


def run_unit_tests() -> int:
    emit("STEP", "1/3 단위 테스트 (jongga/tests)")
    suite = unittest.defaultTestLoader.discover(
        start_dir=str(JONGGA_TESTS),
        pattern="test_*.py",
        top_level_dir=str(ROOT),
    )
    result = unittest.TextTestRunner(verbosity=1).run(suite)
    if result.wasSuccessful():
        emit("OK", f"테스트 통과 ({result.testsRun}건)")
        return 0
    emit("FAIL", f"테스트 실패 — errors={len(result.errors)} failures={len(result.failures)}")
    return 1


def run_generate(*, analysis_date: str | None, variant: str, top_limit: int) -> int:
    emit("STEP", "2/3 라이브 수집 + 종가베팅 추천 생성 (stable · canary)")
    cmd = [
        sys.executable,
        "-m",
        "jongga.generate_latest",
        "--out-dir",
        "jongga/output",
        "--history-js",
        "jongga/output/jongga_history.js",
        "--out",
        "jongga/output/latest.json",
        "--bridge-js",
        "jongga/output/jongga_data.js",
        "--variant",
        variant,
        "--top-limit",
        str(top_limit),
    ]
    if analysis_date:
        cmd.extend(["--date", analysis_date])
    emit("RUN", " ".join(cmd[2:]))
    completed = subprocess.run(cmd, cwd=ROOT, check=False)
    if completed.returncode != 0:
        emit("FAIL", f"jongga.generate_latest 종료 코드 {completed.returncode}")
        return completed.returncode
    emit("OK", "jongga.generate_latest 완료")
    return 0


def _compact_date(analysis_date: str | None) -> str:
    if analysis_date:
        return analysis_date.replace("-", "")
    from jongga.output_contract import resolve_analysis_date

    return resolve_analysis_date(None).strftime("%Y%m%d")


def validate_outputs(*, analysis_date: str | None, variant: str) -> tuple[int, dict[str, object]]:
    emit("STEP", "3/3 산출물 검증")
    compact = _compact_date(analysis_date)
    required: list[Path] = [
        JONGGA_OUTPUT / f"latest_{compact}.json",
        JONGGA_OUTPUT / f"jongga_data_{compact}.js",
        JONGGA_OUTPUT / "jongga_history.js",
        JONGGA_OUTPUT / "latest.json",
        JONGGA_OUTPUT / "jongga_data.js",
    ]
    if variant in {"all", "canary"}:
        required.extend(
            [
                JONGGA_OUTPUT / f"latest_{compact}_canary.json",
                JONGGA_OUTPUT / f"jongga_data_{compact}_canary.js",
            ]
        )
    missing = [path for path in required if not path.exists()]
    if missing:
        for path in missing:
            emit("FAIL", f"누락: {path.relative_to(ROOT)}")
        return 1, {}

    stable_path = JONGGA_OUTPUT / f"latest_{compact}.json"
    payload = json.loads(stable_path.read_text(encoding="utf-8"))
    quality = payload.get("dataQuality") if isinstance(payload.get("dataQuality"), dict) else {}
    status = str(quality.get("status") or "unknown")
    slot = (payload.get("slots") or [{}])[0]
    entries = slot.get("entries") if isinstance(slot, dict) else {}
    counts = {
        "pullback": len(entries.get("pullback") or []),
        "momentum": len(entries.get("momentum") or []),
        "reversal": len(entries.get("reversal") or []),
    }
    emit("OK", f"stable 품질={status} · 눌림목 {counts['pullback']} · 수급 {counts['momentum']} · 급락반등 {counts['reversal']}")
    emit("FILE", f"jongga/output/jongga_data_{compact}.js")
    emit("FILE", "jongga/output/latest.json (레거시 브리지)")
    emit("UI", "tools/stock-analyze/index.html")
    if status != "complete":
        emit("WARN", "dataQuality가 complete가 아닙니다. 로그의 FAIL/WARN 항목을 확인하세요.")
    return 0, {"status": status, "counts": counts}


def print_summary(*, exit_code: int, quality_status: str) -> None:
    border = "=" * 60
    print()
    print(f"  {border}")
    if exit_code == 0 and quality_status == "complete":
        print("    SUCCESS — 종가베팅 추천 데이터 생성 완료")
    elif exit_code == 0:
        print("    SUCCESS (partial) — 산출물 생성됨, 일부 수집 미완료")
    else:
        print("    FAILED — 파이프라인 중단")
    print(f"    {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  {border}")
    print()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="종가베팅 추천 데이터 전체 파이프라인 (테스트 → 수집·채점 → 검증)",
    )
    parser.add_argument("--date", help="분석일 YYYY-MM-DD (기본: KST 오늘)")
    parser.add_argument(
        "--variant",
        choices=["all", "stable", "canary"],
        default="all",
        help="출력 채널 (기본: stable + canary)",
    )
    parser.add_argument("--top-limit", type=int, default=40, help="거래대금 TOP universe (최대 40)")
    parser.add_argument("--with-tests", action="store_true", help="생성 전 jongga 단위 테스트 실행")
    parser.add_argument(
        "--tests-only",
        action="store_true",
        help="단위 테스트만 실행하고 종료",
    )
    return parser


def main() -> int:
    prepare_console_output()
    os.environ.setdefault("PYTHONUTF8", "1")
    if os.getenv("OPEN_BET_FORCE_COLOR") or os.getenv("FORCE_COLOR"):
        os.environ.setdefault("FORCE_COLOR", "1")

    args = build_parser().parse_args()
    print()
    print("  " + "=" * 58)
    print("    종가베팅 추천 데이터 파이프라인 (stock-analyze/jongga)")
    print("  " + "=" * 58)
    print()

    run_preflight()

    if args.with_tests or args.tests_only:
        test_code = run_unit_tests()
        if test_code != 0:
            print_summary(exit_code=test_code, quality_status="")
            return test_code
        if args.tests_only:
            print_summary(exit_code=0, quality_status="complete")
            return 0

    gen_code = run_generate(
        analysis_date=args.date,
        variant=args.variant,
        top_limit=args.top_limit,
    )
    if gen_code != 0:
        print_summary(exit_code=gen_code, quality_status="")
        return gen_code

    validate_code, meta = validate_outputs(analysis_date=args.date, variant=args.variant)
    quality_status = str(meta.get("status") or "")
    print_summary(exit_code=validate_code, quality_status=quality_status)
    return validate_code


if __name__ == "__main__":
    raise SystemExit(main())
