import { MoralisEvmApi } from '../../src/EvmApi';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTOwners', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  function assertOwner(nft: EvmNft) {
    expect(nft.blockNumber?.toString()).toEqual('15458263');
    expect(nft.name).toEqual('BoredApeYachtClub');
    expect(nft.contractType).toEqual('ERC721');
    expect(nft.symbol).toEqual('BAYC');
  }

  it('returns owners with pagination', async () => {
    let response = await evmApi.nft.getNFTOwners({
      address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    });

    expect(response.pagination.total).toEqual(150);
    expect(response.pagination.page).toEqual(1);
    expect(response.pagination.pageSize).toEqual(100);
    expect(response.result.length).toEqual(100);
    expect(response.hasNext()).toEqual(true);
    assertOwner(response.result[0]);

    response = await response.next();

    expect(response.pagination.total).toEqual(150);
    expect(response.pagination.page).toEqual(2);
    expect(response.pagination.pageSize).toEqual(100);
    expect(response.result.length).toEqual(50);
    expect(response.hasNext()).toEqual(false);
    assertOwner(response.result[0]);
  });
});
