import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSimpleStreamResponse } from '../response/simpleStreamResponse';

export const mockDeleteAddressEvm = MockScenarios.create(
  {
    method: 'delete',
    name: 'mockDeleteAddressEvm',
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
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
      },
      response: createSimpleStreamResponse('VALID_RESPONSE', '0x992eccc191d6f74e8be187ed6b6ac196b08314f7'),
    },
    {
      condition: {
        id: 'INVALID_ADDRESS',
        address: 'some-address',
      },
      responseStatus: 400,
      response: createErrorResponse('Invalid address provided'),
    },
    {
      condition: {
        id: 'STREAM_NOT_FOUND',
        address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
      },
      responseStatus: 404,
      response: createErrorResponse('Stream not found'),
    },
    {
      condition: {
        id: 'ADDRESS_NOT_FOUND',
        address: '0x295522b61890c3672d12efbff4358a6411ce996f',
      },
      responseStatus: 404,
      response: createErrorResponse('Address not found'),
    },
  ],
);
