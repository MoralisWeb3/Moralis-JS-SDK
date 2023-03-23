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

    it('should get response when requesting media items (processing)', async () => {
      const response = await EvmApi.nft.getNFTMetadata({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        tokenId: '15',
        mediaItems: true,
      });

      const nft = response!.result;

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('processing');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk015.png');
    });

    it('should get response when requesting media items (success)', async () => {
      const response = await EvmApi.nft.getNFTMetadata({
        address: '0x4329d392754fd3ae7f4d252ef1b72b17dd6d79fe',
        tokenId: '15',
        mediaItems: true,
      });

      const nft = response!.result;

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
