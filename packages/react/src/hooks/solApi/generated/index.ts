/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import Moralis from 'moralis'
import {
    getBalanceOperation,
    GetBalanceResponse,
    GetBalanceRequest,
    getNFTsOperation,
    GetNFTsResponse,
    GetNFTsRequest,
    getPortfolioOperation,
    GetPortfolioResponse,
    GetPortfolioRequest,
    getSPLOperation,
    GetSPLResponse,
    GetSPLRequest,
    getNFTMetadataOperation,
    GetNFTMetadataResponse,
    GetNFTMetadataRequest,
    getTokenPriceOperation,
    GetTokenPriceResponse,
    GetTokenPriceRequest,
} from 'moralis/common-sol-utils';
import { _useResolver, } from '../../resolvers';
import { QueryConfig } from '../../useQuery';

const { baseUrl } = Moralis.SolApi;

export const useSolBalance = (params?: QueryConfig<GetBalanceResponse, Error> & GetBalanceRequest) => {
  return _useResolver(getBalanceOperation, baseUrl, params);
};
export const useSolNFTs = (params?: QueryConfig<GetNFTsResponse, Error> & GetNFTsRequest) => {
  return _useResolver(getNFTsOperation, baseUrl, params);
};
export const useSolPortfolio = (params?: QueryConfig<GetPortfolioResponse, Error> & GetPortfolioRequest) => {
  return _useResolver(getPortfolioOperation, baseUrl, params);
};
export const useSolSPL = (params?: QueryConfig<GetSPLResponse, Error> & GetSPLRequest) => {
  return _useResolver(getSPLOperation, baseUrl, params);
};
export const useSolNFTMetadata = (params?: QueryConfig<GetNFTMetadataResponse, Error> & GetNFTMetadataRequest) => {
  return _useResolver(getNFTMetadataOperation, baseUrl, params);
};
export const useSolTokenPrice = (params?: QueryConfig<GetTokenPriceResponse, Error> & GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, params);
};
