import { EvmMarketDataTopCryptoCurrenciesByMarketCapItem, EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON } from '../types/EvmMarketDataTopCryptoCurrenciesByMarketCapItem';

// request parameters:

export interface GetTopCryptoCurrenciesByMarketCapOperationRequest {
}

export interface GetTopCryptoCurrenciesByMarketCapOperationRequestJSON {
}

export type GetTopCryptoCurrenciesByMarketCapOperationResponse = EvmMarketDataTopCryptoCurrenciesByMarketCapItem[];
export type GetTopCryptoCurrenciesByMarketCapOperationResponseJSON = EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[];

export const GetTopCryptoCurrenciesByMarketCapOperation = {
  operationId: "getTopCryptoCurrenciesByMarketCap",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/global/market-cap",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[]): EvmMarketDataTopCryptoCurrenciesByMarketCapItem[] {
    return json.map((item) => EvmMarketDataTopCryptoCurrenciesByMarketCapItem.fromJSON(item));
  },

  serializeRequest(request: GetTopCryptoCurrenciesByMarketCapOperationRequest): GetTopCryptoCurrenciesByMarketCapOperationRequestJSON {
    return {
    };
  },

}
