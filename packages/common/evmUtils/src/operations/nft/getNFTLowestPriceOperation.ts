import { Core, Camelize, Operation, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';
import { EvmTrade } from '../../generated';

type OperationId = 'getNFTLowestPrice';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTLowestPriceRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTLowestPriceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTLowestPriceJSONResponse = SuccessResponse;

export type GetNFTLowestPriceResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTLowestPriceResponseAdapter
  extends ResponseAdapter<GetNFTLowestPriceResponse, GetNFTLowestPriceJSONResponse> {}

/** Get the lowest executed price for an NFT contract for the last x days (only trades paid in ETH). */
export const getNFTLowestPriceOperation: Operation<
  GetNFTLowestPriceRequest,
  GetNFTLowestPriceJSONRequest,
  GetNFTLowestPriceResponse,
  GetNFTLowestPriceJSONResponse
> = {
  method: 'GET',
  name: 'getNFTLowestPrice',
  id: 'getNFTLowestPrice',
  groupName: 'nft',
  isNullable: true,
  urlPathPattern: '/nft/{address}/lowestprice',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'days', 'marketplace'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTLowestPriceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    days: maybe(request.days, String),
    marketplace: request.marketplace,
  };
}

function deserializeResponse(jsonResponse: GetNFTLowestPriceJSONResponse) {
  return EvmTrade.fromJSON(jsonResponse);
}

function serializeRequest(request: GetNFTLowestPriceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    days: request.days,
    marketplace: request.marketplace,
    address: EvmAddress.create(request.address).checksum,
  };
}

function deserializeRequest(jsonRequest: GetNFTLowestPriceJSONRequest, core: Core): GetNFTLowestPriceRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    days: jsonRequest.days,
    marketplace: jsonRequest.marketplace,
    address: EvmAddress.create(jsonRequest.address),
  };
}
