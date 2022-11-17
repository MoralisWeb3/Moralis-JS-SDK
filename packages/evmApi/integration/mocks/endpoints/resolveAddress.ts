import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockResolveAddress = MockScenarios.create(
  {
    name: 'mockResolveAddress',
    method: 'get',
    getParams: (req) => ({
      address: req.params.address,
    }),
    url: '/resolve/:address/reverse',
  },
  [
    {
      condition: {
        address: '0x4044044044044044044044044044044044044040',
      },
      response: createErrorResponse('null'),
      responseStatus: 404,
    },
    {
      condition: {
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      },
      response: {
        name: 'vitalik.eth',
      },
    },
  ],
);
