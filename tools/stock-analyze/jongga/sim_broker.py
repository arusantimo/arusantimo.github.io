from __future__ import annotations

from typing import Any

from jongga.outcome_tracker import stage_key_from_row

BUY_SLIPPAGE_CLOSE_PCT = 0.10
BUY_SLIPPAGE_OPEN_PCT = 0.15
BUY_FEE_PCT = 0.015
SELL_FEE_PCT = 0.015
SELL_TAX_PCT = 0.18
PRIMARY_TAKE_PROFIT_PCT = 2.0
SECONDARY_TAKE_PROFIT_PCT = 1.2


def _parse_float(value: Any) -> float:
    text = str(value or "").replace(",", "").replace("원", "").replace("%", "").strip()
    if not text:
        return 0.0
    try:
        return float(text)
    except ValueError:
        return 0.0


def _parse_qty(value: Any) -> float:
    text = str(value or "").strip()
    digits = []
    for ch in text:
        if ch.isdigit() or ch == ".":
            digits.append(ch)
            continue
        if digits:
            break
    try:
        return float("".join(digits)) if digits else 0.0
    except ValueError:
        return 0.0


def parse_trade_plan_rows(rows: list[dict[str, Any]]) -> dict[str, Any]:
    targets: list[dict[str, Any]] = []
    stop: dict[str, Any] | None = None
    for row in rows or []:
        stage = str(row.get("stage") or "")
        if "손절" in stage:
            stop = {
                "stage": stage,
                "stageKey": "stop",
                "targetPrice": _parse_float(row.get("targetPrice")),
                "targetYield": _parse_float(row.get("targetYield")),
                "quantityPct": 100.0,
            }
            continue
        stage_key = stage_key_from_row(row)
        if not stage_key:
            continue
        targets.append({
            "stage": stage,
            "stageKey": stage_key,
            "targetPrice": _parse_float(row.get("targetPrice")),
            "targetYield": _parse_float(row.get("targetYield")),
            "quantityPct": _parse_qty(row.get("quantity")),
        })
    return {
        "targets": targets,
        "stop": stop or {"stage": "🛑 손절", "stageKey": "stop", "targetPrice": 0.0, "targetYield": 0.0, "quantityPct": 100.0},
    }


def make_order(
    *,
    order_id: str,
    run_id: str,
    date: str,
    variant: str,
    strategy: str,
    code: str,
    name: str,
    side: str,
    order_type: str,
    requested_at: str,
    requested_price: float,
    quantity_pct: float,
    reason: str,
    source_entry_key: str,
    stage_key: str | None = None,
    active_from: str | None = None,
    active_until: str | None = None,
) -> dict[str, Any]:
    return {
        "orderId": order_id,
        "runId": run_id,
        "date": date,
        "variant": variant,
        "strategy": strategy,
        "code": code,
        "name": name,
        "side": side,
        "orderType": order_type,
        "requestedAt": requested_at,
        "requestedPrice": round(float(requested_price or 0.0), 4),
        "quantityPct": round(float(quantity_pct or 0.0), 4),
        "reason": reason,
        "sourceEntryKey": source_entry_key,
        "stageKey": stage_key or "",
        "activeFrom": active_from or "",
        "activeUntil": active_until or "",
        "finalStatus": "open",
    }


def fill_entry_order(order: dict[str, Any], entry_bar: dict[str, Any], *, slippage_pct: float, fill_rule: str) -> dict[str, Any]:
    ref_price = float(entry_bar.get("close") if fill_rule == "close_slippage" else entry_bar.get("open") or 0.0)
    fill_price = ref_price * (1.0 + slippage_pct / 100.0)
    order["finalStatus"] = "filled"
    return {
        "orderId": order["orderId"],
        "fillStatus": "filled",
        "filledAt": entry_bar.get("timestamp") or order.get("requestedAt"),
        "fillPrice": round(fill_price, 4),
        "filledQuantityPct": round(float(order.get("quantityPct") or 0.0), 4),
        "slippagePct": round(slippage_pct, 4),
        "barTimestamp": entry_bar.get("timestamp") or "",
        "barOpen": round(float(entry_bar.get("open") or 0.0), 4),
        "barHigh": round(float(entry_bar.get("high") or 0.0), 4),
        "barLow": round(float(entry_bar.get("low") or 0.0), 4),
        "barClose": round(float(entry_bar.get("close") or 0.0), 4),
        "fillRule": fill_rule,
    }


def net_return_pct(entry_fill: dict[str, Any], exit_fills: list[dict[str, Any]]) -> float | None:
    entry_qty = float(entry_fill.get("filledQuantityPct") or 0.0) / 100.0
    if entry_qty <= 0:
        return None
    buy_notional = float(entry_fill.get("fillPrice") or 0.0) * entry_qty
    buy_cost = buy_notional * (1.0 + BUY_FEE_PCT / 100.0)
    proceeds = 0.0
    for fill in exit_fills:
        qty = float(fill.get("filledQuantityPct") or 0.0) / 100.0
        if qty <= 0:
            continue
        price = float(fill.get("fillPrice") or 0.0)
        proceeds += price * qty * (1.0 - (SELL_FEE_PCT + SELL_TAX_PCT) / 100.0)
    if buy_cost <= 0:
        return None
    return ((proceeds / buy_cost) - 1.0) * 100.0


def _price_with_return(base_price: float, return_pct: float) -> float:
    return round(float(base_price or 0.0) * (1.0 + return_pct / 100.0), 4)


def _fill_from_bar(
    order: dict[str, Any],
    bar: dict[str, Any],
    *,
    qty: float,
    fill_rule: str,
    fill_status: str = "filled",
    fill_price: float | None = None,
) -> dict[str, Any]:
    high_price = float(bar.get("high") or 0.0)
    low_price = float(bar.get("low") or 0.0)
    resolved_fill_price = float(fill_price if fill_price is not None else order.get("requestedPrice") or 0.0)
    return {
        "orderId": order["orderId"],
        "fillStatus": fill_status,
        "filledAt": bar.get("timestamp") or "",
        "fillPrice": round(resolved_fill_price, 4),
        "filledQuantityPct": round(qty, 4),
        "slippagePct": 0.0,
        "barTimestamp": bar.get("timestamp") or "",
        "barOpen": round(float(bar.get("open") or 0.0), 4),
        "barHigh": round(high_price, 4),
        "barLow": round(low_price, 4),
        "barClose": round(float(bar.get("close") or 0.0), 4),
        "fillRule": fill_rule,
    }


def _is_session_close_bar(bar: dict[str, Any]) -> bool:
    phase = str(bar.get("phase") or "").strip().lower()
    if "session_cutoff" in phase or phase.endswith("_close"):
        return True
    timestamp = str(bar.get("timestamp") or "")
    return "T15:00" in timestamp or "T15:30" in timestamp


def simulate_exit_plan(
    *,
    orders: list[dict[str, Any]],
    bars: list[dict[str, Any]],
    replay_schedule: dict[str, Any],
    auto_flatten: bool = False,
    ambiguous_policy: str = "stop_first",
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    fills: list[dict[str, Any]] = []
    remaining = 100.0
    pending_targets = {
        order["orderId"]: order
        for order in orders
        if order["side"] == "SELL" and order.get("stageKey") in {"takeProfitPrimary", "takeProfitSecondary"}
    }
    primary_target = next((order for order in pending_targets.values() if order.get("stageKey") == "takeProfitPrimary"), None)
    secondary_target = next((order for order in pending_targets.values() if order.get("stageKey") == "takeProfitSecondary"), None)
    stop_order = next((order for order in orders if order["side"] == "SELL" and order.get("stageKey") == "stop"), None)
    final_order = next((order for order in orders if order["side"] == "SELL" and order.get("stageKey") == "finalCutoff"), None)
    ambiguous = 0
    closed_reason = "open"
    final_exit_at = str(replay_schedule.get("finalExitAt") or "")
    primary_target_until = str(replay_schedule.get("primaryTargetUntil") or "")
    secondary_target_until = str(replay_schedule.get("secondaryTargetUntil") or "")

    for bar in bars:
        if remaining <= 0:
            break
        timestamp = str(bar.get("timestamp") or "")
        high_price = float(bar.get("high") or 0.0)
        close_price = float(bar.get("close") or 0.0)
        hit_targets: list[dict[str, Any]] = []
        if (
            primary_target
            and primary_target.get("finalStatus") == "open"
            and primary_target_until
            and timestamp <= primary_target_until
            and high_price >= float(primary_target.get("requestedPrice") or 0.0)
        ):
            hit_targets.append(primary_target)
        if (
            secondary_target
            and secondary_target.get("finalStatus") == "open"
            and secondary_target_until
            and primary_target_until
            and primary_target_until < timestamp <= secondary_target_until
            and high_price >= float(secondary_target.get("requestedPrice") or 0.0)
        ):
            hit_targets.append(secondary_target)

        for order in hit_targets:
            if remaining <= 0:
                break
            qty = min(remaining, float(order.get("quantityPct") or 0.0))
            if qty <= 0:
                order["finalStatus"] = "cancelled"
                pending_targets.pop(order["orderId"], None)
                continue
            order["finalStatus"] = "filled"
            fill_rule = "primary_target_touch" if order.get("stageKey") == "takeProfitPrimary" else "secondary_target_touch"
            fills.append(_fill_from_bar(order, bar, qty=qty, fill_rule=fill_rule))
            remaining = round(max(0.0, remaining - qty), 4)
            pending_targets.pop(order["orderId"], None)
            for other in pending_targets.values():
                if other.get("finalStatus") == "open":
                    other["finalStatus"] = "cancelled"
            if final_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"
            closed_reason = fill_rule
            remaining = 0.0

        if remaining <= 0:
            break

        stop_hit = bool(
            stop_order
            and stop_order.get("finalStatus") == "open"
            and _is_session_close_bar(bar)
            and close_price > 0
            and close_price <= float(stop_order.get("requestedPrice") or 0.0)
        )

        if stop_hit:
            qty = remaining
            stop_order["finalStatus"] = "filled"
            fills.append(
                _fill_from_bar(
                    stop_order,
                    bar,
                    qty=qty,
                    fill_rule="stop_close",
                    fill_price=close_price,
                )
            )
            for order in pending_targets.values():
                if order.get("finalStatus") == "open":
                    order["finalStatus"] = "cancelled"
            if final_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"
            remaining = 0.0
            closed_reason = "stop_close"
            break

    if remaining > 0 and auto_flatten and final_exit_at:
        final_bar = next((bar for bar in bars if str(bar.get("timestamp") or "") == final_exit_at), None)
        if final_bar is None and bars:
            final_bar = bars[-1]
        if final_bar is not None:
            if final_order is None:
                final_order = make_order(
                    order_id=f"{orders[0]['orderId'].rsplit('-', 1)[0]}-final",
                    run_id=str(orders[0].get("runId") or ""),
                    date=str(orders[0].get("date") or ""),
                    variant=str(orders[0].get("variant") or ""),
                    strategy=str(orders[0].get("strategy") or ""),
                    code=str(orders[0].get("code") or ""),
                    name=str(orders[0].get("name") or ""),
                    side="SELL",
                    order_type="MKT",
                    requested_at=str(final_bar.get("timestamp") or ""),
                    requested_price=float(final_bar.get("close") or 0.0),
                    quantity_pct=remaining,
                    reason="3일차 종가 컷오프 청산",
                    source_entry_key=str(orders[0].get("sourceEntryKey") or ""),
                    stage_key="finalCutoff",
                )
                orders.append(final_order)
            final_order["finalStatus"] = "filled"
            fills.append(
                _fill_from_bar(
                    final_order,
                    final_bar,
                    qty=remaining,
                    fill_rule="third_day_cutoff_market",
                    fill_price=float(final_bar.get("close") or 0.0),
                )
            )
            remaining = 0.0
            if closed_reason == "open":
                closed_reason = "third_day_cutoff_market"

    return fills, {
        "remainingQuantityPct": round(remaining, 4),
        "ambiguousCount": ambiguous,
        "closedReason": closed_reason,
    }


def simulate_trade(
    *,
    run_id: str,
    date: str,
    variant: str,
    strategy: str,
    code: str,
    name: str,
    source_entry_key: str,
    trade_plan_rows: list[dict[str, Any]],
    market_data: dict[str, Any],
    entry_mode: str = "close",
    auto_flatten: bool = True,
) -> dict[str, Any]:
    plan = parse_trade_plan_rows(trade_plan_rows)
    entry_bar = market_data.get("entryBar") or {}
    replay_bars = list(market_data.get("replayBars") or [])
    replay_schedule = market_data.get("replaySchedule") or {}
    if entry_mode not in {"close", "next_open"}:
        raise ValueError(f"unsupported entry mode: {entry_mode}")
    if entry_mode == "next_open":
        if not replay_bars:
            raise ValueError("next_open entry requires replay bars")
        entry_ref_bar = replay_bars[0]
        requested_price = float(entry_ref_bar.get("open") or 0.0)
        slippage_pct = BUY_SLIPPAGE_OPEN_PCT
        fill_rule = "next_open_slippage"
        order_type = "MOO"
        requested_at = str(entry_ref_bar.get("timestamp") or "")
    else:
        entry_ref_bar = entry_bar
        requested_price = float(entry_ref_bar.get("close") or 0.0)
        slippage_pct = BUY_SLIPPAGE_CLOSE_PCT
        fill_rule = "close_slippage"
        order_type = "MOC"
        requested_at = str(entry_ref_bar.get("timestamp") or "")

    orders: list[dict[str, Any]] = []
    fills: list[dict[str, Any]] = []

    entry_order = make_order(
        order_id=f"{source_entry_key}-entry",
        run_id=run_id,
        date=date,
        variant=variant,
        strategy=strategy,
        code=code,
        name=name,
        side="BUY",
        order_type=order_type,
        requested_at=requested_at,
        requested_price=requested_price,
        quantity_pct=100.0,
        reason=f"{entry_mode}_entry",
        source_entry_key=source_entry_key,
        stage_key="entry",
    )
    orders.append(entry_order)
    entry_fill = fill_entry_order(entry_order, entry_ref_bar, slippage_pct=slippage_pct, fill_rule=fill_rule)
    fills.append(entry_fill)

    primary_target_price = _price_with_return(float(entry_fill.get("fillPrice") or 0.0), PRIMARY_TAKE_PROFIT_PCT)
    secondary_target_price = _price_with_return(float(entry_fill.get("fillPrice") or 0.0), SECONDARY_TAKE_PROFIT_PCT)
    primary_active_until = str(replay_schedule.get("primaryTargetUntil") or (replay_bars[1].get("timestamp") if len(replay_bars) > 1 else requested_at))
    secondary_active_from = str(replay_schedule.get("secondaryTargetFrom") or primary_active_until)
    secondary_active_until = str(replay_schedule.get("secondaryTargetUntil") or (replay_bars[2].get("timestamp") if len(replay_bars) > 2 else primary_active_until))
    final_exit_at = str(replay_schedule.get("finalExitAt") or (replay_bars[-1].get("timestamp") if replay_bars else requested_at))

    orders.append(
        make_order(
            order_id=f"{source_entry_key}-takeProfitPrimary",
            run_id=run_id,
            date=date,
            variant=variant,
            strategy=strategy,
            code=code,
            name=name,
            side="SELL",
            order_type="LIMIT",
            requested_at=str(replay_bars[0].get("timestamp") if replay_bars else requested_at),
            requested_price=primary_target_price,
            quantity_pct=100.0,
            reason=f"익일 10시 {PRIMARY_TAKE_PROFIT_PCT:.1f}% 자동익절",
            source_entry_key=source_entry_key,
            stage_key="takeProfitPrimary",
            active_from=str(replay_bars[0].get("timestamp") if replay_bars else requested_at),
            active_until=primary_active_until,
        )
    )
    orders.append(
        make_order(
            order_id=f"{source_entry_key}-takeProfitSecondary",
            run_id=run_id,
            date=date,
            variant=variant,
            strategy=strategy,
            code=code,
            name=name,
            side="SELL",
            order_type="LIMIT",
            requested_at=secondary_active_from,
            requested_price=secondary_target_price,
            quantity_pct=100.0,
            reason=f"익일 15시 {SECONDARY_TAKE_PROFIT_PCT:.1f}% 자동익절",
            source_entry_key=source_entry_key,
            stage_key="takeProfitSecondary",
            active_from=secondary_active_from,
            active_until=secondary_active_until,
        )
    )
    stop = plan["stop"]
    orders.append(
        make_order(
            order_id=f"{source_entry_key}-stop",
            run_id=run_id,
            date=date,
            variant=variant,
            strategy=strategy,
            code=code,
            name=name,
            side="SELL",
            order_type="STOP",
            requested_at=str(replay_bars[0].get("timestamp") if replay_bars else requested_at),
            requested_price=float(stop["targetPrice"]),
            quantity_pct=100.0,
            reason=stop["stage"] or "손절",
            source_entry_key=source_entry_key,
            stage_key="stop",
        )
    )
    orders.append(
        make_order(
            order_id=f"{source_entry_key}-finalCutoff",
            run_id=run_id,
            date=date,
            variant=variant,
            strategy=strategy,
            code=code,
            name=name,
            side="SELL",
            order_type="MKT",
            requested_at=final_exit_at,
            requested_price=float(replay_bars[-1].get("close") or 0.0) if replay_bars else 0.0,
            quantity_pct=100.0,
            reason="3일차 종가 컷오프 청산",
            source_entry_key=source_entry_key,
            stage_key="finalCutoff",
            active_from=final_exit_at,
            active_until=final_exit_at,
        )
    )

    exit_fills, exit_meta = simulate_exit_plan(
        orders=orders,
        bars=replay_bars,
        replay_schedule=replay_schedule,
        auto_flatten=auto_flatten,
    )
    fills.extend(exit_fills)
    sell_fills = [fill for fill in exit_fills if fill.get("orderId") != entry_order["orderId"]]
    result_return = net_return_pct(entry_fill, sell_fills)
    exit_prices = [float(fill.get("fillPrice") or 0.0) for fill in sell_fills if float(fill.get("fillPrice") or 0.0) > 0]
    exit_weighted_notional = sum(
        float(fill.get("fillPrice") or 0.0) * (float(fill.get("filledQuantityPct") or 0.0) / 100.0)
        for fill in sell_fills
    )
    exit_weighted_qty = sum(float(fill.get("filledQuantityPct") or 0.0) / 100.0 for fill in sell_fills)
    exit_avg_fill_price = round(exit_weighted_notional / exit_weighted_qty, 4) if exit_weighted_qty > 0 else None
    exit_last_fill = sell_fills[-1] if sell_fills else None

    if exit_meta["remainingQuantityPct"] > 0:
        trade_status = "open"
    elif exit_meta["ambiguousCount"] > 0:
        trade_status = "ambiguous"
    else:
        trade_status = "closed"

    position_events = [
        {
            "eventType": "entry",
            "timestamp": entry_fill["filledAt"],
            "quantityPct": entry_fill["filledQuantityPct"],
            "price": entry_fill["fillPrice"],
        }
    ]
    remaining = 100.0
    for fill in sell_fills:
        remaining = round(max(0.0, remaining - float(fill.get("filledQuantityPct") or 0.0)), 4)
        position_events.append({
            "eventType": "exit",
            "timestamp": fill["filledAt"],
            "quantityPct": fill["filledQuantityPct"],
            "price": fill["fillPrice"],
            "remainingQuantityPct": remaining,
            "fillRule": fill["fillRule"],
        })

    return {
        "orders": orders,
        "fills": fills,
        "positionEvents": position_events,
        "result": {
            "runId": run_id,
            "date": date,
            "variant": variant,
            "strategy": strategy,
            "code": code,
            "name": name,
            "sourceEntryKey": source_entry_key,
            "entryMode": entry_mode,
            "entryFilledAt": entry_fill["filledAt"],
            "entryFillPrice": entry_fill["fillPrice"],
            "exitFilledAt": exit_last_fill.get("filledAt") if exit_last_fill else None,
            "exitAvgFillPrice": exit_avg_fill_price,
            "exitLastFillPrice": round(exit_prices[-1], 4) if exit_prices else None,
            "netReturnPct": round(result_return, 4) if result_return is not None else None,
            "tradeStatus": trade_status,
            "ambiguousCount": exit_meta["ambiguousCount"],
            "remainingQuantityPct": exit_meta["remainingQuantityPct"],
            "closedReason": exit_meta["closedReason"],
            "exitFillCount": len(sell_fills),
            "filledExitQuantityPct": round(sum(float(fill.get("filledQuantityPct") or 0.0) for fill in sell_fills), 4),
        },
    }
