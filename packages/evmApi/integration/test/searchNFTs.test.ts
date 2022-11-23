import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('searchNFTs', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Search NFTs', () => {
    it('should get NFTs that match a given metadata search query', async () => {
      const result = await EvmApi.nft.searchNFTs({
        q: '889',
      });
      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
    });

    it('should throw an error when an invalid search parameter is provided', async () => {
      expect(
        EvmApi.nft.searchNFTs({
          q: 'Pancake',
        }),
      ).rejects.toThrowError('[C0005] Invalid search parameter provided');
    });
  });
});
