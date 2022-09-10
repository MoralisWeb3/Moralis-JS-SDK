import { setupEvmUtils } from '../../test/setup';
import { EvmTransactionLog } from './EvmTransactionLog';

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
const CHAINID = '0x1';

const inputWithAllData = {
  logIndex: LOG_INDEX,
  transactionHash: TRANSACTION_HASH,
  transactionIndex: TRANSACTION_INDEX,
  address: ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: BLOCK_TIMESTAMP,
  chainId: CHAINID,
};

const inputWithoutOptionalData = {
  transactionHash: TRANSACTION_HASH,
  address: ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
};

const inputWithInvalidData = {
  logIndex: LOG_INDEX,
  transactionHash: TRANSACTION_HASH,
  transactionIndex: TRANSACTION_INDEX,
  address: INVALID_ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: BLOCK_TIMESTAMP,
  chainId: CHAINID,
};

describe('EvmTransactionLog', () => {
  beforeAll(() => {
    setupEvmUtils();
  });

  /**
   * Creation
   */
  it('should create a new EvmTransactionLog with valid input data', () => {
    const transactionLog = EvmTransactionLog.create(inputWithAllData);

    expect(transactionLog.format()).toStrictEqual(inputWithAllData);
    expect(transactionLog.result.address.format()).toStrictEqual(inputWithAllData.address);
  });

  it('should create a new EvmTransactionLog with input data without optional params', () => {
    const transactionLog = EvmTransactionLog.create(inputWithoutOptionalData);

    expect(transactionLog.result.address.format()).toBe(inputWithoutOptionalData.address);
  });

  it('should throw an error when creating with invalid options', () => {
    expect(() => EvmTransactionLog.create(inputWithInvalidData)).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid address provided"`,
    );
  });

  /**
   * Utils
   */
  it('should confirm equality of 2 EvmTransactionLog', () => {
    const transactionLogA = EvmTransactionLog.create(inputWithAllData);
    const transactionLogB = EvmTransactionLog.create(inputWithAllData);
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(true);
  });

  it('should confirm inequality of 2 EvmTransactionLog', () => {
    const transactionLogA = EvmTransactionLog.create(inputWithAllData);
    const transactionLogB = EvmTransactionLog.create(inputWithoutOptionalData);
    const equality = transactionLogA.equals(transactionLogB);

    expect(equality).toBe(false);
  });
});
