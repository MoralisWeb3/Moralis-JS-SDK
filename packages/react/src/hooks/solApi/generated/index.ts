/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import {
    getBalanceOperation,
    GetBalanceRequest,
    getNFTsOperation,
    GetNFTsRequest,
    getPortfolioOperation,
    GetPortfolioRequest,
    getSPLOperation,
    GetSPLRequest,
    getNFTMetadataOperation,
    GetNFTMetadataRequest,
    getTokenPriceOperation,
    GetTokenPriceRequest,
} from 'moralis/common-sol-utils';
import { _useResolver, } from '../../resolvers';

export const useSolBalance = (request?: GetBalanceRequest) => {
  return _useResolver(getBalanceOperation, request);
};
export const useSolNFTs = (request?: GetNFTsRequest) => {
  return _useResolver(getNFTsOperation, request);
};
export const useSolPortfolio = (request?: GetPortfolioRequest) => {
  return _useResolver(getPortfolioOperation, request);
};
export const useSolSPL = (request?: GetSPLRequest) => {
  return _useResolver(getSPLOperation, request);
};
export const useSolNFTMetadata = (request?: GetNFTMetadataRequest) => {
  return _useResolver(getNFTMetadataOperation, request);
};
export const useSolTokenPrice = (request?: GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, request);
};
