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

    it('should get response when requesting media items (processing)', async () => {
      const response = await EvmApi.nft.getNFTTokenIdOwners({
        address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
        tokenId: '15',
        mediaItems: true,
      });

      const nft = response!.result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('processing');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk015.png');
    });

    it('should get response when requesting media items (success)', async () => {
      const response = await EvmApi.nft.getNFTTokenIdOwners({
        address: '0x4329d392754fd3ae7f4d252ef1b72b17dd6d79fe',
        tokenId: '15',
        mediaItems: true,
      });

      const nft = response!.result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('success');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk015.png');
      expect(nft.media?.category).toBe('image');
      expect(nft.media?.mimetype).toBe('image/png');
      expect(nft.media?.parentHash).toBe('0x88a434cee5ebfcfaeb2723c3f18f4724228c2a82aad7d26af45ca11d8b6ed9a9');
      expect(nft.media?.updatedAt.toISOString()).toBe('2023-03-20T20:14:51.781Z');
      expect(nft.media?.mediaCollection?.high.url).toBe(
        'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x78b818abb115a066f695dd07ca7833348633c212220895ac74a522c6453c3ef2/high.png',
      );
      expect(nft.media?.mediaCollection?.high.width).toBe(500);
      expect(nft.media?.mediaCollection?.high.height).toBe(500);
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
