import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getContractLogs', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get logs for an address', async () => {
    const result = await evmApi.events.getContractLogs({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(856189);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get logs for an invalid address and return an error code', async () => {
    const failedResult = await evmApi.events
      .getContractLogs({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.events.getContractLogs({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
