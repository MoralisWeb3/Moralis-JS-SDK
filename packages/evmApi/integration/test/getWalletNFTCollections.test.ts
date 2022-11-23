import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletNFTCollections', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Collections By Wallet', () => {
    it('should get the NFT Collections owned by a given wallet address when a valid address is provided', async () => {
      const result = await EvmApi.nft.getWalletNFTCollections({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.token_address).toEqual('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');
      expect(response?.name).toBe('CryptoKitties');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.symbol).toBe('RARI');
    });

    it('should not get the NFT Collections when an invalid address is provided and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getWalletNFTCollections({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getWalletNFTCollections({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
