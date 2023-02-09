import { AptosGetEventsByCreationNumberResponse, AptosGetEventsByCreationNumberResponseJSON } from '../types/AptosGetEventsByCreationNumberResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/0/schema)
// - creation_number ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/1/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/2/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1events~1{creation_number}/get/parameters/3/schema)

export interface GetEventsByCreationNumberOperationRequest {
  readonly address: string;
  readonly creationNumber: string;
  readonly limit?: string;
  readonly start?: string;
}

export interface GetEventsByCreationNumberOperationRequestJSON {
  readonly address: string;
  readonly creation_number: string;
  readonly limit?: string;
  readonly start?: string;
}

export const GetEventsByCreationNumberOperation = {
  operationId: "getEventsByCreationNumber",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/events/{creation_number}",
  parameterNames: ["address","creation_number","limit","start"],
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
    return {
      address: address,
      creation_number: creationNumber,
      limit: limit,
      start: start,
    };
  },

}
