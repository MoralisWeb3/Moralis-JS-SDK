import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetTransactions } from './evmApi/getTransactions';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetTransactions];

export const mockServer = setupServer(...handlers);
