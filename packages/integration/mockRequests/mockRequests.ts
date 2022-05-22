import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetPairAddress } from './evmApi/getPairAddress';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetPairAddress];

export const mockServer = setupServer(...handlers);
