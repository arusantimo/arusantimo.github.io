#!/bin/zsh

setopt local_options no_unset

pause_at_end=1
if [[ "${1-}" == "--no-pause" ]]; then
  pause_at_end=0
fi

script_dir=${0:A:h}

pushd "$script_dir" >/dev/null || exit 1

if command -v python3 >/dev/null 2>&1; then
  python_cmd=python3
elif command -v python >/dev/null 2>&1; then
  python_cmd=python
else
  echo
  echo "Python interpreter was not found."
  popd >/dev/null || true
  if [[ $pause_at_end -eq 1 ]]; then
    read -r "?Press Enter to close..."
  fi
  exit 127
fi

"$python_cmd" -m jongga.generate_latest --out "jongga/output/latest.json" --bridge-js "jongga/output/jongga_data.js"
exit_code=$?

if [[ $exit_code -ne 0 ]]; then
  echo
  echo "Failed to generate jongga output. Exit code: $exit_code"
  popd >/dev/null || true
  if [[ $pause_at_end -eq 1 ]]; then
    read -r "?Press Enter to close..."
  fi
  exit $exit_code
fi

echo
echo "Generated files:"
echo "  jongga/output/latest.json"
echo "  jongga/output/jongga_data.js"

popd >/dev/null || true
if [[ $pause_at_end -eq 1 ]]; then
  read -r "?Press Enter to close..."
fi
exit 0