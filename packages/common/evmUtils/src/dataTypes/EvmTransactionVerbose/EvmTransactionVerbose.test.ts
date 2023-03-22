import { Core } from '@moralisweb3/common-core';
import { EvmTransactionVerbose } from './EvmTransactionVerbose';
import { setupEvmUtils } from '../../test/setup';
import { EvmTransactionVerboseInput } from './types';
import { EvmTransactionLogDecoded } from '../EvmTransactionLogDecoded';

const exampleInput: EvmTransactionVerboseInput = {
  chain: '0x1',
  hash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
  nonce: '384698',
  index: 140,
  from: '0x292f04a44506c2fd49bac032e1ca148c35a478c8',
  to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  value: '100000000000000',
  gas: '100000',
  gasPrice: '14459046318',
  data: '0xa9059cbb00000000000000000000000041aeb05a21f9a30fc545ad883af37df096354b7c0000000000000000000000000000000000000000000000000000000004a84476',
  cumulativeGasUsed: '10861916',
  gasUsed: '63209',
  contractAddress: null,
  receiptRoot: null,
  receiptStatus: '1',
  blockTimestamp: '2023-03-21T12:39:11.000Z',
  blockNumber: '16876068',
  blockHash: '0x4d3d1ef7df947829911570e0bc2137235d2947abf7135a79ce5bbfa3e156740c',
  decodedCall: {
    signature: 'transfer(address,uint256)',
    label: 'transfer',
    type: 'function',
    params: [
      {
        name: '_to',
        value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
        type: 'address',
      },
      {
        name: '_value',
        value: '78136438',
        type: 'uint256',
      },
    ],
  },
  logs: [
    {
      logIndex: 230,
      transactionHash: '0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d',
      transactionIndex: 136,
      address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      data: '0x',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x000000000000000000000000283af0b28c62c092c9727f1ee09c02ca627eb7f5',
        '0xd40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa',
      ],
      blockTimestamp: '2023-03-21T12:54:23.000Z',
      blockNumber: 16876143,
      blockHash: '0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e',
      chain: '0x1',
      decodedEvent: {
        signature: 'Transfer(address,address,uint256)',
        label: 'Transfer',
        type: 'event',
        params: [
          {
            name: 'from',
            value: '0x292f04a44506c2fd49Bac032E1ca148C35A478c8',
            type: 'address',
          },
          {
            name: 'to',
            value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
            type: 'address',
          },
          {
            name: 'value',
            value: '78136438',
            type: 'uint256',
          },
        ],
      },
    },
  ],
};

describe('EvmTransactionVerbose', () => {
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
  it('should create a new EvmTransactionVerbose', () => {
    const transaction = EvmTransactionVerbose.create(exampleInput);

    expect(transaction.chain.hex).toBe('0x1');
    expect(transaction.hash).toBe('0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff');
    expect(transaction.nonce?.toString()).toBe('384698');
    expect(transaction.from.lowercase).toBe('0x292f04a44506c2fd49bac032e1ca148c35a478c8');
    expect(transaction.to?.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(transaction.value?.toString()).toBe('100000000000000');
    expect(transaction.gas?.toString()).toBe('100000');
    expect(transaction.gasPrice.toString()).toBe('14459046318');
    expect(transaction.data).toBe(
      '0xa9059cbb00000000000000000000000041aeb05a21f9a30fc545ad883af37df096354b7c0000000000000000000000000000000000000000000000000000000004a84476',
    );
    expect(transaction.cumulativeGasUsed.toString()).toBe('10861916');
    expect(transaction.contractAddress).toBe(undefined);
    expect(transaction.receiptRoot).toBe(undefined);
    expect(transaction.receiptStatus).toBe(1);
    expect(transaction.blockTimestamp.toISOString()).toBe('2023-03-21T12:39:11.000Z');
    expect(transaction.blockNumber.toString()).toBe('16876068');
    expect(transaction.blockHash).toBe('0x4d3d1ef7df947829911570e0bc2137235d2947abf7135a79ce5bbfa3e156740c');
    expect(transaction.signature).toBe(undefined);
    expect(transaction.decodedCall).toStrictEqual(exampleInput.decodedCall);

    expect(transaction.logs.length).toBe(1);
    expect(transaction.logs[0] instanceof EvmTransactionLogDecoded).toBe(true);
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const transaction = EvmTransactionVerbose.create(exampleInput);

    const value = transaction.toJSON();

    expect(value).toStrictEqual({
      from: '0x292f04a44506c2fd49bac032e1ca148c35a478c8',
      to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      nonce: '384698',
      data: '0xa9059cbb00000000000000000000000041aeb05a21f9a30fc545ad883af37df096354b7c0000000000000000000000000000000000000000000000000000000004a84476',
      value: '100000000000000',
      hash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
      chain: '0x1',
      gas: '100000',
      gasPrice: '14459046318',
      index: 140,
      blockNumber: '16876068',
      blockHash: '0x4d3d1ef7df947829911570e0bc2137235d2947abf7135a79ce5bbfa3e156740c',
      blockTimestamp: expect.any(String),
      cumulativeGasUsed: '10861916',
      gasUsed: '63209',
      contractAddress: undefined,
      receiptRoot: undefined,
      receiptStatus: 1,
      logs: expect.any(Array),
      signature: undefined,
      decodedCall: {
        signature: 'transfer(address,uint256)',
        label: 'transfer',
        type: 'function',
        params: [
          {
            name: '_to',
            value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
            type: 'address',
          },
          {
            name: '_value',
            value: '78136438',
            type: 'uint256',
          },
        ],
      },
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 transactions of the same value', () => {
    const transactionA = EvmTransactionVerbose.create(exampleInput);
    const transactionB = EvmTransactionVerbose.create(exampleInput);

    expect(transactionA.equals(transactionB)).toBeTruthy();
  });

  it('should check equality of 2 transactions of the same value via a static method', () => {
    const transactionA = EvmTransactionVerbose.create(exampleInput);
    const transactionB = EvmTransactionVerbose.create(exampleInput);

    expect(EvmTransactionVerbose.equals(transactionA, transactionB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const transactionA = EvmTransactionVerbose.create(exampleInput);
    const transactionB = EvmTransactionVerbose.create({ ...exampleInput, chain: '0x2' });

    expect(transactionA.equals(transactionB)).toBeFalsy();
  });

  it('should check inequality when hash is different', () => {
    const transactionA = EvmTransactionVerbose.create(exampleInput);
    const transactionB = EvmTransactionVerbose.create({
      ...exampleInput,
      hash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d6xxxxxxxx',
    });

    expect(transactionA.equals(transactionB)).toBeFalsy();
  });
});
