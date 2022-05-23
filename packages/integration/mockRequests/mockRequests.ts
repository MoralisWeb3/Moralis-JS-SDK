import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetTransactions } from './evmApi/getTransactions';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetTransactions];

export const mockServer = setupServer(...handlers);
