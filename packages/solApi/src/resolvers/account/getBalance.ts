import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNetworkish, SolNative } from '@moralisweb3/sol-utils';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';
import { SolNetworkResolver } from '../SolNetworkResolver';

type Operation = 'balance';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export const getBalance = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getBalance',
    getUrl: (params: Params) => {
      const network = SolNetworkResolver.resolve(params.network, core);
      return `${BASE_URL}/account/${network}/${params.address}/balance`;
    },
    apiToResult: (data: ApiResult) => {
      return SolNative.create(data.lamports, 'lamports');
    },
    resultToJson: (data) => {
      return data.toJSON();
    },
    parseParams: (params: Params): ApiParams => ({
      network: SolNetworkResolver.resolve(params.network, core),
      address: SolAddress.create(params.address).address,
    }),
  }),
);
