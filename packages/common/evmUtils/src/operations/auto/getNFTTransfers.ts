import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNftTransfersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersJSONResponse = SuccessResponse;

export type GetNftTransfersResponse = ReturnType<typeof deserializeResponse>;

export const GetNftTransfersOperation: Operation<
  GetNftTransfersRequest,
  GetNftTransfersJSONRequest,
  GetNftTransfersResponse,
  GetNftTransfersJSONResponse
> = {
  method: 'GET',
  name: 'getNFTTransfers',
  id: 'getNFTTransfers',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/{token_id}/transfers',
  urlPathParamNames: ['address','tokenId',],
  urlSearchParamNames: ['chain','format','limit','order','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftTransfersRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      format: request.format?.toString(),
      limit: request.limit?.toString(),
      order: request.order?.toString(),
      cursor: request.cursor?.toString(),
      address: request.address?.toString(),
      token_id: request.tokenId?.toString(),
  };
}

function serializeRequest(request: GetNftTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      limit: request.limit,
      order: request.order,
      cursor: request.cursor,
      address: request.address.toString(),
      tokenId: request.tokenId,
  };
}

function deserializeRequest(
  jsonRequest: GetNftTransfersJSONRequest,
  core: Core,
): GetNftTransfersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      order: jsonRequest.order,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
      tokenId: jsonRequest.tokenId,
  };
}


function deserializeResponse(jsonResponse: GetNftTransfersJSONResponse) {
  return jsonResponse;
}