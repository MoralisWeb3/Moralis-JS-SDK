import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getContractEvents';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];

type RequestParams = PathParams & QueryParams & BodyParams;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

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
    bodyType: 'properties',
    bodyParamNames: ['key',],

  getRequestBody,
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestBody(request: GetContractEventsRequest) {
  //return {
  //  abi: request.abi,
  //  params: request.params,
  //
  //};

  return {
      key: request.key,
  };
}


function getRequestUrlParams(request: GetContractEventsRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      providerUrl: request.providerUrl?.toString(),
      from_block: request.fromBlock?.toString(),
      to_block: request.toBlock?.toString(),
      from_date: request.fromDate?.toString(),
      to_date: request.toDate?.toString(),
      topic: request.topic?.toString(),
      offset: request.offset?.toString(),
      limit: request.limit?.toString(),
      address: request.address?.toString(),
      key: request.key?.toString(),
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
      key: request.key,
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
      key: jsonRequest.key,
  };
}


function deserializeResponse(jsonResponse: GetContractEventsJSONResponse) {
  return jsonResponse;
}