import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetEventsByEventHandleResponse, AptosGetEventsByEventHandleResponseJSON } from '../types/AptosGetEventsByEventHandleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/0/schema)
// - event_handle ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/1/schema)
// - field_name ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/2/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/3/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1events~1{event_handle}~1{field_name}/get/parameters/4/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetEventsByEventHandleOperationRequest {
  /**
   * @description Hex-encoded 32 byte Aptos account, with or without a 0x prefix, for which events are queried. This refers to the account that events were emitted to, not the account hosting the move module that emits that event type.
   */
  readonly address: string;
  /**
   * @description Name of struct to lookup event handle.
   */
  readonly eventHandle: string;
  /**
   * @description Name of field to lookup event handle.
   */
  readonly fieldName: string;
  /**
   * @description Max number of account resources to retrieve.
   * If not provided, defaults to default page size.
   */
  readonly limit?: string;
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

export interface GetEventsByEventHandleOperationRequestJSON {
  readonly address: string;
  readonly event_handle: string;
  readonly field_name: string;
  readonly limit?: string;
  readonly start?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetEventsByEventHandleOperation = {
  operationId: "getEventsByEventHandle",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/events/{event_handle}/{field_name}",
  parameterNames: ["address","event_handle","field_name","limit","start","network"],
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
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      event_handle: eventHandle,
      field_name: fieldName,
      limit: limit,
      start: start,
      network: network ? network.toJSON() : undefined,
    };
  },

}
