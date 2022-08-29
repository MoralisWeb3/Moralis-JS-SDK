import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns a data', async () => {
    const result = await evmApi.token.getTokenAllowance({
      address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      ownerAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      spenderAddress: '0xfc0cb34deae994432fe8a11bf54d90bdf54ca8c1',
    });

    expect(result).toBeDefined();
    expect(result.result.allowance.toString()).toEqual('0');
  });
});
