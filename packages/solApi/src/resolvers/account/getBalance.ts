import { ApiResolver } from '@moralisweb3/api';
import { Camelize, SolAddress, SolAddressish, SolNetwork, SolNetworkish, SolNative } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'balance';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network: SolNetworkish;
  address: SolAddressish;
}

export const getBalanceResolver = new ApiResolver({
  name: 'getBalance',
  getUrl: (params: Params) => `${BASE_URL}/account/${params.network}/${params.address}/balance`,
  apiToResult: (data: ApiResult) => {
    return SolNative.create(data.lamports, 'lamports');
  },
  resultToJson: (data) => {
    return data.toJSON();
  },
  parseParams: (params: Params): ApiParams => ({
    network: SolNetwork.create(params.network).network,
    address: SolAddress.create(params.address).address,
  }),
});
