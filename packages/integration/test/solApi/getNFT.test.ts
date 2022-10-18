import { MoralisSolApi } from '@moralisweb3/sol-api';
import { cleanSolApi, setupSolApi } from './setup';

describe('Moralis SolApi', () => {
  let SolApi: MoralisSolApi;

  beforeAll(() => {
    SolApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('should get the NFTs of an account ', async () => {
    const result = await SolApi.account.getNFTs({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });
    const nfts = result.result;

    expect(nfts.length).toBe(2);
    expect(nfts[0].mint.toString()).toBe('9spQWuJozohLUK1ReyhsWUrkgDfDMS2U8cMwMoxifkxM');
    expect(nfts[0].associatedTokenAddress.toString()).toBe('DU1MLkMBperU2nmjjZSwhaSDQxxg3Jtu8XPyroM6fkmu');
  });
});
