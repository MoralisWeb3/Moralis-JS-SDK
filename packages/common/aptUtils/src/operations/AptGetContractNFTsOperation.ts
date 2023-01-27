import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftCollection, AptNftCollectionJSON, AptNftCollectionInput } from '../types/AptNftCollection';

export interface AptGetContractNFTsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly totalRanges?: number;
  readonly range?: number;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

export interface AptGetContractNFTsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly totalRanges?: number;
  readonly range?: number;
  readonly cursor?: string;
  readonly normalizeMetadata?: boolean;
}

/**
 * @description Get NFTs for a given contract address, including metadata for all NFTs (where available).
 * * Results are limited to 100 per page by default
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
export const AptGetContractNFTsOperation = {
  operationId: "getContractNFTs",
  httpMethod: "get",
  routePattern: "/nft/{address}",
  parameterNames: ["chain","address","format","limit","disable_total","totalRanges","range","cursor","normalizeMetadata"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftCollectionJSON): AptNftCollection {
    return AptNftCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetContractNFTsOperationRequest): AptGetContractNFTsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const totalRanges = request.totalRanges;
    const range = request.range;
    const cursor = request.cursor;
    const normalizeMetadata = request.normalizeMetadata;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      totalRanges: totalRanges,
      range: range,
      cursor: cursor,
      normalizeMetadata: normalizeMetadata,
    };
  },

}
