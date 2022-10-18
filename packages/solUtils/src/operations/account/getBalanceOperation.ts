import { MoralisCore, Camelize } from '@moralisweb3/core';
import { Operation } from '@moralisweb3/api-utils';
import { SolAddress, SolAddressish, SolNative, SolNetworkish } from '../../dataTypes';
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

export interface GetBalanceJSONResponse extends SuccessResponse {}

export type GetBalanceResponse = ReturnType<typeof createResponse>;

export const getBalanceOperation: Operation<GetBalanceRequest, GetBalanceResponse, GetBalanceJSONResponse> = {
  method: 'GET',
  name: 'getBalance',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/balance',

  parseUrlParams,
  createResponse,
};

// Methods

function parseUrlParams(request: GetBalanceRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetBalanceJSONResponse) {
  return SolNative.create(jsonResponse.lamports);
}
