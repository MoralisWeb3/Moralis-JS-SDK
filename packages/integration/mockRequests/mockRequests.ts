import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetTokenTransfer } from './evmApi/getTokenTransfers';

const handlers = [mockResolveDomain, mockResolveAddress, mockGetTokenTransfer];

export const mockServer = setupServer(...handlers);
