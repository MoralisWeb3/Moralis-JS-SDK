import { setupServer } from 'msw/node';
import { mockGetSPL } from './solApi/getSPL';

const handlers = [mockGetSPL];

export const mockServer = setupServer(...handlers);
