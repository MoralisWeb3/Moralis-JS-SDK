import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmStream } from '@moralisweb3/common-streams-utils'
import { operations } from '../../generated/types';

const name = 'DeleteStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type DeleteStreamEvmParams = ApiParams;
const method = 'delete';
const urlParams = ['id'] as const;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const deleteStreamEvm = createEndpointFactory((core) =>
  createEndpoint({
    name,
    getUrl: ({ id }: DeleteStreamEvmParams) => `/streams/evm/${id}`,
    urlParams,
    apiToResult: (data: ApiResult) => EvmStream.create(data, core),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: DeleteStreamEvmParams): ApiParams => params,
    method,
  }),
);
