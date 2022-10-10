/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('MoralisAPIProxy')
export class ProxyController {
  constructor() {
    Moralis.start({
      apiKey: process.env['MORALIS_API_KEY'],
    });
  }

  @Post('evm/getNFTTransfersByBlock')
  async getNFTTransfersByBlockevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getNFTTransfersByBlock>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTTransfersByBlock(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletNFTs')
  async getWalletNFTsevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getWalletNFTs>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getWalletNFTs(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletNFTTransfers')
  async getWalletNFTTransfersevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getWalletNFTTransfers>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getWalletNFTTransfers(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTTrades')
  async getNFTTradesevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTTrades>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTTrades(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTLowestPrice')
  async getNFTLowestPriceevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTLowestPrice>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTLowestPrice(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/searchNFTs')
  async searchNFTsevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.searchNFTs>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.searchNFTs(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTTransfersFromToBlock')
  async getNFTTransfersFromToBlockevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getContractNFTs')
  async getContractNFTsevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getContractNFTs>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getContractNFTs(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTOwners')
  async getNFTOwnersevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTOwners>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTOwners(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTContractMetadata')
  async getNFTContractMetadataevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getNFTContractMetadata>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTContractMetadata(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/reSyncMetadata')
  async reSyncMetadataevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.reSyncMetadata>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.reSyncMetadata(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTMetadata')
  async getNFTMetadataevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTMetadata>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTMetadata(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTTokenIdOwners')
  async getNFTTokenIdOwnersevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTTokenIdOwners>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTTokenIdOwners(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTTransfers')
  async getNFTTransfersevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.getNFTTransfers>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTTransfers(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/syncNFTContract')
  async syncNFTContractevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.nft.syncNFTContract>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.syncNFTContract(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNFTContractTransfers')
  async getNFTContractTransfersevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getNFTContractTransfers>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getNFTContractTransfers(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletNFTCollections')
  async getWalletNFTCollectionsevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.nft.getWalletNFTCollections>[0],
  ) {
    try {
      return await Moralis.EvmApi.nft.getWalletNFTCollections(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTokenTransfers')
  async getTokenTransfersevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.token.getTokenTransfers>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getTokenTransfers(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletTokenBalances')
  async getWalletTokenBalancesevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.token.getWalletTokenBalances>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getWalletTokenBalances(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletTokenTransfers')
  async getWalletTokenTransfersevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.token.getWalletTokenTransfers>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getWalletTokenTransfers(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTokenMetadata')
  async getTokenMetadataevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.token.getTokenMetadata>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getTokenMetadata(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTokenMetadataBySymbol')
  async getTokenMetadataBySymbolevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.token.getTokenMetadataBySymbol>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getTokenMetadataBySymbol(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTokenPrice')
  async getTokenPriceevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.token.getTokenPrice>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getTokenPrice(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTokenAllowance')
  async getTokenAllowanceevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.token.getTokenAllowance>[0],
  ) {
    try {
      return await Moralis.EvmApi.token.getTokenAllowance(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getPairAddress')
  async getPairAddressevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.defi.getPairAddress>[0],
  ) {
    try {
      return await Moralis.EvmApi.defi.getPairAddress(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getPairReserves')
  async getPairReservesevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.defi.getPairReserves>[0],
  ) {
    try {
      return await Moralis.EvmApi.defi.getPairReserves(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getContractEvents')
  async getContractEventsevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.events.getContractEvents>[0],
  ) {
    try {
      return await Moralis.EvmApi.events.getContractEvents(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getContractLogs')
  async getContractLogsevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.events.getContractLogs>[0],
  ) {
    try {
      return await Moralis.EvmApi.events.getContractLogs(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getTransaction')
  async getTransactionevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.transaction.getTransaction>[0],
  ) {
    try {
      return await Moralis.EvmApi.transaction.getTransaction(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getWalletTransactions')
  async getWalletTransactionsevm(
    @Body()
    body: Parameters<
      typeof Moralis.EvmApi.transaction.getWalletTransactions
    >[0],
  ) {
    try {
      return await Moralis.EvmApi.transaction.getWalletTransactions(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getNativeBalance')
  async getNativeBalanceevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.balance.getNativeBalance>[0],
  ) {
    try {
      return await Moralis.EvmApi.balance.getNativeBalance(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getBlock')
  async getBlockevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.block.getBlock>[0],
  ) {
    try {
      return await Moralis.EvmApi.block.getBlock(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/getDateToBlock')
  async getDateToBlockevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.block.getDateToBlock>[0],
  ) {
    try {
      return await Moralis.EvmApi.block.getDateToBlock(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/resolveAddress')
  async resolveAddressevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.resolve.resolveAddress>[0],
  ) {
    try {
      return await Moralis.EvmApi.resolve.resolveAddress(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/resolveDomain')
  async resolveDomainevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.resolve.resolveDomain>[0],
  ) {
    try {
      return await Moralis.EvmApi.resolve.resolveDomain(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/uploadFolder')
  async uploadFolderevm(
    @Body() body: Parameters<typeof Moralis.EvmApi.ipfs.uploadFolder>[0],
  ) {
    try {
      return await Moralis.EvmApi.ipfs.uploadFolder(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/endpointWeights')
  async endpointWeightsevm() {
    try {
      return await Moralis.EvmApi.utils.endpointWeights();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/web3ApiVersion')
  async web3ApiVersionevm() {
    try {
      return await Moralis.EvmApi.utils.web3ApiVersion();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('evm/runContractFunction')
  async runContractFunctionevm(
    @Body()
    body: Parameters<typeof Moralis.EvmApi.utils.runContractFunction>[0],
  ) {
    try {
      return await Moralis.EvmApi.utils.runContractFunction(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getBalance')
  async getBalancesolana(
    @Body() body: Parameters<typeof Moralis.SolApi.account.getBalance>[0],
  ) {
    try {
      return await Moralis.SolApi.account.getBalance(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getNFTs')
  async getNFTssolana(
    @Body() body: Parameters<typeof Moralis.SolApi.account.getNFTs>[0],
  ) {
    try {
      return await Moralis.SolApi.account.getNFTs(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getPortfolio')
  async getPortfoliosolana(
    @Body() body: Parameters<typeof Moralis.SolApi.account.getPortfolio>[0],
  ) {
    try {
      return await Moralis.SolApi.account.getPortfolio(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getSPL')
  async getSPLsolana(
    @Body() body: Parameters<typeof Moralis.SolApi.account.getSPL>[0],
  ) {
    try {
      return await Moralis.SolApi.account.getSPL(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getNFTMetadata')
  async getNFTMetadatasolana(
    @Body() body: Parameters<typeof Moralis.SolApi.nft.getNFTMetadata>[0],
  ) {
    try {
      return await Moralis.SolApi.nft.getNFTMetadata(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('solana/getTokenPrice')
  async getTokenPricesolana(
    @Body() body: Parameters<typeof Moralis.SolApi.token.getTokenPrice>[0],
  ) {
    try {
      return await Moralis.SolApi.token.getTokenPrice(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
