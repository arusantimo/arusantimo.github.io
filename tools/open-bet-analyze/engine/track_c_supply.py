from __future__ import annotations

from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent.parent


def _weights() -> dict[str, float]:
    path = ROOT_DIR / "config" / "scoring_weights.yaml"
    defaults = {
        "ahChangeMin": 4.0,
        "ahChangeMax": 7.0,
        "volumeSurgeRatio": 0.05,
        "idealOpenGapMax": 2.5,
        "overheatOpenGap": 4.0,
    }
    if not path.exists():
        return defaults
    for line in path.read_text(encoding="utf-8").splitlines():
        if ":" not in line:
            continue
        key, _, raw = line.partition(":")
        key = key.strip()
        if key in defaults:
            try:
                defaults[key] = float(raw.strip())
            except ValueError:
                pass
    return defaults


def score_track_c(
    row: dict[str, Any],
    *,
    theme_keywords: set[str] | None = None,
    macro: dict[str, Any] | None = None,
) -> dict[str, Any]:
    w = _weights()
    ah = row.get("ahChangePct")
    score = 0.0
    breakdown: dict[str, float] = {}
    held_reason = None

    if ah is None:
        return {"score": 0.0, "eligible": False, "heldReason": "missing_ah_change", "breakdown": {}}

    ah_f = float(ah)
    if w["ahChangeMin"] <= ah_f <= w["ahChangeMax"]:
        breakdown["S1"] = 2.0
        score += 2.0
    elif ah_f > w["ahChangeMax"]:
        breakdown["S1"] = 1.0
        score += 1.0
        held_reason = held_reason or "ah_change_above_max"
    else:
        return {"score": 0.0, "eligible": False, "heldReason": "ah_change_below_min", "breakdown": {}}

    if row.get("ahVolume"):
        breakdown["S2"] = 2.0
        score += 2.0
    else:
        breakdown["S2"] = 1.0
        score += 1.0

    if row.get("strongOpen"):
        breakdown["S3"] = 2.0
        score += 2.0
    else:
        breakdown["S3"] = 0.0
        held_reason = held_reason or "weak_open"

    gap = row.get("expectedOpenGapPct")
    if gap is not None and float(gap) > w["overheatOpenGap"]:
        held_reason = "gap_overheat"

    if theme_keywords:
        breakdown["S5"] = 1.5
        score += 1.5

    macro = macro or {}
    sox = macro.get("sox")
    if sox is not None and float(sox) > 0:
        breakdown["S6"] = 1.0
        score += 1.0

    eligible = held_reason is None or held_reason in {"weak_open"}
    return {
        "score": round(score, 2),
        "eligible": eligible,
        "heldReason": held_reason,
        "breakdown": breakdown,
        "ahChangePct": ah_f,
        "strongOpen": bool(row.get("strongOpen")),
    }


def filter_track_c_candidates(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    w = _weights()
    filtered: list[dict[str, Any]] = []
    for row in rows:
        ah = row.get("ahChangePct")
        if ah is None:
            continue
        ah_f = float(ah)
        if ah_f < w["ahChangeMin"]:
            continue
        if ah_f > w["ahChangeMax"] + 1.0:
            continue
        filtered.append(row)
    return filtered
