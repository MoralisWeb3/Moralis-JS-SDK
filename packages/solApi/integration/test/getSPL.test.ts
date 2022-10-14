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

  it('should get the SPL of an account ', async () => {
    const result = await SolApi.account.getSPL({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ associatedTokenAddress: 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU' });
  });

  it('should not get the SPL of an account', async () => {
    const failedResult = await SolApi.account
      .getSPL({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.account.getSPL({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
