import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getTokenMetadata', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns metadata', async () => {
    const result = await evmApi.token.getTokenMetadata({
      addresses: ['0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'],
    });

    const metadata = result.result[0];
    expect(metadata).toBeDefined();
    expect(metadata.token.contractAddress.lowercase).toEqual('0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce');
    expect(metadata.token.name).toEqual('SHIBA INU');
    expect(metadata.token.symbol).toEqual('SHIB');
    expect(metadata.token.decimals).toEqual(18);
  });
});
