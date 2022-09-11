import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { SolAddress,SolNetworkish, SolAddressish } from '@moralisweb3/sol-utils';
import { operations } from '../../generated/types';
import { SolNetworkResolver } from '../SolNetworkResolver';

type Operation = 'getTokenPrice';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export const getTokenPrice = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getTokenPrice',
    urlParams: ['network', 'address'],
    getUrl: (params: Params) => {
      // TODO: here should be: const network = SolNetworkResolver.resolve(params.network, core);
      // but it's not working with Endpoints.getDescriptors(). After changes described in Endpoints
      // please replace this line.
      const network = params.network ? params.network : SolNetworkResolver.resolve(undefined, core);
      return `token/${network}/${params.address}/price`;

      
    },
    apiToResult: (data: ApiResult) => {
      return {
        nativePrice: {
          value: data.nativePrice.value,
          decimals: data.nativePrice.decimals,
          name: data.nativePrice.name,
          symbol : data.nativePrice.symbol
        },
        usdPrice: data.usdPrice,
        exchangeAddress: data.exchangeAddress,
        exchangeName: data.exchangeName
      };
    },
    resultToJson: (data) => {
      return {
        nativePrice: {
          value: data.nativePrice.value,
          decimals: data.nativePrice.decimals,
          name: data.nativePrice.name,
          symbol : data.nativePrice.symbol
        },
        usdPrice: data.usdPrice,
        exchangeAddress: data.exchangeAddress,
        exchangeName: data.exchangeName
      };
    },
    parseParams: (params: Params): ApiParams => ({
      network: SolNetworkResolver.resolve(params.network, core),
      address: SolAddress.create(params.address).address,
    }),
  }),
);
