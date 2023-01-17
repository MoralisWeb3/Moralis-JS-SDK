import { 
  getBalanceOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getNFTMetadataOperation,
  getTokenPriceOperation,
} from 'moralis/common-sol-utils';
import { createResolver,   } from '../../../genericResolvers';
import Moralis from 'moralis';

export const solGetBalanceResolver = createResolver(getBalanceOperation, Moralis.SolApi.baseUrl);
export const solGetNFTsResolver = createResolver(getNFTsOperation, Moralis.SolApi.baseUrl);
export const solGetPortfolioResolver = createResolver(getPortfolioOperation, Moralis.SolApi.baseUrl);
export const solGetSPLResolver = createResolver(getSPLOperation, Moralis.SolApi.baseUrl);
export const solGetNFTMetadataResolver = createResolver(getNFTMetadataOperation, Moralis.SolApi.baseUrl);
export const solGetTokenPriceResolver = createResolver(getTokenPriceOperation, Moralis.SolApi.baseUrl);
