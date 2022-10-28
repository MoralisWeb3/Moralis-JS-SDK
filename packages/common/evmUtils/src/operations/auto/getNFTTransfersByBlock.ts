import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersByBlock';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNftTransfersByBlockRequest extends Camelize<Omit<RequestParams,  | 'chain'>> {
      chain?: EvmChainish;
}

export type GetNftTransfersByBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersByBlockJSONResponse = SuccessResponse;

export type GetNftTransfersByBlockResponse = ReturnType<typeof deserializeResponse>;

export const GetNftTransfersByBlockOperation: Operation<
  GetNftTransfersByBlockRequest,
  GetNftTransfersByBlockJSONRequest,
  GetNftTransfersByBlockResponse,
  GetNftTransfersByBlockJSONResponse
> = {
  method: 'GET',
  name: 'getNFTTransfersByBlock',
  id: 'getNFTTransfersByBlock',
  groupName: 'token',
  urlPathPattern: '/block/{block_number_or_hash}/nft/transfers',
  urlPathParamNames: ['blockNumberOrHash',],
  urlSearchParamNames: ['chain','subdomain','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftTransfersByBlockRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      limit: maybe(request.limit, String),
      cursor: request.cursor,
      block_number_or_hash: request.blockNumberOrHash,
  };
}

function serializeRequest(request: GetNftTransfersByBlockRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      limit: request.limit,
      cursor: request.cursor,
      blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeRequest(
  jsonRequest: GetNftTransfersByBlockJSONRequest,
  core: Core,
): GetNftTransfersByBlockRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      blockNumberOrHash: jsonRequest.blockNumberOrHash,
  };
}

function deserializeResponse(jsonResponse: GetNftTransfersByBlockJSONResponse, request: GetNftTransfersByBlockRequest, core: Core) {
   return jsonResponse;
}
