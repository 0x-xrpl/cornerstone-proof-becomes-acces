#!/bin/sh
set -eu

cd "$(dirname "$0")/../contracts/cornerstone"
sui client publish --gas-budget 100000000
