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

  it('should get the token allowance of an account', async () => {
    const result = await evmApi.token.getTokenAllowance({
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    });

    expect(result).toBeDefined();
    expect(result.raw.allowance).toBe('10');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token allowance of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.token
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
      evmApi.token.getTokenAllowance({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec',
        ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
