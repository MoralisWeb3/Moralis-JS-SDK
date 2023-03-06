// To run this script: node fetch-chaindata.js
// You must have compiled this package before running this script.

const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { Core, CoreProvider } = require('@moralisweb3/common-core');
const { EvmChain } = require('@moralisweb3/common-evm-utils');

const url = 'https://chainid.network/chains.json';

async function fetchChainData() {
  const response = await axios.get(url);
  return response.data;
}

function getSupportedChainIds() {
  CoreProvider.setDefault(Core.create());

  const networks = Object.getOwnPropertyNames(EvmChain);
  return networks.filter((name) => name.toUpperCase() === name).map((name) => EvmChain[name].decimal);
}

function generateFile(items) {
  const tsPath = path.join(__dirname, '../src/data/chaindata.ts');
  const content = `/* eslint-disable no-template-curly-in-string */
import { EvmChainListDataEntry } from './types';

// source: ${url}
export const chainList: EvmChainListDataEntry[] = ${JSON.stringify(items, null, 2)};`;
  fs.writeFileSync(tsPath, content, 'utf-8');
}

async function main() {
  const supportedChainIds = getSupportedChainIds();
  const items = await fetchChainData();

  const filteredItems = items.filter((item) => {
    return supportedChainIds.includes(item.chainId);
  });

  generateFile(filteredItems);

  console.log(`🐝 Supported chains: ${supportedChainIds.length} (${supportedChainIds.join(', ')})`);
  console.log(`🦋 Found items: ${filteredItems.length}`);
}

main();
