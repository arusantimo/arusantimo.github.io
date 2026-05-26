@echo off
setlocal EnableExtensions

chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "OPEN_BET_FORCE_COLOR=1"

set "SCRIPT_DIR=%~dp0"
set "PAUSE_AT_END=1"
set "FORWARD_ARGS="

:parse_args
if "%~1"=="" goto after_parse
if /i "%~1"=="--no-pause" (
  set "PAUSE_AT_END="
  shift
  goto parse_args
)
call set "FORWARD_ARGS=%%FORWARD_ARGS%% %1"
shift
goto parse_args

:after_parse
pushd "%SCRIPT_DIR%"

echo.
echo  ============================================================
echo    시가베팅 추천 엔진 (open-bet-analyze)
echo    %DATE% %TIME%
echo  ============================================================
echo.

python "%SCRIPT_DIR%run_open_bet.py"%FORWARD_ARGS%
set "EXITCODE=%ERRORLEVEL%"

echo.
if "%EXITCODE%"=="0" (
  echo  [BAT] 종료 코드: 0 ^(SUCCESS^)
  echo  [BAT] 결과: store\results\latest.js
  echo  [BAT] UI: index.html
) else (
  echo  [BAT] 종료 코드: %EXITCODE% ^(FAILED^)
  echo  [BAT] 위 로그에서 FAIL / 수집 미완료 항목을 확인하세요.
)
echo.

popd
if defined PAUSE_AT_END pause
exit /b %EXITCODE%
