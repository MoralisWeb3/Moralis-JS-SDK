import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetTokenPrice } from './evmApi/getTokenPrice';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetTokenPrice];

export const mockServer = setupServer(...handlers);
