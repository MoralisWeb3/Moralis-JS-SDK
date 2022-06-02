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

  it('should Gets NFTs that match a given metadata search', async () => {
    const result = await EvmApi.token.searchNFTs({
      q: 'Pancake',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(5671);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get NFTs that match a given metadata search and returns an error of empty metadata', async () => {
    const failedResult = await EvmApi.token
      .searchNFTs({
        q: '',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.searchNFTs({
        q: '',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 404"`);
  });
});
