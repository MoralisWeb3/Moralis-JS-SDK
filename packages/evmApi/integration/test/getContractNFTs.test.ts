import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getContractNFTs', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get Contract NFTs', () => {
    it('should get NFTs for a given contract address', async () => {
      const result = await EvmApi.nft.getContractNFTs({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        disableTotal: false,
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.amount).toEqual('1');
      expect(response?.block_number).toBe('88256');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.token_id).toBe('15');
      expect(response?.possible_spam).toBe(false);
    });

    it('should get response when requesting media items (processing)', async () => {
      const { result } = await EvmApi.nft.getContractNFTs({
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
      const { result } = await EvmApi.nft.getContractNFTs({
        address: '0x00625c59f4a63a1352612663eb2a6717bfa8433b',
        mediaItems: true,
        limit: 1,
      });

      const nft = result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('success');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk9082.png');
      expect(nft.media?.category).toBe('image');
      expect(nft.media?.mimetype).toBe('image/png');
      expect(nft.media?.parentHash).toBe('0x21ba1263dd63696f0d9ede101b00a4e2f4985a854483076c92a3415624fca051');
      expect(nft.media?.updatedAt?.toISOString()).toBe('2023-03-17T14:12:24.192Z');
      expect(nft.media?.mediaCollection?.high.url).toBe(
        'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0xed1b0d5a973a63694e3d8cfb1a5ace4485b37eba2a7ea846a1f5e52ba934be0e/high.png',
      );
      expect(nft.media?.mediaCollection?.high.width).toBe(500);
      expect(nft.media?.mediaCollection?.high.height).toBe(500);
    });

    it('should not get NFTs for for an invalid contract address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getContractNFTs({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
          disableTotal: true,
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getContractNFTs({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
