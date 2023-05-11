import { GetNFTTradesOperation } from './GetNFTTradesOperation';
import { GetErc20TransfersOperation } from './GetErc20TransfersOperation';
import { Web3ApiVersionOperation } from './Web3ApiVersionOperation';
import { EndpointWeightsOperation } from './EndpointWeightsOperation';
import { GetTopERC20TokensByMarketCapOperation } from './GetTopERC20TokensByMarketCapOperation';
import { GetTopERC20TokensByPriceMoversOperation } from './GetTopERC20TokensByPriceMoversOperation';
import { GetTopNFTCollectionsByMarketCapOperation } from './GetTopNFTCollectionsByMarketCapOperation';
import { GetHottestNFTCollectionsByTradingVolumeOperation } from './GetHottestNFTCollectionsByTradingVolumeOperation';

export const operations = [
  GetNFTTradesOperation,
  GetErc20TransfersOperation,
  Web3ApiVersionOperation,
  EndpointWeightsOperation,
  GetTopERC20TokensByMarketCapOperation,
  GetTopERC20TokensByPriceMoversOperation,
  GetTopNFTCollectionsByMarketCapOperation,
  GetHottestNFTCollectionsByTradingVolumeOperation,
];
