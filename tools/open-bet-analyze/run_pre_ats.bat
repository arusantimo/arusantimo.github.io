@echo off
REM 07:40 ATS 직전 분석 (기본 운용)
REM   - 07:40 배치 완료
REM   - 07:40~08:00 종목 검토
REM   - 08:00~08:30 대체거래소 매매

setlocal
cd /d "%~dp0"
call run_open_bet.bat --phase pre_ats %*
