import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNativeBalance';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNativeBalanceRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNativeBalanceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNativeBalanceJSONResponse = SuccessResponse;

export type GetNativeBalanceResponse = ReturnType<typeof deserializeResponse>;

export const GetNativeBalanceOperation: Operation<
  GetNativeBalanceRequest,
  GetNativeBalanceJSONRequest,
  GetNativeBalanceResponse,
  GetNativeBalanceJSONResponse
> = {
  method: 'GET',
  name: 'getNativeBalance',
  id: 'getNativeBalance',
  groupName: 'token',
  urlPathPattern: '/{address}/balance',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','providerUrl','toBlock',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNativeBalanceRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      providerUrl: request.providerUrl?.toString(),
      to_block: request.toBlock?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetNativeBalanceRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      providerUrl: request.providerUrl,
      toBlock: request.toBlock,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNativeBalanceJSONRequest,
  core: Core,
): GetNativeBalanceRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      providerUrl: jsonRequest.providerUrl,
      toBlock: jsonRequest.toBlock,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetNativeBalanceJSONResponse) {
  return jsonResponse;
}