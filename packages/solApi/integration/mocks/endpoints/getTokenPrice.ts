import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetTokenPrice = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTokenPrice',
    url: `/token/:network/:address/price`,
    getParams: ({ req }) => ({
      network: req.params.network,
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        network: 'mainnet',
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      },
      response: {
        usdPrice: 0.9965,
        exchangeName: 'Raydium',
        exchangeAddress: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
        nativePrice: {
          value: '3134963087',
          symbol: 'WSOL',
          name: 'Wrapped Solana',
          decimals: 9,
        },
      },
    },
  ],
);
