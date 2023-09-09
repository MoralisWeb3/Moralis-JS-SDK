import { EvmChain, EvmChainInput, EvmChainJSON } from '../../dataTypes';
import { EvmBlockTokenStat, EvmBlockTokenStatJSON } from '../types/EvmBlockTokenStat';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - block_number_or_hash ($ref: #/paths/~1block~1{block_number_or_hash}~1stats/get/parameters/1/schema)

export interface GetBlockStatsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The block number or hash
   */
  readonly blockNumberOrHash: string;
}

export interface GetBlockStatsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly block_number_or_hash: string;
}

export type GetBlockStatsOperationResponse = EvmBlockTokenStat;
export type GetBlockStatsOperationResponseJSON = EvmBlockTokenStatJSON;

export const GetBlockStatsOperation = {
  operationId: "getBlockStats",
  groupName: "block",
  httpMethod: "get",
  routePattern: "/block/{block_number_or_hash}/stats",
  parameterNames: ["chain","block_number_or_hash"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmBlockTokenStatJSON): EvmBlockTokenStat {
    return EvmBlockTokenStat.fromJSON(json);
  },

  serializeRequest(request: GetBlockStatsOperationRequest): GetBlockStatsOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const blockNumberOrHash = request.blockNumberOrHash;
    return {
      chain: chain ? chain.toJSON() : undefined,
      block_number_or_hash: blockNumberOrHash,
    };
  },

}
