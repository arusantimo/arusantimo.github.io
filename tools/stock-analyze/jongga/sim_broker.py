from __future__ import annotations

from datetime import datetime
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


def _normalize_trade_date_text(value: Any) -> str:
    raw = str(value or "").strip()
    if not raw:
        return ""
    if len(raw) >= 10 and raw[4] == "-" and raw[7] == "-":
        return raw[:10]
    compact = raw[:8]
    if len(compact) == 8 and compact.isdigit():
        return f"{compact[:4]}-{compact[4:6]}-{compact[6:8]}"
    return ""


def _is_weekday_trade_date(date_text: str) -> bool:
    normalized = _normalize_trade_date_text(date_text)
    if not normalized:
        return False
    try:
        return datetime.strptime(normalized, "%Y-%m-%d").weekday() < 5
    except ValueError:
        return False


def _resolve_final_exit_bar(entry_date: str, bars: list[dict[str, Any]], scheduled_at: str = "") -> dict[str, Any] | None:
    if not bars:
        return None
    entry_day = _normalize_trade_date_text(entry_date)
    followup_day_last_bar: dict[str, dict[str, Any]] = {}
    for bar in bars:
        timestamp = str(bar.get("timestamp") or "")
        trade_day = _normalize_trade_date_text(timestamp)
        if not trade_day or trade_day == entry_day or not _is_weekday_trade_date(trade_day):
            continue
        current = followup_day_last_bar.get(trade_day)
        if current is None or timestamp > str(current.get("timestamp") or ""):
            followup_day_last_bar[trade_day] = bar
    ordered_followup_days = sorted(followup_day_last_bar)
    if ordered_followup_days:
        target_day = ordered_followup_days[1] if len(ordered_followup_days) > 1 else ordered_followup_days[0]
        return followup_day_last_bar[target_day]
    if scheduled_at:
        scheduled_bar = next((bar for bar in bars if str(bar.get("timestamp") or "") == str(scheduled_at)), None)
        if scheduled_bar is not None:
            return scheduled_bar
    return bars[-1]


def parse_trade_plan_rows(rows: list[dict[str, Any]]) -> dict[str, Any]:
    targets: list[dict[str, Any]] = []
    stop: dict[str, Any] | None = None
    for row in rows or []:
        stage = str(row.get("stage") or "")
        stage_key = stage_key_from_row(row)
        if stage_key == "stop" or "손절" in stage:
            stop = {
                "stage": stage,
                "stageKey": "stop",
                "targetPrice": _parse_float(row.get("targetPrice")),
                "targetYield": _parse_float(row.get("targetYield")),
                "quantityPct": 100.0,
            }
            continue
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
        "sourceEntryKey": order.get("sourceEntryKey") or "",
        "strategy": order.get("strategy") or "",
        "code": order.get("code") or "",
        "name": order.get("name") or "",
        "side": order.get("side") or "",
        "stageKey": order.get("stageKey") or "",
        "reason": order.get("reason") or "",
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
        "sourceEntryKey": order.get("sourceEntryKey") or "",
        "strategy": order.get("strategy") or "",
        "code": order.get("code") or "",
        "name": order.get("name") or "",
        "side": order.get("side") or "",
        "stageKey": order.get("stageKey") or "",
        "reason": order.get("reason") or "",
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


def _is_target_order(order: dict[str, Any]) -> bool:
    if order.get("side") != "SELL":
        return False
    stage_key = str(order.get("stageKey") or "")
    return stage_key not in {"", "stop", "finalCutoff"}


def _is_order_active(order: dict[str, Any], timestamp: str) -> bool:
    active_from = str(order.get("activeFrom") or "")
    active_until = str(order.get("activeUntil") or "")
    if active_from and timestamp < active_from:
        return False
    if active_until and timestamp > active_until:
        return False
    return True


def _extract_time_hhmm(timestamp: str) -> str:
    text = str(timestamp or "")
    if "T" not in text:
        return ""
    return text[11:16]


def _is_time_between(timestamp: str, start: str, end: str) -> bool:
    hhmm = _extract_time_hhmm(timestamp)
    return bool(hhmm and start <= hhmm <= end)


def simulate_exit_plan(
    *,
    orders: list[dict[str, Any]],
    bars: list[dict[str, Any]],
    replay_schedule: dict[str, Any],
    strategy: str = "",
    entry_fill_price: float = 0.0,
    reversal_live_exit_policy: dict[str, Any] | None = None,
    auto_flatten: bool = False,
    ambiguous_policy: str = "stop_first",
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    del ambiguous_policy
    fills: list[dict[str, Any]] = []
    remaining = 100.0
    pending_targets = {
        order["orderId"]: order
        for order in orders
        if _is_target_order(order)
    }
    stop_order = next((order for order in orders if order["side"] == "SELL" and order.get("stageKey") == "stop"), None)
    final_order = next((order for order in orders if order["side"] == "SELL" and order.get("stageKey") == "finalCutoff"), None)
    ambiguous = 0
    closed_reason = "open"
    final_exit_at = str(replay_schedule.get("finalExitAt") or "")
    reversal_session_high = 0.0
    reversal_time_stop_cutoff = str((reversal_live_exit_policy or {}).get("timeStopCutoff") or "09:15")
    reversal_time_stop_min_bounce = float((reversal_live_exit_policy or {}).get("timeStopMinBouncePct") or 1.0)
    reversal_breakeven_activation = float((reversal_live_exit_policy or {}).get("breakevenActivationPct") or 3.0)
    session_close_seen = False

    for bar in bars:
        if remaining <= 0:
            break
        timestamp = str(bar.get("timestamp") or "")
        high_price = float(bar.get("high") or 0.0)
        low_price = float(bar.get("low") or 0.0)
        open_price = float(bar.get("open") or 0.0)
        close_price = float(bar.get("close") or 0.0)
        if strategy == "reversal":
            reversal_session_high = max(reversal_session_high, high_price, close_price)
        hit_targets = sorted(
            [
                order for order in pending_targets.values()
                if order.get("finalStatus") == "open"
                and _is_order_active(order, timestamp)
                and high_price >= float(order.get("requestedPrice") or 0.0)
            ],
            key=lambda order: (
                float(order.get("requestedPrice") or 0.0),
                str(order.get("stageKey") or ""),
            ),
        )

        for order in hit_targets:
            if remaining <= 0:
                break
            qty = min(remaining, float(order.get("quantityPct") or 0.0))
            if qty <= 0:
                order["finalStatus"] = "cancelled"
                pending_targets.pop(order["orderId"], None)
                continue
            order["finalStatus"] = "filled"
            fill_rule = f"{order.get('stageKey')}_touch"
            fills.append(_fill_from_bar(order, bar, qty=qty, fill_rule=fill_rule))
            remaining = round(max(0.0, remaining - qty), 4)
            pending_targets.pop(order["orderId"], None)
            closed_reason = fill_rule
        if remaining <= 0:
            for other in pending_targets.values():
                if other.get("finalStatus") == "open":
                    other["finalStatus"] = "cancelled"
            if final_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"

        if remaining <= 0:
            break

        reversal_session_high_pct = ((reversal_session_high / entry_fill_price - 1.0) * 100.0) if entry_fill_price > 0 else 0.0
        reversal_time_stop_hit = bool(
            strategy == "reversal"
            and remaining > 0
            and _extract_time_hhmm(timestamp) >= reversal_time_stop_cutoff
            and reversal_session_high_pct < reversal_time_stop_min_bounce
            and close_price > 0
            and close_price <= max(open_price, entry_fill_price)
        )
        if reversal_time_stop_hit:
            market_order = final_order or stop_order or orders[0]
            market_order["finalStatus"] = "filled"
            fills.append(
                _fill_from_bar(
                    market_order,
                    bar,
                    qty=remaining,
                    fill_rule="time_stop_0915_market",
                    fill_price=close_price,
                )
            )
            if stop_order and stop_order is not market_order and stop_order.get("finalStatus") == "open":
                stop_order["finalStatus"] = "cancelled"
            for order in pending_targets.values():
                if order.get("finalStatus") == "open":
                    order["finalStatus"] = "cancelled"
            if final_order and final_order is not market_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"
            remaining = 0.0
            closed_reason = "time_stop_0915"
            break

        reversal_breakeven_hit = bool(
            strategy == "reversal"
            and remaining > 0
            and reversal_session_high_pct >= reversal_breakeven_activation
            and close_price > 0
            and close_price <= entry_fill_price
        )
        if reversal_breakeven_hit:
            market_order = final_order or stop_order or orders[0]
            market_order["finalStatus"] = "filled"
            fills.append(
                _fill_from_bar(
                    market_order,
                    bar,
                    qty=remaining,
                    fill_rule="breakeven_fail_market",
                    fill_price=close_price,
                )
            )
            if stop_order and stop_order is not market_order and stop_order.get("finalStatus") == "open":
                stop_order["finalStatus"] = "cancelled"
            for order in pending_targets.values():
                if order.get("finalStatus") == "open":
                    order["finalStatus"] = "cancelled"
            if final_order and final_order is not market_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"
            remaining = 0.0
            closed_reason = "breakeven_fail"
            break

        is_session_close = _is_session_close_bar(bar)
        first_session_close = is_session_close and not session_close_seen
        if is_session_close:
            session_close_seen = True

        # 당일 종가 손절: 눌림목은 첫 관리일(D1) 종가에 손실이면 둘째 오버나이트로 넘기지 않고
        # 전량 정리한다. 둘째 날 종가까지 끌려가며 손실이 복리로 커지는 것을 차단한다.
        pullback_day1_loss_cut = bool(
            strategy == "pullback"
            and remaining > 0
            and first_session_close
            and close_price > 0
            and entry_fill_price > 0
            and close_price < entry_fill_price
        )
        if pullback_day1_loss_cut:
            market_order = stop_order or final_order or orders[0]
            market_order["finalStatus"] = "filled"
            fills.append(
                _fill_from_bar(
                    market_order,
                    bar,
                    qty=remaining,
                    fill_rule="same_day_close_stop",
                    fill_price=close_price,
                )
            )
            for order in pending_targets.values():
                if order.get("finalStatus") == "open":
                    order["finalStatus"] = "cancelled"
            if final_order and final_order is not market_order and final_order.get("finalStatus") == "open":
                final_order["finalStatus"] = "cancelled"
            if stop_order and stop_order is not market_order and stop_order.get("finalStatus") == "open":
                stop_order["finalStatus"] = "cancelled"
            remaining = 0.0
            has_prior_profit = any(
                f.get("side") == "SELL" and f.get("stageKey") not in {"stop", "finalCutoff", ""}
                for f in fills
            )
            closed_reason = "profit_then_stop" if has_prior_profit else "same_day_close_stop"
            break

        stop_hit = bool(
            stop_order
            and stop_order.get("finalStatus") == "open"
            and is_session_close
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
            has_prior_profit = any(
                f.get("side") == "SELL" and f.get("stageKey") not in {"stop", "finalCutoff", ""}
                for f in fills
            )
            closed_reason = "profit_then_stop" if has_prior_profit else "stop_close"
            break

    if remaining > 0 and auto_flatten and final_exit_at:
        final_bar = next((bar for bar in bars if str(bar.get("timestamp") or "") == final_exit_at), None)
        if final_bar is None and bars:
            final_bar = bars[-1]
        if final_bar is not None:
            swing_order = next((order for order in orders if order.get("stageKey") == "swing"), None)
            swing_target_price = float(swing_order.get("requestedPrice") or 0.0) if swing_order else 0.0

            if swing_order and swing_target_price > 0.0:
                swing_order["finalStatus"] = "open"
                closed_reason = "swing_hold"
            else:
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
    reversal_live_exit_policy: dict[str, Any] | None = None,
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

    final_exit_bar = _resolve_final_exit_bar(date, replay_bars, str(replay_schedule.get("finalExitAt") or ""))
    final_exit_at = str(final_exit_bar.get("timestamp") or requested_at) if final_exit_bar else requested_at
    effective_replay_schedule = dict(replay_schedule)
    effective_replay_schedule["finalExitAt"] = final_exit_at
    primary_active_until = str(replay_schedule.get("primaryTargetUntil") or (replay_bars[1].get("timestamp") if len(replay_bars) > 1 else requested_at))
    secondary_active_from = str(replay_schedule.get("secondaryTargetFrom") or primary_active_until)
    secondary_active_until = str(replay_schedule.get("secondaryTargetUntil") or (replay_bars[2].get("timestamp") if len(replay_bars) > 2 else primary_active_until))
    target_window_map = {
        "premarket": (
            str(replay_bars[0].get("timestamp") if replay_bars else requested_at),
            primary_active_until,
        ),
        "openPhase": (
            str(replay_bars[0].get("timestamp") if replay_bars else requested_at),
            primary_active_until,
        ),
        "intraday1": (
            secondary_active_from,
            secondary_active_until,
        ),
        "intraday2": (
            secondary_active_from,
            secondary_active_until,
        ),
        "swing": (
            secondary_active_until,
            final_exit_at,
        ),
    }
    for target in plan["targets"]:
        stage_key = str(target.get("stageKey") or "")
        active_from, active_until = target_window_map.get(stage_key, (secondary_active_from, secondary_active_until))
        orders.append(
            make_order(
                order_id=f"{source_entry_key}-{stage_key}",
                run_id=run_id,
                date=date,
                variant=variant,
                strategy=strategy,
                code=code,
                name=name,
                side="SELL",
                order_type="LIMIT",
                requested_at=active_from or requested_at,
                requested_price=float(target.get("targetPrice") or 0.0),
                quantity_pct=float(target.get("quantityPct") or 0.0),
                reason=str(target.get("stage") or "익절"),
                source_entry_key=source_entry_key,
                stage_key=stage_key,
                active_from=active_from,
                active_until=active_until,
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
            requested_price=float(final_exit_bar.get("close") or 0.0) if final_exit_bar else 0.0,
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
        replay_schedule=effective_replay_schedule,
        strategy=strategy,
        entry_fill_price=float(entry_fill.get("fillPrice") or 0.0),
        reversal_live_exit_policy=reversal_live_exit_policy,
        auto_flatten=auto_flatten,
    )
    fills.extend(exit_fills)
    sell_fills = [fill for fill in exit_fills if fill.get("orderId") != entry_order["orderId"]]
    eval_fills = list(sell_fills)
    if exit_meta["remainingQuantityPct"] > 0 and len(replay_bars) > 0:
        last_bar = replay_bars[-1]
        eval_fills.append({
            "filledQuantityPct": exit_meta["remainingQuantityPct"],
            "fillPrice": float(last_bar.get("close") or 0.0),
        })
    result_return = net_return_pct(entry_fill, eval_fills)
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
