import { Router } from 'express';
import { 
  // Resolvers import
evmRunContractFunctionResolver,
evmWeb3ApiVersionResolver,
evmEndpointWeightsResolver,
evmUploadFolderResolver,
evmResolveDomainResolver,
evmResolveAddressResolver,
evmGetDateToBlockResolver,
evmGetBlockResolver,
evmGetNativeBalanceResolver,
evmGetWalletTransactionsResolver,
evmGetTransactionResolver,
evmGetContractLogsResolver,
evmGetContractEventsResolver,
evmGetPairReservesResolver,
evmGetPairAddressResolver,
evmGetTokenAllowanceResolver,
evmGetTokenPriceResolver,
evmGetTokenMetadataBySymbolResolver,
evmGetTokenMetadataResolver,
evmGetWalletTokenTransfersResolver,
evmGetWalletTokenBalancesResolver,
evmGetTokenTransfersResolver,
evmGetWalletNFTCollectionsResolver,
evmGetNFTContractTransfersResolver,
evmSyncNFTContractResolver,
evmGetNFTTransfersResolver,
evmGetNFTTokenIdOwnersResolver,
evmGetNFTMetadataResolver,
evmReSyncMetadataResolver,
evmGetNFTContractMetadataResolver,
evmGetNFTOwnersResolver,
evmGetContractNFTsResolver,
evmGetNFTTransfersFromToBlockResolver,
evmSearchNFTsResolver,
evmGetNFTLowestPriceResolver,
evmGetNFTTradesResolver,
evmGetWalletNFTTransfersResolver,
evmGetWalletNFTsResolver,
evmGetNFTTransfersByBlockResolver,
} from './resolvers';

export const evmApiRouter = Router();

// Routes
evmApiRouter.post("/:address/function", evmRunContractFunctionResolver)
evmApiRouter.get("/web3/version", evmWeb3ApiVersionResolver)
evmApiRouter.get("/info/endpointWeights", evmEndpointWeightsResolver)
evmApiRouter.post("/ipfs/uploadFolder", evmUploadFolderResolver)
evmApiRouter.get("/resolve/:domain", evmResolveDomainResolver)
evmApiRouter.get("/resolve/:address/reverse", evmResolveAddressResolver)
evmApiRouter.get("/dateToBlock", evmGetDateToBlockResolver)
evmApiRouter.get("/block/:blockNumberOrHash", evmGetBlockResolver)
evmApiRouter.get("/:address/balance", evmGetNativeBalanceResolver)
evmApiRouter.get("/:address", evmGetWalletTransactionsResolver)
evmApiRouter.get("/transaction/:transactionHash", evmGetTransactionResolver)
evmApiRouter.get("/:address/logs", evmGetContractLogsResolver)
evmApiRouter.post("/:address/events", evmGetContractEventsResolver)
evmApiRouter.get("/:pairAddress/reserves", evmGetPairReservesResolver)
evmApiRouter.get("/:token0Address/:token1Address/pairAddress", evmGetPairAddressResolver)
evmApiRouter.get("/erc20/:address/allowance", evmGetTokenAllowanceResolver)
evmApiRouter.get("/erc20/:address/price", evmGetTokenPriceResolver)
evmApiRouter.get("/erc20/metadata/symbols", evmGetTokenMetadataBySymbolResolver)
evmApiRouter.get("/erc20/metadata", evmGetTokenMetadataResolver)
evmApiRouter.get("/:address/erc20/transfers", evmGetWalletTokenTransfersResolver)
evmApiRouter.get("/:address/erc20", evmGetWalletTokenBalancesResolver)
evmApiRouter.get("/erc20/:address/transfers", evmGetTokenTransfersResolver)
evmApiRouter.get("/:address/nft/collections", evmGetWalletNFTCollectionsResolver)
evmApiRouter.get("/nft/:address/transfers", evmGetNFTContractTransfersResolver)
evmApiRouter.put("/nft/:address/sync", evmSyncNFTContractResolver)
evmApiRouter.get("/nft/:address/:tokenId/transfers", evmGetNFTTransfersResolver)
evmApiRouter.get("/nft/:address/:tokenId/owners", evmGetNFTTokenIdOwnersResolver)
evmApiRouter.get("/nft/:address/:tokenId", evmGetNFTMetadataResolver)
evmApiRouter.get("/nft/:address/:tokenId/metadata/resync", evmReSyncMetadataResolver)
evmApiRouter.get("/nft/:address/metadata", evmGetNFTContractMetadataResolver)
evmApiRouter.get("/nft/:address/owners", evmGetNFTOwnersResolver)
evmApiRouter.get("/nft/:address", evmGetContractNFTsResolver)
evmApiRouter.get("/nft/transfers", evmGetNFTTransfersFromToBlockResolver)
evmApiRouter.get("/nft/search", evmSearchNFTsResolver)
evmApiRouter.get("/nft/:address/lowestprice", evmGetNFTLowestPriceResolver)
evmApiRouter.get("/nft/:address/trades", evmGetNFTTradesResolver)
evmApiRouter.get("/:address/nft/transfers", evmGetWalletNFTTransfersResolver)
evmApiRouter.get("/:address/nft", evmGetWalletNFTsResolver)
evmApiRouter.get("/block/:blockNumberOrHash/nft/transfers", evmGetNFTTransfersByBlockResolver)