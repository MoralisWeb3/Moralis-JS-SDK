import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getErc20Burns', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get ERC20 Burns', () => {
    it('should get correct ERC20 transfers, based on the provided contract addresses', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Burns({
        limit: 3,
        fromBlock: 16000000,
        toBlock: 16867742,
        contractAddresses: ['0xa0e8fed3426391fdb446516799c4d6248e2b2860', '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03'],
      });

      expect(result.length).toEqual(3);
      expect(pagination.cursor).toBeDefined();

      const transfer = result[0];

      expect(transfer.fromWallet.lowercase).toBe('0x337b8ce71620a679bcc767b9525c8bdc2573e17c');
      expect(transfer.contractAddress.lowercase).toBe('0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03');
      expect(transfer.blockHash).toBe('0xf2be4cdf6def9f1c5395a041ca7678cbcb7e5228d93dd398f10e9659b42ac956');
      expect(transfer.blockNumber.toString()).toBe('16867006');
      expect(transfer.blockTimestamp.toISOString()).toBe('2023-03-20T06:09:23.000Z');
      expect(transfer.transactionHash).toBe('0x16d7bfcc59a1ef672cde3bd61ad9e49b53857de939b36014d23ab829e00c8557');
      expect(transfer.transactionIndex).toBe(79);
      expect(transfer.logIndex).toBe(182);
      expect(transfer.value.toString()).toBe('1800000000000000000000');
    });

    it('should get handle no results', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Burns({
        contractAddresses: ['0x0000000000000000000000000000000000000000'],
      });

      expect(result.length).toEqual(0);
      expect(pagination.cursor).toBe(null);
    });

    it('should get handle invalid address input errors', async () => {
      expect(
        EvmApi.token.getErc20Burns({
          contractAddresses: ['oops'],
        }),
      ).rejects.toThrowError(`[C0005] Invalid address provided`);
    });
  });
});
