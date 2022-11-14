import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('searchNFTs', () => {
  let evmApi: EvmApi;

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
