import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  DateInput,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';
import { EvmTrade } from '../../generated';

// TODO: this operation is replaced by the generated code. We need to remove this file.

type OperationId = 'getNFTTrades';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTradesRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetNFTTradesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTradesJSONResponse = SuccessResponse;

export type GetNFTTradesResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTradesResponseAdapter
  extends PaginatedResponseAdapter<GetNFTTradesResponse, GetNFTTradesJSONResponse['result']> {}

/** Get trades of NFTs for a given contract and marketplace. */
export const getNFTTradesOperation: PaginatedOperation<
  GetNFTTradesRequest,
  GetNFTTradesJSONRequest,
  GetNFTTradesResponse,
  GetNFTTradesJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTrades',
  id: 'getNFTTrades',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/trades',
  urlPathParamNames: ['address'],
  urlSearchParamNames: [
    'chain',
    'fromBlock',
    'toBlock',
    'fromDate',
    'toDate',
    'marketplace',
    'cursor',
    'limit',
    'disableTotal',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTTradesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    marketplace: request.marketplace,
    cursor: request.cursor,
    limit: maybe(request.limit, String),
    disable_total: request.disableTotal,
  };
}

function deserializeResponse(jsonResponse: GetNFTTradesJSONResponse) {
  return (jsonResponse.result ?? []).map((trade) => EvmTrade.fromJSON(trade));
}

function serializeRequest(request: GetNFTTradesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    marketplace: request.marketplace,
    cursor: request.cursor,
    limit: request.limit,
    address: EvmAddress.create(request.address).checksum,
    disableTotal: request.disableTotal,
  };
}

function deserializeRequest(jsonRequest: GetNFTTradesJSONRequest, core: Core): GetNFTTradesRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    marketplace: jsonRequest.marketplace,
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
    address: EvmAddress.create(jsonRequest.address),
    disableTotal: jsonRequest.disableTotal,
  };
}
