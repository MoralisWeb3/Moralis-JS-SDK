import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

const name = 'GetStream';

type Name = typeof name;

type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type GetStreamEvmParams = ApiParams;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getStreamEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult: (stream: ApiResult) => ({
      ...stream,
      chains: stream.chainIds.map((chainId) => EvmChain.create(chainId)),
    }),
    resultToJson: (stream) => ({
      ...stream,
      chainIds: stream.chains.map((chain) => chain.format()),
    }),
    parseParams: (params: GetStreamEvmParams): ApiParams => params,
  }),
);
