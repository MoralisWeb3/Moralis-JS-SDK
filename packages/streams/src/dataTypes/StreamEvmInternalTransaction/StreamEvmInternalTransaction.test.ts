import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamEvmInternalTransaction } from './StreamEvmInternalTransaction';
import { StreamEvmInternalTransactionInput } from './types';

const fullMockInternalTransaction: StreamEvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  streamId: 'test-stream-id',
  tag: 'test-tag',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  gas: '100',
};

const partialMockInternalTransaction: StreamEvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  streamId: 'test-stream-id',
  tag: 'test-tag',
};

describe('StreamEvmInternalTransaction', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  describe('Full internal transaction', () => {
    it('should create a new StreamEvmInternalTransaction succesfully', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(fullMockInternalTransaction, core);

      // Read values
      expect(internalTransaction.chain.decimal).toBe(1);
      expect(internalTransaction.transactionHash).toBe(
        '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      );
      expect(internalTransaction.tag).toBe('test-tag');
      expect(internalTransaction.streamId).toBe('test-stream-id');
      expect(internalTransaction.from?.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(internalTransaction.to?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(internalTransaction.value?.toString()).toBe('12345');
      expect(internalTransaction.gas?.toString()).toBe('100');
    });

    it('should parse the values to JSON correctly', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(fullMockInternalTransaction, core);

      expect(internalTransaction.toJSON()).toStrictEqual({
        chain: '0x1',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '100',
        streamId: 'test-stream-id',
        tag: 'test-tag',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(fullMockInternalTransaction, core);

      expect(internalTransaction.format()).toStrictEqual({
        chain: '0x1',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '100',
        streamId: 'test-stream-id',
        tag: 'test-tag',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
      });
    });
  });

  describe('Partial internal transaction', () => {
    it('should create a new StreamEvmInternalTransaction succesfully', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(partialMockInternalTransaction, core);

      // Read values
      expect(internalTransaction.chain.decimal).toBe(1);
      expect(internalTransaction.transactionHash).toBe(
        '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      );
      expect(internalTransaction.tag).toBe('test-tag');
      expect(internalTransaction.streamId).toBe('test-stream-id');
      expect(internalTransaction.from).toBeUndefined();
      expect(internalTransaction.to).toBeUndefined();
      expect(internalTransaction.value).toBeUndefined();
      expect(internalTransaction.gas).toBeUndefined();
    });

    it('should parse the values to JSON correctly', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(partialMockInternalTransaction, core);

      expect(internalTransaction.toJSON()).toStrictEqual({
        chain: '0x1',
        from: undefined,
        gas: undefined,
        streamId: 'test-stream-id',
        tag: 'test-tag',
        to: undefined,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const internalTransaction = StreamEvmInternalTransaction.create(partialMockInternalTransaction, core);

      expect(internalTransaction.format()).toStrictEqual({
        chain: '0x1',
        from: undefined,
        gas: undefined,
        streamId: 'test-stream-id',
        tag: 'test-tag',
        to: undefined,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: undefined,
      });
    });
  });
});
