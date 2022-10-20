import { setupServer } from 'msw/node';

import { mockEvmRequestChallenge } from './endpoints/evmRequestChallenge';
import { mockEvmVerify } from './endpoints/evmVerify';
import { mockSolanaRequestChallenge } from './endpoints/solanaRequestChallenge';
import { mockSolanaVerify } from './endpoints/solanaVerify';

const handlers = [mockEvmRequestChallenge, mockEvmVerify, mockSolanaRequestChallenge, mockSolanaVerify];

export const mockServer = setupServer(...handlers);
