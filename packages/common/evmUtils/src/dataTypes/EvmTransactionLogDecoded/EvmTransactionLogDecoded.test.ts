import { setupEvmUtils } from '../../test/setup';
import { EvmTransactionLogDecoded } from './EvmTransactionLogDecoded';
import { EvmTransactionLogDecodedInput } from './types';

// Set variables

const LOG_INDEX = 12;
const TRANSACTION_HASH = '0x9a05a830919012da906d76c18b30e64b45df2c914988d2553f78362d4b5d8b0e';
const BLOCK_HASH = '0x0b564475b29d046aca77b2a1ad40e0bda7fd78d8c6950b3a72812af96af21f53';
const BLOCK_NUMBER = 15095188;
const BLOCK_TIMESTAMP = '2022-07-07T11:26:49.000Z';
const TRANSACTION_INDEX = 0;
const ADDRESS = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const INVALID_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96000';
const DATA =
  '0x00000000000000000000000000000000000000000000213ba4fc56e2e24648b200000000000000000000000000000000000000000000002e9e527eb8ff21faf7';
const TOPIC = ['0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1'];
const CHAIN = '0x1';

const inputWithAllData: EvmTransactionLogDecodedInput = {
  chain: CHAIN,
  logIndex: LOG_INDEX,
  transactionHash: TRANSACTION_HASH,
  transactionIndex: TRANSACTION_INDEX,
  address: ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: BLOCK_TIMESTAMP,
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
};

const inputWithoutOptionalData: EvmTransactionLogDecodedInput = {
  chain: CHAIN,
  transactionHash: TRANSACTION_HASH,
  address: ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
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
};

const inputWithInvalidData = {
  chain: CHAIN,
  logIndex: LOG_INDEX,
  transactionHash: TRANSACTION_HASH,
  transactionIndex: TRANSACTION_INDEX,
  address: INVALID_ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: BLOCK_TIMESTAMP,
};

describe('EvmTransactionLogDecoded', () => {
  beforeAll(() => {
    setupEvmUtils();
  });

  /**
   * Creation
   */
  it('should create a new EvmTransactionLogDecoded with valid input data', () => {
    const transactionLog = EvmTransactionLogDecoded.create(inputWithAllData);

    expect(transactionLog.format()).toStrictEqual(inputWithAllData);
    expect(transactionLog.result.address.lowercase).toStrictEqual(inputWithAllData.address);
  });

  it('should create a new EvmTransactionLogDecoded with input data without optional params', () => {
    const transactionLog = EvmTransactionLogDecoded.create(inputWithoutOptionalData);

    expect(transactionLog.result.address.lowercase).toBe(inputWithoutOptionalData.address);
  });

  it('should throw an error when creating with invalid options', () => {
    expect(() =>
      EvmTransactionLogDecoded.create(inputWithInvalidData as EvmTransactionLogDecodedInput),
    ).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid address provided: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96000"`,
    );
  });

  /**
   * Utils
   */
  it('should confirm equality of 2 EvmTransactionLogDecoded', () => {
    const transactionLogA = EvmTransactionLogDecoded.create(inputWithAllData);
    const transactionLogB = EvmTransactionLogDecoded.create(inputWithAllData);
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(true);
  });

  it('should confirm inequality of 2 EvmTransactionLogDecoded on transactionHash mismatch', () => {
    const transactionLogA = EvmTransactionLogDecoded.create(inputWithAllData);
    const transactionLogB = EvmTransactionLogDecoded.create({
      ...inputWithAllData,
      transactionHash: '0x9a05a830919012da906d76c18b30e64b45df2c914988d2553f78362d4b5d8b0f',
    });
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionLogDecoded on address mismatch', () => {
    const transactionLogA = EvmTransactionLogDecoded.create(inputWithAllData);
    const transactionLogB = EvmTransactionLogDecoded.create({
      ...inputWithAllData,
      address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96046',
    });
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionLogDecoded on logIndex mismatch', () => {
    const transactionLogA = EvmTransactionLogDecoded.create(inputWithAllData);
    const transactionLogB = EvmTransactionLogDecoded.create({ ...inputWithAllData, logIndex: 13 });
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionLogDecoded on chain mismatch', () => {
    const transactionLogA = EvmTransactionLogDecoded.create(inputWithAllData);
    const transactionLogB = EvmTransactionLogDecoded.create({ ...inputWithAllData, chain: '0x2' });
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(false);
  });
});
