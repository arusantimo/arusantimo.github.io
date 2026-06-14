"""기존(point-in-time) 일일 payload를 대차잔고 로직(D4/L1)으로 재채점한다.

`generate_latest.py --date <과거일>`로 전체 payload를 재생성하면 매크로·유니버스
구성이 실행 시점의 "현재" 데이터로 stamp되어 vintage 오염이 발생한다
(jongga-historical-regen-vintage-contamination 메모리 참고).

이 스크립트는 그 문제를 피하기 위해:
  1. 기존 `jongga/output/<YYYYMM>/latest_<date>.json`의 매크로·유니버스·가격
     데이터는 그대로 유지한다 (재수집 없음 = 오염 없음).
  2. 대차잔고만 `as_of=<analysisDate>`로 balance source layer에서 재조회한다.
  3. D4(눌림목), L1(매집/돌파) 항목만 새로 평가해 score_map에
     추가하고, 점수/등급을 재계산한다.

결과는 `--out-dir`(원본과 분리된 디렉터리)에 `latest_<date>.json`으로 기록되며,
이를 `replay_backtest.py --out-dir <out-dir>`에 넘기면 새 로직의 효과만
(유니버스/매크로 오염 없이) 검증할 수 있다.

주의: 이 스크립트는 대차잔고 원천(source layer)에 네트워크로 접근하므로
네트워크 연결이 필요하다.
"""

from __future__ import annotations

import argparse
import json
from datetime import date
from pathlib import Path
from typing import Any

from jongga.balance_sources import (
    LARGE_CAP_MARKET_CAP_RANK_LIMIT,
    collect_short_balance_trend,
)
from jongga.grade_policy import grade_from_score
from jongga.output_contract import (
    VARIANT_STABLE,
    build_daily_output_paths,
    infer_payload_point_in_time_status,
    normalize_variant,
    point_in_time_flag_from_status,
)
from jongga.replay_backtest import iter_dates
from jongga.rule_evaluation import (
    EvalResult,
    evaluate_accumulation_l1_short_balance_decrease,
    evaluate_breakout_l1_short_balance_increase,
    evaluate_pullback_d4_short_covering,
    split_rule_lists,
)
from jongga.scoring import (
    ACCUMULATION_SCORE_WEIGHTS,
    ACCUMULATION_STRICT_MAX,
    BREAKOUT_SIGNAL_FACTORS,
    BREAKOUT_STRICT_MAX,
    BREAKOUT_WEIGHTS,
    PULLBACK_SCORE_WEIGHTS,
    PULLBACK_STRICT_MAX,
    REVERSAL_SCORE_WEIGHTS,
    REVERSAL_STRICT_MAX,
    _clamp_score,
    aggregate_raw_score,
    append_volatility_breakdown_row,
    available_strict_max,
    build_score_breakdown,
    grade_score_from_strict,
)

# 신규 로직이 추가한 항목 (전략별)
_NEW_RULE_CODES: dict[str, tuple[str, ...]] = {
    "pullback": ("D4",),
    "accumulation": ("L1",),
    "breakout": ("L1",),
}
_REMOVED_RULE_CODES = frozenset({"D5", "L2"})
_REMOVED_GATE_CODES = frozenset({"G14"})

_STRATEGY_WEIGHTS: dict[str, tuple[dict[str, float], float]] = {
    "pullback": (PULLBACK_SCORE_WEIGHTS, PULLBACK_STRICT_MAX),
    "accumulation": (ACCUMULATION_SCORE_WEIGHTS, ACCUMULATION_STRICT_MAX),
    "breakout": (BREAKOUT_WEIGHTS, BREAKOUT_STRICT_MAX),
    "reversal": (REVERSAL_SCORE_WEIGHTS, REVERSAL_STRICT_MAX),
}


def _eval_result_from_breakdown_row(row: dict[str, Any]) -> EvalResult:
    max_points = float(row.get("maxPoints") or 0.0)
    score = (float(row.get("strictPoints") or 0.0) / max_points) if max_points else 0.0
    return EvalResult(score, str(row.get("note") or ""), str(row.get("evalStatus") or "not_met"))


def _new_rule_results(strategy: str, indicators: dict[str, Any]) -> dict[str, EvalResult]:
    if strategy == "pullback":
        return {"D4": evaluate_pullback_d4_short_covering(indicators)}
    if strategy == "accumulation":
        return {"L1": evaluate_accumulation_l1_short_balance_decrease(indicators)}
    if strategy == "breakout":
        return {"L1": evaluate_breakout_l1_short_balance_increase(indicators)}
    raise ValueError(f"unsupported strategy: {strategy}")


def rescore_entry(
    entry: dict[str, Any],
    strategy: str,
    short_balance_map: dict[str, float],
) -> dict[str, Any] | None:
    """entry를 in-place로 재채점한다. 실제 점수 변경이 있으면 요약을 반환한다."""

    weights, strict_max = _STRATEGY_WEIGHTS[strategy]
    new_rule_codes = _NEW_RULE_CODES[strategy]
    old_weights = {code: w for code, w in weights.items() if code not in new_rule_codes}
    signal_factors = BREAKOUT_SIGNAL_FACTORS if strategy == "breakout" else None

    code = str(entry.get("code") or "")
    indicators = dict((entry.get("stockIndicators") or {}).get("snapshot") or {})
    indicators.pop("creditBalanceChangePct", None)
    indicators.pop("creditBalanceRatioPct", None)
    before = {
        "strictScore": float(entry.get("strictScore") or 0.0),
        "signalScore": float(entry.get("signalScore") or entry.get("score") or 0.0),
        "score": float(entry.get("score") or 0.0),
        "scoreMax": float(entry.get("scoreMax") or 0.0),
        "effectiveScoreMax": float(entry.get("effectiveScoreMax") or 0.0),
        "gradeScore": float(entry.get("gradeScore") or 0.0),
        "grade": str(entry.get("grade") or ""),
    }

    short_change = short_balance_map.get(code)
    if short_change is not None:
        indicators["shortBalanceChangePct"] = short_change

    entry.setdefault("stockIndicators", {})["snapshot"] = indicators

    old_breakdown = entry.get("scoreBreakdown") or []
    volatility_row = next((row for row in old_breakdown if row.get("code") == "V1"), None)
    old_score_map: dict[str, EvalResult] = {
        row["code"]: _eval_result_from_breakdown_row(row)
        for row in old_breakdown
        if row.get("code") not in {"V1", *_REMOVED_RULE_CODES}
    }

    strict_raw_old = aggregate_raw_score(old_score_map, old_weights)
    score_delta_old = float(volatility_row["strictPoints"]) if volatility_row else 0.0
    strict_score_old = float(entry.get("strictScore") or 0.0)
    vkospi_multiplier = (
        (strict_score_old - score_delta_old) / strict_raw_old if strict_raw_old > 1e-9 else 1.0
    )

    new_rules = _new_rule_results(strategy, indicators)
    new_score_map = dict(old_score_map)
    new_score_map.update(new_rules)

    strict_raw_new = aggregate_raw_score(new_score_map, weights)
    signal_raw_new = aggregate_raw_score(new_score_map, weights, snapshot=indicators, signal_factors=signal_factors)
    strict_score_new = round(_clamp_score(strict_raw_new * vkospi_multiplier + score_delta_old, 0.0, strict_max), 1)
    signal_score_new = round(_clamp_score(signal_raw_new * vkospi_multiplier + score_delta_old, 0.0, strict_max), 1)
    eff_max_new = available_strict_max(new_score_map, weights)
    grade_score_new = round(_clamp_score(grade_score_from_strict(strict_score_new, eff_max_new), 0.0, 10.0), 1)
    grade_new = grade_from_score(grade_score_new, strategy)

    breakdown_new = build_score_breakdown(new_score_map, weights, snapshot=indicators, signal_factors=signal_factors)
    breakdown_new = append_volatility_breakdown_row(
        breakdown_new,
        {"scoreDelta": score_delta_old, "summary": (volatility_row or {}).get("note", "")},
    )
    matched, unmatched = split_rule_lists(new_score_map)

    entry["strictScore"] = strict_score_new
    entry["signalScore"] = signal_score_new
    entry["score"] = signal_score_new
    entry["scoreMax"] = strict_max
    entry["effectiveScoreMax"] = round(eff_max_new, 2)
    entry["gradeScore"] = grade_score_new
    entry["grade"] = grade_new
    entry["scoreBreakdown"] = breakdown_new
    entry["gates"] = [
        gate for gate in (entry.get("gates") or [])
        if str(gate.get("code") or "").upper() not in _REMOVED_GATE_CODES
    ]
    entry["matchedRules"] = matched
    entry["unmatchedRules"] = unmatched
    after = {
        "strictScore": strict_score_new,
        "signalScore": signal_score_new,
        "score": signal_score_new,
        "scoreMax": float(strict_max),
        "effectiveScoreMax": round(eff_max_new, 2),
        "gradeScore": grade_score_new,
        "grade": grade_new,
    }
    changed_fields = [key for key, value in after.items() if before.get(key) != value]
    if not changed_fields:
        return None
    return {
        "strategy": strategy,
        "code": code,
        "name": str(entry.get("name") or ""),
        "changedFields": changed_fields,
        "before": before,
        "after": after,
    }


def rescore_payload(payload: dict[str, Any]) -> dict[str, Any]:
    all_codes: set[str] = set()
    large_cap_codes: set[str] = set()
    for slot in payload.get("slots") or []:
        entries = slot.get("entries") or {}
        for strategy in _NEW_RULE_CODES:
            for entry in entries.get(strategy) or []:
                code = str(entry.get("code") or "")
                if not code:
                    continue
                all_codes.add(code)
                snapshot = (entry.get("stockIndicators") or {}).get("snapshot") or {}
                rank = snapshot.get("marketCapRank")
                if rank is not None and rank <= LARGE_CAP_MARKET_CAP_RANK_LIMIT:
                    large_cap_codes.add(code)

    if not all_codes:
        return payload

    analysis_date = date.fromisoformat(str(payload["analysisDate"]))
    short_balance_result = collect_short_balance_trend(sorted(large_cap_codes), as_of=analysis_date)
    short_balance_map = short_balance_result.values
    changed_entries: list[dict[str, Any]] = []

    for slot in payload.get("slots") or []:
        entries = slot.get("entries") or {}
        for strategy in _NEW_RULE_CODES:
            for entry in entries.get(strategy) or []:
                changed = rescore_entry(entry, strategy, short_balance_map)
                if changed:
                    changed_entries.append(changed)

    source_point_in_time_status = infer_payload_point_in_time_status(payload)
    payload.setdefault("pointInTime", point_in_time_flag_from_status(source_point_in_time_status))
    payload["pointInTimeStatus"] = source_point_in_time_status

    provider_health: dict[str, dict[str, int]] = {}
    for source in (short_balance_result.provider_health,):
        for provider, statuses in source.items():
            row = provider_health.setdefault(provider, {})
            for status, count in statuses.items():
                row[status] = row.get(status, 0) + int(count)

    existing_meta = payload.get("rescoreMeta")
    rescore_meta = dict(existing_meta) if isinstance(existing_meta, dict) else {}
    rescore_meta.pop("creditBalanceCodes", None)
    rescore_meta.update({
        "rescoredRules": {k: list(v) for k, v in _NEW_RULE_CODES.items()},
        "shortBalanceCodes": sorted(short_balance_map),
        "changedEntries": changed_entries,
        "providerHealth": provider_health,
        "sourcePointInTimeStatus": source_point_in_time_status,
    })
    payload["rescoreMeta"] = rescore_meta
    return payload


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--from", dest="date_from", required=True, help="시작일 YYYY-MM-DD")
    parser.add_argument("--to", dest="date_to", required=True, help="종료일 YYYY-MM-DD")
    parser.add_argument("--variant", default=VARIANT_STABLE)
    parser.add_argument("--src-dir", default="jongga/output", help="원본 payload 디렉터리")
    parser.add_argument("--out-dir", required=True, help="재채점 결과 출력 디렉터리 (원본과 달라야 함)")
    args = parser.parse_args()

    variant = normalize_variant(args.variant)
    date_from = date.fromisoformat(args.date_from)
    date_to = date.fromisoformat(args.date_to)
    src_root = Path(args.src_dir)
    out_root = Path(args.out_dir)
    if out_root.resolve() == src_root.resolve():
        parser.error("--out-dir must differ from --src-dir")

    for day in iter_dates(date_from, date_to):
        json_path, _ = build_daily_output_paths(src_root, day, variant=variant)
        if not json_path.exists():
            print(f"skip {day.isoformat()}: {json_path} not found")
            continue
        payload = json.loads(json_path.read_text(encoding="utf-8"))
        if not payload.get("slots"):
            print(f"skip {day.isoformat()}: no slots")
            continue
        rescore_payload(payload)

        out_json_path, _ = build_daily_output_paths(out_root, day, variant=variant)
        out_json_path.parent.mkdir(parents=True, exist_ok=True)
        out_json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"rescored {day.isoformat()} -> {out_json_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
