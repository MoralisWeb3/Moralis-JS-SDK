import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmWalletDefiSummary, EvmWalletDefiSummaryJSON } from '../types/EvmWalletDefiSummary';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1defi~1summary/get/parameters/1/schema)

export interface GetDefiSummaryOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description Wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetDefiSummaryOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
}

export type GetDefiSummaryOperationResponse = EvmWalletDefiSummary;
export type GetDefiSummaryOperationResponseJSON = EvmWalletDefiSummaryJSON;

export const GetDefiSummaryOperation = {
  operationId: "getDefiSummary",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/defi/summary",
  parameterNames: ["chain","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletDefiSummaryJSON): EvmWalletDefiSummary {
    return EvmWalletDefiSummary.fromJSON(json);
  },

  serializeRequest(request: GetDefiSummaryOperationRequest): GetDefiSummaryOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
    };
  },

}
