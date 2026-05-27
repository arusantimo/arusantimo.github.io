from __future__ import annotations

from typing import Any


def score_track_a(
    candidate: dict[str, Any],
    *,
    flows: dict[str, Any] | None = None,
    ah_change: float | None = None,
    has_positive_news: bool = False,
    vkospi: float | None = None,
    prev_volume: float | None = None,
    ah_volume: float | None = None,
) -> dict[str, Any]:
    gates = candidate.get("gates") or {}
    def _is_passed(g_val):
        if isinstance(g_val, bool):
            return g_val
        if isinstance(g_val, dict):
            return str(g_val.get("status", "")).lower() == "passed"
        return False

    g1 = _is_passed(gates.get("G1"))
    g2 = _is_passed(gates.get("G2"))
    g3 = _is_passed(gates.get("G3"))

    code = str(candidate.get("code") or "")
    flow = (flows or {}).get(code) or {}
    foreign = flow.get("foreignNet")
    inst = flow.get("instNet")
    
    # G4: 외인/기관 순매수 5억 이상
    g4 = False
    if foreign is not None and float(foreign) >= 5e8:
        g4 = True
    if inst is not None and float(inst) >= 5e8:
        g4 = True

    # G5: 시간외 상승 및 호재
    g5 = False
    if ah_change is not None:
        if ah_change >= 1.0:
            g5 = True
        elif -0.5 <= ah_change < 1.0 and has_positive_news:
            g5 = True
    if has_positive_news:
        g5 = True

    # G6: 예상 체결 거래량(시간외 거래량)이 전일 거래량의 10% 이상인지 실측
    g6 = False
    vol_ratio = 0.0
    if prev_volume and ah_volume:
        vol_ratio = float(ah_volume) / float(prev_volume)
        if vol_ratio >= 0.10:
            g6 = True
    else:
        # 데이터가 수집되지 않은 경우 유연하게 통과하되 UI에 알림
        g6 = True

    if not (g1 and g2 and g3 and g4 and g5 and g6):
        return {
            "score": 0.0,
            "eligible": False,
            "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5, "G6": g6},
            "volRatio": round(vol_ratio * 100, 2) if prev_volume else 0.0,
        }

    score = 0.0
    # 갭상승 크기 (최대 2.0)
    if ah_change is not None:
        score += min(max(ah_change * 0.5, 0.0), 2.0)
    # 호재 뉴스 (최대 1.5)
    if has_positive_news:
        score += 1.5
    # 거래량 비율 가점 (최대 2.5)
    if vol_ratio > 0:
        score += min(vol_ratio * 10.0, 2.5) # 10% 이면 1.0점, 25% 이상이면 2.5점
    # 외인/기관 수급 가점 (최대 2.0)
    flow_score = 0.0
    if foreign is not None and foreign >= 5e8:
        flow_score += min(foreign / 10e8, 1.0)
    if inst is not None and inst >= 5e8:
        flow_score += min(inst / 10e8, 1.0)
    score += min(flow_score, 2.0)
    # 기본 모멘텀 보너스 (2.0)
    score += 2.0

    if vkospi is not None:
        if float(vkospi) > 30:
            return {
                "score": 0.0,
                "eligible": False,
                "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5, "G6": g6},
                "volRatio": round(vol_ratio * 100, 2) if prev_volume else 0.0,
            }
        if float(vkospi) > 20:
            score *= 0.9

    gap_band = "ideal"
    if ah_change is not None:
        if ah_change > 4:
            gap_band = "hold"
        elif ah_change > 3:
            gap_band = "borderline"

    return {
        "score": round(min(score, 10.0), 2),
        "eligible": gap_band != "hold",
        "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5, "G6": g6},
        "gapBand": gap_band,
        "volRatio": round(vol_ratio * 100, 2) if prev_volume else 0.0,
    }


def gap_entry_weight(score: float, gap_band: str) -> float:
    if gap_band == "hold":
        return 0.0
    if gap_band == "borderline" and score < 8.0:
        return 0.0
    if score >= 9.0:
        return 1.0
    if score >= 7.5:
        return 0.8 if gap_band == "borderline" else 0.8
    return 0.0
