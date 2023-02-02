import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createSimpleStreamResponse } from '../../response/simpleStreamResponse';

export const mockAddAddressEvm = MockScenarios.create(
  {
    method: 'post',
    name: 'mockAddAddressEvm',
    url: `/streams/evm/:id/address`,
    getParams: ({ req, reqBody }) => {
      return {
        id: req.params.id,
        address: reqBody?.address,
      };
    },
  },
  [
    {
      condition: {
        id: 'VALID_RESPONSE',
        address: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
      },
      response: createSimpleStreamResponse('VALID_RESPONSE', '0x295522b61890c3672D12eFbFf4358a6411CE996F'),
    },

    {
      condition: {
        id: 'MULTIPLE_ADDRESSES',
        address: ['0x295522b61890c3672D12eFbFf4358a6411CE996F', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
      },
      response: createSimpleStreamResponse('MULTIPLE_ADDRESSES', [
        '0x295522b61890c3672D12eFbFf4358a6411CE996F',
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      ]),
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
        address: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
      },
      responseStatus: 404,
      response: createErrorResponse('Stream not found'),
    },
  ],
);
