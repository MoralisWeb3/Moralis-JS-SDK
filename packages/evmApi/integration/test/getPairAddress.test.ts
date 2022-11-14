import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getPairAddress', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get pair data for a given pair address ', async () => {
    const result = await evmApi.defi.getPairAddress({
      token0Address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      token1Address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      exchange: 'pancakeswapv1',
      chain: 56,
    });

    expect(result).toBeDefined();
    expect(result.raw).toStrictEqual({ token0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' });
  });

  it('should not get pair data for a given pair address ', async () => {
    expect(
      evmApi.defi.getPairAddress({
        token0Address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095',
        token1Address: '0xe9e7cea3dedca5984780bafc599bd69add087d5',
        exchange: 'pancakeswapv1',
        chain: 56,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
