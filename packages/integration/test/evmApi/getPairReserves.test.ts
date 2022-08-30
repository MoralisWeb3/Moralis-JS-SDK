import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the liquidity reserves for a given pair address ', async () => {
    const result = await evmApi.defi.getPairReserves({
      pairAddress: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result.toJSON().reserve0).toBe('232416936901978959300412');
    expect(result.raw.reserve0).toBe('232416936901978959300412');
    expect(result.result.reserve0).toBe('232416936901978959300412');
  });
});
