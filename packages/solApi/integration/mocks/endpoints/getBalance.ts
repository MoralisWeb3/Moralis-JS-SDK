import { MockScenarios } from '../../MockScenarios';

export const mockGetBalanceSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetBalanceSol',
    url: `/account/:network/:address/balance`,
    getParams: (req) => ({
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
        lamports: '10000000000',
      },
    },
  ],
);
