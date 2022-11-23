import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  DateInput,
  toCamelCase,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmTransactionLog, LogTopic } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getContractLogs';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetContractLogsRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetContractLogsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetContractLogsJSONResponse = SuccessResponse;

export type GetContractLogsResponse = ReturnType<typeof deserializeResponse>;

export interface GetContractLogsResponseAdapter
  extends PaginatedResponseAdapter<GetContractLogsResponse, GetContractLogsJSONResponse['result']> {}

/** Get the logs for a contract. */
export const getContractLogsOperation: PaginatedOperation<
  GetContractLogsRequest,
  GetContractLogsJSONRequest,
  GetContractLogsResponse,
  GetContractLogsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getContractLogs',
  id: 'getContractLogs',
  groupName: 'events',
  urlPathPattern: '/{address}/logs',
  urlPathParamNames: ['address'],
  urlSearchParamNames: [
    'chain',
    'subdomain',
    'blockNumber',
    'fromBlock',
    'toBlock',
    'fromDate',
    'toDate',
    'topic0',
    'topic1',
    'topic2',
    'topic3',
    'limit',
    'cursor',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetContractLogsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    block_number: request.blockNumber,
    from_block: request.fromBlock,
    to_block: request.toBlock,
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    topic0: request.topic0,
    topic1: request.topic1,
    topic2: request.topic2,
    topic3: request.topic3,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetContractLogsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    blockNumber: request.blockNumber,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    topic0: request.topic0,
    topic1: request.topic1,
    topic2: request.topic2,
    topic3: request.topic3,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeRequest(jsonRequest: GetContractLogsJSONRequest, core: Core): GetContractLogsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    blockNumber: jsonRequest.blockNumber,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate ? new Date(jsonRequest.fromDate) : undefined,
    toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
    topic0: jsonRequest.topic0,
    topic1: jsonRequest.topic1,
    topic2: jsonRequest.topic2,
    topic3: jsonRequest.topic3,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetContractLogsJSONResponse, request: GetContractLogsRequest, core: Core) {
  return (jsonResponse.result ?? [])?.map((log) =>
    EvmTransactionLog.create(
      {
        ...toCamelCase(log),
        topics: [log.topic0, log.topic1 as LogTopic, log.topic2 as LogTopic, log.topic3 as LogTopic],
        blockNumber: Number(log.block_number),
        chain: EvmChainResolver.resolve(request.chain, core),
      },
      core,
    ),
  );
}
