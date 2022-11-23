import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTLowestPrice', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Lowest Price', () => {
    it('should get the lowest executed price for an NFT contract', async () => {
      const result = await EvmApi.nft.getNFTLowestPrice({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result?.raw.seller_address).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
      expect(result?.raw.transaction_hash).toEqual('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
      expect(result?.raw.block_number).toBe('13680123');
    });

    it('should not get the lowest executed price when an invalid address is provided and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTLowestPrice({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTLowestPrice({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
