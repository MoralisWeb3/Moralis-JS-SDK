import { GetNFTTradesOperation } from './GetNFTTradesOperation';
import { GetMultipleTokenPricesOperation } from './GetMultipleTokenPricesOperation';
import { GetWalletTokenBalancesPriceOperation } from './GetWalletTokenBalancesPriceOperation';
import { GetWalletNetWorthOperation } from './GetWalletNetWorthOperation';
import { Web3ApiVersionOperation } from './Web3ApiVersionOperation';
import { EndpointWeightsOperation } from './EndpointWeightsOperation';
import { ResolveAddressToDomainOperation } from './ResolveAddressToDomainOperation';
import { GetPairPriceOperation } from './GetPairPriceOperation';
import { GetTopERC20TokensByMarketCapOperation } from './GetTopERC20TokensByMarketCapOperation';
import { GetTopERC20TokensByPriceMoversOperation } from './GetTopERC20TokensByPriceMoversOperation';
import { GetTopNFTCollectionsByMarketCapOperation } from './GetTopNFTCollectionsByMarketCapOperation';
import { GetHottestNFTCollectionsByTradingVolumeOperation } from './GetHottestNFTCollectionsByTradingVolumeOperation';
import { GetTopCryptoCurrenciesByMarketCapOperation } from './GetTopCryptoCurrenciesByMarketCapOperation';
import { GetTopCryptoCurrenciesByTradingVolumeOperation } from './GetTopCryptoCurrenciesByTradingVolumeOperation';
import { ReviewContractsOperation } from './ReviewContractsOperation';
import { GetWalletActiveChainsOperation } from './GetWalletActiveChainsOperation';
import { GetWalletStatsOperation } from './GetWalletStatsOperation';
import { GetNFTCollectionStatsOperation } from './GetNFTCollectionStatsOperation';
import { GetNFTTokenStatsOperation } from './GetNFTTokenStatsOperation';
import { GetTokenStatsOperation } from './GetTokenStatsOperation';
import { GetBlockStatsOperation } from './GetBlockStatsOperation';

export const operations = [
  GetNFTTradesOperation,
  GetMultipleTokenPricesOperation,
  GetWalletTokenBalancesPriceOperation,
  GetWalletNetWorthOperation,
  Web3ApiVersionOperation,
  EndpointWeightsOperation,
  ResolveAddressToDomainOperation,
  GetPairPriceOperation,
  GetTopERC20TokensByMarketCapOperation,
  GetTopERC20TokensByPriceMoversOperation,
  GetTopNFTCollectionsByMarketCapOperation,
  GetHottestNFTCollectionsByTradingVolumeOperation,
  GetTopCryptoCurrenciesByMarketCapOperation,
  GetTopCryptoCurrenciesByTradingVolumeOperation,
  ReviewContractsOperation,
  GetWalletActiveChainsOperation,
  GetWalletStatsOperation,
  GetNFTCollectionStatsOperation,
  GetNFTTokenStatsOperation,
  GetTokenStatsOperation,
  GetBlockStatsOperation,
];
