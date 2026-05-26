from __future__ import annotations

from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_SCHEDULE_PATH = ROOT_DIR / "config" / "execution_schedule.yaml"


def _load_schedule() -> dict[str, Any]:
    path = DEFAULT_SCHEDULE_PATH
    if not path.exists():
        return _default_schedule()
    payload: dict[str, Any] = {"profile": "ats"}
    section: str | None = None
    current_list: list[dict[str, Any]] | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if not line.startswith(" ") and stripped.endswith(":"):
            section = stripped[:-1]
            payload[section] = {}
            current_list = None
            continue
        if section and ":" in stripped:
            key, _, raw = stripped.partition(":")
            value: Any = raw.strip().strip('"').strip("'")
            if value.lower() == "true":
                value = True
            elif value.lower() == "false":
                value = False
            else:
                try:
                    if "." in value:
                        value = float(value)
                    else:
                        value = int(value)
                except ValueError:
                    pass
            if section == "intradayExits" and isinstance(payload.get(section), list):
                continue
            if isinstance(payload.get(section), dict):
                payload[section][key] = value
        if stripped.startswith("- time:"):
            if not isinstance(payload.get("intradayExits"), list):
                payload["intradayExits"] = []
            current_list = payload["intradayExits"]
            current_list.append({"time": stripped.split(":", 1)[1].strip().strip('"')})
        elif current_list is not None and stripped.startswith("- "):
            pass
        elif current_list is not None and ":" in stripped:
            key, _, raw = stripped.partition(":")
            if current_list:
                val: Any = raw.strip().strip('"')
                try:
                    val = float(val) if "." in str(val) else int(val)
                except ValueError:
                    pass
                current_list[-1][key.strip()] = val
    if "intradayExits" not in payload or not payload["intradayExits"]:
        payload["intradayExits"] = _default_schedule()["intradayExits"]
    if "ats" not in payload:
        payload["ats"] = _default_schedule()["ats"]
    if "krxLiquidation" not in payload:
        payload["krxLiquidation"] = _default_schedule()["krxLiquidation"]
    if "analysis" not in payload:
        payload["analysis"] = _default_schedule()["analysis"]
    return payload


def _default_schedule() -> dict[str, Any]:
    return {
        "profile": "ats",
        "analysis": {"start": "07:30", "deadline": "07:40", "reviewUntil": "08:00"},
        "ats": {
            "venue": "ATS",
            "venueLabel": "대체거래소",
            "entryWindowStart": "08:00",
            "entryWindowEnd": "08:30",
            "mustFlatBy": "08:30",
        },
        "intradayExits": [
            {"time": "08:15", "label": "1차 익절", "sellRatio": 0.5, "targetPct": 2.0},
            {"time": "08:30", "label": "ATS 전량 청산", "sellRatio": 1.0, "targetPct": 0.0},
        ],
        "krxLiquidation": {
            "at": "09:00",
            "orderType": "limit",
            "label": "잔량 시스템 매도",
        },
    }


def _tick_round(price: float) -> int:
    if price >= 500_000:
        unit = 1000
    elif price >= 100_000:
        unit = 500
    elif price >= 10_000:
        unit = 100
    elif price >= 1_000:
        unit = 50
    else:
        unit = 10
    return int(round(price / unit) * unit)


def _reference_entry_price(ah_row: dict[str, Any]) -> float | None:
    for key in ("expectedOpen", "ahPrice", "ahClose"):
        val = ah_row.get(key)
        if val is not None and float(val) > 0:
            return float(val)
    return None


def build_ats_execution_plan(
    *,
    ah_row: dict[str, Any],
    stop_loss_pct: float = -2.0,
    tp1_pct: float = 2.0,
    entry_weight: float = 0.8,
    schedule: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """ATS 08:00~08:30 매매 + 09:00 KRX 잔량 지정가 매도 플랜."""
    schedule = schedule or _load_schedule()
    ats = schedule.get("ats") or {}
    krx_liq = schedule.get("krxLiquidation") or {}
    analysis = schedule.get("analysis") or {}

    entry_price = _reference_entry_price(ah_row)
    if entry_price is None:
        return {
            "profile": schedule.get("profile", "ats"),
            "error": "entry_price_unavailable",
        }

    entry_price_int = _tick_round(entry_price)
    stop_price = _tick_round(entry_price * (1 + stop_loss_pct / 100))
    tp1_price = _tick_round(entry_price * (1 + tp1_pct / 100))
    expected_open = ah_row.get("expectedOpen")
    krx_open_est = _tick_round(float(expected_open)) if expected_open else tp1_price

    # 09:00 잔량 매도: 추천 지정가 = 예상 시초가 우선, 없으면 1차 익절가
    system_sell_limit = krx_open_est if expected_open else tp1_price
    # 보수적으로 진입가 이하로는 내리지 않음(손절 구간 제외 시)
    system_sell_limit = max(system_sell_limit, entry_price_int)

    intraday = []
    for step in schedule.get("intradayExits") or []:
        ratio = float(step.get("sellRatio", 0))
        target_pct = float(step.get("targetPct", 0))
        limit = _tick_round(entry_price * (1 + target_pct / 100)) if target_pct else entry_price_int
        intraday.append(
            {
                "time": step.get("time"),
                "label": step.get("label"),
                "sellRatio": ratio,
                "limitPrice": limit,
                "targetPct": target_pct,
            }
        )

    return {
        "profile": schedule.get("profile", "ats"),
        "venue": ats.get("venue", "ATS"),
        "venueLabel": ats.get("venueLabel", "대체거래소"),
        "analysisDeadline": analysis.get("deadline", "07:40"),
        "reviewUntil": analysis.get("reviewUntil", "08:00"),
        "entryWindow": {
            "start": ats.get("entryWindowStart", "08:00"),
            "end": ats.get("entryWindowEnd", "08:30"),
        },
        "mustFlatBy": ats.get("mustFlatBy", "08:30"),
        "entryAt": f"{ats.get('entryWindowStart', '08:00')}-{ats.get('entryWindowEnd', '08:30')}",
        "buyOrder": {
            "type": "limit",
            "limitPrice": entry_price_int,
            "note": "ATS 프리마켓 매수 지정가(시간외·예상 시가 참고)",
        },
        "stopLoss": {
            "pct": stop_loss_pct,
            "limitPrice": stop_price,
            "trigger": "immediate_if_breach",
        },
        "intradayExits": intraday,
        "krxLiquidation": {
            "at": krx_liq.get("at", "09:00"),
            "venue": krx_liq.get("venue", "KRX"),
            "orderType": krx_liq.get("orderType", "limit"),
            "label": krx_liq.get("label", "잔량 시스템 매도"),
            "limitPrice": system_sell_limit,
            "appliesTo": "unsold_qty_after_0830",
            "instruction": "08:30까지 미체결·미청산 수량을 09:00 정규장 지정가 매도로 예약",
        },
        "tp1Pct": tp1_pct,
        "tp1Price": tp1_price,
        "entryWeight": entry_weight,
        "expectedKrxOpen": krx_open_est,
    }


def get_execution_schedule_summary() -> dict[str, Any]:
    schedule = _load_schedule()
    ats = schedule.get("ats") or {}
    analysis = schedule.get("analysis") or {}
    deadline = analysis.get("deadline", "07:40")
    review_until = analysis.get("reviewUntil", "08:00")
    return {
        "profile": schedule.get("profile", "ats"),
        "analysis": analysis,
        "reviewWindow": f"{deadline}~{review_until}",
        "ats": {
            "venueLabel": ats.get("venueLabel", "대체거래소"),
            "entryWindow": f"{ats.get('entryWindowStart', '08:00')}~{ats.get('entryWindowEnd', '08:30')}",
            "mustFlatBy": ats.get("mustFlatBy", "08:30"),
        },
        "krxLiquidationAt": (schedule.get("krxLiquidation") or {}).get("at", "09:00"),
    }
