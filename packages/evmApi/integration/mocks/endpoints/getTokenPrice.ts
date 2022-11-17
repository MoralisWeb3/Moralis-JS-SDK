import { MockScenarios } from '@moralisweb3/test-utils';
import { createTokenPriceResponse } from '../response/tokenPriceResponse';

export const mockGetTokenPrice = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTokenPrice',
    url: '/erc20/:address/price',
    getParams: (req) => ({
      address: req.params.address,
      chain: req.url.searchParams.get('chain'),
      toBlock: req.url.searchParams.get('to_block'),
    }),
  },
  [
    {
      condition: {
        address: '0x0000000000000000000000000000000000000001',
        chain: '0x1',
      },
      response: createTokenPriceResponse('0x0000000000000000000000000000000000000001'),
    },
    {
      condition: {
        address: '0x0000000000000000000000000000000000000002',
        chain: '0x13881',
      },
      response: createTokenPriceResponse('0x0000000000000000000000000000000000000002'),
    },
    {
      condition: {
        address: '0x0000000000000000000000000000000000000003',
        chain: '0x1',
        toBlock: '512',
      },
      response: createTokenPriceResponse('0x0000000000000000000000000000000000000003'),
    },
  ],
);
