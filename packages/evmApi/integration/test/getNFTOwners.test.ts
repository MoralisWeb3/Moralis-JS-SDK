import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTOwners', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Owners', () => {
    it('should return a collection of NFT owners when a valid address is provided', async () => {
      const result = await EvmApi.nft.getNFTOwners({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.amount).toEqual('1');
      expect(response?.name).toBe('CryptoKitties');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.symbol).toBe('RARI');
    });

    it('should get response when requesting media items (processing)', async () => {
      const { result } = await EvmApi.nft.getNFTOwners({
        address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
        mediaItems: true,
        limit: 1,
      });

      const nft = result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('processing');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk5196.png');
    });

    it('should get response when requesting media items (success)', async () => {
      const { result } = await EvmApi.nft.getNFTOwners({
        address: '0x00625C59F4a63A1352612663eB2a6717bFa8433B',
        mediaItems: true,
        limit: 1,
      });

      const nft = result[0];

      expect(nft.media).toBeDefined();
      expect(nft.media?.status).toBe('success');
      expect(nft.media?.originalMediaUrl).toBe('https://www.larvalabs.com/cryptopunks/cryptopunk2318.png');
      expect(nft.media?.category).toBe('image');
      expect(nft.media?.mimetype).toBe('image/png');
      expect(nft.media?.parentHash).toBe('0x214d595a6f82929f2c202ce5ebea95525c2368b8106ffb5b911ef5fa80c63f7a');
      expect(nft.media?.updatedAt.toISOString()).toBe('2023-03-22T15:51:25.836Z');
      expect(nft.media?.mediaCollection?.high.url).toBe(
        'https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/0x07b2dc02b9684b0238e4c00fd4c0a9bb1383ffc2a13adf506c81cc13b5a9787a/high.png',
      );
      expect(nft.media?.mediaCollection?.high.width).toBe(500);
      expect(nft.media?.mediaCollection?.high.height).toBe(500);
    });

    it('should not return a collection of NFT owners when an invalid address is provided', async () => {
      const failedResult = await EvmApi.nft
        .getNFTOwners({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTOwners({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('returns owners with pagination', async () => {
      let response = await EvmApi.nft.getNFTOwners({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      expect(response.pagination.total).toEqual(2000);
      expect(response.pagination.pageSize).toEqual(100);
      expect(response.hasNext()).toEqual(true);

      response = await response.next();

      expect(response.pagination.total).toEqual(2000);
      expect(response.pagination.page).toEqual(2);
      expect(response.pagination.pageSize).toEqual(100);
      expect(response.hasNext()).toEqual(true);
    });
  });
});
