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

  it('should get the token metadata of an account', async () => {
    const result = await EvmApi.token.getTokenMetadata({
      chain: 'eth',
      addresses: ['0xdAC17F958D2ee523a2206206994597C13D831ec7'],
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ name: 'Tether USD' });
  });

  it('should not get the token metadata of an invalid account and throw an error ', async () => {
    const failedResult = await EvmApi.token
      .getTokenMetadata({
        chain: 'eth',
        addresses: ['0xdAC17F958D2ee523a2206206994597C13D831ec'],
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getTokenMetadata({
        chain: 'eth',
        addresses: ['0xdAC17F958D2ee523a2206206994597C13D831ec'],
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
