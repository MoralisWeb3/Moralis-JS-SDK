#!/bin/bash
set -e

SCRIPT=$1

function run() {
  echo "* Package: $1"
  echo "* Script: $SCRIPT"
  yarn --cwd $1 $SCRIPT
}

yarn --cwd packages/evmConnectors/walletConnectWrapper $1
yarn --cwd packages/evmConnectors/EvmConnectorUtils $1
yarn --cwd packages/evmConnectors/EvmMetamaskConnector $1
yarn --cwd packages/evmConnectors/EvmWalletconnectConnector $1
yarn --cwd packages/evmConnectors/EvmMetamaskConnector $1
yarn --cwd packages/evmConnectors/EvmMagiclinkConnector $1

run packages/evmConnectors/walletConnectWrapper
run packages/evmConnectors/EvmConnectorUtils
run packages/evmConnectors/EvmWalletconnectConnector
run packages/evmConnectors/EvmMetamaskConnector
run packages/evmConnectors/EvmWeb3authConnector

run packages/evm
run packages/evmApi
run packages/server
run packages/moralis

run demos/test-app-all
run demos/test-node
