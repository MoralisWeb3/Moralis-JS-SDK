import { MoralisCore, Camelize, Operation } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationName = 'getSPL';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetSPLRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetSPLJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetSPLJSONResponse extends SuccessResponse {}

export type GetSPLResponse = ReturnType<typeof deserializeResponse>;

export const getSPLOperation: Operation<GetSPLRequest, GetSPLJSONRequest, GetSPLResponse, GetSPLJSONResponse> = {
  method: 'GET',
  name: 'getSPL',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/tokens',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetSPLRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetSPLJSONResponse) {
  return jsonResponse.map((token) => {
    return {
      associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
      mint: SolAddress.create(token.mint),
      amount: SolNative.create(token.amountRaw, 'lamports'),
    };
  });
}

function serializeRequest(request: GetSPLRequest, core: MoralisCore) {
  return {
    address: request.address.toString(),
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetSPLJSONRequest): GetSPLRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
