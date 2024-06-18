import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmDefiPositionSummaryResponse, EvmDefiPositionSummaryResponseJSON } from '../types/EvmDefiPositionSummaryResponse';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1defi~1positions/get/parameters/1/schema)

export interface GetDefiPositionsSummaryOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description Wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetDefiPositionsSummaryOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
}

export type GetDefiPositionsSummaryOperationResponse = EvmDefiPositionSummaryResponse[];
export type GetDefiPositionsSummaryOperationResponseJSON = EvmDefiPositionSummaryResponseJSON[];

export const GetDefiPositionsSummaryOperation = {
  operationId: "getDefiPositionsSummary",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/defi/positions",
  parameterNames: ["chain","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmDefiPositionSummaryResponseJSON[]): EvmDefiPositionSummaryResponse[] {
    return json.map((item) => EvmDefiPositionSummaryResponse.fromJSON(item));
  },

  serializeRequest(request: GetDefiPositionsSummaryOperationRequest): GetDefiPositionsSummaryOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
    };
  },

}
