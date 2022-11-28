import {
  Core,
  Camelize,
  DateInput,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmChainish, EvmNative, EvmNftTransfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersFromToBlock';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTransfersFromToBlockRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetNFTTransfersFromToBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTransfersFromToBlockJSONResponse = SuccessResponse;

export type GetNFTTransfersFromToBlockResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTransfersFromToBlockResponseAdapter
  extends PaginatedResponseAdapter<
    GetNFTTransfersFromToBlockResponse,
    GetNFTTransfersFromToBlockJSONResponse['result']
  > {}

/** Get transfers of NFTs from a block number to a block number. */
export const getNFTTransfersFromToBlockOperation: PaginatedOperation<
  GetNFTTransfersFromToBlockRequest,
  GetNFTTransfersFromToBlockJSONRequest,
  GetNFTTransfersFromToBlockResponse,
  GetNFTTransfersFromToBlockJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfersFromToBlock',
  id: 'getNFTTransfersFromToBlock',
  groupName: 'nft',
  urlPathPattern: '/nft/transfers',
  urlSearchParamNames: ['chain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'format', 'limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTTransfersFromToBlockRequest, core: Core) {
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
  jsonResponse: GetNFTTransfersFromToBlockJSONResponse,
  request: GetNFTTransfersFromToBlockRequest,
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

function serializeRequest(request: GetNFTTransfersFromToBlockRequest, core: Core) {
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
  jsonRequest: GetNFTTransfersFromToBlockJSONRequest,
  core: Core,
): GetNFTTransfersFromToBlockRequest {
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
