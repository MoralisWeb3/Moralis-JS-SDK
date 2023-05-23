import { getBalanceOperation } from './account/getBalanceOperation';
import { getNFTsOperation } from './account/getNFTsOperation';
import { getPortfolioOperation } from './account/getPortfolioOperation';
import { getSPLOperation } from './account/getSPLOperation';
import { getNFTMetadataOperation } from './nft/getNFTMetadataOperation';

export const operationsV2 = [
  getBalanceOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getNFTMetadataOperation,
];
