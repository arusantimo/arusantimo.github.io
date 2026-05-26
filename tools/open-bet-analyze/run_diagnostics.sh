#!/usr/bin/env bash
# fetch 진단 (naver / yahoo 등)
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/run_open_bet.sh" --diagnostics "$@"
