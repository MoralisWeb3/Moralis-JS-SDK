import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetNFTSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNFTSol',
    url: `/account/:network/:address/nft`,
    getParams: ({ req }) => ({
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
          associatedTokenAddress: 'DU1MLkMBperU2nmjjZSwhaSDQxxg3Jtu8XPyroM6fkmu',
          mint: '9spQWuJozohLUK1ReyhsWUrkgDfDMS2U8cMwMoxifkxM',
        },
        {
          associatedTokenAddress: 'GyxpmbNDAfkQ1VF5bAVkx4mu7C6T9jY3aQjAavFrJRei',
          mint: 'D1Uo5XbWz75TszVLaH7GSttN4x7H4jUEtbmGSEfG3SRz',
        },
        // TODO: 'any' should be deleted
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    },
  ],
);
