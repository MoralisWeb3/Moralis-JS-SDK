import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTransfersFromToBlock', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFTs Transfers From block to block', () => {
    it('should get transfers of NFTs from a block number to a block number', async () => {
      const { result, pagination } = await EvmApi.nft.getNFTTransfersFromToBlock({
        fromBlock: 1,
        toBlock: 2,
      });

      const transfer = result[0]!;

      expect(transfer).toBeDefined();
      expect(pagination.total).toBe(2000);
      expect(transfer.amount).toEqual(1);
      expect(transfer.blockNumber.toString()).toBe('88256');
      expect(transfer.contractType).toBe('ERC721');
      expect(transfer.tokenId).toBe('15');
      expect(transfer.possibleSpam).toBe(false);
      expect(transfer.value?.wei).toBe('1000000000000000');
    });

    it('should not get the NFT transfers from to block of an invalid block number and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTransfersFromToBlock({
          fromBlock: 0x7,
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTransfersFromToBlock({
          fromBlock: 0x7,
        }),
      ).rejects.toThrowError('[C0005] Invalid block number provided');
    });
  });
});
