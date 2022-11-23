import { Core, Camelize, Operation, toCamelCase, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftTrade, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

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
  urlSearchParamNames: ['chain', 'days', 'providerUrl', 'marketplace'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTLowestPriceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    days: maybe(request.days, String),
    provider_url: request.providerUrl,
    marketplace: request.marketplace,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTLowestPriceJSONResponse,
  request: GetNFTLowestPriceRequest,
  core: Core,
) {
  return EvmNftTrade.create({
    ...toCamelCase(jsonResponse),
    chain: EvmChainResolver.resolve(request.chain, core),
    sellerAddress: EvmAddress.create(jsonResponse.seller_address, core),
    buyerAddress: EvmAddress.create(jsonResponse.buyer_address, core),
    marketplaceAddress: EvmAddress.create(jsonResponse.marketplace_address, core),
    tokenAddress: EvmAddress.create(jsonResponse.token_address as string, core),
    price: EvmNative.create(jsonResponse.price, 'wei'),
    blockTimestamp: new Date(jsonResponse.block_timestamp),
    tokenIds: jsonResponse.token_ids as string[],
  });
}

function serializeRequest(request: GetNFTLowestPriceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    days: request.days,
    providerUrl: request.providerUrl,
    marketplace: request.marketplace,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetNFTLowestPriceJSONRequest, core: Core): GetNFTLowestPriceRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    days: jsonRequest.days,
    providerUrl: jsonRequest.providerUrl,
    marketplace: jsonRequest.marketplace,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
