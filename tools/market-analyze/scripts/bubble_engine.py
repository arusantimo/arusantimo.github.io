from __future__ import annotations

from typing import Any, Dict

from .regime_policy import decorate_bubble_overlay


def calculate_bubble_values(data: Dict[str, Any]) -> Dict[str, Any]:
    return decorate_bubble_overlay(data)
