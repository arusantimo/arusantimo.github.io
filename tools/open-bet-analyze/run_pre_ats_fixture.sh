#!/usr/bin/env bash
# 샘플 데이터로 파이프라인·로그 검증 (장외 시간용)
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/run_open_bet.sh" --phase pre_ats --fixture "$@"
