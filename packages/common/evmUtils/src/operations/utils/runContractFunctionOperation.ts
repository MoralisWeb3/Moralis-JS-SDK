import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'runContractFunction';
type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & QueryParams & BodyParams;
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface RunContractFunctionRequest extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'abi'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: unknown;
}

export type RunContractFunctionJSONRequest = ReturnType<typeof serializeRequest>;

export type RunContractFunctionJSONResponse = SuccessResponse;

export type RunContractFunctionResponse = ReturnType<typeof deserializeResponse>;

export interface RunContractFunctionResponseAdapter
  extends ResponseAdapter<RunContractFunctionResponse, RunContractFunctionJSONResponse> {}

/** Run a given function of a contract ABI and retrieve readonly data. */
export const runContractFunctionOperation: Operation<
  RunContractFunctionRequest,
  RunContractFunctionJSONRequest,
  RunContractFunctionResponse,
  RunContractFunctionJSONResponse
> = {
  method: 'POST',
  name: 'runContractFunction',
  id: 'runContractFunction',
  groupName: 'utils',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'functionName'],
  urlPathPattern: '/{address}/function',
  bodyType: 'properties',
  bodyParamNames: ['abi', 'params'],

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: RunContractFunctionRequest, core: Core) {
  return {
    address: EvmAddress.create(request.address).lowercase,
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    function_name: request.functionName,
  };
}

function getRequestBody(request: RunContractFunctionRequest) {
  return {
    abi: request.abi,
    params: request.params,
  };
}

function deserializeResponse(jsonResponse: RunContractFunctionJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RunContractFunctionRequest, core: Core) {
  return {
    address: EvmAddress.create(request.address).checksum,
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    functionName: request.functionName,
    abi: request.abi,
    params: request.params,
  };
}

function deserializeRequest(jsonRequest: RunContractFunctionJSONRequest): RunContractFunctionRequest {
  return {
    address: EvmAddress.create(jsonRequest.address),
    chain: EvmChain.create(jsonRequest.chain),
    functionName: jsonRequest.functionName,
    abi: jsonRequest.abi,
    params: jsonRequest.params,
  };
}
