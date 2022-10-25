import { MoralisCore, Camelize, Operation } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationName = 'getNFTMetadata';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTMetadataRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetNFTMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetNFTMetadataJSONResponse extends SuccessResponse {}

export type GetNFTMetadataResponse = ReturnType<typeof deserializeResponse>;

export const getNFTMetadataOperation: Operation<
  GetNFTMetadataRequest,
  GetNFTMetadataJSONRequest,
  GetNFTMetadataResponse,
  GetNFTMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTMetadata',
  groupName: 'nft',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/nft/{network}/{address}/metadata',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetNFTMetadataRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetNFTMetadataJSONResponse) {
  return {
    mint: SolAddress.create(jsonResponse.mint),
    standard: jsonResponse.standard,
    name: jsonResponse.name,
    symbol: jsonResponse.symbol,
    metaplex: {
      metadataUri: jsonResponse.metaplex.metadataUri,
      updateAuthority: SolAddress.create(jsonResponse.metaplex.updateAuthority),
      sellerFeeBasisPoints: jsonResponse.metaplex.sellerFeeBasisPoints,
      primarySaleHappened: jsonResponse.metaplex.primarySaleHappened,
      isMutable: jsonResponse.metaplex.isMutable,
      masterEdition: jsonResponse.metaplex.masterEdition,
    },
  };
}

function serializeRequest(request: GetNFTMetadataRequest, core: MoralisCore) {
  return {
    address: request.address.toString(),
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetNFTMetadataJSONRequest): GetNFTMetadataRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
