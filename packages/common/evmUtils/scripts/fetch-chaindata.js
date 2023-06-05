/* eslint-disable */

// To run this script: node fetch-chaindata.js
// You must have compiled this package before running this script.

import axios from 'axios';
import fs from 'fs';
import { EvmChain } from '@moralisweb3/common-evm-utils';

const DATASET_URL = 'https://chainid.network/chains.json';
const SKIP_CHAIN_IDS = [
  2020, // Ronin, the dataset contains an invalid data for this chain.
];

async function fetchChainData() {
  const response = await axios.get(DATASET_URL);
  return response.data;
}

function getSupportedChainIds() {
  return EvmChain.values()
    .map((chain) => chain.decimal)
    .filter((chainId) => !SKIP_CHAIN_IDS.includes(chainId));
}

function generateFile(items) {
  const tsPath = '../src/data/chaindata.ts';
  const content = `/* eslint-disable no-template-curly-in-string */
import { EvmChainListDataEntry } from './types';

// source: ${DATASET_URL}
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
