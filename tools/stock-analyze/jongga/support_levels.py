from __future__ import annotations

from typing import Any

SUPPORT_LOOKBACK_DAYS = 60
SUPPORT_EVENT_LOOKBACK_DAYS = 20
SUPPORT_CLUSTER_TOLERANCE = 0.015
SUPPORT_VOLUME_BINS = 24
SUPPORT_FAMILY_WEIGHTS = {
    "horizontal": 30,
    "swingCluster": 25,
    "volumeShelf": 25,
    "eventAnchors": 20,
}
SUPPORT_CONSENSUS_BONUS = 10
SUPPORT_STRONG_THRESHOLD = 70
SUPPORT_WATCH_THRESHOLD = 45

SUPPORT_FAMILY_LABELS = {
    "horizontal": "수평 지지",
    "swingCluster": "스윙로우 군집",
    "volumeShelf": "매물대 지지",
    "eventAnchors": "급증봉 저점",
}


def _safe_number(value: Any) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return 0.0
    return number if number == number else 0.0


def _distance_pct(current_price: float, price: float) -> float | None:
    if current_price <= 0 or price <= 0:
        return None
    return round(((current_price - price) / current_price) * 100, 2)


def _normalize_price(price: float) -> int:
    return round(price)


def _days_ago_from_index(total: int, index: int) -> int:
    return max(total - index - 1, 0)


def _price_matches(base_price: float, candidate_price: float, tolerance: float = SUPPORT_CLUSTER_TOLERANCE) -> bool:
    anchor = max(abs(base_price), abs(candidate_price), 1.0)
    return abs(base_price - candidate_price) / anchor <= tolerance


def _cluster_price_points(points: list[dict[str, Any]], *, min_count: int = 1) -> list[dict[str, Any]]:
    if not points:
        return []
    sorted_points = sorted(points, key=lambda item: item["price"])
    clusters: list[list[dict[str, Any]]] = []
    for point in sorted_points:
        if not clusters:
            clusters.append([point])
            continue
        current_cluster = clusters[-1]
        cluster_price = sum(item["price"] for item in current_cluster) / len(current_cluster)
        if _price_matches(cluster_price, point["price"]):
            current_cluster.append(point)
        else:
            clusters.append([point])

    normalized: list[dict[str, Any]] = []
    for cluster in clusters:
        bar_indexes = {int(item.get("barIndex", -1)) for item in cluster if item.get("barIndex") is not None}
        unique_count = len([index for index in bar_indexes if index >= 0])
        effective_count = unique_count or len(cluster)
        if effective_count < min_count:
            continue
        avg_price = sum(item["price"] for item in cluster) / len(cluster)
        normalized.append({
            "price": avg_price,
            "count": effective_count,
            "lastSeenDaysAgo": min(int(item.get("daysAgo", 999)) for item in cluster),
            "barIndexes": sorted(index for index in bar_indexes if index >= 0),
            "members": cluster,
        })
    return normalized


def _build_line(
    family: str,
    cluster: dict[str, Any],
    current_price: float,
    *,
    valid: bool | None = None,
    extra: dict[str, Any] | None = None,
) -> dict[str, Any]:
    price = float(cluster.get("price") or 0.0)
    distance_pct = _distance_pct(current_price, price)
    line_valid = price > 0 and current_price > 0 and price <= current_price * (1 + SUPPORT_CLUSTER_TOLERANCE) if valid is None else bool(valid)
    payload = {
        "family": family,
        "familyLabel": SUPPORT_FAMILY_LABELS[family],
        "label": SUPPORT_FAMILY_LABELS[family],
        "price": _normalize_price(price),
        "distancePct": distance_pct,
        "count": int(cluster.get("count") or 0),
        "lastSeenDaysAgo": int(cluster.get("lastSeenDaysAgo") or 0),
        "valid": line_valid,
        "weight": SUPPORT_FAMILY_WEIGHTS[family],
    }
    if extra:
        payload.update(extra)
    return payload


def _build_snapshot_bars(snapshot: Any) -> list[dict[str, float]]:
    closes = list(getattr(snapshot, "close_history", []) or [])[:SUPPORT_LOOKBACK_DAYS]
    highs = list(getattr(snapshot, "high_history", []) or [])[:SUPPORT_LOOKBACK_DAYS]
    lows = list(getattr(snapshot, "low_history", []) or [])[:SUPPORT_LOOKBACK_DAYS]
    volumes = list(getattr(snapshot, "volume_history", []) or [])[:SUPPORT_LOOKBACK_DAYS]
    length = min(len(closes), len(highs), len(lows), len(volumes))
    if length <= 0:
        return []
    bars: list[dict[str, float]] = []
    for offset in range(length - 1, -1, -1):
        bar_index = length - offset - 1
        bars.append({
            "index": bar_index,
            "open": _safe_number(closes[offset]),
            "high": _safe_number(highs[offset]),
            "low": _safe_number(lows[offset]),
            "close": _safe_number(closes[offset]),
            "volume": _safe_number(volumes[offset]),
        })
    return bars


def _build_horizontal_family(bars: list[dict[str, Any]], current_price: float) -> list[dict[str, Any]]:
    points: list[dict[str, Any]] = []
    total = len(bars)
    for index, bar in enumerate(bars):
        for kind in ("low", "close"):
            price = _safe_number(bar.get(kind))
            if price <= 0:
                continue
            points.append({
                "price": price,
                "barIndex": index,
                "daysAgo": _days_ago_from_index(total, index),
                "kind": kind,
            })
    clusters = _cluster_price_points(points, min_count=2)
    return [
        _build_line(
            "horizontal",
            cluster,
            current_price,
            extra={
                "sources": sorted({item.get("kind") for item in cluster["members"] if item.get("kind")}),
                "bandLow": _normalize_price(min(item["price"] for item in cluster["members"])),
                "bandHigh": _normalize_price(max(item["price"] for item in cluster["members"])),
            },
        )
        for cluster in clusters
    ]


def _build_swing_family(bars: list[dict[str, Any]], current_price: float) -> list[dict[str, Any]]:
    total = len(bars)
    pivots: list[dict[str, Any]] = []
    for index in range(2, total - 2):
        pivot_low = _safe_number(bars[index].get("low"))
        if pivot_low <= 0:
            continue
        left_lows = [_safe_number(bars[index - step].get("low")) for step in (1, 2)]
        right_lows = [_safe_number(bars[index + step].get("low")) for step in (1, 2)]
        if all(pivot_low <= value for value in left_lows + right_lows):
            pivots.append({
                "price": pivot_low,
                "barIndex": index,
                "daysAgo": _days_ago_from_index(total, index),
            })
    clusters = _cluster_price_points(pivots, min_count=2)
    return [
        _build_line(
            "swingCluster",
            cluster,
            current_price,
            extra={
                "pivotCount": cluster["count"],
                "bandLow": _normalize_price(min(item["price"] for item in cluster["members"])),
                "bandHigh": _normalize_price(max(item["price"] for item in cluster["members"])),
            },
        )
        for cluster in clusters
    ]


def _build_volume_shelf_family(bars: list[dict[str, Any]], current_price: float) -> list[dict[str, Any]]:
    if not bars:
        return []
    low_price = min(_safe_number(bar.get("low")) for bar in bars)
    high_price = max(_safe_number(bar.get("high")) for bar in bars)
    if low_price <= 0 or high_price <= 0:
        return []
    if high_price == low_price:
        span = max(high_price * SUPPORT_CLUSTER_TOLERANCE, 1.0)
        high_price = low_price + span
    bin_size = (high_price - low_price) / SUPPORT_VOLUME_BINS
    if bin_size <= 0:
        return []
    bins = [
        {"volume": 0.0, "count": 0, "lastSeenDaysAgo": SUPPORT_LOOKBACK_DAYS, "binIndex": index}
        for index in range(SUPPORT_VOLUME_BINS)
    ]
    total = len(bars)
    for index, bar in enumerate(bars):
        hlc3 = (_safe_number(bar.get("high")) + _safe_number(bar.get("low")) + _safe_number(bar.get("close"))) / 3
        if hlc3 <= 0:
            continue
        bin_index = min(SUPPORT_VOLUME_BINS - 1, max(0, int((hlc3 - low_price) / bin_size)))
        bins[bin_index]["volume"] += _safe_number(bar.get("volume"))
        bins[bin_index]["count"] += 1
        bins[bin_index]["lastSeenDaysAgo"] = min(bins[bin_index]["lastSeenDaysAgo"], _days_ago_from_index(total, index))
    shelf_candidates = []
    for item in bins:
        if item["volume"] <= 0 or item["count"] <= 0:
            continue
        price = low_price + (item["binIndex"] + 0.5) * bin_size
        valid = price <= current_price * (1 + SUPPORT_CLUSTER_TOLERANCE)
        shelf_candidates.append(
            _build_line(
                "volumeShelf",
                {
                    "price": price,
                    "count": item["count"],
                    "lastSeenDaysAgo": item["lastSeenDaysAgo"],
                },
                current_price,
                valid=valid,
                extra={
                    "volume": round(item["volume"]),
                    "binIndex": item["binIndex"],
                    "binLow": _normalize_price(low_price + item["binIndex"] * bin_size),
                    "binHigh": _normalize_price(low_price + (item["binIndex"] + 1) * bin_size),
                },
            )
        )
    shelf_candidates.sort(key=lambda item: (-float(item.get("volume") or 0), abs(float(item.get("distancePct") or 999)), item["lastSeenDaysAgo"]))
    return shelf_candidates[:3]


def _event_volume_ratio(bars: list[dict[str, Any]], index: int) -> float:
    if index <= 0:
        return 0.0
    start = max(0, index - 20)
    lookback = [_safe_number(bar.get("volume")) for bar in bars[start:index] if _safe_number(bar.get("volume")) > 0]
    if not lookback:
        return 0.0
    average_volume = sum(lookback) / len(lookback)
    if average_volume <= 0:
        return 0.0
    return _safe_number(bars[index].get("volume")) / average_volume


def _build_event_anchor_family(bars: list[dict[str, Any]], current_price: float) -> list[dict[str, Any]]:
    total = len(bars)
    start_index = max(0, total - SUPPORT_EVENT_LOOKBACK_DAYS)
    anchors: list[dict[str, Any]] = []
    for index in range(start_index, total):
        ratio = _event_volume_ratio(bars, index)
        low_price = _safe_number(bars[index].get("low"))
        if ratio < 2.0 or low_price <= 0:
            continue
        broken = any(_safe_number(later.get("close")) < low_price for later in bars[index + 1 :])
        if broken:
            continue
        anchors.append({
            "price": low_price,
            "barIndex": index,
            "daysAgo": _days_ago_from_index(total, index),
            "ratioPct": round(ratio * 100, 1),
        })
    clusters = _cluster_price_points(anchors, min_count=1)
    lines = []
    for cluster in clusters:
        ratio_pct = max(float(item.get("ratioPct") or 0.0) for item in cluster["members"])
        lines.append(
            _build_line(
                "eventAnchors",
                cluster,
                current_price,
                extra={
                    "burstRatioPct": ratio_pct,
                    "anchorCount": cluster["count"],
                },
            )
        )
    return lines


def _merge_support_lines(family_lines: dict[str, list[dict[str, Any]]], current_price: float) -> tuple[list[dict[str, Any]], int]:
    candidates = []
    for family, lines in family_lines.items():
        for line in lines:
            if not line.get("valid"):
                continue
            candidates.append({**line, "family": family})
    if not candidates:
        return [], 0

    candidates.sort(key=lambda item: item["price"])
    groups: list[list[dict[str, Any]]] = []
    for candidate in candidates:
        if not groups:
            groups.append([candidate])
            continue
        group = groups[-1]
        group_price = sum(item["price"] for item in group) / len(group)
        if _price_matches(group_price, candidate["price"]):
            group.append(candidate)
        else:
            groups.append([candidate])

    merged: list[dict[str, Any]] = []
    active_families: set[str] = set()
    for group in groups:
        families = sorted({str(item["family"]) for item in group})
        active_families.update(families)
        price = round(sum(item["price"] for item in group) / len(group))
        family_points = sum(SUPPORT_FAMILY_WEIGHTS[family] for family in families)
        bonus = SUPPORT_CONSENSUS_BONUS if len(families) >= 2 else 0
        score = min(100, family_points + bonus)
        last_seen_days = min(int(item.get("lastSeenDaysAgo") or 0) for item in group)
        touch_count = sum(int(item.get("count") or 0) for item in group)
        merged.append({
            "label": "복합 지지" if len(families) >= 2 else SUPPORT_FAMILY_LABELS[families[0]],
            "price": price,
            "distancePct": _distance_pct(current_price, price),
            "families": families,
            "familyLabels": [SUPPORT_FAMILY_LABELS[family] for family in families],
            "familyCount": len(families),
            "count": touch_count,
            "lastSeenDaysAgo": last_seen_days,
            "strengthPoints": score,
            "consensusBonus": bonus,
            "valid": price <= current_price * (1 + SUPPORT_CLUSTER_TOLERANCE),
        })
    merged.sort(key=lambda item: (-item["familyCount"], -item["strengthPoints"], abs(float(item.get("distancePct") or 999)), item["lastSeenDaysAgo"]))
    if merged:
        merged[0]["role"] = "primary"
        for line in merged[1:]:
            line["role"] = "secondary"
    return merged, len(active_families)


def _strength_label(score: int) -> str:
    if score >= SUPPORT_STRONG_THRESHOLD:
        return "strong"
    if score >= SUPPORT_WATCH_THRESHOLD:
        return "watch"
    return "weak"


def _warning_meta(primary_line: dict[str, Any] | None, strength_score: int, active_family_count: int, bar_count: int) -> tuple[str, str]:
    if bar_count < SUPPORT_EVENT_LOOKBACK_DAYS:
        return "warning", f"일봉 {bar_count}개만 있어 복합 지지 판정 신뢰도가 낮습니다."
    if primary_line is None or active_family_count <= 0:
        return "danger", "현재가 아래 유효 지지 family가 거의 없습니다."
    if strength_score >= SUPPORT_STRONG_THRESHOLD and active_family_count >= 2:
        family_text = "·".join(primary_line.get("familyLabels") or [])
        return "clear", f"{family_text} 합의가 겹친 주지지선이 확인됩니다."
    if strength_score >= SUPPORT_WATCH_THRESHOLD:
        if active_family_count <= 1:
            return "warning", "지지선은 보이지만 단일 family 중심이라 이탈 시 방어력이 약합니다."
        return "warning", "복합 지지선은 있으나 합의 강도가 중간 수준입니다."
    return "danger", "지지선 반복 횟수나 family 합의가 약해 하단 방어 신뢰도가 낮습니다."


def _build_summary(primary_line: dict[str, Any] | None, strength_score: int, warning_reason: str, active_family_count: int) -> str:
    if not primary_line:
        return f"주지지선 부족 · {warning_reason}"
    distance_text = primary_line.get("distancePct")
    distance = f"{distance_text:.2f}% 아래" if isinstance(distance_text, (int, float)) else "거리 미산출"
    families = "·".join(primary_line.get("familyLabels") or [])
    return f"주지지 {primary_line['price']:,}원 ({distance}) · 강도 {strength_score}점 · family {active_family_count}개 · {families}"


def analyze_pullback_support_levels(bars: list[dict[str, Any]], current_price: float) -> dict[str, Any]:
    normalized_bars = [bar for bar in bars if _safe_number(bar.get("close")) > 0][-SUPPORT_LOOKBACK_DAYS:]
    bar_count = len(normalized_bars)
    if current_price <= 0 and normalized_bars:
        current_price = _safe_number(normalized_bars[-1].get("close"))

    families = {
        "horizontal": _build_horizontal_family(normalized_bars, current_price),
        "swingCluster": _build_swing_family(normalized_bars, current_price),
        "volumeShelf": _build_volume_shelf_family(normalized_bars, current_price),
        "eventAnchors": _build_event_anchor_family(normalized_bars, current_price),
    }
    merged_lines, active_family_count = _merge_support_lines(families, current_price)
    primary_line = merged_lines[0] if merged_lines else None
    strength_score = int(primary_line["strengthPoints"]) if primary_line else 0
    strength_label = _strength_label(strength_score)
    warning_level, warning_reason = _warning_meta(primary_line, strength_score, active_family_count, bar_count)
    summary = _build_summary(primary_line, strength_score, warning_reason, active_family_count)

    support = {
        "summary": summary,
        "lines": merged_lines[:5],
        "primaryLine": primary_line,
        "strengthScore": strength_score,
        "strengthLabel": strength_label,
        "warningLevel": warning_level,
        "warningReason": warning_reason,
        "activeFamilyCount": active_family_count,
        "barCount": bar_count,
    }
    return {
        "support": support,
        "families": families,
    }


def build_pullback_support_payload_from_snapshot(snapshot: Any) -> dict[str, Any]:
    return analyze_pullback_support_levels(_build_snapshot_bars(snapshot), _safe_number(getattr(snapshot, "current_price", 0.0)))


def build_pullback_support_gate(payload: dict[str, Any]) -> dict[str, Any]:
    support = payload.get("support") if isinstance(payload, dict) else {}
    primary_line = support.get("primaryLine") if isinstance(support, dict) else None
    strength_score = int(_safe_number(support.get("strengthScore") if isinstance(support, dict) else 0))
    active_family_count = int(_safe_number(support.get("activeFamilyCount") if isinstance(support, dict) else 0))
    no_support = primary_line is None or active_family_count <= 0
    if strength_score >= SUPPORT_STRONG_THRESHOLD and active_family_count >= 2:
        status = "✅"
        note = f"복합 지지 강도 {strength_score}점 · 현재가 아래 유효 family {active_family_count}개"
        eval_status = "met"
    elif strength_score < SUPPORT_WATCH_THRESHOLD and no_support:
        status = "⛔"
        note = support.get("warningReason") or "현재가 아래 유효 지지선이 거의 없습니다."
        eval_status = "not_met"
    else:
        status = "⚠️"
        note = support.get("warningReason") or f"복합 지지 강도 {strength_score}점 · family {active_family_count}개"
        eval_status = "not_met"
    return {"code": "G9", "status": status, "note": note, "evalStatus": eval_status}
