import { GetNFTTradesOperation } from './GetNFTTradesOperation';
import { Web3ApiVersionOperation } from './Web3ApiVersionOperation';
import { EndpointWeightsOperation } from './EndpointWeightsOperation';
import { GetTopERC20TokensByMarketCapOperation } from './GetTopERC20TokensByMarketCapOperation';
import { GetTopERC20TokensByPriceMoversOperation } from './GetTopERC20TokensByPriceMoversOperation';
import { GetTopNFTCollectionsByMarketCapOperation } from './GetTopNFTCollectionsByMarketCapOperation';
import { GetHottestNFTCollectionsByTradingVolumeOperation } from './GetHottestNFTCollectionsByTradingVolumeOperation';
import { ReviewContractsOperation } from './ReviewContractsOperation';
import { GetWalletActiveChainsOperation } from './GetWalletActiveChainsOperation';
import { GetWalletStatsOperation } from './GetWalletStatsOperation';
import { GetNFTCollectionStatsOperation } from './GetNFTCollectionStatsOperation';
import { GetNFTTokenStatsOperation } from './GetNFTTokenStatsOperation';
import { GetTokenStatsOperation } from './GetTokenStatsOperation';
import { GetBlockStatsOperation } from './GetBlockStatsOperation';

export const operations = [
  GetNFTTradesOperation,
  Web3ApiVersionOperation,
  EndpointWeightsOperation,
  GetTopERC20TokensByMarketCapOperation,
  GetTopERC20TokensByPriceMoversOperation,
  GetTopNFTCollectionsByMarketCapOperation,
  GetHottestNFTCollectionsByTradingVolumeOperation,
  ReviewContractsOperation,
  GetWalletActiveChainsOperation,
  GetWalletStatsOperation,
  GetNFTCollectionStatsOperation,
  GetNFTTokenStatsOperation,
  GetTokenStatsOperation,
  GetBlockStatsOperation,
];
