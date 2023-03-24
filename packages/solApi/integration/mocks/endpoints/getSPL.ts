import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetSPLSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetSPLSol',
    url: `/account/:network/:address/tokens`,
    getParams: ({ req }) => ({
      network: req.params.network,
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        network: 'mainnet',
        address: 'EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6',
      },
      response: [
        {
          associatedTokenAddress: 'FaygwmWV2RGQVABXdvaPoa4Kar8EcjpaQcB4czcy4pUJ',
          mint: 'EL4YBAq2vnh2oQe454x64f4WJGxrywtUtxhJpv4cx2ks',
          amountRaw: '2',
          amount: '2',
          decimals: '0',
          name: 'Cets Ears',
          symbol: 'goons',
        },
        {
          associatedTokenAddress: 'J3sQDCWQQuZRCSgW7BWZ8s8Zoz16mprPxoCuryo6YXUX',
          mint: 'VVWAy5U2KFd1p8AdchjUxqaJbZPBeP5vUQRZtAy8hyc',
          amountRaw: '7777000000000',
          amount: '7777',
          decimals: '9',
          name: "Flip.gg | Code:'MARCH23'",
          symbol: 'Free $0.33',
        },
      ],
    },
  ],
);
