import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamEvmTransaction, StreamEvmTransactionInput } from './StreamEvmTransaction';

// hash: event.hash,
// gas: 'gas',
// gasPrice: 'gasPrice',
// nonce: 'nonce',
// input: 'input',
// transactionIndex: '0',
// fromAddress: signer.address.toLowerCase(),
// toAddress: deployment.address,
// value: '0',
// type: '2',
// v: 'v',
// r: 'r',
// s: 's',
// receiptCumulativeGasUsed: 'receiptCumulativeGasUsed',
// receiptGasUsed: 'receiptGasUsed',
// receiptContractAddress: null,
// receiptRoot: null,
// receiptStatus: '1',
// tag: 'customContract',
// streamId: stream.streamId,

// address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
// block: undefined,
// chain: '0x1',
// data: '0x0020fe349a7800fd5eeaaf755446f4f7412b84f8d46f1165b182e5b5bb67e176',
// logIndex: 0,
// streamId: 'stream-id',
// tag: 'test-tag',
// topic0: '0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03',
// topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
// topic2: undefined,
// topic3: undefined,
// transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
// transactionIndex: undefined,

// owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
// spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',

const fullMockTransaction: StreamEvmTransactionInput = {
  chain: '0x1',
  hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  gas: '200',
  gasPrice: '100',
  nonce: '1',
  data: '0x0000000000000000000000000000000000000000000000000000000000000001',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  index: '0',
  streamId: 'stream-id',
  tag: 'test-tag',
  type: '2',
  signature: {
    v: 1,
    r: '0x000000000000000000000000000000000000000000000000000000000000002b',
    s: '0x000000000000000000000000000000000000000000000000000000000000003b',
  },
  value: '400',
  receiptRoot: '0x1',
  receiptStatus: '1',
  gasUsed: '500',
  cumulativeGasUsed: '600',
  contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
};

// With optional
const partialMockTransaction2: StreamEvmTransactionInput = {
  chain: '0x1',
  hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  index: '0',
  streamId: 'stream-id',
  tag: 'test-tag',
};

describe('StreamEvmTransaction', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  describe('Full transactio', () => {
    it('should create a new StreamEvmTransaction succesfully', () => {
      const transaction = StreamEvmTransaction.create(fullMockTransaction, core);

      // Read values as expected from Stream Api
      expect(transaction.chain.decimal).toBe(1);
      expect(transaction.hash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.transactionIndex).toBe(0);
      expect(transaction.fromAddress.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transaction.streamId).toBe('stream-id');
      expect(transaction.tag).toBe('test-tag');
      expect(transaction.gas?.toString()).toBe('200');
      expect(transaction.gasPrice?.toString()).toBe('100');
      expect(transaction.input).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
      expect(transaction.toAddress?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transaction.value?.toString()).toBe('400');
      expect(transaction.type).toBe(2);
      expect(transaction.v).toBe(1);
      expect(transaction.r).toBe('0x000000000000000000000000000000000000000000000000000000000000002b');
      expect(transaction.s).toBe('0x000000000000000000000000000000000000000000000000000000000000003b');
      expect(transaction.receiptGasUsed?.toString()).toBe('500');
      expect(transaction.receiptCumulativeGasUsed?.toString()).toBe('600');
      expect(transaction.receiptContractAddress?.format()).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(transaction.receiptRoot).toBe('0x1');
      expect(transaction.receiptStatus).toBe(1);

      // Read additional properties from EvmTransaction datatype
      expect(transaction.index).toBe(0);
      expect(transaction.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transaction.data).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
      expect(transaction.to?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transaction.gasUsed?.toString()).toBe('500');
      expect(transaction.cumulativeGasUsed?.toString()).toBe('600');
      expect(transaction.contractAddress?.format()).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    });

    it('should parse the values to JSON correctly', () => {
      const transaction = StreamEvmTransaction.create(fullMockTransaction, core);

      expect(transaction.toJSON()).toStrictEqual({
        block: undefined,
        chain: '0x1',
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        cumulativeGasUsed: '600',
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '200',
        gasPrice: '100',
        gasUsed: '500',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        index: 0,
        logs: [],
        nonce: '1',
        receiptRoot: '0x1',
        receiptStatus: 1,
        signature: {
          r: '0x000000000000000000000000000000000000000000000000000000000000002b',
          s: '0x000000000000000000000000000000000000000000000000000000000000003b',
          v: '1',
        },
        streamId: 'stream-id',
        tag: 'test-tag',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        type: 2,
        value: '400',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const transaction = StreamEvmTransaction.create(fullMockTransaction, core);

      expect(transaction.format()).toStrictEqual({
        block: undefined,
        chain: '0x1',
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        cumulativeGasUsed: '600',
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: '200',
        gasPrice: '100',
        gasUsed: '500',
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        index: 0,
        logs: [],
        nonce: '1',
        receiptRoot: '0x1',
        receiptStatus: 1,
        signature: {
          r: '0x000000000000000000000000000000000000000000000000000000000000002b',
          s: '0x000000000000000000000000000000000000000000000000000000000000003b',
          v: '1',
        },
        streamId: 'stream-id',
        tag: 'test-tag',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        type: 2,
        value: '400',
      });
    });
  });

  describe('Partial transaction', () => {
    it('should create a new StreamEvmTransaction succesfully', () => {
      const transaction = StreamEvmTransaction.create(partialMockTransaction2, core);

      // Read values as expected from Stream Api
      expect(transaction.chain.decimal).toBe(1);
      expect(transaction.hash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transaction.transactionIndex).toBe(0);
      expect(transaction.fromAddress.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transaction.streamId).toBe('stream-id');
      expect(transaction.tag).toBe('test-tag');
      expect(transaction.gas).toBeUndefined();
      expect(transaction.gasPrice).toBeUndefined();
      expect(transaction.input).toBeUndefined();
      expect(transaction.toAddress).toBeUndefined();
      expect(transaction.value).toBeUndefined();
      expect(transaction.type).toBeUndefined();
      expect(transaction.v).toBeUndefined();
      expect(transaction.r).toBeUndefined();
      expect(transaction.s).toBeUndefined();
      expect(transaction.receiptGasUsed).toBeUndefined();
      expect(transaction.receiptCumulativeGasUsed).toBeUndefined();
      expect(transaction.receiptContractAddress).toBeUndefined();
      expect(transaction.receiptRoot).toBeUndefined();
      expect(transaction.receiptStatus).toBeUndefined();

      // Read additional properties from EvmTransaction datatype
      expect(transaction.index).toBe(0);
      expect(transaction.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transaction.data).toBeUndefined();
      expect(transaction.to).toBeUndefined();
      expect(transaction.gasUsed).toBeUndefined();
      expect(transaction.cumulativeGasUsed).toBeUndefined();
      expect(transaction.contractAddress).toBeUndefined();
    });

    it('should parse the values to JSON correctly', () => {
      const transaction = StreamEvmTransaction.create(partialMockTransaction2, core);

      expect(transaction.toJSON()).toStrictEqual({
        block: undefined,
        chain: '0x1',
        contractAddress: undefined,
        cumulativeGasUsed: undefined,
        data: undefined,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: undefined,
        gasPrice: undefined,
        gasUsed: undefined,
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        index: 0,
        logs: [],
        nonce: undefined,
        receiptRoot: undefined,
        receiptStatus: undefined,
        signature: undefined,
        streamId: 'stream-id',
        tag: 'test-tag',
        to: undefined,
        type: undefined,
        value: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const transaction = StreamEvmTransaction.create(partialMockTransaction2, core);

      expect(transaction.toJSON()).toStrictEqual({
        block: undefined,
        chain: '0x1',
        contractAddress: undefined,
        cumulativeGasUsed: undefined,
        data: undefined,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        gas: undefined,
        gasPrice: undefined,
        gasUsed: undefined,
        hash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        index: 0,
        logs: [],
        nonce: undefined,
        receiptRoot: undefined,
        receiptStatus: undefined,
        signature: undefined,
        streamId: 'stream-id',
        tag: 'test-tag',
        to: undefined,
        type: undefined,
        value: undefined,
      });
    });
  });
});
