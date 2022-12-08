import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { settingsResponse } from '../response/settingsResponse';

export const mockSetSettings = MockScenarios.create(
  {
    method: 'post',
    name: 'mockSetSettings',
    url: `/settings`,
    getParams: async ({ reqBody }) => {
      return {
        region: reqBody?.region,
      };
    },
  },
  [
    {
      condition: {
        region: 'eu-central-1',
      },
      response: settingsResponse('eu-central-1'),
    },
    {
      condition: {
        region: 'eu-central-100',
      },
      responseStatus: 422,
      response: createErrorResponse('Validation Failed', {
        'requestBody.region': {
          message: "should be one of the following; ['us-east-1','us-west-2','eu-central-1','ap-southeast-1']",
          value: 'eu-central-100',
        },
      }),
    },
  ],
);
