/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    upgradeRequest(params, getBlockOperation);
    const result = await Moralis.EvmApi.block.getBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getBlock'));
  }
})


const getDateToBlockOperation = getOperation('getDateToBlock');
Parse.Cloud.define("getDateToBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getDateToBlock');
    upgradeRequest(params, getDateToBlockOperation);
    const result = await Moralis.EvmApi.block.getDateToBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getDateToBlock'));
  }
})


const getLogsByAddressOperation = getOperation('getContractLogs');
Parse.Cloud.define("getLogsByAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getLogsByAddress');
    upgradeRequest(params, getLogsByAddressOperation);
    const result = await Moralis.EvmApi.events.getContractLogs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getLogsByAddress'));
  }
})


const getNFTTransfersByBlockOperation = getOperation('getNFTTransfersByBlock');
Parse.Cloud.define("getNFTTransfersByBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTransfersByBlock');
    upgradeRequest(params, getNFTTransfersByBlockOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfersByBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfersByBlock'));
  }
})


const getTransactionOperation = getOperation('getTransaction');
Parse.Cloud.define("getTransaction", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransaction');
    upgradeRequest(params, getTransactionOperation);
    const result = await Moralis.EvmApi.transaction.getTransaction(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransaction'));
  }
})


const getContractEventsOperation = getOperation('getContractEvents');
Parse.Cloud.define("getContractEvents", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getContractEvents');
    upgradeRequest(params, getContractEventsOperation);
    const result = await Moralis.EvmApi.events.getContractEvents(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractEvents'));
  }
})


const runContractFunctionOperation = getOperation('runContractFunction');
Parse.Cloud.define("runContractFunction", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'runContractFunction');
    upgradeRequest(params, runContractFunctionOperation);
    const result = await Moralis.EvmApi.utils.runContractFunction(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'runContractFunction'));
  }
})


const getTransactionsOperation = getOperation('getWalletTransactions');
Parse.Cloud.define("getTransactions", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransactions');
    upgradeRequest(params, getTransactionsOperation);
    const result = await Moralis.EvmApi.transaction.getWalletTransactions(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransactions'));
  }
})


const getTransactionsVerboseOperation = getOperation('getWalletTransactionsVerbose');
Parse.Cloud.define("getTransactionsVerbose", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTransactionsVerbose');
    upgradeRequest(params, getTransactionsVerboseOperation);
    const result = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTransactionsVerbose'));
  }
})


const getNativeBalanceOperation = getOperation('getNativeBalance');
Parse.Cloud.define("getNativeBalance", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNativeBalance');
    upgradeRequest(params, getNativeBalanceOperation);
    const result = await Moralis.EvmApi.balance.getNativeBalance(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNativeBalance'));
  }
})


const getTokenBalancesOperation = getOperation('getWalletTokenBalances');
Parse.Cloud.define("getTokenBalances", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenBalances');
    upgradeRequest(params, getTokenBalancesOperation);
    const result = await Moralis.EvmApi.token.getWalletTokenBalances(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenBalances'));
  }
})


const getTokenTransfersOperation = getOperation('getWalletTokenTransfers');
Parse.Cloud.define("getTokenTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenTransfers');
    upgradeRequest(params, getTokenTransfersOperation);
    const result = await Moralis.EvmApi.token.getWalletTokenTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenTransfers'));
  }
})


const getNFTsOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTs');
    upgradeRequest(params, getNFTsOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTs'));
  }
})


const getNFTTransfersOperation = getOperation('getWalletNFTTransfers');
Parse.Cloud.define("getNFTTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTransfers');
    upgradeRequest(params, getNFTTransfersOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTransfers'));
  }
})


const getWalletNFTCollectionsOperation = getOperation('getWalletNFTCollections');
Parse.Cloud.define("getWalletNFTCollections", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getWalletNFTCollections');
    upgradeRequest(params, getWalletNFTCollectionsOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTCollections(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletNFTCollections'));
  }
})


const getNFTsForContractOperation = getOperation('getWalletNFTs');
Parse.Cloud.define("getNFTsForContract", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTsForContract');
    upgradeRequest(params, getNFTsForContractOperation);
    const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTsForContract'));
  }
})


const getTokenMetadataOperation = getOperation('getTokenMetadata');
Parse.Cloud.define("getTokenMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenMetadata');
    upgradeRequest(params, getTokenMetadataOperation);
    const result = await Moralis.EvmApi.token.getTokenMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadata'));
  }
})


const getNFTTradesOperation = getOperation('getNFTTrades');
Parse.Cloud.define("getNFTTrades", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTTrades');
    upgradeRequest(params, getNFTTradesOperation);
    const result = await Moralis.EvmApi.nft.getNFTTrades(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTTrades'));
  }
})


const getNFTLowestPriceOperation = getOperation('getNFTLowestPrice');
Parse.Cloud.define("getNFTLowestPrice", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTLowestPrice');
    upgradeRequest(params, getNFTLowestPriceOperation);
    const result = await Moralis.EvmApi.nft.getNFTLowestPrice(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTLowestPrice'));
  }
})


const getTokenMetadataBySymbolOperation = getOperation('getTokenMetadataBySymbol');
Parse.Cloud.define("getTokenMetadataBySymbol", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenMetadataBySymbol');
    upgradeRequest(params, getTokenMetadataBySymbolOperation);
    const result = await Moralis.EvmApi.token.getTokenMetadataBySymbol(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenMetadataBySymbol'));
  }
})


const getTokenPriceOperation = getOperation('getTokenPrice');
Parse.Cloud.define("getTokenPrice", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenPrice');
    upgradeRequest(params, getTokenPriceOperation);
    const result = await Moralis.EvmApi.token.getTokenPrice(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenPrice'));
  }
})


const getTokenAddressTransfersOperation = getOperation('getTokenTransfers');
Parse.Cloud.define("getTokenAddressTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenAddressTransfers');
    upgradeRequest(params, getTokenAddressTransfersOperation);
    const result = await Moralis.EvmApi.token.getTokenTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAddressTransfers'));
  }
})


const getTokenAllowanceOperation = getOperation('getTokenAllowance');
Parse.Cloud.define("getTokenAllowance", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenAllowance');
    upgradeRequest(params, getTokenAllowanceOperation);
    const result = await Moralis.EvmApi.token.getTokenAllowance(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenAllowance'));
  }
})


const searchNFTsOperation = getOperation('searchNFTs');
Parse.Cloud.define("searchNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'searchNFTs');
    upgradeRequest(params, searchNFTsOperation);
    const result = await Moralis.EvmApi.nft.searchNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'searchNFTs'));
  }
})


const getNftTransfersFromToBlockOperation = getOperation('getNFTTransfersFromToBlock');
Parse.Cloud.define("getNftTransfersFromToBlock", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNftTransfersFromToBlock');
    upgradeRequest(params, getNftTransfersFromToBlockOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNftTransfersFromToBlock'));
  }
})


const getAllTokenIdsOperation = getOperation('getContractNFTs');
Parse.Cloud.define("getAllTokenIds", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getAllTokenIds');
    upgradeRequest(params, getAllTokenIdsOperation);
    const result = await Moralis.EvmApi.nft.getContractNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getAllTokenIds'));
  }
})


const getMultipleNFTsOperation = getOperation('getMultipleNFTs');
Parse.Cloud.define("getMultipleNFTs", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getMultipleNFTs');
    upgradeRequest(params, getMultipleNFTsOperation);
    const result = await Moralis.EvmApi.nft.getMultipleNFTs(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getMultipleNFTs'));
  }
})


const getContractNFTTransfersOperation = getOperation('getNFTContractTransfers');
Parse.Cloud.define("getContractNFTTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getContractNFTTransfers');
    upgradeRequest(params, getContractNFTTransfersOperation);
    const result = await Moralis.EvmApi.nft.getNFTContractTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getContractNFTTransfers'));
  }
})


const getNFTOwnersOperation = getOperation('getNFTOwners');
Parse.Cloud.define("getNFTOwners", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTOwners');
    upgradeRequest(params, getNFTOwnersOperation);
    const result = await Moralis.EvmApi.nft.getNFTOwners(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTOwners'));
  }
})


const getNFTMetadataOperation = getOperation('getNFTContractMetadata');
Parse.Cloud.define("getNFTMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getNFTMetadata');
    upgradeRequest(params, getNFTMetadataOperation);
    const result = await Moralis.EvmApi.nft.getNFTContractMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getNFTMetadata'));
  }
})


const reSyncMetadataOperation = getOperation('reSyncMetadata');
Parse.Cloud.define("reSyncMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'reSyncMetadata');
    upgradeRequest(params, reSyncMetadataOperation);
    const result = await Moralis.EvmApi.nft.reSyncMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'reSyncMetadata'));
  }
})


const syncNFTContractOperation = getOperation('syncNFTContract');
Parse.Cloud.define("syncNFTContract", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'syncNFTContract');
    upgradeRequest(params, syncNFTContractOperation);
    const result = await Moralis.EvmApi.nft.syncNFTContract(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'syncNFTContract'));
  }
})


const getTokenIdMetadataOperation = getOperation('getNFTMetadata');
Parse.Cloud.define("getTokenIdMetadata", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenIdMetadata');
    upgradeRequest(params, getTokenIdMetadataOperation);
    const result = await Moralis.EvmApi.nft.getNFTMetadata(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdMetadata'));
  }
})


const getTokenIdOwnersOperation = getOperation('getNFTTokenIdOwners');
Parse.Cloud.define("getTokenIdOwners", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getTokenIdOwners');
    upgradeRequest(params, getTokenIdOwnersOperation);
    const result = await Moralis.EvmApi.nft.getNFTTokenIdOwners(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getTokenIdOwners'));
  }
})


const getWalletTokenIdTransfersOperation = getOperation('getNFTTransfers');
Parse.Cloud.define("getWalletTokenIdTransfers", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getWalletTokenIdTransfers');
    upgradeRequest(params, getWalletTokenIdTransfersOperation);
    const result = await Moralis.EvmApi.nft.getNFTTransfers(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getWalletTokenIdTransfers'));
  }
})


const resolveDomainOperation = getOperation('resolveDomain');
Parse.Cloud.define("resolveDomain", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'resolveDomain');
    upgradeRequest(params, resolveDomainOperation);
    const result = await Moralis.EvmApi.resolve.resolveDomain(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveDomain'));
  }
})


const resolveAddressOperation = getOperation('resolveAddress');
Parse.Cloud.define("resolveAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'resolveAddress');
    upgradeRequest(params, resolveAddressOperation);
    const result = await Moralis.EvmApi.resolve.resolveAddress(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'resolveAddress'));
  }
})


const getPairReservesOperation = getOperation('getPairReserves');
Parse.Cloud.define("getPairReserves", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getPairReserves');
    upgradeRequest(params, getPairReservesOperation);
    const result = await Moralis.EvmApi.defi.getPairReserves(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairReserves'));
  }
})


const getPairAddressOperation = getOperation('getPairAddress');
Parse.Cloud.define("getPairAddress", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'getPairAddress');
    upgradeRequest(params, getPairAddressOperation);
    const result = await Moralis.EvmApi.defi.getPairAddress(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'getPairAddress'));
  }
})


const uploadFolderOperation = getOperation('uploadFolder');
Parse.Cloud.define("uploadFolder", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'uploadFolder');
    upgradeRequest(params, uploadFolderOperation);
    const result = await Moralis.EvmApi.ipfs.uploadFolder(params);
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'uploadFolder'));
  }
})


const web3ApiVersionOperation = getOperation('web3ApiVersion');
Parse.Cloud.define("web3ApiVersion", async ({params, user, ip}: any) => {
  try {
    await beforeApiRequest(user, ip, 'web3ApiVersion');
    upgradeRequest(params, web3ApiVersionOperation);
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
    upgradeRequest(params, endpointWeightsOperation);
    const result = await Moralis.EvmApi.utils.endpointWeights();
    return result?.raw;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'endpointWeights'));
  }
})

