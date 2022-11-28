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
