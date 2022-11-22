import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetPairAddress = MockScenarios.create(
  {
    name: 'mockGetPairAddress',
    getParams: (req) => ({
      token0_address: req.params['token0_address'],
      token1_address: req.params['token1_address'],
      exchange: req.url.searchParams.get('exchange'),
      chain: req.url.searchParams.get('chain'),
    }),
    url: '/:token0_address/:token1_address/pairAddress',
    method: 'get',
  },
  [
    {
      condition: {
        token0_address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        token1_address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        exchange: 'pancakeswapv1',
        chain: '0x38',
      },
      response: {
        token0: {
          address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
          name: 'Wrapped BNB',
          symbol: 'WBNB',
          logo: null,
          logo_hash: null,
          thumbnail: null,
          decimals: '18',
          block_number: '8242108',
          validated: 1,
          created_at: '2022-01-20T10:41:03.034Z',
        },
        token1: {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          name: 'BUSD Token',
          symbol: 'BUSD',
          logo: null,
          logo_hash: null,
          thumbnail: null,
          decimals: '18',
          block_number: '8242108',
          validated: 1,
          created_at: '2022-01-20T10:41:03.034Z',
        },
        pairAddress: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      },
    },
  ],
);
