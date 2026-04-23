#!/bin/sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
export MOVE_HOME="${MOVE_HOME:-$ROOT_DIR/.move}"

cd "$ROOT_DIR/contracts/cornerstone"
sui move build
