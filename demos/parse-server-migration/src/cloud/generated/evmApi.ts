/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Moralis from 'moralis'
import { MoralisError, Operation } from '@moralisweb3/common-core';
import { handleRateLimit } from '../../rateLimit';
import { upgradeRequest } from '../upgradeRequest'
import { AxiosError } from 'axios';
import { operations } from '@moralisweb3/common-evm-utils';
declare const Parse: any;

function getErrorMessage(error: Error, name: string) {
  // Resolve Axios data inside the MoralisError
  if (
    error instanceof MoralisError &&
    error.cause &&
    error.cause instanceof AxiosError &&
    error.cause.response &&
    error.cause.response.data
  ) {
    return JSON.stringify(error.cause.response.data);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `API error while calling ${name}`
}

function getOperation(operationName: string): Operation<unknown, unknown, unknown, unknown> {
  const operation = operations.find((o) => o.name === operationName);
  if (!operation) {
    throw new Error(`Not supported operation ${operationName}`);
  }
  return operation as Operation<unknown, unknown, unknown, unknown>;
}

async function beforeApiRequest(user: any, ip: any, name: string) {
  if (!(await handleRateLimit(user, ip))) {
    throw new Error(
      `Too many requests to ${name} API from this particular client, the clients needs to wait before sending more requests.`
    );
  }
}


const getBlockOperation = getOperation('getBlock');
Parse.Cloud.define("getBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getBlock');
    const request = upgradeRequest(params, getBlockOperation);
    const result = await Moralis.EvmApi.block.getBlock(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getBlock'));
  }
})


const getDateToBlockOperation = getOperation('getDateToBlock');
Parse.Cloud.define("getDateToBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getDateToBlock');
    const request = upgradeRequest(params, getDateToBlockOperation);
    const result = await Moralis.EvmApi.block.getDateToBlock(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getDateToBlock'));
  }
})


const getLogsByAddressOperation = getOperation('getContractLogs');
Parse.Cloud.define("getLogsByAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getLogsByAddress');
    const request = upgradeRequest(params, getLogsByAddressOperation);
    const result = await Moralis.EvmApi.events.getContractLogs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getLogsByAddress'));
  }
})


const getNFTTransfersByBlockOperation = getOperation('getNFTTransfersByBlock');
Parse.Cloud.define("getNFTTransfersByBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTransfersByBlock');
    const request = upgradeRequest(params, getNFTTransfersByBlockOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfersByBlock(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfersByBlock'));
  }
})


const getTransactionOperation = getOperation('getTransaction');
Parse.Cloud.define("getTransaction", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransaction');
    const request = upgradeRequest(params, getTransactionOperation);
    const result = await Moralis.EvmApi.transaction.getTransaction(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransaction'));
  }
})


const getContractEventsOperation = getOperation('getContractEvents');
Parse.Cloud.define("getContractEvents", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getContractEvents');
    const request = upgradeRequest(params, getContractEventsOperation);
    const result = await Moralis.EvmApi.events.getContractEvents(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractEvents'));
  }
})


const runContractFunctionOperation = getOperation('runContractFunction');
Parse.Cloud.define("runContractFunction", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'runContractFunction');
    const request = upgradeRequest(params, runContractFunctionOperation);
    const result = await Moralis.EvmApi.utils.runContractFunction(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'runContractFunction'));
  }
})


const getTransactionsOperation = getOperation('getWalletTransactions');
Parse.Cloud.define("getTransactions", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransactions');
    const request = upgradeRequest(params, getTransactionsOperation);
    const result = await Moralis.EvmApi.transaction.getWalletTransactions(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransactions'));
  }
})


const getTransactionsVerboseOperation = getOperation('getWalletTransactionsVerbose');
Parse.Cloud.define("getTransactionsVerbose", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransactionsVerbose');
    const request = upgradeRequest(params, getTransactionsVerboseOperation);
    const result = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransactionsVerbose'));
  }
})


const getNativeBalanceOperation = getOperation('getNativeBalance');
Parse.Cloud.define("getNativeBalance", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNativeBalance');
    const request = upgradeRequest(params, getNativeBalanceOperation);
    const result = await Moralis.EvmApi.balance.getNativeBalance(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNativeBalance'));
  }
})


const getTokenBalancesOperation = getOperation('getWalletTokenBalances');
Parse.Cloud.define("getTokenBalances", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenBalances');
    const request = upgradeRequest(params, getTokenBalancesOperation);
    const result = await Moralis.EvmApi.token.getWalletTokenBalances(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenBalances'));
  }
})


const getTokenTransfersOperation = getOperation('getWalletTokenTransfers');
Parse.Cloud.define("getTokenTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenTransfers');
    const request = upgradeRequest(params, getTokenTransfersOperation);
    const result = await Moralis.EvmApi.token.getWalletTokenTransfers(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenTransfers'));
  }
})


const getNFTsOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTs');
    const request = upgradeRequest(params, getNFTsOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTs'));
  }
})


const getNFTTransfersOperation = getOperation('getWalletNFTTransfers');
Parse.Cloud.define("getNFTTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTransfers');
    const request = upgradeRequest(params, getNFTTransfersOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTTransfers(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfers'));
  }
})


const getWalletNFTCollectionsOperation = getOperation('getWalletNFTCollections');
Parse.Cloud.define("getWalletNFTCollections", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getWalletNFTCollections');
    const request = upgradeRequest(params, getWalletNFTCollectionsOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTCollections(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletNFTCollections'));
  }
})


const getNFTsForContractOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTsForContract", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTsForContract');
    const request = upgradeRequest(params, getNFTsForContractOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTsForContract'));
  }
})


const getTokenMetadataOperation = getOperation('getTokenMetadata');
Parse.Cloud.define("getTokenMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenMetadata');
    const request = upgradeRequest(params, getTokenMetadataOperation);
    const result = await Moralis.EvmApi.token.getTokenMetadata(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadata'));
  }
})


const getNFTTradesOperation = getOperation('getNFTTrades');
Parse.Cloud.define("getNFTTrades", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTrades');
    const request = upgradeRequest(params, getNFTTradesOperation);
    const result = await Moralis.EvmApi.nft.getNFTTrades(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTrades'));
  }
})


const getNFTLowestPriceOperation = getOperation('getNFTLowestPrice');
Parse.Cloud.define("getNFTLowestPrice", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTLowestPrice');
    const request = upgradeRequest(params, getNFTLowestPriceOperation);
    const result = await Moralis.EvmApi.nft.getNFTLowestPrice(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTLowestPrice'));
  }
})


const getTokenMetadataBySymbolOperation = getOperation('getTokenMetadataBySymbol');
Parse.Cloud.define("getTokenMetadataBySymbol", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenMetadataBySymbol');
    const request = upgradeRequest(params, getTokenMetadataBySymbolOperation);
    const result = await Moralis.EvmApi.token.getTokenMetadataBySymbol(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadataBySymbol'));
  }
})


const getTokenPriceOperation = getOperation('getTokenPrice');
Parse.Cloud.define("getTokenPrice", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenPrice');
    const request = upgradeRequest(params, getTokenPriceOperation);
    const result = await Moralis.EvmApi.token.getTokenPrice(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenPrice'));
  }
})


const getTokenAddressTransfersOperation = getOperation('getTokenTransfers');
Parse.Cloud.define("getTokenAddressTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenAddressTransfers');
    const request = upgradeRequest(params, getTokenAddressTransfersOperation);
    const result = await Moralis.EvmApi.token.getTokenTransfers(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAddressTransfers'));
  }
})


const getTokenAllowanceOperation = getOperation('getTokenAllowance');
Parse.Cloud.define("getTokenAllowance", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenAllowance');
    const request = upgradeRequest(params, getTokenAllowanceOperation);
    const result = await Moralis.EvmApi.token.getTokenAllowance(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAllowance'));
  }
})


const searchNFTsOperation = getOperation('searchNFTs');
Parse.Cloud.define("searchNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'searchNFTs');
    const request = upgradeRequest(params, searchNFTsOperation);
    const result = await Moralis.EvmApi.nft.searchNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'searchNFTs'));
  }
})


const getNftTransfersFromToBlockOperation = getOperation('getNFTTransfersFromToBlock');
Parse.Cloud.define("getNftTransfersFromToBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNftTransfersFromToBlock');
    const request = upgradeRequest(params, getNftTransfersFromToBlockOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNftTransfersFromToBlock'));
  }
})


const getAllTokenIdsOperation = getOperation('getContractNFTs');
Parse.Cloud.define("getAllTokenIds", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getAllTokenIds');
    const request = upgradeRequest(params, getAllTokenIdsOperation);
    const result = await Moralis.EvmApi.nft.getContractNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getAllTokenIds'));
  }
})


const getMultipleNFTsOperation = getOperation('getMultipleNFTs');
Parse.Cloud.define("getMultipleNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getMultipleNFTs');
    const request = upgradeRequest(params, getMultipleNFTsOperation);
    const result = await Moralis.EvmApi.nft.getMultipleNFTs(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getMultipleNFTs'));
  }
})


const getContractNFTTransfersOperation = getOperation('getNFTContractTransfers');
Parse.Cloud.define("getContractNFTTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getContractNFTTransfers');
    const request = upgradeRequest(params, getContractNFTTransfersOperation);
    const result = await Moralis.EvmApi.nft.getNFTContractTransfers(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractNFTTransfers'));
  }
})


const getNFTOwnersOperation = getOperation('getNFTOwners');
Parse.Cloud.define("getNFTOwners", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTOwners');
    const request = upgradeRequest(params, getNFTOwnersOperation);
    const result = await Moralis.EvmApi.nft.getNFTOwners(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTOwners'));
  }
})


const getNFTMetadataOperation = getOperation('getNFTContractMetadata');
Parse.Cloud.define("getNFTMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTMetadata');
    const request = upgradeRequest(params, getNFTMetadataOperation);
    const result = await Moralis.EvmApi.nft.getNFTContractMetadata(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTMetadata'));
  }
})


const reSyncMetadataOperation = getOperation('reSyncMetadata');
Parse.Cloud.define("reSyncMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'reSyncMetadata');
    const request = upgradeRequest(params, reSyncMetadataOperation);
    const result = await Moralis.EvmApi.nft.reSyncMetadata(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'reSyncMetadata'));
  }
})


const syncNFTContractOperation = getOperation('syncNFTContract');
Parse.Cloud.define("syncNFTContract", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'syncNFTContract');
    const request = upgradeRequest(params, syncNFTContractOperation);
    const result = await Moralis.EvmApi.nft.syncNFTContract(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'syncNFTContract'));
  }
})


const getTokenIdMetadataOperation = getOperation('getNFTMetadata');
Parse.Cloud.define("getTokenIdMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenIdMetadata');
    const request = upgradeRequest(params, getTokenIdMetadataOperation);
    const result = await Moralis.EvmApi.nft.getNFTMetadata(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdMetadata'));
  }
})


const getTokenIdOwnersOperation = getOperation('getNFTTokenIdOwners');
Parse.Cloud.define("getTokenIdOwners", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenIdOwners');
    const request = upgradeRequest(params, getTokenIdOwnersOperation);
    const result = await Moralis.EvmApi.nft.getNFTTokenIdOwners(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdOwners'));
  }
})


const getWalletTokenIdTransfersOperation = getOperation('getNFTTransfers');
Parse.Cloud.define("getWalletTokenIdTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getWalletTokenIdTransfers');
    const request = upgradeRequest(params, getWalletTokenIdTransfersOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfers(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletTokenIdTransfers'));
  }
})


const resolveDomainOperation = getOperation('resolveDomain');
Parse.Cloud.define("resolveDomain", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'resolveDomain');
    const request = upgradeRequest(params, resolveDomainOperation);
    const result = await Moralis.EvmApi.resolve.resolveDomain(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveDomain'));
  }
})


const resolveAddressOperation = getOperation('resolveAddress');
Parse.Cloud.define("resolveAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'resolveAddress');
    const request = upgradeRequest(params, resolveAddressOperation);
    const result = await Moralis.EvmApi.resolve.resolveAddress(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveAddress'));
  }
})


const getPairReservesOperation = getOperation('getPairReserves');
Parse.Cloud.define("getPairReserves", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getPairReserves');
    const request = upgradeRequest(params, getPairReservesOperation);
    const result = await Moralis.EvmApi.defi.getPairReserves(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairReserves'));
  }
})


const getPairAddressOperation = getOperation('getPairAddress');
Parse.Cloud.define("getPairAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getPairAddress');
    const request = upgradeRequest(params, getPairAddressOperation);
    const result = await Moralis.EvmApi.defi.getPairAddress(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairAddress'));
  }
})


const uploadFolderOperation = getOperation('uploadFolder');
Parse.Cloud.define("uploadFolder", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'uploadFolder');
    const request = upgradeRequest(params, uploadFolderOperation);
    const result = await Moralis.EvmApi.ipfs.uploadFolder(request);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'uploadFolder'));
  }
})


const web3ApiVersionOperation = getOperation('web3ApiVersion');
Parse.Cloud.define("web3ApiVersion", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'web3ApiVersion');
    const request = upgradeRequest(params, web3ApiVersionOperation);
    const result = await Moralis.EvmApi.utils.web3ApiVersion();
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'web3ApiVersion'));
  }
})


const endpointWeightsOperation = getOperation('endpointWeights');
Parse.Cloud.define("endpointWeights", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'endpointWeights');
    const request = upgradeRequest(params, endpointWeightsOperation);
    const result = await Moralis.EvmApi.utils.endpointWeights();
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'endpointWeights'));
  }
})

