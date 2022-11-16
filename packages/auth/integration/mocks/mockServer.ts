import { MockServer } from '@moralisweb3/test-utils';
import { AUTH_API_ROOT, MOCK_API_KEY } from './config';
import { mockRequestEvmChallenge } from './endpoints/requestEvmChallenge';
import { mockVerifyEvmChallenge } from './endpoints/verifyEvmChallenge';
import { mockRequestSolanaChallenge } from './endpoints/requestSolanaChallenge';
import { mockVerifySolanaChallenge } from './endpoints/verifySolanaChallenge';

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: AUTH_API_ROOT }, [
  mockRequestEvmChallenge,
  mockVerifyEvmChallenge,
  mockRequestSolanaChallenge,
  mockVerifySolanaChallenge,
]).start();
