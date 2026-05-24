@echo off
setlocal

chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

set "PAUSE_AT_END=1"
set "FORWARD_ARGS="
set "SCRIPT_DIR=%~dp0"
set "EXPECT_OUTPUT=1"

:parse_args
if "%~1"=="" goto after_parse
if /i "%~1"=="--no-pause" (
  set "PAUSE_AT_END="
) else if /i "%~1"=="--help" (
  set "EXPECT_OUTPUT="
  call set "FORWARD_ARGS=%%FORWARD_ARGS%% "%~1""
) else if /i "%~1"=="-h" (
  set "EXPECT_OUTPUT="
  call set "FORWARD_ARGS=%%FORWARD_ARGS%% "%~1""
) else (
  call set "FORWARD_ARGS=%%FORWARD_ARGS%% "%~1""
)
shift
goto parse_args

:after_parse
pushd "%SCRIPT_DIR%"

python "%SCRIPT_DIR%run_market_analyze.py"%FORWARD_ARGS%
set "EXITCODE=%ERRORLEVEL%"

if not "%EXITCODE%"=="0" (
  echo.
  echo market-analyze run failed. Exit code: %EXITCODE%
  popd
  if defined PAUSE_AT_END pause
  exit /b %EXITCODE%
)

if defined EXPECT_OUTPUT (
  echo.
  echo Generated files:
  echo   store\results\result-YYYYMMDD.js
  echo   store\results\latest.js
  echo   store\results\manifest.json
)

popd
if defined PAUSE_AT_END pause
exit /b 0
