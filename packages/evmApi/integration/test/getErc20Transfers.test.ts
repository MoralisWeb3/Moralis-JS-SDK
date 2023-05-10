import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getErc20Transfers', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get ERC20 Transfers', () => {
    it('should get correct ERC20 transfers, based on the provided contract addresses', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Transfers({
        limit: 3,
        fromBlock: 16000000,
        toBlock: 16867742,
        contractAddresses: ['0x9fcf8f5bd54db123470c96620441ca5c342a8bd4', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
      });

      expect(result.length).toEqual(2);
      expect(pagination.cursor).toBeDefined();

      const transfer = result[0];

      expect(transfer.tokenName).toBe('SmarDex LP-Token');
      expect(transfer.tokenSymbol).toBe('SDEX-LP');
      expect(transfer.tokenLogo).toBe(null);
      expect(transfer.tokenDecimals).toBe(18);
      expect(transfer.fromWallet.lowercase).toBe('0x0000000000000000000000000000000000000000');
      expect(transfer.toWallet.lowercase).toBe('0x2f64604cfda547572c7e68bd821a88c0566630d0');
      expect(transfer.contractAddress.lowercase).toBe('0x9fcf8f5bd54db123470c96620441ca5c342a8bd4');
      expect(transfer.blockHash).toBe('0x987cab4a8a33ac6d1112f44f59bdda0410059e7bb033507ed8ebcbade331459c');
      expect(transfer.blockNumber).toBe('16867742');
      expect(transfer.blockTimestamp.toISOString()).toBe('2023-03-20T08:37:35.000Z');
      expect(transfer.transactionHash).toBe('0xdebc1c8e0e93fc848c587d6841cd4b5fb4d309ffa58faef8fad7d1a38455e0cc');
      expect(transfer.transactionIndex).toBe('151');
      expect(transfer.logIndex).toBe('370');
      expect(transfer.value).toBe('8078781185194');
      expect(transfer.possibleSpam).toBe(true);
      expect(transfer.valueDecimal).toBe('0.000008078781185194');
    });

    it('should get handle no results', async () => {
      const { result, pagination } = await EvmApi.token.getErc20Transfers({
        contractAddresses: ['0x0000000000000000000000000000000000000000'],
      });

      expect(result.length).toEqual(0);
      expect(pagination.cursor).toBe(null);
    });

    it('should get handle invalid address input errors', async () => {
      expect(() =>
        EvmApi.token.getErc20Transfers({
          contractAddresses: ['oops'],
        }),
      ).rejects.toThrowError(`[C0005] Invalid address provided`);
    });
  });
});
