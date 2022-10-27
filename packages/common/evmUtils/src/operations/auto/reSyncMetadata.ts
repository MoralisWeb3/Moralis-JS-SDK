import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'reSyncMetadata';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface ReSyncMetadataRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type ReSyncMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type ReSyncMetadataJSONResponse = SuccessResponse;

export type ReSyncMetadataResponse = ReturnType<typeof deserializeResponse>;

export const ReSyncMetadataOperation: Operation<
  ReSyncMetadataRequest,
  ReSyncMetadataJSONRequest,
  ReSyncMetadataResponse,
  ReSyncMetadataJSONResponse
> = {
  method: 'GET',
  name: 'reSyncMetadata',
  id: 'reSyncMetadata',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/{token_id}/metadata/resync',
  urlPathParamNames: ['address','tokenId',],
  urlSearchParamNames: ['chain','flag','mode',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: ReSyncMetadataRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      flag: request.flag?.toString(),
      mode: request.mode?.toString(),
      address: request.address?.toString(),
      token_id: request.tokenId?.toString(),
  };
}

function serializeRequest(request: ReSyncMetadataRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      flag: request.flag,
      mode: request.mode,
      address: request.address.toString(),
      tokenId: request.tokenId,
  };
}

function deserializeRequest(
  jsonRequest: ReSyncMetadataJSONRequest,
  core: Core,
): ReSyncMetadataRequest {
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