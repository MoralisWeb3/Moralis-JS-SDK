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

  it('should get the balance of an account ', async () => {
    const result = await SolApi.account.getBalance({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ balance: '26612405083' });
  });

  it('should not get the balance of an account', async () => {
    const failedResult = await SolApi.account
      .getBalance({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      })
      .then()
      .catch((err: any) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.account.getBalance({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
