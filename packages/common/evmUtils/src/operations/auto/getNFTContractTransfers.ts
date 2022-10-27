import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTContractTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNftContractTransfersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftContractTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftContractTransfersJSONResponse = SuccessResponse;

export type GetNftContractTransfersResponse = ReturnType<typeof deserializeResponse>;

export const GetNftContractTransfersOperation: Operation<
  GetNftContractTransfersRequest,
  GetNftContractTransfersJSONRequest,
  GetNftContractTransfersResponse,
  GetNftContractTransfersJSONResponse
> = {
  method: 'GET',
  name: 'getNFTContractTransfers',
  id: 'getNFTContractTransfers',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/transfers',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','format','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftContractTransfersRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      format: request.format?.toString(),
      limit: request.limit?.toString(),
      cursor: request.cursor?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetNftContractTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNftContractTransfersJSONRequest,
  core: Core,
): GetNftContractTransfersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetNftContractTransfersJSONResponse) {
  return jsonResponse;
}