import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsGet';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStreamAptosRequest extends Camelize<RequestParams> {}

export type GetStreamAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStreamAptosJSONResponse = SuccessResponse;

export type GetStreamAptosResponse = ReturnType<typeof deserializeResponse>;

export interface GetStreamAptosResponseAdapter
  extends ResponseAdapter<GetStreamAptosResponse, GetStreamAptosJSONResponse> {}

export const getStreamAptosOperation: Operation<
  GetStreamAptosRequest,
  GetStreamAptosJSONRequest,
  GetStreamAptosResponse,
  GetStreamAptosJSONResponse
> = {
  method: 'GET',
  name: 'getStreamAptos',
  id: 'GetStream',
  groupName: 'aptosStreams',
  urlPathPattern: '/streams/aptos/{id}',
  urlPathParamNames: ['id'],

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStreamAptosRequest) {
  return {
    id: request.id,
  };
}

function deserializeResponse(jsonResponse: GetStreamAptosJSONResponse) {
  return AptosStream.create(jsonResponse);
}

function serializeRequest(request: GetStreamAptosRequest) {
  return {
    id: request.id,
  };
}

function deserializeRequest(jsonRequest: GetStreamAptosJSONRequest): GetStreamAptosRequest {
  return {
    id: jsonRequest.id,
  };
}
