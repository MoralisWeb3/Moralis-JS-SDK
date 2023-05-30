import { getBalanceOperation } from './account/getBalanceOperation';
import { getNFTsOperation } from './account/getNFTsOperation';
import { getPortfolioOperation } from './account/getPortfolioOperation';
import { getSPLOperation } from './account/getSPLOperation';
import { getNFTMetadataOperation } from './nft/getNFTMetadataOperation';
import { getTokenPriceOperation } from './token/getTokenPriceOperation';

export const operationsV2 = [
  getBalanceOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getNFTMetadataOperation,
];

/**
 * @deprecated This list includes upgraded operations to the hybrid approach in the old format.
 */
export const operationsV2All = [...operationsV2, getTokenPriceOperation];
