import { ApiResolver } from '@moralisweb3/api';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'balance';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params {
  network: 'devnet' | 'mainnet';
  address: string;
}

export const getBalanceResolver = new ApiResolver({
  name: 'getBalance',
  getUrl: (params: Params) => `${BASE_URL}/account/${params.network}/${params.address}/balance`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    address: params.address,
    network: params.network,
  }),
});
