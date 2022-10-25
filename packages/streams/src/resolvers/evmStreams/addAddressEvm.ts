import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

const name = 'AddAddressToStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
// Overwriting "address: string | string[]" because the generator cannot infer the type correctly from swagger
type ApiParams = Omit<PathParams & BodyParams, 'address'> & { address: string | string[] };
export type AddAddressEvmParams = ApiParams;
const method = 'post';
const bodyParams = ['address'] as const;
const urlParams = ['id'] as const;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const addAddressEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: ({ id }: AddAddressEvmParams) => `/streams/evm/${id}/address`,
    urlParams,
    apiToResult: (apiData: ApiResult) => {
      const data = toCamelCase(apiData);

      return {
        ...data,
        address: data.address
          ? typeof data.address === 'string'
            ? EvmAddress.create(data.address)
            : data.address.map((address) => EvmAddress.create(address))
          : undefined,
      };
    },
    resultToJson: (data) => ({
      ...data,
      address: data.address
        ? Array.isArray(data.address)
          ? data.address.map((address) => address.format())
          : data.address.format()
        : undefined,
    }),
    parseParams: (params: AddAddressEvmParams): ApiParams => params,
    method,
    bodyParams,
  }),
);
