import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getErc20Approvals', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get ERC20 Approvals', () => {
    it('should get correct ERC20 transfers, based on the provided contract addresses', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Approvals({
        limit: 3,
        fromBlock: 16000000,
        toBlock: 16867742,
        contractAddresses: ['0x5e8422345238f34275888049021821e8e08caa1f', '0x6fadf4aea85e1cd1d2b4b57d65954b424ddaa6ae'],
      });

      expect(result.length).toEqual(3);
      expect(pagination.cursor).toBeDefined();

      const transfer = result[0];

      expect(transfer.fromWallet.lowercase).toBe('0xbafa44efe7901e04e39dad13167d089c559c1138');
      expect(transfer.toWallet.lowercase).toBe('0xac3e018457b222d93114458476f3e3416abbe38f');
      expect(transfer.contractAddress.lowercase).toBe('0x5e8422345238f34275888049021821e8e08caa1f');
      expect(transfer.blockHash).toBe('0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c');
      expect(transfer.blockNumber.toString()).toBe('16867742');
      expect(transfer.blockTimestamp.toISOString()).toBe('2023-03-20T08:37:35.000Z');
      expect(transfer.transactionHash).toBe('0x61b87b32196fda49b93998236fa0d51e0a0598ab0a052fa706053391d1950be2');
      expect(transfer.transactionIndex).toBe(148);
      expect(transfer.logIndex).toBe(356);
      expect(transfer.possibleSpam).toBe(false);
      expect(transfer.value.toString()).toBe('80000000000000000');
    });

    it('should get handle no results', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Approvals({
        contractAddresses: ['0x0000000000000000000000000000000000000000'],
      });

      expect(result.length).toEqual(0);
      expect(pagination.cursor).toBe(null);
    });

    it('should get handle invalid address input errors', async () => {
      expect(
        EvmApi.token.getErc20Approvals({
          contractAddresses: ['oops'],
        }),
      ).rejects.toThrowError(`[C0005] Invalid address provided`);
    });
  });
});
