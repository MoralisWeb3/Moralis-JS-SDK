/* eslint-disable no-console */

import Moralis from 'moralis';
import dotenv from 'dotenv';
import { testSolanaAccount, testSolanaNft } from './SolApi';
import { testEvm } from './EvmApi';
import { getSmoketestStats } from './Smoketest';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function main() {
  const env = readEnv();
  console.info('🔥 test-node');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  await testSolanaAccount();
  await testSolanaNft();

  await testEvm();

  const stats = getSmoketestStats();
  console.log(`⏩ successCount = ${stats.successCount}`);
  console.log(`⏩ errorCount = ${stats.errorCount}`);
}

main();
