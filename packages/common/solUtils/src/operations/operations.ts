import { getBalanceOperation } from './account/getBalanceOperation';
import { getNFTsOperation } from './account/getNFTsOperation';
import { getPortfolioOperation } from './account/getPortfolioOperation';
import { getSPLOperation } from './account/getSPLOperation';
import { getNFTMetadataOperation } from './nft/getNFTMetadataOperation';
import { getTokenPriceOperation } from './token/getTokenPriceOperation';

export const operations = [
  getBalanceOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getNFTMetadataOperation,
  getTokenPriceOperation,
];
