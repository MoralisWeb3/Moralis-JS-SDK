/* eslint-disable no-console */

import Moralis from 'moralis';
import dotenv from 'dotenv';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function main() {
  const env = readEnv();
  console.info('🔥 test-node');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  // console.log(Moralis.EvmApi.endpoints);

  Moralis.EvmApi.native
    .getBlock({
      blockNumberOrHash: '15305775',
      chain: '0x1',
    })
    .then(result => console.log(result.result));
}

main();
