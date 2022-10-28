import { Core, Camelize, Operation,  } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTMetadata';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNftMetadataRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftMetadataJSONResponse = SuccessResponse;

export type GetNftMetadataResponse = ReturnType<typeof deserializeResponse>;

export const GetNftMetadataOperation: Operation<
  GetNftMetadataRequest,
  GetNftMetadataJSONRequest,
  GetNftMetadataResponse,
  GetNftMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTMetadata',
  id: 'getNFTMetadata',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/{token_id}',
  urlPathParamNames: ['address','tokenId',],
  urlSearchParamNames: ['chain','format',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      address: EvmAddress.create(request.address, core).lowercase,
      token_id: request.tokenId,
  };
}

function serializeRequest(request: GetNftMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      address: request.address.toString(),
      tokenId: request.tokenId,
  };
}

function deserializeRequest(
  jsonRequest: GetNftMetadataJSONRequest,
  core: Core,
): GetNftMetadataRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      address: EvmAddress.create(jsonRequest.address, core),
      tokenId: jsonRequest.tokenId,
  };
}

function deserializeResponse(jsonResponse: GetNftMetadataJSONResponse) {
  return jsonResponse;
}
