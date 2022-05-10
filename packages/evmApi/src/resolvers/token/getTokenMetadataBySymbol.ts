import { EvmAddress } from '@moralis/core';
import { operations } from '../../generated/types';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenMetadataBySymbol';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadataBySymbolResolver = new EvmResolver({
  getPath: (params: ApiParams) => `/erc20/metadata/symbols`,
  apiToResult: (data: ApiResult) =>
    data.map((token) => ({
      ...toCamelCase(token),
      address: EvmAddress.create(token.address),
    })),
  resultToJson: (data) => data.map((token) => ({ ...token, address: token.address.format() })),
  parseParams: (params) => params,
});
