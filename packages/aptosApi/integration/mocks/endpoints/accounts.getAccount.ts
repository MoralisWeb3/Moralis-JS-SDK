import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetAccount = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetAccount',
    url: `/accounts/:address`,
    getParams: ({ req }) => ({
      address: req.params.address,
    }),
  },
  [
    {
      condition: {
        address: '0x7abf3bc917c75e13b2225417aa1b008a4c1b1a6b487739ad0a39ef847b9c2f8e',
      },
      response: {
        sequence_number: '0',
        authentication_key: '0x7abf3bc917c75e13b2225417aa1b008a4c1b1a6b487739ad0a39ef847b9c2f8e',
      },
    },
  ],
);
