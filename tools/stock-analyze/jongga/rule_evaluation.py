"""Gate·채점 규칙별 충족 여부와 데이터 가용성을 구분해 기록합니다."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Literal

from jongga.macro_overlay import build_pullback_g5_gate, is_macro_friendly_for_g5

EvalStatus = Literal["met", "not_met", "data_missing", "manual_required"]

TOP_TRADING_VALUE_LIMIT = 40


@dataclass(frozen=True)
class EvalResult:
    score: float
    note: str
    eval_status: EvalStatus

    @property
    def passed(self) -> bool:
        return self.score >= 1.0


def eval_met(note: str, *, score: float = 1.0) -> EvalResult:
    return EvalResult(score, note, "met")


def eval_not_met(note: str) -> EvalResult:
    return EvalResult(0.0, note, "not_met")


def eval_data_missing(note: str) -> EvalResult:
    return EvalResult(0.0, note, "data_missing")


def eval_manual_required(note: str) -> EvalResult:
    return EvalResult(0.0, note, "manual_required")


def gate_dict(code: str, result: EvalResult, *, warn_if_not_met: bool = False) -> dict[str, Any]:
    if result.eval_status == "met":
        status = "✅"
    elif result.eval_status in ("data_missing", "manual_required"):
        status = "⚠️"
    elif warn_if_not_met and result.eval_status == "not_met":
        status = "⚠️"
    else:
        status = "⛔"
    return {"code": code, "status": status, "note": result.note, "evalStatus": result.eval_status}


def rule_dict(code: str, result: EvalResult) -> dict[str, Any]:
    return {"code": code, "note": result.note, "evalStatus": result.eval_status}


def split_rule_lists(score_map: dict[str, EvalResult]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    matched: list[dict[str, Any]] = []
    unmatched: list[dict[str, Any]] = []
    for code, result in score_map.items():
        item = rule_dict(code, result)
        if result.passed:
            matched.append(item)
        else:
            unmatched.append(item)
    return matched, unmatched


def has_history(snapshot: Any, days: int) -> bool:
    return len(getattr(snapshot, "close_history", []) or []) >= days and len(getattr(snapshot, "high_history", []) or []) >= days


def drawdown_from_high_20d(snapshot: Any) -> float | None:
    high_20d = float(getattr(snapshot, "high_20d", 0) or 0)
    current = float(getattr(snapshot, "current_price", 0) or 0)
    if high_20d <= 0 or current <= 0:
        return None
    return ((current - high_20d) / high_20d) * 100


def signed_pct(value: float, digits: int = 1) -> str:
    return f"{'+' if value >= 0 else ''}{value:.{digits}f}%"


# --- Pullback gates ---


def evaluate_pullback_g0(snapshot: Any) -> EvalResult:
    rank = int(getattr(snapshot, "rank", 0) or 0)
    note = f"거래대금 TOP{TOP_TRADING_VALUE_LIMIT} 순위 {rank}"
    if rank <= TOP_TRADING_VALUE_LIMIT:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_g1(snapshot: Any) -> EvalResult:
    ma5, ma20, ma60, ma5_prev = snapshot.ma5, snapshot.ma20, snapshot.ma60, snapshot.ma5_prev
    if not all(value is not None for value in (ma5, ma20, ma60, ma5_prev)):
        return eval_data_missing("5/20/60일 이동평균 산출 데이터 부족")
    note = f"5MA {ma5:,.0f} > 20MA {ma20:,.0f} > 60MA {ma60:,.0f}"
    if ma5 > ma20 > ma60 and ma5 > ma5_prev:
        return eval_met(note)
    return eval_not_met(f"{note} · 정배열 또는 5MA 5일 상승 미충족")


def evaluate_pullback_g2(snapshot: Any) -> EvalResult:
    if snapshot.ma60 is None:
        return eval_data_missing("60일 이동평균 산출 데이터 부족")
    note = f"종가 {snapshot.current_price:,.0f} / 60MA {snapshot.ma60:,.0f}"
    if snapshot.current_price > snapshot.ma60:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_g3(snapshot: Any) -> EvalResult:
    if snapshot.weekly_rsi is None:
        return eval_data_missing("주봉 RSI(14) 산출 데이터 부족")
    note = f"주봉 RSI {snapshot.weekly_rsi:.1f} (필요 ≥ 50)"
    if snapshot.weekly_rsi >= 50:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_g4(snapshot: Any, recent_negative_cross) -> EvalResult:
    macd_hist = list(snapshot.macd_hist or [])
    if not macd_hist:
        return eval_data_missing("MACD 히스토그램 산출 데이터 부족")
    if (macd_hist[0] >= 0) or recent_negative_cross(macd_hist):
        return eval_met("MACD 히스토그램 0선 위 또는 음전환 후 3일 이내")
    return eval_not_met("MACD 히스토그램 조건 미충족")


def evaluate_pullback_g5(context: dict[str, Any]) -> dict[str, Any]:
    gate = build_pullback_g5_gate(context)
    kospi_ma5 = float(context.get("kospiMa5") or 0)
    kospi_close = float(context.get("kospiClose") or 0)
    vkospi = float(context.get("vkospiValue") or 0)
    if kospi_ma5 <= 0 and vkospi <= 0:
        gate["evalStatus"] = "data_missing"
        gate["note"] = (gate.get("note") or "") + " · KOSPI·VKOSPI 시장지표 부족"
        return gate
    if kospi_ma5 <= 0:
        gate["evalStatus"] = "data_missing"
        gate["note"] = (gate.get("note") or "") + " · KOSPI 5일선 데이터 부족"
        return gate
    if gate["status"] == "✅":
        gate["evalStatus"] = "met"
    elif gate["status"] == "⚠️":
        gate["evalStatus"] = "not_met"
    else:
        if kospi_close <= kospi_ma5:
            gate["evalStatus"] = "not_met"
        elif vkospi > 70 or (vkospi > 30 and not is_macro_friendly_for_g5(context)):
            gate["evalStatus"] = "not_met"
        else:
            gate["evalStatus"] = "not_met"
    return gate


# --- Pullback scores ---


def evaluate_pullback_s1(snapshot: Any) -> EvalResult:
    rank = int(snapshot.rank or 0)
    note = f"거래대금 순위 {rank}위 (TOP10 이내 시 S1 충족)"
    if rank <= 10:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_s2(snapshot: Any) -> EvalResult:
    note = f"외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주"
    if snapshot.foreign_net > 0 or snapshot.institution_net > 0:
        return eval_met(f"{note} · 당일 순매수")
    return eval_not_met(f"{note} · 당일 순매수 없음")


def evaluate_pullback_p1(snapshot: Any) -> EvalResult:
    if not has_history(snapshot, 20):
        return eval_data_missing("20일 고점 산출에 필요한 일봉 20거래일 미만")
    drawdown = drawdown_from_high_20d(snapshot)
    if drawdown is None:
        return eval_data_missing("20일 고점·종가 데이터 부족")
    note = f"20일 고점 대비 {signed_pct(drawdown)} (필요 -7%~-15%)"
    if -15 <= drawdown <= -7:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_p2(snapshot: Any) -> EvalResult:
    mas = [("5MA", snapshot.ma5), ("10MA", snapshot.ma10), ("20MA", snapshot.ma20)]
    available = [(label, value) for label, value in mas if value is not None]
    if not available:
        return eval_data_missing("5/10/20일 이동평균 산출 데이터 부족")
    above = [label for label, value in available if snapshot.current_price > value]
    note = f"종가 {snapshot.current_price:,.0f} · {'·'.join(label for label, _ in available)} 중 {', '.join(above) or '없음'} 위"
    if above:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_c1(snapshot: Any, lower_wick_ratio) -> EvalResult:
    if not snapshot.open_price:
        return eval_data_missing("당일 시가·캔들 데이터 부족")
    wick = lower_wick_ratio(snapshot)
    if snapshot.current_price >= snapshot.open_price:
        return eval_met(f"양봉 (시가 {snapshot.open_price:,.0f} ≤ 종가 {snapshot.current_price:,.0f})")
    if wick >= 1.0:
        return eval_met(f"아래꼬리:몸통 {wick:.2f} (필요 ≥ 1.0)")
    return eval_not_met(f"음봉 · 아래꼬리:몸통 {wick:.2f} (필요 ≥ 1.0)")


def evaluate_pullback_c2(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_5d:
        return eval_data_missing("5일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_5d
    note = f"당일 거래량 / 5일 평균 {ratio * 100:.0f}% (필요 100~180%)"
    if 1.0 <= ratio <= 1.8:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_c3(snapshot: Any, context: dict[str, Any]) -> EvalResult:
    industry_change_pct = snapshot.industry_compare_change_pct
    kospi_change_pct = float(context.get("kospiChangePct") or 0)
    if industry_change_pct is None:
        return eval_data_missing("동종업종 비교 데이터 부족")
    comparison_note = (
        f"동종업종 평균 {signed_pct(industry_change_pct, 2)} / "
        f"KOSPI {signed_pct(kospi_change_pct, 2)}"
    )
    if industry_change_pct > kospi_change_pct:
        return eval_met(f"{comparison_note} outperform")
    return eval_not_met(f"{comparison_note} underperform")


# --- Momentum ---


def evaluate_momentum_g1(rs_top10: bool) -> EvalResult:
    if rs_top10:
        return eval_met("3개월 상대강도 상위 10%")
    return eval_not_met("3개월 상대강도 상위 10% 밖")


def evaluate_momentum_g2(snapshot: Any, kospi_return_5d: float, kospi_return_20d: float) -> EvalResult:
    excess_5 = snapshot.return_5d - kospi_return_5d
    excess_20 = snapshot.return_20d - kospi_return_20d
    note = f"5일 초과 {signed_pct(excess_5)} / 20일 초과 {signed_pct(excess_20)}"
    if excess_5 > 0 and excess_20 > 0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_g3(snapshot: Any) -> EvalResult:
    if not snapshot.high_52w:
        return eval_data_missing("52주 고가 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_52w * 100
    note = f"52주 고가 대비 {ratio:.1f}% (필요 ≥ 92%)"
    if snapshot.current_price >= snapshot.high_52w * 0.92:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_s1(snapshot: Any) -> EvalResult:
    note = f"외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주"
    if snapshot.foreign_net > 0 and snapshot.institution_net > 0:
        return eval_met(f"{note} · 동시 순매수")
    return eval_not_met(f"{note} · 동시 순매수 아님")


def evaluate_momentum_p1(snapshot: Any) -> EvalResult:
    if not has_history(snapshot, 20):
        return eval_data_missing("20일 고점 산출 데이터 부족")
    if not snapshot.high_20d:
        return eval_data_missing("20일 고점 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_20d * 100
    note = f"20일 고점 대비 {ratio:.1f}% (필요 ≥ 95%)"
    if snapshot.current_price >= snapshot.high_20d * 0.95:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_p2(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_20d:
        return eval_data_missing("20일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_20d
    note = f"당일 거래량 / 20일 평균 {ratio * 100:.0f}% (필요 ≥ 150%)"
    if ratio >= 1.5:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_c1(snapshot: Any) -> EvalResult:
    if not snapshot.high_price:
        return eval_data_missing("당일 고가 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_price * 100
    note = f"종가 / 당일 고가 {ratio:.1f}% (필요 ≥ 95%)"
    if snapshot.current_price >= snapshot.high_price * 0.95:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_c2(snapshot: Any, candle_range, upper_wick_ratio) -> EvalResult:
    span = candle_range(snapshot)
    if span <= 0:
        return eval_data_missing("당일 캔들 범위 데이터 부족")
    body = abs(snapshot.current_price - snapshot.open_price)
    upper = upper_wick_ratio(snapshot)
    note = f"몸통 {body / span * 100:.0f}% / 윗꼬리·몸통 {upper:.2f}"
    if body >= span * 0.7 and upper <= 0.3:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_s2(snapshot: Any) -> EvalResult:
    toss = snapshot.toss or {}
    avg_strength = float(toss.get("avgStrength") or 0)
    intraday_ratio = float(toss.get("intradayAbove100Ratio") or 0)
    has_avg = avg_strength > 0
    has_ratio = intraday_ratio > 0
    if not has_avg and not has_ratio:
        return eval_manual_required("토스 체결강도 데이터 없음 (수동 입력 필요)")
    if not has_ratio:
        return eval_manual_required(f"당일 평균 체결강도 {avg_strength:.1f}% · 100% 유지 비율 미입력")
    if not has_avg:
        return eval_manual_required(f"100% 유지 비율 {intraday_ratio:.1f}% · 당일 평균 체결강도 미입력")
    note = f"당일 평균 {avg_strength:.1f}% / 100% 유지 {intraday_ratio:.1f}% (필요 ≥110%·≥70%)"
    if avg_strength >= 110.0 and intraday_ratio >= 70.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_momentum_c3(snapshot: Any) -> EvalResult:
    orderbook = snapshot.orderbook or {}
    bid_ask_ratio = float(orderbook.get("bidAskRatio") or 0)
    if bid_ask_ratio <= 0:
        return eval_manual_required("호가잔량 비율 미입력 (토스 호가창 수동 입력)")
    note = f"매수/매도 호가잔량 {bid_ask_ratio:.2f} (필요 ≥ 1.2)"
    if bid_ask_ratio >= 1.2:
        return eval_met(note)
    return eval_not_met(note)


# --- Reversal filters & gates ---


def evaluate_reversal_f1(snapshot: Any) -> EvalResult:
    return evaluate_pullback_g0(snapshot)


def evaluate_reversal_f2(snapshot: Any) -> EvalResult:
    note = f"시총 {snapshot.market_cap_trillion:.1f}조 (필요 ≥ 30조)"
    if snapshot.market_cap_trillion >= 30.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_f3(snapshot: Any) -> EvalResult:
    auto_event_filter = snapshot.event_filter
    if not auto_event_filter:
        return eval_manual_required("실적/배당/분할 일정 수동 확인 필요")
    note = str(auto_event_filter.get("note") or "Naver 일정 기반 이벤트 필터")
    if not auto_event_filter.get("blocked"):
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_f4() -> EvalResult:
    return eval_manual_required("최근 5거래일 재진입 이력 수동 확인 필요")


def evaluate_reversal_g1(snapshot: Any) -> EvalResult:
    note = f"1개월 수익률 {signed_pct(snapshot.return_21d)} (필요 ≥ +30%)"
    if snapshot.return_21d >= 30.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_g2(snapshot: Any) -> EvalResult:
    drawdown = drawdown_from_high_20d(snapshot)
    if drawdown is None:
        return eval_data_missing("20일 고점·종가 데이터 부족")
    note = f"20일 고점 대비 {signed_pct(drawdown)} (필요 -7%~-20%)"
    if -20.0 <= drawdown <= -7.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_g3(snapshot: Any) -> EvalResult:
    return evaluate_pullback_g2(snapshot)


def evaluate_reversal_g4(snapshot: Any) -> EvalResult:
    daily_returns = []
    for current, previous in zip(snapshot.close_history[:5], snapshot.close_history[1:6]):
        if previous:
            daily_returns.append(((current - previous) / previous) * 100)
    if len(daily_returns) < 5:
        return eval_data_missing("최근 5거래일 수익률 산출 데이터 부족")
    worst = min(daily_returns)
    note = f"최근 5거래일 최저 {signed_pct(worst)} (필요 -5% 이하 급락 1회 이상)"
    if any(value <= -5.0 for value in daily_returns):
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_g5(snapshot: Any, bullish: bool, long_lower: bool, doji: bool, candle_range, lower_wick_ratio) -> tuple[str, EvalResult]:
    if bullish:
        return "G5-a", eval_met("양봉 안정화 캔들")
    if long_lower:
        return "G5-b", eval_met(f"긴 아래꼬리 (비율 {lower_wick_ratio(snapshot):.2f})")
    if doji:
        return "G5-c", eval_met("도지형 안정화 캔들")
    span = candle_range(snapshot)
    if span <= 0:
        return "G5", eval_data_missing("당일 캔들 데이터 부족")
    return "G5", eval_not_met("양봉·긴아래꼬리·도지 패턴 없음")


def evaluate_reversal_s1(snapshot: Any) -> EvalResult:
    foreign_flip = snapshot.foreign_previous <= 0 < snapshot.foreign_net
    institution_flip = snapshot.institution_previous <= 0 < snapshot.institution_net
    note = (
        f"외인 {snapshot.foreign_previous:,.0f}→{snapshot.foreign_net:,.0f} / "
        f"기관 {snapshot.institution_previous:,.0f}→{snapshot.institution_net:,.0f}"
    )
    if foreign_flip or institution_flip:
        return eval_met(f"{note} · 순매수 전환")
    return eval_not_met(f"{note} · 순매수 전환 없음")


def evaluate_reversal_p1(snapshot: Any) -> EvalResult:
    if snapshot.ma20 is None:
        return eval_data_missing("20일 이동평균 산출 데이터 부족")
    note = f"종가 {snapshot.current_price:,.0f} / 20MA {snapshot.ma20:,.0f}"
    if snapshot.current_price > snapshot.ma20:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_p2(snapshot: Any) -> EvalResult:
    if snapshot.high_price <= snapshot.low_price:
        return eval_data_missing("당일 고가·저가 데이터 부족")
    position_ratio = (snapshot.current_price - snapshot.low_price) / (snapshot.high_price - snapshot.low_price) * 100
    note = f"당일 레인지 상단 {position_ratio:.0f}% (필요 ≥ 50%)"
    if position_ratio >= 50:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_c1(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_5d:
        return eval_data_missing("5일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_5d
    note = f"당일 거래량 / 5일 평균 {ratio * 100:.0f}% (필요 ≥ 200%)"
    if ratio >= 2.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_s2(snapshot: Any) -> EvalResult:
    toss = snapshot.toss or {}
    avg_strength = float(toss.get("avgStrength") or 0)
    last_hour = float(toss.get("lastHourAvgStrength") or 0)
    has_avg = avg_strength > 0
    has_last = last_hour > 0
    if not has_avg and not has_last:
        return eval_manual_required("토스 체결강도 데이터 없음 (수동 입력 필요)")
    if not has_last:
        return eval_manual_required(f"당일 평균 {avg_strength:.1f}% · 마지막 1시간 평균 미입력")
    if not has_avg:
        return eval_manual_required(f"마지막 1시간 {last_hour:.1f}% · 당일 평균 미입력")
    note = f"당일 평균 {avg_strength:.1f}% / 마지막 1시간 {last_hour:.1f}% (필요 ≥90%·≥100%)"
    if avg_strength >= 90.0 and last_hour >= 100.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_c2(snapshot: Any) -> EvalResult:
    orderbook = snapshot.orderbook or {}
    bid_ask_ratio = float(orderbook.get("bidAskRatio") or 0)
    if bid_ask_ratio <= 0:
        return eval_manual_required("호가잔량 비율 미입력 (토스 호가창 수동 입력)")
    note = f"매수/매도 호가잔량 {bid_ask_ratio:.2f} (필요 ≥ 1.0)"
    if bid_ask_ratio >= 1.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_c3(snapshot: Any) -> EvalResult:
    intraday_signal = snapshot.intraday_30m or {}
    if not intraday_signal.get("available"):
        note = str(intraday_signal.get("note") or "").strip() or "30분봉 데이터 부족"
        return eval_data_missing(note)
    note = str(intraday_signal.get("note") or "").strip() or "30분봉 안정화 신호"
    if intraday_signal.get("signal"):
        return eval_met(f"{note} 충족")
    return eval_not_met(f"{note} 미달")
