import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetPortfolioSol = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetPortfolioSol',
    url: `/account/:network/:address/portfolio`,
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
      response: {
        tokens: [
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
        nfts: [
          {
            associatedTokenAddress: 'Aymvy5sNtxRpUBFT19nNetsGb4VBpmb6qyPs2ybGPUcr',
            mint: '9PN8gNqJy5mVnr8PJSaiKULG2inbTZxm4Xwgc2LM6x5Z',
            amountRaw: '1',
            amount: '1',
            decimals: '0',
            name: 'Nug 5585',
            symbol: 'METAWANA',
          },
          {
            associatedTokenAddress: 'Gshsqnk1qWDy1PcryceyjQQnSvUzqFnmiE9LLwvFPZdx',
            mint: '5E56nvwdbFSyT52Wp4Kw3FBHpxdh5szVpvS8ASUX7nn8',
            amountRaw: '1',
            amount: '1',
            decimals: '0',
            name: 'Centaur #105',
            symbol: 'CREATURE',
          },
          {
            associatedTokenAddress: 'BBbk2gueQr8zDVf6whMD7snPZnJ8B8GedeQQo3qnLq3y',
            mint: '5J3wusYQsCDqBsapYoajGUQwiSJN4CTPXAL4P5QwejvN',
            amountRaw: '1',
            amount: '1',
            decimals: '0',
            name: 'Goonie #365',
            symbol: 'GOON',
          },
        ],
        nativeBalance: {
          lamports: '902329912',
          solana: '0.902329912',
        },
      },
    },
  ],
);
