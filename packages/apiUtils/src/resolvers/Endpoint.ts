import { MoralisCore } from '@moralisweb3/core';

export type EndpointMethod = 'get' | 'post' | 'put' | 'delete';

export enum EndpointBodyType {
  PROPERTY = 'property',
  BODY = 'body',
}

export interface Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  name: string;
  getUrl: (params: Params) => string;
  apiToResult: (result: ApiResult, params: Params) => AdaptedResult;
  resultToJson: (result: AdaptedResult) => JSONResult;
  parseParams: (params: Params) => ApiParams;
  method?: EndpointMethod;
  urlParams?: readonly (keyof Params)[];
  bodyParams?: readonly (keyof Params)[];
  bodyType?: EndpointBodyType;
  firstPageIndex?: number;
}

export type EndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> = (
  core: MoralisCore,
) => Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>;

export function createEndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>(
  factory: EndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
) {
  return factory;
}

export function createEndpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>(
  endpoint: Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
) {
  if (!endpoint.method) {
    endpoint.method = 'get';
  }
  if (!endpoint.bodyType) {
    endpoint.bodyType = EndpointBodyType.PROPERTY;
  }
  return endpoint;
}
