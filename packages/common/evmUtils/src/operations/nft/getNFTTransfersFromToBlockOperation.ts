import { Core, Camelize, DateInput, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmChainish, EvmNative, EvmNftTransfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersFromToBlock';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNftTransfersFromToBlockRequest = Camelize<Omit<RequestParams, 'chain' | 'from_date' | 'to_date'>> & {
  chain?: EvmChainish;
  fromDate?: DateInput;
  toDate?: DateInput;
};

export type GetNftTransfersFromToBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersFromToBlockJSONResponse = SuccessResponse;

export type GetNftTransfersFromToBlockResponse = ReturnType<typeof deserializeResponse>;

export const getNftTransfersFromToBlockOperation: PaginatedOperation<
  GetNftTransfersFromToBlockRequest,
  GetNftTransfersFromToBlockJSONRequest,
  GetNftTransfersFromToBlockResponse,
  GetNftTransfersFromToBlockJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfersFromToBlock',
  id: 'getNFTTransfersFromToBlock',
  groupName: 'nft',
  urlPathPattern: '/nft/transfers',
  urlPathParamNames: [],
  urlSearchParamNames: ['chain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'format', 'limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNftTransfersFromToBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(
  jsonResponse: GetNftTransfersFromToBlockJSONResponse,
  request: GetNftTransfersFromToBlockRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(transfer.to_address, core),
      toAddress: EvmAddress.create(transfer.to_address, core),
      operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
      value: transfer.value ? EvmNative.create(transfer.value) : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetNftTransfersFromToBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
  };
}

function deserializeRequest(
  jsonRequest: GetNftTransfersFromToBlockJSONRequest,
  core: Core,
): GetNftTransfersFromToBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
  };
}
