import { MoralisCore, Camelize, Operation } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationName = 'runContractFunction';
type PathParams = operations[OperationName]['parameters']['path'];
type QueryParams = operations[OperationName]['parameters']['query'];
type BodyParams = operations[OperationName]['requestBody']['content']['application/json'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface RunContractFunctionRequest
  extends Camelize<Omit<PathParams & QueryParams & BodyParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type RunContractFunctionJSONRequest = ReturnType<typeof serializeRequest>;

export type RunContractFunctionJSONResponse = SuccessResponse;

export type RunContractFunctionResponse = ReturnType<typeof deserializeResponse>;

export const runContractFunctionOperation: Operation<
  RunContractFunctionRequest,
  RunContractFunctionJSONRequest,
  RunContractFunctionResponse,
  RunContractFunctionJSONResponse
> = {
  method: 'GET',
  name: 'runContractFunction',
  groupName: 'token',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'functionName', 'providerUrl', 'subdomain'],
  urlPathPattern: '/{address}/function',
  bodyParamNames: ['abi', 'params'],

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: RunContractFunctionRequest, core: MoralisCore) {
  return {
    address: String(request.address),
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    functionName: request.functionName,
    providerUrl: request.providerUrl,
    subdomain: request.subdomain,
  };
}

function deserializeResponse(jsonResponse: RunContractFunctionJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RunContractFunctionRequest, core: MoralisCore) {
  return {
    address: request.address.toString(),
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    functionName: request.functionName,
    providerUrl: request.providerUrl,
    subdomain: request.subdomain,
    abi: request.abi,
    params: request.params,
  };
}

function deserializeRequest(
  jsonRequest: RunContractFunctionJSONRequest,
  core: MoralisCore,
): RunContractFunctionRequest {
  return {
    address: EvmAddress.create(jsonRequest.address, core),
    chain: EvmChain.create(jsonRequest.chain, core),
    functionName: jsonRequest.functionName,
    providerUrl: jsonRequest.providerUrl,
    subdomain: jsonRequest.subdomain,
    abi: jsonRequest.abi,
    params: jsonRequest.params,
  };
}
