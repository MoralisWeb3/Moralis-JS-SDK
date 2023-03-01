// $ref: #/components/schemas/GetEventsByEventHandleResponse/properties/data
// typeName: GetEventsByEventHandleResponse_data

export type AptosGetEventsByEventHandleResponseDataJSON = object;
export type AptosGetEventsByEventHandleResponseDataInput = object;
export type AptosGetEventsByEventHandleResponseDataValue = object;

export abstract class AptosGetEventsByEventHandleResponseData {
  public static create(input: AptosGetEventsByEventHandleResponseDataInput | AptosGetEventsByEventHandleResponseDataValue): AptosGetEventsByEventHandleResponseDataValue {
    return input;
  }

  public static fromJSON(json: AptosGetEventsByEventHandleResponseDataJSON): AptosGetEventsByEventHandleResponseDataValue {
    return json;
  }
}
