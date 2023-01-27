import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';
import { createEvmStreamResponse } from '../../response/evmStreamResponse';

export const mockDeleteStreamEvm = MockScenarios.create(
  {
    method: 'delete',
    name: 'mockDeleteStreamEvm',
    url: `/streams/evm/:id`,
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
      },
      response: createEvmStreamResponse('valid-response'),
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
