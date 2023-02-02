import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { paginatedAddressesResponse } from '../../response/paginatedAddressesResponse';

export const mockGetAddressesAptos = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetAddressesAptos',
    url: `/streams/aptos/:id/address`,
    getParams: ({ req }) => {
      return {
        id: req.params.id,
        limit: req.url.searchParams.get('limit'),
      };
    },
  },
  [
    {
      condition: {
        id: 'VALID_RESPONSE_0',
        limit: '5',
      },
      response: paginatedAddressesResponse([], 0),
    },
    {
      condition: {
        id: 'VALID_RESPONSE_1',
        limit: '5',
      },
      response: paginatedAddressesResponse(
        [
          {
            address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          },
        ],
        1,
      ),
    },
    {
      condition: {
        id: 'VALID_RESPONSE_2',
        limit: '5',
      },
      response: paginatedAddressesResponse(
        [
          {
            address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          },
          {
            address: '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
          },
        ],
        2,
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
