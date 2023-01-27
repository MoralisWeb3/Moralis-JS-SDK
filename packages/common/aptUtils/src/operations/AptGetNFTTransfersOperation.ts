import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftTransferCollection, AptNftTransferCollectionJSON, AptNftTransferCollectionInput } from '../types/AptNftTransferCollection';

export interface AptGetNFTTransfersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly address: string;
  readonly token_id: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetNFTTransfersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly address: string;
  readonly tokenId: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get transfers of an NFT given a contract address and token ID.
 */
export const AptGetNFTTransfersOperation = {
  operationId: "getNFTTransfers",
  httpMethod: "get",
  routePattern: "/nft/{address}/{token_id}/transfers",
  parameterNames: ["chain","address","token_id","format","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    return AptNftTransferCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTTransfersOperationRequest): AptGetNFTTransfersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const address = request.address;
    const tokenId = request.tokenId;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      address: address,
      token_id: tokenId,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}
