import {
  Core,
  Camelize,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft, EvmNftMedia } from '../../dataTypes';
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
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata', 'disableTotal', 'mediaItems'],
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
    address: EvmAddress.create(request.address).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    tokenId: request.tokenId,
    normalizeMetadata: request.normalizeMetadata,
    disable_total: request.disableTotal,
    media_items: request.mediaItems,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTTokenIdOwnersJSONResponse,
  request: GetNFTTokenIdOwnersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((data) => {
    const chain = EvmChainResolver.resolve(request.chain, core);
    const nft = toCamelCase(data);

    return EvmNft.create(
      {
        ...toCamelCase(nft),
        chain: EvmChainResolver.resolve(request.chain, core),
        ownerOf: EvmAddress.create(nft.ownerOf),
        lastMetadataSync: new Date(nft.lastMetadataSync),
        lastTokenUriSync: new Date(nft.lastTokenUriSync),
        media: maybe(nft.media, (media) =>
          EvmNftMedia.create(
            {
              chain,
              ...toCamelCase(media),
            },
            core,
          ),
        ),
      },
      core,
    );
  });
}

function serializeRequest(request: GetNFTTokenIdOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    tokenId: request.tokenId,
    normalizeMetadata: request.normalizeMetadata,
    disableTotal: request.disableTotal,
    mediaItems: request.mediaItems,
  };
}

function deserializeRequest(jsonRequest: GetNFTTokenIdOwnersJSONRequest, core: Core): GetNFTTokenIdOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    tokenId: jsonRequest.tokenId,
    normalizeMetadata: jsonRequest.normalizeMetadata,
    disableTotal: jsonRequest.disableTotal,
    mediaItems: jsonRequest.mediaItems,
  };
}
