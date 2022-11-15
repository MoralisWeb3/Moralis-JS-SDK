import { Core, Camelize, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
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
  urlSearchParamNames: ['chain', 'format', 'limit', 'totalRanges', 'range', 'cursor'],
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
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    totalRanges: maybe(request.totalRanges, String),
    range: maybe(request.range, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetContractNFTsJSONResponse, request: GetContractNFTsRequest, core: Core) {
  return (jsonResponse.result ?? []).map((nft) =>
    EvmNft.create(
      {
        ...toCamelCase(nft),
        chain: EvmChainResolver.resolve(request.chain, core),
        ownerOf: nft.owner_of ? EvmAddress.create(nft.owner_of, core) : undefined,
        lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
        lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
      },
      core,
    ),
  );
}

function serializeRequest(request: GetContractNFTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    totalRanges: request.totalRanges,
    range: request.range,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetContractNFTsJSONRequest, core: Core): GetContractNFTsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    totalRanges: jsonRequest.totalRanges,
    range: jsonRequest.range,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
