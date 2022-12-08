import { MockScenarios } from '@moralisweb3/test-utils';

export const mockWeb3ApiVersion = MockScenarios.create(
  {
    name: 'mockWeb3ApiVersion',
    getParams: () => ({}),
    url: '/web3/version',
    method: 'get',
  },
  [
    {
      condition: {},
      response: { version: '0.0.53' },
    },
  ],
);
