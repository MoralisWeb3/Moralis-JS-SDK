import { MockServer } from '@moralisweb3/test-utils';
import { AUTH_API_ROOT, MOCK_API_KEY } from './config';
import { mockGetAddresses } from './endpoints/getAddresses';
import { mockRemoveBind } from './endpoints/removeBind';
import { mockRequestBind } from './endpoints/requestBind';
import { mockRequestEvmChallenge } from './endpoints/requestEvmChallenge';
import { mockVerifyEvmChallenge } from './endpoints/verifyEvmChallenge';
import { mockRequestSolanaChallenge } from './endpoints/requestSolanaChallenge';
import { mockVerifyRemoveBind } from './endpoints/verifyRemoveBind';
import { mockVerifyRequestBind } from './endpoints/verifyRequestBind';
import { mockVerifySolanaChallenge } from './endpoints/verifySolanaChallenge';
import { mockRequestAptosChallenge } from './endpoints/requestAptosChallenge';
import { mockVerifyAptosChallenge } from './endpoints/verifyAptosChallenge';

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: AUTH_API_ROOT }, [
  mockGetAddresses,
  mockRemoveBind,
  mockRequestBind,
  mockRequestEvmChallenge,
  mockVerifyEvmChallenge,
  mockRequestSolanaChallenge,
  mockVerifyRemoveBind,
  mockVerifyRequestBind,
  mockVerifySolanaChallenge,
  mockRequestAptosChallenge,
  mockVerifyAptosChallenge
]).start();
