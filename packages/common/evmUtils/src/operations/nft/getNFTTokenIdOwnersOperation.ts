import { Core, Camelize, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTokenIdOwners';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNftTokenIdOwnersRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetNftTokenIdOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTokenIdOwnersJSONResponse = SuccessResponse;

export type GetNftTokenIdOwnersResponse = ReturnType<typeof deserializeResponse>;

export const getNftTokenIdOwnersOperation: PaginatedOperation<
  GetNftTokenIdOwnersRequest,
  GetNftTokenIdOwnersJSONRequest,
  GetNftTokenIdOwnersResponse,
  GetNftTokenIdOwnersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTokenIdOwners',
  id: 'getNFTTokenIdOwners',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{token_id}/owners',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNftTokenIdOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    token_id: request.tokenId,
  };
}

function deserializeResponse(
  jsonResponse: GetNftTokenIdOwnersJSONResponse,
  request: GetNftTokenIdOwnersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((nft) =>
    EvmNft.create({
      ...toCamelCase(nft),
      chain: EvmChainResolver.resolve(request.chain, core),
      ownerOf: EvmAddress.create(nft.owner_of, core),
      lastMetadataSync: new Date(nft.last_metadata_sync),
      lastTokenUriSync: new Date(nft.last_token_uri_sync),
    }),
  );
}

function serializeRequest(request: GetNftTokenIdOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).lowercase,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: GetNftTokenIdOwnersJSONRequest, core: Core): GetNftTokenIdOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}
