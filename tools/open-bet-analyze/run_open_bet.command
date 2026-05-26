#!/bin/zsh
# Finder 더블클릭 실행 (macOS) — 터미널이 열린 뒤 run_open_bet.sh 실행
setopt local_options no_unset
script_dir=${0:A:h}
export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8
export OPEN_BET_FORCE_COLOR=1
exec "$script_dir/run_open_bet.sh" "$@"
