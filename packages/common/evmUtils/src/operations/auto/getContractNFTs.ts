import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getContractNFTs';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetContractNfTsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetContractNfTsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetContractNfTsJSONResponse = SuccessResponse;

export type GetContractNfTsResponse = ReturnType<typeof deserializeResponse>;

export const GetContractNfTsOperation: Operation<
  GetContractNfTsRequest,
  GetContractNfTsJSONRequest,
  GetContractNfTsResponse,
  GetContractNfTsJSONResponse
> = {
  method: 'GET',
  name: 'getContractNFTs',
  id: 'getContractNFTs',
  groupName: 'token',
  urlPathPattern: '/nft/{address}',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','format','limit','totalRanges','range','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetContractNfTsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: maybe(request.limit, String),
      totalRanges: maybe(request.totalRanges, String),
      range: maybe(request.range, String),
      cursor: request.cursor,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetContractNfTsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: request.limit,
      totalRanges: request.totalRanges,
      range: request.range,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetContractNfTsJSONRequest,
  core: Core,
): GetContractNfTsRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      totalRanges: jsonRequest.totalRanges,
      range: jsonRequest.range,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetContractNfTsJSONResponse, request: GetContractNfTsRequest, core: Core) {
   return jsonResponse;
}
