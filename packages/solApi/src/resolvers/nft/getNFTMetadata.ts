import { ApiResolver } from '@moralisweb3/api';
import { Camelize, SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'getNFTMetadata';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network: SolNetworkish;
  address: SolAddressish;
}

export const getNFTMetadataResolver = new ApiResolver({
  name: 'getNFTMetadata',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.network}/${params.address}/metadata`,
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
    network: SolNetwork.create(params.network).network,
    address: SolAddress.create(params.address).address,
  }),
});
