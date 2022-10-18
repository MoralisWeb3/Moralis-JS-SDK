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

  it('returns SPL', async () => {
    const result = await SolApi.account.getSPL({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });
    const spl = result.result;

    expect(spl.length).toBe(2);
    expect(spl[0].associatedTokenAddress.toString()).toBe('BBsN4yXTFQkmCqiDDUA9VZfsv2xc4BMTan2uk4V9AVvG');
    expect(spl[0].mint.toString()).toBe('DRQBDBEWmwWGK13fRTLhSPzjbvMSUavhV6nW4RUH8W6T');
    expect(spl[0].amount.toString()).toBe('10000000000');
  });
});
