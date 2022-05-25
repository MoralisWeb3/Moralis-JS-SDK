import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetPairAddress } from './evmApi/getPairAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetTokenPrice } from './evmApi/getTokenPrice';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetTokenPrice, mockGetPairAddress];

export const mockServer = setupServer(...handlers);
