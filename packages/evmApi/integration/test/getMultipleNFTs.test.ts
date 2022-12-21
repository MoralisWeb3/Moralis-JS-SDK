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
