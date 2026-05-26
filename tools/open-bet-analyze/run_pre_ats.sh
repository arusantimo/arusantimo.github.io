#!/usr/bin/env bash
# 07:40 ATS 직전 분석 (일상 운용)
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/run_open_bet.sh" --phase pre_ats "$@"
