import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTransfers', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Transfers', () => {
    it('should get the transfers of an NFT given a valid contract address and token ID', async () => {
      const { result, pagination } = await EvmApi.nft.getNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        tokenId: '15',
      });

      const nft = result[0]!;

      expect(result).toBeDefined();
      expect(pagination.total).toBe(2000);
      expect(nft.amount).toEqual(1);
      expect(nft.blockNumber.toString()).toBe('88256');
      expect(nft.contractType).toBe('ERC721');
      expect(nft.tokenId).toBe('15');
      expect(nft.possibleSpam).toBe(false);
      expect(nft.value?.wei).toBe('1000000000000000');
    });

    it('should not get the transfers of an NFT given an invalid contract address and a valid token ID', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
          tokenId: '15',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
          tokenId: '15',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('should not get the transfers of an NFT given a valid contract address and invalid token ID', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
          tokenId: '000000215',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
          tokenId: '000000215',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Bad Request(400): [C0005] Invalid TokenId provided');
    });
  });
});
