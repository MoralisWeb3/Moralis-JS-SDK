import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmErc20TokenStat, EvmErc20TokenStatJSON } from '../types/EvmErc20TokenStat';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1erc20~1{address}~1stats/get/parameters/1/schema)

export interface GetTokenStatsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The address of the erc20 token
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetTokenStatsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
}

export type GetTokenStatsOperationResponse = EvmErc20TokenStat;
export type GetTokenStatsOperationResponseJSON = EvmErc20TokenStatJSON;

export const GetTokenStatsOperation = {
  operationId: "getTokenStats",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/erc20/{address}/stats",
  parameterNames: ["chain","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmErc20TokenStatJSON): EvmErc20TokenStat {
    return EvmErc20TokenStat.fromJSON(json);
  },

  serializeRequest(request: GetTokenStatsOperationRequest): GetTokenStatsOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
    };
  },

}
