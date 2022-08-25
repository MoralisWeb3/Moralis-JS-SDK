import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import {
  getAllTokenIds,
  getContractNFTTransfers,
  getNFTLowestPrice,
  getNFTMetadata,
  getNFTOwners,
  getNFTTrades,
  getNftTransfersFromToBlock,
  getTokenAddressTransfers,
  getTokenAllowance,
  getTokenIdMetadata,
  getTokenIdOwners,
  getTokenMetadata,
  getTokenMetadataBySymbol,
  getTokenPrice,
  getWalletTokenIdTransfers,
  reSyncMetadata,
  searchNFTs,
  syncNFTContract,
} from './resolvers/token';
import { getPairAddress, getPairReserves } from './resolvers/defi';
import { resolveAddress, resolveDomain } from './resolvers/resolve';
import {
  getNativeBalance,
  getNFTs,
  getNFTsForContract,
  getNFTTransfers,
  getTokenBalances,
  getTokenTransfers,
  getTransactions,
} from './resolvers/account';
import {
  getBlock,
  getContractEvents,
  getDateToBlock,
  getLogsByAddress,
  getNFTTransfersByBlock,
  getTransaction,
  runContractFunction,
} from './resolvers/native';
import { web3ApiVersion, endpointWeights } from './resolvers/info';
import { uploadFolder } from './resolvers/storage';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';
import { Endpoints } from '@moralisweb3/api-utils';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

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
    getBlock: this.endpoints.createFetcher(getBlock),
    getContractEvents: this.endpoints.createPaginatedFetcher(getContractEvents),
    getDateToBlock: this.endpoints.createFetcher(getDateToBlock),
    getLogsByAddress: this.endpoints.createPaginatedFetcher(getLogsByAddress),
    getNFTTransfersByBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersByBlock),
    getTransaction: this.endpoints.createFetcher(getTransaction),
    runContractFunction: this.endpoints.createFetcher(runContractFunction),
  };

  public readonly account = {
    getNativeBalance: this.endpoints.createFetcher(getNativeBalance),
    getNFTs: this.endpoints.createPaginatedFetcher(getNFTs),
    getNFTsForContract: this.endpoints.createPaginatedFetcher(getNFTsForContract),
    getNFTTransfers: this.endpoints.createPaginatedFetcher(getNFTTransfers),
    getTokenBalances: this.endpoints.createFetcher(getTokenBalances),
    getTokenTransfers: this.endpoints.createPaginatedFetcher(getTokenTransfers),
    getTransactions: this.endpoints.createPaginatedFetcher(getTransactions),
  };

  public readonly resolve = {
    resolveAddress: this.endpoints.createFetcher(resolveAddress),
    resolveDomain: this.endpoints.createFetcher(resolveDomain),
  };

  public readonly defi = {
    getPairAddress: this.endpoints.createFetcher(getPairAddress),
    getPairReserves: this.endpoints.createFetcher(getPairReserves),
  };

  public readonly token = {
    getAllTokenIds: this.endpoints.createPaginatedFetcher(getAllTokenIds),
    getContractNFTTransfers: this.endpoints.createPaginatedFetcher(getContractNFTTransfers),
    getNFTLowestPrice: this.endpoints.createFetcher(getNFTLowestPrice),
    getNFTMetadata: this.endpoints.createFetcher(getNFTMetadata),
    getNFTOwners: this.endpoints.createPaginatedFetcher(getNFTOwners),
    getNFTTrades: this.endpoints.createPaginatedFetcher(getNFTTrades),
    getNftTransfersFromToBlock: this.endpoints.createPaginatedFetcher(getNftTransfersFromToBlock),
    getTokenAddressTransfers: this.endpoints.createPaginatedFetcher(getTokenAddressTransfers),
    getTokenAllowance: this.endpoints.createFetcher(getTokenAllowance),
    getTokenIdMetadata: this.endpoints.createFetcher(getTokenIdMetadata),
    getTokenIdOwners: this.endpoints.createPaginatedFetcher(getTokenIdOwners),
    getTokenMetadata: this.endpoints.createFetcher(getTokenMetadata),
    getTokenMetadataBySymbol: this.endpoints.createFetcher(getTokenMetadataBySymbol),
    getTokenPrice: this.endpoints.createFetcher(getTokenPrice),
    getWalletTokenIdTransfers: this.endpoints.createPaginatedFetcher(getWalletTokenIdTransfers),
    reSyncMetadata: this.endpoints.createFetcher(reSyncMetadata),
    searchNFTs: this.endpoints.createPaginatedFetcher(searchNFTs),
    syncNFTContract: this.endpoints.createFetcher(syncNFTContract),
  };

  private readonly _info = {
    endpointWeights: this.endpoints.createFetcher(endpointWeights),
    web3ApiVersion: this.endpoints.createFetcher(web3ApiVersion),
  };

  public readonly info = {
    endpointWeights: () => this._info.endpointWeights({}),
    web3ApiVersion: () => this._info.web3ApiVersion({}),
  };

  public readonly storage = {
    uploadFolder: this.endpoints.createFetcher(uploadFolder),
  };
}
