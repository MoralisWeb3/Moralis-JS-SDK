import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockReSyncMetadata } from './evmApi/reSyncMetadata';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockReSyncMetadata];

export const mockServer = setupServer(...handlers);
