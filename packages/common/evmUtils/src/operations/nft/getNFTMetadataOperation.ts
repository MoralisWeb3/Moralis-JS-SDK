import { Core, Camelize, Operation, toCamelCase, ResponseAdapter, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft, EvmNftMedia } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTMetadata';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTMetadataRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTMetadataJSONResponse = SuccessResponse;

export type GetNFTMetadataResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTMetadataResponseAdapter
  extends ResponseAdapter<GetNFTMetadataResponse, GetNFTMetadataJSONResponse> {}

/**
 * Get NFT data, including metadata (where available), for the given NFT token ID and contract address.
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const getNFTMetadataOperation: Operation<
  GetNFTMetadataRequest,
  GetNFTMetadataJSONRequest,
  GetNFTMetadataResponse,
  GetNFTMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTMetadata',
  id: 'getNFTMetadata',
  groupName: 'nft',
  isNullable: true,
  urlPathPattern: '/nft/{address}/{tokenId}',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'normalizeMetadata', 'mediaItems'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    tokenId: request.tokenId,
    format: request.format,
    normalizeMetadata: request.normalizeMetadata,
    media_items: request.mediaItems,
  };
}

function deserializeResponse(jsonResponse: GetNFTMetadataJSONResponse, request: GetNFTMetadataRequest, core: Core) {
  const chain = EvmChainResolver.resolve(request.chain, core);
  const nft = toCamelCase(jsonResponse);

  return EvmNft.create(
    {
      ...nft,
      chain: EvmChainResolver.resolve(request.chain, core),
      ownerOf: nft.ownerOf ? EvmAddress.create(nft.ownerOf) : undefined,
      lastMetadataSync: nft.lastMetadataSync ? new Date(nft.lastMetadataSync) : undefined,
      lastTokenUriSync: nft.lastTokenUriSync ? new Date(nft.lastTokenUriSync) : undefined,
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
}

function serializeRequest(request: GetNFTMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    address: EvmAddress.create(request.address).checksum,
    tokenId: request.tokenId,
    normalizeMetadata: request.normalizeMetadata,
    mediaItems: request.mediaItems,
  };
}

function deserializeRequest(jsonRequest: GetNFTMetadataJSONRequest, core: Core): GetNFTMetadataRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    address: EvmAddress.create(jsonRequest.address),
    tokenId: jsonRequest.tokenId,
    normalizeMetadata: jsonRequest.normalizeMetadata,
    mediaItems: jsonRequest.mediaItems,
  };
}
