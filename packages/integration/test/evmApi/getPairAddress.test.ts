import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should get pair data for a given pair address ', async () => {
    const result = await EvmApi.defi.getPairAddress({
      token0Address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      token1Address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      exchange: 'pancakeswapv1',
      chain: 'bsc',
    });

    expect(result).toBeDefined();
    expect(result.raw).toStrictEqual({ token0: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' });
  });

  it('should not get pair data for a given pair address ', async () => {
    expect(
      EvmApi.defi.getPairAddress({
        token0Address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095',
        token1Address: '0xe9e7cea3dedca5984780bafc599bd69add087d5',
        exchange: 'pancakeswapv1',
        chain: 'bsc',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
