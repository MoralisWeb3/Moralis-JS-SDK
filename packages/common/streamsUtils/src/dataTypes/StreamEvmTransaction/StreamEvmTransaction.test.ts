import MoralisCore from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamEvmTransaction } from './StreamEvmTransaction';
import { mockStreamEvmTransactionInput } from './StreamEvmTransaction.mock';

const testsInputs = Object.entries(mockStreamEvmTransactionInput).map(([name, input]) => ({ name, input }));

describe('StreamEvmTransaction', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const transaction = StreamEvmTransaction.create(input, core);
    const output = transaction.format();

    expect(transaction).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Full transaction', () => {
    const input = mockStreamEvmTransactionInput.FULL_1;
    let transaction: StreamEvmTransaction;

    beforeAll(() => {
      transaction = StreamEvmTransaction.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Required
      expect(transaction.chain.hex).toBe('0x1');
      expect(transaction.hash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.transactionIndex).toBe(0);
      expect(transaction.fromAddress.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');

      // Optional
      expect(transaction.gas?.toString()).toBe('200');
      expect(transaction.gasPrice?.toString()).toBe('100');
      expect(transaction.nonce?.toString()).toBe('1');
      expect(transaction.input).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
      expect(transaction.toAddress?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transaction.value?.toString()).toBe('400');
      expect(transaction.receiptCumulativeGasUsed?.toString()).toBe('600');
      expect(transaction.receiptGasUsed?.toString()).toBe('500');
      expect(transaction.receiptRoot).toBe('0x1');
      expect(transaction.receiptStatus).toBe(1);
      expect(transaction.receiptContractAddress?.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(transaction.r).toBe('0x79a89c835c8609ca1fce46b5dec9317f4272d36364204526400010ce18d10098');
      expect(transaction.s).toBe('0x7727e1707d90e4e09eff56bbb045d3278c418d2111fb687f536a9766764f9c41');
      expect(transaction.v).toBe(1);
      expect(transaction.type).toBe(2);
    });

    it('should parse correctly to JSON', () => {
      const json = transaction.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: 0,
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '200',
        gasPrice: '100',
        nonce: '1',
        input: '0x0000000000000000000000000000000000000000000000000000000000000001',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        value: '400',
        receiptCumulativeGasUsed: '600',
        receiptGasUsed: '500',
        receiptRoot: '0x1',
        receiptStatus: 1,
        receiptContractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        r: '0x79a89c835c8609ca1fce46b5dec9317f4272d36364204526400010ce18d10098',
        s: '0x7727e1707d90e4e09eff56bbb045d3278c418d2111fb687f536a9766764f9c41',
        v: 1,
        type: 2,
      });
    });

    it('should format() the values correctly', () => {
      const json = transaction.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: 0,
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '200',
        gasPrice: '100',
        nonce: '1',
        input: '0x0000000000000000000000000000000000000000000000000000000000000001',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        value: '400',
        receiptCumulativeGasUsed: '600',
        receiptGasUsed: '500',
        receiptRoot: '0x1',
        receiptStatus: 1,
        receiptContractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        r: '0x79a89c835c8609ca1fce46b5dec9317f4272d36364204526400010ce18d10098',
        s: '0x7727e1707d90e4e09eff56bbb045d3278c418d2111fb687f536a9766764f9c41',
        v: 1,
        type: 2,
      });
    });
  });

  describe('Partial transaction', () => {
    const input = mockStreamEvmTransactionInput.PARTIAL;
    let transaction: StreamEvmTransaction;

    beforeAll(() => {
      transaction = StreamEvmTransaction.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Required
      expect(transaction.chain.hex).toBe('0x1');
      expect(transaction.hash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.transactionIndex).toBe(0);
      expect(transaction.fromAddress.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');

      // Optional
      expect(transaction.gas?.toString()).toBeUndefined();
      expect(transaction.gasPrice?.toString()).toBeUndefined();
      expect(transaction.nonce?.toString()).toBeUndefined();
      expect(transaction.input).toBeUndefined();
      expect(transaction.toAddress?.lowercase).toBeUndefined();
      expect(transaction.value?.toString()).toBeUndefined();
      expect(transaction.receiptCumulativeGasUsed?.toString()).toBeUndefined();
      expect(transaction.receiptGasUsed?.toString()).toBeUndefined();
      expect(transaction.receiptRoot).toBeUndefined();
      expect(transaction.receiptStatus).toBeUndefined();
      expect(transaction.receiptContractAddress?.lowercase).toBeUndefined();
      expect(transaction.r).toBeUndefined();
      expect(transaction.s).toBeUndefined();
      expect(transaction.v).toBeUndefined();
      expect(transaction.type).toBeUndefined();
    });

    it('should parse correctly to JSON', () => {
      const json = transaction.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: 0,
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: undefined,
        gasPrice: undefined,
        nonce: undefined,
        input: undefined,
        toAddress: undefined,
        value: undefined,
        receiptCumulativeGasUsed: undefined,
        receiptGasUsed: undefined,
        receiptRoot: undefined,
        receiptStatus: undefined,
        receiptContractAddress: undefined,
        r: undefined,
        s: undefined,
        v: undefined,
        type: undefined,
      });
    });

    it('should format() the values correctly', () => {
      const json = transaction.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: 0,
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: undefined,
        gasPrice: undefined,
        nonce: undefined,
        input: undefined,
        toAddress: undefined,
        value: undefined,
        receiptCumulativeGasUsed: undefined,
        receiptGasUsed: undefined,
        receiptRoot: undefined,
        receiptStatus: undefined,
        receiptContractAddress: undefined,
        r: undefined,
        s: undefined,
        v: undefined,
        type: undefined,
      });
    });
  });

  it('should return return true for .equals() on equality match', () => {
    const input = mockStreamEvmTransactionInput.FULL_1;
    const transaction = StreamEvmTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return return false for .equals() on mismatching chain', () => {
    const input = mockStreamEvmTransactionInput.FULL_1;
    const transaction = StreamEvmTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      chain: '0x2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching hash', () => {
    const input = mockStreamEvmTransactionInput.FULL_1;
    const transaction = StreamEvmTransaction.create(input, core);
    const isEqual = transaction.equals({
      ...input,
      hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
    });

    expect(isEqual).toBe(false);
  });
});
