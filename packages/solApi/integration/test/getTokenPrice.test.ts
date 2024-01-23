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

  it('returns token price', async () => {
    const { result } = await SolApi.token.getTokenPrice({
      network: 'mainnet',
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    });

    expect(result.exchangeAddress?.address).toBe('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
    expect(result.exchangeName).toBe('Raydium');
    expect(result.usdPrice).toBe(0.9965);
    expect(result.nativePrice?.decimals).toBe(9);
    expect(result.nativePrice?.symbol).toBe('WSOL');
    expect(result.nativePrice?.name).toBe('Wrapped Solana');
    expect(result.nativePrice?.value).toBe('3134963087');
  });
});
