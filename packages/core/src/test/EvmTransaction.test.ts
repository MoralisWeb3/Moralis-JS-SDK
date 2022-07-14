import { EvmTransaction, EvmTransactionInput, EvmTransactionResponse } from '../dataTypes';

const DATA =
  '0x00000000000000000000000000000000000000000000213ba4fc56e2e24648b200000000000000000000000000000000000000000000002e9e527eb8ff21faf7';
const FROM = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
const TO = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';

const inputWithAllData: EvmTransactionInput = {
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
};

describe('EvmTransaction', () => {
  /**
   * Creation
   */
  it('should create a new EvmTransaction with valid input data', () => {
    const transaction = EvmTransaction.create(inputWithAllData);

    expect(transaction.result.from?.format()).toBe(inputWithAllData.from);
    expect(transaction.result.to?.format()).toBe(inputWithAllData.to);
    expect(transaction.result.chain?.decimal).toBe(inputWithAllData.chain);
  });

  it('should create a new EvmTransaction with valid input data with constructor', () => {
    const transaction = new EvmTransaction(inputWithAllData);

    expect(transaction.result.from?.format()).toBe(inputWithAllData.from);
    expect(transaction.result.to?.format()).toBe(inputWithAllData.to);
    expect(transaction.result.chain?.decimal).toBe(inputWithAllData.chain);
  });

  it('should create a new EvmTransaction with sendCall option', () => {
    const transactionWithSendCall = EvmTransaction.create(inputWithAllData, async (transaction) =>
      EvmTransactionResponse.create({ ...inputWithAllData, hash: '0x123', from: transaction.result.from }),
    );

    expect(transactionWithSendCall.result.from?.format()).toBe(inputWithAllData.from);
    expect(transactionWithSendCall.result.to?.format()).toBe(inputWithAllData.to);
    expect(transactionWithSendCall.result.chain?.decimal).toBe(inputWithAllData.chain);
  });

  it('should create a new EvmTransaction with only required input data', () => {
    const transaction = EvmTransaction.create({ chain: 1 });

    expect(transaction.result.chain?.decimal).toBe(1);
  });

  it('should throw error as a result of incorrect data', () => {
    expect(() => EvmTransaction.create({ chain: 'text' })).toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'"`,
    );
  });

  /**
   * Utils
   */
  it('should confirm equality of 2 EvmTransactions', () => {
    const transactionA = EvmTransaction.create(inputWithAllData);
    const transactionB = EvmTransaction.create(inputWithAllData);
    const equality = transactionA.equals(transactionB);

    expect(equality).toBe(true);
  });

  it('should confirm equality of 2 EvmTransactions from static class', () => {
    const transactionA = EvmTransaction.create(inputWithAllData);
    const transactionB = EvmTransaction.create(inputWithAllData);
    const equality = EvmTransaction.equals(transactionA, transactionB);

    expect(equality).toBe(true);
  });

  it('should confirm inequality of 2 EvmTransactions', () => {
    const transactionA = EvmTransaction.create(inputWithAllData);
    const transactionB = EvmTransaction.create({ chain: 1 });
    const equality = transactionA.equals(transactionB);

    expect(equality).toBe(false);
  });

  it('should generate eth request object', () => {
    const transaction = EvmTransaction.create(inputWithAllData);
    const request = transaction.toEthRequest();

    expect(request.chainId).toBe(inputWithAllData.chain);
    expect(request.value).toBe(inputWithAllData.value?.toString());
  });

  it('should generate eth request object with only required fields', () => {
    const transaction = EvmTransaction.create({ chain: 1 });
    const request = transaction.toEthRequest();

    expect(request.chainId).toBe(1);
    expect(request.value).toBeUndefined();
  });

  it('should call the send function', async () => {
    const callSpy = jest.fn(async (transaction) =>
    EvmTransactionResponse.create({ ...inputWithAllData, hash: '0x123', from: transaction.result.from }),
);
    const transactionWithSendCall = EvmTransaction.create(inputWithAllData, callSpy);
    const response = await transactionWithSendCall.send();

    expect(response.result.hash).toBe('0x123');
    expect(response.result.chain?.decimal).toBe(inputWithAllData.chain);
    expect(callSpy).toBeCalledTimes(1);
  });

  it('should throw an error when trying to send with no call method', () => {
    const transaction = EvmTransaction.create(inputWithAllData);

    expect(() => transaction.send()).toThrowErrorMatchingInlineSnapshot(
      `"[C0001] Cannot send transaction, no supported call method provided"`,
    );
  });

  it('should convert EvmTransaction to JSON', () => {
    const transaction = EvmTransaction.create(inputWithAllData);
    const request = transaction.toJSON();

    expect(request.to).toBe(inputWithAllData.to);
    expect(request.from).toBe(inputWithAllData.from);
    expect(request.value).toBe(inputWithAllData.value?.toString());
  });

  it('should format EvmTransaction', () => {
    const transaction = EvmTransaction.create(inputWithAllData);
    const request = transaction.format();

    expect(request.to).toBe(inputWithAllData.to);
    expect(request.from).toBe(inputWithAllData.from);
    expect(request.value).toBe(inputWithAllData.value?.toString());
  });
});
