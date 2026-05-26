from __future__ import annotations

from typing import Any

from router.quality import MetricEnvelope


def enrich_premarket_open(
    overtime_rows: list[dict[str, Any]],
    *,
    expected_open_by_code: dict[str, float] | None = None,
) -> MetricEnvelope:
    """Attach strong_open / expected_open_gap to overtime rows."""
    expected_open_by_code = expected_open_by_code or {}
    enriched: list[dict[str, Any]] = []
    for row in overtime_rows:
        code = str(row.get("code") or "")
        ah_price = row.get("ahPrice")
        expected_open = row.get("expectedOpen") or expected_open_by_code.get(code)
        if expected_open is None and ah_price is not None:
            expected_open = float(ah_price)
        strong_open = False
        gap_pct = None
        if ah_price not in (None, 0) and expected_open is not None:
            ah = float(ah_price)
            strong_open = float(expected_open) > ah
            gap_pct = round((float(expected_open) - ah) / ah * 100, 3)
        enriched.append(
            {
                **row,
                "expectedOpen": expected_open,
                "strongOpen": strong_open,
                "expectedOpenGapPct": gap_pct,
            }
        )
    return MetricEnvelope(
        metric="expected_open",
        value={"rows": enriched},
        source="premarket_enricher",
        confidence=0.6 if expected_open_by_code else 0.45,
    )
