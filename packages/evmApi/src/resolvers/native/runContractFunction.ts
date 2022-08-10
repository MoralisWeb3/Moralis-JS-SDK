import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddress, EvmAddressish } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'runContractFunction';
const method = 'post';
const bodyParams = ['abi', 'params'] as const;

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type Body = operations[operation]['requestBody']['content']['application/json'];
type ApiParams = QueryParams & PathParams & Body;
export interface Params {
  chain?: EvmChainish;
  subdomain?: ApiParams['subdomain'];
  providerUrl?: ApiParams['providerUrl'];
  // TODO: allow also function_name, with proper typechecking where one of both is required. then parse in correctly as param
  functionName: ApiParams['function_name'];
  address: EvmAddressish;
  abi: unknown;
  params?: ApiParams['params'];
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const runContractFunction = createEndpointFactory((core) =>
  createEndpoint({
    name: 'runContractFunction',
    urlParams: ['address'],
    getUrl: (params: Params) => `${BASE_URL}/${params.address}/function`,
    apiToResult: (data: ApiResult) => {
      return data;
    },
    resultToJson: (data) => data,
    parseParams: (params: Params) => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      function_name: params.functionName,
      address: EvmAddress.create(params.address, core).lowercase,
      abi: params.abi,
      params: params.params,
    }),
    method,
    bodyParams,
  }),
);
