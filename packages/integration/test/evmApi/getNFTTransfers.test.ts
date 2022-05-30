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

  it('should get the NFTs Transfers of an account address', async () => {
    const result = await EvmApi.account.getNFTTransfers({
      address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.legacy.total).toBe(126);
  });

  it('should not get the NFTs Transfers and return an error code for an invalid address', () => {
    const failedResult = EvmApi.account
      .getNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.account.getNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
