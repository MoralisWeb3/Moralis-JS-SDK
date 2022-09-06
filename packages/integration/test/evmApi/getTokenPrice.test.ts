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
      address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    });

    expect(response.result.usdPrice).toBe(0.000011961341215674);
    expect(response.result.exchangeAddress?.lowercase).toBe('0x1f98431c8ad98523631ae4a59f267346ea31f984');
    expect(response.result.exchangeName).toBe('Uniswap v3');
  });
});
