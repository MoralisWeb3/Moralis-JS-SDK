import { MockScenarios } from '@moralisweb3/test-utils';
import { createPaginatedEvmStreamResponse } from '../../response/evmStreamResponse';

export const mockGetStreamsEvm = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetStreamsEvm',
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
      response: createPaginatedEvmStreamResponse(Array(20).fill('tag-1'), 20),
    },
    {
      condition: {
        limit: '5',
      },
      response: createPaginatedEvmStreamResponse(Array(5).fill('tag-2'), 20, 'cursor'),
    },
    {
      condition: {
        limit: '5',
        cursor: 'cursor',
      },
      response: createPaginatedEvmStreamResponse(Array(5).fill('tag-3'), 20, 'cursor-2'),
    },
  ],
);
