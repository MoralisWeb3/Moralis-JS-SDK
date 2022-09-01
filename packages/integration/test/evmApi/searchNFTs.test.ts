import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('searchNFTs', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should Gets NFTs that match a given metadata search', async () => {
    const result = await evmApi.nft.searchNFTs({
      q: 'Pancake',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(5671);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get NFTs that match a given metadata search and returns an error of empty metadata', async () => {
    const failedResult = await evmApi.nft
      .searchNFTs({
        q: '',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.searchNFTs({
        q: '',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 404"`);
  });
});
