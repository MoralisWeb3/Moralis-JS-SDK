import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetTokenTransfer } from './evmApi/getTokenTransfers';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetTokenTransfer];

export const mockServer = setupServer(...handlers);