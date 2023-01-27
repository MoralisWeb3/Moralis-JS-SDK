import { AptEns, AptEnsJSON, AptEnsInput } from '../types/AptEns';

export interface AptResolveAddressOperationRequestJSON {
  readonly address: string;
}

export interface AptResolveAddressOperationRequest {
  readonly address: string;
}

/**
 * @description Reverse resolve a given ETH address to its ENS domain.
 */
export const AptResolveAddressOperation = {
  operationId: 'resolveAddress',
  httpMethod: 'get',
  routePattern: '/resolve/{address}/reverse',
  parameterNames: ['address'],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptEnsJSON): AptEns {
    return AptEns.fromJSON(json);
  },

  serializeRequest(request: AptResolveAddressOperationRequest): AptResolveAddressOperationRequestJSON {
    const address = request.address;
    return {
      address: address,
    };
  },
};
