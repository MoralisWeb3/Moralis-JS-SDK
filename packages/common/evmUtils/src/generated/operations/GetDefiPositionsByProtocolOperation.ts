import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmDefiProtocolList, EvmDefiProtocolListValue, EvmDefiProtocolListInput, EvmDefiProtocolListJSON } from '../types/EvmDefiProtocolList';
import { EvmGetDefiPositionsByProtocol, EvmGetDefiPositionsByProtocolJSON } from '../types/EvmGetDefiPositionsByProtocol';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/parameters/1/schema)
// - protocol ($ref: #/components/schemas/defiProtocolList)

export interface GetDefiPositionsByProtocolOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description Wallet address
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description The protocol to query
   */
  readonly protocol: EvmDefiProtocolListInput | EvmDefiProtocolListValue;
}

export interface GetDefiPositionsByProtocolOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
  readonly protocol: EvmDefiProtocolListJSON;
}

export type GetDefiPositionsByProtocolOperationResponse = EvmGetDefiPositionsByProtocol;
export type GetDefiPositionsByProtocolOperationResponseJSON = EvmGetDefiPositionsByProtocolJSON;

export const GetDefiPositionsByProtocolOperation = {
  operationId: "getDefiPositionsByProtocol",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/defi/{protocol}/positions",
  parameterNames: ["chain","address","protocol"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmGetDefiPositionsByProtocolJSON): EvmGetDefiPositionsByProtocol {
    return EvmGetDefiPositionsByProtocol.fromJSON(json);
  },

  serializeRequest(request: GetDefiPositionsByProtocolOperationRequest): GetDefiPositionsByProtocolOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    const protocol = EvmDefiProtocolList.create(request.protocol);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
      protocol: protocol,
    };
  },

}
