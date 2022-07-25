import { BigNumber } from '@ethersproject/bignumber';
import { setupEvmUtils } from '../../test/setup';
import { EvmTransactionLogInput } from '../EvmTransactionLog';
import { EvmTransactionResponse, EvmTransactionResponseInput } from '../EvmTransactionResponse';
import { EvmTransactionReceipt } from './EvmTransactionReceipt';
import { EvmTransactionReceiptInput } from './EvmTransactionReceiptTypes';

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
const FROM = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const TO = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const HASH = '0x4997378331e5274344f36c34e5a6a74e39b195e29fc7ca08ef8d2c48d6870666';

const transactionLogInputData: EvmTransactionLogInput = {
  logIndex: LOG_INDEX,
  transactionHash: TRANSACTION_HASH,
  transactionIndex: TRANSACTION_INDEX,
  address: ADDRESS,
  data: DATA,
  topics: TOPIC,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: BLOCK_TIMESTAMP,
};

const inputWithAllData: EvmTransactionReceiptInput = {
  transactionIndex: TRANSACTION_INDEX,
  contractAddress: ADDRESS,
  confirmations: 20,
  gasPrice: '21000',
  gasUsed: '21000',
  cumulativeGasUsed: '2100',
  root: '0x0000000000000000000000000000000000000000000000000000000000000000',
  status: 1,
  logs: [transactionLogInputData],
};

const inputWithoutOptionalData: EvmTransactionReceiptInput = {
  transactionIndex: TRANSACTION_INDEX,
  gasPrice: '21000',
  gasUsed: '21000',
  cumulativeGasUsed: '2100',
};

const inputWithInvalidData: EvmTransactionReceiptInput = {
  transactionIndex: TRANSACTION_INDEX,
  contractAddress: INVALID_ADDRESS,
  confirmations: 20,
  gasPrice: 21000,
  gasUsed: 21000,
  cumulativeGasUsed: 2100,
  root: '0x0000000000000000000000000000000000000000000000000000000000000000',
  status: 1,
  logs: [transactionLogInputData],
};

const transactionResponseData: EvmTransactionResponseInput = {
  from: FROM,
  to: TO,
  chain: 1,
  data: DATA,
  accessList: [],
  gasLimit: '21000',
  gasPrice: '221000',
  maxFeePerGas: '221000',
  maxPriorityFeePerGas: '21000',
  nonce: 0,
  type: 1,
  value: 200000,
  confirmations: 20,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: new Date(BLOCK_TIMESTAMP),
  hash: HASH,
};

const expectedTotalGas = BigNumber.from(inputWithAllData.cumulativeGasUsed).mul(inputWithAllData.gasPrice).toString();

describe('EvmTransactionReceipt', () => {
  beforeAll(() => {
    setupEvmUtils();
  });

  /**
   * Creation
   */
  it('should create a new EvmTransactionReceipt with valid input data', () => {
    const transactionReceipt = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);

    expect(transactionReceipt.result.contractAddress?.format()).toBe(inputWithAllData.contractAddress);
    expect(transactionReceipt.result.cumulativeGasUsed.toString()).toBe(inputWithAllData.cumulativeGasUsed);
    expect(transactionReceipt.result.transactionIndex).toBe(inputWithAllData.transactionIndex);
    expect(transactionReceipt.result.gasPrice.toString()).toBe(inputWithoutOptionalData.gasPrice);
  });

  it('should create a new EvmTransactionReceipt with EvmTransactionReceipt', () => {
    const receipt = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const transactionReceipt = EvmTransactionReceipt.create(receipt, transactionResponseData);

    expect(transactionReceipt.result.contractAddress?.format()).toBe(inputWithAllData.contractAddress);
    expect(transactionReceipt.result.cumulativeGasUsed.toString()).toBe(inputWithAllData.cumulativeGasUsed);
    expect(transactionReceipt.result.transactionIndex).toBe(inputWithAllData.transactionIndex);
    expect(transactionReceipt.result.gasPrice.toString()).toBe(inputWithoutOptionalData.gasPrice);
  });

  it('should create a new EvmTransactionReceipt with valid input data from constructor', () => {
    const transactionReceipt = new EvmTransactionReceipt(
      inputWithAllData,
      EvmTransactionResponse.create(transactionResponseData),
    );

    expect(transactionReceipt.result.contractAddress?.format()).toBe(inputWithAllData.contractAddress);
    expect(transactionReceipt.result.cumulativeGasUsed.toString()).toBe(inputWithAllData.cumulativeGasUsed);
    expect(transactionReceipt.result.transactionIndex).toBe(inputWithAllData.transactionIndex);
    expect(transactionReceipt.result.gasPrice.toString()).toBe(inputWithoutOptionalData.gasPrice);
  });

  it('should create a new EvmTransactionReceipt with input data without optional params', () => {
    const transactionReceipt = EvmTransactionReceipt.create(inputWithoutOptionalData, transactionResponseData);

    expect(transactionReceipt.result.contractAddress?.format()).toBe(inputWithoutOptionalData.contractAddress);
    expect(transactionReceipt.result.cumulativeGasUsed.toString()).toBe(inputWithoutOptionalData.cumulativeGasUsed);
    expect(transactionReceipt.result.gasPrice.toString()).toBe(inputWithoutOptionalData.gasPrice);
    expect(transactionReceipt.result.transactionIndex).toBe(inputWithoutOptionalData.transactionIndex);
  });

  it('should throw an error when creating with invalid options', () => {
    expect(() =>
      EvmTransactionReceipt.create(inputWithInvalidData, transactionResponseData),
    ).toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });

  /**
   * Utils
   */
  it('should confirm equality of 2 EvmTransactionReceipt', () => {
    const transactionReceiptA = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const transactionReceiptB = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const equality = transactionReceiptA.equals(transactionReceiptB);

    expect(equality).toBe(true);
  });

  it('should confirm equality of 2 EvmTransactionReceipt with static function', () => {
    const transactionReceiptA = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const transactionReceiptB = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const equality = EvmTransactionReceipt.equals(transactionReceiptA, transactionReceiptB);

    expect(equality).toBe(true);
  });

  it('should confirm inequality of 2 EvmTransactionReceipt', () => {
    const transactionReceiptA = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const transactionReceiptB = EvmTransactionReceipt.create(inputWithoutOptionalData, transactionResponseData);
    const equality = transactionReceiptA.equals(transactionReceiptB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionReceipt with different transactions', () => {
    const transactionReceiptA = EvmTransactionReceipt.create(inputWithAllData, {
      ...transactionResponseData,
      chain: 3,
    });
    const transactionReceiptB = EvmTransactionReceipt.create(inputWithoutOptionalData, transactionResponseData);
    const equality = transactionReceiptA.equals(transactionReceiptB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionReceipt with static function', () => {
    const transactionReceiptA = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const transactionReceiptB = EvmTransactionReceipt.create(inputWithoutOptionalData, transactionResponseData);
    const equality = EvmTransactionReceipt.equals(transactionReceiptA, transactionReceiptB);

    expect(equality).toBe(false);
  });

  it('should format EvmTransactionReceipt', () => {
    const transactionReceipt = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const result = transactionReceipt.format();

    expect(result.cumulativeGasUsed).toBe(inputWithAllData.cumulativeGasUsed);
    expect(result.transactionIndex).toBe(inputWithAllData.transactionIndex);
    expect(result.gasPrice).toBe(inputWithAllData.gasPrice);
  });

  it('should return EvmTransactionReceipt total cost', () => {
    const transactionReceipt = EvmTransactionReceipt.create(inputWithAllData, transactionResponseData);
    const totalGasCostString = transactionReceipt.totalGasCost.format();

    expect(totalGasCostString).toBe(expectedTotalGas);
  });
});
