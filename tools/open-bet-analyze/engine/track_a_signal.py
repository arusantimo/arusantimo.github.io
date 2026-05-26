from __future__ import annotations

from typing import Any


def score_track_a(
    candidate: dict[str, Any],
    *,
    flows: dict[str, Any] | None = None,
    ah_change: float | None = None,
    has_positive_news: bool = False,
    vkospi: float | None = None,
) -> dict[str, Any]:
    gates = candidate.get("gates") or {}
    g1 = str((gates.get("G1") or {}).get("status", "")).lower() == "passed"
    g2 = str((gates.get("G2") or {}).get("status", "")).lower() == "passed"
    g3 = str((gates.get("G3") or {}).get("status", "")).lower() == "passed"

    code = str(candidate.get("code") or "")
    flow = (flows or {}).get(code) or {}
    foreign = flow.get("foreignNet")
    inst = flow.get("instNet")
    g4 = False
    if foreign is not None and float(foreign) >= 5e8:
        g4 = True
    if inst is not None and float(inst) >= 5e8:
        g4 = True

    g5 = False
    if ah_change is not None:
        if ah_change >= 1.0:
            g5 = True
        elif -0.5 <= ah_change < 1.0 and has_positive_news:
            g5 = True
    if has_positive_news:
        g5 = True

    if not (g1 and g2 and g3 and g4 and g5):
        return {
            "score": 0.0,
            "eligible": False,
            "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5},
        }

    score = 0.0
    if ah_change is not None and ah_change >= 2.0:
        score += 1.5
    if has_positive_news:
        score += 1.5
    score += 2.0  # momentum placeholder
    score += 2.0  # candle placeholder
    score += 1.0  # flow placeholder

    if vkospi is not None:
        if float(vkospi) > 30:
            return {"score": 0.0, "eligible": False, "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5}}
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
        "gates": {"G1": g1, "G2": g2, "G3": g3, "G4": g4, "G5": g5},
        "gapBand": gap_band,
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
