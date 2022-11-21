import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('getNFTTransfersFromToBlock', () => {
  let EvmApi: MoralisEvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  describe('Get NFTs Transfers From block to block', () => {
    it('should get transfers of NFTs from a block number to a block number', async () => {
      const result = await EvmApi.nft.getNFTTransfersFromToBlock({
        fromBlock: 1,
        toBlock: 2,
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
