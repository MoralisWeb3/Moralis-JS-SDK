import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import { AptTradeCollection, AptTradeCollectionJSON, AptTradeCollectionInput } from '../types/AptTradeCollection';

export interface AptGetNFTTradesOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: string;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly marketplace?: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly address: string;
}

export interface AptGetNFTTradesOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly marketplace?: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
  readonly address: string;
}

/**
 * @description Get trades of NFTs for a given contract and marketplace.
 */
export const AptGetNFTTradesOperation = {
  operationId: 'getNFTTrades',
  httpMethod: 'get',
  routePattern: '/nft/{address}/trades',
  parameterNames: [
    'chain',
    'from_block',
    'to_block',
    'from_date',
    'to_date',
    'marketplace',
    'cursor',
    'limit',
    'disable_total',
    'address',
  ],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptTradeCollectionJSON): AptTradeCollection {
    return AptTradeCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetNFTTradesOperationRequest): AptGetNFTTradesOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const marketplace = request.marketplace;
    const cursor = request.cursor;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const address = request.address;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      marketplace: marketplace,
      cursor: cursor,
      limit: limit,
      disable_total: disableTotal,
      address: address,
    };
  },
};
