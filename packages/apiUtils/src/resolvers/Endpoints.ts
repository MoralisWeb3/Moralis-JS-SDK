import MoralisCore from '@moralisweb3/core';
import { Endpoint, EndpointFactory, EndpointMethod } from './Endpoint';
import { EndpointResolver } from './EndpointResolver';
import { PaginatedEndpointFactory, PaginatedParams } from './PaginatedEndpoint';
import { PaginatedEndpointResolver } from './PaginatedEndpointResolver';

// TODO: this interface could be replaced by Endpoint<> interface, but this is not possible for now until
// changes described in this file are not implemented.
export interface EndpointDescriptor {
  name: string;
  urlPatternParamNames: string[];
  urlPattern: string;
  method: EndpointMethod;
}

export class Endpoints {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly endpoints: Endpoint<unknown, any, any, any, unknown>[] = [];

  public constructor(
    private readonly core: MoralisCore,
    private readonly baseUrl: string, // TODO: the `baseUrl` argument should be removed.
  ) {}

  public createFetcher<AP, P, AR, ADR, JR>(factory: EndpointFactory<AP, P, AR, ADR, JR>) {
    const resolver = EndpointResolver.create(this.core, factory);
    this.endpoints.push(resolver.endpoint);
    return resolver.fetch;
  }

  public createPaginatedFetcher<AP, P extends PaginatedParams, AR, ADR, JR>(
    factory: PaginatedEndpointFactory<AP, P, AR, ADR, JR>,
  ) {
    const resolver = PaginatedEndpointResolver.create(this.core, factory);
    this.endpoints.push(resolver.endpoint);
    return resolver.fetch;
  }

  public getDescriptors(): EndpointDescriptor[] {
    return this.endpoints.map((endpoint) => {
      const urlPatternParamNames = (endpoint.urlParams as string[]) || [];

      // TODO: Endpoint<> type should have `urlPattern` property instead of `getUrl` method!
      // For example: .urlPattern = '/{token0Address}/{token1Address}/pairAddress'
      const urlParams = urlPatternParamNames.reduce<{ [name: string]: string }>((params, paramName) => {
        params[paramName] = `{${paramName}}`;
        return params;
      }, {});
      const urlPattern = endpoint
        .getUrl(urlParams)
        // TODO: getUrl() method should NOT return url with baseUrl prefix!
        .replace(this.baseUrl, '');

      return {
        // DO NOT return baseUrl here!
        name: endpoint.name,
        urlPatternParamNames,
        urlPattern,
        method: endpoint.method || 'get',
      };
    });
  }
}
