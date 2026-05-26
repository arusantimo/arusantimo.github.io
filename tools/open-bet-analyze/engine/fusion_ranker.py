from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from engine.macro_gate import evaluate_macro_gate
from engine.track_a_signal import gap_entry_weight, score_track_a
from engine.track_b_theme import score_track_b_for_code
from engine.ats_execution_plan import build_ats_execution_plan, get_execution_schedule_summary
from engine.track_c_supply import filter_track_c_candidates, score_track_c
from router.quality import MetricEnvelope, evaluate_quality

KST = timezone(timedelta(hours=9))


def _grade(score: float) -> str:
    if score >= 9.0:
        return "S"
    if score >= 7.5:
        return "A"
    return "B"


def build_result(
    envelopes: dict[str, MetricEnvelope],
    *,
    phase: str,
    trade_date: str,
    required_metrics: list[str],
) -> dict[str, Any]:
    quality = evaluate_quality(envelopes, required_metrics)
    eod = (envelopes.get("eod_open_bet_signals") or MetricEnvelope("eod")).value or {}
    macro_env = envelopes.get("global_gap_bundle")
    macro = (macro_env.value if macro_env else None) or {}
    night = (envelopes.get("night_kospi_future") or MetricEnvelope("night")).value or {}
    gate = evaluate_macro_gate(eod, macro, night)

    overtime = ((envelopes.get("overtime_single_board") or MetricEnvelope("ot")).value or {}).get("rows") or []
    expected = ((envelopes.get("expected_open") or MetricEnvelope("eo")).value or {}).get("rows") or overtime
    news = (envelopes.get("news_headlines") or MetricEnvelope("news")).value or {}
    themes = news.get("themes") or []
    flows = (envelopes.get("foreign_inst_flow") or MetricEnvelope("flow")).value or {}

    ah_by_code = {str(r.get("code")): r for r in expected}
    track_c_rows = filter_track_c_candidates(expected if expected else overtime)

    candidates_map: dict[str, dict[str, Any]] = {}

    def ensure(code: str, name: str = "") -> dict[str, Any]:
        if code not in candidates_map:
            candidates_map[code] = {
                "code": code,
                "name": name,
                "tracks": {},
                "finalScore": 0.0,
            }
        if name:
            candidates_map[code]["name"] = name
        return candidates_map[code]

    for row in track_c_rows:
        code = str(row.get("code") or "")
        if not code:
            continue
        item = ensure(code, str(row.get("name") or ""))
        item["tracks"]["C"] = score_track_c(row, macro=macro)

    for cand in eod.get("candidates") or []:
        code = str(cand.get("code") or "")
        if not code:
            continue
        ah_row = ah_by_code.get(code) or {}
        ah_change = ah_row.get("ahChangePct")
        item = ensure(code, str(cand.get("name") or ""))
        item["tracks"]["A"] = score_track_a(
            cand,
            flows=flows,
            ah_change=float(ah_change) if ah_change is not None else None,
            has_positive_news=bool(themes),
        )

    theme_codes: set[str] = set()
    for theme in themes:
        for code in theme.get("stocks") or []:
            theme_codes.add(str(code))
    for code in theme_codes:
        item = ensure(code)
        item["tracks"]["B"] = score_track_b_for_code(code, themes, macro=macro)

    held_back: list[dict[str, Any]] = []
    ranked: list[dict[str, Any]] = []

    for code, item in candidates_map.items():
        tracks = item["tracks"]
        score_a = (tracks.get("A") or {}).get("score") or 0.0
        score_b = (tracks.get("B") or {}).get("score") or 0.0
        score_c = (tracks.get("C") or {}).get("score") or 0.0
        active_tracks = sum(1 for t in ("A", "B", "C") if (tracks.get(t) or {}).get("eligible"))
        overlap = 1.5 if active_tracks == 2 else 3.0 if active_tracks >= 3 else 0.0
        final = score_a * 0.35 + score_b * 0.30 + score_c * 0.35 + overlap
        final *= gate.get("weightScale", 1.0)
        item["finalScore"] = round(final, 2)
        item["grade"] = _grade(final)
        item["primaryTrack"] = max(
            ("A", score_a),
            ("B", score_b),
            ("C", score_c),
            key=lambda pair: pair[1],
        )[0]

        ah_row = ah_by_code.get(code) or {}
        gap_pct = ah_row.get("expectedOpenGapPct")
        item["gap"] = {
            "expectedPct": gap_pct,
            "band": (tracks.get("A") or {}).get("gapBand") or "unknown",
            "policy": item["primaryTrack"],
            "strongOpen": ah_row.get("strongOpen"),
        }
        item["gates"] = (tracks.get("A") or {}).get("gates") or {}
        weight = gap_entry_weight(final, item["gap"]["band"])
        ats_plan = build_ats_execution_plan(
            ah_row=ah_row,
            stop_loss_pct=-2.0,
            tp1_pct=2.0,
            entry_weight=weight,
        )
        item["entryPlan"] = ats_plan
        item["entryPlan"]["entryWeight"] = weight

        eligible = final >= 7.5 and gate.get("openBetActive") and quality["status"] != "incomplete"
        track_c_hold = (tracks.get("C") or {}).get("heldReason")
        if track_c_hold in {"gap_overheat", "ah_change_below_min"}:
            eligible = False
            held_back.append({"code": code, "reason": track_c_hold})
        if not eligible:
            if final < 7.5:
                held_back.append({"code": code, "reason": "score_below_A"})
            elif not gate.get("openBetActive"):
                held_back.append({"code": code, "reason": "macro_or_regime_halt"})
        else:
            ranked.append(item)

    ranked.sort(key=lambda row: row["finalScore"], reverse=True)
    top = ranked[:3]

    liquidation_orders = []
    for cand in top:
        plan = cand.get("entryPlan") or {}
        liq = plan.get("krxLiquidation") or {}
        if liq.get("limitPrice"):
            liquidation_orders.append(
                {
                    "code": cand.get("code"),
                    "name": cand.get("name"),
                    "at": liq.get("at", "09:00"),
                    "orderType": liq.get("orderType", "limit"),
                    "limitPrice": liq.get("limitPrice"),
                    "instruction": liq.get("instruction"),
                    "buyLimitPrice": (plan.get("buyOrder") or {}).get("limitPrice"),
                }
            )

    return {
        "schemaVersion": "open_bet_result.v1",
        "tradeDate": trade_date,
        "phase": phase,
        "generatedAt": datetime.now(KST).isoformat(timespec="seconds"),
        "executionSchedule": get_execution_schedule_summary(),
        "krxLiquidationOrders": liquidation_orders,
        "regime": {
            "label": gate.get("regimeLabel") or "",
            "openBetActive": gate.get("openBetActive"),
        },
        "macro": {
            "gapGrade": macro.get("grade"),
            "gapTotalScore": macro.get("totalScore"),
            "nq": macro.get("nq"),
            "vix": macro.get("vix"),
            "sox": macro.get("sox"),
            "nightFuture": night.get("changePct"),
        },
        "macroHalt": gate.get("macroHalt"),
        "macroReasons": gate.get("reasons") or [],
        "themes": themes,
        "trackCScanner": track_c_rows,
        "candidates": top if quality["status"] != "incomplete" else [],
        "heldBack": held_back,
        "dataQuality": quality,
    }
