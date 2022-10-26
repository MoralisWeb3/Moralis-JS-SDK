import { StreamEvmInternalTransactionInput } from './types';

const full: StreamEvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  gas: '100',
};

const partial: StreamEvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
};

const partialNull: StreamEvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  from: null,
  to: null,
  value: null,
  gas: null,
};

export const mockStreamEvmInternalTransaction = {
  FULL: full,
  PARTIAL: partial,
  PARTIAL_NULL: partialNull,
};
