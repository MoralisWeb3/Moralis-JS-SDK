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

type OperationId = 'getNFTTokenIdOwners';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTokenIdOwnersRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTTokenIdOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTokenIdOwnersJSONResponse = SuccessResponse;

export type GetNFTTokenIdOwnersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTokenIdOwnersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTTokenIdOwnersResponse, GetNFTTokenIdOwnersJSONResponse['result']> {}

/**
 * Get owners of a specific NFT given the contract address and token ID.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const getNFTTokenIdOwnersOperation: PaginatedOperation<
  GetNFTTokenIdOwnersRequest,
  GetNFTTokenIdOwnersJSONRequest,
  GetNFTTokenIdOwnersResponse,
  GetNFTTokenIdOwnersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTokenIdOwners',
  id: 'getNFTTokenIdOwners',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{tokenId}/owners',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata'],
  firstPageIndex: 1,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTTokenIdOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    tokenId: request.tokenId,
    normalizeMetadata: request.normalizeMetadata,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTTokenIdOwnersJSONResponse,
  request: GetNFTTokenIdOwnersRequest,
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

function serializeRequest(request: GetNFTTokenIdOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: GetNFTTokenIdOwnersJSONRequest, core: Core): GetNFTTokenIdOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}
