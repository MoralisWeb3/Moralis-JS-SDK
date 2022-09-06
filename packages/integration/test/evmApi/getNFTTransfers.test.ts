import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getNFTTransfers', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the transfers of the tokens matching the given parameters', async () => {
    const result = await evmApi.nft.getNFTTransfers({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      tokenId: '18',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw.total).toBe(1);
  });
  it('should not get the wallet token Id transfers of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTTransfers({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        tokenId: '18',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTTransfers({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        tokenId: '18',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
