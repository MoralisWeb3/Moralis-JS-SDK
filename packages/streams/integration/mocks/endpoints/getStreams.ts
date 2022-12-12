import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedStreamResponse } from '../response/streamResponse';

export const mockGetStreams = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetStreams',
    url: `/streams/evm`,
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
      response: createPaginatedStreamResponse(Array(20).fill('tag-1'), 20),
    },
    {
      condition: {
        limit: '5',
      },
      response: createPaginatedStreamResponse(Array(5).fill('tag-2'), 20, 'cursor'),
    },
    {
      condition: {
        limit: '5',
        cursor: 'cursor',
      },
      response: createPaginatedStreamResponse(Array(5).fill('tag-3'), 20, 'cursor-2'),
    },
  ],
);
