import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletTokenBalances', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns balances', async () => {
    const response = await evmApi.token.getWalletTokenBalances({
      address: '0x72FDD62FbFa2fAa9A8677C58d9992068772e0f7F',
    });

    expect(response.result.length).toEqual(2);

    const balance = response.result[0];
    expect(balance.decimals).toBe(18);
    expect(balance.amount.toString()).toBe('795917396650797993089');

    expect(balance.token).toBeDefined();
    expect(balance.token!.contractAddress.checksum).toBe('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    expect(balance.token!.name).toBe('Wrapped Ether');
    expect(balance.token!.symbol).toBe('WETH');
    expect(balance.token!.logo).toBe('https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png');
    expect(balance.token!.thumbnail).toBe(
      'https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2_thumb.png',
    );
    expect(balance.token!.decimals).toBe(balance.decimals);
  });
});
