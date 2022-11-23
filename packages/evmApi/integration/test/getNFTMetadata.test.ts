import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTMetadata', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Metadata', () => {
    it('should get NFT metadata for a valid NFT token ID and contract address', async () => {
      const result = await EvmApi.nft.getNFTMetadata({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        tokenId: '15',
      });

      const response = result?.raw;

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(response?.token_hash).toEqual('502cee781b0fb40ea02508b21d319ced');
      expect(response?.block_number).toBe('88256');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.token_id).toBe('15');
      expect(response?.name).toEqual('CryptoKitties');
      expect(response?.token_address).toEqual('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');
    });

    it('should not get NFT metadata for an invalid NFT contract address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
          tokenId: '15',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
          tokenId: '15',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('should not get NFT metadata for an invalid token ID and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
          tokenId: '000000215',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
          tokenId: '000000215',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided');
    });
  });
});
