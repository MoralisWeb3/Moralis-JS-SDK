#!/bin/bash
set -e

SCRIPT=$1

function run() {
  echo "* Package: $1"
  echo "* Script: $SCRIPT"
  yarn --cwd $1 $SCRIPT
}

run packages/core

run packages/evmConnectors/walletConnectWrapper
run packages/evmConnectors/EvmConnectorUtils
run packages/evmConnectors/EvmWalletconnectConnector
run packages/evmConnectors/EvmMetamaskConnector
run packages/evmConnectors/EvmWeb3authConnector
run packages/evmConnectors/EvmMagiclinkConnector

run packages/evm
run packages/evmApi
run packages/server
run packages/moralis

run demos/test-app-all
run demos/test-node

