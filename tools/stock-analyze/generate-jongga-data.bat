@echo off
setlocal

set "PAUSE_AT_END=1"
if /i "%~1"=="--no-pause" set "PAUSE_AT_END="

pushd "%~dp0"

python -m jongga.generate_latest --out "jongga\output\latest.json" --bridge-js "jongga\output\jongga_data.js"
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
echo   jongga\output\latest.json
echo   jongga\output\jongga_data.js

popd
if defined PAUSE_AT_END pause
exit /b 0