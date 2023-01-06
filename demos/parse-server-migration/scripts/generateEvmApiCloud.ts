import { createCloudFile } from './utils/generateApiCloudCode';
import { fetchEndpoints } from './utils/prepareSwaggerForApi';
import path from 'path';

const OUTPUT_FILE = path.join(__dirname, '../src/cloud/generated', 'evmApi.ts');
const API_SWAGGER_URL = 'https://deep-index.moralis.io/api-docs/v2/swagger.json';

const replacements = {
  'token.getAllTokenIds': 'nft.getContractNFTs',
  'token.getContractNFTTransfers': 'nft.getNFTContractTransfers',
  'token.getNFTLowestPrice': 'nft.getNFTLowestPrice',
  'token.getNFTMetadata': 'nft.getNFTContractMetadata',
  'token.getNFTOwners': 'nft.getNFTOwners',
  'token.getNFTTrades': 'nft.getNFTTrades',
  'token.getNftTransfersFromToBlock': 'nft.getNFTTransfersFromToBlock',
  'token.getTokenAddressTransfers': 'token.getTokenTransfers',
  'token.getTokenIdMetadata': 'nft.getNFTMetadata',
  'token.getTokenIdOwners': 'nft.getNFTTokenIdOwners',
  'token.getWalletTokenIdTransfers': 'nft.getNFTTransfers',
  'token.reSyncMetadata': 'nft.reSyncMetadata',
  'token.searchNFTs': 'nft.searchNFTs',
  'token.syncNFTContract': 'nft.syncNFTContract',
  'token.getMultipleNFTs': 'nft.getMultipleNFTs',
  'account.getNativeBalance': 'balance.getNativeBalance',
  'account.getNFTs': 'nft.getWalletNFTs',
  'account.getNFTsForContract': 'nft.getWalletNFTs',
  'account.getNFTTransfers': 'nft.getWalletNFTTransfers',
  'account.getTokenBalances': 'token.getWalletTokenBalances',
  'account.getTokenTransfers': 'token.getWalletTokenTransfers',
  'account.getTransactions': 'transaction.getWalletTransactions',
  'account.getWalletNFTCollections': 'nft.getWalletNFTCollections',
  'account.getTransactionsVerbose': 'transaction.getWalletTransactionsVerbose',
  'storage.uploadFolder': 'ipfs.uploadFolder',
  'native.getDateToBlock': 'block.getDateToBlock',
  'native.getBlock': 'block.getBlock',
  'native.getContractEvents': 'events.getContractEvents',
  'native.getLogsByAddress': 'events.getContractLogs',
  'native.getNFTTransfersByBlock': 'nft.getNFTTransfersByBlock',
  'native.getTransaction': 'transaction.getTransaction',
  'native.runContractFunction': 'utils.runContractFunction',
  'info.web3ApiVersion': 'utils.web3ApiVersion',
  'info.endpointWeights': 'utils.endpointWeights',
  'contract.syncNFTContract': 'nft.syncNFTContract',
};

const noArgMethodNames = ['web3ApiVersion', 'endpointWeights'];

export const generateEvmApiCloud = async () => {
  const { endpoints } = await fetchEndpoints(API_SWAGGER_URL, replacements, noArgMethodNames);
  await createCloudFile(OUTPUT_FILE, 'EvmApi', endpoints);
};
