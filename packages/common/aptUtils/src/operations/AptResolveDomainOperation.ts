import { AptResolve, AptResolveJSON, AptResolveInput } from '../types/AptResolve';

export interface AptResolveDomainOperationRequestJSON {
  readonly currency?: string;
  readonly domain: string;
}

export interface AptResolveDomainOperationRequest {
  readonly currency?: string;
  readonly domain: string;
}

/**
 * @description Resolve a specific Unstoppable domain to its address.
 */
export const AptResolveDomainOperation = {
  operationId: 'resolveDomain',
  httpMethod: 'get',
  routePattern: '/resolve/{domain}',
  parameterNames: ['currency', 'domain'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptResolveJSON): AptResolve {
    return AptResolve.fromJSON(json);
  },

  serializeRequest(request: AptResolveDomainOperationRequest): AptResolveDomainOperationRequestJSON {
    const currency = request.currency;
    const domain = request.domain;
    return {
      currency: currency,
      domain: domain,
    };
  },
};
