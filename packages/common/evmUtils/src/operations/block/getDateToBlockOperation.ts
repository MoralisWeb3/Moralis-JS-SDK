import { Core, Camelize, Operation, DateInput, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmBlockDate, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getDateToBlock';

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetDateToBlockRequest extends Camelize<Omit<RequestParams, 'chain' | 'date'>> {
  chain?: EvmChainish;
  date: DateInput;
}

export type GetDateToBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetDateToBlockJSONResponse = SuccessResponse;

export type GetDateToBlockResponse = ReturnType<typeof deserializeResponse>;

export interface GetDateToBlockResponseAdapter
  extends ResponseAdapter<GetDateToBlockResponse, GetDateToBlockJSONResponse> {}

/** Get the closest block given the date. */
export const getDateToBlockOperation: Operation<
  GetDateToBlockRequest,
  GetDateToBlockJSONRequest,
  GetDateToBlockResponse,
  GetDateToBlockJSONResponse
> = {
  method: 'GET',
  name: 'getDateToBlock',
  id: 'getDateToBlock',
  groupName: 'block',
  urlPathPattern: '/dateToBlock',
  urlSearchParamNames: ['chain', 'date'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetDateToBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    date: new Date(request.date).toISOString(),
  };
}

function deserializeResponse(jsonResponse: GetDateToBlockJSONResponse) {
  return EvmBlockDate.create(jsonResponse);
}

function serializeRequest(request: GetDateToBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    date: new Date(request.date).toISOString(),
  };
}

function deserializeRequest(jsonRequest: GetDateToBlockJSONRequest, core: Core): GetDateToBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    date: new Date(jsonRequest.date),
  };
}
