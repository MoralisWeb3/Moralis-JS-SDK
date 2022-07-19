import { ApiResolver } from '@moralisweb3/api';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'getNFTMetadata';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params {
  network: 'devnet' | 'mainnet';
  address: string;
}

export const getNFTMetadataResolver = new ApiResolver({
  name: 'getNFTMetadata',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.network}/${params.address}/metadata`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => ({
    balance: data,
  }),
  parseParams: (params: Params): ApiParams => ({
    address: params.address,
    network: params.network,
  }),
});
