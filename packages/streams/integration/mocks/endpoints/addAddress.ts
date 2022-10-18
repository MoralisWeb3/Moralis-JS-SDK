import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSimpleStreamResponse } from '../response/simpleStreamResponse';

export const mockAddAddressEvm = MockScenarios.create(
  {
    method: 'post',
    name: 'mockAddAddressEvm',
    url: `/streams/evm/:id/address`,
    getParams: (req) => ({
      id: req.params.id,
      address: req.body.address,
    }),
  },
  [
    {
      condition: {
        id: 'VALID_RESPONSE',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
      },
      response: createSimpleStreamResponse('VALID_RESPONSE', '0x295522b61890c3672d12efbff4358a6411ce996f'),
    },

    {
      condition: {
        id: 'MULTIPLE_ADDRESSES',
        address: ['0x295522b61890c3672d12efbff4358a6411ce996f', '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'],
      },
      response: createSimpleStreamResponse('MULTIPLE_ADDRESSES', [
        '0x295522b61890c3672d12efbff4358a6411ce996f',
        '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
      ]),
    },
    {
      condition: {
        id: 'INVALID_ADDRESS',
        address: 'some-address',
      },
      responseStatus: 400,
      response: createErrorResponse('Invalid Address: some-address'),
    },
    {
      condition: {
        id: 'STREAM_NOT_FOUND',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
      },
      responseStatus: 404,
      response: createErrorResponse('Stream not found'),
    },
  ],
);
