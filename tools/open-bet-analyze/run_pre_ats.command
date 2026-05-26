#!/bin/zsh
# Finder 더블클릭 — 07:40 ATS 직전 분석
setopt local_options no_unset
script_dir=${0:A:h}
exec "$script_dir/run_pre_ats.sh" "$@"
