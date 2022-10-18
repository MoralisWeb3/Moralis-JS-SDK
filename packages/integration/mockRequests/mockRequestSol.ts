import { mockGetBalanceSol } from './solApi/getBalance';
import { MockServer } from '../MockServer';
import { SOL_API_ROOT } from './config';
import { mockGetNFTSol } from './solApi/getNFT';
import { mockGetSPLSol } from './solApi/getSPL';
import { mockGetNFTMetadataSol } from './solApi/getNFTMetadata';
import { mockGetPortfolioSol } from './solApi/getPortfolio';

const handlers = [mockGetBalanceSol, mockGetNFTSol, mockGetSPLSol, mockGetNFTMetadataSol, mockGetPortfolioSol];

export const mockServer = MockServer.create({ apiRoot: SOL_API_ROOT }, handlers).start();
