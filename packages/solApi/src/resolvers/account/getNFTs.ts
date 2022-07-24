import { ApiResolver } from '@moralisweb3/api';
import { Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNetworkish } from '@moralisweb3/sol-utils';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';
import { SolNetworkResolver } from '../SolNetworkResolver';

type Operation = 'getNFTs';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export const getNFTsResolver = new ApiResolver({
  name: 'getNFTs',
  getUrl: (params: Params) => {
    const network = SolNetworkResolver.resolve(params.network);
    return `${BASE_URL}/account/${network}/${params.address}/nft`;
  },
  apiToResult: (data: ApiResult) => {
    return data.map((nft) => {
      return {
        associatedTokenAddress: SolAddress.create(nft.associatedTokenAddress),
        mint: SolAddress.create(nft.mint),
      };
    });
  },
  resultToJson: (data) => {
    return data.map((nft) => {
      return {
        associatedTokenAddress: nft.associatedTokenAddress.toJSON(),
        mint: nft.mint.toJSON(),
      };
    });
  },
  parseParams: (params: Params): ApiParams => ({
    network: SolNetworkResolver.resolve(params.network),
    address: SolAddress.create(params.address).address,
  }),
});
