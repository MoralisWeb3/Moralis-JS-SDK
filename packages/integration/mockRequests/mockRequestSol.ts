import { setupServer } from 'msw/node';
import { mockGetNFTMetadata } from './solApi/getNFTMetadata';

const handlers = [mockGetNFTMetadata];

export const mockServer = setupServer(...handlers);
