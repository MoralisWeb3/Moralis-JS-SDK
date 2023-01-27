import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftOwnerCollection, AptNftOwnerCollectionJSON, AptNftOwnerCollectionInput } from '../types/AptNftOwnerCollection';

export interface AptGetNFTTokenIdOwnersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly token_id: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

export interface AptGetNFTTokenIdOwnersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly tokenId: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

/**
 * @description Get owners of a specific NFT given the contract address and token ID. 
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const AptGetNFTTokenIdOwnersOperation = {
  operationId: "getNFTTokenIdOwners",
  httpMethod: "get",
  routePattern: "/nft/{address}/{token_id}/owners",
  parameterNames: ["chain","address","token_id","format","limit","disable_total","cursor","normalizeMetadata"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftOwnerCollectionJSON): AptNftOwnerCollection {
    return AptNftOwnerCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTTokenIdOwnersOperationRequest): AptGetNFTTokenIdOwnersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const tokenId = request.tokenId;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    const normalizeMetadata = request.normalizeMetadata;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      token_id: tokenId,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
      normalizeMetadata: normalizeMetadata,
    };
  },

}
