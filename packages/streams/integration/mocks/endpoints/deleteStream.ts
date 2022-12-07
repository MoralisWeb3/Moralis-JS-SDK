import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createStreamResponse } from '../response/streamResponse';

export const mockDeleteStream = MockScenarios.create(
  {
    method: 'delete',
    name: 'mockDeleteStream',
    url: `/streams/evm/:id`,
    getParams: async (req) => {
      const body = await req.json().catch(() => ({}));

      return {
        id: req.params.id,
        address: body.address,
      };
    },
  },
  [
    {
      condition: {
        id: 'VALID_RESPONSE',
      },
      response: createStreamResponse('valid-response'),
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
