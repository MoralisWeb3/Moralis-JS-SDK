import { MockScenarios } from '@moralisweb3/test-utils';
import { createAllowanceResponse } from '../response/allowanceResponse';

export const mockGetTokenAllowance = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetTokenAllowance',
    url: '/erc20/:address/allowance',
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      },
      response: createAllowanceResponse('0'),
    },
  ],
);
