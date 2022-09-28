import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

const name = 'GetAddresses';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type GetAddressesEvmParams = ApiParams;
const method = 'get';

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getAddressesEvm = createPaginatedEndpointFactory(() =>
  createPaginatedEndpoint({
    name,
    getUrl: (params: GetAddressesEvmParams) => `/streams/evm/${params.id}/address`,
    apiToResult: (data: ApiResult) =>
      (data.result ?? []).map((stream) => ({
        ...stream,
        address: stream.address ? EvmAddress.create(stream.address) : undefined,
      })),
    resultToJson: (data) => data.map((stream) => ({ ...stream, address: stream.address?.format() })),
    parseParams: (params: GetAddressesEvmParams): ApiParams => params,
    method,
  }),
);
