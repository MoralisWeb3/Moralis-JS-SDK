import { SolApi } from '../../src/SolApi';
import { cleanSolApi, setupSolApi } from '../setup';

describe('Moralis SolApi', () => {
  let SolApi: SolApi;

  beforeAll(() => {
    SolApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('returns a balance', async () => {
    const result = await SolApi.account.getBalance({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });

    expect(result.result.toString()).toBe('10000000000000000000');
  });
});
