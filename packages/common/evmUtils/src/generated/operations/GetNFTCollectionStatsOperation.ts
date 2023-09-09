import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmNftCollectionStat, EvmNftCollectionStatJSON } from '../types/EvmNftCollectionStat';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - address ($ref: #/paths/~1nft~1{address}~1stats/get/parameters/1/schema)

export interface GetNFTCollectionStatsOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The address of the NFT collection
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetNFTCollectionStatsOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly address: EvmAddressJSON;
}

export type GetNFTCollectionStatsOperationResponse = EvmNftCollectionStat;
export type GetNFTCollectionStatsOperationResponseJSON = EvmNftCollectionStatJSON;

export const GetNFTCollectionStatsOperation = {
  operationId: "getNFTCollectionStats",
  groupName: "nft",
  httpMethod: "get",
  routePattern: "/nft/{address}/stats",
  parameterNames: ["chain","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmNftCollectionStatJSON): EvmNftCollectionStat {
    return EvmNftCollectionStat.fromJSON(json);
  },

  serializeRequest(request: GetNFTCollectionStatsOperationRequest): GetNFTCollectionStatsOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const address = EvmAddress.create(request.address);
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address.toJSON(),
    };
  },

}
