import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import {
  getTokenAllowanceResolver,
  getTokenPriceResolver,
  reSyncMetadataResolver,
  getNFTLowestPriceResolver,
  getContractNFTTransfersResolver,
  getWalletTokenIdTransfersResolver,
  getNFTTradesResolver,
  getTokenAddressTransfersResolver,
  getNftTransfersFromToBlockResolver,
  getTokenMetadataResolver,
  getAllTokenIdsResolver,
  searchNFTsResolver,
  getNFTOwnersResolver,
  getTokenIdOwnersResolver,
  getTokenIdMetadataResolver,
  getTokenMetadataBySymbolResolver,
  getNFTMetadataResolver,
  syncNFTContractResolver,
} from './resolvers/token';
import { getPairAddressResolver, getPairReservesResolver } from './resolvers/defi';
import { resolveAddressResolver, resolveDomainResolver } from './resolvers/resolve';
import {
  getTokenBalancesResolver,
  getNativeBalanceResolver,
  getNFTTransfersResolver,
  getTransactionsResolver,
  getTokenTransfersResolver,
  getNFTsResolver,
  getNFTsForContractResolver,
} from './resolvers/account';
import {
  getBlockResolver,
  getDateToBlockResolver,
  runContractFunctionResolver,
  getLogsByAddressResolver,
  getTransactionResolver,
  getNFTTransfersByBlockResolver,
  getContractEventsResolver,
} from './resolvers/native';
import { web3ApiVersionResolver, endpointWeightsResolver } from './resolvers/info';
import { uploadFolderResolver } from './resolvers/storage';

export const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class MoralisEvmApi extends ApiModule {
  public static readonly moduleName = 'evmApi';

  public static create(core?: MoralisCore): MoralisEvmApi {
    return new MoralisEvmApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisEvmApi.moduleName, core, BASE_URL);
  }

  get native() {
    return {
      runContractFunction: runContractFunctionResolver.fetch,
      getBlock: getBlockResolver.fetch,
      getDateToBlock: getDateToBlockResolver.fetch,
      getTransaction: getTransactionResolver.fetch,
      getLogsByAddress: getLogsByAddressResolver.fetch,
      getNFTTransfersByBlock: getNFTTransfersByBlockResolver.fetch,
      getContractEvents: getContractEventsResolver.fetch,
    };
  }
  get account() {
    return {
      getTokenBalances: getTokenBalancesResolver.fetch,
      getNativeBalance: getNativeBalanceResolver.fetch,
      getNFTTransfers: getNFTTransfersResolver.fetch,
      getTokenTransfers: getTokenTransfersResolver.fetch,
      getTransactions: getTransactionsResolver.fetch,
      getNFTs: getNFTsResolver.fetch,
      getNFTsForContract: getNFTsForContractResolver.fetch,
    };
  }
  get resolve() {
    return {
      resolveDomain: resolveDomainResolver.fetch,
      resolveAddress: resolveAddressResolver.fetch,
    };
  }
  get defi() {
    return {
      getPairReserves: getPairReservesResolver.fetch,
      getPairAddress: getPairAddressResolver.fetch,
    };
  }
  get token() {
    return {
      reSyncMetadata: reSyncMetadataResolver.fetch,
      getTokenPrice: getTokenPriceResolver.fetch,
      getTokenAllowance: getTokenAllowanceResolver.fetch,
      getContractNFTTransfers: getContractNFTTransfersResolver.fetch,
      getNftTransfersFromToBlock: getNftTransfersFromToBlockResolver.fetch,
      getTokenAddressTransfers: getTokenAddressTransfersResolver.fetch,
      getNFTTrades: getNFTTradesResolver.fetch,
      getNFTLowestPrice: getNFTLowestPriceResolver.fetch,
      getWalletTokenIdTransfers: getWalletTokenIdTransfersResolver.fetch,
      getTokenMetadataBySymbol: getTokenMetadataBySymbolResolver.fetch,
      getTokenMetadata: getTokenMetadataResolver.fetch,
      getAllTokenIds: getAllTokenIdsResolver.fetch,
      searchNFTs: searchNFTsResolver.fetch,
      getNFTOwners: getNFTOwnersResolver.fetch,
      getTokenIdOwners: getTokenIdOwnersResolver.fetch,
      getTokenIdMetadata: getTokenIdMetadataResolver.fetch,
      getNFTMetadata: getNFTMetadataResolver.fetch,
      syncNFTContract: syncNFTContractResolver.fetch,
    };
  }
  get info() {
    return {
      web3ApiVersion: () => web3ApiVersionResolver.fetch({}),
      endpointWeights: () => endpointWeightsResolver.fetch({}),
    };
  }
  get storage() {
    return {
      uploadFolder: uploadFolderResolver.fetch,
    };
  }

  public setup() {
    // Nothing...
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
