import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { ApiErrorCode, Camelize, MoralisApiError } from '@moralisweb3/core';
import { SolAddress, SolNetworkish, SolAddressish, SolNative } from '@moralisweb3/sol-utils';
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
      return `/token/${network}/${params.address}/price`;
    },
    apiToResult: (data: ApiResult) => {
      return {
        nativePrice: {
          value: SolNative.create(data.nativePrice.value, 'solana'),
          decimals: data.nativePrice.decimals,
          name: data.nativePrice.name,
          symbol: data.nativePrice.symbol,
        },
        usdPrice: data.usdPrice,
        exchangeAddress: SolAddress.create(data.exchangeAddress),
        exchangeName: data.exchangeName,
      };
    },
    resultToJson: (data) => {
      return {
        nativePrice: {
          value: data.nativePrice.value.toJSON(),
          decimals: data.nativePrice.decimals,
          name: data.nativePrice.name,
          symbol: data.nativePrice.symbol,
        },
        usdPrice: data.usdPrice,
        exchangeAddress: data.exchangeAddress.toJSON(),
        exchangeName: data.exchangeName,
      };
    },
    parseParams: (params: Params): ApiParams => {
      const network = SolNetworkResolver.resolve(params.network, core);

      if (network !== 'mainnet') {
        throw new MoralisApiError({
          message: `Incorrct value for 'network', getTokenPrice is only available on mainnet`,
          code: ApiErrorCode.INVALID_PARAMS,
        });
      }

      return {
        network,
        address: SolAddress.create(params.address).address,
      };
    },
  }),
);
