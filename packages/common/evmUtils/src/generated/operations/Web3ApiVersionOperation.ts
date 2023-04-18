import { EvmWeb3version, EvmWeb3versionJSON } from '../types/EvmWeb3version';

// request parameters:

export interface Web3ApiVersionOperationRequest {
}

export interface Web3ApiVersionOperationRequestJSON {
}

export type Web3ApiVersionOperationResponse = EvmWeb3version;
export type Web3ApiVersionOperationResponseJSON = EvmWeb3versionJSON;

export const Web3ApiVersionOperation = {
  operationId: "web3ApiVersion",
  groupName: "utils",
  httpMethod: "get",
  routePattern: "/web3/version",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmWeb3versionJSON): EvmWeb3version {
    return EvmWeb3version.fromJSON(json);
  },

  serializeRequest(request: Web3ApiVersionOperationRequest): Web3ApiVersionOperationRequestJSON {
    return {
    };
  },

}
