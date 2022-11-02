import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTransaction';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetTransactionRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetTransactionJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTransactionJSONResponse = SuccessResponse;

export type GetTransactionResponse = ReturnType<typeof deserializeResponse>;

export const GetTransactionOperation: Operation<
  GetTransactionRequest,
  GetTransactionJSONRequest,
  GetTransactionResponse,
  GetTransactionJSONResponse
> = {
  method: 'GET',
  name: 'getTransaction',
  id: 'getTransaction',
  groupName: 'token',
  urlPathPattern: '/transaction/{transaction_hash}',
  urlPathParamNames: ['transactionHash'],
  urlSearchParamNames: ['chain', 'subdomain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

function getRequestUrlParams(request: GetTransactionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    transaction_hash: request.transactionHash,
  };
}

function serializeRequest(request: GetTransactionRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    transactionHash: request.transactionHash,
  };
}

function deserializeRequest(jsonRequest: GetTransactionJSONRequest, core: Core): GetTransactionRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    transactionHash: jsonRequest.transactionHash,
  };
}

function deserializeResponse(jsonResponse: GetTransactionJSONResponse) {
  return jsonResponse;
}
