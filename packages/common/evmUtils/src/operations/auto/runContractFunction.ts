import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish,, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'runContractFunction';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];

type RequestParams = PathParams & QueryParams & BodyParams;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface RunContractFunctionRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address' | 'abi'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
      abi: unknown;
}

export type RunContractFunctionJSONRequest = ReturnType<typeof serializeRequest>;

export type RunContractFunctionJSONResponse = SuccessResponse;

export type RunContractFunctionResponse = ReturnType<typeof deserializeResponse>;

export const RunContractFunctionOperation: Operation<
  RunContractFunctionRequest,
  RunContractFunctionJSONRequest,
  RunContractFunctionResponse,
  RunContractFunctionJSONResponse
> = {
  method: 'POST',
  name: 'runContractFunction',
  id: 'runContractFunction',
  groupName: 'token',
  urlPathPattern: '/{address}/function',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','providerUrl','functionName',],
    bodyType: 'properties',
    bodyParamNames: ['abi','params',],

  getRequestBody,
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestBody(request: RunContractFunctionRequest) {
  //return {
  //  abi: request.abi,
  //  params: request.params,
  //
  //};

  return {
      abi: request.abi,
      params: request.params,
  };
}


function getRequestUrlParams(request: RunContractFunctionRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      providerUrl: request.providerUrl?.toString(),
      function_name: request.functionName?.toString(),
      address: request.address?.toString(),
      abi: request.abi?.toString(),
      params: request.params?.toString(),
  };
}

function serializeRequest(request: RunContractFunctionRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      providerUrl: request.providerUrl,
      functionName: request.functionName,
      address: request.address.toString(),
      abi: request.abi,
      params: request.params,
  };
}

function deserializeRequest(
  jsonRequest: RunContractFunctionJSONRequest,
  core: Core,
): RunContractFunctionRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      providerUrl: jsonRequest.providerUrl,
      functionName: jsonRequest.functionName,
      address: EvmAddress.create(jsonRequest.address, core),
      abi: jsonRequest.abi,
      params: jsonRequest.params,
  };
}


function deserializeResponse(jsonResponse: RunContractFunctionJSONResponse) {
  return jsonResponse;
}