import { EvmMarketDataERC20TokensByPriceMovers, EvmMarketDataERC20TokensByPriceMoversJSON } from '../types/EvmMarketDataERC20TokensByPriceMovers';

// request parameters:

export interface GetTopERC20TokensByPriceMoversOperationRequest {
}

export interface GetTopERC20TokensByPriceMoversOperationRequestJSON {
}

export type GetTopERC20TokensByPriceMoversOperationResponse = EvmMarketDataERC20TokensByPriceMovers;
export type GetTopERC20TokensByPriceMoversOperationResponseJSON = EvmMarketDataERC20TokensByPriceMoversJSON;

export const GetTopERC20TokensByPriceMoversOperation = {
  operationId: "getTopERC20TokensByPriceMovers",
  groupName: "marketData",
  httpMethod: "get",
  routePattern: "/market-data/erc20s/top-movers",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmMarketDataERC20TokensByPriceMoversJSON): EvmMarketDataERC20TokensByPriceMovers {
    return EvmMarketDataERC20TokensByPriceMovers.fromJSON(json);
  },

  serializeRequest(request: GetTopERC20TokensByPriceMoversOperationRequest): GetTopERC20TokensByPriceMoversOperationRequestJSON {
    return {
    };
  },

}
