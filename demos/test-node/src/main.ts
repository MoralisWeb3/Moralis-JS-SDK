/* eslint-disable no-console */
import Moralis from 'moralis';
import dotenv from 'dotenv';

function readEnv(): { [key: string]: string } {
  return dotenv.config().parsed as { [key: string]: string };
}

async function test(key: string, getValue: () => Promise<unknown>) {
  try {
    const value = await getValue();
    console.log(`✅ ${key} = ${JSON.stringify(value)}`);
  } catch (e) {
    console.error(`❌ ${key} = ${e}`);
  }
}

async function main() {
  const env = readEnv();
  console.info('🔥 test-node');

  Moralis.start({
    apiKey: env['MORALIS_API_KEY'],
  });

  await test('Api version', () => {
    return Moralis.EvmApi.info.web3ApiVersion();
  });

  await test('Resolve address', () => {
    return Moralis.EvmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });
  });
}

main();
