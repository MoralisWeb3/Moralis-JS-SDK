import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersFromToBlock';



type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams =  & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNftTransfersFromToBlockRequest extends Camelize<Omit<RequestParams,  | 'chain'>> {
      chain?: EvmChainish;
}

export type GetNftTransfersFromToBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersFromToBlockJSONResponse = SuccessResponse;

export type GetNftTransfersFromToBlockResponse = ReturnType<typeof deserializeResponse>;

export const GetNftTransfersFromToBlockOperation: Operation<
  GetNftTransfersFromToBlockRequest,
  GetNftTransfersFromToBlockJSONRequest,
  GetNftTransfersFromToBlockResponse,
  GetNftTransfersFromToBlockJSONResponse
> = {
  method: 'GET',
  name: 'getNFTTransfersFromToBlock',
  id: 'getNFTTransfersFromToBlock',
  groupName: 'token',
  urlPathPattern: '/nft/transfers',
  
  urlSearchParamNames: ['chain','fromBlock','toBlock','fromDate','toDate','format','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftTransfersFromToBlockRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      from_block: maybe(request.fromBlock, String),
      to_block: maybe(request.toBlock, String),
      from_date: request.fromDate,
      to_date: request.toDate,
      format: request.format,
      limit: maybe(request.limit, String),
      cursor: request.cursor,
  };
}

function serializeRequest(request: GetNftTransfersFromToBlockRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      format: request.format,
      limit: request.limit,
      cursor: request.cursor,
  };
}

function deserializeRequest(
  jsonRequest: GetNftTransfersFromToBlockJSONRequest,
  core: Core,
): GetNftTransfersFromToBlockRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      format: jsonRequest.format,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
  };
}

function deserializeResponse(jsonResponse: GetNftTransfersFromToBlockJSONResponse, request: GetNftTransfersFromToBlockRequest, core: Core) {
   return jsonResponse;
}
