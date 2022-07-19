#!/bin/bash
set -e

echo "Script: $1"

yarn --cwd packages/core  $1

yarn --cwd packages/api $1
yarn --cwd packages/evmApi $1
yarn --cwd packages/moralis $1

yarn --cwd demos/test-node $1
