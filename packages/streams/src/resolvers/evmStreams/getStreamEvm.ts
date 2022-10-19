import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmStream } from '@moralisweb3/common-streams-utils'
import { operations } from '../../generated/types';

const name = 'GetStream';

type Name = typeof name;

type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type GetStreamEvmParams = ApiParams;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getStreamEvm = createEndpointFactory((core) =>
  createEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult: (data: ApiResult) => EvmStream.create(data, core),
    resultToJson: (data) => data.toJSON(),

    parseParams: (params: GetStreamEvmParams): ApiParams => params,
  }),
);
