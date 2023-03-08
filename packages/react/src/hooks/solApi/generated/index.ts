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
import { QueryOptions } from '../../useQuery';

const { baseUrl } = Moralis.SolApi;

export const useSolBalance = (params?: QueryOptions<GetBalanceResponse, Error> & GetBalanceRequest) => {
  return _useResolver(getBalanceOperation, baseUrl, params);
};
export const useSolNFTs = (params?: QueryOptions<GetNFTsResponse, Error> & GetNFTsRequest) => {
  return _useResolver(getNFTsOperation, baseUrl, params);
};
export const useSolPortfolio = (params?: QueryOptions<GetPortfolioResponse, Error> & GetPortfolioRequest) => {
  return _useResolver(getPortfolioOperation, baseUrl, params);
};
export const useSolSPL = (params?: QueryOptions<GetSPLResponse, Error> & GetSPLRequest) => {
  return _useResolver(getSPLOperation, baseUrl, params);
};
export const useSolNFTMetadata = (params?: QueryOptions<GetNFTMetadataResponse, Error> & GetNFTMetadataRequest) => {
  return _useResolver(getNFTMetadataOperation, baseUrl, params);
};
export const useSolTokenPrice = (params?: QueryOptions<GetTokenPriceResponse, Error> & GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, params);
};
