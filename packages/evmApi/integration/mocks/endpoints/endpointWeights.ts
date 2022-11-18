import { MockScenarios } from '@moralisweb3/test-utils';

const response = [
  {
    endpoint: 'getBlock',
    path: '/block/{block_number_or_hash}',
    price: 5,
    rateLimitCost: 5,
  },
  {
    endpoint: 'getContractEvents',
    path: '/{address}/events',
    price: 2,
    rateLimitCost: 2,
  },
  {
    endpoint: 'getTransactions',
    path: '/transaction/{transaction_hash}',
    price: 1,
    rateLimitCost: 1,
  },
  // ...
];

export const mockEndpointWeights = MockScenarios.create(
  {
    name: 'mockEndpointWeights',
    getParams: () => ({}),
    url: '/info/endpointWeights',
    method: 'get',
  },
  [
    {
      condition: {},
      response: response as never,
    },
  ],
);
