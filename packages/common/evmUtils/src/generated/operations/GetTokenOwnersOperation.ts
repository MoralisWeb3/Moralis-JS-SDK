import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmOrderList, EvmOrderListValue, EvmOrderListInput, EvmOrderListJSON } from '../types/EvmOrderList';
import { EvmErc20TokenOwnerCollection, EvmErc20TokenOwnerCollectionJSON } from '../types/EvmErc20TokenOwnerCollection';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - token_address ($ref: #/paths/~1erc20~1{token_address}~1owners/get/parameters/1/schema)
// - limit ($ref: #/paths/~1erc20~1{token_address}~1owners/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1erc20~1{token_address}~1owners/get/parameters/3/schema)
// - order ($ref: #/components/schemas/orderList)

export interface GetTokenOwnersOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The address of the token contract
   */
  readonly tokenAddress: string;
  /**
   * @description The desired page size of the result.
   */
  readonly limit?: number;
  /**
   * @description The cursor returned in the previous response (used for getting the next page).
   */
  readonly cursor?: string;
  /**
   * @description The order of the result, in ascending (ASC) or descending (DESC)
   */
  readonly order?: EvmOrderListInput | EvmOrderListValue;
}

export interface GetTokenOwnersOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly token_address: string;
  readonly limit?: number;
  readonly cursor?: string;
  readonly order?: EvmOrderListJSON;
}

export type GetTokenOwnersOperationResponse = EvmErc20TokenOwnerCollection;
export type GetTokenOwnersOperationResponseJSON = EvmErc20TokenOwnerCollectionJSON;

export const GetTokenOwnersOperation = {
  operationId: "getTokenOwners",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/erc20/{token_address}/owners",
  parameterNames: ["chain","token_address","limit","cursor","order"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmErc20TokenOwnerCollectionJSON): EvmErc20TokenOwnerCollection {
    return EvmErc20TokenOwnerCollection.fromJSON(json);
  },

  serializeRequest(request: GetTokenOwnersOperationRequest): GetTokenOwnersOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const tokenAddress = request.tokenAddress;
    const limit = request.limit;
    const cursor = request.cursor;
    const order = request.order ? EvmOrderList.create(request.order) : undefined;
    return {
      chain: chain ? chain.toJSON() : undefined,
      token_address: tokenAddress,
      limit: limit,
      cursor: cursor,
      order: order ? order : undefined,
    };
  },

}
