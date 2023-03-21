import { Core } from '@moralisweb3/common-core';
import { EvmInternalTransaction } from './EvmInternalTransaction';
import { setupEvmUtils } from '../../test/setup';
import { EvmInternalTransactionInput } from './types';

const exampleInput: EvmInternalTransactionInput = {
  chain: '0x1',
  transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
  blockNumber: 16876143,
  blockHash: '0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e',
  type: 'STATICCALL',
  from: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
  to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
  value: '100000',
  gas: '263200',
  gasUsed: '2569',
  input: '0x96e494e8d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa',
  output: '0x0000000000000000000000000000000000000000000000000000000000000001',
};

describe('EvmInternalTransaction', () => {
  let core: Core;

  beforeAll(() => {
    core = setupEvmUtils();
  });

  beforeEach(() => {
    core.config.reset();
  });

  /**
   * Creation
   */
  it('should create a new EvmInternalTransaction', () => {
    const transaction = EvmInternalTransaction.create(exampleInput);

    expect(transaction.chain.hex).toBe('0x1');
    expect(transaction.transactionHash).toBe('0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d');
    expect(transaction.blockNumber.toString()).toBe('16876143');
    expect(transaction.blockHash).toBe('0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e');
    expect(transaction.type).toBe('STATICCALL');
    expect(transaction.from.lowercase).toBe('0x283af0b28c62c092c9727f1ee09c02ca627eb7f5');
    expect(transaction.to.lowercase).toBe('0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85');
    expect(transaction.value.toString()).toBe('100000');
    expect(transaction.gas.toString()).toBe('263200');
    expect(transaction.gasUsed.toString()).toBe('2569');
    expect(transaction.input).toBe('0x96e494e8d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa');
    expect(transaction.output).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const transaction = EvmInternalTransaction.create(exampleInput);

    const value = transaction.toJSON();

    expect(value).toStrictEqual({
      chain: '0x1',
      from: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
      to: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
      gas: '263200',
      gasUsed: '2569',
      blockNumber: '16876143',
      blockHash: '0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e',
      input: '0x96e494e8d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa',
      output: '0x0000000000000000000000000000000000000000000000000000000000000001',
      value: '100000',
      type: 'STATICCALL',
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 transactions of the same value', () => {
    const transactionA = EvmInternalTransaction.create(exampleInput);
    const transactionB = EvmInternalTransaction.create(exampleInput);

    expect(transactionA.equals(transactionB)).toBeTruthy();
  });

  it('should check equality of 2 transactions of the same value via a static method', () => {
    const transactionA = EvmInternalTransaction.create(exampleInput);
    const transactionB = EvmInternalTransaction.create(exampleInput);

    expect(EvmInternalTransaction.equals(transactionA, transactionB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const transactionA = EvmInternalTransaction.create(exampleInput);
    const transactionB = EvmInternalTransaction.create({ ...exampleInput, chain: '0x2' });

    expect(transactionA.equals(transactionB)).toBeFalsy();
  });

  it('should check inequality when transactionHash is different', () => {
    const transactionA = EvmInternalTransaction.create(exampleInput);
    const transactionB = EvmInternalTransaction.create({
      ...exampleInput,
      transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7xxxxxxxx',
    });

    expect(transactionA.equals(transactionB)).toBeFalsy();
  });
});
