"""레짐별 전략 슬롯 수·표시명."""

from __future__ import annotations

STRATEGY_DISPLAY_NAMES: dict[str, str] = {
    "breakout": "주도주돌파형",
    "accumulation": "수급매집형",
    "pullback": "눌림목",
    "reversal": "급락반등",
    "none": "없음",
    "momentum": "주도주돌파형",
}

REGIME_SLOT_LIMITS: dict[str, dict[str, int]] = {
    "강세장": {"breakout": 3, "accumulation": 3, "pullback": 3},
    "순환매장": {"breakout": 2, "accumulation": 3, "pullback": 2},
    "박스권": {"breakout": 1, "accumulation": 3, "pullback": 3},
    "약세장": {"breakout": 0, "accumulation": 0, "pullback": 0},
}


def strategy_display_name(strategy: str) -> str:
    return STRATEGY_DISPLAY_NAMES.get(str(strategy or "").strip(), str(strategy or "-"))


def slot_limits_for_regime(regime_label: str) -> dict[str, int]:
    label = str(regime_label or "")
    for prefix, limits in REGIME_SLOT_LIMITS.items():
        if label.startswith(prefix):
            return dict(limits)
    return dict(REGIME_SLOT_LIMITS["박스권"])
