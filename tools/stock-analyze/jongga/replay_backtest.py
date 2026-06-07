from __future__ import annotations

import argparse
import json
import hashlib
import uuid
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

from jongga.entry_policy import compute_entry_eligibility
from jongga.grade_policy import REVERSAL_GRADE_MIN, TREND_GRADE_MIN
from jongga.outcome_tracker import compute_outcome, extract_context_dims, load_daily_payload
from jongga.output_contract import VARIANT_CANARY, VARIANT_STABLE, compact_date, iter_buy_entries, normalize_variant, read_js_assignment
from jongga.replay_market_data import TICK_PROXY_SOURCE, build_replay_market_data
from jongga.sim_broker import simulate_trade

REPLAY_RUNS_MARKER = "JONGGA_REPLAY_RUNS"
REPLAY_INCLUDE_GRADE_SCORE_MIN = 6.0
REPLAY_INCLUDE_GRADE_MIN = "B"
REPLAY_RULE_VERSION = "2026-06-06-cumulative-v1"
REPLAY_CASE_RECOMMENDATION = "recommendation"
REPLAY_CASE_REPLAY = "replay"
REPLAY_CASE_A7PLUS = "a7plus"
REPLAY_VALIDATION_POLICY = {
    "mode": "relaxed",
    "label": "완화 모드",
    "summary": "D+1만 있어도 replay 포함",
    "detail": "D+2가 있으면 3일차까지 연장",
    "minFollowupDays": 1,
    "maxFollowupDays": 2,
}
STRATEGY_ORDER = ("pullback", "accumulation", "breakout", "reversal")

THRESHOLD_PROFILES = {
    "current": {
        "trend": dict(TREND_GRADE_MIN),
        "reversal": dict(REVERSAL_GRADE_MIN),
    },
    "strict-doc": {
        "trend": {"S": 9.0, "A": 7.5, "B": 6.0},
        "reversal": {"S": 8.5, "A": 7.0, "B": 5.5},
    },
    "relaxed": {
        "trend": {grade: round(score - 0.5, 1) for grade, score in TREND_GRADE_MIN.items()},
        "reversal": {grade: round(score - 0.5, 1) for grade, score in REVERSAL_GRADE_MIN.items()},
    },
}


def threshold_set(strategy: str, profile: str) -> dict[str, float]:
    normalized = "reversal" if strategy == "reversal" else "trend"
    return THRESHOLD_PROFILES[profile][normalized]


def grade_from_threshold_profile(grade_score: float, strategy: str, profile: str) -> str:
    thresholds = threshold_set(strategy, profile)
    if grade_score >= thresholds["S"]:
        return "S"
    if grade_score >= thresholds["A"]:
        return "A"
    if grade_score >= thresholds["B"]:
        return "B"
    return "C"


def iter_dates(date_from: date, date_to: date):
    current = date_from
    while current <= date_to:
        if current.weekday() < 5:
            yield current
        current += timedelta(days=1)


def normalize_analysis_dates(analysis_dates: list[date] | None) -> list[date]:
    if not analysis_dates:
        return []
    return sorted({day for day in analysis_dates if day.weekday() < 5})


def build_replay_rule_spec(*, variant: str, threshold_profile: str, bar: str) -> dict[str, Any]:
    return {
        "ruleVersion": REPLAY_RULE_VERSION,
        "variant": normalize_variant(variant),
        "thresholdProfile": str(threshold_profile or ""),
        "bar": str(bar or ""),
        "includeGradeScoreMin": REPLAY_INCLUDE_GRADE_SCORE_MIN,
        "includeGradeMin": REPLAY_INCLUDE_GRADE_MIN,
        "validationPolicy": REPLAY_VALIDATION_POLICY,
    }


def replay_rule_signature(rule_spec: dict[str, Any]) -> str:
    serialized = json.dumps(rule_spec, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha1(serialized.encode("utf-8")).hexdigest()


def replay_rule_state(*, variant: str, threshold_profile: str, bar: str) -> dict[str, Any]:
    spec = build_replay_rule_spec(variant=variant, threshold_profile=threshold_profile, bar=bar)
    return {
        "spec": spec,
        "signature": replay_rule_signature(spec),
    }


def _tick_proxy_source(entry: dict[str, Any]) -> str | None:
    toss = entry.get("toss") if isinstance(entry.get("toss"), dict) else {}
    source = str(toss.get("source") or "")
    if "ticks" in source:
        return TICK_PROXY_SOURCE
    return None


def replay_entry_view(entry: dict[str, Any], strategy: str, threshold_profile: str) -> dict[str, Any]:
    grade_score = float(entry.get("gradeScore") or 0.0)
    replay_grade = grade_from_threshold_profile(float(entry.get("gradeScore") or 0.0), strategy, threshold_profile)
    replay_included = grade_score >= REPLAY_INCLUDE_GRADE_SCORE_MIN and replay_grade in {"S", "A", "B"}
    replay_a7plus = grade_score >= 7.0 and replay_grade == "A"
    eligibility = compute_entry_eligibility(
        strategy,
        replay_grade,
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
    )
    return {
        "strategy": strategy,
        "name": str(entry.get("name") or ""),
        "code": str(entry.get("code") or ""),
        "originalGrade": str(entry.get("grade") or ""),
        "replayGrade": replay_grade,
        "gradeScore": grade_score,
        "strictScore": float(entry.get("strictScore") or 0.0),
        "signalScore": float(entry.get("signalScore") or entry.get("score") or 0.0),
        "entryPrice": float(entry.get("entryPrice") or entry.get("currentPrice") or 0.0),
        "entryEligibleOriginal": bool(entry.get("entryEligible")),
        "historyRecommendation": bool(entry.get("historyRecommendation")),
        "replayIncluded": replay_included,
        "replayIncludeRule": f"gradeScore>={REPLAY_INCLUDE_GRADE_SCORE_MIN:.1f} AND replayGrade>={REPLAY_INCLUDE_GRADE_MIN}",
        "replayA7Plus": replay_a7plus,
        "replayA7PlusRule": "gradeScore>=7.0 AND replayGrade==A",
        **eligibility,
    }


def matches_replay_case(item: dict[str, Any], case_key: str) -> bool:
    normalized = str(case_key or "").strip()
    if normalized == "all":
        return True
    if normalized == REPLAY_CASE_RECOMMENDATION:
        return bool(item.get("historyRecommendation")) or bool(item.get("entryEligibleOriginal"))
    if normalized == REPLAY_CASE_REPLAY:
        return bool(item.get("replayIncluded"))
    if normalized == REPLAY_CASE_A7PLUS:
        if bool(item.get("replayA7Plus")):
            return True
        grade_score = float(item.get("gradeScore") or 0.0)
        replay_grade = str(item.get("replayGrade") or item.get("grade") or "").strip().upper()
        return grade_score >= 7.0 and replay_grade.startswith("A")
    return False


def filter_replay_case_items(items: list[dict[str, Any]], case_key: str) -> list[dict[str, Any]]:
    return [item for item in items if matches_replay_case(item, case_key)]


def max_drawdown_pct(returns_pct: list[float]) -> float:
    equity = 1.0
    peak = 1.0
    drawdown = 0.0
    for ret in returns_pct:
        equity *= 1.0 + ret / 100.0
        peak = max(peak, equity)
        if peak > 0:
            drawdown = min(drawdown, (equity / peak - 1.0) * 100.0)
    return round(abs(drawdown), 4)


def cumulative_return_pct(returns_pct: list[float]) -> float | None:
    if not returns_pct:
        return None
    equity = 1.0
    for ret in returns_pct:
        equity *= 1.0 + ret / 100.0
    return round((equity - 1.0) * 100.0, 4)


def strategy_sort_key(strategy: str) -> tuple[int, str]:
    try:
        return STRATEGY_ORDER.index(strategy), strategy
    except ValueError:
        return len(STRATEGY_ORDER), strategy


def sort_results_for_returns(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(
        items,
        key=lambda item: (
            str(item.get("date") or ""),
            strategy_sort_key(str(item.get("strategy") or "")),
            str(item.get("code") or ""),
            str(item.get("sourceEntryKey") or ""),
        ),
    )


def _metric_returns(results: list[dict[str, Any]]) -> list[float]:
    ordered_results = sort_results_for_returns(
        [item for item in results if item.get("netReturnPct") is not None]
    )
    return [float(item["netReturnPct"]) for item in ordered_results]


def build_summary_metrics(
    *,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
) -> dict[str, Any]:
    included = [item for item in candidates if item.get("replayIncluded")]
    eligible = [item for item in candidates if item.get("entryEligible")]
    strategy_orders = [item for item in orders if item.get("side") == "SELL"]
    pending_orders = [item for item in strategy_orders if item.get("finalStatus") == "open"]
    returns = _metric_returns(results)
    wins = [ret for ret in returns if ret > 0]
    return {
        "candidateCount": len(candidates),
        "eligibleCount": len(eligible),
        "includedCount": len(included),
        "tradeCount": len(results),
        "winRate": round(len(wins) / len(returns), 4) if returns else None,
        "avgNetReturnPct": round(sum(returns) / len(returns), 4) if returns else None,
        "cumNetReturnPct": cumulative_return_pct(returns),
        "maxDrawdownPct": max_drawdown_pct(returns) if returns else None,
        "degradedCount": sum(1 for item in results if str(item.get("dataQualityStatus") or "") == "degraded"),
        "ambiguousCount": sum(int(item.get("ambiguousCount") or 0) for item in results),
        "unfilledRate": round(len(pending_orders) / len(strategy_orders), 4) if strategy_orders else None,
    }


def build_strategy_stats(
    *,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
) -> dict[str, Any]:
    strategy_stats: dict[str, Any] = {}
    strategies = {str(item.get("strategy") or "") for item in results} | {str(item.get("strategy") or "") for item in candidates}
    for strategy in sorted((item for item in strategies if item), key=strategy_sort_key):
        strategy_results = [item for item in results if item["strategy"] == strategy]
        strategy_candidates = [item for item in candidates if item["strategy"] == strategy]
        strategy_orders = [item for item in orders if item.get("strategy") == strategy and item.get("side") == "SELL"]
        strategy_stats[strategy] = build_summary_metrics(
            candidates=strategy_candidates,
            results=strategy_results,
            orders=strategy_orders,
        )
    return strategy_stats


def build_stock_stats(results: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[tuple[str, str, str], list[dict[str, Any]]] = {}
    for item in results:
        key = (
            str(item.get("strategy") or ""),
            str(item.get("code") or ""),
            str(item.get("name") or ""),
        )
        grouped.setdefault(key, []).append(item)

    rows: list[dict[str, Any]] = []
    for (strategy, code, name), items in grouped.items():
        returns = _metric_returns(items)
        wins = [ret for ret in returns if ret > 0]
        latest_item = sort_results_for_returns(items)[-1]
        last_replay_date = str(latest_item.get("date") or "")
        rows.append({
            "strategy": strategy,
            "code": code,
            "name": name,
            "tradeCount": len(items),
            "winRate": round(len(wins) / len(returns), 4) if returns else None,
            "avgNetReturnPct": round(sum(returns) / len(returns), 4) if returns else None,
            "cumNetReturnPct": cumulative_return_pct(returns),
            "lastReplayDate": last_replay_date,
            "lastEntryFilledAt": latest_item.get("entryFilledAt"),
            "lastEntryFillPrice": latest_item.get("entryFillPrice"),
            "lastExitFilledAt": latest_item.get("exitFilledAt"),
            "lastExitAvgFillPrice": latest_item.get("exitAvgFillPrice"),
            "lastExitFillPrice": latest_item.get("exitLastFillPrice"),
            "lastTradeStatus": latest_item.get("tradeStatus"),
        })

    return sorted(
        rows,
        key=lambda item: (
            strategy_sort_key(str(item.get("strategy") or "")),
            -(float(item.get("cumNetReturnPct")) if item.get("cumNetReturnPct") is not None else float("-inf")),
            str(item.get("code") or ""),
        ),
    )


def build_summary_payload(
    *,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
) -> dict[str, Any]:
    overall = build_summary_metrics(candidates=candidates, results=results, orders=orders)
    by_strategy = build_strategy_stats(candidates=candidates, results=results, orders=orders)
    by_stock = build_stock_stats(results)
    return {
        **overall,
        "overall": overall,
        "byStrategy": by_strategy,
        "byStock": by_stock,
        "strategyStats": by_strategy,
    }


def summarize_trade_rows(results: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for item in sort_results_for_returns(results):
        rows.append({
            "strategy": item.get("strategy"),
            "code": item.get("code"),
            "name": item.get("name"),
            "entryFilledAt": item.get("entryFilledAt"),
            "entryFillPrice": item.get("entryFillPrice"),
            "exitFilledAt": item.get("exitFilledAt"),
            "exitAvgFillPrice": item.get("exitAvgFillPrice"),
            "exitLastFillPrice": item.get("exitLastFillPrice"),
            "tradeStatus": item.get("tradeStatus"),
            "closedReason": item.get("closedReason"),
            "netReturnPct": item.get("netReturnPct"),
        })
    return rows


def build_daily_summary(
    *,
    run_id: str,
    date_str: str,
    variant: str,
    threshold_profile: str,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
    fills: list[dict[str, Any]],
) -> dict[str, Any]:
    summary = build_summary_payload(candidates=candidates, results=results, orders=orders)

    return {
        "runId": run_id,
        "date": date_str,
        "variant": variant,
        "thresholdProfile": threshold_profile,
        **summary,
        "orderCount": len(orders),
        "fillCount": len(fills),
        "candidates": candidates,
        "trades": summarize_trade_rows(results),
        "results": results,
    }


def build_strategy_views(
    *,
    run_days: list[dict[str, Any]],
    summary: dict[str, Any],
) -> dict[str, Any]:
    views: dict[str, Any] = {}
    by_strategy = summary.get("byStrategy") if isinstance(summary.get("byStrategy"), dict) else {}
    by_stock = summary.get("byStock") if isinstance(summary.get("byStock"), list) else []
    for strategy, strategy_summary in by_strategy.items():
        strategy_results = [
            item
            for day in run_days
            for item in (day.get("results") or [])
            if item.get("strategy") == strategy
        ]
        strategy_candidates = [
            item
            for day in run_days
            for item in (day.get("candidates") or [])
            if item.get("strategy") == strategy
        ]
        strategy_orders = [
            item
            for day in run_days
            for item in (day.get("orders") or [])
            if item.get("strategy") == strategy and item.get("side") == "SELL"
        ]
        strategy_days: list[dict[str, Any]] = []
        for day in run_days:
            day_results = [item for item in (day.get("results") or []) if item.get("strategy") == strategy]
            day_candidates = [item for item in (day.get("candidates") or []) if item.get("strategy") == strategy]
            day_orders = [item for item in (day.get("orders") or []) if item.get("strategy") == strategy and item.get("side") == "SELL"]
            day_stats = (day.get("byStrategy") or {}).get(strategy)
            if not isinstance(day_stats, dict):
                continue
            strategy_days.append({
                "date": day.get("date"),
                "summaryFile": day.get("summaryFile"),
                "ordersFile": day.get("ordersFile"),
                "fillsFile": day.get("fillsFile"),
                "trades": [item for item in (day.get("trades") or []) if item.get("strategy") == strategy],
                "candidates": day_candidates,
                "results": day_results,
                "orders": day_orders,
                **day_stats,
            })

        case_views: dict[str, Any] = {}
        for case_key in (REPLAY_CASE_RECOMMENDATION, REPLAY_CASE_REPLAY, REPLAY_CASE_A7PLUS):
            case_candidates = filter_replay_case_items(strategy_candidates, case_key)
            case_results = filter_replay_case_items(strategy_results, case_key)
            case_entry_keys = {
                str(item.get("sourceEntryKey") or "")
                for item in case_results
                if item.get("sourceEntryKey")
            }
            case_orders = [item for item in strategy_orders if str(item.get("sourceEntryKey") or "") in case_entry_keys]
            case_days: list[dict[str, Any]] = []
            for day in strategy_days:
                day_case_candidates = filter_replay_case_items(day.get("candidates") or [], case_key)
                day_case_results = filter_replay_case_items(day.get("results") or [], case_key)
                if not day_case_results:
                    continue
                day_case_entry_keys = {
                    str(item.get("sourceEntryKey") or "")
                    for item in day_case_results
                    if item.get("sourceEntryKey")
                }
                day_case_orders = [item for item in (day.get("orders") or []) if str(item.get("sourceEntryKey") or "") in day_case_entry_keys]
                case_days.append({
                    "date": day.get("date"),
                    "summaryFile": day.get("summaryFile"),
                    "ordersFile": day.get("ordersFile"),
                    "fillsFile": day.get("fillsFile"),
                    "trades": summarize_trade_rows(day_case_results),
                    "candidates": day_case_candidates,
                    "results": day_case_results,
                    "orders": day_case_orders,
                    **build_summary_metrics(
                        candidates=day_case_candidates,
                        results=day_case_results,
                        orders=day_case_orders,
                    ),
                })
            case_views[case_key] = {
                "summary": build_summary_metrics(
                    candidates=case_candidates,
                    results=case_results,
                    orders=case_orders,
                ),
                "stocks": build_stock_stats(case_results),
                "days": case_days,
            }
        views[strategy] = {
            "summary": strategy_summary,
            "stocks": [item for item in by_stock if item.get("strategy") == strategy],
            "days": strategy_days,
            "caseViews": case_views,
        }
    return views


def _sorted_run_history(runs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    def _sort_key(item: dict[str, Any]) -> tuple[str, str]:
        generated_at = str(item.get("generatedAt") or "")
        run_id = str(item.get("runId") or "")
        return generated_at, run_id

    return sorted([item for item in runs if isinstance(item, dict)], key=_sort_key)


def _merged_run_days(run_history: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_date: dict[str, dict[str, Any]] = {}
    for run in run_history:
        for day in run.get("days") or []:
            if not isinstance(day, dict):
                continue
            date_str = str(day.get("date") or "")
            if not date_str:
                continue
            by_date[date_str] = day
    return [
        by_date[date_str]
        for date_str in sorted(by_date)
    ]


def build_cumulative_run_record(runs: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not runs:
        return None
    ordered_runs = _sorted_run_history(runs)
    cumulative_days = _merged_run_days(ordered_runs)
    candidates = [item for day in cumulative_days for item in (day.get("candidates") or [])]
    results = [item for day in cumulative_days for item in (day.get("results") or [])]
    orders = [item for day in cumulative_days for item in (day.get("orders") or [])]
    summary = build_summary_payload(candidates=candidates, results=results, orders=orders)
    latest_run = ordered_runs[-1]
    analysis_dates = sorted({str(day.get("date") or "") for day in cumulative_days if str(day.get("date") or "")})
    from_date = analysis_dates[0] if analysis_dates else str(latest_run.get("from") or "")
    to_date = analysis_dates[-1] if analysis_dates else str(latest_run.get("to") or "")
    return {
        "runId": str(latest_run.get("runId") or ""),
        "generatedAt": str(latest_run.get("generatedAt") or ""),
        "from": from_date,
        "to": to_date,
        "variant": str(latest_run.get("variant") or VARIANT_STABLE),
        "bar": str(latest_run.get("bar") or "1m"),
        "thresholdProfile": str(latest_run.get("thresholdProfile") or "current"),
        "entryMode": str(latest_run.get("entryMode") or "close"),
        "replayPolicy": latest_run.get("replayPolicy") or REPLAY_VALIDATION_POLICY,
        "replayRule": latest_run.get("replayRule") or {},
        "replayRuleSignature": str(latest_run.get("replayRuleSignature") or ""),
        "analysisDates": analysis_dates,
        "days": cumulative_days,
        "summary": summary,
        "strategyViews": build_strategy_views(run_days=cumulative_days, summary=summary),
        "runCount": len(ordered_runs),
        "runHistory": ordered_runs,
        "latestRunId": str(latest_run.get("runId") or ""),
        "latestBuiltDate": to_date,
    }


def _read_json_list(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    return value if isinstance(value, list) else []


def _read_json_value(path: Path) -> Any:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


def _write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")


def replay_runs_paths(out_dir: str | Path) -> tuple[Path, Path]:
    replay_dir = Path(out_dir) / "replay"
    return replay_dir / "replay_runs.json", replay_dir / "replay_runs.js"


def read_replay_runs(path: str | Path) -> list[dict[str, Any]]:
    path_obj = Path(path)
    if str(path_obj).endswith(".js"):
        value = read_js_assignment(path_obj, REPLAY_RUNS_MARKER)
    else:
        value = _read_json_value(path_obj)
    if isinstance(value, dict):
        runs = value.get("runHistory")
        if isinstance(runs, list):
            return runs
        runs = value.get("runs")
        return runs if isinstance(runs, list) else []
    return value if isinstance(value, list) else []


def _latest_daily_summary(replay_dir: Path, latest_run: dict[str, Any] | None) -> dict[str, Any] | None:
    if not latest_run:
        return None
    days = latest_run.get("days")
    if not isinstance(days, list) or not days:
        return None
    latest_day = days[-1]
    summary_file = latest_day.get("summaryFile")
    if not summary_file:
        compact = compact_date(str(latest_day.get("date") or ""))
        summary_file = f"replay_summary_{compact}.json"
    path = replay_dir / summary_file
    if not path.exists():
        return None
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None
    return value if isinstance(value, dict) else None


def build_replay_bridge_payload(
    runs: list[dict[str, Any]],
    *,
    replay_dir: str | Path,
    latest_attempt: dict[str, Any] | None = None,
    generated_at: str | None = None,
    max_runs: int = 12,
) -> dict[str, Any]:
    replay_dir_path = Path(replay_dir)
    ordered_runs = _sorted_run_history(runs)
    cumulative_run = build_cumulative_run_record(runs)
    latest_run = cumulative_run
    latest_summary = cumulative_run.get("summary") if isinstance(cumulative_run, dict) else None
    attempt = {
        "status": "missing" if not runs else "complete",
        "message": "",
        "generatedAt": generated_at or datetime.now().isoformat(timespec="seconds"),
    }
    if latest_attempt:
        attempt.update(latest_attempt)
    return {
        "generatedAt": generated_at or datetime.now().isoformat(timespec="seconds"),
        "latestAttempt": attempt,
        "latestRun": latest_run,
        "latestSummary": latest_summary,
        "runCount": len(ordered_runs),
        "runs": ordered_runs[-max_runs:],
    }


def render_replay_runs_js(payload: dict[str, Any]) -> str:
    return f"window.{REPLAY_RUNS_MARKER} = {json.dumps(payload, ensure_ascii=False, indent=2)};\n"


def write_replay_bridge(
    out_dir: str | Path,
    *,
    latest_attempt: dict[str, Any] | None = None,
    generated_at: str | None = None,
) -> dict[str, Any]:
    runs_path, bridge_path = replay_runs_paths(out_dir)
    raw_runs = _read_json_value(runs_path)
    runs = raw_runs if isinstance(raw_runs, list) else (raw_runs.get("runHistory") if isinstance(raw_runs, dict) else [])
    if not isinstance(runs, list):
        runs = []
    payload = build_replay_bridge_payload(
        runs,
        replay_dir=Path(out_dir) / "replay",
        latest_attempt=latest_attempt,
        generated_at=generated_at,
    )
    bridge_path.parent.mkdir(parents=True, exist_ok=True)
    bridge_path.write_text(render_replay_runs_js(payload), encoding="utf-8")
    return payload


def run_replay(
    *,
    date_from: date,
    date_to: date,
    variant: str,
    bar: str,
    threshold_profile: str,
    out_dir: str | Path = "jongga/output",
    analysis_dates: list[date] | None = None,
    recommendation_keys: set[str] | None = None,
    replace_existing_runs: bool = False,
) -> dict[str, Any]:
    generated_at = datetime.now().isoformat(timespec="seconds")
    run_id = datetime.now().strftime("replay-%Y%m%d-%H%M%S") + "-" + uuid.uuid4().hex[:8]
    out_root = Path(out_dir)
    replay_dir = out_root / "replay"
    variant = normalize_variant(variant)
    rule_state = replay_rule_state(variant=variant, threshold_profile=threshold_profile, bar=bar)
    history_cache: dict[str, list[dict[str, Any]]] = {}
    run_days: list[dict[str, Any]] = []
    all_orders: list[dict[str, Any]] = []
    all_results: list[dict[str, Any]] = []
    all_candidates: list[dict[str, Any]] = []
    recommendation_key_set = set(recommendation_keys or set())
    target_days = normalize_analysis_dates(analysis_dates) or list(iter_dates(date_from, date_to))

    for day in target_days:
        date_str = day.isoformat()
        payload = load_daily_payload(out_root, date_str, variant)
        compact = compact_date(day)
        daily_orders: list[dict[str, Any]] = []
        daily_fills: list[dict[str, Any]] = []
        daily_results: list[dict[str, Any]] = []
        daily_candidates: list[dict[str, Any]] = []

        if payload is not None:
            dims = extract_context_dims(payload)
            for strategy, entry in iter_buy_entries(payload):
                candidate = replay_entry_view(entry, strategy, threshold_profile)
                daily_candidates.append(candidate)
                code = candidate["code"]
                if not code:
                    continue
                candidate_key = f"{date_str}|{variant}|{strategy}|{code}"
                if candidate_key in recommendation_key_set:
                    candidate["historyRecommendation"] = True
                if code not in history_cache:
                    history_cache[code] = entry.get("_historyRows") or []
                    if not history_cache[code]:
                        from jongga.generate_latest import fetch_naver_price_history
                        history_cache[code] = fetch_naver_price_history(code, count=40)
                market_data = build_replay_market_data(
                    code=code,
                    entry_date=date_str,
                    entry_price=candidate["entryPrice"],
                    history_rows=history_cache[code],
                    bar_unit=bar,
                    tick_proxy_source=_tick_proxy_source(entry),
                )
                if market_data["status"] != "resolved":
                    continue
                source_entry_key = f"{compact}|{variant}|{strategy}|{code}"
                simulation = simulate_trade(
                    run_id=run_id,
                    date=date_str,
                    variant=variant,
                    strategy=strategy,
                    code=code,
                    name=candidate["name"],
                    source_entry_key=source_entry_key,
                    trade_plan_rows=entry.get("tradePlanRows") or [],
                    market_data=market_data,
                    entry_mode="close",
                    auto_flatten=True,
                )
                proxy = compute_outcome(
                    {
                        "date": date_str,
                        "variant": variant,
                        "strategy": strategy,
                        "code": code,
                        "name": candidate["name"],
                        **dims,
                    },
                    entry.get("tradePlanRows") or [],
                    candidate["entryPrice"],
                    str(market_data.get("nextTradingDate") or ""),
                    market_data.get("nextDayOHLC") or {},
                )
                result = {
                    **simulation["result"],
                    **dims,
                    "dataQualityStatus": str((market_data.get("dataQuality") or {}).get("status") or ""),
                    "dataQuality": market_data.get("dataQuality") or {},
                    "nextTradingDate": market_data.get("nextTradingDate"),
                    "proxyOutcomeStatus": proxy.get("outcomeStatus"),
                    "proxyRealizedReturnPct": round(float(proxy.get("realizedReturnProxy") or 0.0) * 100.0, 4),
                    "replayGrade": candidate["replayGrade"],
                    "gradeScore": candidate["gradeScore"],
                    "replayIncluded": candidate["replayIncluded"],
                    "replayIncludeRule": candidate["replayIncludeRule"],
                    "historyRecommendation": candidate["historyRecommendation"],
                    "entryEligible": candidate["entryEligible"],
                    "entryEligibleOriginal": candidate["entryEligibleOriginal"],
                    "setupQuality": candidate["setupQuality"],
                }
                daily_orders.extend(simulation["orders"])
                daily_fills.extend(simulation["fills"])
                daily_results.append(result)

        daily_summary = build_daily_summary(
            run_id=run_id,
            date_str=date_str,
            variant=variant,
            threshold_profile=threshold_profile,
            candidates=daily_candidates,
            results=daily_results,
            orders=daily_orders,
            fills=daily_fills,
        )
        _write_json(replay_dir / f"sim_orders_{compact}.json", daily_orders)
        _write_json(replay_dir / f"sim_fills_{compact}.json", daily_fills)
        _write_json(replay_dir / f"replay_summary_{compact}.json", daily_summary)
        all_orders.extend(daily_orders)
        all_results.extend(daily_results)
        all_candidates.extend(daily_candidates)
        run_days.append({
            "date": date_str,
            "summaryFile": f"replay_summary_{compact}.json",
            "ordersFile": f"sim_orders_{compact}.json",
            "fillsFile": f"sim_fills_{compact}.json",
            "candidateCount": daily_summary["candidateCount"],
            "eligibleCount": daily_summary["eligibleCount"],
            "includedCount": daily_summary["includedCount"],
            "tradeCount": daily_summary["tradeCount"],
            "degradedCount": daily_summary["degradedCount"],
            "ambiguousCount": daily_summary["ambiguousCount"],
            "byStrategy": daily_summary["byStrategy"],
            "candidates": daily_candidates,
            "trades": daily_summary["trades"],
            "results": daily_results,
            "orders": daily_orders,
        })

    runs_path = replay_dir / "replay_runs.json"
    existing_raw = [] if replace_existing_runs else _read_json_value(runs_path)
    existing_runs = existing_raw if isinstance(existing_raw, list) else (existing_raw.get("runHistory") if isinstance(existing_raw, dict) else [])
    if not isinstance(existing_runs, list):
        existing_runs = []
    summary = build_summary_payload(candidates=all_candidates, results=all_results, orders=all_orders)
    run_record = {
        "runId": run_id,
        "generatedAt": generated_at,
        "from": date_from.isoformat(),
        "to": date_to.isoformat(),
        "variant": variant,
        "bar": bar,
        "thresholdProfile": threshold_profile,
        "entryMode": "close",
        "replayPolicy": REPLAY_VALIDATION_POLICY,
        "replayRule": rule_state["spec"],
        "replayRuleSignature": rule_state["signature"],
        "analysisDates": [day.isoformat() for day in target_days],
        "latestBuiltDate": target_days[-1].isoformat() if target_days else "",
        "days": run_days,
        "summary": summary,
        "strategyViews": build_strategy_views(run_days=run_days, summary=summary),
    }
    merged_runs = [run_record] + [item for item in existing_runs if item.get("runId") != run_id]
    _write_json(runs_path, merged_runs)
    write_replay_bridge(
        out_root,
        latest_attempt={
            "status": "complete",
            "message": "",
            "generatedAt": generated_at,
            "runId": run_id,
            "variant": variant,
            "thresholdProfile": threshold_profile,
        },
        generated_at=generated_at,
    )
    return run_record


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="종가 엔진 리플레이/모의체결 검증")
    parser.add_argument("--from", dest="date_from", required=True, help="시작일 YYYY-MM-DD")
    parser.add_argument("--to", dest="date_to", required=True, help="종료일 YYYY-MM-DD")
    parser.add_argument("--variant", default=VARIANT_STABLE, choices=[VARIANT_STABLE, VARIANT_CANARY])
    parser.add_argument("--bar", default="1m", choices=["1m"])
    parser.add_argument("--threshold-profile", default="current", choices=sorted(THRESHOLD_PROFILES))
    parser.add_argument("--out-dir", default="jongga/output")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    run_record = run_replay(
        date_from=date.fromisoformat(args.date_from),
        date_to=date.fromisoformat(args.date_to),
        variant=args.variant,
        bar=args.bar,
        threshold_profile=args.threshold_profile,
        out_dir=args.out_dir,
    )
    print(json.dumps(run_record, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
