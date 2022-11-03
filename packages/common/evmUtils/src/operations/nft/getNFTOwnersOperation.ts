import { Core, Camelize, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTOwners';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNftOwnersRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetNftOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftOwnersJSONResponse = SuccessResponse;

export type GetNftOwnersResponse = ReturnType<typeof deserializeResponse>;

export const getNftOwnersOperation: PaginatedOperation<
  GetNftOwnersRequest,
  GetNftOwnersJSONRequest,
  GetNftOwnersResponse,
  GetNftOwnersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTOwners',
  id: 'getNFTOwners',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/owners',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNftOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetNftOwnersJSONResponse, request: GetNftOwnersRequest, core: Core) {
  return (jsonResponse.result ?? []).map((nft) =>
    EvmNft.create(
      {
        ...toCamelCase(nft),
        chain: EvmChainResolver.resolve(request.chain, core),
        ownerOf: EvmAddress.create(nft.owner_of, core),
        lastMetadataSync: new Date(nft.last_metadata_sync),
        lastTokenUriSync: new Date(nft.last_token_uri_sync),
      },
      core,
    ),
  );
}

function serializeRequest(request: GetNftOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetNftOwnersJSONRequest, core: Core): GetNftOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
