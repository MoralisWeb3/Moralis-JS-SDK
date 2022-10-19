import { Router } from 'express';
import { 
  // Endpoints import
runContractFunctionResolver,
web3ApiVersionResolver,
endpointWeightsResolver,
uploadFolderResolver,
resolveDomainResolver,
resolveAddressResolver,
getDateToBlockResolver,
getBlockResolver,
getNativeBalanceResolver,
getWalletTransactionsResolver,
getTransactionResolver,
getContractLogsResolver,
getContractEventsResolver,
getPairReservesResolver,
getPairAddressResolver,
getTokenAllowanceResolver,
getTokenPriceResolver,
getTokenMetadataBySymbolResolver,
getTokenMetadataResolver,
getWalletTokenTransfersResolver,
getWalletTokenBalancesResolver,
getTokenTransfersResolver,
getWalletNFTCollectionsResolver,
getNFTContractTransfersResolver,
syncNFTContractResolver,
getNFTTransfersResolver,
getNFTTokenIdOwnersResolver,
getNFTMetadataResolver,
reSyncMetadataResolver,
getNFTContractMetadataResolver,
getNFTOwnersResolver,
getContractNFTsResolver,
getNFTTransfersFromToBlockResolver,
searchNFTsResolver,
getNFTLowestPriceResolver,
getNFTTradesResolver,
getWalletNFTTransfersResolver,
getWalletNFTsResolver,
getNFTTransfersByBlockResolver,
} from './endpoints';

const evmRouter = Router();

// Routes
evmRouter.post("/:address/function", runContractFunctionResolver)
evmRouter.get("/web3/version", web3ApiVersionResolver)
evmRouter.get("/info/endpointWeights", endpointWeightsResolver)
evmRouter.post("/ipfs/uploadFolder", uploadFolderResolver)
evmRouter.get("/resolve/:domain", resolveDomainResolver)
evmRouter.get("/resolve/:address/reverse", resolveAddressResolver)
evmRouter.get("/dateToBlock", getDateToBlockResolver)
evmRouter.get("/block/:blockNumberOrHash", getBlockResolver)
evmRouter.get("/:address/balance", getNativeBalanceResolver)
evmRouter.get("/:address", getWalletTransactionsResolver)
evmRouter.get("/transaction/:transactionHash", getTransactionResolver)
evmRouter.get("/:address/logs", getContractLogsResolver)
evmRouter.post("/:address/events", getContractEventsResolver)
evmRouter.get("/:pairAddress/reserves", getPairReservesResolver)
evmRouter.get("/:token0Address/:token1Address/pairAddress", getPairAddressResolver)
evmRouter.get("/erc20/:address/allowance", getTokenAllowanceResolver)
evmRouter.get("/erc20/:address/price", getTokenPriceResolver)
evmRouter.get("/erc20/metadata/symbols", getTokenMetadataBySymbolResolver)
evmRouter.get("/erc20/metadata", getTokenMetadataResolver)
evmRouter.get("/:address/erc20/transfers", getWalletTokenTransfersResolver)
evmRouter.get("/:address/erc20", getWalletTokenBalancesResolver)
evmRouter.get("/erc20/:address/transfers", getTokenTransfersResolver)
evmRouter.get("/:address/nft/collections", getWalletNFTCollectionsResolver)
evmRouter.get("/nft/:address/transfers", getNFTContractTransfersResolver)
evmRouter.put("/nft/:address/sync", syncNFTContractResolver)
evmRouter.get("/nft/:address/:tokenId/transfers", getNFTTransfersResolver)
evmRouter.get("/nft/:address/:tokenId/owners", getNFTTokenIdOwnersResolver)
evmRouter.get("/nft/:address/:tokenId", getNFTMetadataResolver)
evmRouter.get("/nft/:address/:tokenId/metadata/resync", reSyncMetadataResolver)
evmRouter.get("/nft/:address/metadata", getNFTContractMetadataResolver)
evmRouter.get("/nft/:address/owners", getNFTOwnersResolver)
evmRouter.get("/nft/:address", getContractNFTsResolver)
evmRouter.get("/nft/transfers", getNFTTransfersFromToBlockResolver)
evmRouter.get("/nft/search", searchNFTsResolver)
evmRouter.get("/nft/:address/lowestprice", getNFTLowestPriceResolver)
evmRouter.get("/nft/:address/trades", getNFTTradesResolver)
evmRouter.get("/:address/nft/transfers", getWalletNFTTransfersResolver)
evmRouter.get("/:address/nft", getWalletNFTsResolver)
evmRouter.get("/block/:blockNumberOrHash/nft/transfers", getNFTTransfersByBlockResolver)