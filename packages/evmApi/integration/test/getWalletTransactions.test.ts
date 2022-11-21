import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('getWalletTransactions', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('should get the transactions of an account', async () => {
    const response = await evmApi.transaction.getWalletTransactions({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      chain: '0x5',
    });
    const result = response.result;

    expect(response).toBeDefined();
    expect(response.raw.total).toBe(2000);
    expect(result[0].blockHash).toBe('0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86');
    expect(result[0].blockNumber.toString()).toBe('12526958');
    expect(result[0].from.format()).toBe('0xd4a3bebd824189481fc45363602b83c9c7e9cbdf');
    expect(result[0].gas?.toString()).toBe('6721975');
  });

  it('should not get the transactions of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.transaction
      .getWalletTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
        chain: '0x5',
      })
      .then()
      .catch((err: unknown) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.transaction.getWalletTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
        chain: '0x5',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
