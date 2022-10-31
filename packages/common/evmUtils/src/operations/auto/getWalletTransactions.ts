import { Core, Camelize, PaginatedOperation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTransactions';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTransactionsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetWalletTransactionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTransactionsJSONResponse = SuccessResponse;

export type GetWalletTransactionsResponse = ReturnType<typeof deserializeResponse>;

export const GetWalletTransactionsOperation: PaginatedOperation<
  GetWalletTransactionsRequest,
  GetWalletTransactionsJSONRequest,
  GetWalletTransactionsResponse,
  GetWalletTransactionsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletTransactions',
  id: 'getWalletTransactions',
  groupName: 'token',
  urlPathPattern: '/{address}',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','fromBlock','toBlock','fromDate','toDate','cursor','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetWalletTransactionsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      from_block: maybe(request.fromBlock, String),
      to_block: maybe(request.toBlock, String),
      from_date: request.fromDate,
      to_date: request.toDate,
      cursor: request.cursor,
      limit: maybe(request.limit, String),
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetWalletTransactionsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      cursor: request.cursor,
      limit: request.limit,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetWalletTransactionsJSONRequest,
  core: Core,
): GetWalletTransactionsRequest {
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

function deserializeResponse(jsonResponse: GetWalletTransactionsJSONResponse) {
  return jsonResponse.result;
}