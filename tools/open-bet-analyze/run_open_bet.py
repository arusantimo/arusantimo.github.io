#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
import traceback
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from collectors.flow_supply import collect_foreign_inst_flow_batch  # noqa: E402
from collectors.global_macro import collect_global_macro, collect_night_future  # noqa: E402
from collectors.news_theme import collect_news_theme  # noqa: E402
from collectors.overtime_single import collect_overtime_board  # noqa: E402
from collectors.prior_day_bridge import collect_eod_signals  # noqa: E402
from collectors.premarket_open import enrich_premarket_open  # noqa: E402
from engine.ats_execution_plan import get_execution_schedule_summary  # noqa: E402
from engine.fusion_ranker import build_result  # noqa: E402
from router.policy_loader import load_policies, required_metrics  # noqa: E402
from router.quality import MetricEnvelope  # noqa: E402
from scripts.fetch_bridge import close_node_fetch_client, close_playwright_client, run_diagnostics  # noqa: E402
from scripts.progress_logger import OpenBetProgressLogger  # noqa: E402

KST = timezone(timedelta(hours=9))
RESULT_VAR = "window.__OPEN_BET_RESULT__"
RESULTS_DIR = ROOT_DIR / "store" / "results"
LATEST_JS = RESULTS_DIR / "latest.js"
LATEST_JSON = RESULTS_DIR / "latest.json"
MANIFEST_PATH = RESULTS_DIR / "manifest.json"


def trade_date_key() -> str:
    return datetime.now(KST).strftime("%Y%m%d")


def save_raw_envelopes(trade_date: str, envelopes: dict, log: OpenBetProgressLogger) -> None:
    raw_dir = ROOT_DIR / "store" / "raw" / trade_date
    raw_dir.mkdir(parents=True, exist_ok=True)
    for name, env in envelopes.items():
        payload = {
            "metric": env.metric,
            "status": env.status,
            "source": env.source,
            "confidence": env.confidence,
            "value": env.value,
            "errors": env.errors,
        }
        path = raw_dir / f"{name}.json"
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"raw 스냅샷 저장 → store/raw/{trade_date}/ ({len(envelopes)}건)")


def write_artifacts(result: dict) -> None:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    body = json.dumps(result, ensure_ascii=False, indent=2)
    LATEST_JSON.write_text(body, encoding="utf-8")
    LATEST_JS.write_text(f"{RESULT_VAR} = {body};\n", encoding="utf-8")
    manifest = {
        "schemaVersion": result.get("schemaVersion"),
        "tradeDate": result.get("tradeDate"),
        "generatedAt": result.get("generatedAt"),
        "phase": result.get("phase"),
        "dataQualityStatus": (result.get("dataQuality") or {}).get("status"),
        "candidateCount": len(result.get("candidates") or []),
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


def _collect_logged(log: OpenBetProgressLogger, name: str, fn, **kwargs) -> MetricEnvelope:
    log.step_start(name, "수집")
    try:
        env = fn(**kwargs)
        extra = ""
        if env.value and isinstance(env.value, dict):
            if "rows" in env.value:
                extra = f"rows={len(env.value.get('rows') or [])}"
            elif "themes" in env.value:
                extra = f"themes={len(env.value.get('themes') or [])}"
            elif "candidates" in env.value:
                extra = f"cands={len(env.value.get('candidates') or [])}"
        log.metric_done(name, env, extra=extra)
        return env
    except Exception as error:
        log.metric_fail(name, error)
        return MetricEnvelope(metric=name, status="blocked", confidence=0.0, errors=[str(error)])


def collect_phase(
    phase: str,
    trade_date: str,
    log: OpenBetProgressLogger,
    *,
    use_fixture: bool = False,
) -> dict[str, MetricEnvelope]:
    envelopes: dict[str, MetricEnvelope] = {}

    if phase in {"pre_ah", "post_ah", "pre_ats", "final"}:
        log.section("1차 수집 — 종가·매크로·뉴스")
        envelopes["eod_open_bet_signals"] = _collect_logged(
            log, "eod_open_bet_signals", collect_eod_signals, trade_date=trade_date
        )
        envelopes["global_gap_bundle"] = _collect_logged(
            log, "global_gap_bundle", collect_global_macro, use_fixture=use_fixture
        )
        log.step_start("night_kospi_future", "수집")
        envelopes["night_kospi_future"] = collect_night_future()
        macro_val = (envelopes["global_gap_bundle"].value or {}) if envelopes.get("global_gap_bundle") else {}
        if macro_val.get("nq") is not None and not envelopes["night_kospi_future"].is_filled():
            envelopes["night_kospi_future"] = MetricEnvelope(
                metric="night_kospi_future",
                value={"changePct": macro_val.get("nq"), "sourceNote": "NQ proxy from macro bundle"},
                source="macro_proxy",
                confidence=0.55,
            )
            log.metric_done("night_kospi_future", envelopes["night_kospi_future"], extra="proxy=NQ")
        else:
            log.metric_done("night_kospi_future", envelopes["night_kospi_future"])
        envelopes["news_headlines"] = _collect_logged(
            log, "news_headlines", collect_news_theme, trade_date=trade_date
        )

    if phase in {"post_ah", "pre_ats", "final"}:
        log.section("2차 수집 — 시간외·수급·예상 시가")
        envelopes["overtime_single_board"] = _collect_logged(
            log,
            "overtime_single_board",
            collect_overtime_board,
            trade_date=trade_date,
            use_fixture=use_fixture,
        )
        ot_rows = ((envelopes["overtime_single_board"].value or {}).get("rows") or [])
        codes = [str(r.get("code")) for r in ot_rows if r.get("code")]
        if codes:
            envelopes["foreign_inst_flow"] = _collect_logged(
                log, "foreign_inst_flow", collect_foreign_inst_flow_batch, codes=codes
            )
        else:
            log.info("foreign_inst_flow — 후보 코드 없음, SKIP")
            envelopes["foreign_inst_flow"] = MetricEnvelope(
                metric="foreign_inst_flow",
                status="blocked",
                errors=["no overtime codes"],
            )
        log.step_start("expected_open", "예상 시가 병합")
        enriched = enrich_premarket_open(ot_rows)
        envelopes["expected_open"] = enriched
        log.metric_done("expected_open", enriched, extra=f"rows={len(ot_rows)}")
        ot_env = envelopes.get("overtime_single_board")
        if ot_env and ot_env.value:
            envelopes["overnight_volume"] = MetricEnvelope(
                metric="overnight_volume",
                value=ot_env.value,
                source=ot_env.source,
                confidence=ot_env.confidence,
                stale=ot_env.stale,
            )
            log.metric_done("overnight_volume", envelopes["overnight_volume"], extra="mirror=overtime")

    return envelopes


def _print_final_summary(
    log: OpenBetProgressLogger,
    result: dict,
    required: list[str],
    *,
    artifacts_written: bool,
) -> tuple[bool, str]:
    quality = result.get("dataQuality") or {}
    q_status = quality.get("status", "incomplete")
    coverage = quality.get("coverage", 0)
    missing = quality.get("missingRequired") or []
    regime = result.get("regime") or {}
    candidates = result.get("candidates") or []
    held = result.get("heldBack") or []
    sched = result.get("executionSchedule") or get_execution_schedule_summary()

    metric_lines: list[tuple[str, str, str]] = []
    for name in required:
        meta = (quality.get("metrics") or {}).get(name) or {}
        filled = meta.get("filled", False)
        m_status = meta.get("status", "blocked")
        if filled and m_status == "ok":
            metric_lines.append((name, "수집 성공", "ok"))
        elif filled:
            metric_lines.append((name, f"수집됨 ({m_status})", "warn"))
        else:
            metric_lines.append((name, "수집 실패", "fail"))

    log.result_block("메트릭 수집 결과", metric_lines)

    fusion_level = "ok" if q_status == "complete" else "fail"
    fusion_text = f"{q_status} · coverage {coverage:.0%}"
    if q_status != "complete":
        fusion_text += f" · 누락 {', '.join(missing[:4])}"

    regime_level = "ok" if regime.get("openBetActive") else "warn"
    regime_text = f"{regime.get('label', '—')} · {'활성' if regime.get('openBetActive') else '비활성'}"

    log.result_block(
        "분석·융합 결과",
        [
            ("데이터 품질", fusion_text, fusion_level),
            ("레짐 / 시가베팅", regime_text, regime_level),
            ("추천 종목", f"{len(candidates)}종목 · 보류 {len(held)}건", "ok" if candidates else "warn"),
            ("아티팩트 저장", str(LATEST_JS.name) if artifacts_written else "dry-run", "ok" if artifacts_written else "info"),
            ("검토 시간", sched.get("reviewWindow", "07:40~08:00"), "info"),
            ("ATS 매매", (sched.get("ats") or {}).get("entryWindow", "08:00~08:30"), "info"),
        ],
    )

    if candidates:
        log.section("추천 TOP 종목")
        for idx, cand in enumerate(candidates, start=1):
            plan = cand.get("entryPlan") or {}
            buy = (plan.get("buyOrder") or {}).get("limitPrice")
            liq = (plan.get("krxLiquidation") or {}).get("limitPrice")
            log.info(
                f"{idx}. {cand.get('name')} ({cand.get('code')}) "
                f"점수 {cand.get('finalScore')} [{cand.get('grade')}] "
                f"ATS매수 {buy:,}원 · 09:00매도 {liq:,}원"
                if buy and liq
                else f"{idx}. {cand.get('name')} ({cand.get('code')}) 점수 {cand.get('finalScore')}"
            )

    run_ok = q_status == "complete"
    if run_ok and not candidates and not regime.get("openBetActive"):
        msg = "분석 완료 · 레짐 비활성"
        log.final_outcome(True, msg)
        return True, msg
    if run_ok and candidates:
        msg = f"분석 완료 · TOP{len(candidates)}"
        log.final_outcome(True, msg)
        return True, msg
    if run_ok:
        msg = "분석 완료 · 후보 없음"
        log.final_outcome(True, msg)
        return True, msg
    msg = "수집 미완료"
    log.final_outcome(False, msg)
    return False, msg


def _configure_stdout() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except (OSError, ValueError):
            pass


def main() -> int:
    _configure_stdout()
    log = OpenBetProgressLogger()

    parser = argparse.ArgumentParser(description="시가베팅 추천 엔진 배치")
    parser.add_argument(
        "--phase",
        choices=["pre_ah", "post_ah", "pre_ats", "final"],
        default="pre_ats",
        help="수집 phase (pre_ats=07:40 ATS 직전)",
    )
    parser.add_argument("--date", default="", help="YYYYMMDD")
    parser.add_argument("--diagnostics", action="store_true", help="fetch 진단만 실행")
    parser.add_argument("--dry-run", action="store_true", help="파일 저장 없이 stdout")
    parser.add_argument("--fixture", action="store_true", help="샘플/fixture 폴백 사용")
    parser.add_argument("--quiet", action="store_true", help="컬러 로그 최소화")
    args = parser.parse_args()

    if args.quiet:
        log.use_color = False

    trade_date = args.date or trade_date_key()
    now = datetime.now(KST).strftime("%Y-%m-%d %H:%M:%S")

    log.banner(
        "시가베팅 추천 엔진 (open-bet-analyze)",
        f"{now} KST · tradeDate={trade_date} · phase={args.phase}",
    )

    if args.diagnostics:
        log.section("네트워크 진단")
        probes = run_diagnostics()
        hosts_ok = 0
        for row in probes:
            url = row.get("url", "")
            layer_ok = sum(1 for k in ("urllib", "node", "playwright") if row.get(k) == "ok")
            if layer_ok >= 2:
                hosts_ok += 1
            log.info(f"{url} → urllib={row.get('urllib')} node={row.get('node')} pw={row.get('playwright')}")
        log.final_outcome(hosts_ok > 0, "진단 완료")
        return 0 if hosts_ok > 0 else 1

    policies = load_policies()
    required = required_metrics(policies)
    sched = get_execution_schedule_summary()
    log.info(f"필수 메트릭 {len(required)}개 · 분석 마감 {sched.get('analysis', {}).get('deadline', '07:40')}")

    exit_code = 1
    try:
        log.section(f"Phase: {args.phase}")
        envelopes = collect_phase(args.phase, trade_date, log, use_fixture=args.fixture)

        log.section("스냅샷 저장")
        save_raw_envelopes(trade_date, envelopes, log)

        log.section("융합·채점")
        log.step_start("fusion_ranker", "TOP3 산출")
        phase_label = "pre_ats" if args.phase == "pre_ats" else args.phase
        result = build_result(
            envelopes,
            phase=phase_label,
            trade_date=trade_date,
            required_metrics=required,
        )
        log.metric_done(
            "fusion_ranker",
            MetricEnvelope(
                metric="fusion_ranker",
                value={"candidates": len(result.get("candidates") or [])},
                source="engine",
                confidence=1.0,
            ),
            extra=f"TOP={len(result.get('candidates') or [])}",
        )

        artifacts_written = False
        if args.dry_run:
            log.info("dry-run — JSON stdout 출력")
            print(json.dumps(result, ensure_ascii=False, indent=2))
        else:
            write_artifacts(result)
            artifacts_written = True
            log.info(f"결과 저장 → {LATEST_JS}")

        success, _ = _print_final_summary(log, result, required, artifacts_written=artifacts_written)
        exit_code = 0 if success else 1

    except Exception as error:
        log.section("예외 발생")
        log.metric_fail("pipeline", error)
        for line in traceback.format_exc().strip().splitlines()[-6:]:
            log.info(line)
        log.final_outcome(False, "실행 중 오류")
        exit_code = 1
    finally:
        log.section("워커 종료")
        close_node_fetch_client()
        close_playwright_client()
        log.info("Node / Playwright 워커 정리 완료")

    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
