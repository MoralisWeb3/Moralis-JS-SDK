import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockResolveENSDomain = MockScenarios.create(
  {
    name: 'mockResolveENSDomain',
    method: 'get',
    url: '/resolve/ens/:domain',
    getParams: ({ req }) => ({
      domain: req.params.domain,
    }),
  },
  [
    {
      condition: {
        domain: 'nick.eth',
      },
      response: {
        address: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
      },
    },
    {
      condition: {
        domain: 'unknown.eth',
      },
      responseStatus: 404,
      response: createErrorResponse('null'),
    },
  ],
);
