import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTransfersFromToBlock', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the NFT transfers from to block of a hash', async () => {
    const result = await evmApi.nft.getNFTTransfersFromToBlock({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      fromBlock: 1,
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(118072744);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT transfers from to block of an invalid block number and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTTransfersFromToBlock({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        fromBlock: 1,
      })
      .then()
      .catch((err) => {
        return err;
      });
    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTTransfersFromToBlock({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        fromBlock: 1,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
