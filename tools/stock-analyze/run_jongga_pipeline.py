#!/usr/bin/env python3
"""종가베팅 추천 데이터 전체 파이프라인 (수집·채점·JSON/JS 출력)."""

from __future__ import annotations

import argparse
import calendar
import json
import os
import subprocess
import sys
import unittest
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
JONGGA_OUTPUT = ROOT / "jongga" / "output"
JONGGA_TESTS = ROOT / "jongga" / "tests"
DEFAULT_REPLAY_WINDOW_MONTHS = 1
DEFAULT_REPLAY_VARIANT = "stable"
DEFAULT_REPLAY_THRESHOLD_PROFILE = "current"
DEFAULT_REPLAY_REQUIRED_FOLLOWUP_DAYS = 1


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
    emit("STEP", "0/5 환경 점검")
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
    emit("STEP", "1/5 단위 테스트 (jongga/tests)")
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


def run_outcome_backfill(*, analysis_date: str | None, variant: str, lookback_days: int = 30) -> int:
    """과거 추천의 실제 다음날 적중 결과 백필. 비치명적 — 실패해도 파이프라인은 계속한다."""
    emit("STEP", "2/5 추천 적중 백필 (어제 이전 추천의 다음날 OHLC 집계)")
    cmd = [
        sys.executable,
        "-m",
        "jongga.outcome_tracker",
        "--history-js",
        "jongga/output/jongga_history.js",
        "--outcomes-js",
        "jongga/output/jongga_outcomes.js",
        "--out-dir",
        "jongga/output",
        "--lookback-days",
        str(lookback_days),
        "--variant",
        variant,
    ]
    if analysis_date:
        cmd.extend(["--date", analysis_date])
    emit("RUN", " ".join(cmd[2:]))
    try:
        completed = subprocess.run(cmd, cwd=ROOT, check=False)
    except Exception as exc:  # noqa: BLE001
        emit("WARN", f"적중 백필 실행 실패(무시하고 계속): {exc}")
        return 0
    if completed.returncode != 0:
        emit("WARN", f"적중 백필 종료 코드 {completed.returncode} — 무시하고 생성 단계로 진행")
        return 0
    emit("OK", "적중 백필 완료")
    return 0


def run_generate(*, analysis_date: str | None, variant: str, top_limit: int) -> int:
    emit("STEP", "3/5 라이브 수집 + 종가베팅 추천 생성 (stable · canary)")
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


def resolve_pipeline_analysis_date(analysis_date: str | None) -> date:
    from jongga.output_contract import resolve_analysis_date

    return resolve_analysis_date(analysis_date)


def select_replay_dates_from_history(
    *,
    history_js: str | Path,
    cutoff_date: date,
    variant: str = DEFAULT_REPLAY_VARIANT,
    window_months: int = DEFAULT_REPLAY_WINDOW_MONTHS,
    required_followup_days: int = DEFAULT_REPLAY_REQUIRED_FOLLOWUP_DAYS,
) -> list[date]:
    from jongga.output_contract import normalize_variant, read_history_index

    resolved_variant = normalize_variant(variant)
    stable_dates: list[date] = []
    seen: set[date] = set()
    for entry in read_history_index(history_js):
        if normalize_variant(str(entry.get("variant") or "")) != resolved_variant:
            continue
        try:
            entry_date = date.fromisoformat(str(entry.get("date") or ""))
        except ValueError:
            continue
        if entry_date in seen:
            continue
        seen.add(entry_date)
        stable_dates.append(entry_date)

    stable_dates = sorted({entry_date for entry_date in stable_dates if entry_date < cutoff_date})
    if not stable_dates:
        return []

    def subtract_months(value: date, months: int) -> date:
        months = max(1, months)
        year = value.year
        month = value.month - months
        while month <= 0:
            year -= 1
            month += 12
        day = min(value.day, calendar.monthrange(year, month)[1])
        return date(year, month, day)

    window_start = subtract_months(cutoff_date, window_months)
    selected = [entry_date for entry_date in stable_dates if window_start <= entry_date < cutoff_date]
    if selected:
        if len(selected) > required_followup_days:
            return selected[:-required_followup_days]
        return selected

    if len(stable_dates) > required_followup_days:
        return stable_dates[:-required_followup_days]
    return stable_dates


def run_replay_backtest(
    *,
    analysis_date: str | None,
    history_js: str | Path,
    out_dir: str | Path,
    variant: str = DEFAULT_REPLAY_VARIANT,
    threshold_profile: str = DEFAULT_REPLAY_THRESHOLD_PROFILE,
    window_months: int = DEFAULT_REPLAY_WINDOW_MONTHS,
) -> tuple[int, dict[str, object]]:
    from jongga.replay_backtest import run_replay, write_replay_bridge

    emit("STEP", "4/5 리플레이 검증 (자동 stable/current 최근 1개월)")
    cutoff_date = resolve_pipeline_analysis_date(analysis_date)
    replay_dates = select_replay_dates_from_history(
        history_js=history_js,
        cutoff_date=cutoff_date,
        variant=variant,
        window_months=window_months,
    )
    generated_at = datetime.now().isoformat(timespec="seconds")
    if not replay_dates:
        message = f"{variant} replay 대상 날짜가 없어 자동 검증을 생략합니다."
        write_replay_bridge(
            out_dir,
            latest_attempt={
                "status": "missing",
                "message": message,
                "generatedAt": generated_at,
                "variant": variant,
                "thresholdProfile": threshold_profile,
            },
            generated_at=generated_at,
        )
        emit("WARN", message)
        return 0, {"status": "missing", "message": message}

    emit(
        "RUN",
        f"jongga.replay_backtest auto {variant}/{threshold_profile} "
        f"{replay_dates[0].isoformat()}~{replay_dates[-1].isoformat()} ({len(replay_dates)}일, 최근 1개월)",
    )
    try:
        run_record = run_replay(
            date_from=replay_dates[0],
            date_to=replay_dates[-1],
            variant=variant,
            bar="1m",
            threshold_profile=threshold_profile,
            out_dir=out_dir,
            analysis_dates=replay_dates,
        )
    except Exception as exc:  # noqa: BLE001
        message = f"자동 replay 실패(무시하고 계속): {exc}"
        write_replay_bridge(
            out_dir,
            latest_attempt={
                "status": "failed",
                "message": str(exc),
                "generatedAt": generated_at,
                "variant": variant,
                "thresholdProfile": threshold_profile,
            },
            generated_at=generated_at,
        )
        emit("WARN", message)
        return 0, {"status": "failed", "message": str(exc)}

    summary = run_record.get("summary") if isinstance(run_record, dict) else {}
    emit(
        "OK",
        f"자동 replay 완료 · 거래일 {len(replay_dates)} · 후보 {summary.get('candidateCount', 0)} · "
        f"포함 {summary.get('includedCount', summary.get('eligibleCount', 0))} · 체결 {summary.get('tradeCount', 0)}",
    )
    emit("FILE", "jongga/output/replay/replay_runs.js (자동 검증 브리지)")
    return 0, {
        "status": "complete",
        "runId": str(run_record.get("runId") or ""),
        "from": replay_dates[0].isoformat(),
        "to": replay_dates[-1].isoformat(),
        "windowMonths": window_months,
        "windowDays": len(replay_dates),
    }


def validate_outputs(*, analysis_date: str | None, variant: str) -> tuple[int, dict[str, object]]:
    emit("STEP", "5/5 산출물 검증")
    compact = _compact_date(analysis_date)
    month_folder = compact[:6]
    required: list[Path] = [
        JONGGA_OUTPUT / month_folder / f"latest_{compact}.json",
        JONGGA_OUTPUT / month_folder / f"jongga_data_{compact}.js",
        JONGGA_OUTPUT / "jongga_history.js",
        JONGGA_OUTPUT / "latest.json",
        JONGGA_OUTPUT / "jongga_data.js",
        JONGGA_OUTPUT / "replay" / "replay_runs.js",
    ]
    if variant in {"all", "canary"}:
        required.extend(
            [
                JONGGA_OUTPUT / month_folder / f"latest_{compact}_canary.json",
                JONGGA_OUTPUT / month_folder / f"jongga_data_{compact}_canary.js",
            ]
        )
    missing = [path for path in required if not path.exists()]
    if missing:
        for path in missing:
            emit("FAIL", f"누락: {path.relative_to(ROOT)}")
        return 1, {}

    stable_path = JONGGA_OUTPUT / month_folder / f"latest_{compact}.json"
    payload = json.loads(stable_path.read_text(encoding="utf-8"))
    quality = payload.get("dataQuality") if isinstance(payload.get("dataQuality"), dict) else {}
    status = str(quality.get("status") or "unknown")
    slot = (payload.get("slots") or [{}])[0]
    entries = slot.get("entries") if isinstance(slot, dict) else {}
    counts = {
        "pullback": len(entries.get("pullback") or []),
        "breakout": len(entries.get("breakout") or entries.get("momentum") or []),
        "accumulation": len(entries.get("accumulation") or []),
        "reversal": len(entries.get("reversal") or []),
    }
    emit(
        "OK",
        f"stable 품질={status} · 눌림목 {counts['pullback']} · 매집 {counts['accumulation']} · 돌파 {counts['breakout']} · 급락반등 {counts['reversal']}",
    )
    outcomes_path = JONGGA_OUTPUT / "jongga_outcomes.js"
    if outcomes_path.exists():
        emit("FILE", "jongga/output/jongga_outcomes.js (적중 추적)")
    else:
        emit("WARN", "jongga_outcomes.js 없음 — 적중 데이터 축적 전(콜드스타트)이거나 백필 생략됨")
    replay_runs_path = JONGGA_OUTPUT / "replay" / "replay_runs.json"
    if replay_runs_path.exists():
        emit("FILE", "jongga/output/replay/replay_runs.json")
    emit("FILE", f"jongga/output/{month_folder}/jongga_data_{compact}.js")
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
    parser.add_argument(
        "--skip-outcomes",
        action="store_true",
        help="추천 적중 백필 단계 생략 (오프라인/빠른 실행용)",
    )
    parser.add_argument(
        "--skip-replay",
        action="store_true",
        help="자동 replay 검증 단계 생략",
    )
    parser.add_argument(
        "--replay-window-months",
        type=int,
        default=DEFAULT_REPLAY_WINDOW_MONTHS,
        help="자동 replay 기본 기간(개월)",
    )
    parser.add_argument(
        "--replay-variant",
        choices=["stable", "canary"],
        default=DEFAULT_REPLAY_VARIANT,
        help="자동 replay 채널",
    )
    parser.add_argument(
        "--replay-threshold-profile",
        choices=["current", "strict-doc", "relaxed"],
        default=DEFAULT_REPLAY_THRESHOLD_PROFILE,
        help="자동 replay 임계값 프로필",
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

    if not args.skip_outcomes:
        run_outcome_backfill(analysis_date=args.date, variant=args.variant)
    else:
        emit("STEP", "2/5 추천 적중 백필 — 생략(--skip-outcomes)")

    gen_code = run_generate(
        analysis_date=args.date,
        variant=args.variant,
        top_limit=args.top_limit,
    )
    if gen_code != 0:
        print_summary(exit_code=gen_code, quality_status="")
        return gen_code

    if not args.skip_replay:
        run_replay_backtest(
            analysis_date=args.date,
            history_js=JONGGA_OUTPUT / "jongga_history.js",
            out_dir=JONGGA_OUTPUT,
            variant=args.replay_variant,
            threshold_profile=args.replay_threshold_profile,
            window_months=args.replay_window_months,
        )
    else:
        emit("STEP", "4/5 리플레이 검증 — 생략(--skip-replay)")
        from jongga.replay_backtest import write_replay_bridge

        write_replay_bridge(
            JONGGA_OUTPUT,
            latest_attempt={
                "status": "skipped",
                "message": "사용자 요청으로 자동 replay를 생략했습니다.",
                "generatedAt": datetime.now().isoformat(timespec="seconds"),
                "variant": args.replay_variant,
                "thresholdProfile": args.replay_threshold_profile,
            },
        )

    validate_code, meta = validate_outputs(analysis_date=args.date, variant=args.variant)
    quality_status = str(meta.get("status") or "")
    print_summary(exit_code=validate_code, quality_status=quality_status)
    return validate_code


if __name__ == "__main__":
    raise SystemExit(main())
