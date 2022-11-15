import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTMetadata';
type PathParams = operations[OperationId]['parameters']['path'];
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTMetadataRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetNFTMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetNFTMetadataJSONResponse extends SuccessResponse {}

export type GetNFTMetadataResponse = ReturnType<typeof deserializeResponse>;

/** Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given network and contract */
export const getNFTMetadataOperation: Operation<
  GetNFTMetadataRequest,
  GetNFTMetadataJSONRequest,
  GetNFTMetadataResponse,
  GetNFTMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTMetadata',
  id: 'getNFTMetadata',
  groupName: 'nft',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/nft/{network}/{address}/metadata',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetNFTMetadataRequest, core: Core) {
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

function serializeRequest(request: GetNFTMetadataRequest, core: Core) {
  return {
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetNFTMetadataJSONRequest): GetNFTMetadataRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
