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
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.amount).toEqual('1');
      expect(response?.block_number).toBe('88256');
      expect(response?.contract_type).toBe('ERC721');
      expect(response?.token_id).toBe('15');
    });

    it('should not get NFTs for for an invalid contract address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getContractNFTs({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
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
