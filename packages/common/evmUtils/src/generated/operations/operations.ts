import { GetNFTTradesOperation } from './GetNFTTradesOperation';
import { Web3ApiVersionOperation } from './Web3ApiVersionOperation';
import { EndpointWeightsOperation } from './EndpointWeightsOperation';
import { GetTopERC20TokensByMarketCapOperation } from './GetTopERC20TokensByMarketCapOperation';
import { GetTopERC20TokensByPriceMoversOperation } from './GetTopERC20TokensByPriceMoversOperation';
import { GetTopNFTCollectionsByMarketCapOperation } from './GetTopNFTCollectionsByMarketCapOperation';
import { GetHottestNFTCollectionsByTradingVolumeOperation } from './GetHottestNFTCollectionsByTradingVolumeOperation';

export const operations = [
  GetNFTTradesOperation,
  Web3ApiVersionOperation,
  EndpointWeightsOperation,
  GetTopERC20TokensByMarketCapOperation,
  GetTopERC20TokensByPriceMoversOperation,
  GetTopNFTCollectionsByMarketCapOperation,
  GetHottestNFTCollectionsByTradingVolumeOperation,
];
