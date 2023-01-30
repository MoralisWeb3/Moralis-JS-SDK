/**
 * @warn This file is auto-generated
 * Don't modify it
 */
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
import { ResolverFetchParams, _useResolver, } from '../../resolvers';
import Moralis from 'moralis'

const { baseUrl } = Moralis.SolApi;

export const useSolBalance = (request?: GetBalanceRequest, fetchParams?: ResolverFetchParams<GetBalanceResponse>) => {
  return _useResolver(getBalanceOperation, baseUrl, request, fetchParams);
};
export const useSolNFTs = (request?: GetNFTsRequest, fetchParams?: ResolverFetchParams<GetNFTsResponse>) => {
  return _useResolver(getNFTsOperation, baseUrl, request, fetchParams);
};
export const useSolPortfolio = (request?: GetPortfolioRequest, fetchParams?: ResolverFetchParams<GetPortfolioResponse>) => {
  return _useResolver(getPortfolioOperation, baseUrl, request, fetchParams);
};
export const useSolSPL = (request?: GetSPLRequest, fetchParams?: ResolverFetchParams<GetSPLResponse>) => {
  return _useResolver(getSPLOperation, baseUrl, request, fetchParams);
};
export const useSolNFTMetadata = (request?: GetNFTMetadataRequest, fetchParams?: ResolverFetchParams<GetNFTMetadataResponse>) => {
  return _useResolver(getNFTMetadataOperation, baseUrl, request, fetchParams);
};
export const useSolTokenPrice = (request?: GetTokenPriceRequest, fetchParams?: ResolverFetchParams<GetTokenPriceResponse>) => {
  return _useResolver(getTokenPriceOperation, baseUrl, request, fetchParams);
};
