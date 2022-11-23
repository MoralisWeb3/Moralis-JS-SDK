import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'syncNFTContract';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['201'];
// Exports

export interface SyncNFTContractRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type SyncNFTContractJSONRequest = ReturnType<typeof serializeRequest>;

export type SyncNFTContractJSONResponse = SuccessResponse;

export type SyncNFTContractResponse = ReturnType<typeof deserializeResponse>;

export interface SyncNFTContractResponseAdapter
  extends ResponseAdapter<SyncNFTContractResponse, SyncNFTContractJSONResponse> {}

/** Initiates a sync of a previously non synced Contract. */
export const syncNFTContractOperation: Operation<
  SyncNFTContractRequest,
  SyncNFTContractJSONRequest,
  SyncNFTContractResponse,
  SyncNFTContractJSONResponse
> = {
  method: 'PUT',
  name: 'syncNFTContract',
  id: 'syncNFTContract',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/sync',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: SyncNFTContractRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeResponse() {
  return {
    success: true,
  };
}

function serializeRequest(request: SyncNFTContractRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: SyncNFTContractJSONRequest, core: Core): SyncNFTContractRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
