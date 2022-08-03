import { setupEvmUtils } from '../../test/setup';
import { EvmTransactionReceipt } from '../EvmTransactionReceipt/EvmTransactionReceipt';
import { EvmTransactionResponse } from './EvmTransactionResponse';
import { EvmTransactionResponseInput } from './EvmTransactionResponseTypes';

const DATA =
  '0x00000000000000000000000000000000000000000000213ba4fc56e2e24648b200000000000000000000000000000000000000000000002e9e527eb8ff21faf7';
const FROM = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const TO = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const BLOCK_NUMBER = 15095188;
const BLOCK_TIMESTAMP = '2022-07-07T11:26:49.000Z';
const BLOCK_HASH = '0x0b564475b29d046aca77b2a1ad40e0bda7fd78d8c6950b3a72812af96af21f53';
const HASH = '0x4997378331e5274344f36c34e5a6a74e39b195e29fc7ca08ef8d2c48d6870666';

const inputWithAllData: EvmTransactionResponseInput = {
  from: FROM,
  to: TO,
  chain: 1,
  data: DATA,
  accessList: [],
  gasLimit: 21000,
  gasPrice: 221000,
  maxFeePerGas: 221000,
  maxPriorityFeePerGas: 21000,
  nonce: 0,
  type: 1,
  value: 200000,
  confirmations: 20,
  blockHash: BLOCK_HASH,
  blockNumber: BLOCK_NUMBER,
  blockTimestamp: new Date(BLOCK_TIMESTAMP),
  hash: HASH,
};

const requiredParamsOnly: EvmTransactionResponseInput = {
  chain: 1,
  from: FROM,
  nonce: 0,
  hash: HASH,
};

const transactionInput = {
  transactionIndex: 222,
  cumulativeGasUsed: 2100,
  gasPrice: 21000,
  gasUsed: 21000,
  logs: [],
  status: 1,
};

describe('EvmTransactionResponse', () => {
  beforeAll(() => {
    setupEvmUtils();
  });
  /**
   * Creation
   */
  it('should create a new EvmTransactionResponse with valid input data', () => {
    const transactionResponse = EvmTransactionResponse.create(inputWithAllData);

    expect(transactionResponse.result.from?.format()).toBe(inputWithAllData.from);
    expect(transactionResponse.result.to?.format()).toBe(inputWithAllData.to);
    expect(transactionResponse.result.chain?.decimal).toBe(inputWithAllData.chain);
    expect(transactionResponse.result.confirmations?.toString()).toBe(inputWithAllData.confirmations?.toString());
  });

  it('should create a new EvmTransactionResponse with resolveCall option', () => {
    const transactionWithresolveCall = EvmTransactionResponse.create(inputWithAllData, async (response, value) =>
      EvmTransactionReceipt.create(transactionInput, inputWithAllData),
    );

    expect(transactionWithresolveCall.result.from?.format()).toBe(inputWithAllData.from);
    expect(transactionWithresolveCall.result.to?.format()).toBe(inputWithAllData.to);
    expect(transactionWithresolveCall.result.chain?.decimal).toBe(inputWithAllData.chain);
  });

  it('should create a new EvmTransactionResponse with valid input data with constructor', () => {
    const transactionResponse = new EvmTransactionResponse(inputWithAllData);

    expect(transactionResponse.result.from?.format()).toBe(inputWithAllData.from);
    expect(transactionResponse.result.to?.format()).toBe(inputWithAllData.to);
    expect(transactionResponse.result.chain?.decimal).toBe(inputWithAllData.chain);
    expect(transactionResponse.result.confirmations?.toString()).toBe(inputWithAllData.confirmations?.toString());
  });

  it('should create a new EvmTransactionResponse with only required input data', () => {
    const transactionResponse = EvmTransactionResponse.create(requiredParamsOnly);

    expect(transactionResponse.result.chain?.decimal).toBe(1);
  });

  it('should throw error as a result of incorrect data', () => {
    expect(() =>
      EvmTransactionResponse.create({ ...requiredParamsOnly, chain: 'text' }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'"`,
    );
  });

  /**
   * Utils
   */
  it('should confirm equality of 2 EvmTransactionResponses', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create(inputWithAllData);
    const equality = transactionResponseA.equals(transactionResponseB);

    expect(equality).toBe(true);
  });

  it('should confirm equality of 2 EvmTransactionResponses from static class', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create(inputWithAllData);
    const equality = EvmTransactionResponse.equals(transactionResponseA, transactionResponseB);

    expect(equality).toBe(true);
  });

  it('should confirm inequality of 2 EvmTransactionResponses', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create(requiredParamsOnly);
    const equality = transactionResponseA.equals(transactionResponseB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionResponses with different chains', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create({ ...inputWithAllData, chain: 3 });
    const equality = transactionResponseA.equals(transactionResponseB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionResponses with different block numbers', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create({ ...inputWithAllData, blockNumber: BLOCK_NUMBER + 1 });
    const equality = transactionResponseA.equals(transactionResponseB);

    expect(equality).toBe(false);
  });

  it('should confirm inequality of 2 EvmTransactionResponses with different hash', () => {
    const transactionResponseA = EvmTransactionResponse.create(inputWithAllData);
    const transactionResponseB = EvmTransactionResponse.create({
      ...inputWithAllData,
      hash: '0x4997378331e5274344f36c34e5a6a74e39b195e29fc7ca08ef8d2c48d6870667',
    });
    const equality = transactionResponseA.equals(transactionResponseB);

    expect(equality).toBe(false);
  });

  it('should convert EvmTransactionResponse to JSON', () => {
    const transactionResponse = EvmTransactionResponse.create(inputWithAllData);
    const result = transactionResponse.toJSON();

    expect(result.to).toBe(inputWithAllData.to);
    expect(result.from).toBe(inputWithAllData.from);
    expect(result.blockHash).toBe(inputWithAllData.blockHash);
    expect(result.gasPrice).toBe(inputWithAllData.gasPrice?.toString());
  });

  it('should return chain explorer url', () => {
    const transactionResponse = EvmTransactionResponse.create(inputWithAllData);

    expect(transactionResponse.exporerUrl).toBe(`https://etherscan.io/tx/${inputWithAllData.hash}`);
  });

  it('should call format function and return transaction hash', () => {
    const transactionResponse = EvmTransactionResponse.create(inputWithAllData);

    expect(transactionResponse.format()).toBe(inputWithAllData.hash);
  });

  it('should call the wait function', async () => {
    const transactionResponse = EvmTransactionResponse.create(requiredParamsOnly);
    const callSpy = jest.fn(async (tx, confirmations) =>
      EvmTransactionReceipt.create(transactionInput, transactionResponse),
    );
    const transactionWithresolveCall = EvmTransactionResponse.create(inputWithAllData, callSpy);
    const receipt = await transactionWithresolveCall.wait();

    expect(receipt.result.logs?.length).toBe(0);
    expect(receipt.result.status).toBe(1);
    expect(callSpy).toBeCalledTimes(1);
  });

  it('should throw error when calling the wait function without resolveCall option', async () => {
    const transactionWithresolveCall = EvmTransactionResponse.create(inputWithAllData);

    expect(transactionWithresolveCall.wait()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0010] Cannot send transaction, no supported call method provided"`,
    );
  });
});
