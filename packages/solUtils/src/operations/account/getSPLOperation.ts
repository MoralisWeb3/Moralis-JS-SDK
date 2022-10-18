import { MoralisCore, Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';
import { Operation } from '@moralisweb3/api-utils';

type OperationName = 'getSPL';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetSPLRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export interface GetSPLJSONResponse extends SuccessResponse {}

export type GetSPLResponse = ReturnType<typeof createResponse>;

export const getSPLOperation: Operation<GetSPLRequest, GetSPLResponse, GetSPLJSONResponse> = {
  method: 'GET',
  name: 'getSPL',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/tokens',

  parseUrlParams,
  createResponse,
};

// Methods

function parseUrlParams(request: GetSPLRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetSPLJSONResponse) {
  return jsonResponse.map((token) => {
    return {
      associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
      mint: SolAddress.create(token.mint),
      amount: SolNative.create(token.amountRaw, 'lamports'),
    };
  });
}
