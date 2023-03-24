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
        address: 'EJpLyTeE8XHG9CeREeHd6pr6hNhaRnTRJx4Z5DPhEJJ6',
      },
      response: [
        {
          associatedTokenAddress: 'Aymvy5sNtxRpUBFT19nNetsGb4VBpmb6qyPs2ybGPUcr',
          mint: '9PN8gNqJy5mVnr8PJSaiKULG2inbTZxm4Xwgc2LM6x5Z',
          name: 'Nug 5585',
          symbol: 'METAWANA',
        },
        {
          associatedTokenAddress: 'Gshsqnk1qWDy1PcryceyjQQnSvUzqFnmiE9LLwvFPZdx',
          mint: '5E56nvwdbFSyT52Wp4Kw3FBHpxdh5szVpvS8ASUX7nn8',
          name: 'Centaur #105',
          symbol: 'CREATURE',
        },
      ],
    },
  ],
);
