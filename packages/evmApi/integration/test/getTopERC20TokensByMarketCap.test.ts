import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getTopERC20TokensByMarketCap', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns transfers', async () => {
    const response = await evmApi.marketData.getTopERC20TokensByMarketCap();

    expect(response.result.length).toEqual(2);

    const item1 = response.result[0];
    expect(item1.rank).toEqual(1);
    expect(item1.tokenName).toEqual('Wrapped Ether');
    expect(item1.tokenSymbol).toEqual('WETH');
    expect(item1.tokenLogo).toEqual('https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png');
    expect(item1.tokenDecimals).toEqual('18');
    expect(item1.contractAddress.checksum).toEqual('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    expect(item1.priceUsd).toEqual('1844.6');
    expect(item1.price24hPercentChange).toEqual('-1.08');
    expect(item1.price7dPercentChange).toEqual('0.86');
    expect(item1.marketCapUsd).toEqual('223688267319');
  });
});
