import { MoralisCore, Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';
import { Operation } from '@moralisweb3/api-utils';

type OperationName = 'getNFTMetadata';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTMetadataRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export interface GetNFTMetadataJSONResponse extends SuccessResponse {}

export type GetNFTMetadataResponse = ReturnType<typeof createResponse>;

export const getNFTMetadataOperation: Operation<
  GetNFTMetadataRequest,
  GetNFTMetadataResponse,
  GetNFTMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getNFTMetadata',
  groupName: 'nft',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/nft/{network}/{address}/metadata',

  parseUrlParams,
  createResponse,
};

// Methods

function parseUrlParams(request: GetNFTMetadataRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetNFTMetadataJSONResponse) {
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
