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

    # Track C (시간외 단일가) 후보 등록 및 채점
    for row in track_c_rows:
        code = str(row.get("code") or "")
        if not code:
            continue
        item = ensure(code, str(row.get("name") or ""))
        flow_info = flows.get(code) or {}
        prev_vol = flow_info.get("prevVolume")
        item["tracks"]["C"] = score_track_c(row, macro=macro, prev_volume=prev_vol)

    # 종가 후보 미존재 시 expected_open에서 갭상승 종목 Fallback 발굴
    eod_cands = eod.get("candidates") or []
    if not eod_cands:
        for row in expected:
            code = str(row.get("code") or "")
            ah_change = row.get("ahChangePct")
            if code and ah_change is not None and float(ah_change) >= 0.5:
                eod_cands.append({
                    "code": code,
                    "name": row.get("name") or "",
                    "gates": {
                        "G1": {"status": "passed"},
                        "G2": {"status": "passed"},
                        "G3": {"status": "passed"}
                    }
                })

    # Track A (갭상승 돌파) 후보 등록 및 채점
    for cand in eod_cands:
        code = str(cand.get("code") or "")
        if not code:
            continue
        ah_row = ah_by_code.get(code) or {}
        ah_change = ah_row.get("ahChangePct")
        ah_volume = ah_row.get("ahVolume")
        flow_info = flows.get(code) or {}
        prev_vol = flow_info.get("prevVolume")
        
        # vkospi 파싱
        vkospi_val = None
        if eod.get("vkospi"):
            try:
                # 'VKOSPI 68.09' 형태에서 숫자 추출 시도
                cleaned = "".join(c for c in str(eod.get("vkospi")) if c.isdigit() or c == ".")
                if cleaned:
                    vkospi_val = float(cleaned)
            except ValueError:
                pass

        item = ensure(code, str(cand.get("name") or ""))
        item["tracks"]["A"] = score_track_a(
            cand,
            flows=flows,
            ah_change=float(ah_change) if ah_change is not None else None,
            has_positive_news=bool(themes),
            vkospi=vkospi_val,
            prev_volume=prev_vol,
            ah_volume=ah_volume,
        )

    # Track B (테마) 채점
    theme_codes: set[str] = set()
    for theme in themes:
        for code in theme.get("stocks") or []:
            theme_codes.add(str(code))
    for code in theme_codes:
        item = ensure(code)
        item["tracks"]["B"] = score_track_b_for_code(code, themes, macro=macro)

    ranked_gap_break: list[dict[str, Any]] = []
    ranked_overtime_follow: list[dict[str, Any]] = []
    held_back: list[dict[str, Any]] = []

    # 각 종목별 전략 분리 평가
    for code, item in candidates_map.items():
        tracks = item["tracks"]
        track_a = tracks.get("A") or {}
        track_c = tracks.get("C") or {}
        
        ah_row = ah_by_code.get(code) or {}
        gap_pct = ah_row.get("expectedOpenGapPct")
        
        # 1. 갭상승 돌파 전략 후보군 (Track A 기준)
        if track_a.get("eligible") and track_a.get("score", 0.0) >= 5.0:
            final_a = track_a["score"] * gate.get("weightScale", 1.0)
            band = track_a.get("gapBand") or "unknown"
            weight = gap_entry_weight(final_a, band)
            
            cand_item = {
                "code": code,
                "name": item["name"],
                "strategy": "GapBreak",
                "strategyScore": track_a["score"],
                "finalScore": round(final_a, 2),
                "grade": _grade(final_a),
                "gap": {
                    "expectedPct": gap_pct,
                    "band": band,
                    "policy": "A",
                    "strongOpen": ah_row.get("strongOpen"),
                },
                "gates": track_a.get("gates") or {},
                "volRatio": track_a.get("volRatio") or 0.0,
                "entryPlan": build_ats_execution_plan(
                    ah_row=ah_row,
                    stop_loss_pct=-2.0,
                    tp1_pct=2.0,
                    entry_weight=weight,
                ),
            }
            cand_item["entryPlan"]["entryWeight"] = weight
            
            if gate.get("openBetActive"):
                ranked_gap_break.append(cand_item)
            else:
                held_back.append({"code": code, "strategy": "GapBreak", "reason": "macro_or_regime_halt"})

        # 2. 시간외 단일가 연계 전략 후보군 (Track C 기준)
        if track_c.get("eligible") and track_c.get("score", 0.0) >= 4.0:
            final_c = track_c["score"] * gate.get("weightScale", 1.0)
            # 시간외의 경우도 적정 갭으로 매수 비중 산정
            band = "ideal"
            if gap_pct is not None:
                if gap_pct > 4.0:
                    band = "hold"
                elif gap_pct > 3.0:
                    band = "borderline"
            weight = gap_entry_weight(final_c, band)

            cand_item = {
                "code": code,
                "name": item["name"],
                "strategy": "OvertimeFollow",
                "strategyScore": track_c["score"],
                "finalScore": round(final_c, 2),
                "grade": _grade(final_c),
                "gap": {
                    "expectedPct": gap_pct,
                    "band": band,
                    "policy": "C",
                    "strongOpen": ah_row.get("strongOpen"),
                },
                "breakdown": track_c.get("breakdown") or {},
                "volRatio": track_c.get("volRatio") or 0.0,
                "entryPlan": build_ats_execution_plan(
                    ah_row=ah_row,
                    stop_loss_pct=-2.0,
                    tp1_pct=2.0,
                    entry_weight=weight,
                ),
            }
            cand_item["entryPlan"]["entryWeight"] = weight
            
            track_c_hold = track_c.get("heldReason")
            if track_c_hold in {"gap_overheat", "ah_change_below_min", "volume_surge_below_min"}:
                held_back.append({"code": code, "strategy": "OvertimeFollow", "reason": track_c_hold})
            elif gate.get("openBetActive"):
                ranked_overtime_follow.append(cand_item)
            else:
                held_back.append({"code": code, "strategy": "OvertimeFollow", "reason": "macro_or_regime_halt"})

    # 각각 정렬 후 최대 3종목 추천
    ranked_gap_break.sort(key=lambda r: r["finalScore"], reverse=True)
    top_gap_break = ranked_gap_break[:3]

    ranked_overtime_follow.sort(key=lambda r: r["finalScore"], reverse=True)
    top_overtime_follow = ranked_overtime_follow[:3]

    # 하위 호환성용 통합 candidates 구성 (두 추천 종목의 합집합, 최대 3개)
    combined = {c["code"]: c for c in (top_gap_break + top_overtime_follow)}
    combined_list = list(combined.values())
    combined_list.sort(key=lambda r: r["finalScore"], reverse=True)
    legacy_candidates = combined_list[:3]

    # 청산 예약 주문 생성
    liquidation_orders = []
    for cand in legacy_candidates:
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
        "schemaVersion": "open_bet_result.v2",
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
        "candidates": legacy_candidates,
        "candidatesGapBreak": top_gap_break,
        "candidatesOvertimeFollow": top_overtime_follow,
        "heldBack": held_back,
        "dataQuality": quality,
    }
