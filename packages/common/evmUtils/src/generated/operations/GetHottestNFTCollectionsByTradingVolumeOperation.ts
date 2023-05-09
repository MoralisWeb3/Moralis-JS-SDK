import { EvmMarketDataHottestNFTCollectionByTradingVolumeItem, EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON } from '../types/EvmMarketDataHottestNFTCollectionByTradingVolumeItem';

// request parameters:

export interface GetHottestNFTCollectionsByTradingVolumeOperationRequest {
}

export interface GetHottestNFTCollectionsByTradingVolumeOperationRequestJSON {
}

export type GetHottestNFTCollectionsByTradingVolumeOperationResponse = EvmMarketDataHottestNFTCollectionByTradingVolumeItem[];
export type GetHottestNFTCollectionsByTradingVolumeOperationResponseJSON = EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON[];

export const GetHottestNFTCollectionsByTradingVolumeOperation = {
  operationId: "getHottestNFTCollectionsByTradingVolume",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/nfts/hottest-collections",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON[]): EvmMarketDataHottestNFTCollectionByTradingVolumeItem[] {
    return json.map((item) => EvmMarketDataHottestNFTCollectionByTradingVolumeItem.fromJSON(item));
  },

  serializeRequest(request: GetHottestNFTCollectionsByTradingVolumeOperationRequest): GetHottestNFTCollectionsByTradingVolumeOperationRequestJSON {
    return {
    };
  },

}
