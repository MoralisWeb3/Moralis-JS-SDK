import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosEncodeSubmissionRequest, AptosEncodeSubmissionRequestInput, AptosEncodeSubmissionRequestJSON } from '../types/AptosEncodeSubmissionRequest';

// request parameters:
// - network ($ref: #/virtualParameter/network)

export interface EncodeSubmissionOperationRequest {
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface EncodeSubmissionOperationRequestJSON {
  readonly network?: AptosNetworkJSON;
}

export const EncodeSubmissionOperation = {
  operationId: "encodeSubmission",
  groupName: "transactions",
  httpMethod: "post",
  routePattern: "/transactions/encode_submission",
  parameterNames: ["network"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: string): string {
    return json;
  },

  serializeRequest(request: EncodeSubmissionOperationRequest): EncodeSubmissionOperationRequestJSON {
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      network: network ? network.toJSON() : undefined,
    };
  },

  serializeBody(body: AptosEncodeSubmissionRequestInput | AptosEncodeSubmissionRequest): AptosEncodeSubmissionRequestJSON {
    const value = AptosEncodeSubmissionRequest.create(body);
    return value.toJSON();
  },
}
