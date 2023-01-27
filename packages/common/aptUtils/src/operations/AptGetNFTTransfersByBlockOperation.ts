import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptNftTransferCollection,
  AptNftTransferCollectionJSON,
  AptNftTransferCollectionInput,
} from '../types/AptNftTransferCollection';

export interface AptGetNFTTransfersByBlockOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly block_number_or_hash: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly cursor?: string;
}

export interface AptGetNFTTransfersByBlockOperationRequest {
  readonly chain?: AptChainListInput;
  readonly blockNumberOrHash: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly cursor?: string;
}

/**
 * @description Get transfers of NFTs given a block number or block hash.
 */
export const AptGetNFTTransfersByBlockOperation = {
  operationId: 'getNFTTransfersByBlock',
  httpMethod: 'get',
  routePattern: '/block/{block_number_or_hash}/nft/transfers',
  parameterNames: ['chain', 'block_number_or_hash', 'limit', 'disable_total', 'cursor'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftTransferCollectionJSON): AptNftTransferCollection {
    return AptNftTransferCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTTransfersByBlockOperationRequest): AptGetNFTTransfersByBlockOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const blockNumberOrHash = request.blockNumberOrHash;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const cursor = request.cursor;
    return {
      chain: chain ? chain.toJSON() : undefined,
      block_number_or_hash: blockNumberOrHash,
      limit: limit,
      disable_total: disableTotal,
      cursor: cursor,
    };
  },
};
