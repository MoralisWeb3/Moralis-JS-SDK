import { setupServer } from 'msw/node';

import { mockEvmRequestChallenge } from './authApi/evmRequestChallenge';
import { mockEvmVerify } from './authApi/evmVerify';
import { mockSolanaRequestChallenge } from './authApi/solanaRequestChallenge';
import { mockSolanaVerify } from './authApi/solanaVerify';

const handlers = [mockEvmRequestChallenge, mockEvmVerify, mockSolanaRequestChallenge, mockSolanaVerify];

export const mockServer = setupServer(...handlers);
