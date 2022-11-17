import { MockScenarios } from '@moralisweb3/test-utils';
import { createBalanceResponse } from '../response/balanceResponse';

export const mockGetNativeBalance = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNativeBalance',
    url: '/:address/balance',
    getParams: (req) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
      },
      response: createBalanceResponse('39600000000000000'),
    },
  ],
);
