import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptTransactionCollection,
  AptTransactionCollectionJSON,
  AptTransactionCollectionInput,
} from '../types/AptTransactionCollection';

export interface AptGetWalletTransactionsOperationRequestJSON {
  readonly chain?: AptChainListJSON;
  readonly from_block?: number;
  readonly to_block?: number;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly address: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly disable_total?: boolean;
}

export interface AptGetWalletTransactionsOperationRequest {
  readonly chain?: AptChainListInput;
  readonly fromBlock?: number;
  readonly toBlock?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly address: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly disableTotal?: boolean;
}

/**
 * @description Get native transactions ordered by block number in descending order.
 */
export const AptGetWalletTransactionsOperation = {
  operationId: 'getWalletTransactions',
  httpMethod: 'get',
  routePattern: '/{address}',
  parameterNames: [
    'chain',
    'from_block',
    'to_block',
    'from_date',
    'to_date',
    'address',
    'cursor',
    'limit',
    'disable_total',
  ],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptTransactionCollectionJSON): AptTransactionCollection {
    return AptTransactionCollection.fromJSON(json);
  },

  serializeRequest(request: AptGetWalletTransactionsOperationRequest): AptGetWalletTransactionsOperationRequestJSON {
    const chain = request.chain ? AptChainList.create(request.chain) : undefined;
    const fromBlock = request.fromBlock;
    const toBlock = request.toBlock;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const address = request.address;
    const cursor = request.cursor;
    const limit = request.limit;
    const disableTotal = request.disableTotal;
    return {
      chain: chain ? chain.toJSON() : undefined,
      from_block: fromBlock,
      to_block: toBlock,
      from_date: fromDate,
      to_date: toDate,
      address: address,
      cursor: cursor,
      limit: limit,
      disable_total: disableTotal,
    };
  },
};
