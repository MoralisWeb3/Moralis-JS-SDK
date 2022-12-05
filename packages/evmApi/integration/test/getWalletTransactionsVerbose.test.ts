import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletTransactionsVerbose', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the transactions of an account', async () => {
    const response = await evmApi.transaction.getWalletTransactionsVerbose({
      address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
      chain: '0x1',
    });
    const results = response.result;
    const transaction = results[0];

    expect(response).toBeDefined();
    expect(response.raw.total).toBe(2000);
    expect(transaction.chain.hex).toBe('0x1');
    expect(transaction.cumulativeGasUsed.toString()).toBe('19024553');
    expect(transaction.gasPrice.toString()).toBe('11854153102');
    expect(transaction.gasUsed.toString()).toBe('65470');
    expect(transaction.index).toBe(200);
    expect(transaction.contractAddress).toBe(undefined);
    expect(transaction.receiptRoot).toBe(undefined);
    expect(transaction.receiptStatus).toBe(1);
    expect(transaction.data).toBe(
      '0x42842e0e000000000000000000000000fe2575c6402e56fa977651ea30bbfa0d3b4ae57800000000000000000000000033e1f53bb774146fb602d70e5f0daa26485b0a5600000000000000000000000000000000000000000000000000000000000002a8360c6ebe',
    );
    expect(transaction.from.checksum).toBe('0xFE2575C6402E56FA977651Ea30bBFA0d3B4aE578');
    expect(transaction.hash).toBe('0x6277c80d1e889c2095da245e65f386bcd5d85adbbaf9e86e87dc785f97d75950');
    expect(transaction.nonce!.toString()).toBe('281');
    expect(transaction.value!.toString()).toBe('0');
    expect(transaction.blockHash).toBe('0x9e9c0f015d233a73549e06b91b34a77ce0ea204e513d8e5196d546db446c182a');
    expect(transaction.blockNumber.toString()).toBe('16038636');
    expect(transaction.blockTimestamp.toISOString()).toBe('2022-11-24T08:26:35.000Z');
    expect(transaction.gas!.toString()).toBe('65470');
    expect(transaction.to!.checksum).toBe('0x7dE3085b3190B3a787822Ee16F23be010f5F8686');
    expect(transaction.logs.length).toBe(2);

    const transactionLog = transaction.logs[0];
    expect(transactionLog.chain.hex).toBe('0x1');
    expect(transactionLog.logIndex).toBe(478);
    expect(transactionLog.transactionHash).toBe('0x6277c80d1e889c2095da245e65f386bcd5d85adbbaf9e86e87dc785f97d75950');
    expect(transactionLog.data).toBe('0x');
    expect(transactionLog.topics).toStrictEqual([
      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      '0x000000000000000000000000fe2575c6402e56fa977651ea30bbfa0d3b4ae578',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x00000000000000000000000000000000000000000000000000000000000002a8',
    ]);
    expect(transactionLog.blockHash).toBe('0x9e9c0f015d233a73549e06b91b34a77ce0ea204e513d8e5196d546db446c182a');
    expect(transactionLog.blockNumber).toBe(16038636);
    expect(transactionLog.blockTimestamp).toBe('2022-11-24T08:26:35.000Z');
    expect(transactionLog.address.checksum).toBe('0x7dE3085b3190B3a787822Ee16F23be010f5F8686');
  });

  it('should not get the transactions of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.transaction
      .getWalletTransactionsVerbose({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
        chain: '0x1',
      })
      .then()
      .catch((err: unknown) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.transaction.getWalletTransactionsVerbose({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
        chain: '0x1',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
