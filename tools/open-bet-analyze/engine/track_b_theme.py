from __future__ import annotations

from typing import Any


def score_track_b_for_code(
    code: str,
    themes: list[dict[str, Any]],
    *,
    macro: dict[str, Any] | None = None,
) -> dict[str, Any]:
    macro = macro or {}
    best = 0.0
    theme_id = None
    for theme in themes:
        stocks = [str(s) for s in (theme.get("stocks") or [])]
        if code not in stocks:
            continue
        novelty = float(theme.get("novelty") or 0)
        base = novelty * 2.0
        if theme.get("isNewTheme"):
            base += 1.0
        sox = macro.get("sox")
        if sox is not None and float(sox) > 0 and "반도체" in str(theme.get("label") or ""):
            base += 0.5
        if base > best:
            best = base
            theme_id = theme.get("id")
    return {
        "score": round(min(best, 10.0), 2),
        "eligible": best >= 3.0,
        "themeId": theme_id,
    }
