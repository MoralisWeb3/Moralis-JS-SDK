/* eslint-disable no-console */

import Moralis from 'moralis';
import dotenv from 'dotenv';
import { getTestStats } from './Tester';
import { testSolanaAccount, testSolanaNft } from './SolApi';
import { testEvmAccount, testEvmInfo, testEvmResolve } from './EvmApi';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function main() {
  const env = readEnv();
  console.info('🔥 test-node');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  await Promise.all([testSolanaAccount(), testSolanaNft(), testEvmInfo(), testEvmAccount(), testEvmResolve()]);

  const stats = getTestStats();
  console.log(`⏩ successCount = ${stats.successCount}`);
  console.log(`⏩ errorCount = ${stats.errorCount}`);

  process.exitCode = Math.min(1, stats.errorCount);
}

main();
