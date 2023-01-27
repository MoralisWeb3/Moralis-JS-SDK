import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftOwnerCollection, AptNftOwnerCollectionJSON, AptNftOwnerCollectionInput } from '../types/AptNftOwnerCollection';

export interface AptGetNFTOwnersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

export interface AptGetNFTOwnersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

/**
 * @description Get owners of NFTs for a given contract.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
export const AptGetNFTOwnersOperation = {
  operationId: "getNFTOwners",
  httpMethod: "get",
  routePattern: "/nft/{address}/owners",
  parameterNames: ["chain","address","format","limit","disable_total","cursor","normalizeMetadata"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftOwnerCollectionJSON): AptNftOwnerCollection {
    return AptNftOwnerCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTOwnersOperationRequest): AptGetNFTOwnersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    const normalizeMetadata = request.normalizeMetadata;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
      normalizeMetadata: normalizeMetadata,
    };
  },

}
