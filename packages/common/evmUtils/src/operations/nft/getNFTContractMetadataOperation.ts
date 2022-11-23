import { Core, Camelize, Operation, toCamelCase, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftMetadata } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTContractMetadata';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTContractMetadataRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTContractMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTContractMetadataJSONResponse = SuccessResponse;

export type GetNFTContractMetadataResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTContractMetadataResponseAdapter
  extends ResponseAdapter<GetNFTContractMetadataResponse, GetNFTContractMetadataJSONResponse> {}

/**
 * Get the collection / contract level metadata for a given contract (name, symbol, base token uri).
 * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
 */
export const getNFTContractMetadataOperation: Operation<
  GetNFTContractMetadataRequest,
  GetNFTContractMetadataJSONRequest,
  GetNFTContractMetadataResponse,
  GetNFTContractMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTContractMetadata',
  id: 'getNFTContractMetadata',
  groupName: 'nft',
  isNullable: true,
  urlPathPattern: '/nft/{address}/metadata',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTContractMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTContractMetadataJSONResponse,
  request: GetNFTContractMetadataRequest,
  core: Core,
) {
  return EvmNftMetadata.create({
    ...toCamelCase(jsonResponse),
    chain: EvmChainResolver.resolve(request.chain, core),
    tokenAddress: EvmAddress.create(jsonResponse.token_address, core),
    syncedAt: jsonResponse.synced_at ? new Date(jsonResponse.synced_at) : null,
    contractType: maybe(jsonResponse.contract_type),
  });
}

function serializeRequest(request: GetNFTContractMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetNFTContractMetadataJSONRequest, core: Core): GetNFTContractMetadataRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
