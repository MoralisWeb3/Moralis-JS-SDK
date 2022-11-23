import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationId = 'getSPL';
type PathParams = operations[OperationId]['parameters']['path'];
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetSPLRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetSPLJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetSPLJSONResponse extends SuccessResponse {}

export type GetSPLResponse = ReturnType<typeof deserializeResponse>;

export interface GetSPLResponseAdapter extends ResponseAdapter<GetSPLResponse, GetSPLJSONResponse> {}

/** Gets token balances owned by the given network and address */
export const getSPLOperation: Operation<GetSPLRequest, GetSPLJSONRequest, GetSPLResponse, GetSPLJSONResponse> = {
  method: 'GET',
  name: 'getSPL',
  id: 'getSPL',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/tokens',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetSPLRequest, core: Core) {
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

function serializeRequest(request: GetSPLRequest, core: Core) {
  return {
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetSPLJSONRequest): GetSPLRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
