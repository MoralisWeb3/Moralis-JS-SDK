import { EvmMarketDataTopCryptoCurrenciesByMarketCapItem, EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON } from '../types/EvmMarketDataTopCryptoCurrenciesByMarketCapItem';

// request parameters:

export interface GetTopCryptoCurrenciesByTradingVolumeOperationRequest {
}

export interface GetTopCryptoCurrenciesByTradingVolumeOperationRequestJSON {
}

export type GetTopCryptoCurrenciesByTradingVolumeOperationResponse = EvmMarketDataTopCryptoCurrenciesByMarketCapItem[];
export type GetTopCryptoCurrenciesByTradingVolumeOperationResponseJSON = EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[];

export const GetTopCryptoCurrenciesByTradingVolumeOperation = {
  operationId: "getTopCryptoCurrenciesByTradingVolume",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/global/volume",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[]): EvmMarketDataTopCryptoCurrenciesByMarketCapItem[] {
    return json.map((item) => EvmMarketDataTopCryptoCurrenciesByMarketCapItem.fromJSON(item));
  },

  serializeRequest(request: GetTopCryptoCurrenciesByTradingVolumeOperationRequest): GetTopCryptoCurrenciesByTradingVolumeOperationRequestJSON {
    return {
    };
  },

}
