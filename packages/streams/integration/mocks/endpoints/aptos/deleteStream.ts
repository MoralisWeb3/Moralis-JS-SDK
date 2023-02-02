import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../../response/errorResponse';

export const mockDeleteStreamAptos = MockScenarios.create(
  {
    method: 'delete',
    name: 'mockDeleteStreamAptos',
    url: `/streams/aptos/:id`,
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
      response: true,
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
