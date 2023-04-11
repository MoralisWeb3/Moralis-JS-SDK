import { GetNFTsByIdsOperation } from './GetNFTsByIdsOperation';
import { GetNFTsByCollectionOperation } from './GetNFTsByCollectionOperation';
import { GetNFTsByCreatorsOperation } from './GetNFTsByCreatorsOperation';
import { GetNFTCollectionsOperation } from './GetNFTCollectionsOperation';
import { GetNFTCollectionsByIdsOperation } from './GetNFTCollectionsByIdsOperation';
import { GetNFTCollectionsByCreatorOperation } from './GetNFTCollectionsByCreatorOperation';
import { GetNFTOwnersByTokensOperation } from './GetNFTOwnersByTokensOperation';
import { GetNFTOwnersByCollectionOperation } from './GetNFTOwnersByCollectionOperation';
import { GetNFTOwnersOfCollectionOperation } from './GetNFTOwnersOfCollectionOperation';
import { GetNFTTransfersByIdsOperation } from './GetNFTTransfersByIdsOperation';
import { GetNFTTransfersByCollectionOperation } from './GetNFTTransfersByCollectionOperation';
import { GetNFTTransfersByCreatorsOperation } from './GetNFTTransfersByCreatorsOperation';
import { GetNFTTransfersByWalletsOperation } from './GetNFTTransfersByWalletsOperation';
import { GetCoinInfoByCoinTypeHashesOperation } from './GetCoinInfoByCoinTypeHashesOperation';
import { GetLatestCoinsOperation } from './GetLatestCoinsOperation';
import { GetCoinsByNameRangeOperation } from './GetCoinsByNameRangeOperation';
import { GetCoinsBySymbolRangeOperation } from './GetCoinsBySymbolRangeOperation';
import { GetCoinsByCreatorsOperation } from './GetCoinsByCreatorsOperation';
import { GetCoinTransfersByOwnerAddressesOperation } from './GetCoinTransfersByOwnerAddressesOperation';
import { GetCoinTransfersByBlockHeightsOperation } from './GetCoinTransfersByBlockHeightsOperation';
import { GetCoinTransfersByCoinTypeOperation } from './GetCoinTransfersByCoinTypeOperation';
import { GetTopHoldersByCoinOperation } from './GetTopHoldersByCoinOperation';
import { GetCoinBalancesByWalletsOperation } from './GetCoinBalancesByWalletsOperation';
import { GetHistoricalCoinBalancesByWalletsOperation } from './GetHistoricalCoinBalancesByWalletsOperation';
import { GetCoinTransfersByWalletAddressesOperation } from './GetCoinTransfersByWalletAddressesOperation';
import { GetNFTByOwnersOperation } from './GetNFTByOwnersOperation';
import { GetWalletsNFTTransfersOperation } from './GetWalletsNFTTransfersOperation';
import { GetAccountOperation } from './GetAccountOperation';
import { GetAccountResourcesOperation } from './GetAccountResourcesOperation';
import { GetAccountModulesOperation } from './GetAccountModulesOperation';
import { GetAccountResourceOperation } from './GetAccountResourceOperation';
import { GetAccountModuleOperation } from './GetAccountModuleOperation';
import { GetEventsByCreationNumberOperation } from './GetEventsByCreationNumberOperation';
import { GetEventsByEventHandleOperation } from './GetEventsByEventHandleOperation';
import { GetTransactionsOperation } from './GetTransactionsOperation';
import { SubmitTransactionOperation } from './SubmitTransactionOperation';
import { GetTransactionByHashOperation } from './GetTransactionByHashOperation';
import { GetTransactionByVersionOperation } from './GetTransactionByVersionOperation';
import { GetAccountTransactionsOperation } from './GetAccountTransactionsOperation';
import { SubmitBatchTransactionsOperation } from './SubmitBatchTransactionsOperation';
import { SimulateTransactionOperation } from './SimulateTransactionOperation';
import { EncodeSubmissionOperation } from './EncodeSubmissionOperation';
import { EstimateGasPriceOperation } from './EstimateGasPriceOperation';
import { GetBlockByHeightOperation } from './GetBlockByHeightOperation';
import { GetBlockByVersionOperation } from './GetBlockByVersionOperation';

export const operations = [
  GetNFTsByIdsOperation,
  GetNFTsByCollectionOperation,
  GetNFTsByCreatorsOperation,
  GetNFTCollectionsOperation,
  GetNFTCollectionsByIdsOperation,
  GetNFTCollectionsByCreatorOperation,
  GetNFTOwnersByTokensOperation,
  GetNFTOwnersByCollectionOperation,
  GetNFTOwnersOfCollectionOperation,
  GetNFTTransfersByIdsOperation,
  GetNFTTransfersByCollectionOperation,
  GetNFTTransfersByCreatorsOperation,
  GetNFTTransfersByWalletsOperation,
  GetCoinInfoByCoinTypeHashesOperation,
  GetLatestCoinsOperation,
  GetCoinsByNameRangeOperation,
  GetCoinsBySymbolRangeOperation,
  GetCoinsByCreatorsOperation,
  GetCoinTransfersByOwnerAddressesOperation,
  GetCoinTransfersByBlockHeightsOperation,
  GetCoinTransfersByCoinTypeOperation,
  GetTopHoldersByCoinOperation,
  GetCoinBalancesByWalletsOperation,
  GetHistoricalCoinBalancesByWalletsOperation,
  GetCoinTransfersByWalletAddressesOperation,
  GetNFTByOwnersOperation,
  GetWalletsNFTTransfersOperation,
  GetAccountOperation,
  GetAccountResourcesOperation,
  GetAccountModulesOperation,
  GetAccountResourceOperation,
  GetAccountModuleOperation,
  GetEventsByCreationNumberOperation,
  GetEventsByEventHandleOperation,
  GetTransactionsOperation,
  SubmitTransactionOperation,
  GetTransactionByHashOperation,
  GetTransactionByVersionOperation,
  GetAccountTransactionsOperation,
  SubmitBatchTransactionsOperation,
  SimulateTransactionOperation,
  EncodeSubmissionOperation,
  EstimateGasPriceOperation,
  GetBlockByHeightOperation,
  GetBlockByVersionOperation,
];
