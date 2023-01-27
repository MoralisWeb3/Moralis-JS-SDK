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
import Moralis from 'moralis'

const { baseUrl } = Moralis.SolApi;

export const useSolBalance = (request?: GetBalanceRequest) => {
  return _useResolver(getBalanceOperation, baseUrl, request);
};
export const useSolNFTs = (request?: GetNFTsRequest) => {
  return _useResolver(getNFTsOperation, baseUrl, request);
};
export const useSolPortfolio = (request?: GetPortfolioRequest) => {
  return _useResolver(getPortfolioOperation, baseUrl, request);
};
export const useSolSPL = (request?: GetSPLRequest) => {
  return _useResolver(getSPLOperation, baseUrl, request);
};
export const useSolNFTMetadata = (request?: GetNFTMetadataRequest) => {
  return _useResolver(getNFTMetadataOperation, baseUrl, request);
};
export const useSolTokenPrice = (request?: GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, request);
};
