from __future__ import annotations

import math
from datetime import datetime
from typing import Any

from jongga.generate_latest import StockSnapshot, compute_rsi
from jongga.output_contract import KST


def normalize_strategy_key(strategy: str | None) -> str:
    text = str(strategy or "").strip().lower()
    return "breakout" if text == "momentum" else text


def _finite(value: float | None) -> float | None:
    if value is None:
        return None
    number = float(value)
    return number if math.isfinite(number) else None


def _support_distance_pct(entry: dict[str, Any]) -> float | None:
    support = (entry.get("pullbackContext") or {}).get("support") or {}
    primary = support.get("primaryLine") or {}
    distance = primary.get("distancePct")
    if distance is not None:
        return abs(_finite(float(distance)))
    support_price = _finite(primary.get("price"))
    current_price = _finite(entry.get("currentPrice") or entry.get("entryPrice"))
    if support_price and support_price > 0 and current_price and current_price > 0:
        return abs(((current_price - support_price) / support_price) * 100)
    return None


def _supply_trend_score(snapshot: StockSnapshot) -> int:
    score = 0
    for foreign, organ in (
        (snapshot.foreign_net, snapshot.institution_net),
        (snapshot.foreign_previous, snapshot.institution_previous),
    ):
        if foreign > 0:
            score += 1
        elif foreign < 0:
            score -= 1
        if organ > 0:
            score += 1
        elif organ < 0:
            score -= 1
    return score


def build_stock_indicator_snapshot(
    snapshot: StockSnapshot,
    strategy: str,
    entry: dict[str, Any] | None = None,
) -> dict[str, float]:
    entry = entry or {}
    price = _finite(snapshot.current_price)
    if not price or price <= 0:
        return {}

    ma20 = _finite(snapshot.ma20)
    ma20_gap_pct = ((price - ma20) / ma20) * 100 if ma20 and ma20 > 0 else None

    high_52w = _finite(snapshot.high_52w)
    low_52w = _finite(snapshot.low_52w)
    vs52w_high_pct = (price / high_52w) * 100 if high_52w and high_52w > 0 else None
    vs52w_low_pct = ((price - low_52w) / low_52w) * 100 if low_52w and low_52w > 0 else None
    drop_from_52w_high_pct = ((high_52w - price) / high_52w) * 100 if high_52w and high_52w > 0 else None

    volume_avg_20d = _finite(snapshot.volume_avg_20d)
    volume = _finite(snapshot.volume)
    volume_ratio_20d = (volume / volume_avg_20d) * 100 if volume_avg_20d and volume_avg_20d > 0 and volume is not None else None

    closes_asc = list(reversed(snapshot.close_history or []))
    rsi14 = compute_rsi(closes_asc, 14)

    raw: dict[str, float | None] = {
        "currentPrice": price,
        "vs52wHighPct": vs52w_high_pct,
        "vs52wLowPct": vs52w_low_pct,
        "dropFrom52wHighPct": drop_from_52w_high_pct,
        "ma20GapPct": ma20_gap_pct,
        "rsi14": _finite(rsi14),
        "volumeRatio20d": volume_ratio_20d,
        "rs20Pct": _finite(snapshot.return_20d),
        "supportDistancePct": _support_distance_pct(entry),
        "tradingValueRank": _finite(snapshot.rank),
        "marketCapRank": _finite(snapshot.market_cap_rank),
        "marketCapTrillion": _finite(snapshot.market_cap_trillion),
        "per": _finite(snapshot.per),
        "pbr": _finite(snapshot.pbr),
        "cnsPer": _finite(snapshot.cns_per),
        "foreignRate": _finite(snapshot.foreign_rate),
        "supplyTrendScore": float(_supply_trend_score(snapshot)),
        "shortBalanceChangePct": _finite(snapshot.short_balance_change_pct),
    }

    return {
        key: value
        for key, value in raw.items()
        if value is not None and math.isfinite(float(value))
    }


def attach_stock_indicators_to_entry(entry: dict[str, Any], snapshot: StockSnapshot) -> dict[str, Any]:
    strategy = normalize_strategy_key(entry.get("strategy"))
    entry["stockIndicators"] = {
        "snapshot": build_stock_indicator_snapshot(snapshot, strategy, entry),
        "evaluatedAt": datetime.now(KST).isoformat(timespec="seconds"),
        "source": "jongga_analysis",
    }
    return entry
