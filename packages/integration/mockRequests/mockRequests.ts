import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetLogsByAddress } from './evmApi/getLogsByAddress';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetLogsByAddress];

export const mockServer = setupServer(...handlers);
