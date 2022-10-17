import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamEvmTransactionLog } from './StreamEvmTransactionLog';
import { mockStreamEvmTransactionLogInput } from './StreamEvmTransactionLog.mock';

const testsInputs = Object.entries(mockStreamEvmTransactionLogInput).map(([name, input]) => ({ name, input }));

describe('StreamEvmTransactionLog', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const transactionLog = StreamEvmTransactionLog.create(input, core);
    const output = transactionLog.format();

    expect(transactionLog).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Erc20Transfer', () => {
    const input = mockStreamEvmTransactionLogInput.ERC20_TRANSFER;
    let transactionLog: StreamEvmTransactionLog;

    beforeAll(() => {
      transactionLog = StreamEvmTransactionLog.create(input, core);
    });

    it('should return correct values for all getters', () => {
      expect(transactionLog.chain.hex).toBe('0x1');
      expect(transactionLog.logIndex).toBe(10);
      expect(transactionLog.transactionHash).toBe('0xe688fb681f0d5539637a0020a26fab3662fdde48879fffdb1cc3f81909924d9a');
      expect(transactionLog.address.lowercase).toBe('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
      expect(transactionLog.data).toBe('0x0000000000000000000000000000000000000000000000000000000257b507a9');
      expect(transactionLog.topic0).toBe('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef');
      expect(transactionLog.topic1).toBe('0x000000000000000000000000f89d7b9c864f589bbf53a82105107622b35eaa40');
      expect(transactionLog.topic2).toBe('0x000000000000000000000000f5c91201b04346c683ecbbd06a37ab6df0f594a8');
      expect(transactionLog.topic3).toBeUndefined();
    });

    it('should parse the values to JSON correctly', () => {
      const json = transactionLog.toJSON();

      expect(json).toStrictEqual({
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chain: '0x1',
        data: '0x0000000000000000000000000000000000000000000000000000000257b507a9',
        logIndex: 10,
        topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        topic1: '0x000000000000000000000000f89d7b9c864f589bbf53a82105107622b35eaa40',
        topic2: '0x000000000000000000000000f5c91201b04346c683ecbbd06a37ab6df0f594a8',
        topic3: undefined,
        transactionHash: '0xe688fb681f0d5539637a0020a26fab3662fdde48879fffdb1cc3f81909924d9a',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = transactionLog.format();

      expect(json).toStrictEqual({
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chain: '0x1',
        data: '0x0000000000000000000000000000000000000000000000000000000257b507a9',
        logIndex: 10,
        topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        topic1: '0x000000000000000000000000f89d7b9c864f589bbf53a82105107622b35eaa40',
        topic2: '0x000000000000000000000000f5c91201b04346c683ecbbd06a37ab6df0f594a8',
        topic3: undefined,
        transactionHash: '0xe688fb681f0d5539637a0020a26fab3662fdde48879fffdb1cc3f81909924d9a',
      });
    });

    it('should return return true for .equals() on equality match', () => {
      const isEqual = transactionLog.equals({
        ...input,
      });

      expect(isEqual).toBe(true);
    });

    it('should return return false for .equals() on mismatching chain', () => {
      const isEqual = transactionLog.equals({
        ...input,
        chain: '0x2',
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching logIndex', () => {
      const isEqual = transactionLog.equals({
        ...input,
        logIndex: 11,
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching transactionHash', () => {
      const isEqual = transactionLog.equals({
        ...mockStreamEvmTransactionLogInput.ERC20_TRANSFER,
        transactionHash: '0xe688fb681f0d5539637a0020a26fab3662fdde48879fffdb1cc3f81909924d9b',
      });

      expect(isEqual).toBe(false);
    });
  });
});
