import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationName = 'balance';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetBalanceRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetBalanceJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetBalanceJSONResponse extends SuccessResponse {}

export type GetBalanceResponse = ReturnType<typeof deserializeResponse>;

export const getBalanceOperation: Operation<
  GetBalanceRequest,
  GetBalanceJSONRequest,
  GetBalanceResponse,
  GetBalanceJSONResponse
> = {
  method: 'GET',
  name: 'getBalance',
  operationName: 'balance',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/balance',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetBalanceRequest, core: Core) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetBalanceJSONResponse) {
  return SolNative.create(jsonResponse.lamports);
}

function serializeRequest(request: GetBalanceRequest, core: Core) {
  return {
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetBalanceJSONRequest): GetBalanceRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
