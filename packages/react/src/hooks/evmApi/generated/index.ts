/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import Moralis from 'moralis'
import {
    endpointWeightsOperation,
    EndpointWeightsResponse,
    EndpointWeightsRequest,
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
    getNativeBalancesForAddressesOperation,
    GetNativeBalancesForAddressesResponse,
    GetNativeBalancesForAddressesRequest,
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
    Web3ApiVersionRequest,
} from 'moralis/common-evm-utils';
import { _useResolver,_useResolverNullable,_useResolverPaginated, } from '../../resolvers';
import { QueryOptions } from '../../useQuery';

const { baseUrl } = Moralis.EvmApi;

type UseResolverParams<Response, Request> = QueryOptions<Response, Error, Response, [Request]> & Partial<Request>;

export type UseEvmEndpointWeights = UseResolverParams<EndpointWeightsResponse, EndpointWeightsRequest>;
export const useEvmEndpointWeights = (params: UseEvmEndpointWeights = {}) => {
  return _useResolver(endpointWeightsOperation, baseUrl, params);
};

export const useEvmBlock = (params?: QueryOptions<NonNullable<GetBlockResponse> | null, Error, NonNullable<GetBlockResponse> | null, [GetBlockRequest]> & GetBlockRequest) => {
  return _useResolverNullable(getBlockOperation, baseUrl, params);
};

export const useEvmContractEvents = (params?: QueryOptions<GetContractEventsResponse, Error, GetContractEventsResponse, [GetContractEventsRequest]> & GetContractEventsRequest) => {
  return _useResolverPaginated(getContractEventsOperation, baseUrl, params);
};
export const useEvmContractLogs = (params?: QueryOptions<GetContractLogsResponse, Error> & GetContractLogsRequest) => {
  return _useResolverPaginated(getContractLogsOperation, baseUrl, params);
};
export const useEvmContractNFTs = (params?: QueryOptions<GetContractNFTsResponse, Error> & GetContractNFTsRequest) => {
  return _useResolverPaginated(getContractNFTsOperation, baseUrl, params);
};
export const useEvmDateToBlock = (params?: UseResolverParams<GetDateToBlockResponse, GetDateToBlockRequest>) => {
  return _useResolver(getDateToBlockOperation, baseUrl, params);
};

const {data} = useEvmDateToBlock({})

export const useEvmMultipleNFTs = (params?: QueryOptions<GetMultipleNFTsResponse, Error> & GetMultipleNFTsRequest) => {
  return _useResolver(getMultipleNFTsOperation, baseUrl, params);
};
export const useEvmNativeBalance = (params?: QueryOptions<GetNativeBalanceResponse, Error> & GetNativeBalanceRequest) => {
  return _useResolver(getNativeBalanceOperation, baseUrl, params);
};
export const useEvmNativeBalancesForAddresses = (params?: QueryOptions<GetNativeBalancesForAddressesResponse, Error> & GetNativeBalancesForAddressesRequest) => {
  return _useResolver(getNativeBalancesForAddressesOperation, baseUrl, params);
};
export const useEvmNFTContractMetadata = (params?: QueryOptions<GetNFTContractMetadataResponse, Error> & GetNFTContractMetadataRequest) => {
  return _useResolverNullable(getNFTContractMetadataOperation, baseUrl, params);
};
export const useEvmNFTContractTransfers = (params?: QueryOptions<GetNFTContractTransfersResponse, Error> & GetNFTContractTransfersRequest) => {
  return _useResolverPaginated(getNFTContractTransfersOperation, baseUrl, params);
};
export const useEvmNFTLowestPrice = (params?: QueryOptions<GetNFTLowestPriceResponse, Error> & GetNFTLowestPriceRequest) => {
  return _useResolverNullable(getNFTLowestPriceOperation, baseUrl, params);
};
export const useEvmNFTMetadata = (params?: QueryOptions<GetNFTMetadataResponse, Error> & GetNFTMetadataRequest) => {
  return _useResolverNullable(getNFTMetadataOperation, baseUrl, params);
};
export const useEvmNFTOwners = (params?: QueryOptions<GetNFTOwnersResponse, Error> & GetNFTOwnersRequest) => {
  return _useResolverPaginated(getNFTOwnersOperation, baseUrl, params);
};
export const useEvmNFTTokenIdOwners = (params?: QueryOptions<GetNFTTokenIdOwnersResponse, Error> & GetNFTTokenIdOwnersRequest) => {
  return _useResolverPaginated(getNFTTokenIdOwnersOperation, baseUrl, params);
};
export const useEvmNFTTrades = (params?: QueryOptions<GetNFTTradesResponse, Error> & GetNFTTradesRequest) => {
  return _useResolverPaginated(getNFTTradesOperation, baseUrl, params);
};
export const useEvmNFTTransfersByBlock = (params?: QueryOptions<GetNFTTransfersByBlockResponse, Error> & GetNFTTransfersByBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersByBlockOperation, baseUrl, params);
};
export const useEvmNFTTransfersFromToBlock = (params?: QueryOptions<GetNFTTransfersFromToBlockResponse, Error> & GetNFTTransfersFromToBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersFromToBlockOperation, baseUrl, params);
};
export const useEvmNFTTransfers = (params?: QueryOptions<GetNFTTransfersResponse, Error> & GetNFTTransfersRequest) => {
  return _useResolverPaginated(getNFTTransfersOperation, baseUrl, params);
};
export const useEvmPairAddress = (params?: QueryOptions<GetPairAddressResponse, Error> & GetPairAddressRequest) => {
  return _useResolver(getPairAddressOperation, baseUrl, params);
};
export const useEvmPairReserves = (params?: QueryOptions<GetPairReservesResponse, Error> & GetPairReservesRequest) => {
  return _useResolver(getPairReservesOperation, baseUrl, params);
};
export const useEvmTokenAllowance = (params?: QueryOptions<GetTokenAllowanceResponse, Error> & GetTokenAllowanceRequest) => {
  return _useResolver(getTokenAllowanceOperation, baseUrl, params);
};
export const useEvmTokenMetadataBySymbol = (params?: QueryOptions<GetTokenMetadataBySymbolResponse, Error> & GetTokenMetadataBySymbolRequest) => {
  return _useResolver(getTokenMetadataBySymbolOperation, baseUrl, params);
};
export const useEvmTokenMetadata = (params?: QueryOptions<GetTokenMetadataResponse, Error> & GetTokenMetadataRequest) => {
  return _useResolver(getTokenMetadataOperation, baseUrl, params);
};
export const useEvmTokenPrice = (params?: QueryOptions<GetTokenPriceResponse, Error> & GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, params);
};
export const useEvmTokenTransfers = (params?: QueryOptions<GetTokenTransfersResponse, Error> & GetTokenTransfersRequest) => {
  return _useResolverPaginated(getTokenTransfersOperation, baseUrl, params);
};
export const useEvmTransaction = (params?: QueryOptions<GetTransactionResponse, Error> & GetTransactionRequest) => {
  return _useResolverNullable(getTransactionOperation, baseUrl, params);
};
export const useEvmWalletNFTCollections = (params?: QueryOptions<GetWalletNFTCollectionsResponse, Error> & GetWalletNFTCollectionsRequest) => {
  return _useResolverPaginated(getWalletNFTCollectionsOperation, baseUrl, params);
};
export const useEvmWalletNFTs = (params?: QueryOptions<GetWalletNFTsResponse, Error> & GetWalletNFTsRequest) => {
  return _useResolverPaginated(getWalletNFTsOperation, baseUrl, params);
};
export const useEvmWalletNFTTransfers = (params?: QueryOptions<GetWalletNFTTransfersResponse, Error> & GetWalletNFTTransfersRequest) => {
  return _useResolverPaginated(getWalletNFTTransfersOperation, baseUrl, params);
};
export const useEvmWalletTokenBalances = (params?: QueryOptions<GetWalletTokenBalancesResponse, Error> & GetWalletTokenBalancesRequest) => {
  return _useResolver(getWalletTokenBalancesOperation, baseUrl, params);
};
export const useEvmWalletTokenTransfers = (params?: QueryOptions<GetWalletTokenTransfersResponse, Error> & GetWalletTokenTransfersRequest) => {
  return _useResolverPaginated(getWalletTokenTransfersOperation, baseUrl, params);
};
export const useEvmWalletTransactions = (params?: QueryOptions<GetWalletTransactionsResponse, Error> & GetWalletTransactionsRequest) => {
  return _useResolverPaginated(getWalletTransactionsOperation, baseUrl, params);
};
export const useEvmWalletTransactionsVerbose = (params?: QueryOptions<GetWalletTransactionsVerboseResponse, Error> & GetWalletTransactionsVerboseRequest) => {
  return _useResolverPaginated(getWalletTransactionsVerboseOperation, baseUrl, params);
};
export const useEvmResolveAddress = (params?: QueryOptions<ResolveAddressResponse, Error> & ResolveAddressRequest) => {
  return _useResolverNullable(resolveAddressOperation, baseUrl, params);
};
export const useEvmResolveDomain = (params?: QueryOptions<ResolveDomainResponse, Error> & ResolveDomainRequest) => {
  return _useResolverNullable(resolveDomainOperation, baseUrl, params);
};
export const useEvmReSyncMetadata = (params?: QueryOptions<ReSyncMetadataResponse, Error> & ReSyncMetadataRequest) => {
  return _useResolver(reSyncMetadataOperation, baseUrl, params);
};
export const useEvmRunContractFunction = (params?: QueryOptions<RunContractFunctionResponse, Error> & RunContractFunctionRequest) => {
  return _useResolver(runContractFunctionOperation, baseUrl, params);
};
export const useEvmSearchNFTs = (params?: QueryOptions<SearchNFTsResponse, Error> & SearchNFTsRequest) => {
  return _useResolverPaginated(searchNFTsOperation, baseUrl, params);
};
export const useEvmSyncNFTContract = (params?: QueryOptions<SyncNFTContractResponse, Error> & SyncNFTContractRequest) => {
  return _useResolver(syncNFTContractOperation, baseUrl, params);
};
export const useEvmUploadFolder = (params?: QueryOptions<UploadFolderResponse, Error> & UploadFolderRequest) => {
  return _useResolver(uploadFolderOperation, baseUrl, params);
};
export const useEvmWeb3ApiVersion = (params?: QueryOptions<Web3ApiVersionResponse, Error> & Web3ApiVersionRequest) => {
  return _useResolver(web3ApiVersionOperation, baseUrl, params);
};
