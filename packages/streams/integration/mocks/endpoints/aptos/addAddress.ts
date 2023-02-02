import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createSimpleStreamResponse } from '../../response/simpleStreamResponse';

export const mockAddAddressAptos = MockScenarios.create(
  {
    method: 'post',
    name: 'mockAddAddressAptos',
    url: `/streams/aptos/:id/address`,
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
        address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      },
      response: createSimpleStreamResponse(
        'VALID_RESPONSE',
        '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      ),
    },

    {
      condition: {
        id: 'MULTIPLE_ADDRESSES',
        address: [
          '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
          '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
        ],
      },
      response: createSimpleStreamResponse('MULTIPLE_ADDRESSES', [
        '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
        '0x19aadeca9388e009d136245b9a67423f3eee242b03142849eb4f81a4a409e59c',
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
        address: '0xeeff357ea5c1a4e7bc11b2b17ff2dc2dcca69750bfef1e1ebcaccf8c8018175b',
      },
      responseStatus: 404,
      response: createErrorResponse('Stream not found'),
    },
  ],
);
