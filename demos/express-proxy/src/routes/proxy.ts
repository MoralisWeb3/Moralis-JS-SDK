/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
import express from 'express';
import Moralis from 'moralis';
import { NextFunction, Request, Response } from 'express';
export const proxyRouter = express.Router();

export interface TypedRequestBody<Params> extends Request {
  body: Params;
}


    proxyRouter.route('/evm/getNFTTransfersByBlock').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTTransfersByBlock>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTTransfersByBlock(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletNFTs').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getWalletNFTs>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getWalletNFTs(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletNFTTransfers').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getWalletNFTTransfers>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getWalletNFTTransfers(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTTrades').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTTrades>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTTrades(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTLowestPrice').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTLowestPrice>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTLowestPrice(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/searchNFTs').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.searchNFTs>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.searchNFTs(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTTransfersFromToBlock').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getContractNFTs').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getContractNFTs>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getContractNFTs(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTOwners').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTOwners>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTOwners(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTContractMetadata').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTContractMetadata>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTContractMetadata(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/reSyncMetadata').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.reSyncMetadata>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.reSyncMetadata(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTMetadata').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTMetadata>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTMetadata(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTTokenIdOwners').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTTokenIdOwners>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTTransfers').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTTransfers>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTTransfers(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/syncNFTContract').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.syncNFTContract>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.syncNFTContract(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNFTContractTransfers').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getNFTContractTransfers>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getNFTContractTransfers(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletNFTCollections').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.nft.getWalletNFTCollections>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.nft.getWalletNFTCollections(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTokenTransfers').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getTokenTransfers>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getTokenTransfers(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletTokenBalances').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getWalletTokenBalances>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getWalletTokenBalances(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletTokenTransfers').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getWalletTokenTransfers>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getWalletTokenTransfers(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTokenMetadata').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getTokenMetadata>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getTokenMetadata(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTokenMetadataBySymbol').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getTokenMetadataBySymbol>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getTokenMetadataBySymbol(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTokenPrice').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getTokenPrice>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getTokenPrice(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTokenAllowance').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.token.getTokenAllowance>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.token.getTokenAllowance(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getPairAddress').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.defi.getPairAddress>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.defi.getPairAddress(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getPairReserves').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.defi.getPairReserves>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.defi.getPairReserves(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getContractEvents').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.events.getContractEvents>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.events.getContractEvents(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getContractLogs').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.events.getContractLogs>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.events.getContractLogs(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getTransaction').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.transaction.getTransaction>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.transaction.getTransaction(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getWalletTransactions').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.transaction.getWalletTransactions>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.transaction.getWalletTransactions(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getNativeBalance').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.balance.getNativeBalance>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.balance.getNativeBalance(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getBlock').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.block.getBlock>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.block.getBlock(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/getDateToBlock').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.block.getDateToBlock>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.block.getDateToBlock(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/resolveAddress').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.resolve.resolveAddress>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.resolve.resolveAddress(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/resolveDomain').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.resolve.resolveDomain>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.resolve.resolveDomain(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/uploadFolder').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.ipfs.uploadFolder>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.ipfs.uploadFolder(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/endpointWeights').post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.utils.endpointWeights();
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/web3ApiVersion').post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.utils.web3ApiVersion();
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/evm/runContractFunction').post(async (req: TypedRequestBody<Parameters<typeof Moralis.EvmApi.utils.runContractFunction>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.EvmApi.utils.runContractFunction(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getBalance').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.account.getBalance>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.account.getBalance(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getNFTs').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.account.getNFTs>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.account.getNFTs(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getPortfolio').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.account.getPortfolio>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.account.getPortfolio(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getSPL').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.account.getSPL>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.account.getSPL(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getNFTMetadata').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.nft.getNFTMetadata>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.nft.getNFTMetadata(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
    proxyRouter.route('/solana/getTokenPrice').post(async (req: TypedRequestBody<Parameters<typeof Moralis.SolApi.token.getTokenPrice>[0]>, res: Response, next: NextFunction) => {
        try {
            const response = await Moralis.SolApi.token.getTokenPrice(req.body);
            return res.send(response);
          } catch (error) {
            return next(error);
          }
    });
            
