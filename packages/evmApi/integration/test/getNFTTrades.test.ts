import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTrades', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Trades', () => {
    it('should get trades of NFTs for a given contract and marketplace', async () => {
      const result = await EvmApi.nft.getNFTTrades({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.transaction_hash).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
      expect(response?.block_number).toBe('13680123');
      expect(response?.block_hash).toBe('0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96');
      expect(response?.transaction_hash).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
    });

    it('should not get the trades of NFTs for an invalid address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTrades({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTrades({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
