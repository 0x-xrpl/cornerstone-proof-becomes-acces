#!/bin/sh
set -eu

sui client switch --env localnet
sui client active-address
