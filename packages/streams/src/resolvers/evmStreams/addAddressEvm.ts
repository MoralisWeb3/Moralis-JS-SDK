import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

const name = 'AddAddressToStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = PathParams & BodyParams;
export type AddAddressEvmParams = ApiParams;
const method = 'put';
const bodyParams = ['address'] as const;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const addAddressEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: AddAddressEvmParams) => `/streams/evm/${params.id}/address`,
    apiToResult: (apiData: ApiResult) => {
      const data = toCamelCase(apiData);

      return {
        ...data,
        address: data.address ? EvmAddress.create(data.address) : undefined,
      };
    },
    resultToJson: (data) => ({
      ...data,
      address: data.address?.format(),
    }),
    parseParams: (params: AddAddressEvmParams): ApiParams => params,
    method,
    bodyParams,
  }),
);
