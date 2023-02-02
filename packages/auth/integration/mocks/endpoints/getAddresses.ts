import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetAddresses = MockScenarios.create(
  {
    name: 'mockGetAddresses',
    getParams: ({ req }) => ({
      profileId: req.params.profileId,
    }),
    url: '/profile/:profileId/addresses',
    method: 'get',
  },
  [
    {
      condition: {
        profileId: '0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff',
      },
      response: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
    },
  ],
);
