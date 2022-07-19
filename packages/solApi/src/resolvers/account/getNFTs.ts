import { ApiResolver } from '@moralisweb3/api';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'getNFTs';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params {
  network: 'devnet' | 'mainnet';
  address: string;
}

export const getNFTsResolver = new ApiResolver({
  name: 'getNFTs',
  getUrl: (params: Params) => `${BASE_URL}/account/${params.network}/${params.address}/nft`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    address: params.address,
    network: params.network,
  }),
});
