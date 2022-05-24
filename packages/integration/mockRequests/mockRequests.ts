import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetNFTsForContract } from './evmApi/getNFTsForContract';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetNativeBalance, mockGetNFTsForContract];

export const mockServer = setupServer(...handlers);
