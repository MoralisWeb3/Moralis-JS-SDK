import { EvmMarketDataERC20TokenItem, EvmMarketDataERC20TokenItemJSON } from '../types/EvmMarketDataERC20TokenItem';

// request parameters:

export interface GetTopERC20TokensByMarketCapOperationRequest {
}

export interface GetTopERC20TokensByMarketCapOperationRequestJSON {
}

export type GetTopERC20TokensByMarketCapOperationResponse = EvmMarketDataERC20TokenItem[];
export type GetTopERC20TokensByMarketCapOperationResponseJSON = EvmMarketDataERC20TokenItemJSON[];

export const GetTopERC20TokensByMarketCapOperation = {
  operationId: "getTopERC20TokensByMarketCap",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/erc20s/top-tokens",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataERC20TokenItemJSON[]): EvmMarketDataERC20TokenItem[] {
    return json.map((item) => EvmMarketDataERC20TokenItem.fromJSON(item));
  },

  serializeRequest(request: GetTopERC20TokensByMarketCapOperationRequest): GetTopERC20TokensByMarketCapOperationRequestJSON {
    return {
    };
  },

}
