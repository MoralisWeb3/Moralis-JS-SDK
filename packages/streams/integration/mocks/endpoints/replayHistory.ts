import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createWebhookResponse } from '../response/webhookResponse';

export const mockReplayHistory = MockScenarios.create(
  {
    method: 'post',
    name: 'mockReplayHistory',
    url: `/history/replay/:streamId/:id`,
    getParams: (req) => ({
      streamId: req.params.streamId,
      id: req.params.id,
    }),
  },
  [
    {
      condition: {
        id: 'id-1',
        streamId: 'stream-1',
      },
      response: createWebhookResponse('stream-1'),
    },
    {
      condition: {
        id: 'not-found',
        streamId: 'stream-1',
      },
      responseStatus: 404,
      response: createErrorResponse('History not found'),
    },
  ],
);
