import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTOwners';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNftOwnersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftOwnersJSONResponse = SuccessResponse;

export type GetNftOwnersResponse = ReturnType<typeof deserializeResponse>;

export const GetNftOwnersOperation: Operation<
  GetNftOwnersRequest,
  GetNftOwnersJSONRequest,
  GetNftOwnersResponse,
  GetNftOwnersJSONResponse
> = {
  method: 'GET',
  name: 'getNFTOwners',
  id: 'getNFTOwners',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/owners',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','format','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftOwnersRequest, core: Core) {
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
  };
}

function serializeRequest(request: GetNftOwnersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNftOwnersJSONRequest,
  core: Core,
): GetNftOwnersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetNftOwnersJSONResponse) {
  return jsonResponse;
}