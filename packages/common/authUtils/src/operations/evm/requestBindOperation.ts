import { Camelize, Core, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from '../openapi';

type OperationId = 'requestBind';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface RequestBindRequest extends Camelize<Omit<RequestParams, 'addresses'>> {
  addresses: {
    blockchainType: 'evm' | 'solana';
    address: EvmAddressish;
  }[];
}

export type RequestBindJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestBindJSONResponse = SuccessResponse;

export type RequestBindResponse = ReturnType<typeof deserializeResponse>;

export interface RequestBindResponseAdapter extends ResponseAdapter<RequestBindResponse, RequestBindJSONResponse> {}

export const requestBindOperation: Operation<
  RequestBindRequest,
  RequestBindJSONRequest,
  RequestBindResponse,
  RequestBindJSONResponse
> = {
  method: 'POST',
  name: 'requestBind',
  id: 'requestBind',
  groupName: 'evm',
  urlPathPattern: '/bind/request',
  bodyParamNames: ['addresses'],
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

function getRequestBody(request: RequestBindRequest, core: Core) {
  return {
    addresses: request.addresses.map((address) => ({
      blockchainType: address.blockchainType,
      address: EvmAddress.create(address.address).checksum,
    })),
  };
}

function deserializeResponse(jsonResponse: RequestBindJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RequestBindRequest, core: Core) {
  return {
    addresses: request.addresses.map((address) => ({
      blockchainType: address.blockchainType,
      address: EvmAddress.create(address.address).checksum,
    })),
  };
}

function deserializeRequest(jsonRequest: RequestBindJSONRequest, core: Core): RequestBindRequest {
  return {
    addresses: jsonRequest.addresses.map((address) => ({
      blockchainType: address.blockchainType,
      address: EvmAddress.create(address.address),
    })),
  };
}
