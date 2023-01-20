import { Camelize, Core, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from 'packages/common/authUtils/src/operations/openapi';

type OperationId = 'removeBind';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface RemoveBindRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address: EvmAddressish;
}

export type RemoveBindJSONRequest = ReturnType<typeof serializeRequest>;

export type RemoveBindJSONResponse = SuccessResponse;

export type RemoveBindResponse = ReturnType<typeof deserializeResponse>;

export interface RemoveBindResponseAdapter extends ResponseAdapter<RemoveBindResponse, RemoveBindJSONResponse> {}

export const removeBindOperation: Operation<
  RemoveBindRequest,
  RemoveBindJSONRequest,
  RemoveBindResponse,
  RemoveBindJSONResponse
> = {
  method: 'POST',
  name: 'removeBind',
  id: 'removeBind',
  groupName: 'evm',
  urlPathPattern: '/bind/remove',
  bodyParamNames: ['blockchainType', 'address', 'profileId'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: RemoveBindRequest, core: Core) {
  return {
    blockchainType: request.blockchainType,
    address: EvmAddress.create(request.address, core).checksum,
    profileId: request.profileId,
  };
}

function deserializeResponse(jsonResponse: RemoveBindJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RemoveBindRequest, core: Core) {
  return {
    blockchainType: request.blockchainType,
    address: EvmAddress.create(request.address, core).checksum,
    profileId: request.profileId,
  };
}

function deserializeRequest(jsonRequest: RemoveBindJSONRequest, core: Core): RemoveBindRequest {
  return {
    blockchainType: jsonRequest.blockchainType,
    address: EvmAddress.create(jsonRequest.address, core),
    profileId: jsonRequest.profileId,
  };
}
