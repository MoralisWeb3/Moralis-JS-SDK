import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmStream } from '@moralisweb3/common-streams-utils';
import { operations } from '../../generated/types';

type OperationId = 'GetStream';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStreamEvmRequest extends Camelize<RequestParams> {}

export type GetStreamEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStreamEvmJSONResponse = SuccessResponse;

export type GetStreamEvmResponse = ReturnType<typeof deserializeResponse>;

export const getStreamEvmOperation: Operation<
  GetStreamEvmRequest,
  GetStreamEvmJSONRequest,
  GetStreamEvmResponse,
  GetStreamEvmJSONResponse
> = {
  method: 'GET',
  name: 'getStream',
  id: 'getStream',
  groupName: 'streams',
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
