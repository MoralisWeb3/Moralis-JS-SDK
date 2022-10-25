import { SolApi } from '../../src/SolApi';
import { cleanSolApi, setupSolApi } from '../setup';

describe('Moralis SolApi', () => {
  let solApi: SolApi;

  beforeAll(() => {
    solApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('returns metadata', async () => {
    const result = await solApi.nft.getNFTMetadata({
      network: 'mainnet',
      address: '9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A',
    });

    expect(result.result.name).toBe('Degen Ape #7225');
    expect(result.result.symbol).toBe('DAPE');
    expect(result.result.metaplex.sellerFeeBasisPoints).toBe(420);
    expect(result.result.metaplex.primarySaleHappened).toBe(1);
    expect(result.result.metaplex.isMutable).toBe(false);
  });
});
