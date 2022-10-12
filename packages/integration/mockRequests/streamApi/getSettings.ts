import { MockScenarios } from '../../MockScenarios';
import { settingsResponse } from './response/settingsResponse';

export const mockGetSettings = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetSettings',
    url: `/settings`,
    getParams: () => ({}),
  },
  [
    {
      condition: {},
      response: settingsResponse('us-east-1'),
    },
  ],
);
