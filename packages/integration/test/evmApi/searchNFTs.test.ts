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

  it('returns NFTs', async () => {
    const result = await evmApi.nft.searchNFTs({
      q: 'Pancake',
      filter: 'name',
    });

    // TODO: need to add the mock responese for above arguments.
    expect(result).toBeDefined();
  });
});
