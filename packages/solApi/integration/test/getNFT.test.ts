import { MoralisSolApi } from '../../src/MoralisSolApi';
import { cleanSolApi, setupSolApi } from '../setup';

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

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ associatedTokenAddress: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp' });
  });

  it('should not get the NFTs of an account', async () => {
    const failedResult = await SolApi.account
      .getNFTs({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.account.getNFTs({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
