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

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ associatedTokenAddress: '6zZsdnfhhfnf' });
  });

  it('should not get the NFTs of an account', async () => {
    const failedResult = await SolApi.account
      .getNFTs({
        network: 'mainnet',
        address: '5xogZq93dyJtoSwp',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.account.getNFTs({
        network: 'mainnet',
        address: '5xotoSwp',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
