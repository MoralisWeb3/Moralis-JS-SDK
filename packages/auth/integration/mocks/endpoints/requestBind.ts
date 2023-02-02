import { MockScenarios } from '@moralisweb3/test-utils';

export const mockRequestBind = MockScenarios.create(
  {
    name: 'mockRequestBind',
    getParams: ({ reqBody }) => ({
      addresses: reqBody?.addresses,
    }),
    url: '/bind/request',
    method: 'post',
  },
  [
    {
      condition: {
        addresses: [
          {
            blockchainType: 'evm',
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          },
        ],
      },
      responseStatus: 400,
      response: {
        statusCode: 400,
        name: 'BadRequestException',
        message: ['addresses must contain at least 2 elements'],
      },
    },
    {
      condition: {
        addresses: [
          {
            blockchainType: 'evm',
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          },
          {
            blockchainType: 'evm',
            address: '0x57af6B90c2237d2F888bf4CAe56f25FE1b14e531',
          },
        ],
      },
      response: {
        messages: [
          'Please sign this message to bind:\nProfile Ids:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\n\nwith\n\nAddress: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\nNonce: 5pXWu7aGkY2J7II0X',
          'Please sign this message to bind:\nProfile Ids:\n- 0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff\n\nwith\n\nAddress: 0x57af6B90c2237d2F888bf4CAe56f25FE1b14e531\nNonce: 5pXWu7aGkY2J7II0X',
        ],
      },
    },
  ],
);
