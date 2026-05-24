@echo off
setlocal

chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

set "PAUSE_AT_END=1"
if /i "%~1"=="--no-pause" set "PAUSE_AT_END="

pushd "%~dp0"

python -m jongga.generate_latest --out-dir "jongga\output" --history-js "jongga\output\jongga_history.js"
set "EXITCODE=%ERRORLEVEL%"

if not "%EXITCODE%"=="0" (
  echo.
  echo Failed to generate jongga output. Exit code: %EXITCODE%
  popd
  if defined PAUSE_AT_END pause
  exit /b %EXITCODE%
)

echo.
echo Generated files:
echo   jongga\output\latest_YYYYMMDD.json
echo   jongga\output\jongga_data_YYYYMMDD.js
echo   jongga\output\latest_YYYYMMDD_canary.json
echo   jongga\output\jongga_data_YYYYMMDD_canary.js
echo   jongga\output\jongga_history.js

popd
if defined PAUSE_AT_END pause
exit /b 0
