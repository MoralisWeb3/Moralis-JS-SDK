import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedWebhookResponse } from '../response/webhookResponse';

export const mockGetHistory = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetHistory',
    url: `/history`,
    getParams: async ({ req }) => ({
      limit: req.url.searchParams.get('limit'),
      cursor: req.url.searchParams.get('cursor'),
    }),
  },
  [
    {
      condition: {
        limit: '20',
      },
      response: createPaginatedWebhookResponse(Array(20).fill('id-1'), 20),
    },
    {
      condition: {
        limit: '5',
      },
      response: createPaginatedWebhookResponse(Array(5).fill('id-2'), 20, 'cursor'),
    },
    {
      condition: {
        limit: '5',
        cursor: 'cursor',
      },
      response: createPaginatedWebhookResponse(Array(5).fill('id-3'), 20, 'cursor-2'),
    },
  ],
);
