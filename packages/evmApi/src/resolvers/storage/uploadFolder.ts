import { operations } from '../../generated/types';
import { BodyType, EvmResolver } from '../Resolver';

type operation = 'uploadFolder';
const method = 'post';
const bodyParams = ['data'] as const;

export interface Params {
  data: {
    path: string;
    content: string;
  }[];
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const uploadFolderResolver = new EvmResolver({
  getPath: () => `ipfs/uploadFolder`,
  apiToResult: (data: ApiResult) => {
    return data;
  },
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    ...params,
  }),
  method,
  bodyParams,
  bodyType: BodyType.BODY,
});
