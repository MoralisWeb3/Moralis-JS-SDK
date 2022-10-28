import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getBlock';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetBlockRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetBlockJSONResponse = SuccessResponse;

export type GetBlockResponse = ReturnType<typeof deserializeResponse>;

export const GetBlockOperation: Operation<
  GetBlockRequest,
  GetBlockJSONRequest,
  GetBlockResponse,
  GetBlockJSONResponse
> = {
  method: 'GET',
  name: 'getBlock',
  id: 'getBlock',
  groupName: 'token',
  urlPathPattern: '/block/{block_number_or_hash}',
  urlPathParamNames: ['blockNumberOrHash'],
  urlSearchParamNames: ['chain', 'subdomain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    block_number_or_hash: request.blockNumberOrHash,
  };
}

function serializeRequest(request: GetBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeRequest(jsonRequest: GetBlockJSONRequest, core: Core): GetBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    blockNumberOrHash: jsonRequest.blockNumberOrHash,
  };
}

function deserializeResponse(jsonResponse: GetBlockJSONResponse) {
  return jsonResponse;
}
