import { MOCK_API_KEY, APTOS_API_ROOT } from './config';
import { MockServer } from '@moralisweb3/test-utils';
import { mockGetAccount } from './endpoints/accounts.getAccount';
import { mockGetCoinBalancesByWallets } from './endpoints/wallets.getCoinBalancesByWallets';
import { mockGetTopHoldersByCoin } from './endpoints/coinBalances.getTopHoldersByCoin';
import { mockGetNFTCollections } from './endpoints/nftCollections.getNFTCollections';
import { mockGetAccountModule } from './endpoints/accounts.getAccountModule';

const handlers = [
  mockGetAccount,
  mockGetAccountModule,
  mockGetTopHoldersByCoin,
  mockGetNFTCollections,
  mockGetCoinBalancesByWallets,
];

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: APTOS_API_ROOT }, handlers).start();
