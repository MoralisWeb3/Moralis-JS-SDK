import { AptChainList, AptChainListJSON, AptChainListInput } from '../types/AptChainList';
import {
  AptTransactionCollectionVerbose,
  AptTransactionCollectionVerboseJSON,
  AptTransactionCollectionVerboseInput,
} from '../types/AptTransactionCollectionVerbose';

export interface AptGetWalletTransactionsVerboseOperationRequestJSON {
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

export interface AptGetWalletTransactionsVerboseOperationRequest {
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
 * @description Get native transactions and logs ordered by block number in descending order.
 */
export const AptGetWalletTransactionsVerboseOperation = {
  operationId: 'getWalletTransactionsVerbose',
  httpMethod: 'get',
  routePattern: '/{address}/verbose',
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

  parseResponse(json: AptTransactionCollectionVerboseJSON): AptTransactionCollectionVerbose {
    return AptTransactionCollectionVerbose.fromJSON(json);
  },

  serializeRequest(
    request: AptGetWalletTransactionsVerboseOperationRequest,
  ): AptGetWalletTransactionsVerboseOperationRequestJSON {
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
