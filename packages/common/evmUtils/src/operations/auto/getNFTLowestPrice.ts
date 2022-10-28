import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTLowestPrice';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNftLowestPriceRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftLowestPriceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftLowestPriceJSONResponse = SuccessResponse;

export type GetNftLowestPriceResponse = ReturnType<typeof deserializeResponse>;

export const GetNftLowestPriceOperation: Operation<
  GetNftLowestPriceRequest,
  GetNftLowestPriceJSONRequest,
  GetNftLowestPriceResponse,
  GetNftLowestPriceJSONResponse
> = {
  method: 'GET',
  name: 'getNFTLowestPrice',
  id: 'getNFTLowestPrice',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/lowestprice',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','days','providerUrl','marketplace',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftLowestPriceRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      days: maybe(request.days, String),
      provider_url: request.providerUrl,
      marketplace: request.marketplace,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetNftLowestPriceRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      days: request.days,
      providerUrl: request.providerUrl,
      marketplace: request.marketplace,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNftLowestPriceJSONRequest,
  core: Core,
): GetNftLowestPriceRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      days: jsonRequest.days,
      providerUrl: jsonRequest.providerUrl,
      marketplace: jsonRequest.marketplace,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetNftLowestPriceJSONResponse) {
  return jsonResponse;
}
