import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftTransferCollection, AptNftTransferCollectionJSON, AptNftTransferCollectionInput } from '../types/AptNftTransferCollection';

export interface AptGetNFTTransfersFromToBlockOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetNFTTransfersFromToBlockOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get transfers of NFTs from a block number to a block number.
 */
export const AptGetNFTTransfersFromToBlockOperation = {
  operationId: "getNFTTransfersFromToBlock",
  httpMethod: "get",
  routePattern: "/nft/transfers",
  parameterNames: ["chain","from_block","to_block","from_date","to_date","format","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    return AptNftTransferCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTTransfersFromToBlockOperationRequest): AptGetNFTTransfersFromToBlockOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const format = request.format;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}
