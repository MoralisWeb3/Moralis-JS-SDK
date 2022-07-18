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
  } catch (e: any) {
    console.log(e.message);
    console.error(`❌ ${key} = ${e}`);
  }
}

async function main() {
  const env = readEnv();
  console.info('🔥 test-node');

  Moralis.start({
    serverUrl: env['MORALIS_SERVER_URL'],
    appId: env['MORALIS_APP_ID'],
  });

  await test('Api version', async () => {
    return Moralis.EvmApi.info.web3ApiVersion();
  });

  await test('Resolve address', () => {
    return Moralis.EvmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });
  });

  await test('IPFS file', () => {
    return Moralis.Server.fetchIPFS('QmUfpsyqc4hwozotRo4woyi5fJqvfcej5GcFvKiWoY6xr6');
  });
}

main();
