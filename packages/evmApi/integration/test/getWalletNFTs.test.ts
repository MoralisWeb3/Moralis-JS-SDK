import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletNFTs', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFTs By Wallet', () => {
    it('should get the NFTs owned by a given valid address', async () => {
      const result = await EvmApi.nft.getWalletNFTs({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.token_address).toBe('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');
      expect(response?.token_hash).toBe('502cee781b0fb40ea02508b21d319ced');
    });

    it('should not get the NFTs and throw a 400 Error on invalid address', async () => {
      const failedResult = await EvmApi.nft
        .getWalletNFTs({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getWalletNFTs({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
