import { AptWeb3version, AptWeb3versionJSON, AptWeb3versionInput } from '../types/AptWeb3version';

export interface AptWeb3ApiVersionOperationRequestJSON {}

export interface AptWeb3ApiVersionOperationRequest {}

/**
 * @description Get the current version of the Moralis Web3 API.
 */
export const AptWeb3ApiVersionOperation = {
  operationId: 'web3ApiVersion',
  httpMethod: 'get',
  routePattern: '/web3/version',
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptWeb3versionJSON): AptWeb3version {
    return AptWeb3version.fromJSON(json);
  },

  serializeRequest(request: AptWeb3ApiVersionOperationRequest): AptWeb3ApiVersionOperationRequestJSON {
    return {};
  },
};
