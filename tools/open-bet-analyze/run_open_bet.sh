#!/usr/bin/env bash
# 시가베팅 추천 엔진 — macOS / Linux 터미널용
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAUSE_AT_END=1
ARGS=()

for arg in "$@"; do
  if [[ "$arg" == "--no-pause" ]]; then
    PAUSE_AT_END=0
  else
    ARGS+=("$arg")
  fi
done

export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8
export OPEN_BET_FORCE_COLOR=1

if command -v python3 >/dev/null 2>&1; then
  PYTHON=python3
elif command -v python >/dev/null 2>&1; then
  PYTHON=python
else
  echo "[SH] Python을 찾을 수 없습니다. python3를 설치하세요."
  exit 127
fi

cd "$SCRIPT_DIR" || exit 1

echo ""
echo "  ============================================================"
echo "    시가베팅 추천 엔진 (open-bet-analyze)"
echo "    $(date '+%Y-%m-%d %H:%M:%S')"
echo "  ============================================================"
echo ""

"$PYTHON" "$SCRIPT_DIR/run_open_bet.py" "${ARGS[@]}"
EXITCODE=$?

echo ""
if [[ $EXITCODE -eq 0 ]]; then
  echo "  [SH] 종료 코드: 0 (SUCCESS)"
  echo "  [SH] 결과: store/results/latest.js"
  echo "  [SH] UI: index.html"
else
  echo "  [SH] 종료 코드: ${EXITCODE} (FAILED)"
  echo "  [SH] 위 로그에서 FAIL / 수집 미완료 항목을 확인하세요."
fi
echo ""

if [[ $PAUSE_AT_END -eq 1 ]] && [[ -t 0 ]]; then
  read -r -p "Press Enter to close..."
fi

exit "$EXITCODE"
