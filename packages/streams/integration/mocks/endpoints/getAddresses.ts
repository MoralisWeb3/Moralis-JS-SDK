import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { paginatedAddressesResponse } from '../response/paginatedAddressesResponse';

export const mockGetAddressesEvm = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetAddressesEvm',
    url: `/streams/evm/:id/address`,
    getParams: (req) => ({
      id: req.params.id,
      address: req.body.address,
    }),
  },
  [
    {
      condition: {
        id: 'VALID_RESPONSE_0',
      },
      response: paginatedAddressesResponse([], 0),
    },
    {
      condition: {
        id: 'VALID_RESPONSE_1',
      },
      response: paginatedAddressesResponse(
        [
          {
            address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
            id: 'bdf3fa5b-c3e1-485f-a69b-225e57fbc042',
          },
        ],
        1,
      ),
    },
    {
      condition: {
        id: 'VALID_RESPONSE_2',
      },
      response: paginatedAddressesResponse(
        [
          {
            address: '0x295522b61890c3672d12efbff4358a6411ce996f',
            id: '72decebb-60dc-48d3-962a-f67d5b4e36d3',
          },
          {
            address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
            id: 'bdf3fa5b-c3e1-485f-a69b-225e57fbc042',
          },
        ],
        2,
      ),
    },
    {
      condition: {
        id: 'VALID_RESPONSE_CURSOR',
      },
      response: paginatedAddressesResponse(
        [
          {
            address: '0x0ccedbd2f0fecc5fdaf9097e513f18c5da47fca2',
            id: '92b96d04-a7a7-42d5-89fe-d9673224637f',
          },
        ],
        2,
        'cd07aa2328b9243d6dacfb10433184ab3d36a89f97b516dd09cbb803f5039adb0032d0dfe8132aa51e1c1112c505aeaa',
      ),
    },
    {
      condition: {
        id: 'STREAM_NOT_FOUND',
      },
      responseStatus: 404,
      response: createErrorResponse('Stream not found'),
    },
  ],
);
