import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetSPLSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetSPLSol',
    url: `/account/:network/:address/tokens`,
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
      response: [
        {
          associatedTokenAddress: 'BBsN4yXTFQkmCqiDDUA9VZfsv2xc4BMTan2uk4V9AVvG',
          mint: 'DRQBDBEWmwWGK13fRTLhSPzjbvMSUavhV6nW4RUH8W6T',
          amountRaw: '10000000000',
          amount: '100',
          decimals: '8',
        },
        {
          associatedTokenAddress: 'ETWQorqbccyF5c9cL94yG6aywB3TLi948VoCxg5ug9eb',
          mint: '4hpngEp1v3CXpeKB81Gw4sv7YvwUVRKvY3SGag9ND8Q4',
          amountRaw: '2009990',
          amount: '2009990',
          decimals: '0',
        },
        // TODO: 'any' should be deleted
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    },
  ],
);
