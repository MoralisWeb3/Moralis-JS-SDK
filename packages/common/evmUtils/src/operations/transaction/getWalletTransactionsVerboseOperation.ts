import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  BigNumber,
  DateInput,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import {
  EvmChain,
  EvmChainish,
  EvmAddress,
  EvmAddressish,
  EvmTransaction,
  EvmTransactionLog,
  LogTopic,
} from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTransactionsVerbose';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTransactionsVerboseRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetWalletTransactionsVerboseJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTransactionsVerboseJSONResponse = SuccessResponse;

export type GetWalletTransactionsVerboseResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletTransactionsVerboseResponseAdapter
  extends PaginatedResponseAdapter<
    GetWalletTransactionsVerboseResponse,
    GetWalletTransactionsVerboseJSONResponse['result']
  > {}

/** Get native transactions ordered by block number in descending order. */
export const getWalletTransactionsVerboseOperation: PaginatedOperation<
  GetWalletTransactionsVerboseRequest,
  GetWalletTransactionsVerboseJSONRequest,
  GetWalletTransactionsVerboseResponse,
  GetWalletTransactionsVerboseJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletTransactionsVerbose',
  id: 'getWalletTransactionsVerbose',
  groupName: 'transaction',
  urlPathPattern: '/{address}/verbose',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'subdomain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'cursor', 'limit'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletTransactionsVerboseRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    cursor: request.cursor,
    limit: maybe(request.limit, String),
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetWalletTransactionsVerboseRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    cursor: request.cursor,
    limit: request.limit,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(
  jsonRequest: GetWalletTransactionsVerboseJSONRequest,
  core: Core,
): GetWalletTransactionsVerboseRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(
  jsonResponse: GetWalletTransactionsVerboseJSONResponse,
  request: GetWalletTransactionsVerboseJSONRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmTransaction.create(
      {
        cumulativeGasUsed: transfer.receipt_cumulative_gas_used,
        gasPrice: transfer.gas_price,
        gasUsed: transfer.receipt_gas_used,
        index: +transfer.transaction_index,
        contractAddress: transfer.receipt_contract_address as string,
        receiptRoot: transfer.receipt_root as string,
        receiptStatus: +transfer.receipt_status,
        chain: EvmChainResolver.resolve(request.chain, core),
        data: transfer.input,
        from: EvmAddress.create(transfer.from_address, core),
        hash: transfer.hash,
        nonce: transfer.nonce,
        value: transfer.value,
        blockHash: transfer.block_hash,
        blockNumber: +transfer.block_number,
        blockTimestamp: new Date(transfer.block_timestamp),
        gas: BigNumber.create(transfer.gas as string),
        to: EvmAddress.create(transfer.to_address as string, core),
        logs: (transfer.logs ?? []).map((log) =>
          EvmTransactionLog.create(
            {
              logIndex: +log.log_index,
              transactionHash: log.transaction_hash,
              transactionIndex: +log.transaction_index,
              address: log.address,
              data: log.data,
              topics: [log.topic0, log.topic1 as LogTopic, log.topic2 as LogTopic, log.topic3 as LogTopic],
              blockHash: log.block_hash,
              blockNumber: +log.block_number,
              blockTimestamp: transfer.block_timestamp,
              chain: EvmChainResolver.resolve(request.chain, core),
            },
            core,
          ),
        ),
      },
      core,
    ),
  );
}
