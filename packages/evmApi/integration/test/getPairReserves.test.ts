import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('getPairReserves', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('should get the liquidity reserves for a given pair address ', async () => {
    const result = await evmApi.defi.getPairReserves({
      pairAddress: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      chain: 0x38,
    });

    expect(result.result.reserve0).toBe('3306559496062120878084');
    expect(result.result.reserve1).toBe('878923281701700934205705');
  });
});
