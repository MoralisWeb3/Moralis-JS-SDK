import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmChain } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

const name = 'DeleteStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type DeleteStreamEvmParams = ApiParams;
const method = 'delete';

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    chains: data.chainIds.map((chainId) => EvmChain.create(chainId)),
  };
};

export const deleteStreamEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: DeleteStreamEvmParams) => `/streams/evm/${params.id}`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      chainIds: data.chains.map((chain) => chain.format()),
    }),
    parseParams: (params: DeleteStreamEvmParams): ApiParams => params,
    method,
  }),
);
