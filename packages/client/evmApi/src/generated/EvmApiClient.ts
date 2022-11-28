
// CAUTION: This file is automatically generated. Do not edit it manually!

import { endpointWeightsOperation, EndpointWeightsRequest, EndpointWeightsResponseAdapter, runContractFunctionOperation, RunContractFunctionRequest, RunContractFunctionResponseAdapter, web3ApiVersionOperation, Web3ApiVersionRequest, Web3ApiVersionResponseAdapter, getBlockOperation, GetBlockRequest, GetBlockResponseAdapter, getDateToBlockOperation, GetDateToBlockRequest, GetDateToBlockResponseAdapter, getContractEventsOperation, GetContractEventsRequest, GetContractEventsResponseAdapter, getContractLogsOperation, GetContractLogsRequest, GetContractLogsResponseAdapter, getContractNFTsOperation, GetContractNFTsRequest, GetContractNFTsResponseAdapter, getNFTContractMetadataOperation, GetNFTContractMetadataRequest, GetNFTContractMetadataResponseAdapter, getNFTContractTransfersOperation, GetNFTContractTransfersRequest, GetNFTContractTransfersResponseAdapter, getNFTLowestPriceOperation, GetNFTLowestPriceRequest, GetNFTLowestPriceResponseAdapter, getNFTMetadataOperation, GetNFTMetadataRequest, GetNFTMetadataResponseAdapter, getNFTOwnersOperation, GetNFTOwnersRequest, GetNFTOwnersResponseAdapter, getNFTTokenIdOwnersOperation, GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponseAdapter, getNFTTradesOperation, GetNFTTradesRequest, GetNFTTradesResponseAdapter, getNFTTransfersByBlockOperation, GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponseAdapter, getNFTTransfersFromToBlockOperation, GetNFTTransfersFromToBlockRequest, GetNFTTransfersFromToBlockResponseAdapter, getNFTTransfersOperation, GetNFTTransfersRequest, GetNFTTransfersResponseAdapter, getWalletNFTCollectionsOperation, GetWalletNFTCollectionsRequest, GetWalletNFTCollectionsResponseAdapter, getWalletNFTsOperation, GetWalletNFTsRequest, GetWalletNFTsResponseAdapter, getWalletNFTTransfersOperation, GetWalletNFTTransfersRequest, GetWalletNFTTransfersResponseAdapter, reSyncMetadataOperation, ReSyncMetadataRequest, ReSyncMetadataResponseAdapter, searchNFTsOperation, SearchNFTsRequest, SearchNFTsResponseAdapter, syncNFTContractOperation, SyncNFTContractRequest, SyncNFTContractResponseAdapter, getNativeBalanceOperation, GetNativeBalanceRequest, GetNativeBalanceResponseAdapter, getPairAddressOperation, GetPairAddressRequest, GetPairAddressResponseAdapter, getPairReservesOperation, GetPairReservesRequest, GetPairReservesResponseAdapter, getTokenAllowanceOperation, GetTokenAllowanceRequest, GetTokenAllowanceResponseAdapter, getTokenMetadataBySymbolOperation, GetTokenMetadataBySymbolRequest, GetTokenMetadataBySymbolResponseAdapter, getTokenMetadataOperation, GetTokenMetadataRequest, GetTokenMetadataResponseAdapter, getTokenPriceOperation, GetTokenPriceRequest, GetTokenPriceResponseAdapter, getTokenTransfersOperation, GetTokenTransfersRequest, GetTokenTransfersResponseAdapter, getWalletTokenBalancesOperation, GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponseAdapter, getWalletTokenTransfersOperation, GetWalletTokenTransfersRequest, GetWalletTokenTransfersResponseAdapter, getTransactionOperation, GetTransactionRequest, GetTransactionResponseAdapter, getWalletTransactionsOperation, GetWalletTransactionsRequest, GetWalletTransactionsResponseAdapter, resolveAddressOperation, ResolveAddressRequest, ResolveAddressResponseAdapter, resolveDomainOperation, ResolveDomainRequest, ResolveDomainResponseAdapter, uploadFolderOperation, UploadFolderRequest, UploadFolderResponseAdapter } from '@moralisweb3/common-evm-utils';
import { ApiBackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Module, Core, ModuleType } from '@moralisweb3/common-core';

const backendModuleName = 'evm-api';

export abstract class EvmApiClient implements Module {
  protected abstract core: Core;
  protected abstract apiBackendAdapter: ApiBackendAdapter;
  public abstract name: string;
  public readonly type = ModuleType.API;

  
  public readonly utils = {
   endpointWeights: (request: EndpointWeightsRequest): Promise<EndpointWeightsResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, endpointWeightsOperation);
    },
   runContractFunction: (request: RunContractFunctionRequest): Promise<RunContractFunctionResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, runContractFunctionOperation);
    },
   web3ApiVersion: (request: Web3ApiVersionRequest): Promise<Web3ApiVersionResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, web3ApiVersionOperation);
    },

  };

  public readonly block = {
   getBlock: (request: GetBlockRequest): Promise<GetBlockResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, getBlockOperation);
    },
   getDateToBlock: (request: GetDateToBlockRequest): Promise<GetDateToBlockResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getDateToBlockOperation);
    },

  };

  public readonly events = {
   getContractEvents: (request: GetContractEventsRequest): Promise<GetContractEventsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getContractEventsOperation);
    },
   getContractLogs: (request: GetContractLogsRequest): Promise<GetContractLogsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getContractLogsOperation);
    },

  };

  public readonly nft = {
   getContractNFTs: (request: GetContractNFTsRequest): Promise<GetContractNFTsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getContractNFTsOperation);
    },
   getNFTContractMetadata: (request: GetNFTContractMetadataRequest): Promise<GetNFTContractMetadataResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, getNFTContractMetadataOperation);
    },
   getNFTContractTransfers: (request: GetNFTContractTransfersRequest): Promise<GetNFTContractTransfersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTContractTransfersOperation);
    },
   getNFTLowestPrice: (request: GetNFTLowestPriceRequest): Promise<GetNFTLowestPriceResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, getNFTLowestPriceOperation);
    },
   getNFTMetadata: (request: GetNFTMetadataRequest): Promise<GetNFTMetadataResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, getNFTMetadataOperation);
    },
   getNFTOwners: (request: GetNFTOwnersRequest): Promise<GetNFTOwnersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTOwnersOperation);
    },
   getNFTTokenIdOwners: (request: GetNFTTokenIdOwnersRequest): Promise<GetNFTTokenIdOwnersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTTokenIdOwnersOperation);
    },
   getNFTTrades: (request: GetNFTTradesRequest): Promise<GetNFTTradesResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTTradesOperation);
    },
   getNFTTransfersByBlock: (request: GetNFTTransfersByBlockRequest): Promise<GetNFTTransfersByBlockResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTTransfersByBlockOperation);
    },
   getNFTTransfersFromToBlock: (request: GetNFTTransfersFromToBlockRequest): Promise<GetNFTTransfersFromToBlockResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTTransfersFromToBlockOperation);
    },
   getNFTTransfers: (request: GetNFTTransfersRequest): Promise<GetNFTTransfersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getNFTTransfersOperation);
    },
   getWalletNFTCollections: (request: GetWalletNFTCollectionsRequest): Promise<GetWalletNFTCollectionsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getWalletNFTCollectionsOperation);
    },
   getWalletNFTs: (request: GetWalletNFTsRequest): Promise<GetWalletNFTsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getWalletNFTsOperation);
    },
   getWalletNFTTransfers: (request: GetWalletNFTTransfersRequest): Promise<GetWalletNFTTransfersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getWalletNFTTransfersOperation);
    },
   reSyncMetadata: (request: ReSyncMetadataRequest): Promise<ReSyncMetadataResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, reSyncMetadataOperation);
    },
   searchNFTs: (request: SearchNFTsRequest): Promise<SearchNFTsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, searchNFTsOperation);
    },
   syncNFTContract: (request: SyncNFTContractRequest): Promise<SyncNFTContractResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, syncNFTContractOperation);
    },

  };

  public readonly balance = {
   getNativeBalance: (request: GetNativeBalanceRequest): Promise<GetNativeBalanceResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getNativeBalanceOperation);
    },

  };

  public readonly defi = {
   getPairAddress: (request: GetPairAddressRequest): Promise<GetPairAddressResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getPairAddressOperation);
    },
   getPairReserves: (request: GetPairReservesRequest): Promise<GetPairReservesResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getPairReservesOperation);
    },

  };

  public readonly token = {
   getTokenAllowance: (request: GetTokenAllowanceRequest): Promise<GetTokenAllowanceResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getTokenAllowanceOperation);
    },
   getTokenMetadataBySymbol: (request: GetTokenMetadataBySymbolRequest): Promise<GetTokenMetadataBySymbolResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getTokenMetadataBySymbolOperation);
    },
   getTokenMetadata: (request: GetTokenMetadataRequest): Promise<GetTokenMetadataResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getTokenMetadataOperation);
    },
   getTokenPrice: (request: GetTokenPriceRequest): Promise<GetTokenPriceResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getTokenPriceOperation);
    },
   getTokenTransfers: (request: GetTokenTransfersRequest): Promise<GetTokenTransfersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getTokenTransfersOperation);
    },
   getWalletTokenBalances: (request: GetWalletTokenBalancesRequest): Promise<GetWalletTokenBalancesResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, getWalletTokenBalancesOperation);
    },
   getWalletTokenTransfers: (request: GetWalletTokenTransfersRequest): Promise<GetWalletTokenTransfersResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getWalletTokenTransfersOperation);
    },

  };

  public readonly transaction = {
   getTransaction: (request: GetTransactionRequest): Promise<GetTransactionResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, getTransactionOperation);
    },
   getWalletTransactions: (request: GetWalletTransactionsRequest): Promise<GetWalletTransactionsResponseAdapter> => {
      return this.apiBackendAdapter.requestPaginatedOperation(backendModuleName, request, getWalletTransactionsOperation);
    },

  };

  public readonly resolve = {
   resolveAddress: (request: ResolveAddressRequest): Promise<ResolveAddressResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, resolveAddressOperation);
    },
   resolveDomain: (request: ResolveDomainRequest): Promise<ResolveDomainResponseAdapter | null> => {
      return this.apiBackendAdapter.requestNullableOperation(backendModuleName, request, resolveDomainOperation);
    },

  };

  public readonly ipfs = {
   uploadFolder: (request: UploadFolderRequest): Promise<UploadFolderResponseAdapter> => {
      return this.apiBackendAdapter.requestOperation(backendModuleName, request, uploadFolderOperation);
    },

  };

}
