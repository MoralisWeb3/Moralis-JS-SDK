import { Core, Camelize, Operation,  } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTContractMetadata';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNftContractMetadataRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftContractMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftContractMetadataJSONResponse = SuccessResponse;

export type GetNftContractMetadataResponse = ReturnType<typeof deserializeResponse>;

export const GetNftContractMetadataOperation: Operation<
  GetNftContractMetadataRequest,
  GetNftContractMetadataJSONRequest,
  GetNftContractMetadataResponse,
  GetNftContractMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTContractMetadata',
  id: 'getNFTContractMetadata',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/metadata',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftContractMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetNftContractMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNftContractMetadataJSONRequest,
  core: Core,
): GetNftContractMetadataRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetNftContractMetadataJSONResponse) {
  return jsonResponse;
}
