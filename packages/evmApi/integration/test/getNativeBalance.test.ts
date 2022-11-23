import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNativeBalance', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the native balance of an account', async () => {
    const result = await evmApi.balance.getNativeBalance({
      address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
    });

    expect(result.toJSON().balance).toBe('39600000000000000');
    expect(result).toBeDefined();
  });

  it('should not get the native account balance and return an error code for an invalid address', async () => {
    const failedResult = await evmApi.balance
      .getNativeBalance({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.balance.getNativeBalance({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
