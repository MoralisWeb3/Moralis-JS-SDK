import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetPairReserves = MockScenarios.create(
  {
    name: 'mockGetPairReserves',
    getParams: (req) => ({
      pair_address: req.params['pair_address'],
      chain: req.url.searchParams.get('chain'),
    }),
    url: '/:pair_address/reserves',
    method: 'get',
  },
  [
    {
      condition: {
        pair_address: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
        chain: '0x38',
      },
      response: {
        reserve0: '3306559496062120878084',
        reserve1: '878923281701700934205705',
      },
    },
  ],
);
