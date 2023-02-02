import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTransfersByBlock', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFTs Transfers By Block', () => {
    it('should get transfers of NFTs given a block number or block hash', async () => {
      const result = await EvmApi.nft.getNFTTransfersByBlock({
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
      });

      const token = result.result?.at(0)!;
      const { pagination } = result;

      expect(token).toBeDefined();
      expect(token).toEqual(expect.objectContaining({}));

      expect(pagination.total).toBe(2000);

      expect(token.value?.wei).toBe('1000000000000000');

      expect(token.contractType).toBe('ERC721');
      expect(token.tokenAddress.checksum).toBe('0x64bD6114BB43751fBdAe282f770089a9288C0936');
      expect(token.tokenId).toBe('15');

      expect(token.fromAddress?.checksum).toBe('0xDB041068aAd7C7997AE09D4965bC7ff61619c22f');
      expect(token.toAddress.checksum).toBe('0x62ccB902946C97D01f41Fb9a7DC325F311762240');
      expect(token.amount).toEqual(1);
      expect(token.operator?.checksum).toBe('0x6fF7443c557d238f3Ce5892F442D20957D8ACd7F');

      expect(token.blockNumber.toString()).toBe('88256');
      expect(token.blockTimestamp.toISOString()).toBeDefined();
      expect(token.blockHash).toBe('0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553');

      expect(token.transactionHash).toBe('0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838');
      expect(token.transactionType).toBe('Single');
      expect(token.transactionIndex).toBe(1);

      expect(token.logIndex).toBe(2);
    });

    it('should not get transfers of NFTs given an invalid block number or block hash and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTTransfersByBlock({
          blockNumberOrHash: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTTransfersByBlock({
          blockNumberOrHash: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid block number or block hash provided');
    });
  });
});
