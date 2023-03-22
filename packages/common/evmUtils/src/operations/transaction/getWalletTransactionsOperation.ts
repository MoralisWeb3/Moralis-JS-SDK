import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  BigNumber,
  DateInput,
  PaginatedResponseAdapter,
  toCamelCase,
} from '@moralisweb3/common-core';
import {
  EvmChain,
  EvmChainish,
  EvmAddress,
  EvmAddressish,
  EvmTransaction,
  EvmInternalTransaction,
} from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTransactions';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTransactionsRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetWalletTransactionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTransactionsJSONResponse = SuccessResponse;

export type GetWalletTransactionsResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletTransactionsResponseAdapter
  extends PaginatedResponseAdapter<GetWalletTransactionsResponse, GetWalletTransactionsJSONResponse['result']> {}

/** Get native transactions ordered by block number in descending order. */
export const getWalletTransactionsOperation: PaginatedOperation<
  GetWalletTransactionsRequest,
  GetWalletTransactionsJSONRequest,
  GetWalletTransactionsResponse,
  GetWalletTransactionsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletTransactions',
  id: 'getWalletTransactions',
  groupName: 'transaction',
  urlPathPattern: '/{address}',
  urlPathParamNames: ['address'],
  urlSearchParamNames: [
    'chain',
    'fromBlock',
    'toBlock',
    'fromDate',
    'toDate',
    'cursor',
    'limit',
    'disableTotal',
    'include',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletTransactionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    cursor: request.cursor,
    limit: maybe(request.limit, String),
    address: EvmAddress.create(request.address, core).lowercase,
    disable_total: request.disableTotal,
    include: request.include,
  };
}

function serializeRequest(request: GetWalletTransactionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    cursor: request.cursor,
    limit: request.limit,
    address: EvmAddress.create(request.address, core).checksum,
    disableTotal: request.disableTotal,
    include: request.include,
  };
}

function deserializeRequest(jsonRequest: GetWalletTransactionsJSONRequest, core: Core): GetWalletTransactionsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
    address: EvmAddress.create(jsonRequest.address, core),
    disableTotal: jsonRequest.disableTotal,
    include: jsonRequest.include,
  };
}

function deserializeResponse(
  jsonResponse: GetWalletTransactionsJSONResponse,
  request: GetWalletTransactionsJSONRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) => {
    const chain = EvmChainResolver.resolve(request.chain, core);
    return EvmTransaction.create(
      {
        cumulativeGasUsed: transfer.receipt_cumulative_gas_used,
        gasPrice: transfer.gas_price,
        gasUsed: transfer.receipt_gas_used,
        index: +transfer.transaction_index,
        contractAddress: transfer.receipt_contract_address as string | null,
        receiptRoot: transfer.receipt_root as string | null,
        receiptStatus: +transfer.receipt_status,
        chain: EvmChainResolver.resolve(request.chain, core),
        data: transfer.input,
        from: transfer.from_address,
        hash: transfer.hash,
        nonce: transfer.nonce,
        value: transfer.value,
        blockHash: transfer.block_hash,
        blockNumber: +transfer.block_number,
        blockTimestamp: new Date(transfer.block_timestamp),
        gas: transfer.gas ? BigNumber.create(transfer.gas as string) : null,
        to: transfer.to_address ? (transfer.to_address as string) : null,
        internalTransactions: (transfer.internal_transactions ?? []).map((jsonInternalTransaction) => {
          const internalTransaction = toCamelCase(jsonInternalTransaction);
          return EvmInternalTransaction.create({
            chain,
            ...internalTransaction,
          });
        }),
      },
      core,
    );
  });
}
