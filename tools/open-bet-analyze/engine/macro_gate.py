from __future__ import annotations

from typing import Any


def evaluate_macro_gate(
    eod: dict[str, Any] | None,
    macro: dict[str, Any] | None,
    night_future: dict[str, Any] | None,
) -> dict[str, Any]:
    eod = eod or {}
    macro = macro or {}
    night = night_future or {}

    regime_label = str(eod.get("regime") or "")
    open_active = bool(eod.get("openBetActive"))
    inactive_regime = any(token in regime_label for token in ("약세", "박스", "⛔"))
    if inactive_regime:
        open_active = False

    gap_grade = str((macro.get("grade") or "")).upper()
    vix = macro.get("vix")
    nq = macro.get("nq")
    night_change = night.get("changePct")

    macro_halt = False
    reasons: list[str] = []

    if gap_grade == "G-E":
        macro_halt = True
        reasons.append("gap_grade_GE")
    if night_change is not None and float(night_change) <= -1.0:
        macro_halt = True
        reasons.append("night_future_down_1pct")
    if vix is not None and float(vix) > 30:
        open_active = False
        reasons.append("vkospi_vix_high")
    if nq is not None and vix is not None and float(vix) > 30 and float(nq) <= -1.5:
        reasons.append("vix_nq_stress")

    weight_scale = 1.0
    if "vix_nq_stress" in reasons:
        weight_scale = 0.5

    return {
        "openBetActive": open_active and not macro_halt,
        "macroHalt": macro_halt,
        "regimeLabel": regime_label,
        "gapGrade": gap_grade,
        "reasons": reasons,
        "weightScale": weight_scale,
    }
