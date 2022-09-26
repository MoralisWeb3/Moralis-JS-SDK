import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

const name = 'UpdateStreamStatus';

type Name = typeof name;
const method = 'post';

type PathParams = operations[Name]['parameters']['path'];
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = PathParams & BodyParams;
type Params = ApiParams;
const bodyParams = ['status'] as const;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const updateStreamEvmStatus = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: ({ id }: Params) => `/streams/evm/${id}/status`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: ApiParams) => params,
    bodyParams,
    method,
  }),
);
