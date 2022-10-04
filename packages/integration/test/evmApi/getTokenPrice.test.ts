import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getTokenPrice', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns an info', async () => {
    const response = await evmApi.token.getTokenPrice({
      address: '0x0000000000000000000000000000000000000001',
    });

    expect(response.result.usdPrice).toBe(0.000011961341215674);
    expect(response.result.exchangeAddress?.lowercase).toBe('0x1f98431c8ad98523631ae4a59f267346ea31f984');
    expect(response.result.exchangeName).toBe('Uniswap v3');
  });

  it('passes chain correctly', async () => {
    const response = await evmApi.token.getTokenPrice({
      address: '0x0000000000000000000000000000000000000002',
      chain: 0x13881,
    });
    expect(response).toBeDefined();
  });

  it('passes toBlock correctly', async () => {
    const response = await evmApi.token.getTokenPrice({
      address: '0x0000000000000000000000000000000000000003',
      toBlock: 512,
    });
    expect(response).toBeDefined();
  });
});
