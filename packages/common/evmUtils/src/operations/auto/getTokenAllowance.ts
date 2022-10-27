import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish,EvmAddress,EvmAddressish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenAllowance';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetTokenAllowanceRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'owner_address' | 'spender_address' | 'address'>> {
      chain?: EvmChainish;
      ownerAddress: EvmAddressish;
      spenderAddress: EvmAddressish;
      address: EvmAddressish;
}

export type GetTokenAllowanceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenAllowanceJSONResponse = SuccessResponse;

export type GetTokenAllowanceResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenAllowanceOperation: Operation<
  GetTokenAllowanceRequest,
  GetTokenAllowanceJSONRequest,
  GetTokenAllowanceResponse,
  GetTokenAllowanceJSONResponse
> = {
  method: 'GET',
  name: 'getTokenAllowance',
  id: 'getTokenAllowance',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/allowance',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','providerUrl','ownerAddress','spenderAddress',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenAllowanceRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      providerUrl: request.providerUrl?.toString(),
      owner_address: request.ownerAddress?.toString(),
      spender_address: request.spenderAddress?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetTokenAllowanceRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      providerUrl: request.providerUrl,
      ownerAddress: request.owner_address.toString(),
      spenderAddress: request.spender_address.toString(),
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetTokenAllowanceJSONRequest,
  core: Core,
): GetTokenAllowanceRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      providerUrl: jsonRequest.providerUrl,
      ownerAddress: EvmAddress.create(jsonRequest.ownerAddress, core),
      spenderAddress: EvmAddress.create(jsonRequest.spenderAddress, core),
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetTokenAllowanceJSONResponse) {
  return jsonResponse;
}