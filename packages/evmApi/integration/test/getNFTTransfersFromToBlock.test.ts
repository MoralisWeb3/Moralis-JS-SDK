import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTransfersFromToBlock', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the NFT transfers from to block of a hash', async () => {
    const result = await evmApi.nft.getNFTTransfersFromToBlock({
      fromBlock: 1,
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(118072744);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT transfers from to block of an invalid block number and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTTransfersFromToBlock({
        fromBlock: 1,
      })
      .then()
      .catch((err) => {
        return err;
      });
    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTTransfersFromToBlock({
        fromBlock: 1,
        chain: 'invalid_chain',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`);
  });
});
