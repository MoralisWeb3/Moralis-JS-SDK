import { setupServer } from 'msw/node';
import { mockGetNFT } from './solApi/getNFT';

const handlers = [mockGetNFT];

export const mockServer = setupServer(...handlers);
