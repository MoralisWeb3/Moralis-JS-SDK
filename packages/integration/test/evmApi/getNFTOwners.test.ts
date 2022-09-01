import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getNFTOwners', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get NFT owners', async () => {
    const result = await evmApi.nft.getNFTOwners({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      format: 'decimal',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(10);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get NFT owners of an invalid address and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTOwners({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTOwners({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
