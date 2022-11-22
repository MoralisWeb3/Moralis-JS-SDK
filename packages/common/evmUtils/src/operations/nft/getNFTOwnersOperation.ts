import {
  Core,
  Camelize,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTOwners';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNFTOwnersRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetNFTOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTOwnersJSONResponse = SuccessResponse;

export type GetNFTOwnersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTOwnersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTOwnersResponse, GetNFTOwnersJSONResponse['result']> {}

export const getNFTOwnersOperation: PaginatedOperation<
  GetNFTOwnersRequest,
  GetNFTOwnersJSONRequest,
  GetNFTOwnersResponse,
  GetNFTOwnersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTOwners',
  id: 'getNFTOwners',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/owners',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).checksum,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    normalizeMetadata: request.normalizeMetadata,
  };
}

function deserializeResponse(jsonResponse: GetNFTOwnersJSONResponse, request: GetNFTOwnersRequest, core: Core) {
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

function serializeRequest(request: GetNFTOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetNFTOwnersJSONRequest, core: Core): GetNFTOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
