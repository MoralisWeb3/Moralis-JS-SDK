#!/bin/bash
set -e

echo "Script: $1"

yarn --cwd packages/core build:dev

yarn --cwd packages/evmConnectors/walletConnectWrapper $1
yarn --cwd packages/evmConnectors/EvmConnectorUtils $1
yarn --cwd packages/evmConnectors/EvmMetamaskConnector $1
yarn --cwd packages/evmConnectors/EvmWalletconnectConnector $1
yarn --cwd packages/evmConnectors/EvmMetamaskConnector $1

yarn --cwd packages/evm $1
yarn --cwd packages/evmApi $1
yarn --cwd packages/server $1
yarn --cwd packages/moralis $1

yarn --cwd packages/react $1

yarn --cwd demos/test-app-all $1
yarn --cwd demos/test-node $1
