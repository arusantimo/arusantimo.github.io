@echo off
setlocal EnableExtensions

chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "FORCE_COLOR=1"

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
echo    종가베팅 추천 데이터 파이프라인 (stock-analyze)
echo    %DATE% %TIME%
echo  ============================================================
echo.
echo  [1] 환경 점검
echo  [2] jongga.generate_latest (stable + canary + 레거시 브리지)
echo  [3] jongga.replay_backtest (stable/current 최근 거래일 자동 검증)
echo  [4] 산출물 검증 + 화면 브리지 갱신
echo  (단위 테스트: --with-tests)
echo.

python "%SCRIPT_DIR%run_jongga_pipeline.py"%FORWARD_ARGS%
set "EXITCODE=%ERRORLEVEL%"

echo.
if "%EXITCODE%"=="0" (
  echo  [BAT] 종료 코드: 0 ^(SUCCESS^)
  echo  [BAT] 대시보드: index.html
  echo  [BAT] 오늘 데이터: jongga\output\jongga_data_YYYYMMDD.js
) else (
  echo  [BAT] 종료 코드: %EXITCODE% ^(FAILED^)
  echo  [BAT] 위 로그에서 FAIL / 누락 파일을 확인하세요.
)
echo.

popd
if defined PAUSE_AT_END pause
exit /b %EXITCODE%
