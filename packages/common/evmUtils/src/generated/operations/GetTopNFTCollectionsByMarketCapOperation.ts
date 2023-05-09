import { EvmMarketDataTopNFTCollectionByMarketCapItem, EvmMarketDataTopNFTCollectionByMarketCapItemJSON } from '../types/EvmMarketDataTopNFTCollectionByMarketCapItem';

// request parameters:

export interface GetTopNFTCollectionsByMarketCapOperationRequest {
}

export interface GetTopNFTCollectionsByMarketCapOperationRequestJSON {
}

export type GetTopNFTCollectionsByMarketCapOperationResponse = EvmMarketDataTopNFTCollectionByMarketCapItem[];
export type GetTopNFTCollectionsByMarketCapOperationResponseJSON = EvmMarketDataTopNFTCollectionByMarketCapItemJSON[];

export const GetTopNFTCollectionsByMarketCapOperation = {
  operationId: "getTopNFTCollectionsByMarketCap",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/nfts/top-collections",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataTopNFTCollectionByMarketCapItemJSON[]): EvmMarketDataTopNFTCollectionByMarketCapItem[] {
    return json.map((item) => EvmMarketDataTopNFTCollectionByMarketCapItem.fromJSON(item));
  },

  serializeRequest(request: GetTopNFTCollectionsByMarketCapOperationRequest): GetTopNFTCollectionsByMarketCapOperationRequestJSON {
    return {
    };
  },

}
