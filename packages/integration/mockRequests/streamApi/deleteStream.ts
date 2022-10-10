import { MockScenarios } from '../../MockScenarios';
import { createErrorResponse } from './response/errorResponse';
import { createStreamResponse } from './response/streamResponse';

export const mockDeleteStream = MockScenarios.create(
  {
    method: 'delete',
    name: 'mockDeleteStream',
    url: `/streams/evm/:id`,
    getParams: (req) => ({
      id: req.params.id,
      address: req.body.address,
    }),
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
