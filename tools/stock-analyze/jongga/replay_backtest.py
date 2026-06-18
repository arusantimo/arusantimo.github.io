from __future__ import annotations

import argparse
import json
import hashlib
import uuid
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

from jongga.blacklist import blacklisted_codes, extract_blacklist_records, normalize_blacklist_code
from jongga.entry_policy import compute_entry_eligibility
from jongga.grade_policy import REVERSAL_GRADE_MIN, TREND_GRADE_MIN
from jongga.scoring import overnight_gap_risk_penalty
from jongga.outcome_tracker import compute_outcome, extract_context_dims, load_daily_payload
from jongga.output_contract import (
    POINT_IN_TIME_STATUS_HISTORICAL_REGEN,
    POINT_IN_TIME_STATUS_LEGACY_UNKNOWN,
    VARIANT_CANARY,
    VARIANT_STABLE,
    compact_date,
    infer_payload_point_in_time_status,
    iter_buy_entries,
    normalize_variant,
    point_in_time_flag_from_status,
    read_js_assignment,
)
from jongga.replay_market_data import TICK_PROXY_SOURCE, build_replay_market_data
from jongga.strategy_quality import evaluate_quality_from_indicators
from jongga.sim_broker import simulate_trade
from jongga.mixed_exit_policy import (
    mixed_exit_policy_key_for_cell,
    matches_mixed_recommendation_case,
    select_mixed_exit_policy,
)

REPLAY_RUNS_MARKER = "JONGGA_REPLAY_RUNS"
REPLAY_INCLUDE_GRADE_SCORE_MIN = 8.0
REPLAY_INCLUDE_GRADE_MIN = "A"
REPLAY_RULE_VERSION = "2026-06-11-mixed-volatility-v1"
REPLAY_CASE_RECOMMENDATION = "recommendation"
REPLAY_CASE_A7PLUS = "a7plus"
PULLBACK_STRICT_REPLAY_GATE_CODES = frozenset({"G10", "G11", "G12", "G13"})
REPLAY_COMPARISON_CASE_LABELS = {
    "all": "전체 후보",
    REPLAY_CASE_A7PLUS: "7&A",
    REPLAY_CASE_RECOMMENDATION: "추천 전용",
}
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


def _blocked_gate_codes(rows: list[dict[str, Any]] | None) -> set[str]:
    return {
        str(row.get("code") or "").strip()
        for row in rows or []
        if str(row.get("status") or "") == "⛔"
    }


def _pullback_replay_gate_ok(entry: dict[str, Any], eligibility: dict[str, Any] | None = None) -> bool:
    if str(entry.get("strategy") or "") != "pullback":
        return True
    blocked_codes = _blocked_gate_codes(entry.get("gates") or []) | _blocked_gate_codes(entry.get("filters") or [])
    if blocked_codes & PULLBACK_STRICT_REPLAY_GATE_CODES:
        return False
    setup_quality = str((eligibility or {}).get("setupQuality") or "")
    if setup_quality == "setup_weak" and str(entry.get("statusLabel") or "").strip().startswith("매매금지("):
        return False
    return True


def _quality_gate_ok(entry: dict[str, Any], strategy: str) -> bool:
    """저장된 stockIndicators.snapshot으로 품질 게이트(Q1)를 재평가.

    라이브 엔진이 Q1 게이트를 추가하기 전 생성된 과거 JSON에도 동일 기준을
    소급 적용하므로, 리플레이가 곧 Q1 적용 후 백테스트가 된다. 데이터가 없으면
    (data_missing) 보수적으로 통과시켜 기존 동작을 깨지 않는다.
    """
    indicators = (entry.get("stockIndicators") or {}).get("snapshot") or {}
    verdict = evaluate_quality_from_indicators(strategy, indicators)
    if verdict is None:
        return True
    return verdict.passed


def _resolve_replay_entry_price(entry: dict[str, Any]) -> float:
    explicit_entry_price = float(entry.get("entryPrice") or 0.0)
    if explicit_entry_price > 0:
        return explicit_entry_price
    if entry.get("analysisSession") or entry.get("analysisSessionLabel"):
        return 0.0
    return float(entry.get("currentPrice") or 0.0)


def replay_entry_view(
    entry: dict[str, Any],
    strategy: str,
    threshold_profile: str,
    dims: dict[str, Any] | None = None,
) -> dict[str, Any]:
    grade_score = float(entry.get("gradeScore") or 0.0)
    # 오버나이트 갭다운 페널티: 라이브에서 점수에 이미 반영됐으면(overnightGapPenalty>0)
    # 중복 적용하지 않고, 페널티 이전 구버전 페이로드에는 dims 기준으로 소급 적용한다.
    if dims and float(entry.get("overnightGapPenalty") or 0.0) <= 0.0:
        penalty = overnight_gap_risk_penalty(
            str(dims.get("regimeBucket") or ""),
            str(dims.get("vkospiTier") or ""),
            str(dims.get("gapGrade") or ""),
        )
        grade_score = round(max(0.0, grade_score - penalty), 1)
    replay_grade = grade_from_threshold_profile(grade_score, strategy, threshold_profile)
    entry_price = _resolve_replay_entry_price(entry)
    entry_price_available = entry_price > 0
    eligibility = compute_entry_eligibility(
        strategy,
        replay_grade,
        str(entry.get("statusLabel") or ""),
        entry.get("gates") or [],
        entry.get("filters") or [],
    )
    pullback_gate_ok = _pullback_replay_gate_ok({**entry, "strategy": strategy}, eligibility)
    quality_gate_ok = _quality_gate_ok(entry, strategy)
    replay_included = grade_score >= REPLAY_INCLUDE_GRADE_SCORE_MIN and replay_grade in {"S", "A"} and pullback_gate_ok and quality_gate_ok
    replay_a7plus = grade_score >= 7.0 and replay_grade in {"S", "A"}
    return {
        "strategy": strategy,
        "name": str(entry.get("name") or ""),
        "code": str(entry.get("code") or ""),
        "takeProfitProfileKey": str(((entry.get("recommendedTakeProfitProfile") or {}).get("profileKey")) or ""),
        "takeProfitProfileLabel": str(((entry.get("recommendedTakeProfitProfile") or {}).get("label")) or ""),
        "originalGrade": str(entry.get("grade") or ""),
        "replayGrade": replay_grade,
        "gradeScore": grade_score,
        "strictScore": float(entry.get("strictScore") or 0.0),
        "signalScore": float(entry.get("signalScore") or entry.get("score") or 0.0),
        "entryPrice": entry_price,
        "entryPriceAvailable": entry_price_available,
        "statusLabel": str(entry.get("statusLabel") or ""),
        "mixedExitPolicy": entry.get("mixedExitPolicy") or select_mixed_exit_policy(entry, strategy),
        "entryEligibleOriginal": bool(entry.get("entryEligible")),
        "historyRecommendation": bool(entry.get("historyRecommendation")),
        "replayIncluded": replay_included,
        "replayIncludeRule": f"gradeScore>={REPLAY_INCLUDE_GRADE_SCORE_MIN:.1f} AND replayGrade>={REPLAY_INCLUDE_GRADE_MIN}",
        "replayA7Plus": replay_a7plus,
        "replayA7PlusRule": "gradeScore>=7.0 AND replayGrade in {A,S}",
        "pullbackReplayGateOk": pullback_gate_ok,
        "qualityGateOk": quality_gate_ok,
        **eligibility,
    }


def matches_replay_case(item: dict[str, Any], case_key: str) -> bool:
    normalized = str(case_key or "").strip()
    pullback_gate_ok = bool(item.get("pullbackReplayGateOk")) if "pullbackReplayGateOk" in item else _pullback_replay_gate_ok(item)
    quality_gate_ok = (
        bool(item.get("qualityGateOk"))
        if "qualityGateOk" in item
        else _quality_gate_ok(item, str(item.get("strategy") or ""))
    )
    if normalized == "all":
        return True
    if normalized == REPLAY_CASE_RECOMMENDATION:
        return pullback_gate_ok and quality_gate_ok and (bool(item.get("historyRecommendation")) or bool(item.get("entryEligibleOriginal")))
    if normalized == REPLAY_CASE_A7PLUS:
        if "replayA7Plus" in item:
            return bool(item.get("replayA7Plus"))
        grade_score = float(item.get("gradeScore") or 0.0)
        replay_grade = str(item.get("replayGrade") or item.get("grade") or "").strip().upper()
        return grade_score >= 7.0 and replay_grade in {"A", "S"}
    return False


def filter_replay_case_items(items: list[dict[str, Any]], case_key: str) -> list[dict[str, Any]]:
    return [item for item in items if matches_replay_case(item, case_key)]


def filter_replay_case_orders(
    orders: list[dict[str, Any]],
    results: list[dict[str, Any]],
    case_key: str,
) -> list[dict[str, Any]]:
    if case_key == "all":
        return list(orders)
    result_entry_keys = {
        str(item.get("sourceEntryKey") or "")
        for item in results
        if item.get("sourceEntryKey")
    }
    return [
        item for item in orders
        if str(item.get("sourceEntryKey") or "") in result_entry_keys
    ]


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


def build_case_comparison_summary(
    *,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
) -> dict[str, Any]:
    comparisons: dict[str, Any] = {}
    for case_key, label in REPLAY_COMPARISON_CASE_LABELS.items():
        case_candidates = candidates if case_key == "all" else filter_replay_case_items(candidates, case_key)
        case_results = results if case_key == "all" else filter_replay_case_items(results, case_key)
        case_orders = filter_replay_case_orders(orders, case_results, case_key)
        comparisons[case_key] = {
            "caseKey": case_key,
            "label": label,
            **build_summary_metrics(
                candidates=case_candidates,
                results=case_results,
                orders=case_orders,
            ),
        }
    return comparisons


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
        strategy_stats[strategy]["comparisonByCase"] = build_case_comparison_summary(
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
            "grade": latest_item.get("replayGrade") or latest_item.get("grade"),
            "replayGrade": latest_item.get("replayGrade") or latest_item.get("grade"),
            "gradeScore": latest_item.get("gradeScore") if latest_item.get("gradeScore") is not None else latest_item.get("score"),
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


def build_take_profit_profile_stats(results: list[dict[str, Any]]) -> dict[str, Any]:
    grouped_profile: dict[str, list[dict[str, Any]]] = {}
    grouped_cell: dict[str, list[dict[str, Any]]] = {}
    for item in results:
        strategy = str(item.get("strategy") or "")
        profile_key = str(item.get("takeProfitProfileKey") or "")
        if not strategy or not profile_key:
            continue
        regime = str(item.get("regimeBucket") or "")
        vk = str(item.get("vkospiTier") or "")
        gap = str(item.get("gapGrade") or "")
        grouped_profile.setdefault(f"{strategy}|{profile_key}", []).append(item)
        grouped_cell.setdefault(f"{strategy}|{regime}|{vk}|{gap}|{profile_key}", []).append(item)

    def finalize(grouped: dict[str, list[dict[str, Any]]]) -> dict[str, Any]:
        output: dict[str, Any] = {}
        for key, items in grouped.items():
            returns = _metric_returns(items)
            wins = [ret for ret in returns if ret > 0]
            output[key] = {
                "tradeCount": len(items),
                "sampleCount": len(items),
                "winRate": round(len(wins) / len(returns), 4) if returns else None,
                "avgNetReturnPct": round(sum(returns) / len(returns), 4) if returns else None,
                "cumNetReturnPct": cumulative_return_pct(returns),
            }
        return output

    return {
        "byTakeProfitProfile": finalize(grouped_profile),
        "byTakeProfitProfileCell": finalize(grouped_cell),
    }


def build_strategy_recommendation_matrix(results: list[dict[str, Any]]) -> dict[str, Any]:
    matrix: dict[str, Any] = {}
    cases = (
        REPLAY_CASE_A7PLUS,
        REPLAY_CASE_RECOMMENDATION,
    )
    strategies = sorted(
        {str(item.get("strategy") or "") for item in results if str(item.get("strategy") or "")},
        key=strategy_sort_key,
    )
    for strategy in strategies:
        strategy_results = [item for item in results if item.get("strategy") == strategy]
        for case_key in cases:
            case_results = [
                item
                for item in strategy_results
                if matches_mixed_recommendation_case(item, case_key)
            ]
            returns = _metric_returns(case_results)
            wins = [ret for ret in returns if ret > 0]
            matrix[f"{strategy}|{case_key}"] = {
                "strategy": strategy,
                "recommendationCase": case_key,
                "sampleCount": len(case_results),
                "tradeCount": len(case_results),
                "winRate": round(len(wins) / len(returns), 4) if returns else None,
                "avgNetReturnPct": round(sum(returns) / len(returns), 4) if returns else None,
                "cumNetReturnPct": cumulative_return_pct(returns),
                "maxDrawdownPct": max_drawdown_pct(returns) if returns else None,
                "recommendedExitPolicyKey": mixed_exit_policy_key_for_cell(strategy, case_key),
            }
    return matrix


def build_point_in_time_summary(run_days: list[dict[str, Any]]) -> dict[str, Any]:
    counts = {
        "confirmed": 0,
        "historical_regen": 0,
        "legacy_unknown": 0,
    }
    historical_regen_excluded_days = 0
    legacy_unknown_included_days = 0
    warnings: list[str] = []
    for day in run_days:
        status = str(day.get("pointInTimeStatus") or "").strip().lower()
        if status in counts:
            counts[status] += 1
        if str(day.get("skippedReason") or "") == "historical_regen_excluded":
            historical_regen_excluded_days += 1
        if status == POINT_IN_TIME_STATUS_LEGACY_UNKNOWN and (
            int(day.get("candidateCount") or 0) > 0 or int(day.get("tradeCount") or 0) > 0
        ):
            legacy_unknown_included_days += 1
    if historical_regen_excluded_days:
        warnings.append(f"historical_regen {historical_regen_excluded_days}일 제외")
    if legacy_unknown_included_days:
        warnings.append(f"legacy_unknown {legacy_unknown_included_days}일 포함")
    return {
        "pointInTimeStatusCounts": counts,
        "historicalRegenExcludedDays": historical_regen_excluded_days,
        "legacyUnknownIncludedDays": legacy_unknown_included_days,
        "pointInTimeWarnings": warnings,
    }


def build_summary_payload(
    *,
    candidates: list[dict[str, Any]],
    results: list[dict[str, Any]],
    orders: list[dict[str, Any]],
    run_days: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    overall = build_summary_metrics(candidates=candidates, results=results, orders=orders)
    by_strategy = build_strategy_stats(candidates=candidates, results=results, orders=orders)
    by_stock = build_stock_stats(results)
    by_take_profit_profile = build_take_profit_profile_stats(results)
    strategy_recommendation_matrix = build_strategy_recommendation_matrix(results)
    comparison_by_case = build_case_comparison_summary(candidates=candidates, results=results, orders=orders)
    payload = {
        **overall,
        "overall": overall,
        "comparisonByCase": comparison_by_case,
        "byStrategy": by_strategy,
        "byStock": by_stock,
        "strategyStats": by_strategy,
        "strategyRecommendationMatrix": strategy_recommendation_matrix,
        **by_take_profit_profile,
    }
    if run_days is not None:
        payload.update(build_point_in_time_summary(run_days))
    return payload


def summarize_trade_rows(results: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for item in sort_results_for_returns(results):
        rows.append({
            "strategy": item.get("strategy"),
            "code": item.get("code"),
            "name": item.get("name"),
            "grade": item.get("replayGrade") or item.get("grade"),
            "replayGrade": item.get("replayGrade") or item.get("grade"),
            "gradeScore": item.get("gradeScore") if item.get("gradeScore") is not None else item.get("score"),
            "entryFilledAt": item.get("entryFilledAt"),
            "entryFillPrice": item.get("entryFillPrice"),
            "exitFilledAt": item.get("exitFilledAt"),
            "exitAvgFillPrice": item.get("exitAvgFillPrice"),
            "exitLastFillPrice": item.get("exitLastFillPrice"),
            "tradeStatus": item.get("tradeStatus"),
            "closedReason": item.get("closedReason"),
            "netReturnPct": item.get("netReturnPct"),
            "mixedExitPolicy": item.get("mixedExitPolicy"),
            "remainingQuantityPct": item.get("remainingQuantityPct"),
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
        "fills": fills,
    }


def fetch_naver_price_history(code: str, count: int = 40) -> list[dict[str, Any]]:
    from jongga.generate_latest import fetch_naver_price_history as fetch_history

    return fetch_history(code, count=count)


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
        strategy_fills = [
            item
            for day in run_days
            for item in (day.get("fills") or [])
            if item.get("strategy") == strategy
        ]
        strategy_days: list[dict[str, Any]] = []
        for day in run_days:
            day_results = [item for item in (day.get("results") or []) if item.get("strategy") == strategy]
            day_candidates = [item for item in (day.get("candidates") or []) if item.get("strategy") == strategy]
            day_orders = [item for item in (day.get("orders") or []) if item.get("strategy") == strategy and item.get("side") == "SELL"]
            day_entry_keys = {
                str(item.get("sourceEntryKey") or "")
                for item in day_results
                if item.get("sourceEntryKey")
            }
            day_fills = [item for item in (day.get("fills") or []) if str(item.get("sourceEntryKey") or "") in day_entry_keys]
            day_stats = (day.get("byStrategy") or {}).get(strategy)
            if not isinstance(day_stats, dict):
                continue
            strategy_days.append({
                "date": day.get("date"),
                "summaryFile": day.get("summaryFile"),
                "ordersFile": day.get("ordersFile"),
                "fillsFile": day.get("fillsFile"),
                "pointInTime": day.get("pointInTime"),
                "pointInTimeStatus": day.get("pointInTimeStatus"),
                "skippedReason": day.get("skippedReason") or "",
                "trades": [item for item in (day.get("trades") or []) if item.get("strategy") == strategy],
                "candidates": day_candidates,
                "results": day_results,
                "orders": day_orders,
                "fills": day_fills,
                **day_stats,
            })

        case_views: dict[str, Any] = {}
        for case_key in (REPLAY_CASE_RECOMMENDATION, REPLAY_CASE_A7PLUS):
            case_candidates = filter_replay_case_items(strategy_candidates, case_key)
            case_results = filter_replay_case_items(strategy_results, case_key)
            case_entry_keys = {
                str(item.get("sourceEntryKey") or "")
                for item in case_results
                if item.get("sourceEntryKey")
            }
            case_orders = [item for item in strategy_orders if str(item.get("sourceEntryKey") or "") in case_entry_keys]
            case_fills = [item for item in strategy_fills if str(item.get("sourceEntryKey") or "") in case_entry_keys]
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
                day_case_fills = [item for item in (day.get("fills") or []) if str(item.get("sourceEntryKey") or "") in day_case_entry_keys]
                case_days.append({
                    "date": day.get("date"),
                    "summaryFile": day.get("summaryFile"),
                    "ordersFile": day.get("ordersFile"),
                    "fillsFile": day.get("fillsFile"),
                    "pointInTime": day.get("pointInTime"),
                    "pointInTimeStatus": day.get("pointInTimeStatus"),
                    "skippedReason": day.get("skippedReason") or "",
                    "trades": summarize_trade_rows(day_case_results),
                    "candidates": day_case_candidates,
                    "results": day_case_results,
                    "orders": day_case_orders,
                    "fills": day_case_fills,
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
                "fills": case_fills,
            }
        views[strategy] = {
            "summary": strategy_summary,
            "stocks": [item for item in by_stock if item.get("strategy") == strategy],
            "days": strategy_days,
            "fills": strategy_fills,
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
    summary = build_summary_payload(candidates=candidates, results=results, orders=orders, run_days=cumulative_days)
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


def _update_past_trade_result(
    replay_dir: Path,
    run_days: list[dict[str, Any]],
    all_results: list[dict[str, Any]],
    all_orders: list[dict[str, Any]],
    source_entry_key: str,
    entry_date_str: str,
    exit_time: str | None,
    exit_price: float,
    qty_pct: float,
    closed_reason: str,
    variant: str,
    strategy: str,
    code: str,
    name: str,
    pos_run_id: str,
    day_bar: dict[str, Any]
):
    from jongga.sim_broker import net_return_pct
    from datetime import date
    from jongga.output_contract import compact_date

    entry_date_obj = date.fromisoformat(entry_date_str)
    compact_entry = compact_date(entry_date_obj)

    # 1. 과거 날짜가 run_days에 존재하는지 찾습니다.
    target_day_data = None
    for rd in run_days:
        if rd["date"] == entry_date_str:
            target_day_data = rd
            break

    # 만약 메모리에 없다면 로컬 파일에서 직접 로드
    if target_day_data is None:
        summary_path = replay_dir / f"replay_summary_{compact_entry}.json"
        orders_path = replay_dir / f"sim_orders_{compact_entry}.json"
        fills_path = replay_dir / f"sim_fills_{compact_entry}.json"

        if summary_path.exists():
            try:
                summary_data = json.loads(summary_path.read_text(encoding="utf-8"))
                past_results = summary_data.get("results") or summary_data.get("trades") or []
            except Exception:
                past_results = []
        else:
            past_results = []

        if orders_path.exists():
            try:
                past_orders = json.loads(orders_path.read_text(encoding="utf-8"))
            except Exception:
                past_orders = []
        else:
            past_orders = []

        if fills_path.exists():
            try:
                past_fills = json.loads(fills_path.read_text(encoding="utf-8"))
            except Exception:
                past_fills = []
        else:
            past_fills = []
    else:
        past_results = target_day_data.get("results") or []
        past_orders = target_day_data.get("orders") or []
        past_fills = target_day_data.get("fills") or []

    # 2. 결과 리스트에서 대상 종목 찾기
    result_obj = None
    for r in past_results:
        if r.get("sourceEntryKey") == source_entry_key:
            result_obj = r
            break

    # all_results 에서도 참조가 동일하도록 확인
    if result_obj is None:
        for r in all_results:
            if r.get("sourceEntryKey") == source_entry_key:
                result_obj = r
                break

    if result_obj is None:
        return

    # entry_fill 찾기
    entry_fill = None
    for f in past_fills:
        if f.get("sourceEntryKey") == source_entry_key and f.get("side") == "BUY":
            entry_fill = f
            break

    if not entry_fill:
        return

    # 3. 상태 변경 적용
    if closed_reason in {"swing_touch", "stop_touch"}:
        new_fill = {
            "orderId": f"{source_entry_key}-{closed_reason}",
            "sourceEntryKey": source_entry_key,
            "strategy": strategy,
            "code": code,
            "name": name,
            "side": "SELL",
            "stageKey": "swing" if closed_reason == "swing_touch" else "stop",
            "reason": "스윙 목표가 도달" if closed_reason == "swing_touch" else "스윙 손절가 이탈",
            "fillStatus": "filled",
            "filledAt": exit_time,
            "fillPrice": round(exit_price, 4),
            "filledQuantityPct": round(qty_pct, 4),
            "slippagePct": 0.0,
            "barTimestamp": exit_time,
            "barOpen": round(float(day_bar.get("openPrice") or exit_price), 4),
            "barHigh": round(float(day_bar.get("highPrice") or exit_price), 4),
            "barLow": round(float(day_bar.get("lowPrice") or exit_price), 4),
            "barClose": round(float(day_bar.get("closePrice") or exit_price), 4),
            "fillRule": closed_reason,
        }

        new_order = {
            "orderId": f"{source_entry_key}-{closed_reason}",
            "runId": pos_run_id,
            "date": entry_date_str,
            "variant": variant,
            "strategy": strategy,
            "code": code,
            "name": name,
            "side": "SELL",
            "orderType": "LIMIT" if closed_reason == "swing_touch" else "STOP",
            "requestedAt": exit_time,
            "requestedPrice": round(exit_price, 4),
            "quantityPct": round(qty_pct, 4),
            "reason": "스윙 목표가 도달" if closed_reason == "swing_touch" else "스윙 손절가 이탈",
            "sourceEntryKey": source_entry_key,
            "stageKey": "swing" if closed_reason == "swing_touch" else "stop",
            "finalStatus": "filled",
            "activeFrom": exit_time,
            "activeUntil": exit_time,
        }

        past_fills.append(new_fill)
        past_orders.append(new_order)

        if target_day_data is not None:
            all_orders.append(new_order)

        # 평균 매도가 및 수익률 갱신
        sell_fills = [f for f in past_fills if f.get("side") == "SELL" and f.get("sourceEntryKey") == source_entry_key]
        exit_weighted_notional = sum(float(f["fillPrice"]) * float(f["filledQuantityPct"]) / 100.0 for f in sell_fills)
        exit_weighted_qty = sum(float(f["filledQuantityPct"]) / 100.0 for f in sell_fills)
        exit_avg_fill_price = round(exit_weighted_notional / exit_weighted_qty, 4) if exit_weighted_qty > 0 else exit_price
        
        result_obj["exitFilledAt"] = exit_time
        result_obj["exitAvgFillPrice"] = exit_avg_fill_price
        result_obj["exitLastFillPrice"] = round(exit_price, 4)
        result_obj["tradeStatus"] = "closed"
        result_obj["closedReason"] = closed_reason
        result_obj["remainingQuantityPct"] = 0.0
        result_obj["filledExitQuantityPct"] = round(exit_weighted_qty * 100.0, 4)
        result_obj["exitFillCount"] = len(sell_fills)
        result_obj["netReturnPct"] = round(net_return_pct(entry_fill, sell_fills), 4)

        if "positionEvents" not in result_obj:
            result_obj["positionEvents"] = []
        result_obj["positionEvents"].append({
            "eventType": "exit",
            "timestamp": exit_time,
            "quantityPct": qty_pct,
            "price": exit_price,
            "remainingQuantityPct": 0.0,
            "fillRule": closed_reason,
        })
    else:
        # swing_hold (대기) 상태인 경우 평가수익률만 업데이트
        sell_fills = [f for f in past_fills if f.get("side") == "SELL" and f.get("sourceEntryKey") == source_entry_key]
        eval_fills = list(sell_fills)
        eval_fills.append({
            "filledQuantityPct": qty_pct,
            "fillPrice": exit_price,
        })
        result_obj["netReturnPct"] = round(net_return_pct(entry_fill, eval_fills), 4)
        result_obj["tradeStatus"] = "open"
        result_obj["closedReason"] = "swing_hold"
        result_obj["remainingQuantityPct"] = qty_pct

    # 파일 및 요약정보 갱신
    summary_path = replay_dir / f"replay_summary_{compact_entry}.json"
    orders_path = replay_dir / f"sim_orders_{compact_entry}.json"
    fills_path = replay_dir / f"sim_fills_{compact_entry}.json"

    candidates = []
    if summary_path.exists():
        try:
            summary_data = json.loads(summary_path.read_text(encoding="utf-8"))
            candidates = summary_data.get("candidates") or []
        except Exception:
            pass

    daily_summary = build_daily_summary(
        run_id=pos_run_id,
        date_str=entry_date_str,
        variant=variant,
        threshold_profile="current",
        candidates=candidates,
        results=past_results,
        orders=past_orders,
        fills=past_fills
    )

    summary_path.write_text(json.dumps(daily_summary, ensure_ascii=False, indent=2), encoding="utf-8")
    orders_path.write_text(json.dumps(past_orders, ensure_ascii=False, indent=2), encoding="utf-8")
    fills_path.write_text(json.dumps(past_fills, ensure_ascii=False, indent=2), encoding="utf-8")

    if target_day_data is not None:
        target_day_data["trades"] = daily_summary["trades"]
        target_day_data["results"] = past_results
        target_day_data["orders"] = past_orders
        target_day_data["fills"] = past_fills
        target_day_data["tradeCount"] = daily_summary["tradeCount"]

    # replay_runs.json 도 있으면 덮어쓰기
    runs_path = replay_dir / "replay_runs.json"
    if runs_path.exists():
        try:
            runs_data = json.loads(runs_path.read_text(encoding="utf-8"))
            runs_list = runs_data if isinstance(runs_data, list) else runs_data.get("runHistory", [])
            for run_rec in runs_list:
                run_rec_days = run_rec.get("days") or []
                for rd in run_rec_days:
                    if rd.get("date") == entry_date_str:
                        rd_results = rd.get("results") or []
                        for r in rd_results:
                            if r.get("sourceEntryKey") == source_entry_key:
                                for k, v in result_obj.items():
                                    r[k] = v
                        from jongga.replay_backtest import summarize_trade_rows
                        rd["trades"] = summarize_trade_rows(rd_results)
            runs_path.write_text(json.dumps(runs_list, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception:
            pass


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

    swing_pos_path = replay_dir / "swing_positions.json"
    if replace_existing_runs or not swing_pos_path.exists():
        active_swing_positions = []
    else:
        try:
            active_swing_positions = json.loads(swing_pos_path.read_text(encoding="utf-8"))
        except Exception:
            active_swing_positions = []

    for day in target_days:
        date_str = day.isoformat()
        payload = load_daily_payload(out_root, date_str, variant)
        compact = compact_date(day)
        daily_orders: list[dict[str, Any]] = []
        daily_fills: list[dict[str, Any]] = []
        daily_results: list[dict[str, Any]] = []
        daily_candidates: list[dict[str, Any]] = []
        day_point_in_time_status = POINT_IN_TIME_STATUS_LEGACY_UNKNOWN
        day_point_in_time = False
        day_skipped_reason = ""

        # 1. 기존 이월 스윙 포지션들에 대해 당일 장중 가격으로 청산 여부 판단
        updated_active_positions = []
        for pos in active_swing_positions:
            entry_date_str = pos.get("entryDate")
            if not entry_date_str or entry_date_str >= date_str:
                updated_active_positions.append(pos)
                continue

            code = pos["code"]
            strategy = pos["strategy"]
            source_entry_key = pos["sourceEntryKey"]
            entry_price = float(pos["entryPrice"])
            swing_target_price = float(pos["swingTargetPrice"])
            stop_price = float(pos["stopPrice"])
            qty_pct = float(pos.get("qtyPct") or 0.0)
            run_id_pos = pos.get("runId")

            if code not in history_cache:
                history_cache[code] = fetch_naver_price_history(code, count=40)

            day_bar = None
            for row in history_cache[code]:
                if str(row.get("localTradedAt") or "").strip() == compact:
                    day_bar = row
                    break

            if not day_bar:
                updated_active_positions.append(pos)
                continue

            high = float(day_bar.get("highPrice") or 0.0)
            low = float(day_bar.get("lowPrice") or 0.0)
            close = float(day_bar.get("closePrice") or 0.0)

            is_stop_touched = (low <= stop_price)
            is_target_touched = (high >= swing_target_price)

            closed_reason = None
            exit_price = None

            if is_stop_touched and is_target_touched:
                closed_reason = "stop_touch"
                exit_price = stop_price
            elif is_stop_touched:
                closed_reason = "stop_touch"
                exit_price = stop_price
            elif is_target_touched:
                closed_reason = "swing_touch"
                exit_price = swing_target_price

            exit_time = f"{date_str}T15:00:00+09:00"

            if closed_reason:
                _update_past_trade_result(
                    replay_dir=replay_dir,
                    run_days=run_days,
                    all_results=all_results,
                    all_orders=all_orders,
                    source_entry_key=source_entry_key,
                    entry_date_str=entry_date_str,
                    exit_time=exit_time,
                    exit_price=exit_price,
                    qty_pct=qty_pct,
                    closed_reason=closed_reason,
                    variant=variant,
                    strategy=strategy,
                    code=code,
                    name=pos["name"],
                    pos_run_id=run_id_pos,
                    day_bar=day_bar
                )
            else:
                _update_past_trade_result(
                    replay_dir=replay_dir,
                    run_days=run_days,
                    all_results=all_results,
                    all_orders=all_orders,
                    source_entry_key=source_entry_key,
                    entry_date_str=entry_date_str,
                    exit_time=None,
                    exit_price=close,
                    qty_pct=qty_pct,
                    closed_reason="swing_hold",
                    variant=variant,
                    strategy=strategy,
                    code=code,
                    name=pos["name"],
                    pos_run_id=run_id_pos,
                    day_bar=day_bar
                )
                updated_active_positions.append(pos)

        active_swing_positions = updated_active_positions

        if payload is not None:
            day_point_in_time_status = infer_payload_point_in_time_status(payload)
            day_point_in_time = point_in_time_flag_from_status(day_point_in_time_status)
            dims = extract_context_dims(payload)
            excluded_codes = blacklisted_codes(extract_blacklist_records(payload))
            payload_source_mode = str(payload.get("payloadSourceMode") or "legacy").strip() or "legacy"
            input_archive_version = str(payload.get("inputArchiveVersion") or "").strip()
            payload_rebuildable = bool(payload.get("rebuildable"))
            if day_point_in_time_status == POINT_IN_TIME_STATUS_HISTORICAL_REGEN:
                day_skipped_reason = "historical_regen_excluded"
            else:
                for strategy, entry in iter_buy_entries(payload):
                    entry_code = normalize_blacklist_code(entry.get("code"))
                    if entry_code and entry_code in excluded_codes:
                        continue
                    candidate = replay_entry_view(entry, strategy, threshold_profile, dims=dims)
                    candidate["payloadSourceMode"] = payload_source_mode
                    candidate["inputArchiveVersion"] = input_archive_version
                    candidate["rebuildable"] = payload_rebuildable
                    candidate["historyRecommendationSourceMode"] = payload_source_mode if candidate.get("entryEligibleOriginal") else ""
                    candidate["pointInTime"] = day_point_in_time
                    candidate["pointInTimeStatus"] = day_point_in_time_status
                    daily_candidates.append(candidate)
                    code = candidate["code"]
                    if not code:
                        continue
                    candidate_key = f"{date_str}|{variant}|{strategy}|{code}"
                    if candidate_key in recommendation_key_set:
                        candidate["historyRecommendation"] = True
                        candidate["historyRecommendationSourceMode"] = payload_source_mode
                    if candidate["entryPrice"] <= 0:
                        candidate["replaySkippedReason"] = "entry_price_unavailable"
                        continue
                    if code not in history_cache:
                        history_cache[code] = entry.get("_historyRows") or []
                        if not history_cache[code]:
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
                        reversal_live_exit_policy=entry.get("reversalLiveExitPolicy") if strategy == "reversal" else None,
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
                            "takeProfitProfileKey": candidate["takeProfitProfileKey"],
                            "takeProfitProfileLabel": candidate["takeProfitProfileLabel"],
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
                        "historyRecommendationSourceMode": candidate.get("historyRecommendationSourceMode") or "",
                        "entryEligible": candidate["entryEligible"],
                        "entryEligibleOriginal": candidate["entryEligibleOriginal"],
                        "setupQuality": candidate["setupQuality"],
                        "statusLabel": candidate.get("statusLabel") or "",
                        "takeProfitProfileKey": candidate["takeProfitProfileKey"],
                        "takeProfitProfileLabel": candidate["takeProfitProfileLabel"],
                        "mixedExitPolicy": candidate.get("mixedExitPolicy") or {},
                        "payloadSourceMode": payload_source_mode,
                        "inputArchiveVersion": input_archive_version,
                        "rebuildable": payload_rebuildable,
                        "pointInTime": day_point_in_time,
                        "pointInTimeStatus": day_point_in_time_status,
                    }
                    daily_orders.extend(simulation["orders"])
                    daily_fills.extend(simulation["fills"])
                    daily_results.append(result)

                    # 신규 스윙 포지션 대기 판정 및 추가
                    if result.get("tradeStatus") == "open" and float(result.get("remainingQuantityPct") or 0.0) > 0.0:
                        from jongga.sim_broker import parse_trade_plan_rows
                        plan = parse_trade_plan_rows(entry.get("tradePlanRows") or [])
                        swing_target_price = 0.0
                        for tp in plan["targets"]:
                            if tp["stageKey"] == "swing" or "스윙" in tp.get("stage", ""):
                                swing_target_price = float(tp["targetPrice"] or 0.0)
                                break
                        
                        if swing_target_price <= 0.0:
                            mixed_policy = result.get("mixedExitPolicy") or {}
                            stages = mixed_policy.get("takeProfitStages") or []
                            if stages:
                                target_pct = max(float(st.get("targetPct") or 0.0) for st in stages)
                                swing_target_price = result["entryFillPrice"] * (1.0 + target_pct / 100.0)
                            else:
                                swing_target_price = result["entryFillPrice"] * 1.05

                        stop_price = float(plan["stop"]["targetPrice"] or 0.0)
                        if stop_price <= 0.0:
                            stop_pct = -2.0
                            if result.get("mixedExitPolicy") and result["mixedExitPolicy"].get("stopPct"):
                                stop_pct = float(result["mixedExitPolicy"]["stopPct"])
                            stop_price = result["entryFillPrice"] * (1.0 + stop_pct / 100.0)

                        active_swing_positions.append({
                            "runId": run_id,
                            "entryDate": date_str,
                            "code": code,
                            "name": result["name"],
                            "strategy": strategy,
                            "entryPrice": float(result["entryFillPrice"]),
                            "swingTargetPrice": round(swing_target_price, 4),
                            "stopPrice": round(stop_price, 4),
                            "qtyPct": float(result["remainingQuantityPct"]),
                            "sourceEntryKey": source_entry_key
                        })

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
            "pointInTime": day_point_in_time,
            "pointInTimeStatus": day_point_in_time_status,
            "skippedReason": day_skipped_reason,
            "candidates": daily_candidates,
            "trades": daily_summary["trades"],
            "results": daily_results,
            "orders": daily_orders,
            "fills": daily_fills,
        })

    # active_swing_positions 파일 최종 저장
    _write_json(replay_dir / "swing_positions.json", active_swing_positions)

    runs_path = replay_dir / "replay_runs.json"
    existing_raw = [] if replace_existing_runs else _read_json_value(runs_path)
    existing_runs = existing_raw if isinstance(existing_raw, list) else (existing_raw.get("runHistory") if isinstance(existing_raw, dict) else [])
    if not isinstance(existing_runs, list):
        existing_runs = []
    summary = build_summary_payload(candidates=all_candidates, results=all_results, orders=all_orders, run_days=run_days)
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
