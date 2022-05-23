import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance];

export const mockServer = setupServer(...handlers);
