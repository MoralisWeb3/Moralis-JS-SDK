import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('syncNFTContract', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Resync NFT Contract', () => {
    it('should initiate a sync of previously non synced contracts', async () => {
      const result = await EvmApi.nft.syncNFTContract({
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
      });

      expect(result.result).toBeDefined();
      expect(result.raw).toStrictEqual({ success: true });
    });

    it('should not sync NFT contract of an invalid account and throw an error ', async () => {
      const failedResult = await EvmApi.nft
        .syncNFTContract({
          address: '0x7de308',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.syncNFTContract({
          address: '0x7de308',
        }),
      ).rejects.toThrowError(`[C0005] Invalid address provided`);
    });
  });
});
