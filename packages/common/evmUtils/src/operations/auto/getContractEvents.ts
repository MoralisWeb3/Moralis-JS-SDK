import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getContractEvents';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetContractEventsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetContractEventsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetContractEventsJSONResponse = SuccessResponse;

export type GetContractEventsResponse = ReturnType<typeof deserializeResponse>;

export const GetContractEventsOperation: Operation<
  GetContractEventsRequest,
  GetContractEventsJSONRequest,
  GetContractEventsResponse,
  GetContractEventsJSONResponse
> = {
  method: 'POST',
  name: 'getContractEvents',
  id: 'getContractEvents',
  groupName: 'token',
  urlPathPattern: '/{address}/events',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','providerUrl','fromBlock','toBlock','fromDate','toDate','topic','offset','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetContractEventsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      providerUrl: request.providerUrl,
      from_block: maybe(request.fromBlock, String),
      to_block: maybe(request.toBlock, String),
      from_date: request.fromDate,
      to_date: request.toDate,
      topic: request.topic,
      offset: maybe(request.offset, String),
      limit: maybe(request.limit, String),
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetContractEventsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      providerUrl: request.providerUrl,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      topic: request.topic,
      offset: request.offset,
      limit: request.limit,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetContractEventsJSONRequest,
  core: Core,
): GetContractEventsRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      providerUrl: jsonRequest.providerUrl,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      topic: jsonRequest.topic,
      offset: jsonRequest.offset,
      limit: jsonRequest.limit,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetContractEventsJSONResponse, request: GetContractEventsRequest, core: Core) {
   return jsonResponse;
}
