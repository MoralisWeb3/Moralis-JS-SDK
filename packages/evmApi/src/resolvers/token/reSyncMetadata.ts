import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'reSyncMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const reSyncMetadataResolver = new EvmResolver({
  getPath: (params: ApiParams) => `nft/${params.address}/${params.token_id}/metadata/res`,
  apiToResult: (data: ApiResult) => ({
    ...data,
  }),
  resultToJson: (data) => data,
  parseParams: (params) => params,
});
