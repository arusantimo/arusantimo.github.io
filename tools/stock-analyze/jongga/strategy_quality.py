"""전략별 품질 게이트 — 백테스트로 검증된 승률·기대수익 개선 필터.

각 게이트는 ``stockIndicators.snapshot`` 피처만 사용한다. 덕분에 라이브 엔진과
리플레이(저장된 분석 JSON 재평가)가 **완전히 동일한 로직**을 공유한다.

게이트 미충족 시 ``⛔``(차단)로 추천에서 제외해, 전략 본래 의도와 어긋나는
'과열·추격·낙하 칼날' 후보를 거른다. 데이터가 없으면 ``data_missing``으로
보수적으로 통과시킨다(불확실할 땐 차단하지 않음).

임계값 근거 (2026-05-22 ~ 2026-06-12 리플레이 후보 135건, holdout 양분 검증):

| 전략        | 전체 평균수익 | 게이트 통과(SEL)        | 게이트 차단(REJ)        |
|-------------|---------------|-------------------------|-------------------------|
| pullback    | -0.83%        | +0.91% (승 71%, n=14)   | -1.80% (승 44%, n=25)   |
| accumulation| -1.69%        | +0.62% (승 50%, n=12)   | -2.71% (승 26%, n=27)   |
| reversal    | +0.36%        | +1.88% (승 83%, n=18)   | -0.95% (승 57%, n=21)   |

세 전략 모두 전·후반 기간 각각에서 SEL 평균수익이 양수로 유지됐다.
"""

from __future__ import annotations

from typing import Any, Optional

# --- 눌림목(pullback): 진짜 눌림 + 반등 거래량 + 수급 이탈 아님 ---
# "상승추세가 지지선까지 눌렸다 반등"이 본래 의도. 고가권 얕은 조정(추격)을 거른다.
PULLBACK_MIN_DROP_FROM_52W_PCT = 12.0   # 52주 고가 대비 ≥12% 하락 = 의미 있는 눌림
PULLBACK_MIN_VOLUME_RATIO_PCT = 80.0    # 당일 거래량 ≥ 20일 평균의 80% = 반등 관심
PULLBACK_MIN_SUPPLY_TREND = 0.0         # 수급 추세 비음수 = 외인·기관 이탈 중이 아님

# --- 수급 매집(accumulation): 외인 지분 기반 + 20일 상대강도 비음수 ---
# "기관·외인이 매집 중"이 본래 의도. 지분 기반 없이 떨어지는 종목(낙하 칼날)을 거른다.
ACCUMULATION_MIN_FOREIGN_RATE_PCT = 25.0  # 외인 보유율 ≥25% = 매집 주체 존재
ACCUMULATION_MIN_RS20_PCT = 0.0           # 20일 수익률 ≥0 = 매집이 실제로 가격을 지탱

# --- 급락 반등(reversal): 과이격·과매수 반등 차단 ---
# "급락 후 단기 반등"이 본래 의도. 이미 20MA 위로 멀리 튄(소진된) 반등을 거른다.
REVERSAL_MAX_MA20_GAP_PCT = 22.0   # 20MA 이격 ≤+22% = 아직 과이격 아님
REVERSAL_MAX_RSI14 = 72.0          # 일봉 RSI14 ≤72 = 과매수 반등 아님


class QualityVerdict:
    """품질 게이트 평가 결과. ``status``는 ``met`` / ``not_met`` / ``data_missing``."""

    __slots__ = ("status", "note")

    def __init__(self, status: str, note: str) -> None:
        self.status = status
        self.note = note

    @property
    def passed(self) -> bool:
        return self.status != "not_met"

    @property
    def blocked(self) -> bool:
        return self.status == "not_met"


def _num(value: Any) -> Optional[float]:
    if value is None:
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if number != number or number in (float("inf"), float("-inf")):
        return None
    return number


def evaluate_pullback_quality(
    *,
    drop_from_52w_high_pct: Any,
    volume_ratio_20d_pct: Any,
    supply_trend_score: Any,
) -> QualityVerdict:
    drop = _num(drop_from_52w_high_pct)
    vol = _num(volume_ratio_20d_pct)
    supply = _num(supply_trend_score)
    if drop is None or vol is None or supply is None:
        return QualityVerdict("data_missing", "눌림목 품질 피처 부족 (낙폭·거래량·수급)")
    note = (
        f"52주 고가 대비 -{drop:.1f}% (≥{PULLBACK_MIN_DROP_FROM_52W_PCT:.0f}%) · "
        f"거래량 {vol:.0f}% (≥{PULLBACK_MIN_VOLUME_RATIO_PCT:.0f}%) · "
        f"수급추세 {supply:+.0f} (≥{PULLBACK_MIN_SUPPLY_TREND:.0f})"
    )
    if (
        drop >= PULLBACK_MIN_DROP_FROM_52W_PCT
        and vol >= PULLBACK_MIN_VOLUME_RATIO_PCT
        and supply >= PULLBACK_MIN_SUPPLY_TREND
    ):
        return QualityVerdict("met", f"{note} · 진짜 눌림+반등 거래량+수급 유지")
    reasons = []
    if drop < PULLBACK_MIN_DROP_FROM_52W_PCT:
        reasons.append("얕은 조정(고가권 추격)")
    if vol < PULLBACK_MIN_VOLUME_RATIO_PCT:
        reasons.append("반등 거래량 부족")
    if supply < PULLBACK_MIN_SUPPLY_TREND:
        reasons.append("수급 이탈")
    return QualityVerdict("not_met", f"{note} · {', '.join(reasons)}")


def evaluate_accumulation_quality(
    *,
    foreign_rate_pct: Any,
    rs20_pct: Any,
) -> QualityVerdict:
    foreign = _num(foreign_rate_pct)
    rs20 = _num(rs20_pct)
    if foreign is None or rs20 is None:
        return QualityVerdict("data_missing", "매집 품질 피처 부족 (외인지분·상대강도)")
    note = (
        f"외인 보유율 {foreign:.1f}% (≥{ACCUMULATION_MIN_FOREIGN_RATE_PCT:.0f}%) · "
        f"20일 수익률 {rs20:+.1f}% (≥{ACCUMULATION_MIN_RS20_PCT:.0f}%)"
    )
    if foreign >= ACCUMULATION_MIN_FOREIGN_RATE_PCT and rs20 >= ACCUMULATION_MIN_RS20_PCT:
        return QualityVerdict("met", f"{note} · 매집 주체 존재+가격 지탱")
    reasons = []
    if foreign < ACCUMULATION_MIN_FOREIGN_RATE_PCT:
        reasons.append("외인 매집 주체 약함")
    if rs20 < ACCUMULATION_MIN_RS20_PCT:
        reasons.append("20일 약세(낙하 칼날)")
    return QualityVerdict("not_met", f"{note} · {', '.join(reasons)}")


def evaluate_reversal_quality(
    *,
    ma20_gap_pct: Any,
    rsi14: Any,
) -> QualityVerdict:
    gap = _num(ma20_gap_pct)
    rsi = _num(rsi14)
    if gap is None or rsi is None:
        return QualityVerdict("data_missing", "반등 품질 피처 부족 (20MA 이격·RSI)")
    note = (
        f"20MA 이격 {gap:+.1f}% (≤+{REVERSAL_MAX_MA20_GAP_PCT:.0f}%) · "
        f"RSI14 {rsi:.0f} (≤{REVERSAL_MAX_RSI14:.0f})"
    )
    if gap <= REVERSAL_MAX_MA20_GAP_PCT and rsi <= REVERSAL_MAX_RSI14:
        return QualityVerdict("met", f"{note} · 과이격·과매수 반등 아님")
    reasons = []
    if gap > REVERSAL_MAX_MA20_GAP_PCT:
        reasons.append("20MA 과이격(반등 소진)")
    if rsi > REVERSAL_MAX_RSI14:
        reasons.append("RSI 과매수")
    return QualityVerdict("not_met", f"{note} · {', '.join(reasons)}")


def evaluate_quality_from_indicators(strategy: str, indicators: dict[str, Any] | None) -> QualityVerdict | None:
    """저장된 ``stockIndicators.snapshot`` dict로 품질 게이트를 평가(리플레이용).

    해당 전략에 품질 게이트가 없으면 ``None``을 반환한다.
    """
    snap = indicators or {}
    key = "breakout" if strategy == "momentum" else strategy
    if key == "pullback":
        return evaluate_pullback_quality(
            drop_from_52w_high_pct=snap.get("dropFrom52wHighPct"),
            volume_ratio_20d_pct=snap.get("volumeRatio20d"),
            supply_trend_score=snap.get("supplyTrendScore"),
        )
    if key == "accumulation":
        return evaluate_accumulation_quality(
            foreign_rate_pct=snap.get("foreignRate"),
            rs20_pct=snap.get("rs20Pct"),
        )
    if key == "reversal":
        return evaluate_reversal_quality(
            ma20_gap_pct=snap.get("ma20GapPct"),
            rsi14=snap.get("rsi14"),
        )
    return None
