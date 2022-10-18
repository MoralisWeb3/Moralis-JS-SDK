import { MoralisCore, Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';
import { Operation } from '@moralisweb3/api-utils';

type OperationName = 'getNFTs';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTsRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export interface GetNFTsJSONResponse extends SuccessResponse {}

export type GetNFTsResponse = ReturnType<typeof createResponse>;

export const getNFTsOperation: Operation<GetNFTsRequest, GetNFTsResponse, GetNFTsJSONResponse> = {
  method: 'GET',
  name: 'getNFTs',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/nft',

  parseUrlParams,
  createResponse,
};

// Methods

function parseUrlParams(request: GetNFTsRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetNFTsJSONResponse) {
  return jsonResponse.map((item) => {
    return {
      associatedTokenAddress: SolAddress.create(item.associatedTokenAddress),
      mint: SolAddress.create(item.mint),
    };
  });
}
