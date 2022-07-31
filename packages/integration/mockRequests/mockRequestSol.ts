import { setupServer } from 'msw/node';
import { mockGetBalanceSol } from './solApi/getBalance';

const handlers = [mockGetBalanceSol];

export const mockServer = setupServer(...handlers);
