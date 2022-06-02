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

  it('should get the token allowance of an account', async () => {
    const result = await EvmApi.token.getTokenAllowance({
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    });

    expect(result).toBeDefined();
    expect(result.raw.allowance).toBe('10');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token allowance of an invalid account and throw an error ', async () => {
    const failedResult = await EvmApi.token
      .getTokenAllowance({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec',
        ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getTokenAllowance({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec',
        ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
