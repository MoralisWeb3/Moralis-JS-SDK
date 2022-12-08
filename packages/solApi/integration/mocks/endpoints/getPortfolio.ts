import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetPortfolioSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetPortfolioSol',
    url: `/account/:network/:address/portfolio`,
    getParams: async ({ req }) => ({
      network: req.params.network,
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        network: 'mainnet',
        address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
      },
      response: {
        tokens: [],
        nfts: [],
        nativeBalance: { lamports: '1461600', solana: '0.0014616' },
      },
    },
  ],
);
