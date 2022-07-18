import { ApiResolver, resolveDefaultChain } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddress, EvmAddressish } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

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

export const runContractFunctionResolver = new ApiResolver({
  name: 'runContractFunction',
  getUrl: (params: Params) => `${BASE_URL}/${params.address}/function`,
  apiToResult: (data: ApiResult) => {
    return data;
  },
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    function_name: params.functionName,
    address: EvmAddress.create(params.address).lowercase,
    abi: params.abi,
    params: params.params,
  }),
  method,
  bodyParams,
});
