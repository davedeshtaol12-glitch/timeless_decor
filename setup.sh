#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Install Node.js 24 or newer from https://nodejs.org/ first.' >&2
  exit 1
fi
timeless_node_major="$(node -p "process.versions.node.split('.')[0]")"
if [ "$timeless_node_major" -lt 24 ]; then
  printf '%s\n' 'This project uses Node.js 24 or newer.' >&2
  exit 1
fi
if [ -f package-lock.json ]; then npm ci; else npm install; fi
if [ "${1:-}" = '--start' ]; then exec npm run dev; fi
printf '%s\n' 'Timeless is ready. Run npm run dev, then open http://localhost:3000.'
