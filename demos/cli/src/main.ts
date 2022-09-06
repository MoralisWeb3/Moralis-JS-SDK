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

  const collection = await Moralis.EvmApi.nft.getWalletNFTCollections({
    address: '0xbf48C4f51dD8C1a396386380c80EBfe667b3c1A7',
    chain: '0x1',
  });
  console.log(collection.raw);

}

main();
