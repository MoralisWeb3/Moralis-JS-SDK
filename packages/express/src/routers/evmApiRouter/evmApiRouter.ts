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

export class evmApiRouter {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getRouter() {
    const router = Router();

    // Routes
    router.post("/:address/function", (req, res, next) =>  evmRunContractFunctionResolver(req, res, next, this.apiKey))
    router.get("/web3/version", (req, res, next) =>  evmWeb3ApiVersionResolver(req, res, next, this.apiKey))
    router.get("/info/endpointWeights", (req, res, next) =>  evmEndpointWeightsResolver(req, res, next, this.apiKey))
    router.post("/ipfs/uploadFolder", (req, res, next) =>  evmUploadFolderResolver(req, res, next, this.apiKey))
    router.get("/resolve/:domain", (req, res, next) =>  evmResolveDomainResolver(req, res, next, this.apiKey))
    router.get("/resolve/:address/reverse", (req, res, next) =>  evmResolveAddressResolver(req, res, next, this.apiKey))
    router.get("/dateToBlock", (req, res, next) =>  evmGetDateToBlockResolver(req, res, next, this.apiKey))
    router.get("/block/:blockNumberOrHash", (req, res, next) =>  evmGetBlockResolver(req, res, next, this.apiKey))
    router.get("/:address/balance", (req, res, next) =>  evmGetNativeBalanceResolver(req, res, next, this.apiKey))
    router.get("/:address", (req, res, next) =>  evmGetWalletTransactionsResolver(req, res, next, this.apiKey))
    router.get("/transaction/:transactionHash", (req, res, next) =>  evmGetTransactionResolver(req, res, next, this.apiKey))
    router.get("/:address/logs", (req, res, next) =>  evmGetContractLogsResolver(req, res, next, this.apiKey))
    router.post("/:address/events", (req, res, next) =>  evmGetContractEventsResolver(req, res, next, this.apiKey))
    router.get("/:pairAddress/reserves", (req, res, next) =>  evmGetPairReservesResolver(req, res, next, this.apiKey))
    router.get("/:token0Address/:token1Address/pairAddress", (req, res, next) =>  evmGetPairAddressResolver(req, res, next, this.apiKey))
    router.get("/erc20/:address/allowance", (req, res, next) =>  evmGetTokenAllowanceResolver(req, res, next, this.apiKey))
    router.get("/erc20/:address/price", (req, res, next) =>  evmGetTokenPriceResolver(req, res, next, this.apiKey))
    router.get("/erc20/metadata/symbols", (req, res, next) =>  evmGetTokenMetadataBySymbolResolver(req, res, next, this.apiKey))
    router.get("/erc20/metadata", (req, res, next) =>  evmGetTokenMetadataResolver(req, res, next, this.apiKey))
    router.get("/:address/erc20/transfers", (req, res, next) =>  evmGetWalletTokenTransfersResolver(req, res, next, this.apiKey))
    router.get("/:address/erc20", (req, res, next) =>  evmGetWalletTokenBalancesResolver(req, res, next, this.apiKey))
    router.get("/erc20/:address/transfers", (req, res, next) =>  evmGetTokenTransfersResolver(req, res, next, this.apiKey))
    router.get("/:address/nft/collections", (req, res, next) =>  evmGetWalletNFTCollectionsResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/transfers", (req, res, next) =>  evmGetNFTContractTransfersResolver(req, res, next, this.apiKey))
    router.put("/nft/:address/sync", (req, res, next) =>  evmSyncNFTContractResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/:tokenId/transfers", (req, res, next) =>  evmGetNFTTransfersResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/:tokenId/owners", (req, res, next) =>  evmGetNFTTokenIdOwnersResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/:tokenId", (req, res, next) =>  evmGetNFTMetadataResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/:tokenId/metadata/resync", (req, res, next) =>  evmReSyncMetadataResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/metadata", (req, res, next) =>  evmGetNFTContractMetadataResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/owners", (req, res, next) =>  evmGetNFTOwnersResolver(req, res, next, this.apiKey))
    router.get("/nft/:address", (req, res, next) =>  evmGetContractNFTsResolver(req, res, next, this.apiKey))
    router.get("/nft/transfers", (req, res, next) =>  evmGetNFTTransfersFromToBlockResolver(req, res, next, this.apiKey))
    router.get("/nft/search", (req, res, next) =>  evmSearchNFTsResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/lowestprice", (req, res, next) =>  evmGetNFTLowestPriceResolver(req, res, next, this.apiKey))
    router.get("/nft/:address/trades", (req, res, next) =>  evmGetNFTTradesResolver(req, res, next, this.apiKey))
    router.get("/:address/nft/transfers", (req, res, next) =>  evmGetWalletNFTTransfersResolver(req, res, next, this.apiKey))
    router.get("/:address/nft", (req, res, next) =>  evmGetWalletNFTsResolver(req, res, next, this.apiKey))
    router.get("/block/:blockNumberOrHash/nft/transfers", (req, res, next) =>  evmGetNFTTransfersByBlockResolver(req, res, next, this.apiKey))
  
    return router;
  }
}
