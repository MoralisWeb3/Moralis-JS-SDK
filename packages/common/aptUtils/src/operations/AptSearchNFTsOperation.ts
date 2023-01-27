import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptNftMetadataCollection,
  AptNftMetadataCollectionJSON,
  AptNftMetadataCollectionInput,
} from '../types/AptNftMetadataCollection';

export interface AptSearchNFTsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly format?: string;
  readonly q: string;
  readonly filter?: string;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly addresses?: string[];
  readonly cursor?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
}

export interface AptSearchNFTsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly format?: string;
  readonly q: string;
  readonly filter?: string;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly addresses?: string[];
  readonly cursor?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
}

/**
 * @description Get NFTs that match a given metadata search query.
 */
export const AptSearchNFTsOperation = {
  operationId: 'searchNFTs',
  httpMethod: 'get',
  routePattern: '/nft/search',
  parameterNames: [
    'chain',
    'format',
    'q',
    'filter',
    'from_block',
    'to_block',
    'from_date',
    'to_date',
    'addresses',
    'cursor',
    'limit',
    'disable_total',
  ],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptNftMetadataCollectionJSON): AptNftMetadataCollection {
    return AptNftMetadataCollection.fromJSON(json);
  },

  serializeRequest(request: AptSearchNFTsOperationRequest): AptSearchNFTsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const format = request.format;
    const q = request.q;
    const filter = request.filter;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const addresses = request.addresses;
    const cursor = request.cursor;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    return {
      chain: chain ? chain.toJSON() : undefined,
      format: format,
      q: q,
      filter: filter,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      addresses: addresses,
      cursor: cursor,
      limit: limit,
      disable_total: disableTotal,
    };
  },
};
