import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';

const handlers = [mockResolveDomain, mockResolveAddress];

export const mockServer = setupServer(...handlers);
