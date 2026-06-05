"""Gate·채점 규칙별 충족 여부와 데이터 가용성을 구분해 기록합니다."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Literal

from jongga.macro_overlay import build_pullback_g5_gate

EvalStatus = Literal["met", "not_met", "data_missing", "manual_required"]

TOP_TRADING_VALUE_LIMIT = 100


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
    history = snapshot.volume_history or []
    if len(history) < 21:
        return eval_data_missing("20일 거래량 데이터 부족")
    
    past_20d = history[1:21]
    if not past_20d:
        return eval_not_met("과거 데이터 없음")
    
    max_vol = max(past_20d)
    avg_20 = sum(past_20d) / len(past_20d)
    
    ratio = (max_vol / avg_20) if avg_20 > 0 else 0
    note = f"최근 20일 최대 거래량 급증 {ratio*100:.0f}% (필요 ≥ 200%)"
    if ratio >= 2.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_g1(snapshot: Any) -> EvalResult:
    ma5, ma20, ma60 = snapshot.ma5, snapshot.ma20, snapshot.ma60
    ma5_prev, ma20_prev, ma60_prev = snapshot.ma5_prev, snapshot.ma20_prev, snapshot.ma60_prev
    if not all(value is not None for value in (ma5, ma20, ma60)):
        return eval_data_missing("5/20/60일 이동평균 산출 데이터 부족")
    slope_labels: list[str] = []
    if ma5_prev is not None and ma5 > ma5_prev:
        slope_labels.append("5MA")
    if ma20_prev is not None and ma20 > ma20_prev:
        slope_labels.append("20MA")
    if ma60_prev is not None and ma60 > ma60_prev:
        slope_labels.append("60MA")
    note = (
        f"5MA {ma5:,.0f} > 20MA {ma20:,.0f} > 60MA {ma60:,.0f} "
        f"· 상승선 {', '.join(slope_labels) or '없음'}"
    )
    if not ma5 > ma20 > ma60:
        return eval_not_met(f"{note} · 정배열 미충족")
    if slope_labels:
        return eval_met(note)
    return eval_not_met(f"{note} · 5/20/60MA 중 상승선 없음")


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
    else:
        gate["evalStatus"] = "not_met"
    return gate


# --- Pullback overextension gates (눌림목 과열 차단 가드레일) ---
# 눌림목은 "상승추세 종목이 지지선까지 눌렸을 때" 매수하는 전략이다.
# 아래 세 게이트는 '눌림'이 아니라 '과열·추격'인 종목을 ⛔로 차단한다.
# 절대 지수 스케일과 무관한 비율 기준만 사용한다.
PULLBACK_MAX_DAILY_CHANGE_PCT = 12.0
PULLBACK_MAX_WEEKLY_RSI = 80.0
PULLBACK_MAX_EXT_MA20_PCT = 25.0
PULLBACK_MAX_EXT_MA60_PCT = 60.0


def evaluate_pullback_g6_daily_change(snapshot: Any, daily_change_pct: float) -> EvalResult:
    """당일 급등일은 눌림목이 아니라 추격 매수 → 차단."""
    note = f"당일 등락 {signed_pct(daily_change_pct, 2)} (필요 ≤ +{PULLBACK_MAX_DAILY_CHANGE_PCT:.0f}%)"
    if daily_change_pct <= PULLBACK_MAX_DAILY_CHANGE_PCT:
        return eval_met(note)
    return eval_not_met(f"{note} · 급등일은 눌림목 부적합")


def evaluate_pullback_g7_rsi_ceiling(snapshot: Any) -> EvalResult:
    """주봉 RSI 과매수 상한 — G3(≥50 하한)의 반대편 가드. 과열 구간 매수 차단."""
    if snapshot.weekly_rsi is None:
        return eval_data_missing("주봉 RSI(14) 산출 데이터 부족")
    note = f"주봉 RSI {snapshot.weekly_rsi:.1f} (필요 ≤ {PULLBACK_MAX_WEEKLY_RSI:.0f})"
    if snapshot.weekly_rsi <= PULLBACK_MAX_WEEKLY_RSI:
        return eval_met(note)
    return eval_not_met(f"{note} · 과매수 과열")


def evaluate_pullback_g8_extension(snapshot: Any) -> EvalResult:
    """이평 이격 상한 — 지지선까지 '눌린' 상태여야 함. 과이격이면 눌림 아님."""
    ma20, ma60 = snapshot.ma20, snapshot.ma60
    price = snapshot.current_price
    if ma20 is None or ma60 is None:
        return eval_data_missing("20/60일 이동평균 산출 데이터 부족")
    ext20 = (price / ma20 - 1) * 100 if ma20 else 0.0
    ext60 = (price / ma60 - 1) * 100 if ma60 else 0.0
    note = (
        f"이격 20MA {signed_pct(ext20, 1)} (필요 ≤ +{PULLBACK_MAX_EXT_MA20_PCT:.0f}%) · "
        f"60MA {signed_pct(ext60, 1)} (필요 ≤ +{PULLBACK_MAX_EXT_MA60_PCT:.0f}%)"
    )
    if ext20 <= PULLBACK_MAX_EXT_MA20_PCT and ext60 <= PULLBACK_MAX_EXT_MA60_PCT:
        return eval_met(note)
    return eval_not_met(f"{note} · 과이격(지지선 눌림 아님)")


# --- Pullback scores ---


def evaluate_pullback_s1(snapshot: Any) -> EvalResult:
    rank = int(getattr(snapshot, "rank", 0) or 0)
    note = f"당일 거래대금 순위 {rank}위 (TOP 30 이내 시 충족)"
    if 0 < rank <= 30:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_pullback_s2(snapshot: Any) -> EvalResult:
    note = f"외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주"
    if snapshot.foreign_net > 0 or snapshot.institution_net > 0:
        return eval_met(f"{note} · 당일 순매수")
    return eval_not_met(f"{note} · 당일 순매수 없음")


def evaluate_pullback_p1(snapshot: Any) -> EvalResult:
    mas = [("5MA", snapshot.ma5), ("10MA", snapshot.ma10), ("20MA", snapshot.ma20)]
    available = [(label, value) for label, value in mas if value is not None]
    if not available:
        return eval_data_missing("이동평균 산출 데이터 부족")
    
    # 저가가 이평선 중 하나라도 터치(1% 근접 하락)했는지
    touched = [label for label, value in available if snapshot.low_price <= value * 1.01]
    
    note = f"저가 {snapshot.low_price:,.0f} · 이평선 터치: {', '.join(touched) or '없음'}"
    if touched:
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
    note = f"당일 거래량 / 5일 평균 {ratio * 100:.0f}% (필요 ≤ 80%)"
    if ratio <= 0.8:
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


# --- Breakout (주도주 돌파형) ---


def evaluate_breakout_rs(rs_top10: bool) -> EvalResult:
    """3개월 상대강도 — 채점 항목 (상위 25% 충족 시 +1.5점)"""
    if rs_top10:
        return eval_met("3개월 상대강도 상위 25%")
    return eval_not_met("3개월 상대강도 상위 25% 밖")


def evaluate_breakout_g1(snapshot: Any, kospi_return_5d: float, kospi_return_20d: float) -> EvalResult:
    excess_5 = snapshot.return_5d - kospi_return_5d
    excess_20 = snapshot.return_20d - kospi_return_20d
    note = f"5일 초과 {signed_pct(excess_5)} / 20일 초과 {signed_pct(excess_20)}"
    if excess_5 > 0 or excess_20 > 0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_g2(snapshot: Any) -> EvalResult:
    if not snapshot.high_52w:
        return eval_data_missing("52주 고가 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_52w * 100
    note = f"52주 고가 대비 {ratio:.1f}% (필요 ≥ 92%)"
    if snapshot.current_price >= snapshot.high_52w * 0.92:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_g3(snapshot: Any) -> EvalResult:
    rank = int(getattr(snapshot, "rank", 0) or 0)
    note = f"거래대금 TOP100 순위 {rank}"
    if 0 < rank <= TOP_TRADING_VALUE_LIMIT:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_g4_volume(snapshot: Any) -> EvalResult:
    return evaluate_breakout_p2(snapshot)


def evaluate_breakout_g5_candle(snapshot: Any, candle_range, upper_wick_ratio) -> EvalResult:
    return evaluate_breakout_c2(snapshot, candle_range, upper_wick_ratio)


def evaluate_breakout_g6_daily_change(snapshot: Any, daily_change_pct: float) -> EvalResult:
    note = f"당일 등락 {signed_pct(daily_change_pct, 2)} (필요 ≤ +12%)"
    if daily_change_pct <= 12.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_g7_ma5(snapshot: Any) -> EvalResult:
    if snapshot.ma5 is None or snapshot.ma5_prev is None:
        return eval_data_missing("5일 이동평균 산출 데이터 부족")
    note = (
        f"종가 {snapshot.current_price:,.0f} / 5MA {snapshot.ma5:,.0f} "
        f"(전일 5MA {snapshot.ma5_prev:,.0f})"
    )
    if snapshot.current_price > snapshot.ma5 and snapshot.ma5 > snapshot.ma5_prev:
        return eval_met(f"{note} · 5MA 위·우상향")
    return eval_not_met(f"{note} · 5MA 조건 미충족")


def evaluate_breakout_s1(snapshot: Any) -> EvalResult:
    note = f"외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주"
    if snapshot.foreign_net > 0 and snapshot.institution_net > 0:
        return eval_met(f"{note} · 외인·기관 양매수")
    return eval_not_met(f"{note} · 양매수 아님")


def evaluate_breakout_p1(snapshot: Any) -> EvalResult:
    if not has_history(snapshot, 20):
        return eval_data_missing("20일 고점 산출 데이터 부족")
    if not snapshot.high_20d:
        return eval_data_missing("20일 고점 데이터 부족")
    price = snapshot.current_price
    high_20d = snapshot.high_20d
    ratio = price / high_20d * 100
    if price > high_20d:
        extension = (price / high_20d - 1) * 100
        note = f"20일 고점 돌파 · 이격 {extension:.1f}% (필요 ≤ +5%)"
        if price <= high_20d * 1.05:
            return eval_met(note)
        return eval_not_met(note)
    note = f"20일 고점 대비 {ratio:.1f}% (미돌파 시 필요 ≥ 95%)"
    if ratio >= 95.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_p2(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_20d:
        return eval_data_missing("20일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_20d
    note = f"당일 거래량 / 20일 평균 {ratio * 100:.0f}% (필요 ≥ 150%)"
    if ratio >= 1.5:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_c1(snapshot: Any) -> EvalResult:
    if not snapshot.high_price:
        return eval_data_missing("당일 고가 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_price * 100
    note = f"종가 / 당일 고가 {ratio:.1f}% (필요 ≥ 95%)"
    if snapshot.current_price >= snapshot.high_price * 0.95:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_c2(snapshot: Any, candle_range, upper_wick_ratio) -> EvalResult:
    span = candle_range(snapshot)
    if span <= 0:
        return eval_data_missing("당일 캔들 범위 데이터 부족")
    body = abs(snapshot.current_price - snapshot.open_price)
    upper = upper_wick_ratio(snapshot)
    note = f"몸통 {body / span * 100:.0f}% / 윗꼬리·몸통 {upper:.2f}"
    if body >= span * 0.7 and upper <= 0.3:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_breakout_s2(snapshot: Any) -> EvalResult:
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


def evaluate_breakout_c3(snapshot: Any) -> EvalResult:
    orderbook = snapshot.orderbook or {}
    bid_ask_ratio = float(orderbook.get("bidAskRatio") or 0)
    if bid_ask_ratio <= 0:
        return eval_manual_required("호가잔량 비율 미입력 (토스 호가창 수동 입력)")
    note = f"매수/매도 호가잔량 {bid_ask_ratio:.2f} (필요 ≥ 1.2)"
    if bid_ask_ratio >= 1.2:
        return eval_met(f"{note} · 매수 잔량 우위")
    return eval_not_met(note)


# Legacy momentum aliases
evaluate_momentum_rs = evaluate_breakout_rs
evaluate_momentum_g1 = evaluate_breakout_g1
evaluate_momentum_g2 = evaluate_breakout_g2
evaluate_momentum_g3 = evaluate_breakout_g3
evaluate_momentum_s1 = evaluate_breakout_s1
evaluate_momentum_p1 = evaluate_breakout_p1
evaluate_momentum_p2 = evaluate_breakout_p2
evaluate_momentum_c1 = evaluate_breakout_c1
evaluate_momentum_c2 = evaluate_breakout_c2
evaluate_momentum_s2 = evaluate_breakout_s2
evaluate_momentum_c3 = evaluate_breakout_c3


# --- Accumulation (수급 매집형) ---


def evaluate_accumulation_g0(snapshot: Any) -> EvalResult:
    today_any = snapshot.foreign_net > 0 or snapshot.institution_net > 0
    prev_any = snapshot.foreign_previous > 0 or snapshot.institution_previous > 0
    note = (
        f"외인 전일 {snapshot.foreign_previous:+,.0f}/당일 {snapshot.foreign_net:+,.0f} · "
        f"기관 전일 {snapshot.institution_previous:+,.0f}/당일 {snapshot.institution_net:+,.0f}"
    )
    if today_any and prev_any:
        return eval_met(f"{note} · 2일 연속 수급 유입")
    return eval_not_met(f"{note} · 2일 연속 수급 유입 미충족")


def evaluate_accumulation_g1(snapshot: Any) -> EvalResult:
    return evaluate_pullback_g2(snapshot)


def evaluate_accumulation_g2(snapshot: Any) -> EvalResult:
    if not snapshot.high_52w:
        return eval_data_missing("52주 고가 데이터 부족")
    ratio = snapshot.current_price / snapshot.high_52w * 100
    note = f"52주 고가 대비 {ratio:.1f}% (필요 < 92%)"
    if snapshot.current_price < snapshot.high_52w * 0.92:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_accumulation_g3(snapshot: Any) -> EvalResult:
    return evaluate_breakout_g3(snapshot)


def evaluate_accumulation_g4_volume(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_20d:
        return eval_data_missing("20일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_20d
    note = f"당일 거래량 / 20일 평균 {ratio * 100:.0f}% (필요 < 120%)"
    if ratio < 1.2:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_accumulation_g5(context: dict[str, Any]) -> dict[str, Any]:
    return evaluate_pullback_g5(context)


def evaluate_accumulation_s1(snapshot: Any) -> EvalResult:
    note = f"외인 {snapshot.foreign_net:,.0f}주 / 기관 {snapshot.institution_net:,.0f}주"
    if snapshot.foreign_net > 0 and snapshot.institution_net > 0:
        return eval_met(f"{note} · 외인·기관 양매수")
    return eval_not_met(f"{note} · 양매수 아님")


def evaluate_accumulation_s2(snapshot: Any) -> EvalResult:
    note = (
        f"외인 당일 {snapshot.foreign_net:,.0f} / 전일 {snapshot.foreign_previous:,.0f} · "
        f"기관 당일 {snapshot.institution_net:,.0f} / 전일 {snapshot.institution_previous:,.0f}"
    )
    both_today = snapshot.foreign_net > 0 and snapshot.institution_net > 0
    both_prev_positive = snapshot.foreign_previous >= 0 and snapshot.institution_previous >= 0
    prev_either_buy = snapshot.foreign_previous > 0 or snapshot.institution_previous > 0
    if both_prev_positive:
        return eval_met(f"{note} · 2일 연속 순매수 흐름")
    if both_today and prev_either_buy:
        return eval_met(f"{note} · 당일 양매수 + 전일 수급 유지")
    return eval_not_met(f"{note} · 수급 개선 미확인")


def evaluate_accumulation_p1(snapshot: Any) -> EvalResult:
    if snapshot.ma20 is None:
        return eval_data_missing("20일 이동평균 산출 데이터 부족")
    ratio = snapshot.current_price / snapshot.ma20 * 100
    note = f"종가 / 20MA {ratio:.1f}% (필요 98~102%)"
    if snapshot.ma20 * 0.98 <= snapshot.current_price <= snapshot.ma20 * 1.02:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_accumulation_p2(snapshot: Any) -> EvalResult:
    if snapshot.ma5 is None or snapshot.ma20 is None:
        return eval_data_missing("5/20일 이동평균 산출 데이터 부족")
    note = f"5MA {snapshot.ma5:,.0f} / 20MA {snapshot.ma20:,.0f}"
    if snapshot.ma5 > snapshot.ma20:
        return eval_met(f"{note} · 5MA > 20MA")
    return eval_not_met(f"{note} · 정배열 미충족")


def evaluate_accumulation_c1(snapshot: Any) -> EvalResult:
    if not snapshot.volume_avg_5d:
        return eval_data_missing("5일 평균 거래량 산출 데이터 부족")
    ratio = snapshot.volume / snapshot.volume_avg_5d
    note = f"당일 거래량 / 5일 평균 {ratio * 100:.0f}% (필요 ≤ 90%)"
    if ratio <= 0.9:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_accumulation_c2(snapshot: Any, daily_change_pct: float) -> EvalResult:
    note = f"당일 등락 {signed_pct(daily_change_pct, 2)} (필요 -3% ~ +5%)"
    if -3.0 <= daily_change_pct <= 5.0:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_accumulation_c3(snapshot: Any, context: dict[str, Any]) -> EvalResult:
    return evaluate_pullback_c3(snapshot, context)


# --- Reversal filters & gates ---


def evaluate_reversal_f1(snapshot: Any) -> EvalResult:
    rank = int(getattr(snapshot, "rank", 0) or 0)
    note = f"당일 거래대금 순위 {rank}위 (필요 ≤ 100위)"
    if 0 < rank <= 100:
        return eval_met(note)
    return eval_not_met(note)


def evaluate_reversal_f2(snapshot: Any) -> EvalResult:
    note = f"시총 {snapshot.market_cap_trillion:.1f}조 (필요 ≥ 8조)"
    if snapshot.market_cap_trillion >= 8.0:
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
    note = f"1개월 수익률 {signed_pct(snapshot.return_21d)} (필요 ≥ +20%)"
    if snapshot.return_21d >= 20.0:
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
    note = f"최근 5거래일 최저 {signed_pct(worst)} (필요 -4% 이하 급락 1회 이상)"
    if any(value <= -4.0 for value in daily_returns):
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
    ratio = snapshot.current_price / snapshot.ma20 * 100 if snapshot.ma20 else 0.0
    note = f"종가 {snapshot.current_price:,.0f} / 20MA {snapshot.ma20:,.0f} ({ratio:.1f}% · 필요 ≥ 98%)"
    if snapshot.current_price >= snapshot.ma20 * 0.98:
        return eval_met(f"{note} · 20MA 근접 회복")
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
        return eval_met(f"{note} · 투매 클라이맥스")
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
        return eval_met(f"{note} · 하방 흡수 확인")
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
