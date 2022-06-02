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

    server.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the token address transfers of an account', async () => {
    const result = await EvmApi.token.getTokenAddressTransfers({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(807091);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token address transfers of an invalid account and throw an error ', async () => {
    const failedResult = await EvmApi.token
      .getTokenAddressTransfers({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getTokenAddressTransfers({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
