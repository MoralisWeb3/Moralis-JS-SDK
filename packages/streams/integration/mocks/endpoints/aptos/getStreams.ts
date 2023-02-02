import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedAptosStreamResponse } from '../../response/aptosStreamResponse';

export const mockGetStreamsAptos = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetStreamsAptos',
    url: `/streams/aptos`,
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
      response: createPaginatedAptosStreamResponse(Array(20).fill('tag-1'), 20),
    },
  ],
);
