import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

const name = 'DeleteAddressFromStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = Omit<PathParams & BodyParams, 'address'> & { address: string | string[] };
export interface DeleteAddressEvmParams extends Omit<ApiParams, 'address'> {
  address: EvmAddressish | EvmAddressish[];
}
const method = 'delete';
const bodyParams = ['address'] as const;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    address: data.address
      ? typeof data.address === 'string'
        ? EvmAddress.create(data.address)
        : data.address.map((address) => EvmAddress.create(address))
      : undefined,
  };
};

export const deleteAddressEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: DeleteAddressEvmParams) => `/streams/evm/${params.id}/address`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      address: data.address
        ? Array.isArray(data.address)
          ? data.address.map((address) => address.format())
          : data.address.format()
        : undefined,
    }),
    parseParams: (params: DeleteAddressEvmParams): ApiParams => ({
      ...params,
      address: Array.isArray(params.address)
        ? params.address.map((address) => EvmAddress.create(address).lowercase)
        : EvmAddress.create(params.address).lowercase,
    }),
    method,
    bodyParams,
  }),
);
