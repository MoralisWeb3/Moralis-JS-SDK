import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'reSyncMetadata';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ReSyncMetadataRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type ReSyncMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type ReSyncMetadataJSONResponse = SuccessResponse;

export type ReSyncMetadataResponse = ReturnType<typeof deserializeResponse>;

export interface ReSyncMetadataResponseAdapter
  extends ResponseAdapter<ReSyncMetadataResponse, ReSyncMetadataJSONResponse> {}

/**
 * ReSync the metadata for an NFT
 * * The metadata flag will request a the NFT's metadata from the already existing token_uri
 * * The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
 * * The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
 * * The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding
 */
export const reSyncMetadataOperation: Operation<
  ReSyncMetadataRequest,
  ReSyncMetadataJSONRequest,
  ReSyncMetadataResponse,
  ReSyncMetadataJSONResponse
> = {
  method: 'GET',
  name: 'reSyncMetadata',
  id: 'reSyncMetadata',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{tokenId}/metadata/resync',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'flag', 'mode'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: ReSyncMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    flag: request.flag,
    mode: request.mode,
    tokenId: request.tokenId,
  };
}

function serializeRequest(request: ReSyncMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    flag: request.flag,
    mode: request.mode,
    address: EvmAddress.create(request.address, core).checksum,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: ReSyncMetadataJSONRequest, core: Core): ReSyncMetadataRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    flag: jsonRequest.flag,
    mode: jsonRequest.mode,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}

function deserializeResponse(jsonResponse: ReSyncMetadataJSONResponse) {
  return jsonResponse;
}
