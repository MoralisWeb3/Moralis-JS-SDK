/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import {
    endpointWeightsOperation,
    EndpointWeightsResponse,
    
    getBlockOperation,
    GetBlockResponse,
    GetBlockRequest,
    getContractEventsOperation,
    GetContractEventsResponse,
    GetContractEventsRequest,
    getContractLogsOperation,
    GetContractLogsResponse,
    GetContractLogsRequest,
    getContractNFTsOperation,
    GetContractNFTsResponse,
    GetContractNFTsRequest,
    getDateToBlockOperation,
    GetDateToBlockResponse,
    GetDateToBlockRequest,
    getMultipleNFTsOperation,
    GetMultipleNFTsResponse,
    GetMultipleNFTsRequest,
    getNativeBalanceOperation,
    GetNativeBalanceResponse,
    GetNativeBalanceRequest,
    getNFTContractMetadataOperation,
    GetNFTContractMetadataResponse,
    GetNFTContractMetadataRequest,
    getNFTContractTransfersOperation,
    GetNFTContractTransfersResponse,
    GetNFTContractTransfersRequest,
    getNFTLowestPriceOperation,
    GetNFTLowestPriceResponse,
    GetNFTLowestPriceRequest,
    getNFTMetadataOperation,
    GetNFTMetadataResponse,
    GetNFTMetadataRequest,
    getNFTOwnersOperation,
    GetNFTOwnersResponse,
    GetNFTOwnersRequest,
    getNFTTokenIdOwnersOperation,
    GetNFTTokenIdOwnersResponse,
    GetNFTTokenIdOwnersRequest,
    getNFTTradesOperation,
    GetNFTTradesResponse,
    GetNFTTradesRequest,
    getNFTTransfersByBlockOperation,
    GetNFTTransfersByBlockResponse,
    GetNFTTransfersByBlockRequest,
    getNFTTransfersFromToBlockOperation,
    GetNFTTransfersFromToBlockResponse,
    GetNFTTransfersFromToBlockRequest,
    getNFTTransfersOperation,
    GetNFTTransfersResponse,
    GetNFTTransfersRequest,
    getPairAddressOperation,
    GetPairAddressResponse,
    GetPairAddressRequest,
    getPairReservesOperation,
    GetPairReservesResponse,
    GetPairReservesRequest,
    getTokenAllowanceOperation,
    GetTokenAllowanceResponse,
    GetTokenAllowanceRequest,
    getTokenMetadataBySymbolOperation,
    GetTokenMetadataBySymbolResponse,
    GetTokenMetadataBySymbolRequest,
    getTokenMetadataOperation,
    GetTokenMetadataResponse,
    GetTokenMetadataRequest,
    getTokenPriceOperation,
    GetTokenPriceResponse,
    GetTokenPriceRequest,
    getTokenTransfersOperation,
    GetTokenTransfersResponse,
    GetTokenTransfersRequest,
    getTransactionOperation,
    GetTransactionResponse,
    GetTransactionRequest,
    getWalletNFTCollectionsOperation,
    GetWalletNFTCollectionsResponse,
    GetWalletNFTCollectionsRequest,
    getWalletNFTsOperation,
    GetWalletNFTsResponse,
    GetWalletNFTsRequest,
    getWalletNFTTransfersOperation,
    GetWalletNFTTransfersResponse,
    GetWalletNFTTransfersRequest,
    getWalletTokenBalancesOperation,
    GetWalletTokenBalancesResponse,
    GetWalletTokenBalancesRequest,
    getWalletTokenTransfersOperation,
    GetWalletTokenTransfersResponse,
    GetWalletTokenTransfersRequest,
    getWalletTransactionsOperation,
    GetWalletTransactionsResponse,
    GetWalletTransactionsRequest,
    getWalletTransactionsVerboseOperation,
    GetWalletTransactionsVerboseResponse,
    GetWalletTransactionsVerboseRequest,
    resolveAddressOperation,
    ResolveAddressResponse,
    ResolveAddressRequest,
    resolveDomainOperation,
    ResolveDomainResponse,
    ResolveDomainRequest,
    reSyncMetadataOperation,
    ReSyncMetadataResponse,
    ReSyncMetadataRequest,
    runContractFunctionOperation,
    RunContractFunctionResponse,
    RunContractFunctionRequest,
    searchNFTsOperation,
    SearchNFTsResponse,
    SearchNFTsRequest,
    syncNFTContractOperation,
    SyncNFTContractResponse,
    SyncNFTContractRequest,
    uploadFolderOperation,
    UploadFolderResponse,
    UploadFolderRequest,
    web3ApiVersionOperation,
    Web3ApiVersionResponse,
    
} from 'moralis/common-evm-utils';
import { ResolverFetchParams, _useResolver,_useResolverNullable,_useResolverPaginated, } from '../../resolvers';
import Moralis from 'moralis'
import { UseQueryConfig } from '../../useQuery';

const { baseUrl } = Moralis.EvmApi;

export const useEvmEndpointWeights = ( fetchParams?: ResolverFetchParams<EndpointWeightsResponse>) => {
  return _useResolver(endpointWeightsOperation, baseUrl, {}, fetchParams);
};
export const useEvmBlock = (request?: GetBlockRequest, fetchParams?: ResolverFetchParams<GetBlockResponse | null>) => {
  return _useResolverNullable(getBlockOperation, baseUrl, request, fetchParams);
};
export const useEvmContractEvents = (request?: GetContractEventsRequest, fetchParams?: ResolverFetchParams<GetContractEventsResponse>) => {
  return _useResolverPaginated(getContractEventsOperation, baseUrl, request, fetchParams);
};
export const useEvmContractLogs = (request?: GetContractLogsRequest, fetchParams?: ResolverFetchParams<GetContractLogsResponse>) => {
  return _useResolverPaginated(getContractLogsOperation, baseUrl, request, fetchParams);
};
export const useEvmContractNFTs = (request?: GetContractNFTsRequest, fetchParams?: ResolverFetchParams<GetContractNFTsResponse>) => {
  return _useResolverPaginated(getContractNFTsOperation, baseUrl, request, fetchParams);
};
export const useEvmDateToBlock = (params?: GetDateToBlockRequest & UseQueryConfig<GetDateToBlockResponse>) => {
  return _useResolver(getDateToBlockOperation, baseUrl, params);
};
export const useEvmMultipleNFTs = (request?: GetMultipleNFTsRequest, fetchParams?: ResolverFetchParams<GetMultipleNFTsResponse>) => {
  return _useResolver(getMultipleNFTsOperation, baseUrl, request, fetchParams);
};
export const useEvmNativeBalance = (request?: GetNativeBalanceRequest, fetchParams?: ResolverFetchParams<GetNativeBalanceResponse>) => {
  return _useResolver(getNativeBalanceOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTContractMetadata = (request?: GetNFTContractMetadataRequest, fetchParams?: ResolverFetchParams<GetNFTContractMetadataResponse | null>) => {
  return _useResolverNullable(getNFTContractMetadataOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTContractTransfers = (request?: GetNFTContractTransfersRequest, fetchParams?: ResolverFetchParams<GetNFTContractTransfersResponse>) => {
  return _useResolverPaginated(getNFTContractTransfersOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTLowestPrice = (request?: GetNFTLowestPriceRequest, fetchParams?: ResolverFetchParams<GetNFTLowestPriceResponse | null>) => {
  return _useResolverNullable(getNFTLowestPriceOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTMetadata = (request?: GetNFTMetadataRequest, fetchParams?: ResolverFetchParams<GetNFTMetadataResponse | null>) => {
  return _useResolverNullable(getNFTMetadataOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTOwners = (request?: GetNFTOwnersRequest, fetchParams?: ResolverFetchParams<GetNFTOwnersResponse>) => {
  return _useResolverPaginated(getNFTOwnersOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTTokenIdOwners = (request?: GetNFTTokenIdOwnersRequest, fetchParams?: ResolverFetchParams<GetNFTTokenIdOwnersResponse>) => {
  return _useResolverPaginated(getNFTTokenIdOwnersOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTTrades = (request?: GetNFTTradesRequest, fetchParams?: ResolverFetchParams<GetNFTTradesResponse>) => {
  return _useResolverPaginated(getNFTTradesOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTTransfersByBlock = (request?: GetNFTTransfersByBlockRequest, fetchParams?: ResolverFetchParams<GetNFTTransfersByBlockResponse>) => {
  return _useResolverPaginated(getNFTTransfersByBlockOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTTransfersFromToBlock = (request?: GetNFTTransfersFromToBlockRequest, fetchParams?: ResolverFetchParams<GetNFTTransfersFromToBlockResponse>) => {
  return _useResolverPaginated(getNFTTransfersFromToBlockOperation, baseUrl, request, fetchParams);
};
export const useEvmNFTTransfers = (request?: GetNFTTransfersRequest, fetchParams?: ResolverFetchParams<GetNFTTransfersResponse>) => {
  return _useResolverPaginated(getNFTTransfersOperation, baseUrl, request, fetchParams);
};
export const useEvmPairAddress = (request?: GetPairAddressRequest, fetchParams?: ResolverFetchParams<GetPairAddressResponse>) => {
  return _useResolver(getPairAddressOperation, baseUrl, request, fetchParams);
};
export const useEvmPairReserves = (request?: GetPairReservesRequest, fetchParams?: ResolverFetchParams<GetPairReservesResponse>) => {
  return _useResolver(getPairReservesOperation, baseUrl, request, fetchParams);
};
export const useEvmTokenAllowance = (request?: GetTokenAllowanceRequest, fetchParams?: ResolverFetchParams<GetTokenAllowanceResponse>) => {
  return _useResolver(getTokenAllowanceOperation, baseUrl, request, fetchParams);
};
export const useEvmTokenMetadataBySymbol = (request?: GetTokenMetadataBySymbolRequest, fetchParams?: ResolverFetchParams<GetTokenMetadataBySymbolResponse>) => {
  return _useResolver(getTokenMetadataBySymbolOperation, baseUrl, request, fetchParams);
};
export const useEvmTokenMetadata = (request?: GetTokenMetadataRequest, fetchParams?: ResolverFetchParams<GetTokenMetadataResponse>) => {
  return _useResolver(getTokenMetadataOperation, baseUrl, request, fetchParams);
};
export const useEvmTokenPrice = (request?: GetTokenPriceRequest, fetchParams?: ResolverFetchParams<GetTokenPriceResponse>) => {
  return _useResolver(getTokenPriceOperation, baseUrl, request, fetchParams);
};
export const useEvmTokenTransfers = (request?: GetTokenTransfersRequest, fetchParams?: ResolverFetchParams<GetTokenTransfersResponse>) => {
  return _useResolverPaginated(getTokenTransfersOperation, baseUrl, request, fetchParams);
};
export const useEvmTransaction = (request?: GetTransactionRequest, fetchParams?: ResolverFetchParams<GetTransactionResponse | null>) => {
  return _useResolverNullable(getTransactionOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletNFTCollections = (request?: GetWalletNFTCollectionsRequest, fetchParams?: ResolverFetchParams<GetWalletNFTCollectionsResponse>) => {
  return _useResolverPaginated(getWalletNFTCollectionsOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletNFTs = (request?: GetWalletNFTsRequest, fetchParams?: ResolverFetchParams<GetWalletNFTsResponse>) => {
  return _useResolverPaginated(getWalletNFTsOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletNFTTransfers = (request?: GetWalletNFTTransfersRequest, fetchParams?: ResolverFetchParams<GetWalletNFTTransfersResponse>) => {
  return _useResolverPaginated(getWalletNFTTransfersOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletTokenBalances = (request?: GetWalletTokenBalancesRequest, fetchParams?: ResolverFetchParams<GetWalletTokenBalancesResponse>) => {
  return _useResolver(getWalletTokenBalancesOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletTokenTransfers = (request?: GetWalletTokenTransfersRequest, fetchParams?: ResolverFetchParams<GetWalletTokenTransfersResponse>) => {
  return _useResolverPaginated(getWalletTokenTransfersOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletTransactions = (request?: GetWalletTransactionsRequest, fetchParams?: ResolverFetchParams<GetWalletTransactionsResponse>) => {
  return _useResolverPaginated(getWalletTransactionsOperation, baseUrl, request, fetchParams);
};
export const useEvmWalletTransactionsVerbose = (request?: GetWalletTransactionsVerboseRequest, fetchParams?: ResolverFetchParams<GetWalletTransactionsVerboseResponse>) => {
  return _useResolverPaginated(getWalletTransactionsVerboseOperation, baseUrl, request, fetchParams);
};
export const useEvmResolveAddress = (request?: ResolveAddressRequest, fetchParams?: ResolverFetchParams<ResolveAddressResponse | null>) => {
  return _useResolverNullable(resolveAddressOperation, baseUrl, request, fetchParams);
};
export const useEvmResolveDomain = (request?: ResolveDomainRequest, fetchParams?: ResolverFetchParams<ResolveDomainResponse | null>) => {
  return _useResolverNullable(resolveDomainOperation, baseUrl, request, fetchParams);
};
export const useEvmReSyncMetadata = (request?: ReSyncMetadataRequest, fetchParams?: ResolverFetchParams<ReSyncMetadataResponse>) => {
  return _useResolver(reSyncMetadataOperation, baseUrl, request, fetchParams);
};
export const useEvmRunContractFunction = (request?: RunContractFunctionRequest, fetchParams?: ResolverFetchParams<RunContractFunctionResponse>) => {
  return _useResolver(runContractFunctionOperation, baseUrl, request, fetchParams);
};
export const useEvmSearchNFTs = (request?: SearchNFTsRequest, fetchParams?: ResolverFetchParams<SearchNFTsResponse>) => {
  return _useResolverPaginated(searchNFTsOperation, baseUrl, request, fetchParams);
};
export const useEvmSyncNFTContract = (request?: SyncNFTContractRequest, fetchParams?: ResolverFetchParams<SyncNFTContractResponse>) => {
  return _useResolver(syncNFTContractOperation, baseUrl, request, fetchParams);
};
export const useEvmUploadFolder = (request?: UploadFolderRequest, fetchParams?: ResolverFetchParams<UploadFolderResponse>) => {
  return _useResolver(uploadFolderOperation, baseUrl, request, fetchParams);
};
export const useEvmWeb3ApiVersion = ( fetchParams?: ResolverFetchParams<Web3ApiVersionResponse>) => {
  return _useResolver(web3ApiVersionOperation, baseUrl, {}, fetchParams);
};
