import { EvmChain, EvmChainInput, EvmChainJSON, EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmOrderList, EvmOrderListValue, EvmOrderListInput, EvmOrderListJSON } from '../types/EvmOrderList';
import { EvmWalletHistory, EvmWalletHistoryJSON } from '../types/EvmWalletHistory';

// request parameters:
// - chain ($ref: #/components/schemas/chainList)
// - from_block ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/1/schema)
// - to_block ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/2/schema)
// - from_date ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/3/schema)
// - to_date ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/4/schema)
// - address ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/5/schema)
// - include_internal_transactions ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/6/schema)
// - include_input_data ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/7/schema)
// - include_logs_data ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/8/schema)
// - nft_metadata ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/9/schema)
// - cursor ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/10/schema)
// - order ($ref: #/components/schemas/orderList)
// - limit ($ref: #/paths/~1wallets~1{address}~1history/get/parameters/12/schema)

export interface GetWalletHistoryOperationRequest {
  /**
   * @description The chain to query
   */
  readonly chain?: EvmChainInput | EvmChain;
  /**
   * @description The minimum block number from which to get the transactions
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   */
  readonly fromBlock?: number;
  /**
   * @description The maximum block number from which to get the transactions.
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   */
  readonly toBlock?: number;
  /**
   * @description The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)
   * * Provide the param 'from_block' or 'from_date'
   * * If 'from_date' and 'from_block' are provided, 'from_block' will be used.
   */
  readonly fromDate?: string;
  /**
   * @description Get the transactions up to this date (format in seconds or datestring accepted by momentjs)
   * * Provide the param 'to_block' or 'to_date'
   * * If 'to_date' and 'to_block' are provided, 'to_block' will be used.
   */
  readonly toDate?: Date;
  /**
   * @description The address of the wallet
   */
  readonly address: EvmAddressInput | EvmAddress;
  /**
   * @description If the result should contain the internal transactions.
   */
  readonly includeInternalTransactions?: boolean;
  /**
   * @description Set the input data from the result
   */
  readonly includeInputData?: boolean;
  /**
   * @description Set the logs data from the result
   */
  readonly includeLogsData?: boolean;
  /**
   * @description If the result should contain the nft metadata.
   */
  readonly nftMetadata?: boolean;
  /**
   * @description The cursor returned in the previous response (used for getting the next page).
   */
  readonly cursor?: string;
  /**
   * @description The order of the result, in ascending (ASC) or descending (DESC)
   */
  readonly order?: EvmOrderListInput | EvmOrderListValue;
  /**
   * @description The desired page size of the result.
   */
  readonly limit?: number;
}

export interface GetWalletHistoryOperationRequestJSON {
  readonly chain?: EvmChainJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: EvmAddressJSON;
  readonly include_internal_transactions?: boolean;
  readonly include_input_data?: boolean;
  readonly include_logs_data?: boolean;
  readonly nft_metadata?: boolean;
  readonly cursor?: string;
  readonly order?: EvmOrderListJSON;
  readonly limit?: number;
}

export type GetWalletHistoryOperationResponse = EvmWalletHistory;
export type GetWalletHistoryOperationResponseJSON = EvmWalletHistoryJSON;

export const GetWalletHistoryOperation = {
  operationId: "getWalletHistory",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/{address}/history",
  parameterNames: ["chain","from_block","to_block","from_date","to_date","address","include_internal_transactions","include_input_data","include_logs_data","nft_metadata","cursor","order","limit"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWalletHistoryJSON): EvmWalletHistory {
    return EvmWalletHistory.fromJSON(json);
  },

  serializeRequest(request: GetWalletHistoryOperationRequest): GetWalletHistoryOperationRequestJSON {
    const chain = request.chain ? EvmChain.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = EvmAddress.create(request.address);
    const includeInternalTransactions = request.includeInternalTransactions;
    const includeInputData = request.includeInputData;
    const includeLogsData = request.includeLogsData;
    const nftMetadata = request.nftMetadata;
    const cursor = request.cursor;
    const order = request.order ? EvmOrderList.create(request.order) : undefined;
    const limit = request.limit;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate !== undefined ? toDate.toISOString() : undefined,
      address: address.toJSON(),
      include_internal_transactions: includeInternalTransactions,
      include_input_data: includeInputData,
      include_logs_data: includeLogsData,
      nft_metadata: nftMetadata,
      cursor: cursor,
      order: order ? order : undefined,
      limit: limit,
    };
  },

}
