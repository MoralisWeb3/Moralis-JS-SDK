import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';
import { createEvmAuthResponse } from '../response/evmAuthResponse';

export const mockVerifyEvmChallenge = MockScenarios.create(
  {
    method: 'post',
    name: 'mockVerifyEvmChallenge',
    url: `/challenge/verify/evm`,
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
        signature: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
      },
      response: createEvmAuthResponse('VALID_RESPONSE'),
    },
    {
      condition: {
        message: 'INVALID_SIGNATURE',
        signature: '0x1234567890abcdef0123456789abcdef1234567890abcde0',
      },
      responseStatus: 400,
      response: createErrorResponse('INVALID_SIGNATURE: some-signature'),
    },
    {
      condition: {
        message: 'DEFAULT_EVM',
        signature: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
      },
      response: createEvmAuthResponse('VALID_RESPONSE'),
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
