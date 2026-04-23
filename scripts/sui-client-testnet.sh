#!/bin/sh
set -eu

sui client switch --env testnet
sui client active-address
