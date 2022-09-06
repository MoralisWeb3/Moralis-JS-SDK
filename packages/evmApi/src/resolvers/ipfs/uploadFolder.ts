import { createEndpoint, createEndpointFactory, EndpointBodyType } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

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

export const uploadFolder = createEndpointFactory(() =>
  createEndpoint({
    name: 'uploadFolder',
    getUrl: () => `/ipfs/uploadFolder`,
    apiToResult: (data: ApiResult) => {
      return data;
    },
    resultToJson: (data) => data,
    parseParams: (params: Params) => ({
      ...params,
    }),
    method,
    bodyParams,
    bodyType: EndpointBodyType.BODY,
  }),
);
