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

  it('should get the token transfers of an account', async () => {
    const result = await EvmApi.account.getTokenTransfers({
      address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530e',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.toJSON()).toEqual(expect.arrayContaining([expect.objectContaining({})]));
  });

  it('should not get token transfers of an invalid account address and throw an error ', () => {
    const failedResult = EvmApi.account
      .getTokenTransfers({
        address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.account.getTokenTransfers({
        address: '0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
