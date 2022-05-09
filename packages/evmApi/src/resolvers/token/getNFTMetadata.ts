import { EvmAddress } from '@moralis/core';
import { toCamelCase } from './../../utils/toCamelCase';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getNFTMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTMetadataResolver = new EvmResolver({
  getPath: (params: ApiParams) => `nft/${params.address}/metadata`,
  apiToResult: (data: ApiResult) => ({
    ...toCamelCase(data),
    tokenAddress: EvmAddress.create(data.token_address),
  }),
  resultToJson: (data) => ({
    ...data,
    tokenAddress: data.tokenAddress.format(),
  }),
  parseParams: (params) => params,
});
