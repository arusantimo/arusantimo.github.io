#!/bin/zsh
# Finder 더블클릭 — 종가베팅 replay 재검증
setopt local_options no_unset

script_dir=${0:A:h}
pause_at_end=1
args=()

for arg in "$@"; do
  if [[ "$arg" == "--no-pause" ]]; then
    pause_at_end=0
  else
    args+=("$arg")
  fi
done

export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8
export FORCE_COLOR=1

pushd "$script_dir" >/dev/null || exit 1

echo
echo "  [COMMAND] replay-only 검증 + 화면 브리지 갱신"
echo

if command -v python3 >/dev/null 2>&1; then
  python_cmd=python3
elif command -v python >/dev/null 2>&1; then
  python_cmd=python
else
  echo
  echo "Python interpreter was not found."
  popd >/dev/null || true
  if [[ $pause_at_end -eq 1 ]]; then
    read -r "?Press Enter to close..."
  fi
  exit 127
fi

"$python_cmd" "$script_dir/run_jongga_pipeline.py" --replay-only "${args[@]}"
exit_code=$?

if [[ $exit_code -ne 0 ]]; then
  echo
  echo "Replay-only pipeline failed. Exit code: $exit_code"
fi

popd >/dev/null || true
if [[ $pause_at_end -eq 1 ]]; then
  read -r "?Press Enter to close..."
fi
exit $exit_code
