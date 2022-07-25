import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the token metadata of an account', async () => {
    const result = await evmApi.token.getTokenMetadata({
      chain: 'eth',
      addresses: ['0xdAC17F958D2ee523a2206206994597C13D831ec7'],
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ name: 'Tether USD' });
  });

  it('should not get the token metadata of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.token
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
      evmApi.token.getTokenMetadata({
        chain: 'eth',
        addresses: ['0xdAC17F958D2ee523a2206206994597C13D831ec'],
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
