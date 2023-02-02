import { MockScenarios } from '@moralisweb3/test-utils';

export const mockRemoveBind = MockScenarios.create(
  {
    name: 'mockRemoveBind',
    getParams: ({ reqBody }) => ({
      blockchainType: reqBody?.blockchainType,
      address: reqBody?.address,
      profileId: reqBody?.profileId,
    }),
    url: '/bind/remove',
    method: 'post',
  },
  [
    {
      condition: {
        blockchainType: 'evm',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        profileId: '0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff',
      },
      response: {
        message:
          'Please sign this message to unbind:\nAddress: 0x6ed338bcB610640e81465FCfb9894DDfA354Cc91\nfrom\nProfile Id:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\nNonce: 5pXWu7aGkY2J7II0X',
      },
    },
  ],
);
