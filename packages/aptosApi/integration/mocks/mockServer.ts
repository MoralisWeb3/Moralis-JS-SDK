import { MOCK_API_KEY, APTOS_API_ROOT } from './config';
import { MockServer } from '@moralisweb3/test-utils';
import { mockGetAccount } from './endpoints/accounts.getAccount';
import { mockGetCoinBalancesByWallets } from './endpoints/wallets.getCoinBalancesByWallets';
import { mockGetTopHoldersByCoin } from './endpoints/coins.getTopHoldersByCoin';
import { mockGetNFTCollections } from './endpoints/collections.getNFTCollections';
import { mockGetAccountModule } from './endpoints/accounts.getAccountModule';
import { mockGetLatestCoins } from './endpoints/coins.getLatestCoins';
import { mockEstimateGasPrice } from './endpoints/transactions.estimateGasPrice';
import { mockGetNFTsByCreators } from './endpoints/nfts.getNFTsByCreators';
import { mockGetNFTOwnersByCollection } from './endpoints/nfts.getNFTOwnersByCollection';
import { mockGetCoinInfoByCoinTypeHashes } from './endpoints/coins.getCoinInfoByCoinTypeHashes';
import { mockGetBlockByHeight } from './endpoints/blocks.getBlockByHeight';
import { mockGetTransactions } from './endpoints/transactions.getTransactions';
import { mockSimulateTransaction } from './endpoints/transactions.simulateTransaction';

const handlers = [
  mockGetAccount,
  mockGetAccountModule,
  mockGetBlockByHeight,
  mockGetTopHoldersByCoin,
  mockGetNFTCollections,
  mockGetCoinInfoByCoinTypeHashes,
  mockGetCoinBalancesByWallets,
  mockGetLatestCoins,
  mockGetNFTOwnersByCollection,
  mockGetNFTsByCreators,
  mockEstimateGasPrice,
  mockGetTransactions,
  mockSimulateTransaction,
];

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: APTOS_API_ROOT }, handlers).start();
