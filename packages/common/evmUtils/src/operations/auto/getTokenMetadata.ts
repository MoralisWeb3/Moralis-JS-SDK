import { Core, Camelize, Operation,  } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenMetadata';



type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams =  & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenMetadataRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'addresses'>> {
      chain?: EvmChainish;
      addresses: EvmAddressish;
}

export type GetTokenMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenMetadataJSONResponse = SuccessResponse;

export type GetTokenMetadataResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenMetadataOperation: Operation<
  GetTokenMetadataRequest,
  GetTokenMetadataJSONRequest,
  GetTokenMetadataResponse,
  GetTokenMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getTokenMetadata',
  id: 'getTokenMetadata',
  groupName: 'token',
  urlPathPattern: '/erc20/metadata',
  
  urlSearchParamNames: ['chain','subdomain','providerUrl','addresses',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      providerUrl: request.providerUrl,
      addresses: EvmAddress.create(request.addresses, core).lowercase,
  };
}

function serializeRequest(request: GetTokenMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      providerUrl: request.providerUrl,
      addresses: request.addresses.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetTokenMetadataJSONRequest,
  core: Core,
): GetTokenMetadataRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      providerUrl: jsonRequest.providerUrl,
      addresses: EvmAddress.create(jsonRequest.addresses, core),
  };
}

function deserializeResponse(jsonResponse: GetTokenMetadataJSONResponse) {
  return jsonResponse;
}