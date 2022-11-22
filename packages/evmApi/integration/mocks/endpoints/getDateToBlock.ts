import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetDateToBlock = MockScenarios.create(
  {
    name: 'mockGetDateToBlock',
    method: 'get',
    getParams: (req) => ({
      chain: req.url.searchParams.get('chain'),
      date: req.url.searchParams.get('date'),
      providerUrl: req.url.searchParams.get('providerUrl'),
    }),
    url: '/dateToBlock',
  },
  [
    {
      condition: {
        date: '2021-09-29T13:09:15.000Z',
        chain: '0x5',
      },
      response: {
        date: '2020-01-01T00:00:00+00:00',
        block: 13320838,
        timestamp: 1577836811,
      },
    },
  ],
);
