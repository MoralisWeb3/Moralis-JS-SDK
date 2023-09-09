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

type OperationId = 'getContractNFTs';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetContractNFTsRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetContractNFTsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetContractNFTsJSONResponse = SuccessResponse;

export type GetContractNFTsResponse = ReturnType<typeof deserializeResponse>;

export interface GetContractNFTsResponseAdapter
  extends PaginatedResponseAdapter<GetContractNFTsResponse, GetContractNFTsJSONResponse['result']> {}

/**
 * Get NFTs for a given contract address, including metadata for all NFTs (where available).
 * * Results are limited to 100 per page by default
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
 */
export const getContractNFTsOperation: PaginatedOperation<
  GetContractNFTsRequest,
  GetContractNFTsJSONRequest,
  GetContractNFTsResponse,
  GetContractNFTsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getContractNFTs',
  id: 'getContractNFTs',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}',
  urlPathParamNames: ['address'],
  urlSearchParamNames: [
    'chain',
    'format',
    'limit',
    'totalRanges',
    'range',
    'cursor',
    'normalizeMetadata',
    'mediaItems',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods
function getRequestUrlParams(request: GetContractNFTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    totalRanges: maybe(request.totalRanges, String),
    range: maybe(request.range, String),
    cursor: request.cursor,
    normalizeMetadata: request.normalizeMetadata,
    media_items: request.mediaItems,
  };
}

function deserializeResponse(jsonResponse: GetContractNFTsJSONResponse, request: GetContractNFTsRequest, core: Core) {
  return (jsonResponse.result ?? []).map((data) => {
    const chain = EvmChainResolver.resolve(request.chain, core);
    const nft = toCamelCase(data);
    return EvmNft.create({
      ...toCamelCase(nft),
      chain,
      ownerOf: nft.ownerOf ? EvmAddress.create(nft.ownerOf) : undefined,
      lastMetadataSync: nft.lastMetadataSync ? new Date(nft.lastMetadataSync) : undefined,
      lastTokenUriSync: nft.lastTokenUriSync ? new Date(nft.lastTokenUriSync) : undefined,
      media: maybe(nft.media, (media) =>
        EvmNftMedia.create({
          chain,
          ...toCamelCase(media),
        }),
      ),
    });
  });
}

function serializeRequest(request: GetContractNFTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    totalRanges: request.totalRanges,
    range: request.range,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    normalizeMetadata: request.normalizeMetadata,
    mediaItems: request.mediaItems,
  };
}

function deserializeRequest(jsonRequest: GetContractNFTsJSONRequest): GetContractNFTsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    totalRanges: jsonRequest.totalRanges,
    range: jsonRequest.range,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    normalizeMetadata: jsonRequest.normalizeMetadata,
    mediaItems: jsonRequest.mediaItems,
  };
}
