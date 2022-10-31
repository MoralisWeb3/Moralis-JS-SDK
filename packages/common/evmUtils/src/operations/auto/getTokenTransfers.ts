import { Core, Camelize, PaginatedOperation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenTransfersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetTokenTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenTransfersJSONResponse = SuccessResponse;

export type GetTokenTransfersResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenTransfersOperation: PaginatedOperation<
  GetTokenTransfersRequest,
  GetTokenTransfersJSONRequest,
  GetTokenTransfersResponse,
  GetTokenTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getTokenTransfers',
  id: 'getTokenTransfers',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/transfers',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','fromBlock','toBlock','fromDate','toDate','offset','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      from_block: maybe(request.fromBlock, String),
      to_block: maybe(request.toBlock, String),
      from_date: request.fromDate,
      to_date: request.toDate,
      offset: maybe(request.offset, String),
      limit: maybe(request.limit, String),
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetTokenTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      offset: request.offset,
      limit: request.limit,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetTokenTransfersJSONRequest,
  core: Core,
): GetTokenTransfersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      offset: jsonRequest.offset,
      limit: jsonRequest.limit,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetTokenTransfersJSONResponse) {
  return jsonResponse.result;
}