@echo off
REM 샘플 데이터로 파이프라인·로그 UI 검증 (장외 시간용)
setlocal
cd /d "%~dp0"
call run_open_bet.bat --phase pre_ats --fixture %*
