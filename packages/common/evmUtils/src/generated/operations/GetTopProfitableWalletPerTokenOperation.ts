import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmWalletTopProfitableWalletPerTokenResponse, EvmWalletTopProfitableWalletPerTokenResponseJSON } from '../types/EvmWalletTopProfitableWalletPerTokenResponse';

// request parameters:
// - address ($ref: #/paths/~1erc20~1{address}~1top-gainers/get/parameters/0/schema)
// - days ($ref: #/paths/~1erc20~1{address}~1top-gainers/get/parameters/1/schema)
// - chain ($ref: #/components/schemas/discoveryApiChainsList)

export interface GetTopProfitableWalletPerTokenOperationRequest {
  /**
   * @description The ERC20 token address.
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description Timeframe in days for which profitability is calculated, can be 'all', '7d' or '30d'
   */
  readonly days?: string;
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
}

export interface GetTopProfitableWalletPerTokenOperationRequestJSON {
  readonly address: EvmAddressJSON;
  readonly days?: string;
  readonly chain?: EvmChainJSON;
}

export type GetTopProfitableWalletPerTokenOperationResponse = EvmWalletTopProfitableWalletPerTokenResponse;
export type GetTopProfitableWalletPerTokenOperationResponseJSON = EvmWalletTopProfitableWalletPerTokenResponseJSON;

export const GetTopProfitableWalletPerTokenOperation = {
  operationId: "getTopProfitableWalletPerToken",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/erc20/{address}/top-gainers",
  parameterNames: ["address","days","chain"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletTopProfitableWalletPerTokenResponseJSON): EvmWalletTopProfitableWalletPerTokenResponse {
    return EvmWalletTopProfitableWalletPerTokenResponse.fromJSON(json);
  },

  serializeRequest(request: GetTopProfitableWalletPerTokenOperationRequest): GetTopProfitableWalletPerTokenOperationRequestJSON {
    const address = EvmAddress.create(request.address);
    const days = request.days;
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    return {
      address: address.toJSON(),
      days: days,
      chain: chain ? chain.toJSON() : undefined,
    };
  },

}
