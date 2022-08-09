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
import { Endpoints } from '@moralisweb3/api-utils';

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

  public readonly endpoints = new Endpoints(this.core, BASE_URL);

  public readonly native = {
    runContractFunction: this.endpoints.createFetcher(runContractFunction),
    getBlock: this.endpoints.createFetcher(getBlock),
    getDateToBlock: this.endpoints.createFetcher(getDateToBlock),
    getTransaction: this.endpoints.createFetcher(getTransaction),
    getLogsByAddress: this.endpoints.createPaginatedFetcher(getLogsByAddress),
    getNFTTransfersByBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersByBlock),
    getContractEvents: this.endpoints.createPaginatedFetcher(getContractEvents),
  };

  public readonly account = {
    getTokenBalances: this.endpoints.createFetcher(getTokenBalances),
    getNativeBalance: this.endpoints.createFetcher(getNativeBalance),
    getNFTTransfers: this.endpoints.createPaginatedFetcher(getNFTTransfers),
    getTokenTransfers: this.endpoints.createPaginatedFetcher(getTokenTransfers),
    getTransactions: this.endpoints.createPaginatedFetcher(getTransactions),
    getNFTs: this.endpoints.createPaginatedFetcher(getNFTs),
    getNFTsForContract: this.endpoints.createPaginatedFetcher(getNFTsForContract),
  };

  public readonly resolve = {
    resolveDomain: this.endpoints.createFetcher(resolveDomain),
    resolveAddress: this.endpoints.createFetcher(resolveAddress),
  };

  public readonly defi = {
    getPairReserves: this.endpoints.createFetcher(getPairReserves),
    getPairAddress: this.endpoints.createFetcher(getPairAddress),
  };

  public readonly token = {
    reSyncMetadata: this.endpoints.createFetcher(reSyncMetadata),
    getTokenPrice: this.endpoints.createFetcher(getTokenPrice),
    getTokenAllowance: this.endpoints.createFetcher(getTokenAllowance),
    getContractNFTTransfers: this.endpoints.createPaginatedFetcher(getContractNFTTransfers),
    getNftTransfersFromToBlock: this.endpoints.createPaginatedFetcher(getNftTransfersFromToBlock),
    getTokenAddressTransfers: this.endpoints.createPaginatedFetcher(getTokenAddressTransfers),
    getNFTTrades: this.endpoints.createPaginatedFetcher(getNFTTrades),
    getNFTLowestPrice: this.endpoints.createFetcher(getNFTLowestPrice),
    getWalletTokenIdTransfers: this.endpoints.createPaginatedFetcher(getWalletTokenIdTransfers),
    getTokenMetadataBySymbol: this.endpoints.createFetcher(getTokenMetadataBySymbol),
    getTokenMetadata: this.endpoints.createFetcher(getTokenMetadata),
    getAllTokenIds: this.endpoints.createPaginatedFetcher(getAllTokenIds),
    searchNFTs: this.endpoints.createPaginatedFetcher(searchNFTs),
    getNFTOwners: this.endpoints.createPaginatedFetcher(getNFTOwners),
    getTokenIdOwners: this.endpoints.createPaginatedFetcher(getTokenIdOwners),
    getTokenIdMetadata: this.endpoints.createFetcher(getTokenIdMetadata),
    getNFTMetadata: this.endpoints.createFetcher(getNFTMetadata),
    syncNFTContract: this.endpoints.createFetcher(syncNFTContract),
  };

  private readonly _info = {
    web3ApiVersion: this.endpoints.createFetcher(web3ApiVersion),
    endpointWeights: this.endpoints.createFetcher(endpointWeights),
  };

  public readonly info = {
    web3ApiVersion: () => this._info.web3ApiVersion({}),
    endpointWeights: () => this._info.endpointWeights({}),
  };

  public readonly storage = {
    uploadFolder: this.endpoints.createFetcher(uploadFolder),
  };
}
