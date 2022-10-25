import MoralisCore from '@moralisweb3/common-core';
import { Endpoint, EndpointBodyType } from './Endpoint';

export interface PaginatedParams extends Record<string, unknown> {
  offset?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<ApiResult> {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: ApiResult;
}

export interface PaginatedEndpoint<ApiParams, Params extends PaginatedParams, ApiResult, AdaptedResult, JSONResult>
  extends Endpoint<ApiParams, Params, PaginatedResult<ApiResult>, AdaptedResult, JSONResult> {}

export type PaginatedEndpointFactory<
  ApiParams,
  Params extends PaginatedParams,
  ApiResult,
  AdaptedResult,
  JSONResult,
> = (core: MoralisCore) => PaginatedEndpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>;

export function createPaginatedEndpointFactory<
  ApiParams,
  Params extends PaginatedParams,
  ApiResult,
  AdaptedResult,
  JSONResult,
>(factory: PaginatedEndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
  return factory;
}

export function createPaginatedEndpoint<
  ApiParams,
  Params extends PaginatedParams,
  ApiResult,
  AdaptedResult,
  JSONResult,
>(endpoint: PaginatedEndpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
  if (!endpoint.method) {
    endpoint.method = 'get';
  }
  if (!endpoint.bodyType) {
    endpoint.bodyType = EndpointBodyType.PROPERTY;
  }
  return endpoint;
}
