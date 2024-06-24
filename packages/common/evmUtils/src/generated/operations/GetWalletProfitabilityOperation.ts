import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmWalletProfitabilityResponse, EvmWalletProfitabilityResponseJSON } from '../types/EvmWalletProfitabilityResponse';

// request parameters:
// - address ($ref: #/paths/~1wallets~1{address}~1profitability/get/parameters/0/schema)
// - days ($ref: #/paths/~1wallets~1{address}~1profitability/get/parameters/1/schema)
// - chain ($ref: #/components/schemas/discoveryApiChainsList)
// - token_addresses ($ref: #/paths/~1wallets~1{address}~1profitability/get/parameters/3/schema)

export interface GetWalletProfitabilityOperationRequest {
  /**
   * @description The wallet address for which profitability is to be retrieved.
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description Timeframe in days for which profitability is calculated, Options include 'all', '7', '30', '60', '90' default is 'all'.
   */
  readonly days?: string;
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The token addresses list to filter the result with
   */
  readonly tokenAddresses?: EvmAddressInput[] | EvmAddress[];
}

export interface GetWalletProfitabilityOperationRequestJSON {
  readonly address: EvmAddressJSON;
  readonly days?: string;
  readonly chain?: EvmChainJSON;
  readonly token_addresses?: EvmAddressJSON[];
}

export type GetWalletProfitabilityOperationResponse = EvmWalletProfitabilityResponse;
export type GetWalletProfitabilityOperationResponseJSON = EvmWalletProfitabilityResponseJSON;

export const GetWalletProfitabilityOperation = {
  operationId: "getWalletProfitability",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/profitability",
  parameterNames: ["address","days","chain","token_addresses"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletProfitabilityResponseJSON): EvmWalletProfitabilityResponse {
    return EvmWalletProfitabilityResponse.fromJSON(json);
  },

  serializeRequest(request: GetWalletProfitabilityOperationRequest): GetWalletProfitabilityOperationRequestJSON {
    const address = EvmAddress.create(request.address);
    const days = request.days;
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const tokenAddresses = request.tokenAddresses ? request.tokenAddresses.map((item) => EvmAddress.create(item)) : undefined;
    return {
      address: address.toJSON(),
      days: days,
      chain: chain ? chain.toJSON() : undefined,
      token_addresses: tokenAddresses ? tokenAddresses.map((item) => item.toJSON()) : undefined,
    };
  },

}
