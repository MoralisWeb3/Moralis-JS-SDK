import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { statsResponse } from '../response/statsResponse';

export const mockGetStatsById = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetStatsById',
    url: `/stats/:streamId`,
    getParams: ({ req }) => ({
      streamId: req.params.streamId,
    }),
  },
  [
    {
      condition: {
        streamId: 'stream-1',
      },
      response: statsResponse(),
    },
    {
      condition: {
        streamId: 'not-found',
      },
      responseStatus: 404,
      response: createErrorResponse('Stat not found'),
    },
  ],
);
