import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockResolveDomain = MockScenarios.create(
  {
    name: 'mockResolveDomain',
    method: 'get',
    url: '/resolve/:domain',
    getParams: (req) => ({
      domain: req.params.domain,
      currency: req.url.searchParams.get('currency'),
    }),
  },
  [
    {
      condition: {
        domain: 'brad.crypto',
      },
      response: {
        address: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
      },
    },
    {
      condition: {
        domain: 'notfound.crypto',
      },
      responseStatus: 404,
      response: createErrorResponse('null'),
    },
  ],
);
