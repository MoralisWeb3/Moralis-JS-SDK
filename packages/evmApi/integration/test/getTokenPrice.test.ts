import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('getTokenPrice', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('returns an info', async () => {
    const address = '0x0000000000000000000000000000000000000001';
    const response = await evmApi.token.getTokenPrice({ address });

    expect(response.result.usdPrice).toBe(0.000011961341215674);
    expect(response.result.exchangeAddress?.lowercase).toBe(address);
    expect(response.result.exchangeName).toBe('Uniswap v3');
  });

  it('passes chain correctly', async () => {
    const address = '0x0000000000000000000000000000000000000002';
    const response = await evmApi.token.getTokenPrice({
      address,
      chain: 0x13881,
    });
    expect(response).toBeDefined();
    expect(response.result.exchangeAddress?.lowercase).toBe(address);
  });

  it('passes toBlock correctly', async () => {
    const address = '0x0000000000000000000000000000000000000003';
    const response = await evmApi.token.getTokenPrice({
      address,
      toBlock: 512,
    });
    expect(response).toBeDefined();
    expect(response.result.exchangeAddress?.lowercase).toBe(address);
  });
});
