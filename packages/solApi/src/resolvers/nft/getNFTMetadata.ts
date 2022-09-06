import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNetworkish } from '@moralisweb3/sol-utils';
import { operations } from '../../generated/types';
import { SolNetworkResolver } from '../SolNetworkResolver';

type Operation = 'getNFTMetadata';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export const getNFTMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getNFTMetadata',
    urlParams: ['network', 'address'],
    getUrl: (params: Params) => {
      // TODO: here should be: const network = SolNetworkResolver.resolve(params.network, core);
      // but it's not working with Endpoints.getDescriptors(). After changes described in Endpoints
      // please replace this line.
      const network = params.network ? params.network : SolNetworkResolver.resolve(undefined, core);
      return `/nft/${network}/${params.address}/metadata`;
    },
    apiToResult: (data: ApiResult) => {
      return {
        mint: SolAddress.create(data.mint),
        standard: data.standard,
        name: data.name,
        symbol: data.symbol,
        metaplex: {
          metadataUri: data.metaplex.metadataUri,
          updateAuthority: SolAddress.create(data.metaplex.updateAuthority),
          sellerFeeBasisPoints: data.metaplex.sellerFeeBasisPoints,
          primarySaleHappened: data.metaplex.primarySaleHappened,
          isMutable: data.metaplex.isMutable,
          masterEdition: data.metaplex.masterEdition,
        },
      };
    },
    resultToJson: (data) => {
      return {
        mint: data.mint.toJSON(),
        standard: data.standard,
        name: data.name,
        symbol: data.symbol,
        metaplex: {
          metadataUri: data.metaplex.metadataUri,
          updateAuthority: data.metaplex.updateAuthority.toJSON(),
          sellerFeeBasisPoints: data.metaplex.sellerFeeBasisPoints,
          primarySaleHappened: data.metaplex.primarySaleHappened,
          isMutable: data.metaplex.isMutable,
          masterEdition: data.metaplex.masterEdition,
        },
      };
    },
    parseParams: (params: Params): ApiParams => ({
      network: SolNetworkResolver.resolve(params.network, core),
      address: SolAddress.create(params.address).address,
    }),
  }),
);
