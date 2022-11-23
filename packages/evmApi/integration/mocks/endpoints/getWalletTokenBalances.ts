import { MockScenarios } from '@moralisweb3/test-utils';
import { createTokenBalanceResponse } from '../response/tokenBalanceResponse';

export const mockGetWalletTokenBalances = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetWalletTokenBalances',
    url: '/:address/erc20',
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
      },
      response: [
        createTokenBalanceResponse(
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          'Wrapped Ether',
          'WETH',
          'https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
          'https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2_thumb.png',
          18,
          '795917396650797993089',
        ),
        createTokenBalanceResponse(
          '0x514910771af9ca656af840dff83e8264ecf986ca',
          'Chain Link',
          'LINK',
          'https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png',
          'https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca_thumb.png',
          18,
          '155304334804334409393921',
        ),
      ],
    },
  ],
);
