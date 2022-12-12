import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'GetStream';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStreamEvmRequest extends Camelize<RequestParams> {}

export type GetStreamEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStreamEvmJSONResponse = SuccessResponse;

export type GetStreamEvmResponse = ReturnType<typeof deserializeResponse>;

export interface GetStreamEvmResponseAdapter extends ResponseAdapter<GetStreamEvmResponse, GetStreamEvmJSONResponse> {}

export const getStreamEvmOperation: Operation<
  GetStreamEvmRequest,
  GetStreamEvmJSONRequest,
  GetStreamEvmResponse,
  GetStreamEvmJSONResponse
> = {
  method: 'GET',
  name: 'getStreamEvm',
  id: 'GetStream',
  groupName: 'evmStreams',
  urlPathPattern: '/streams/evm/{id}',
  urlPathParamNames: ['id'],

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStreamEvmRequest) {
  return {
    id: request.id,
  };
}

function deserializeResponse(jsonResponse: GetStreamEvmJSONResponse, request: GetStreamEvmRequest, core: Core) {
  return EvmStream.create(jsonResponse, core);
}

function serializeRequest(request: GetStreamEvmRequest) {
  return {
    id: request.id,
  };
}

function deserializeRequest(jsonRequest: GetStreamEvmJSONRequest): GetStreamEvmRequest {
  return {
    id: jsonRequest.id,
  };
}
