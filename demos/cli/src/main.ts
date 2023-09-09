/* eslint-disable no-console */

import Moralis from 'moralis';
import dotenv from 'dotenv';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function main() {
  const env = readEnv();
  console.info('🔥 CLI demo');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  const block = await Moralis.EvmApi.block.getBlock({
    blockNumberOrHash: '15305775',
    chain: '0x1',
  });
  console.log(block);

  const blockStats = await Moralis.EvmApi.block.getBlockStats({
    blockNumberOrHash: '18091265',
  });
  console.log(blockStats.result);
}

main();
