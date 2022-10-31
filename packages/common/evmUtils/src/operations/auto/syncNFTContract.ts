import { Core, Camelize, Operation,  } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'syncNFTContract';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface SyncNftContractRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type SyncNftContractJSONRequest = ReturnType<typeof serializeRequest>;

export type SyncNftContractJSONResponse = SuccessResponse;

export type SyncNftContractResponse = ReturnType<typeof deserializeResponse>;

export const SyncNftContractOperation: Operation<
  SyncNftContractRequest,
  SyncNftContractJSONRequest,
  SyncNftContractResponse,
  SyncNftContractJSONResponse
> = {
  method: 'PUT',
  name: 'syncNFTContract',
  id: 'syncNFTContract',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/sync',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: SyncNftContractRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: SyncNftContractRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: SyncNftContractJSONRequest,
  core: Core,
): SyncNftContractRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: SyncNftContractJSONResponse) {
  return jsonResponse;
}