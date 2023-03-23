import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getMultipleNFTs', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get Multiple NFTs', () => {
    it('should get NFTs of a specified token', async () => {
      const { result } = await EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
            tokenId: '1234',
          },
        ],
      });
      const token = result[0]!;
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(token.tokenId).toBe('1234');
    });

    it('should return null for non-found NFTs', async () => {
      const { result } = await EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
            tokenId: '9999999999',
          },
        ],
      });
      const token = result[0];
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(token).toBe(null);
    });

    it('should get NFTs of a multiple tokens', async () => {
      const { result } = await EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
            tokenId: '1234',
          },
          {
            tokenAddress: '0x8698bf7cdef5a23b8dfc319e7c4236dcc7149380',
            tokenId: '12',
          },
        ],
      });
      const token1 = result[0]!;
      const token2 = result[1]!;
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(token1.tokenId).toBe('1234');
      expect(token2.tokenId).toBe('12');
    });

    it('should get response when requesting media items (processing)', async () => {
      const response = await EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
            tokenId: '1234',
          },
        ],
        mediaItems: true,
      });

      const nft = response!.result[0]!;

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('processing');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk015.png');
    });

    it('should get response when requesting media items (success)', async () => {
      const response = await EvmApi.nft.getMultipleNFTs({
        tokens: [
          {
            tokenAddress: '0x4329d392754fd3ae7f4d252ef1b72b17dd6d79fe',
            tokenId: '1234',
          },
        ],
        mediaItems: true,
      });

      const nft = response!.result[0]!;

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

    it('should throw an error on invalid address', async () => {
      const request = EvmApi.nft.getMultipleNFTs({
        tokens: [],
      });

      await expect(request).rejects.toThrowError(
        '[C0006] Request failed, Bad Request(400): tokens must be an array, tokens must contain not more than 25 elements, tokens must contain at least 1 elements',
      );
    });
  });
});
