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

type OperationId = 'getNFTOwners';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTOwnersRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTOwnersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTOwnersJSONResponse = SuccessResponse;

export type GetNFTOwnersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTOwnersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTOwnersResponse, GetNFTOwnersJSONResponse['result']> {}

/**
 * Get owners of NFTs for a given contract.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
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
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'normalizeMetadata', 'disableTotal', 'mediaItems'],
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
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    normalizeMetadata: request.normalizeMetadata,
    disable_total: request.disableTotal,
    media_items: request.mediaItems,
  };
}

function deserializeResponse(jsonResponse: GetNFTOwnersJSONResponse, request: GetNFTOwnersRequest, core: Core) {
  return (jsonResponse.result ?? []).map((data) => {
    const chain = EvmChainResolver.resolve(request.chain, core);
    const nft = toCamelCase(data);

    return EvmNft.create(
      {
        ...toCamelCase(nft),
        chain: EvmChainResolver.resolve(request.chain, core),
        ownerOf: EvmAddress.create(nft.ownerOf, core),
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

function serializeRequest(request: GetNFTOwnersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
    normalizeMetadata: request.normalizeMetadata,
    disableTotal: request.disableTotal,
    mediaItems: request.mediaItems,
  };
}

function deserializeRequest(jsonRequest: GetNFTOwnersJSONRequest, core: Core): GetNFTOwnersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
    normalizeMetadata: jsonRequest.normalizeMetadata,
    disableTotal: jsonRequest.disableTotal,
    mediaItems: jsonRequest.mediaItems,
  };
}
