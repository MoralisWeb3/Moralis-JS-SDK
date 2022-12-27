import Core from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamEvmInternalTransaction } from './StreamEvmInternalTransaction';
import { mockStreamEvmInternalTransaction } from './StreamEvmInternalTransaction.mock';

const testsInputs = Object.entries(mockStreamEvmInternalTransaction).map(([name, input]) => ({ name, input }));

describe('StreamEvmInternalTransaction', () => {
  let core: Core;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const output = transaction.format();

    expect(transaction).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Full internal transaction', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    let transaction: StreamEvmInternalTransaction;

    beforeAll(() => {
      transaction = StreamEvmInternalTransaction.create(input, core);
    });

    it('should return correct values for all getters', () => {
      expect(transaction.chain.hex).toBe('0x1');
      expect(transaction.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.from?.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transaction.to?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transaction.value?.toString()).toBe('12345');
      expect(transaction.gas?.toString()).toBe('100');
      expect(transaction.triggers?.map((trigger) => trigger.toJSON())).toStrictEqual([
        { name: 'fromBalance', value: '6967063534600021400000' },
        { name: 'toBalance', value: '200000000000000000' },
      ]);
    });

    it('should parse the values to JSON correctly', () => {
      const json = transaction.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '100',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        triggers: [
          { name: 'fromBalance', value: '6967063534600021400000' },
          { name: 'toBalance', value: '200000000000000000' },
        ],
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = transaction.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '100',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        triggers: [
          { name: 'fromBalance', value: '6967063534600021400000' },
          { name: 'toBalance', value: '200000000000000000' },
        ],
      });
    });
  });

  describe('Partial internal transaction', () => {
    const input = mockStreamEvmInternalTransaction.PARTIAL;
    let transaction: StreamEvmInternalTransaction;

    beforeAll(() => {
      transaction = StreamEvmInternalTransaction.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Read values
      expect(transaction.chain.decimal).toBe(1);
      expect(transaction.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.from).toBeUndefined();
      expect(transaction.to).toBeUndefined();
      expect(transaction.value).toBeUndefined();
      expect(transaction.gas).toBeUndefined();
      expect(transaction.triggers).toBeUndefined();
    });

    it('should parse the values to JSON correctly', () => {
      const json = transaction.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        from: undefined,
        gas: undefined,
        to: undefined,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: undefined,
        triggers: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = transaction.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        from: undefined,
        gas: undefined,
        to: undefined,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: undefined,
        triggers: undefined,
      });
    });
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatchin chain', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      chain: '0x2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatchin transactionHash', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching trigger results length', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      triggers: [{ name: 'fromBalance', value: '6967063534600021400000' }],
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching trigger results', () => {
    const input = mockStreamEvmInternalTransaction.FULL;
    const transaction = StreamEvmInternalTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      triggers: [
        { name: 'fromBalance', value: '6967063534600021400000' },
        { name: 'toBalance', value: '200' },
      ],
    });

    expect(isEqual).toBe(false);
  });
});
