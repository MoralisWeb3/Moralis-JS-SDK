import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTokenIdOwners', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Token Id Owners', () => {
    it('should get owners of a specific NFT given a valid contract address and token ID', async () => {
      const result = await EvmApi.nft.getNFTTokenIdOwners({
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
        tokenId: '15',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.name).toEqual('CryptoKitties');
      expect(response?.block_number).toBe('88256');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.token_id).toBe('15');
    });

    it('should not get owners of a specific NFT given an invalid contract address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTokenIdOwners({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88',
          tokenId: '15',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTokenIdOwners({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88',
          tokenId: '15',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('should not get owners of a specific NFT given an invalid tokenId and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTokenIdOwners({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
          tokenId: '000000215',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTokenIdOwners({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
          tokenId: '000000215',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided');
    });
  });
});
