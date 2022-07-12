import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEnvApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEnvApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should get the transactions of an account', async () => {
    const result = await evmApi.account.getTransactions({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(404);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the transactions of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.account
      .getTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
