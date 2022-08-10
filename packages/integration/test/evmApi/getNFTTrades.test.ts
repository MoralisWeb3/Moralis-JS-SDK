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

  it('should get the NFT trades of an account', async () => {
    const result = await evmApi.token.getNFTTrades({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result.raw.total).toBe(53);
    expect(result).toBeDefined();
  });

  it('should not get the NFT trades and return an error code for an invalid address', async () => {
    const failedResult = await evmApi.token
      .getNFTTrades({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.token.getNFTTrades({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
