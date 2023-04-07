import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetEventsByCreationNumberResponse, AptosGetEventsByCreationNumberResponseJSON } from '../types/AptosGetEventsByCreationNumberResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/0/schema)
// - creation_number ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/1/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/2/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetEventsByCreationNumberOperationRequest {
  /**
   * @description Address of account with or without a 0x prefix
   */
  readonly address: string;
  /**
   * @description Creation number corresponding to the event stream originating from the given account.
   */
  readonly creationNumber: string;
  /**
   * @description Max number of account resources to retrieve.
   * If not provided, defaults to default page size.
   */
  readonly limit?: number;
  /**
   * @description Starting sequence number of events.
   * If unspecified, by default will retrieve the most recent events
   */
  readonly start?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetEventsByCreationNumberOperationRequestJSON {
  readonly address: string;
  readonly creation_number: string;
  readonly limit?: number;
  readonly start?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetEventsByCreationNumberOperation = {
  operationId: "getEventsByCreationNumber",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/events/{creation_number}",
  parameterNames: ["address","creation_number","limit","start","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetEventsByCreationNumberResponseJSON[]): AptosGetEventsByCreationNumberResponse[] {
    return json.map((item) => AptosGetEventsByCreationNumberResponse.fromJSON(item));
  },

  serializeRequest(request: GetEventsByCreationNumberOperationRequest): GetEventsByCreationNumberOperationRequestJSON {
    const address = request.address;
    const creationNumber = request.creationNumber;
    const limit = request.limit;
    const start = request.start;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      creation_number: creationNumber,
      limit: limit,
      start: start,
      network: network ? network.toJSON() : undefined,
    };
  },

}
