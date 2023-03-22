import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedWebhookLogResponse } from '../response/webhookLogResponse';

export const mockGetLogs = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetLogs',
    url: `/history/logs`,
    getParams: ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
      cursor: req.url.searchParams.get('cursor'),
    }),
  },
  [
    {
      condition: {
        limit: '20',
      },
      response: createPaginatedWebhookLogResponse(Array(20).fill('logs-test-id-1'), 20),
    },
    {
      condition: {
        limit: '5',
      },
      response: createPaginatedWebhookLogResponse(Array(5).fill('logs-test-id-2'), 20, 'cursor'),
    },
    {
      condition: {
        limit: '5',
        cursor: 'cursor',
      },
      response: createPaginatedWebhookLogResponse(Array(5).fill('logs-test-id-3'), 20, 'cursor-2'),
    },
  ],
);
