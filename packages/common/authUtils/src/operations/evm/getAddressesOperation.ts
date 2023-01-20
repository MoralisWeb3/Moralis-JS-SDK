import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from 'packages/common/authUtils/src/operations/openapi';

type OperationId = 'getAddresses';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface GetAddressesRequest extends Camelize<RequestParams> {}

export type GetAddressesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetAddressesJSONResponse = SuccessResponse;

export type GetAddressesResponse = ReturnType<typeof deserializeResponse>;

export interface GetAddressesResponseAdapter extends ResponseAdapter<GetAddressesResponse, GetAddressesJSONResponse> {}

export const getAddressesOperation: Operation<
  GetAddressesRequest,
  GetAddressesJSONRequest,
  GetAddressesResponse,
  GetAddressesJSONResponse
> = {
  method: 'GET',
  name: 'getAddresses',
  id: 'getAddresses',
  groupName: 'evm',
  urlPathPattern: '/profile/{profileId}/addresses',
  urlPathParamNames: ['profileId'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetAddressesRequest) {
  return {
    profileId: request.profileId,
  };
}

function deserializeResponse(jsonResponse: GetAddressesJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: GetAddressesRequest) {
  return request;
}

function deserializeRequest(jsonRequest: GetAddressesJSONRequest): GetAddressesRequest {
  return jsonRequest;
}
