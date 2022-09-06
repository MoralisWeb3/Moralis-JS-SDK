import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getNFTContractTransfers', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the contract of NFT transfers of an account', async () => {
    const result = await evmApi.nft.getNFTContractTransfers({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(900);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the contract of NFT transfers of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTContractTransfers({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTContractTransfers({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
