import { EvmAddress } from '@moralis/core';
import { operations } from '../../generated/types';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadataResolver = new EvmResolver({
  getPath: (params: ApiParams) => `/erc20/metadata`,
  apiToResult: (data: ApiResult) =>
    data.map((token) => ({
      ...toCamelCase(token),
      address: EvmAddress.create(token.address),
    })),
  resultToJson: (data) => data.map((token) => ({ ...token, address: token.address.format() })),
  parseParams: (params) => params,
});
