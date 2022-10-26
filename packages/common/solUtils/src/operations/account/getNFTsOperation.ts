import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationName = 'getNFTs';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTsRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetNFTsJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetNFTsJSONResponse extends SuccessResponse {}

export type GetNFTsResponse = ReturnType<typeof deserializeResponse>;

export const getNFTsOperation: Operation<GetNFTsRequest, GetNFTsJSONRequest, GetNFTsResponse, GetNFTsJSONResponse> = {
  method: 'GET',
  name: 'getNFTs',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/nft',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetNFTsRequest, core: Core) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetNFTsJSONResponse) {
  return jsonResponse.map((item) => {
    return {
      associatedTokenAddress: SolAddress.create(item.associatedTokenAddress),
      mint: SolAddress.create(item.mint),
    };
  });
}

function serializeRequest(request: GetNFTsRequest, core: Core) {
  return {
    address: request.address.toString(),
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetNFTsJSONRequest): GetNFTsRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
