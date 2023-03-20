import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getErc20Mints', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get ERC20 Mints', () => {
    it('should get correct ERC20 transfers, based on the provided contract addresses', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Mints({
        limit: 3,
        fromBlock: 16000000,
        toBlock: 16867742,
        contractAddresses: ['0xa0e8fed3426391fdb446516799c4d6248e2b2860', '0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03'],
      });

      expect(result.length).toEqual(3);
      expect(pagination.cursor).toBeDefined();

      const transfer = result[0];

      expect(transfer.toWallet.lowercase).toBe('0xd27ad1e018ab6fe4a0088ee8cfd48adfbad4f968');
      expect(transfer.contractAddress.lowercase).toBe('0xc6fda51da94bc7dde0e8a5ff3c45906acd6ddc03');
      expect(transfer.blockHash).toBe('0x4acdd65e95095545fe2c7ab1a06133e4151c617ea04e4727c278180ff77334c3');
      expect(transfer.blockNumber.toString()).toBe('16867580');
      expect(transfer.blockTimestamp.toISOString()).toBe('2023-03-20T08:05:11.000Z');
      expect(transfer.transactionHash).toBe('0xcfc858b220d3dd4f7d85a8914ff35d85cc2e9aecc1d5459f25a5cb6fcc00cea5');
      expect(transfer.transactionIndex).toBe(194);
      expect(transfer.logIndex).toBe(431);
      expect(transfer.value.toString()).toBe('1139661035879629629627');
    });

    it('should get handle no results', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Mints({
        contractAddresses: ['0x0000000000000000000000000000000000000000'],
      });

      expect(result.length).toEqual(0);
      expect(pagination.cursor).toBe(null);
    });

    it('should get handle invalid address input errors', async () => {
      expect(
        EvmApi.token.getErc20Mints({
          contractAddresses: ['oops'],
        }),
      ).rejects.toThrowError(`[C0005] Invalid address provided`);
    });
  });
});
