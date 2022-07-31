import { setupServer } from 'msw/node';
import { mockGetPortfolio } from './solApi/getPortfolio';

const handlers = [mockGetPortfolio];

export const mockServer = setupServer(...handlers);
