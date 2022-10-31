import { Core, Camelize, PaginatedOperation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletNftTransfersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetWalletNftTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNftTransfersJSONResponse = SuccessResponse;

export type GetWalletNftTransfersResponse = ReturnType<typeof deserializeResponse>;

export const GetWalletNftTransfersOperation: PaginatedOperation<
  GetWalletNftTransfersRequest,
  GetWalletNftTransfersJSONRequest,
  GetWalletNftTransfersResponse,
  GetWalletNftTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletNFTTransfers',
  id: 'getWalletNFTTransfers',
  groupName: 'token',
  urlPathPattern: '/{address}/nft/transfers',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','format','direction','fromBlock','toBlock','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetWalletNftTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      direction: request.direction,
      from_block: maybe(request.fromBlock, String),
      to_block: request.toBlock,
      limit: maybe(request.limit, String),
      cursor: request.cursor,
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: GetWalletNftTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      direction: request.direction,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetWalletNftTransfersJSONRequest,
  core: Core,
): GetWalletNftTransfersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      direction: jsonRequest.direction,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: GetWalletNftTransfersJSONResponse) {
  return jsonResponse.result;
}