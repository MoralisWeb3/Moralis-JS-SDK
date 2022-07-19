#!/bin/bash
set -e

SCRIPT=$1

echo "* script: $1"

run () {
  echo "* package: $1"
   yarn --cwd $1 $SCRIPT
}

run packages/core

run packages/api
run packages/evmApi
run packages/solApi
run packages/moralis

run demos/test-node
