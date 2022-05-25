import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should get the transactions of an account', async () => {
    const result = await EvmApi.account.getTransactions({
      address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.toJSON()).toEqual(expect.arrayContaining([expect.objectContaining({})]));
  });

  it('should not get the transactions of an invalid account and throw an error ', () => {
    const failedResult = EvmApi.account
      .getTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.account.getTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
