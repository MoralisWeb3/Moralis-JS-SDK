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

  it('returns SPL', async () => {
    const { result } = await SolApi.account.getSPL({
      network: 'mainnet',
      address: 'EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6',
    });

    expect(result.length).toBe(2);

    const token = result[0];
    expect(token.associatedTokenAddress.toString()).toBe('FaygwmWV2RGQVABXdvaPoa4Kar8EcjpaQcB4czcy4pUJ');
    expect(token.mint.toString()).toBe('EL4YBAq2vnh2oQe454x64f4WJGxrywtUtxhJpv4cx2ks');
    expect(token.amount.toString()).toBe('2');
    expect(token.name).toBe('Cets Ears');
    expect(token.symbol).toBe('goons');
  });
});
