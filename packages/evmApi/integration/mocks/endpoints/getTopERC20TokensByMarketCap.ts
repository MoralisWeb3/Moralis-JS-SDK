import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetTopERC20TokensByMarketCap = MockScenarios.create(
  {
    name: 'mockGetTopERC20TokensByMarketCap',
    getParams: () => ({}),
    url: '/market-data/erc20s/top-tokens',
    method: 'get',
  },
  [
    {
      condition: {},
      response: [
        {
          rank: 1,
          token_name: 'Wrapped Ether',
          token_symbol: 'WETH',
          token_logo: 'https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
          token_decimals: '18',
          contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          price_usd: '1844.6',
          price_24h_percent_change: '-1.08',
          price_7d_percent_change: '0.86',
          market_cap_usd: '223688267319',
        },
        {
          rank: 2,
          token_name: 'Tether USD',
          token_symbol: 'USDT',
          token_logo: 'https://cdn.moralis.io/eth/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
          token_decimals: '6',
          contract_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          price_usd: '0.999967',
          price_24h_percent_change: '-0.2',
          price_7d_percent_change: '0',
          market_cap_usd: '82088431876',
        },
      ],
    },
  ],
);
