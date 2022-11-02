import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'runContractFunction';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface RunContractFunctionRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
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
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'subdomain', 'providerUrl', 'functionName'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: RunContractFunctionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    providerUrl: request.providerUrl,
    function_name: request.functionName,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: RunContractFunctionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    providerUrl: request.providerUrl,
    functionName: request.functionName,
    address: request.address.toString(),
  };
}

function deserializeRequest(jsonRequest: RunContractFunctionJSONRequest, core: Core): RunContractFunctionRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    providerUrl: jsonRequest.providerUrl,
    functionName: jsonRequest.functionName,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: RunContractFunctionJSONResponse) {
  return jsonResponse;
}
