import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTCollections';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletNftCollectionsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetWalletNftCollectionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNftCollectionsJSONResponse = SuccessResponse;

export type GetWalletNftCollectionsResponse = ReturnType<typeof deserializeResponse>;

export const GetWalletNftCollectionsOperation: Operation<
  GetWalletNftCollectionsRequest,
  GetWalletNftCollectionsJSONRequest,
  GetWalletNftCollectionsResponse,
  GetWalletNftCollectionsJSONResponse
> = {
  method: 'GET',
  name: 'getWalletNFTCollections',
  id: 'getWalletNFTCollections',
  groupName: 'token',
  urlPathPattern: '/{address}/nft/collections',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetWalletNftCollectionsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      limit: maybe(request.limit, String),
      cursor: request.cursor,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetWalletNftCollectionsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetWalletNftCollectionsJSONRequest,
  core: Core,
): GetWalletNftCollectionsRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetWalletNftCollectionsJSONResponse, request: GetWalletNftCollectionsRequest, core: Core) {
   return jsonResponse;
}
