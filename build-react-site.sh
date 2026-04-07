#!/bin/zsh

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_BIN="$ROOT_DIR/tools/node-v24.14.1-darwin-arm64/bin"

cd "$ROOT_DIR/react-site"
export PATH="$NODE_BIN:$PATH"

exec npm run build
