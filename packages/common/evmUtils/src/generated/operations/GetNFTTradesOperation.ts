import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmTradeCollection, EvmTradeCollectionJSON } from '../types/EvmTradeCollection';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - from_block ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/1/schema)
// - to_block ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/2/schema)
// - from_date ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/3/schema)
// - to_date ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/4/schema)
// - marketplace ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/5/schema)
// - cursor ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/6/schema)
// - limit ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/7/schema)
// - disable_total ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/8/schema)
// - address ($ref: #/paths/~1nft~1{address}~1trades/get/parameters/9/schema)

export interface GetNFTTradesOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The minimum block number from which to get the transfers
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   */
  readonly fromBlock?: number;
  /**
   * @description The block number to get the trades from
   */
  readonly toBlock?: string;
  /**
   * @description The start date from which to get the transfers (any format that is accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   */
  readonly fromDate?: string;
  /**
   * @description The end date from which to get the transfers (any format that is accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   */
  readonly toDate?: string;
  /**
   * @description Marketplace from which to get the trades (only OpenSea is supported at the moment)
   */
  readonly marketplace?: string;
  /**
   * @description The cursor returned in the previous response (used for getting the next page).
   */
  readonly cursor?: string;
  /**
   * @description The desired page size of the result.
   */
  readonly limit?: number;
  /**
   * @description If the result should skip returning the total count (Improves performance).
   */
  readonly disableTotal?: boolean;
  /**
   * @description The address of the NFT contract
   */
  readonly address: EvmAddressInput | EvmAddress;
}

export interface GetNFTTradesOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly from_block?: number;
  readonly to_block?: string;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly marketplace?: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
  readonly address: EvmAddressJSON;
}

export type GetNFTTradesOperationResponse = EvmTradeCollection;
export type GetNFTTradesOperationResponseJSON = EvmTradeCollectionJSON;

export const GetNFTTradesOperation = {
  operationId: "getNFTTrades",
  groupName: "nft",
  httpMethod: "get",
  routePattern: "/nft/{address}/trades",
  parameterNames: ["chain","from_block","to_block","from_date","to_date","marketplace","cursor","limit","disable_total","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmTradeCollectionJSON): EvmTradeCollection {
    return EvmTradeCollection.fromJSON(json);
  },

  serializeRequest(request: GetNFTTradesOperationRequest): GetNFTTradesOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const marketplace = request.marketplace;
    const cursor = request.cursor;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    const address = EvmAddress.create(request.address);
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
      address: address.toJSON(),
    };
  },

}
