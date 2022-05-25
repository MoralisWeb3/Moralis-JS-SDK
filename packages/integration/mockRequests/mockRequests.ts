import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetPairAddress } from './evmApi/getPairAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetPairAddress, mockGetNativeBalance];

export const mockServer = setupServer(...handlers);
