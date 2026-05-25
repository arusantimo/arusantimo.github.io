from __future__ import annotations

from typing import Any, Dict, List, Optional

from .collectors import safe_number


def clamp(value: float, minimum: float = 0.0, maximum: float = 100.0) -> float:
    return min(maximum, max(minimum, value))


def _get_leader_weighted_metric(leader_stocks: List[Dict[str, Any]], field: str) -> Optional[float]:
    weighted_sum = 0.0
    weight_sum = 0.0
    for stock in leader_stocks:
        weight = safe_number(stock.get("weight"))
        value = safe_number(stock.get(field))
        if weight is None or value is None:
            continue
        weighted_sum += weight * value
        weight_sum += weight
    return weighted_sum / weight_sum if weight_sum > 0 else None


def _get_leader_weighted_breadth(leader_stocks: List[Dict[str, Any]], predicate) -> float:
    total = 0.0
    for stock in leader_stocks:
        if predicate(stock):
            total += safe_number(stock.get("weight")) or 0.0
    return clamp(total, 0.0, 1.0)


def _build_neutral_trap_result(reason: str, basket_drawdown_15d: Optional[float] = None, has_shock_drop: bool = False) -> Dict[str, Any]:
    return {
        "trapScore": 0,
        "trapState": "neutral",
        "trapReason": reason,
        "trapFlowScore": 0,
        "trapMarginScore": 0,
        "trapFirstShockScore": 0,
        "trapThreeDayScore": 0,
        "trapRecoveryScore": 0,
        "basketDrawdown15d": basket_drawdown_15d,
        "hasShockDrop": has_shock_drop,
    }


def _calculate_trap_flow_score(data: Dict[str, Any]) -> Dict[str, Any]:
    retail_today = safe_number(data.get("retailNetToday"))
    retail_10d = safe_number(data.get("retailNet10dCum"))
    retail_avg = safe_number(data.get("retailNet10dAbsAvg"))
    if not (retail_today and retail_today > 0 and retail_10d and retail_10d > 0 and retail_avg and retail_avg > 0):
        return {"score": 0, "label": "개인 흡수 없음"}

    daily_ratio = retail_today / retail_avg
    score = 3 if daily_ratio >= 1.5 else 2 if daily_ratio >= 1.0 else 1
    foreign_distribution = (safe_number(data.get("foreignNetToday")) or 0) < 0 and (safe_number(data.get("foreignNet10dCum")) or 0) < 0
    institution_distribution = (safe_number(data.get("institutionNetToday")) or 0) < 0 and (safe_number(data.get("institutionNet10dCum")) or 0) < 0
    if foreign_distribution and institution_distribution:
        score += 3
    elif foreign_distribution or institution_distribution:
        score += 2
    return {
        "score": min(6, score),
        "label": "개인 흡수 + 양축 분배" if foreign_distribution and institution_distribution else "개인 흡수 중심",
    }


def _calculate_trap_margin_score(data: Dict[str, Any], basket_drawdown_15d: Optional[float]) -> Dict[str, Any]:
    change_pct = safe_number(data.get("marginShockChangePct"))
    if change_pct is None or basket_drawdown_15d is None:
        return {"score": 0, "label": "신용 기준값 없음"}

    if basket_drawdown_15d <= -8 and change_pct >= 1:
        base_score = 4
        base_label = f"신용 {change_pct:.1f}% 증가"
    elif basket_drawdown_15d <= -8 and change_pct >= 0:
        base_score = 3
        base_label = f"신용 {change_pct:.1f}% 유지"
    elif basket_drawdown_15d <= -5 and change_pct > -2:
        base_score = 2
        base_label = f"신용 {change_pct:.1f}% 견조"
    else:
        base_score = 0
        base_label = f"신용 {change_pct:.1f}% 감소"

    deposit_margin_ratio = safe_number(data.get("depositMarginRatio"))
    if deposit_margin_ratio is not None and deposit_margin_ratio >= 0.20 and basket_drawdown_15d <= -5 and change_pct >= 0:
        return {
            "score": min(5, base_score + 1),
            "label": f"{base_label} · 폰지 신용/예탁 {(deposit_margin_ratio * 100):.0f}%",
        }
    return {"score": base_score, "label": base_label}


def _calculate_trap_first_shock_score(leader_stocks: List[Dict[str, Any]]) -> Dict[str, Any]:
    breadth = _get_leader_weighted_breadth(leader_stocks, lambda stock: safe_number(stock.get("shockValueRatio")) is not None)
    candidates = [stock for stock in leader_stocks if safe_number(stock.get("shockValueRatio")) is not None]
    ratio = _get_leader_weighted_metric(candidates, "shockValueRatio")
    if breadth >= 0.6 and ratio is not None and ratio >= 1.5:
        return {"score": 5, "label": f"폭발 breadth {(breadth * 100):.0f}%"}
    if breadth >= 0.4 and ratio is not None and ratio >= 1.2:
        return {"score": 3, "label": f"강한 음봉 breadth {(breadth * 100):.0f}%"}
    if breadth >= 0.25 and ratio is not None and ratio >= 1.0:
        return {"score": 1, "label": f"초기 음봉 breadth {(breadth * 100):.0f}%"}
    return {"score": 0, "label": "첫 음봉 폭발 약함"}


def _calculate_trap_three_day_score(leader_stocks: List[Dict[str, Any]]) -> Dict[str, Any]:
    candidates = [
        stock
        for stock in leader_stocks
        if safe_number(stock.get("threeDayDropPct")) is not None and safe_number(stock.get("threeDayValueRatio")) is not None
    ]
    breadth = _get_leader_weighted_breadth(
        leader_stocks,
        lambda stock: safe_number(stock.get("threeDayDropPct")) is not None and safe_number(stock.get("threeDayValueRatio")) is not None,
    )
    drop_pct = _get_leader_weighted_metric(candidates, "threeDayDropPct")
    value_ratio = _get_leader_weighted_metric(candidates, "threeDayValueRatio")
    if breadth >= 0.5 and drop_pct is not None and drop_pct <= -8 and value_ratio is not None and value_ratio >= 1.15:
        return {"score": 3, "label": "3일 연속 음봉 지속"}
    if breadth >= 0.35 and drop_pct is not None and drop_pct <= -6:
        return {"score": 2, "label": "3일 음봉 확산"}
    if breadth >= 0.25 and drop_pct is not None and drop_pct <= -4:
        return {"score": 1, "label": "약한 3일 음봉"}
    return {"score": 0, "label": "3일 음봉 미약"}


def _calculate_trap_recovery_score(leader_stocks: List[Dict[str, Any]]) -> Dict[str, Any]:
    candidates = [stock for stock in leader_stocks if safe_number(stock.get("closeRecoveryRate")) is not None]
    recovery_rate = _get_leader_weighted_metric(candidates, "closeRecoveryRate")
    if recovery_rate is None:
        return {"score": 0, "label": "회복률 데이터 없음"}
    if recovery_rate <= 0.25:
        return {"score": 2, "label": f"종가 회복 {(recovery_rate * 100):.0f}%"}
    if recovery_rate <= 0.45:
        return {"score": 1, "label": f"종가 회복 {(recovery_rate * 100):.0f}%"}
    return {"score": 0, "label": f"종가 회복 {(recovery_rate * 100):.0f}%"}


def calculate_bull_trap_score(data: Dict[str, Any]) -> Dict[str, Any]:
    leader_stocks = data.get("leaderStocks") if isinstance(data.get("leaderStocks"), list) else []
    if not leader_stocks:
        return _build_neutral_trap_result("대표주 데이터 미연동 (중립 처리)")

    basket_drawdown_15d = _get_leader_weighted_metric(leader_stocks, "drawdown15dPct")
    has_shock_drop = any((safe_number(stock.get("dayReturnPct")) or 0) <= -6 for stock in leader_stocks)
    if str(data.get("cycleLeg") or "rising") == "rising":
        return _build_neutral_trap_result("상승 레그에서는 Bull Trap 오버라이드를 비활성화합니다.", basket_drawdown_15d, has_shock_drop)

    disparity = safe_number(data.get("disparity"))
    if disparity is None or disparity < 100:
        return _build_neutral_trap_result("가격 이격 조건 미충족으로 눌림목/중립 처리.", basket_drawdown_15d, has_shock_drop)
    if not ((basket_drawdown_15d is not None and basket_drawdown_15d <= -5) or has_shock_drop):
        return _build_neutral_trap_result("대표주 급락 조건 미충족으로 눌림목/중립 처리.", basket_drawdown_15d, has_shock_drop)

    flow_result = _calculate_trap_flow_score(data)
    margin_result = _calculate_trap_margin_score(data, basket_drawdown_15d)
    first_shock_result = _calculate_trap_first_shock_score(leader_stocks)
    three_day_result = _calculate_trap_three_day_score(leader_stocks)
    recovery_result = _calculate_trap_recovery_score(leader_stocks)
    trap_score = flow_result["score"] + margin_result["score"] + first_shock_result["score"] + three_day_result["score"] + recovery_result["score"]
    return {
        "trapScore": trap_score,
        "trapState": "denial" if trap_score >= 14 else "complacency" if trap_score >= 10 else "neutral",
        "trapReason": (
            f"수급 {flow_result['score']} / 신용 {margin_result['score']} / 첫 음봉 {first_shock_result['score']} / "
            f"3일 음봉 {three_day_result['score']} / 회복 {recovery_result['score']} · 대표주 낙폭 {basket_drawdown_15d:.1f}%"
            if trap_score > 0 and basket_drawdown_15d is not None
            else "눌림목/중립 처리"
        ),
        "trapFlowScore": flow_result["score"],
        "trapMarginScore": margin_result["score"],
        "trapFirstShockScore": first_shock_result["score"],
        "trapThreeDayScore": three_day_result["score"],
        "trapRecoveryScore": recovery_result["score"],
        "basketDrawdown15d": basket_drawdown_15d,
        "hasShockDrop": has_shock_drop,
    }
