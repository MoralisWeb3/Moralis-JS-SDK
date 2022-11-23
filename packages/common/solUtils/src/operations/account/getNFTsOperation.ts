import { Core, Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTs';
type PathParams = operations[OperationId]['parameters']['path'];
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTsRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetNFTsJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetNFTsJSONResponse extends SuccessResponse {}

export type GetNFTsResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTsResponseAdapter extends ResponseAdapter<GetNFTsResponse, GetNFTsJSONResponse> {}

/** Gets NFTs owned by the given network and address */
export const getNFTsOperation: Operation<GetNFTsRequest, GetNFTsJSONRequest, GetNFTsResponse, GetNFTsJSONResponse> = {
  method: 'GET',
  name: 'getNFTs',
  id: 'getNFTs',
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
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetNFTsJSONRequest): GetNFTsRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
