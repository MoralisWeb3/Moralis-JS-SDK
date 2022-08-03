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

  it('should get the token transfers of an account', async () => {
    const result = await evmApi.account.getTokenTransfers({
      address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530e',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(44);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get token transfers of an invalid account address and throw an error ', () => {
    const failedResult = evmApi.account
      .getTokenTransfers({
        address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getTokenTransfers({
        address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
