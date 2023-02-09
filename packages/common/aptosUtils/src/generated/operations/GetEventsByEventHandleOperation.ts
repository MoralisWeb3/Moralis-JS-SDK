import { AptosGetEventsByEventHandleResponse, AptosGetEventsByEventHandleResponseJSON } from '../types/AptosGetEventsByEventHandleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/0/schema)
// - event_handle ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/1/schema)
// - field_name ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/2/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/3/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/4/schema)

export interface GetEventsByEventHandleOperationRequest {
  readonly address: string;
  readonly eventHandle: string;
  readonly fieldName: string;
  readonly limit?: string;
  readonly start?: string;
}

export interface GetEventsByEventHandleOperationRequestJSON {
  readonly address: string;
  readonly event_handle: string;
  readonly field_name: string;
  readonly limit?: string;
  readonly start?: string;
}

export const GetEventsByEventHandleOperation = {
  operationId: "getEventsByEventHandle",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/events/{event_handle}/{field_name}",
  parameterNames: ["address","event_handle","field_name","limit","start"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetEventsByEventHandleResponseJSON[]): AptosGetEventsByEventHandleResponse[] {
    return json.map((item) => AptosGetEventsByEventHandleResponse.fromJSON(item));
  },

  serializeRequest(request: GetEventsByEventHandleOperationRequest): GetEventsByEventHandleOperationRequestJSON {
    const address = request.address;
    const eventHandle = request.eventHandle;
    const fieldName = request.fieldName;
    const limit = request.limit;
    const start = request.start;
    return {
      address: address,
      event_handle: eventHandle,
      field_name: fieldName,
      limit: limit,
      start: start,
    };
  },

}
