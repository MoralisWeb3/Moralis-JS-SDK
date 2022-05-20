import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';

const handlers = [mockResolveDomain];

export const mockServer = setupServer(...handlers);
