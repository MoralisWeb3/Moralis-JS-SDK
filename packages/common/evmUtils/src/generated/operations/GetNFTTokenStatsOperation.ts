import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmNftTokenStat, EvmNftTokenStatJSON } from '../types/EvmNftTokenStat';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1nft~1{address}~1{token_id}~1stats/get/parameters/1/schema)
// - token_id ($ref: #/paths/~1nft~1{address}~1{token_id}~1stats/get/parameters/2/schema)

export interface GetNFTTokenStatsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The address of the NFT collection
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description The token id of the NFT collection
   */
  readonly tokenId: string;
}

export interface GetNFTTokenStatsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
  readonly token_id: string;
}

export type GetNFTTokenStatsOperationResponse = EvmNftTokenStat;
export type GetNFTTokenStatsOperationResponseJSON = EvmNftTokenStatJSON;

export const GetNFTTokenStatsOperation = {
  operationId: "getNFTTokenStats",
  groupName: "nft",
  httpMethod: "get",
  routePattern: "/nft/{address}/{token_id}/stats",
  parameterNames: ["chain","address","token_id"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmNftTokenStatJSON): EvmNftTokenStat {
    return EvmNftTokenStat.fromJSON(json);
  },

  serializeRequest(request: GetNFTTokenStatsOperationRequest): GetNFTTokenStatsOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    const tokenId = request.tokenId;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
      token_id: tokenId,
    };
  },

}
