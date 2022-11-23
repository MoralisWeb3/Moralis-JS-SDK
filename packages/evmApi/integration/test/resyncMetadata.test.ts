import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('resyncMetadata', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Resync NFT Metadata', () => {
    it('should Resync the metadata for an NFT when valid params are provided', async () => {
      const result = await EvmApi.nft.reSyncMetadata({
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
        tokenId: '15',
      });
      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
    });

    it('should not Resync the metadata for an NFT when an invalid address is provided and throw an error', async () => {
      expect(
        EvmApi.nft.reSyncMetadata({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88',
          tokenId: '15',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('should not Resync the metadata for an NFT when an invalid token ID is provided and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .reSyncMetadata({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
          tokenId: '000000215',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.reSyncMetadata({
          address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
          tokenId: '000000215',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided');
    });
  });
});
