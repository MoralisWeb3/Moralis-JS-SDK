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

    it('should get response when requesting media items (processing)', async () => {
      const { result } = await EvmApi.nft.getWalletNFTs({
        address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
        mediaItems: true,
        limit: 1,
      });

      const nft = result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('processing');
      expect(nft.media?.originalMediaUrl).toBe(
        'https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format',
      );
    });

    it('should get response when requesting media items (success)', async () => {
      const { result } = await EvmApi.nft.getWalletNFTs({
        address: '0x00625c59f4a63a1352612663eb2a6717bfa8433b',
        mediaItems: true,
        limit: 1,
      });

      const nft = result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('success');
      expect(nft.media?.originalMediaUrl).toBe(
        'https://i.seadn.io/gcs/files/4c1618ad9dfd7bfe280c82354ce07812.png?w=500&auto=format',
      );
      expect(nft.media?.category).toBe('image');
      expect(nft.media?.mimetype).toBe('image/png');
      expect(nft.media?.parentHash).toBe('0x4df48bc51cd3fecb22c69a79bffc1dbad03def485aa8e0bb3eaabd9d8516e627');
      expect(nft.media?.updatedAt.toISOString()).toBe('2023-03-22T14:58:14.880Z');
      expect(nft.media?.mediaCollection?.high.url).toBe(
        'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x495f947276749ce646f68ac8c248420045cb7b5e/0x21679e75b63fa1774f87b8a83294991f5b93430566f60f364947b8839b81056d/high.png',
      );
      expect(nft.media?.mediaCollection?.high.width).toBe(500);
      expect(nft.media?.mediaCollection?.high.height).toBe(500);
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
