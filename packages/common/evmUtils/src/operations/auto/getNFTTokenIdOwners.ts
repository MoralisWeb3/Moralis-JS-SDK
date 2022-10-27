import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTokenIdOwners';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNftTokenIdOwnersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftTokenIdOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTokenIdOwnersJSONResponse = SuccessResponse;

export type GetNftTokenIdOwnersResponse = ReturnType<typeof deserializeResponse>;

export const GetNftTokenIdOwnersOperation: Operation<
  GetNftTokenIdOwnersRequest,
  GetNftTokenIdOwnersJSONRequest,
  GetNftTokenIdOwnersResponse,
  GetNftTokenIdOwnersJSONResponse
> = {
  method: 'GET',
  name: 'getNFTTokenIdOwners',
  id: 'getNFTTokenIdOwners',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/{token_id}/owners',
  urlPathParamNames: ['address','tokenId',],
  urlSearchParamNames: ['chain','format','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftTokenIdOwnersRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      format: request.format?.toString(),
      limit: request.limit?.toString(),
      cursor: request.cursor?.toString(),
      address: request.address?.toString(),
      token_id: request.tokenId?.toString(),
  };
}

function serializeRequest(request: GetNftTokenIdOwnersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
      tokenId: request.tokenId,
  };
}

function deserializeRequest(
  jsonRequest: GetNftTokenIdOwnersJSONRequest,
  core: Core,
): GetNftTokenIdOwnersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
      tokenId: jsonRequest.tokenId,
  };
}


function deserializeResponse(jsonResponse: GetNftTokenIdOwnersJSONResponse) {
  return jsonResponse;
}