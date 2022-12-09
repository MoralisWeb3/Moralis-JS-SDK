import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createSolanaAuthResponse } from '../response/solanaAuthResponse';

export const mockVerifySolanaChallenge = MockScenarios.create(
  {
    method: 'post',
    name: 'mockVerifySolanaChallenge',
    url: `/challenge/verify/solana`,
    getParams: ({ reqBody }) => {
      return {
        message: reqBody?.message,
        signature: reqBody?.signature,
      };
    },
  },
  [
    {
      condition: {
        message: 'VALID_RESPONSE',
        signature: '2pH9DqD5rve2qV4yBDshcAjWd2y8TqMx8BPb7f3KoNnuLEhE5JwjruYi4jaFaD4HN6wriLz2Vdr32kRBAJmHcyny',
      },
      response: createSolanaAuthResponse('VALID_RESPONSE'),
    },
    {
      condition: {
        message: 'INVALID_SIGNATURE',
        signature: 'some-signature',
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_SIGNATURE: some-signature'),
    },
    {
      condition: {
        message: '',
        signature: 'some-signature',
      },
      responseStatus: 400,
      response: createErrorResponse('MULTI_ERROR'),
    },
  ],
);
