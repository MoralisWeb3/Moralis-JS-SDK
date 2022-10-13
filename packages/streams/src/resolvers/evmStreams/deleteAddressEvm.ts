import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

const name = 'DeleteAddressFromStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = PathParams & BodyParams;
export type DeleteAddressEvmParams = ApiParams;
const method = 'delete';
const bodyParams = ['address'] as const;
const urlParams = ['id'] as const;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    address: data.address ? EvmAddress.create(data.address) : undefined,
  };
};

export const deleteAddressEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: ({ id }: DeleteAddressEvmParams) => `/streams/evm/${id}/address`,
    urlParams,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      address: data.address ? data.address.format() : undefined,
    }),
    parseParams: (params: DeleteAddressEvmParams): ApiParams => params,
    method,
    bodyParams,
  }),
);
