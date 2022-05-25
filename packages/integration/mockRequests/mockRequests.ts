import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetLogsByAddress } from './evmApi/getLogsByAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetLogsByAddress];

export const mockServer = setupServer(...handlers);
