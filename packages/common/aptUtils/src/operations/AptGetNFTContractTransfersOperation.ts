import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptNftTransferCollection, AptNftTransferCollectionJSON, AptNftTransferCollectionInput } from '../types/AptNftTransferCollection';

export interface AptGetNFTContractTransfersOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetNFTContractTransfersOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly address: string;
  readonly format?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get transfers of NFTs for a given contract and other parameters.
 */
export const AptGetNFTContractTransfersOperation = {
  operationId: "getNFTContractTransfers",
  httpMethod: "get",
  routePattern: "/nft/{address}/transfers",
  parameterNames: ["chain","from_block","to_block","from_date","to_date","address","format","limit","disable_total","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    return AptNftTransferCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTContractTransfersOperationRequest): AptGetNFTContractTransfersOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = request.address;
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
      address: address,
      format: format,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },

}
