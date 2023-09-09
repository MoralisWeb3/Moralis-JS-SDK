import {
  Core,
  Camelize,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftCollection } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTCollections';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletNFTCollectionsRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetWalletNFTCollectionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNFTCollectionsJSONResponse = SuccessResponse;

export type GetWalletNFTCollectionsResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletNFTCollectionsResponseAdapter
  extends PaginatedResponseAdapter<GetWalletNFTCollectionsResponse, GetWalletNFTCollectionsJSONResponse['result']> {}

/** Get NFT collections owned by a given wallet address. */
export const getWalletNFTCollectionsOperation: PaginatedOperation<
  GetWalletNFTCollectionsRequest,
  GetWalletNFTCollectionsJSONRequest,
  GetWalletNFTCollectionsResponse,
  GetWalletNFTCollectionsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletNFTCollections',
  id: 'getWalletNFTCollections',
  groupName: 'nft',
  urlPathPattern: '/{address}/nft/collections',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'limit', 'cursor', 'disableTotal', 'excludeSpam'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletNFTCollectionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    disable_total: request.disableTotal,
    exclude_spam: request.excludeSpam,
  };
}

function deserializeResponse(
  jsonResponse: GetWalletNFTCollectionsJSONResponse,
  request: GetWalletNFTCollectionsRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((collection) =>
    EvmNftCollection.create({
      ...toCamelCase(collection),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(collection.token_address),
    }),
  );
}

function serializeRequest(request: GetWalletNFTCollectionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    disableTotal: request.disableTotal,
    exclude_spam: request.excludeSpam,
  };
}

function deserializeRequest(jsonRequest: GetWalletNFTCollectionsJSONRequest): GetWalletNFTCollectionsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain),
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    disableTotal: jsonRequest.disableTotal,
    excludeSpam: jsonRequest.exclude_spam,
  };
}
