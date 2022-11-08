
import { MockScenarios } from '@moralisweb3/test-utils';
import { statsResponse } from '../response/statsResponse';

export const mockGetStats = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetStats',
    url: `/stats`,
    getParams: () => ({}),
  },
  [
    {
      condition: {},
      response: statsResponse(),
    },
  ],
);
