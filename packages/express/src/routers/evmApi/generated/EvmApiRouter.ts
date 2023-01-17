import { Router } from 'express';

import { createResolver } from '../../../genericResolvers';
import { endpointWeightsOperation } from 'moralis/common-evm-utils';
import { endpointWeightsResolver } from './resolvers';

export class EvmApiRouter {

  static get Router() {

    const router = Router();

    router.get('/info/endpointWeights', endpointWeightsResolver)
    router.get('/block/:blockNumberOrHash', evmGetBlockResolver)
    router.post('/:address/events', evmGetContractEventsResolver)
    router.get('/:address/logs', evmGetContractLogsResolver)
    router.get('/nft/:address', evmGetContractNFTsResolver)
    router.get('/dateToBlock', evmGetDateToBlockResolver)
    router.post('/nft/getMultipleNFTs', evmGetMultipleNFTsResolver)
    router.get('/:address/balance', evmGetNativeBalanceResolver)
    router.get('/nft/:address/metadata', evmGetNFTContractMetadataResolver)
    router.get('/nft/:address/transfers', evmGetNFTContractTransfersResolver)
    router.get('/nft/:address/lowestprice', evmGetNFTLowestPriceResolver)
    router.get('/nft/:address/:tokenId', evmGetNFTMetadataResolver)
    router.get('/nft/:address/owners', evmGetNFTOwnersResolver)
    router.get('/nft/:address/:tokenId/owners', evmGetNFTTokenIdOwnersResolver)
    router.get('/nft/:address/trades', evmGetNFTTradesResolver)
    router.get('/block/:blockNumberOrHash/nft/transfers', evmGetNFTTransfersByBlockResolver)
    router.get('/nft/transfers', evmGetNFTTransfersFromToBlockResolver)
    router.get('/nft/:address/:tokenId/transfers', evmGetNFTTransfersResolver)
    router.get('/:token0Address/:token1Address/pairAddress', evmGetPairAddressResolver)
    router.get('/:pairAddress/reserves', evmGetPairReservesResolver)
    router.get('/erc20/:address/allowance', evmGetTokenAllowanceResolver)
    router.get('/erc20/metadata/symbols', evmGetTokenMetadataBySymbolResolver)
    router.get('/erc20/metadata', evmGetTokenMetadataResolver)
    router.get('/erc20/:address/price', evmGetTokenPriceResolver)
    router.get('/erc20/:address/transfers', evmGetTokenTransfersResolver)
    router.get('/transaction/:transactionHash', evmGetTransactionResolver)
    router.get('/:address/nft/collections', evmGetWalletNFTCollectionsResolver)
    router.get('/:address/nft', evmGetWalletNFTsResolver)
    router.get('/:address/nft/transfers', evmGetWalletNFTTransfersResolver)
    router.get('/:address/erc20', evmGetWalletTokenBalancesResolver)
    router.get('/:address/erc20/transfers', evmGetWalletTokenTransfersResolver)
    router.get('/:address', evmGetWalletTransactionsResolver)
    router.get('/:address/verbose', evmGetWalletTransactionsVerboseResolver)
    router.get('/resolve/:address/reverse', evmResolveAddressResolver)
    router.get('/resolve/:domain', evmResolveDomainResolver)
    router.get('/nft/:address/:tokenId/metadata/resync', evmReSyncMetadataResolver)
    router.post('/:address/function', evmRunContractFunctionResolver)
    router.get('/nft/search', evmSearchNFTsResolver)
    router.put('/nft/:address/sync', evmSyncNFTContractResolver)
    router.post('/ipfs/uploadFolder', evmUploadFolderResolver)
    router.get('/web3/version', evmWeb3ApiVersionResolver)
  
    return router;
  }
}