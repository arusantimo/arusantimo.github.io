#!/usr/bin/env bash
# 종가베팅 추천 데이터 전체 파이프라인 — macOS / Linux
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
export FORCE_COLOR=1

if command -v python3 >/dev/null 2>&1; then
  PYTHON=python3
elif command -v python >/dev/null 2>&1; then
  PYTHON=python
else
  echo "[SH] Python을 찾을 수 없습니다."
  exit 127
fi

cd "$SCRIPT_DIR" || exit 1

echo ""
echo "  ============================================================"
echo "    종가베팅 추천 데이터 파이프라인 (stock-analyze)"
echo "    $(date '+%Y-%m-%d %H:%M:%S')"
echo "  ============================================================"
echo ""
echo "  [SH] 추천 생성 + 자동 replay 검증 + 화면 브리지 갱신"
echo ""

if [[ ${#ARGS[@]} -gt 0 ]]; then
  "$PYTHON" "$SCRIPT_DIR/run_jongga_pipeline.py" "${ARGS[@]}"
else
  "$PYTHON" "$SCRIPT_DIR/run_jongga_pipeline.py"
fi
EXITCODE=$?

echo ""
if [[ $EXITCODE -eq 0 ]]; then
  echo "  [SH] 종료 코드: 0 (SUCCESS)"
  echo "  [SH] 대시보드: index.html"
else
  echo "  [SH] 종료 코드: ${EXITCODE} (FAILED)"
fi
echo ""

if [[ $PAUSE_AT_END -eq 1 ]] && [[ -t 0 ]]; then
  read -r -p "Press Enter to close..."
fi

exit "$EXITCODE"
