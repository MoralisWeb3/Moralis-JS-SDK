import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetDateToBlock = MockScenarios.create(
  {
    name: 'mockGetDateToBlock',
    method: 'get',
    getParams: ({ req }) => ({
      chain: req.url.searchParams.get('chain'),
      date: req.url.searchParams.get('date'),
    }),
    url: '/dateToBlock',
  },
  [
    {
      condition: {
        date: '2022-12-29T08:39:51.000Z',
        chain: '0x5',
      },
      response: {
        block: 16289278,
        date: '2022-12-29T08:39:51+00:00',
        timestamp: 1672303191,
        block_timestamp: '2022-12-29T08:39:35.000Z',
        hash: '0x14bd58cd566c0bc637c03328fab8347913eea246e46f9b0017fcf837f7ba18de',
        parent_hash: '0x36c2287d83188f60b6990ad6026716750a02f410de8b9eb15581bb46a623d0a0',
      },
    },
  ],
);
