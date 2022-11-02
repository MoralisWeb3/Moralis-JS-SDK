import { Core, Camelize, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftCollection } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTCollections';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetWalletNftCollectionsRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetWalletNftCollectionsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNftCollectionsJSONResponse = SuccessResponse;

export type GetWalletNftCollectionsResponse = ReturnType<typeof deserializeResponse>;

export const getWalletNftCollectionsOperation: PaginatedOperation<
  GetWalletNftCollectionsRequest,
  GetWalletNftCollectionsJSONRequest,
  GetWalletNftCollectionsResponse,
  GetWalletNftCollectionsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletNFTCollections',
  id: 'getWalletNFTCollections',
  groupName: 'nft',
  urlPathPattern: '/{address}/nft/collections',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'limit', 'cursor'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletNftCollectionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(
  jsonResponse: GetWalletNftCollectionsJSONResponse,
  request: GetWalletNftCollectionsRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((collection) =>
    EvmNftCollection.create(
      {
        ...toCamelCase(collection),
        chain: EvmChainResolver.resolve(request.chain, core),
        tokenAddress: EvmAddress.create(collection.token_address, core),
      },
      core,
    ),
  );
}

function serializeRequest(request: GetWalletNftCollectionsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).lowercase,
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
