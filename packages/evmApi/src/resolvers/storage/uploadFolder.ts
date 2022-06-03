import { operations } from '../../generated/types';
import { BodyType, EvmResolver } from '../Resolver';

type operation = 'uploadFolder';
const method = 'post';
const bodyParams = ['abi'] as const;

export interface Params {
  // TODO: needs refinement, the key should not be abi
  abi: {
    path: string;
    content: string;
  }[];
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const uploadFolderResolver = new EvmResolver({
  name: 'uploadFolder',
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
