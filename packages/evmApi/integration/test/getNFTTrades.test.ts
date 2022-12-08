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
        address: '0x9c57d0278199c931cf149cc769f37bb7847091e7',
        limit: 1,
      });

      expect(result.result.length).toBe(1);
      expect(result.pagination.page).toBe(0);
      expect(result.pagination.pageSize).toBe(1);
      expect(result.pagination.total).toBe(2000);
      expect(result.hasNext()).toBe(true);

      const trade = result.result[0];
      expect(trade.transactionHash).toBe('0xb30df59495a8a432b8e3d38f406aaeaad363592dbd02cf2ef4ada7643fc3861c');
      expect(trade.transactionIndex).toBe(254);
      expect(trade.tokenIds).toContain('7781');
      expect(trade.sellerAddress.lowercase).toBe('0xc970bd05d27466f10e0d1c8653d6bca217ef04f2');
      expect(trade.buyerAddress.lowercase).toBe('0x9f7509cdc8b846c65482f5d2829ab47360095d82');
      expect(trade.tokenAddress.lowercase).toBe('0x9c57d0278199c931cf149cc769f37bb7847091e7');
      expect(trade.marketplaceAddress.lowercase).toBe('0x00000000006c3852cbef3e08e8df289169ede581');
      expect(trade.price.wei).toBe('69990000000000000');
      expect(trade.blockTimestamp.getTime()).toBe(1670286731000);
      expect(trade.blockNumber.toString()).toBe('16122185');
      expect(trade.blockHash).toBe('0xd01990eb290c77fe3e7db77a83c0ff465cc3dd5f74b9eb53d9b2c2ea178c7009');
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
