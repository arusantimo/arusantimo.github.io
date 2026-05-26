@echo off
REM fetch 진단 (naver / toss / yahoo 등)
setlocal
cd /d "%~dp0"
call run_open_bet.bat --diagnostics %*
