import { Core, Camelize, Operation, toCamelCase } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTMetadata';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNFTMetadataRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetNFTMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTMetadataJSONResponse = SuccessResponse;

export type GetNFTMetadataResponse = ReturnType<typeof deserializeResponse>;

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
  urlSearchParamNames: ['chain', 'format'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    tokenId: request.tokenId,
    format: request.format,
  };
}

function deserializeResponse(jsonResponse: GetNFTMetadataJSONResponse, request: GetNFTMetadataRequest, core: Core) {
  return EvmNft.create(
    {
      ...toCamelCase(jsonResponse),
      chain: EvmChainResolver.resolve(request.chain, core),
      ownerOf: jsonResponse.owner_of ? EvmAddress.create(jsonResponse.owner_of, core) : undefined,
      lastMetadataSync: jsonResponse.last_metadata_sync ? new Date(jsonResponse.last_metadata_sync) : undefined,
      lastTokenUriSync: jsonResponse.last_token_uri_sync ? new Date(jsonResponse.last_token_uri_sync) : undefined,
    },
    core,
  );
}

function serializeRequest(request: GetNFTMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    address: EvmAddress.create(request.address, core).checksum,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: GetNFTMetadataJSONRequest, core: Core): GetNFTMetadataRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}
