import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import {
  getTokenAllowance,
  getTokenPrice,
  reSyncMetadata,
  getNFTLowestPrice,
  getContractNFTTransfers,
  getWalletTokenIdTransfers,
  getNFTTrades,
  getTokenAddressTransfers,
  getNftTransfersFromToBlock,
  getTokenMetadata,
  getAllTokenIds,
  searchNFTs,
  getNFTOwners,
  getTokenIdOwners,
  getTokenIdMetadata,
  getTokenMetadataBySymbol,
  getNFTMetadata,
  syncNFTContract,
} from './resolvers/token';
import { getPairAddress, getPairReserves } from './resolvers/defi';
import { resolveAddress, resolveDomain } from './resolvers/resolve';
import {
  getTokenBalances,
  getNativeBalance,
  getNFTTransfers,
  getTransactions,
  getTokenTransfers,
  getNFTs,
  getNFTsForContract,
} from './resolvers/account';
import {
  getBlock,
  getDateToBlock,
  runContractFunction,
  getLogsByAddress,
  getTransaction,
  getNFTTransfersByBlock,
  getContractEvents,
} from './resolvers/native';
import { web3ApiVersion, endpointWeights } from './resolvers/info';
import { uploadFolder } from './resolvers/storage';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';
import {
  EndpointFactory,
  EndpointResolver,
  PaginatedEndpointFactory,
  PaginatedEndpointResolver,
  PaginatedParams,
} from '@moralisweb3/api-utils';

export const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class MoralisEvmApi extends ApiModule {
  public static readonly moduleName = 'evmApi';

  public static create(core?: MoralisCore): MoralisEvmApi {
    return new MoralisEvmApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisEvmApi.moduleName, core, BASE_URL);
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public readonly native = {
    runContractFunction: this.createFetcher(runContractFunction),
    getBlock: this.createFetcher(getBlock),
    getDateToBlock: this.createFetcher(getDateToBlock),
    getTransaction: this.createFetcher(getTransaction),
    getLogsByAddress: this.createPaginatedFetcher(getLogsByAddress),
    getNFTTransfersByBlock: this.createPaginatedFetcher(getNFTTransfersByBlock),
    getContractEvents: this.createPaginatedFetcher(getContractEvents),
  };

  public readonly account = {
    getTokenBalances: this.createFetcher(getTokenBalances),
    getNativeBalance: this.createFetcher(getNativeBalance),
    getNFTTransfers: this.createPaginatedFetcher(getNFTTransfers),
    getTokenTransfers: this.createPaginatedFetcher(getTokenTransfers),
    getTransactions: this.createPaginatedFetcher(getTransactions),
    getNFTs: this.createPaginatedFetcher(getNFTs),
    getNFTsForContract: this.createPaginatedFetcher(getNFTsForContract),
  };

  public readonly resolve = {
    resolveDomain: this.createFetcher(resolveDomain),
    resolveAddress: this.createFetcher(resolveAddress),
  };

  public readonly defi = {
    getPairReserves: this.createFetcher(getPairReserves),
    getPairAddress: this.createFetcher(getPairAddress),
  };

  public readonly token = {
    reSyncMetadata: this.createFetcher(reSyncMetadata),
    getTokenPrice: this.createFetcher(getTokenPrice),
    getTokenAllowance: this.createFetcher(getTokenAllowance),
    getContractNFTTransfers: this.createPaginatedFetcher(getContractNFTTransfers),
    getNftTransfersFromToBlock: this.createPaginatedFetcher(getNftTransfersFromToBlock),
    getTokenAddressTransfers: this.createPaginatedFetcher(getTokenAddressTransfers),
    getNFTTrades: this.createPaginatedFetcher(getNFTTrades),
    getNFTLowestPrice: this.createFetcher(getNFTLowestPrice),
    getWalletTokenIdTransfers: this.createPaginatedFetcher(getWalletTokenIdTransfers),
    getTokenMetadataBySymbol: this.createFetcher(getTokenMetadataBySymbol),
    getTokenMetadata: this.createFetcher(getTokenMetadata),
    getAllTokenIds: this.createPaginatedFetcher(getAllTokenIds),
    searchNFTs: this.createPaginatedFetcher(searchNFTs),
    getNFTOwners: this.createPaginatedFetcher(getNFTOwners),
    getTokenIdOwners: this.createPaginatedFetcher(getTokenIdOwners),
    getTokenIdMetadata: this.createFetcher(getTokenIdMetadata),
    getNFTMetadata: this.createFetcher(getNFTMetadata),
    syncNFTContract: this.createFetcher(syncNFTContract),
  };

  public readonly info = {
    web3ApiVersion: () => this.createFetcher(web3ApiVersion)({}),
    endpointWeights: () => this.createFetcher(endpointWeights)({}),
  };

  public readonly storage = {
    uploadFolder: this.createFetcher(uploadFolder),
  };

  private createFetcher<AP, P, AR, ADR, JR>(factory: EndpointFactory<AP, P, AR, ADR, JR>) {
    return EndpointResolver.create(this.core, factory).fetch;
  }

  private createPaginatedFetcher<AP, P extends PaginatedParams, AR, ADR, JR>(
    factory: PaginatedEndpointFactory<AP, P, AR, ADR, JR>,
  ) {
    return PaginatedEndpointResolver.create(this.core, factory).fetch;
  }
}
